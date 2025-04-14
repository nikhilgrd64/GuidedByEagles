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

    // Story Submission with Animation
    document.getElementById("story-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const story = document.getElementById("story").value;
        const gallery = document.getElementById("story-gallery");

        if (title.trim() === "" || story.trim() === "") {
            alert("❌ Please fill in all fields before submitting.");
            return;
        }

        const newStory = document.createElement("div");
        newStory.classList.add("story-entry");
        newStory.innerHTML = `<h3>${title}</h3><p>${story}</p>`;

        gallery.prepend(newStory);
        document.getElementById("story-form").reset();

        // Show success animation
        const successMsg = document.createElement("div");
        successMsg.innerHTML = "✅ Story submitted successfully!";
        successMsg.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#0d0d0d; color:#ffcc00; padding:15px; border-radius:5px; box-shadow:0px 0px 10px rgba(255,255,0,0.6); font-weight:bold;";
        document.body.appendChild(successMsg);

        setTimeout(() => successMsg.remove(), 3000);
    });
});
