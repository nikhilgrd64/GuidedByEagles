// Smooth Scrolling for Navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');

        // Ignore external links (e.g., "trip-planning.html")
        if (!href.startsWith("#")) {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

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

// Destination-based featured routes
const featuredRoutes = {    
            "himalayas": "🚗 Manali → Leh → Pangong Lake → Nubra Valley → Srinagar",
            "rajasthan": "🚗 Jaipur → Jodhpur → Jaisalmer → Udaipur",
            "goa": "🚗 Panaji → North Goa → South Goa → Dudhsagar Falls",
            "kerala": "🚗 Kochi → Munnar → Thekkady → Alleppey → Kovalam",
            "ladakh": "🚗 Leh → Nubra Valley → Pangong Lake → Tso Moriri",
            "sikkim": "🚗 Gangtok → Tsomgo Lake → Lachen → Yumthang Valley",
            "andaman": "🚗 Port Blair → Havelock Island → Neil Island → Baratang",
            "north-east india": "🚗 Guwahati → Shillong → Cherrapunji → Dawki → Kaziranga",
            "uttarakhand": "🚗 Rishikesh → Auli → Valley of Flowers → Kedarnath",
            "kashmir": "🚗 Srinagar → Gulmarg → Sonmarg → Pahalgam",
            "meghalaya": "🚗 Shillong → Cherrapunji → Mawlynnong → Laitlum Canyon",
            "spiti valley": "🚗 Manali → Kaza → Tabo → Pin Valley",
            "zanskar valley": "🚗 Kargil → Padum → Zangla → Phugtal Monastery",
            "majuli island": "🚗 Jorhat → Majuli Island → Sivasagar",
            "lonar crater": "🚗 Aurangabad → Ajanta & Ellora → Lonar Crater",
            "sandakphu": "🚗 Manebhanjan → Tumling → Kalipokhri → Sandakphu",
            "tawang": "🚗 Guwahati → Bomdila → Dirang → Tawang",
            "dhanushkodi": "🚗 Rameswaram → Dhanushkodi → Pamban Bridge",
            "gokarna": "🚗 Bangalore → Murudeshwar → Gokarna → Yana Caves",
            "hampi": "🚗 Bangalore → Hospet → Hampi → Anegundi",
            "chopta": "🚗 Rishikesh → Ukhimath → Chopta → Tungnath",
            "valley of flowers": "🚗 Joshimath → Govindghat → Ghangaria → Valley of Flowers",
            "khajjiar": "🚗 Dalhousie → Khajjiar → Chamba",
            "munsiyari": "🚗 Almora → Chaukori → Munsiyari → Birthi Falls",
            "shillong": "🚗 Guwahati → Shillong → Laitlum → Dawki",
            "mandu": "🚗 Indore → Maheshwar → Mandu → Omkareshwar",
            "majkhali": "🚗 Nainital → Ranikhet → Majkhali",
            "bhimashankar": "🚗 Pune → Bhimashankar → Matheran",
            "chandipur": "🚗 Bhubaneswar → Konark → Chandipur → Simlipal",
            "hogenakkal": "🚗 Bangalore → Hogenakkal → Dharmapuri",
            "ziro valley": "🚗 Itanagar → Ziro Valley → Daporijo",
            "mukteshwar": "🚗 Nainital → Mukteshwar → Bhowali",
            "lepchajagat": "🚗 Darjeeling → Lepchajagat → Mirik",
            "pangong lake": "🚗 Leh → Chang La → Pangong Lake",
            "malana": "🚗 Kasol → Malana → Tosh",
            "araku valley": "🚗 Visakhapatnam → Borra Caves → Araku Valley",
            "kanatal": "🚗 Dehradun → Kanatal → Dhanaulti",
            "mawlynnong": "🚗 Shillong → Mawlynnong → Dawki",
            "laitlum canyon": "🚗 Shillong → Laitlum Canyon → Smit Village",
            "agnee kund": "🚗 Ujjain → Omkareshwar → Agnee Kund",
            "gurez valley": "🚗 Srinagar → Bandipora → Gurez Valley",
            "bir billing": "🚗 Mandi → Bir → Billing",
            "patalkot": "🚗 Chhindwara → Tamia → Patalkot",
            "dibang valley": "🚗 Roing → Mayudia Pass → Dibang Valley"  
};

// Function to get the best time to visit a destination
function getBestTime() {
    let selectedDestination = document.getElementById("destinationSelect").value.toLowerCase();
    let bestTimeResult = document.getElementById("bestTimeResult");

    if (travelSeasons[selectedDestination]) {
        bestTimeResult.innerText = `Best time to visit ${selectedDestination.charAt(0).toUpperCase() + selectedDestination.slice(1)}: ${travelSeasons[selectedDestination]}.`;
    } else {
        bestTimeResult.innerText = "Best time varies. Please check destination-specific guides.";
    }
}

// Function to get the featured route for a destination
function getFeaturedRoute() {
    let selectedDestination = document.getElementById("routeSelect").value.toLowerCase();
    let routeResult = document.getElementById("routeResult");

    if (featuredRoutes[selectedDestination]) {
        routeResult.innerText = `Recommended route for ${selectedDestination.charAt(0).toUpperCase() + selectedDestination.slice(1)}: ${featuredRoutes[selectedDestination]}`;
    } else {
        routeResult.innerText = "Route details not available. Please check specific travel guides.";
    }
}

// Populate Dropdowns on Page Load
document.addEventListener("DOMContentLoaded", () => {
    let destinationDropdown = document.getElementById("destinationSelect");
    let routeDropdown = document.getElementById("routeSelect");

    Object.keys(travelSeasons).forEach(place => {
        let option = document.createElement("option");
        option.value = place;
        option.textContent = place.charAt(0).toUpperCase() + place.slice(1);
        destinationDropdown.appendChild(option);
    });

    Object.keys(featuredRoutes).forEach(place => {
        let option = document.createElement("option");
        option.value = place;
        option.textContent = place.charAt(0).toUpperCase() + place.slice(1);
        routeDropdown.appendChild(option);
    });
});
