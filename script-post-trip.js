import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Post-Trip Engagement page loaded!");

    // Countdown Timer
    function startCountdown(targetDate) {
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.getElementById("countdown-timer").innerHTML = "🎉 Your trip has started!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("countdown-timer").innerHTML = `${days}d ${hours}h ${minutes}m`;
        }

        updateCountdown();
        setInterval(updateCountdown, 60000);
    }

    const nextTripDate = new Date("2025-07-01T00:00:00").getTime();
    startCountdown(nextTripDate);

    // Story Submission Handler
    document.getElementById("story-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const travelPeriod = document.getElementById("travel-period").value;
        const itinerary = document.getElementById("itinerary").value.trim();
        const experiences = document.getElementById("experiences").value.trim();
        const tips = document.getElementById("tips").value.trim();
        const links = document.getElementById("links").value.trim();

        if (!title || !destination || !travelPeriod || !itinerary || !experiences || !tips) {
            alert("❌ Please fill in all required fields before submitting.");
            return;
        }

        const storyData = {
            title,
            destination,
            travelPeriod,
            itinerary,
            experiences,
            tips,
            links,
            submittedAt: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "travelStories"), storyData);
            console.log("✅ Story added to Firestore");

            // Show on page
            const gallery = document.getElementById("story-gallery");
            const newStory = document.createElement("div");
            newStory.classList.add("story-entry");
            newStory.innerHTML = `
                <h3>${title}</h3>
                <p>
                    <strong>📍 Destination:</strong> ${destination}<br>
                    <strong>📅 Travel Period:</strong> ${travelPeriod}<br>
                    <strong>🗺️ Itinerary:</strong> ${itinerary}<br>
                    <strong>🌟 Experiences:</strong> ${experiences}<br>
                    <strong>🎯 Travel Tips:</strong> ${tips}<br>
                    <strong>🔗 Media Links:</strong> ${links || "None"}
                </p>
            `;
            gallery.prepend(newStory);
            document.getElementById("story-form").reset();

            // Show animation
            const successMsg = document.createElement("div");
            successMsg.innerHTML = "✅ Story submitted successfully!";
            successMsg.style.cssText = `
                position:fixed; 
                top:20px; 
                left:50%; 
                transform:translateX(-50%); 
                background:#0d0d0d; 
                color:#ffcc00; 
                padding:15px; 
                border-radius:5px; 
                box-shadow:0px 0px 10px rgba(255,255,0,0.6); 
                font-weight:bold;
                z-index:1000;
            `;
            document.body.appendChild(successMsg);
            setTimeout(() => successMsg.remove(), 3000);
        } catch (err) {
            console.error("❌ Error submitting story:", err);
            alert("⚠️ Something went wrong. Please try again.");
        }
    });
});
