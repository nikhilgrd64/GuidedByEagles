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
  if (!session) return null;
  return session;
}

function startNewSession(visitorData) {
  const session = {
    sessionId: crypto.randomUUID(),
    startTime: Date.now(),
    lastActivity: Date.now(),
    pagesVisited: [], // Just the list of visited pages
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
  session.pagesVisited.push(path);  // Only save the page path
  saveSession(session);
}

function endFullSession() {
  const session = getStoredSession();
  if (!session) return null;
  localStorage.removeItem(SESSION_KEY);
  return { session };
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

  markPageEntry(path); // Start new page visit

  const handleUnload = async () => {
    console.log("🚪 User is leaving the page. Finalizing session...");
    
    const result = endFullSession();
    if (!result) return;
    const { session } = result;

    const payload = {
      ...session,
      currentPage: path,
      timestamp: serverTimestamp()
    };

    console.log("💾 Saving session data to Firebase:", payload);

    try {
      await addDoc(collection(db, "userSessions"), payload);
      console.log("✅ Session saved successfully:", session.sessionId);
    } catch (e) {
      console.error("❌ Firebase write error:", e);
    }
  };

  // Will trigger on full close (alt+f4, tab close, etc.)
  window.addEventListener("beforeunload", handleUnload);
}
