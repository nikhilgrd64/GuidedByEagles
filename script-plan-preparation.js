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

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbxWwMAL_ZOquecHozztfqql6xCf5KpfRWjdVY4lVWiwS6-_prdvDHlKofN8zsB5-PeK/exec", {
                method: "POST",
                mode: "cors",  // ✅ Allow cross-origin requests
                credentials: "omit",  // ✅ Prevent sending unnecessary credentials
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
        
            const result = await response.json();
            console.log("Response:", result);  // ✅ Debugging log
            alert(result.message);
        
        } catch (error) {
            console.error("Submission Error:", error);  // ✅ Show detailed error
            alert("❌ Failed to submit. Please try again.");
        }
        

        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
        document.getElementById("appointment-form").reset();
    });
});
