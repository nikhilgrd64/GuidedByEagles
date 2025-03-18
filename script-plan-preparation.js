// Firebase configuration (Replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
    const appointmentInput = document.getElementById("appointment");
    const calendarIcon = document.querySelector(".calendar-icon");
    const bookButton = document.getElementById("book-button");

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
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
            // Store data in Firestore
            await db.collection("appointments").add(formData);
            alert("✅ Appointment booked successfully!");
            document.getElementById("appointment-form").reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("❌ Submission failed. Please try again.");
        }

        // Reset button state
        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
    });
});
// Firebase configuration (Replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
    const appointmentInput = document.getElementById("appointment");
    const calendarIcon = document.querySelector(".calendar-icon");
    const bookButton = document.getElementById("book-button");

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
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
            // Store data in Firestore
            await db.collection("appointments").add(formData);
            alert("✅ Appointment booked successfully!");
            document.getElementById("appointment-form").reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("❌ Submission failed. Please try again.");
        }

        // Reset button state
        bookButton.innerHTML = "📅 Book Appointment";
        bookButton.disabled = false;
    });
});
