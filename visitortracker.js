// visitorTracker.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6TIslWAFvqUvm5GQMjZdUXl7lribpz5Q",
  authDomain: "guided-by-eagles.firebaseapp.com",
  projectId: "guided-by-eagles",
  storageBucket: "guided-by-eagles.appspot.com",
  messagingSenderId: "959481602259",
  appId: "1:959481602259:web:1a0c79730838c408403426",
  measurementId: "G-3T1VPF4MR5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    browser: navigator.userAgent,
    deviceType: deviceType,
    platform: platform
  };
}

export async function logVisitor() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const ip = data.ip;
    const page = window.location.pathname;
    const deviceInfo = getDeviceInfo();

    await addDoc(collection(db, "visitors"), {
      ip: ip,
      page: page,
      browser: deviceInfo.browser,
      deviceType: deviceInfo.deviceType,
      platform: deviceInfo.platform,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.error("Visitor tracking failed:", e);
  }
}
