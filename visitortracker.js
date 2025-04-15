import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const SESSION_KEY = "full-site-session";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

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
  if (!session) return null;
  const now = Date.now();
  if (now - session.lastActivity > SESSION_TIMEOUT) {
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

function markPageEntry(path) {
  let session = getStoredSession();
  if (!session) return;
  session.pagesVisited.push({
    path,
    enterTimestamp: new Date().toISOString(),
    exitTimestamp: null,
    durationSec: null
  });
  saveSession(session);
}

function markPageExit() {
  let session = getStoredSession();
  if (!session || !session.pagesVisited.length) return;

  const now = new Date();
  const lastPage = session.pagesVisited[session.pagesVisited.length - 1];

  if (!lastPage.exitTimestamp) {
    lastPage.exitTimestamp = now.toISOString();
    const enter = new Date(lastPage.enterTimestamp).getTime();
    lastPage.durationSec = Math.round((now.getTime() - enter) / 1000);
  }
  saveSession(session);
}

function endFullSession() {
  const session = getStoredSession();
  if (!session) return null;
  markPageExit(); // ensure last page is closed
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
    console.warn("🌐 IP/Geo fetch failed:", e);
  }

  let session = getStoredSession();
  if (!session) session = startNewSession({ ip, city, country, referrer, ...deviceInfo });

  markPageExit();    // ⛔️ Close previous page visit
  markPageEntry(path); // ✅ Start new page visit

  const handleUnload = async () => {
    const result = endFullSession();
    if (!result) return;
    const { session, durationSec } = result;
    const payload = {
      ...session,
      sessionDuration: durationSec,
      currentPage: path,
      timestamp: serverTimestamp()
    };

    // Debugging logs
    console.log("🚀 Session data to be sent:", payload);

    try {
      // Save the session data to Firestore directly using addDoc
      const docRef = await addDoc(collection(db, "userSessions"), payload);
      console.log("✅ Session saved:", docRef.id);
    } catch (e) {
      console.error("❌ Firebase write error:", e);
    }
  };

  // Will trigger on full close (alt+f4, tab close, etc.)
  window.addEventListener("beforeunload", handleUnload);
}
