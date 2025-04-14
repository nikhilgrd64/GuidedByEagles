import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointment-form");
    const bookButton = document.getElementById("book-button");

    appointmentForm.addEventListener("submit", async function (event) {
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
            timestamp: serverTimestamp()
        };

        if (Object.values(formData).some(value => !value)) {
            alert("❌ Please complete all required fields.");
            return;
        }

        bookButton.innerHTML = "⏳ Booking...";
        bookButton.disabled = true;

        try {
            await addDoc(collection(db, "appointments"), formData);
            alert("✅ Appointment booked successfully!");
            appointmentForm.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("❌ Submission failed. Please try again.");
        }

        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
    });
});
