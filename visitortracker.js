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

  const now = Date.now();

  // ⏱️ Close the previous page visit if one exists
  const lastVisit = session.pagesVisited[session.pagesVisited.length - 1];
  if (lastVisit && !lastVisit.exitTimestamp) {
    lastVisit.exitTimestamp = new Date(now).toISOString();
    lastVisit.durationSec = Math.round((now - new Date(lastVisit.enterTimestamp).getTime()) / 1000);
  }

  // 📥 Push current page info
  session.pagesVisited.push({
    path,
    enterTimestamp: new Date(now).toISOString(),
    exitTimestamp: null, // will be filled on exit
    durationSec: null
  });

  session.lastActivity = now;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function endFullSession() {
  const now = Date.now();
  const session = getStoredSession();
  if (!session) return null;

  // ⏱️ End the last page visit
  const lastVisit = session.pagesVisited[session.pagesVisited.length - 1];
  if (lastVisit && !lastVisit.exitTimestamp) {
    lastVisit.exitTimestamp = new Date(now).toISOString();
    lastVisit.durationSec = Math.round((now - new Date(lastVisit.enterTimestamp).getTime()) / 1000);
  }

  const durationSec = Math.round((now - session.startTime) / 1000);
  localStorage.removeItem(SESSION_KEY);

  return { session, durationSec };
}

export async function logVisitor() {
  console.log("📡 Visitor tracker running...");

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

  const visitorData = { ip, city, country, referrer, ...deviceInfo };

  let session = getStoredSession();
  if (!session) {
    session = startNewSession(visitorData);
    console.log("🆕 New full-site session:", session.sessionId);
  }

  updateSessionPage(page); // ✅ logs current page entry

  const handleSessionEnd = async () => {
    updateSessionPage(page); // ⏱️ Final page exit logging

    const fullSessionResult = endFullSession();
    if (fullSessionResult) {
      const { session, durationSec } = fullSessionResult;

      const unifiedData = {
        ...session,
        currentPage: page,
        sessionDuration: durationSec,
        timestamp: serverTimestamp()
      };

      try {
        await addDoc(collection(db, "userSessions"), unifiedData);
        console.log("✅ Full session logged:", session.sessionId);
      } catch (e) {
        console.error("❌ Failed to log full session:", e);
      }
    }
  };

  // 🔁 When user leaves page
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      handleSessionEnd();
    }
  });

  window.addEventListener("pagehide", handleSessionEnd);
}
