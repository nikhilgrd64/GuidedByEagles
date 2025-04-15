import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
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

function saveSession(session) {
  session.lastActivity = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function markPageEntry(path) {
  let session = getStoredSession();
  if (!session) return;
  session.pagesVisited.push(path);
  saveSession(session);
}

function endSessionAndUpload() {
  const session = getStoredSession();
  if (!session) return;

  localStorage.removeItem(SESSION_KEY);
  const payload = {
    ...session,
    timestamp: serverTimestamp()
  };

  // Use sendBeacon for reliable upload during unload
  try {
    navigator.sendBeacon = navigator.sendBeacon || function () {}; // fallback
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    navigator.sendBeacon('/upload-session-endpoint', blob); // Optional: Backend endpoint
  } catch (e) {
    console.warn('Beacon failed, falling back to normal addDoc', e);
    addDoc(collection(db, "userSessions"), payload)
      .then(() => console.log("✅ Session saved:", session.sessionId))
      .catch((e) => console.error("❌ Firebase error:", e));
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

  window.addEventListener("beforeunload", () => {
    endSessionAndUpload();
  });
}
