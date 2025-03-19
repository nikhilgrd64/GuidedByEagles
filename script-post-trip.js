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
    app = getApps()[0];
}

// Initialize Firestore
const db = getFirestore(app);

// Wait for DOM to Load
document.addEventListener("DOMContentLoaded", function () {
    console.log("Post-Trip Engagement page loaded!");

    // Countdown Timer
    function updateCountdown() {
        const tripDate = new Date("2025-07-01T00:00:00");
        const now = new Date();
        const timeDifference = tripDate - now;

        if (timeDifference <= 0) {
            document.getElementById("countdown-timer").innerHTML = "🎉 Your trip has started!";
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

        document.getElementById("countdown-timer").innerHTML = `${days}d ${hours}h ${minutes}m`;
    }

    setInterval(updateCountdown, 60000);
    updateCountdown();

    // Story Submission Form
    const storyForm = document.getElementById("story-form");

    storyForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect form data
        const title = document.getElementById("title").value.trim();
        const story = document.getElementById("story").value.trim();

        // Validate input fields
        if (!title || !story) {
            alert("❌ Please enter a title and story before submitting.");
            return;
        }

        // Show loading state
        const submitButton = storyForm.querySelector("button");
        submitButton.innerHTML = "⏳ Uploading...";
        submitButton.disabled = true;

        try {
            // Store the story in Firestore
            await addDoc(collection(db, "stories"), {
                title,
                story,
                timestamp: serverTimestamp()
            });

            alert("✅ Story submitted successfully!");
            storyForm.reset();
        } catch (error) {
            console.error("Error submitting story:", error);
            alert("❌ Submission failed. Please try again.");
        }

        // Reset button
        submitButton.innerHTML = "📤 Submit Story";
        submitButton.disabled = false;
    });
});
