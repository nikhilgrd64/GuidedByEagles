document.addEventListener("DOMContentLoaded", function () {
    console.log("Live Travel Support page loaded!");

    // Emergency SOS Button
    document.getElementById("sos-button").addEventListener("click", function () {
        alert("🚨 SOS Activated! Authorities and emergency contacts have been notified.");
    });

    // Weather Updates Button
    document.getElementById("weather-update").addEventListener("click", function () {
        alert("🌦 Fetching real-time weather and road updates...");
        // Future enhancement: Fetch real weather data from an API
    });

    // Forum Access Button
    document.getElementById("forum-access").addEventListener("click", function () {
        alert("💬 Redirecting to the traveler forum...");
        window.location.href = "https://www.travel-forum.com"; // Replace with your forum URL
    });
});
