// firebase-init.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6TIslWAFvqUvm5GQMjZdUXl7lribpz5Q",
  authDomain: "guided-by-eagles.firebaseapp.com",
  projectId: "guided-by-eagles",
  storageBucket: "guided-by-eagles.appspot.com",
  messagingSenderId: "959481602259",
  appId: "1:959481602259:web:1a0c79730838c408403426",
  measurementId: "G-3T1VPF4MR5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
