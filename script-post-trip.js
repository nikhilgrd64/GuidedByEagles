// Import Firebase Modules
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
            loadStories(); // Refresh stories after submission
        } catch (error) {
            console.error("Error submitting story:", error);
            alert("❌ Submission failed. Please try again.");
        }

        // Reset button
        submitButton.innerHTML = "📤 Submit Story";
        submitButton.disabled = false;
    });

    // Function to Load and Display Stories
    async function loadStories() {
        const storyGallery = document.getElementById("story-gallery");
        storyGallery.innerHTML = "<p>Loading stories...</p>";

        try {
            const querySnapshot = await getDocs(collection(db, "stories"));

            if (querySnapshot.empty) {
                storyGallery.innerHTML = "<p>No stories yet. Be the first to share!</p>";
                return;
            }

            let storyHTML = "<ol>"; // Ordered list for numbering
            let count = 1;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                storyHTML += `
                    <li class="story-entry">
                        <h3>${count}. ${data.title}</h3>
                        <p>${data.story}</p>
                        <hr>
                    </li>
                `;
                count++;
            });

            storyHTML += "</ol>";
            storyGallery.innerHTML = storyHTML;

        } catch (error) {
            console.error("Error loading stories:", error);
            storyGallery.innerHTML = "<p>Error loading stories. Please try again.</p>";
        }
    }

    // Load stories when page loads
    loadStories();
});
