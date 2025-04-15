import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const SESSION_KEY = "full-site-session";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

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

function getStoredSession() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!session) return null;

  const now = Date.now();
  const sessionAge = now - session.lastActivity;

  if (sessionAge > SESSION_TIMEOUT) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }

  return session;
}

function startNewSession(visitorData) {
  const session = {
    sessionId: crypto.randomUUID(),
    startTime: Date.now(),
    lastActivity: Date.now(),
    pagesVisited: [],
    ...visitorData
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function updateSessionPage(path) {
  const session = getStoredSession();
  if (!session) return;

  session.pagesVisited.push({
    path,
    timestamp: new Date().toISOString()
  });
  session.lastActivity = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function endFullSession() {
  const session = getStoredSession();
  if (!session) return null;

  const durationSec = Math.round((Date.now() - session.startTime) / 1000);
  localStorage.removeItem(SESSION_KEY);

  return { session, durationSec };
}

export async function logVisitor() {
  console.log("Visitor tracker is running...");

  // Avoid duplicate "visitor" logs
  if (sessionStorage.getItem("visitor-logged")) return;

  const page = window.location.pathname;
  const referrer = document.referrer || "direct";
  const deviceInfo = getDeviceInfo();

  let ip = "unknown";
  let city = "unknown";
  let country = "unknown";

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const { ip: fetchedIP } = await response.json();
    ip = fetchedIP;

    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    city = geoData.city || "unknown";
    country = geoData.country_name || "unknown";
  } catch (e) {
    console.warn("⚠️ Could not fetch IP or location:", e);
  }

  //
  // ✅ ORIGINAL PAGE SESSION TRACKING (UNCHANGED)
  //
  const startTime = performance.now();
  window.addEventListener("beforeunload", async () => {
    const endTime = performance.now();
    const durationSec = Math.round((endTime - startTime) / 1000);

    try {
      await addDoc(collection(db, "sessions"), {
        ip,
        city,
        country,
        page,
        referrer,
        sessionDuration: durationSec,
        ...deviceInfo,
        timestamp: serverTimestamp()
      });
      console.log(`✅ Session duration of ${durationSec} seconds logged.`);
    } catch (e) {
      console.error("❌ Error logging page session:", e);
    }

    //
    // ✅ NEW: END FULL-SITE SESSION IF APPLICABLE
    //
    const fullSessionResult = endFullSession();
    if (fullSessionResult) {
      const { session, durationSec } = fullSessionResult;

      try {
        await addDoc(collection(db, "fullSessions"), {
          ...session,
          sessionDuration: durationSec,
          timestamp: serverTimestamp()
        });
        console.log(`📦 Full site session logged: ${durationSec}s`);
      } catch (e) {
        console.error("❌ Error logging full-site session:", e);
      }
    }
  });

  //
  // ✅ ORIGINAL "VISITOR" INFO TRACKING (UNCHANGED)
  //
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
    console.log("✅ Visitor info logged");
  } catch (e) {
    console.error("❌ Visitor info logging failed:", e);
  }

  //
  // ✅ NEW: FULL-SITE SESSION TRACKING
  //
  const visitorData = { ip, city, country, referrer, ...deviceInfo };
  let session = getStoredSession();

  if (!session) {
    session = startNewSession(visitorData);
    console.log("🆕 Started new full-site session:", session.sessionId);
  }

  updateSessionPage(page);
}
