import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  let deviceType = "Desktop";

  if (/Mobi|Android/i.test(userAgent)) {
    deviceType = "Mobile";
  } else if (/iPad|Tablet/i.test(userAgent)) {
    deviceType = "Tablet";
  }

  return {
    browser: userAgent,
    deviceType,
    platform
  };
}

export async function logVisitor() {
  console.log("Visitor tracker is running...");

  // ✅ Avoid duplicate logs per session
  if (sessionStorage.getItem("visitor-logged")) return;

  let ip = "unknown";
  let city = "unknown";
  let country = "unknown";

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const { ip: fetchedIP } = await response.json();
    ip = fetchedIP;

    // ✅ Get geolocation
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    city = geoData.city || "unknown";
    country = geoData.country_name || "unknown";
  } catch (e) {
    console.warn("⚠️ Could not fetch IP or location:", e);
  }

  const page = window.location.pathname;
  const deviceInfo = getDeviceInfo();
  const referrer = document.referrer || "direct";
  const startTime = performance.now();

  // ⏱️ Save start time for session duration logging
  window.addEventListener("beforeunload", async () => {
    const endTime = performance.now();
    const durationSec = Math.round((endTime - startTime) / 1000); // Duration in seconds

    // Log session duration along with other data in Firestore
    try {
      await addDoc(collection(db, "sessions"), {
        ip,
        city,
        country,
        page,
        referrer,
        sessionDuration: durationSec, // Store session duration in seconds
        ...deviceInfo,
        timestamp: serverTimestamp()
      });
      console.log(`✅ Session duration of ${durationSec} seconds logged successfully.`);
    } catch (e) {
      console.error("❌ Error logging session duration:", e);
    }
  });

  // Log visitor info once
  try {
    await addDoc(collection(db, "visitors"), {
      ip,
      city,
      country,
      page,
      referrer,
      ...deviceInfo,
      timestamp: serverTimestamp()
    });

    sessionStorage.setItem("visitor-logged", "true");
    console.log("✅ Visitor logged successfully");
  } catch (e) {
    console.error("❌ Visitor tracking failed:", e);
  }
}
