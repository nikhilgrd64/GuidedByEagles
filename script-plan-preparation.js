document.addEventListener("DOMContentLoaded", function () {
    const appointmentInput = document.getElementById("appointment");
    const calendarIcon = document.querySelector(".calendar-icon");
    const bookButton = document.getElementById("book-button");
    const apiUrl = "https://script.google.com/macros/s/AKfycbxWwMAL_ZOquecHozztfqql6xCf5KpfRWjdVY4lVWiwS6-_prdvDHlKofN8zsB5-PeK/exec";

    // Open Date-Time picker when clicking the icon
    calendarIcon.addEventListener("click", function () {
        appointmentInput.showPicker();
    });

    document.getElementById("appointment-form").addEventListener("submit", async function (event) {
        event.preventDefault();

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
        };

        // Validate required fields
        if (Object.values(formData).some(value => !value)) {
            alert("❌ Please complete all required fields.");
            return;
        }

        // Show loading animation on button
        bookButton.innerHTML = "⏳ Booking...";
        bookButton.disabled = true;

        try {
            // Preflight Request Check (to ensure server is reachable)
            const preflight = await fetch(apiUrl, { method: "OPTIONS" });
            if (!preflight.ok) throw new Error("Server unreachable.");

            // Submit form data
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.status === "success") {
                alert("✅ " + result.message);
                document.getElementById("appointment-form").reset();
            } else {
                alert("❌ Submission failed: " + result.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("❌ Could not connect to the server. Please check your internet connection or try again later.");
        }

        // Reset button state
        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
    });
});
