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
  let ip = "unknown";

  try {
    const response = await fetch("https://api.ipify.org?format=json"); // ✅ safer option
    const { ip: fetchedIP } = await response.json();
    ip = fetchedIP;
  } catch (e) {
    console.warn("⚠️ Could not fetch IP:", e);
  }

  const page = window.location.pathname;
  const deviceInfo = getDeviceInfo();

  try {
    await addDoc(collection(db, "visitors"), {
      ip,
      page,
      ...deviceInfo,
      timestamp: serverTimestamp()
    });
    console.log("✅ Visitor logged successfully");
  } catch (e) {
    console.error("Visitor tracking failed:", e);
  }
}
