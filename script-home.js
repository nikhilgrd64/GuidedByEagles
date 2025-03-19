// Smooth Scrolling for Navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');

        // Ignore external links (e.g., "trip-planning.html")
        if (!href.startsWith("#")) return;

        const target = document.querySelector(href);

        // Prevent default behavior only if the target exists
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn("Target not found for:", href);
        }
    });
});

// Quick Planning Tool - Best Time to Visit (Dropdown Version)
function getBestTime() {
    let selectedDestination = document.getElementById("destinationSelect").value;
    let bestTimeResult = document.getElementById("bestTimeResult");

    // Destination-based best time recommendations
    const travelSeasons = {
        "himalayas": "April to June & September to November",
        "rajasthan": "October to March (Winter season is best for exploring deserts and forts)",
        "goa": "November to February (Pleasant weather, ideal for beaches)",
        "kerala": "September to March (Cool, best for backwaters & hill stations)",
        "ladakh": "June to September (Snow melts, roads are open for travel)",
        "sikkim": "March to May & September to November (Best views and comfortable climate)",
        "andaman": "October to May (Best for water activities and sightseeing)",
        "north-east india": "October to April (Cool and dry, ideal for trekking and cultural experiences)",
        "uttarakhand": "March to June & September to November (Himalayan treks & pilgrimages)",
        "kashmir": "March to October (Tulip season to autumn views)",
        "meghalaya": "October to April (Waterfalls and pleasant weather)",

        // 🏕️ Lesser-Known Destinations
        "spiti valley": "May to September (Best for high-altitude road trips)",
        "zanskar valley": "June to September (For adventure seekers and monks' monasteries)",
        "majuli island": "October to March (World’s largest river island in Assam, best for cultural experiences)",
        "lonar crater": "October to February (A unique meteorite lake in Maharashtra)",
        "sandakphu": "October to April (Only place to see Everest, Kanchenjunga, and Makalu together)",
        "tawang": "March to October (Serene Buddhist town in Arunachal Pradesh)",
        "dhanushkodi": "October to March (Ghost town near Rameswaram, Tamil Nadu)",
        "gokarna": "October to February (Peaceful alternative to Goa’s beaches)",
        "hampi": "October to February (UNESCO ruins, great for history lovers and backpackers)",
        "chopta": "March to June & September to November (Mini Switzerland of India, great for treks)",
        "valley of flowers": "July to September (A paradise of blooming flowers in Uttarakhand)",

        // 🌿 Hidden & Unexplored Gems
        "khajjiar": "March to June & September to November (Mini Switzerland of India in Himachal Pradesh)",
        "munsiyari": "March to June (Hidden Himalayan gem in Uttarakhand, best for trekking)",
        "shillong": "October to April (Best time to explore Scotland of the East)",
        "mandu": "October to March (Ruined city in Madhya Pradesh, great for history buffs)",
        "majkhali": "March to June (Peaceful village near Ranikhet, Uttarakhand)",
        "bhimashankar": "July to October (Lush green monsoon getaway in Maharashtra)",
        "chandipur": "November to March (Beach in Odisha where the sea disappears daily!)",
        "hogenakkal": "October to February (The Niagara Falls of India, in Tamil Nadu-Karnataka border)",
        "ziro valley": "September to November (Perfect for nature lovers & the famous music festival in Arunachal)",
        "mukteshwar": "March to June & September to November (Peaceful Uttarakhand retreat with great views)",
        "lepchajagat": "October to April (Untouched, quiet forest near Darjeeling, great for solitude seekers)",
        "pangong lake": "May to September (Crystal-clear high-altitude lake in Ladakh, famous from Bollywood)",
        "malana": "May to October (Mysterious Himalayan village known for its unique customs)",
        "araku valley": "October to March (Scenic hill station near Vizag, Andhra Pradesh)",
        "kanatal": "March to June (A hidden adventure spot near Mussoorie, great for camping)",
        "mawlynnong": "October to April (Cleanest village in Asia, Meghalaya)",
        "laitlum canyon": "October to April (Meghalaya’s Grand Canyon, stunning for photography)",
        "agnee kund": "April to June (Sacred fire lake in the Himalayas, rare spiritual site)",
        "gurez valley": "May to September (Offbeat paradise in Kashmir, close to Indo-Pak border)",
        "bir billing": "October to June (Best place for paragliding in India, Himachal Pradesh)",
        "patalkot": "October to March (Hidden valley in Madhya Pradesh, home to ancient tribes)",
        "dibang valley": "October to March (One of India's least explored valleys, Arunachal Pradesh)"
    };

    // Convert input to lowercase for consistency
    selectedDestination = selectedDestination.toLowerCase();

    // Check if the selected destination exists in the predefined list
    if (travelSeasons[selectedDestination]) {
        bestTimeResult.innerText = `Best time to visit ${selectedDestination.charAt(0).toUpperCase() + selectedDestination.slice(1)} is ${travelSeasons[selectedDestination]}.`;
    } else {
        bestTimeResult.innerText = "Best time varies. Please check destination-specific guides.";
    }
}

// Run the function to populate dropdown on page load
document.addEventListener("DOMContentLoaded", () => {
    let dropdown = document.getElementById("destinationSelect");

    // Populate dropdown dynamically
    Object.keys(travelSeasons).forEach((place) => {
        let option = document.createElement("option");
        option.value = place.toLowerCase(); // Use lowercase values for consistency
        option.textContent = `🌍 ${place}`; // Adding an emoji for better visuals
        dropdown.appendChild(option);
    });
});
