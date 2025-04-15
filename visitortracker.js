import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const SESSION_KEY = "full-site-session";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const deviceType = /Mobi|Android/i.test(ua)
    ? "Mobile"
    : /iPad|Tablet/i.test(ua)
    ? "Tablet"
    : "Desktop";
  return { browser: ua, deviceType, platform };
}

function getStoredSession() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!session) return null;
  if (Date.now() - session.lastActivity > SESSION_TIMEOUT) {
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

function saveSession(session) {
  session.lastActivity = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function markPageExit() {
  const session = getStoredSession();
  if (!session || !session.pagesVisited.length) return;
  const lastPage = session.pagesVisited[session.pagesVisited.length - 1];
  if (!lastPage.exitTimestamp) {
    const now = new Date();
    lastPage.exitTimestamp = now.toISOString();
    lastPage.durationSec = Math.round((now - new Date(lastPage.enterTimestamp)) / 1000);
    saveSession(session);
  }
}

function markPageEntry(path) {
  const session = getStoredSession();
  if (!session) return;
  session.pagesVisited.push({
    path,
    enterTimestamp: new Date().toISOString(),
    exitTimestamp: null,
    durationSec: null
  });
  saveSession(session);
}

function endFullSession() {
  const session = getStoredSession();
  if (!session) return null;
  markPageExit(); // close last page
  const durationSec = Math.round((Date.now() - session.startTime) / 1000);
  localStorage.removeItem(SESSION_KEY);
  return { session, durationSec };
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
    console.warn("🌍 Failed to get IP/location:", e);
  }

  let session = getStoredSession();
  if (!session) {
    session = startNewSession({ ip, city, country, referrer, ...deviceInfo });
  }

  markPageExit();     // ⛔ Close previous page
  markPageEntry(path); // ✅ Log current page

  // ⛔ Log only when tab is CLOSED (not switched)
  window.addEventListener("beforeunload", async () => {
    const result = endFullSession();
    if (!result) return;
    const { session, durationSec } = result;

    const payload = {
      ...session,
      sessionDuration: durationSec,
      currentPage: path,
      timestamp: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "userSessions"), payload);
      console.log("✅ Session logged:", session.sessionId);
    } catch (err) {
      console.error("❌ Firebase error:", err);
    }
  });
}
