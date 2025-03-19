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

    // Story Submission Form
    const storyForm = document.getElementById("story-form");

    storyForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect form data
        const title = document.getElementById("title").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const travelPeriod = document.getElementById("travel-period").value.trim();
        const itinerary = document.getElementById("itinerary").value.trim();
        const experiences = document.getElementById("experiences").value.trim();
        const tips = document.getElementById("tips").value.trim();
        const links = document.getElementById("links").value.trim();

        // Validate input fields
        if (!title || !destination || !travelPeriod || !itinerary || !experiences || !tips) {
            alert("❌ Please fill in all required fields.");
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
                destination,
                travelPeriod,
                itinerary,
                experiences,
                tips,
                links,
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

            let storyHTML = "<ol>";
            let count = 1;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                storyHTML += `
                    <li class="story-entry">
                        <h3>${count}. ${data.title}</h3>
                        <p><strong>📍 Destination:</strong> ${data.destination}</p>
                        <p><strong>📅 Travel Period:</strong> ${data.travelPeriod}</p>
                        <p><strong>🗺️ Itinerary:</strong> ${data.itinerary}</p>
                        <p><strong>🌟 Experiences:</strong> ${data.experiences}</p>
                        <p><strong>🎯 Travel Tips:</strong> ${data.tips}</p>
                        ${data.links ? `<p><strong>🔗 Links:</strong> <a href="${data.links}" target="_blank">${data.links}</a></p>` : ""}
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
