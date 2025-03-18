document.addEventListener("DOMContentLoaded", function () {
    const appointmentInput = document.getElementById("appointment");
    const calendarIcon = document.querySelector(".calendar-icon");

    // Click on the icon to open Date-Time picker
    calendarIcon.addEventListener("click", function () {
        appointmentInput.showPicker();
    });

    document.getElementById("appointment-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            contact: document.getElementById("contact").value,
            purpose: document.getElementById("purpose").value,
            destination: document.getElementById("destination").value,
            route: document.getElementById("route").value || "N/A",
            stay: document.getElementById("stay").value,
            budget: document.getElementById("budget").value,
            appointment: document.getElementById("appointment").value,
            email: document.getElementById("email").value,
        };

        // Validate required fields
        if (!formData.name || !formData.contact || !formData.purpose || !formData.destination || !formData.stay || !formData.budget || !formData.appointment || !formData.email) {
            alert("❌ Please complete all required fields.");
            return;
        }

        // Button loading animation
        const bookButton = document.getElementById("book-button");
        bookButton.innerHTML = "⏳ Booking...";
        bookButton.disabled = true;

        // Google Apps Script API Endpoint
        const apiUrl = "https://script.google.com/macros/s/AKfycbxWwMAL_ZOquecHozztfqql6xCf5KpfRWjdVY4lVWiwS6-_prdvDHlKofN8zsB5-PeK/exec";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status === "success") {
                alert("✅ " + result.message);
            } else {
                alert("❌ Submission failed: " + result.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("❌ An error occurred. Please try again.");
        }

        // Reset button and form
        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
        document.getElementById("appointment-form").reset();
    });
});
