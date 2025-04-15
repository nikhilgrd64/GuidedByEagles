import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const SESSION_KEY = "full-site-session";

// Get device info
function getDeviceInfo() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  let deviceType = /Mobi|Android/i.test(ua) ? "Mobile" : /iPad|Tablet/i.test(ua) ? "Tablet" : "Desktop";
  return { browser: ua, deviceType, platform };
}

// Get session from localStorage
function getStoredSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
}

// Start new session
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

// Save session to localStorage
function saveSession(session) {
  session.lastActivity = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// Track a page visit
function markPageEntry(path) {
  let session = getStoredSession();
  if (!session) return;
  session.pagesVisited.push(path);
  saveSession(session);
}

// End session, remove from storage
function endFullSession() {
  const session = getStoredSession();
  if (!session) return null;
  localStorage.removeItem(SESSION_KEY);
  return { session };
}

// Main logger
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
  } catch (err) {
    console.warn("🌐 IP/Geo lookup failed:", err);
  }

  let session = getStoredSession();
  if (!session) session = startNewSession({ ip, city, country, referrer, ...deviceInfo });

  markPageEntry(path);

  window.addEventListener("beforeunload", async () => {
    const result = endFullSession();
    if (!result) return;

    const { session } = result;
    const payload = {
      ...session,
      timestamp: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "userSessions"), payload);
      console.log("✅ Session saved:", session.sessionId);
    } catch (err) {
      console.error("❌ Firestore write failed:", err);
    }
  });
}
