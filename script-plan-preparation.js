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

        if (!formData.name || !formData.contact || !formData.purpose || !formData.destination || !formData.stay || !formData.budget || !formData.appointment || !formData.email) {
            alert("❌ Please complete all required fields.");
            return;
        }

        // Button loading animation
        const bookButton = document.getElementById("book-button");
        bookButton.innerHTML = "⏳ Booking...";
        bookButton.disabled = true;

        // API Endpoint
        const apiUrl = "https://script.google.com/macros/s/AKfycbxWwMAL_ZOquecHozztfqql6xCf5KpfRWjdVY4lVWiwS6-_prdvDHlKofN8zsB5-PeK/exec";

        // Function to submit form data
        async function submitForm(mode) {
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    mode: mode, // "cors" or "no-cors"
                    credentials: "omit",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData),
                });

                if (mode === "cors") {
                    if (!response.ok) throw new Error("CORS error. Switching to alternative method...");
                    const result = await response.json();
                    alert(result.message);
                } else {
                    alert("✅ Appointment booked successfully! (No response received)");
                }
            } catch (error) {
                console.error(`Submission Error (${mode} mode):`, error);
                return false;
            }
            return true;
        }

        // Attempt 1: Using "cors" mode
        const corsSuccess = await submitForm("cors");

        // Attempt 2: If CORS fails, use "no-cors" as a fallback
        if (!corsSuccess) {
            alert("⚠️ Retrying with alternative method...");
            await submitForm("no-cors");
        }

        // Reset button and form
        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
        document.getElementById("appointment-form").reset();
    });
});
