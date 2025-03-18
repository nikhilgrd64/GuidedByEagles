<!-- Firebase SDK (ES Module) -->
<script type="module">
  // Import Firebase Modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

  // Firebase Configuration (Replace with Your Firebase Credentials)
  const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  document.addEventListener("DOMContentLoaded", function () {
      const appointmentInput = document.getElementById("appointment");
      const calendarIcon = document.querySelector(".calendar-icon");
      const bookButton = document.getElementById("book-button");

      // Open Date-Time Picker
      calendarIcon.addEventListener("click", function () {
          appointmentInput.showPicker();
      });

      // Form Submission
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
              timestamp: serverTimestamp()
          };

          // Validate Required Fields
          if (Object.values(formData).some(value => !value)) {
              alert("❌ Please complete all required fields.");
              return;
          }

          // Show Loading Animation
          bookButton.innerHTML = "⏳ Booking...";
          bookButton.disabled = true;

          try {
              // Store Data in Firestore
              await addDoc(collection(db, "appointments"), formData);
              alert("✅ Appointment booked successfully!");
              document.getElementById("appointment-form").reset();
          } catch (error) {
              console.error("Error submitting form:", error);
              alert("❌ Submission failed. Please try again.");
          }

          // Reset Button State
          bookButton.innerHTML = "📅 Book Appointment";
          bookButton.disabled = false;
      });
  });
</script>
