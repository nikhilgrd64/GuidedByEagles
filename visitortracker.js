import { db } from './firebase-init.js';
import { collection, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const SESSION_KEY = "full-site-session";

function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  let deviceType = "Desktop";
  if (/Mobi|Android/i.test(userAgent)) deviceType = "Mobile";
  else if (/iPad|Tablet/i.test(userAgent)) deviceType = "Tablet";
  return { browser: userAgent, deviceType, platform };
}

function getStoredSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
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

function saveSession(session) {
  session.lastActivity = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function markPageEntry(path) {
  let session = getStoredSession();
  if (!session) return;
  if (!session.pagesVisited.includes(path)) {
    session.pagesVisited.push(path);
  }
  saveSession(session);
}

// Upload with fallback (sendBeacon → fetch)
function uploadSessionReliable(session) {
  const sessionData = {
    ...session,
    timestamp: new Date().toISOString(), // fallback timestamp
  };

  const blob = new Blob([JSON.stringify(sessionData)], {
    type: "application/json",
  });

  const beaconSuccess = navigator.sendBeacon(
    "https://firestore.googleapis.com/v1/projects/guided-by-eagles/databases/(default)/documents/userSessions?documentId=" + session.sessionId,
    blob
  );

  if (!beaconSuccess) {
    // Fallback if sendBeacon fails
    fetch("https://firestore.googleapis.com/v1/projects/guided-by-eagles/databases/(default)/documents/userSessions?documentId=" + session.sessionId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionData),
      keepalive: true
    }).then(() => console.log("✅ Fallback fetch worked"));
  }
}

export async function logVisitor() {
  const path = window.location.pathname;
  const referrer = document.referrer || "direct";
  const deviceInfo = getDeviceInfo();

  let ip = "unknown", city = "unknown", country = "unknown";
  try {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    ip = (await ipRes.json()).ip;
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geo = await geoRes.json();
    city = geo.city || "unknown";
    country = geo.country_name || "unknown";
  } catch (e) {
    console.warn("🌐 IP/Geo fetch failed:", e);
  }

  let session = getStoredSession();
  if (!session) {
    session = startNewSession({ ip, city, country, referrer, ...deviceInfo });
  }

  markPageEntry(path);

  // Trigger on close
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      const session = getStoredSession();
      if (!session) return;

      saveSession(session); // latest save

      uploadSessionReliable(session);
      localStorage.removeItem(SESSION_KEY);
    }
  });
}
