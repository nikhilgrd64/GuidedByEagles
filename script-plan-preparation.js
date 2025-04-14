import { logVisitor } from './visitortracker.js';
logVisitor();

// Import Firebase Modules
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

// Check if Firebase is already initialized
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0]; // Use the existing initialized app
}

// Initialize Firestore
const db = getFirestore(app);

// Wait for DOM to Load
document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointment-form");
    const bookButton = document.getElementById("book-button");

    appointmentForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect Form Data
        const formData = {
            name: document.getElementById("name").value.trim(),
            contact: document.getElementById("contact").value.trim(),
            purpose: document.getElementById("purpose").value.trim(),
            destination: document.getElementById("destination").value.trim(),
            route: document.getElementById("route").value.trim() || "N/A",
            stay: document.getElementById("stay").value.trim(),
            budget: document.getElementById("budget").value.trim(),
            appointment: document.getElementById("appointment").value.trim(),
            email: document.getElementById("email").value.trim(),
            timestamp: serverTimestamp()
        };

        // Validate Fields
        if (Object.values(formData).some(value => !value)) {
            alert("❌ Please complete all required fields.");
            return;
        }

        // Show Loading State
        bookButton.innerHTML = "⏳ Booking...";
        bookButton.disabled = true;

        try {
            // Store Data in Firestore
            await addDoc(collection(db, "appointments"), formData);
            alert("✅ Appointment booked successfully!");
            appointmentForm.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("❌ Submission failed. Please try again.");
        }

        // Reset Button
        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
    });
});
