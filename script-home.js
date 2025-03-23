// Alternate Route Display Handling
const alternateRouteResult = document.getElementById("alternateRouteResult");

function updateAlternateRoute(route) {
    let alternateRouteResult = document.getElementById("alternateRouteResult");

    if (route && route.trim() !== "") {
        alternateRouteResult.textContent = `🚗 Alternate route: ${route}`;
        alternateRouteResult.classList.add("show"); // ✅ Now shows when updated
    } else {
        alternateRouteResult.classList.remove("show"); // ✅ Hide when empty
    }
}


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

    wellKnown: {
    // Well-Known Destinations
    "🏔️Himalayas": "April to June & September to November",
    "🏜️Rajasthan": "October to March (Winter season is best for exploring deserts and forts)",
    "🏝️Goa": "November to February (Pleasant weather, ideal for beaches)",
    "🌿Kerala": "September to March (Cool, best for backwaters & hill stations)",
    "⛰️Ladakh": "June to September (Snow melts, roads are open for travel)",
    "🌄Sikkim": "March to May & September to November (Best views and comfortable climate)",
    "🏖️Andaman & Nicobar Islands": "October to May (Best for water activities and sightseeing)",
    "🌲North-East India": "October to April (Cool and dry, ideal for trekking and cultural experiences)",
    "🛕Uttarakhand": "March to June & September to November (Himalayan treks & pilgrimages)",
    "❄️Kashmir": "March to October (Tulip season to autumn views)",
    "☁️Meghalaya": "October to April (Waterfalls and pleasant weather)",
    },
    

    lesserKnown: {
    // 🏕️ Lesser-Known Destinations
    "🏔️Spiti Valley": "May to September (Best for high-altitude road trips)",
    "⛰️Zanskar Valley": "June to September (For adventure seekers and monks' monasteries)",
    "🌴Majuli Island": "October to March (World’s largest river island in Assam, best for cultural experiences)",
    "🌋Lonar Crater": "October to February (A unique meteorite lake in Maharashtra)",
    "🗻Sandakphu": "October to April (Only place to see Everest, Kanchenjunga, and Makalu together)",
    "🙏Tawang": "March to October (Serene Buddhist town in Arunachal Pradesh)",
    "🏚️Dhanushkodi": "October to March (Ghost town near Rameswaram, Tamil Nadu)",
    "🌊Gokarna": "October to February (Peaceful alternative to Goa’s beaches)",
    "🏛️Hampi": "October to February (UNESCO ruins, great for history lovers and backpackers)",
    "🌲Chopta": "March to June & September to November (Mini Switzerland of India, great for treks)",
    "🌸Valley of Flowers": "July to September (A paradise of blooming flowers in Uttarakhand)",
    },
    
    hiddenGems: {
         // 🌿 Hidden & Unexplored Gems
    "🌄Khajjiar": "March to June & September to November (Mini Switzerland of India in Himachal Pradesh)",
    "🏔️Munsiyari": "March to June (Hidden Himalayan gem in Uttarakhand, best for trekking)",
    "🏕️Shillong": "October to April (Best time to explore Scotland of the East)",
    "🏰Mandu": "October to March (Ruined city in Madhya Pradesh, great for history buffs)",
    "🌳Majkhali": "March to June (Peaceful village near Ranikhet, Uttarakhand)",
    "🛕Bhimashankar": "July to October (Lush green monsoon getaway in Maharashtra)",
    "🌊Chandipur": "November to March (Beach in Odisha where the sea disappears daily!)",
    "🌊Hogenakkal": "October to February (The Niagara Falls of India, in Tamil Nadu-Karnataka border)",
    "🌿Ziro Valley": "September to November (Perfect for nature lovers & the famous music festival in Arunachal)",
    "🏞️Mukteshwar": "March to June & September to November (Peaceful Uttarakhand retreat with great views)",
    "🌄Lepchajagat": "October to April (Untouched, quiet forest near Darjeeling, great for solitude seekers)",
    "🌊Pangong Lake": "May to September (Crystal-clear high-altitude lake in Ladakh, famous from Bollywood)",
    "🏡Malana": "May to October (Mysterious Himalayan village known for its unique customs)",
    "🍃Araku Valley": "October to March (Scenic hill station near Vizag, Andhra Pradesh)",
    "🏕️Kanatal": "March to June (A hidden adventure spot near Mussoorie, great for camping)",
    "🌿Mawlynnong": "October to April (Cleanest village in Asia, Meghalaya)",
    "⛰️Laitlum Canyon": "October to April (Meghalaya’s Grand Canyon, stunning for photography)",
    "🔥Agnee Kund": "April to June (Sacred fire lake in the Himalayas, rare spiritual site)",
    "🏔️Gurez Valley": "May to September (Offbeat paradise in Kashmir, close to Indo-Pak border)",
    "🪂Bir Billing": "October to June (Best place for paragliding in India, Himachal Pradesh)",
    "🌳Patalkot": "October to March (Hidden valley in Madhya Pradesh, home to ancient tribes)",
    "🌲Dibang Valley": "October to March (One of India's least explored valleys, Arunachal Pradesh)"
    }
};


// Destination-based featured routes
const featuredRoutes = {    
    "🏔️Himalayas": "🚗 Manali → Leh → Pangong Lake → Nubra Valley → Srinagar",
    "🏜️Rajasthan": "🚗 Jaipur → Jodhpur → Jaisalmer → Udaipur",
    "🏝️Goa": "🚗 Panaji → North Goa → South Goa → Dudhsagar Falls",
    "🌿Kerala": "🚗 Kochi → Munnar → Thekkady → Alleppey → Kovalam",
    "⛰️Ladakh": "🚗 Leh → Nubra Valley → Pangong Lake → Tso Moriri",
    "🌄Sikkim": "🚗 Gangtok → Tsomgo Lake → Lachen → Yumthang Valley",
    "🏖️Andaman & Nicobar Islands": "🚗 Port Blair → Havelock Island → Neil Island → Baratang",
    "🌲North-East India": "🚗 Guwahati → Shillong → Cherrapunji → Dawki → Kaziranga",
    "🛕Uttarakhand": "🚗 Rishikesh → Auli → Valley of Flowers → Kedarnath",
    "❄️Kashmir": "🚗 Srinagar → Gulmarg → Sonmarg → Pahalgam",
    "☁️Meghalaya": "🚗 Shillong → Cherrapunji → Mawlynnong → Laitlum Canyon",
    "🏔️Spiti Valley": "🚗 Manali → Kaza → Tabo → Pin Valley",
    "⛰️Zanskar Valley": "🚗 Kargil → Padum → Zangla → Phugtal Monastery",
    "🌴Majuli Island": "🚗 Jorhat → Majuli Island → Sivasagar",
    "🌋Lonar Crater": "🚗 Aurangabad → Ajanta & Ellora → Lonar Crater",
    "🗻Sandakphu": "🚗 Manebhanjan → Tumling → Kalipokhri → Sandakphu",
    "🙏Tawang": "🚗 Guwahati → Bomdila → Dirang → Tawang",
    "🏚️Dhanushkodi": "🚗 Rameswaram → Dhanushkodi → Pamban Bridge",
    "🌊Gokarna": "🚗 Bangalore → Murudeshwar → Gokarna → Yana Caves",
    "🏛️Hampi": "🚗 Bangalore → Hospet → Hampi → Anegundi",
    "🌲Chopta": "🚗 Rishikesh → Ukhimath → Chopta → Tungnath",
    "🌸Valley of Flowers": "🚗 Joshimath → Govindghat → Ghangaria → Valley of Flowers",
    "🌄Khajjiar": "🚗 Dalhousie → Khajjiar → Chamba",
    "🏔️Munsiyari": "🚗 Almora → Chaukori → Munsiyari → Birthi Falls",
    "🏕️Shillong": "🚗 Guwahati → Shillong → Laitlum → Dawki",
    "🏰Mandu": "🚗 Indore → Maheshwar → Mandu → Omkareshwar",
    "🌳Majkhali": "🚗 Nainital → Ranikhet → Majkhali",
    "🛕Bhimashankar": "🚗 Pune → Bhimashankar → Matheran",
    "🌊Chandipur": "🚗 Bhubaneswar → Konark → Chandipur → Simlipal",
    "🌊Hogenakkal": "🚗 Bangalore → Hogenakkal → Dharmapuri",
    "🌿Ziro Valley": "🚗 Itanagar → Ziro Valley → Daporijo",
    "🏞️Mukteshwar": "🚗 Nainital → Mukteshwar → Bhowali",
    "🌄Lepchajagat": "🚗 Darjeeling → Lepchajagat → Mirik",
    "🌊Pangong Lake": "🚗 Leh → Chang La → Pangong Lake",
    "🏡Malana": "🚗 Kasol → Malana → Tosh",
    "🍃Araku Valley": "🚗 Visakhapatnam → Borra Caves → Araku Valley",
    "🏕️Kanatal": "🚗 Dehradun → Kanatal → Dhanaulti",
    "🌿Mawlynnong": "🚗 Shillong → Mawlynnong → Dawki",
    "⛰️Laitlum Canyon": "🚗 Shillong → Laitlum Canyon → Smit Village",
    "🔥Agnee Kund": "🚗 Ujjain → Omkareshwar → Agnee Kund",
    "🏔️Gurez Valley": "🚗 Srinagar → Bandipora → Gurez Valley",
    "🪂Bir Billing": "🚗 Mandi → Bir → Billing",
    "🌳Patalkot": "🚗 Chhindwara → Tamia → Patalkot",
    "🌲Dibang Valley": "🚗 Roing → Mayudia Pass → Dibang Valley"
};

const alternateRoutes = {
    "🏔️Himalayas": "🚗 Srinagar → Sonmarg → Drass → Kargil → Leh",
    "🏜️Rajasthan": "🚗 Udaipur → Mount Abu → Jodhpur → Bikaner → Jaipur",
    "🏝️Goa": "🚗 Margao → Palolem → Colva → Panjim → Vagator",
    "🌿Kerala": "🚗 Trivandrum → Varkala → Kollam → Kochi → Wayanad",
    "⛰️Ladakh": "🚗 Manali → Keylong → Jispa → Sarchu → Leh",
    "🌄Sikkim": "🚗 Siliguri → Pelling → Ravangla → Gangtok",
    "🏖️Andaman & Nicobar Islands": "🚗 Neil Island → Rangat → Baratang → Ross Island",
    "🌲North-East India": "🚗 Dimapur → Kohima → Mokokchung → Ziro",
    "🛕Uttarakhand": "🚗 Haridwar → Rishikesh → Devprayag → Auli",
    "❄️Kashmir": "🚗 Jammu → Patnitop → Pahalgam → Gulmarg",
    "☁️Meghalaya": "🚗 Tura → Mawsynram → Dawki → Nongriat",
    "🏔️Spiti Valley": "🚗 Shimla → Reckong Peo → Kaza → Kibber",
    "⛰️Zanskar Valley": "🚗 Leh → Lamayuru → Rangdum → Padum",
    "🌴Majuli Island": "🚗 Tezpur → Kaziranga → Jorhat → Majuli",
    "🌋Lonar Crater": "🚗 Aurangabad → Daulatabad → Lonar → Ajanta",
    "🗻Sandakphu": "🚗 Siliguri → Darjeeling → Manebhanjan → Sandakphu",
    "🙏Tawang": "🚗 Itanagar → Bomdila → Dirang → Tawang",
    "🏚️Dhanushkodi": "🚗 Rameswaram → Devipattinam → Dhanushkodi",
    "🌊Gokarna": "🚗 Karwar → Om Beach → Kudle Beach → Gokarna",
    "🏛️Hampi": "🚗 Hubli → Badami → Aihole → Pattadakal → Hampi",
    "🌲Chopta": "🚗 Rudraprayag → Ukhimath → Tungnath → Chopta",
    "🌸Valley of Flowers": "🚗 Rishikesh → Karnaprayag → Joshimath → Valley of Flowers",
    "🌄Khajjiar": "🚗 Chamba → Dalhousie → Khajjiar → Dharamshala",
    "🏔️Munsiyari": "🚗 Pithoragarh → Munsiyari → Chaukori → Almora",
    "🏕️Shillong": "🚗 Cherrapunji → Nongriat → Mawlynnong → Shillong",
    "🏰Mandu": "🚗 Ujjain → Maheshwar → Mandu → Indore",
    "🌳Majkhali": "🚗 Almora → Binsar → Majkhali → Ranikhet",
    "🛕Bhimashankar": "🚗 Lonavala → Matheran → Bhimashankar",
    "🌊Chandipur": "🚗 Konark → Puri → Bhubaneswar → Chandipur",
    "🌊Hogenakkal": "🚗 Mysore → Male Mahadeshwara Hills → Hogenakkal",
    "🌿Ziro Valley": "🚗 Dibrugarh → Pasighat → Ziro",
    "🏞️Mukteshwar": "🚗 Nainital → Mukteshwar → Sitla → Bhowali",
    "🌄Lepchajagat": "🚗 Darjeeling → Mirik → Lepchajagat → Kurseong",
    "🌊Pangong Lake": "🚗 Leh → Tangste → Pangong Lake → Hanle",
    "🏡Malana": "🚗 Bhuntar → Kasol → Malana → Tosh",
    "🍃Araku Valley": "🚗 Vizag → Borra Caves → Araku → Lambasingi",
    "🏕️Kanatal": "🚗 Dehradun → Mussoorie → Kanatal → Dhanaulti",
    "🌿Mawlynnong": "🚗 Shillong → Mawphlang → Mawlynnong → Dawki",
    "⛰️Laitlum Canyon": "🚗 Shillong → Jowai → Laitlum Canyon → Smit",
    "🔥Agnee Kund": "🚗 Omkareshwar → Ujjain → Agnee Kund",
    "🏔️Gurez Valley": "🚗 Bandipora → Razdan Pass → Dawar → Gurez Valley",
    "🪂Bir Billing": "🚗 Palampur → Baijnath → Bir → Billing",
    "🌳Patalkot": "🚗 Chhindwara → Tamia → Patalkot → Panchmarhi",
    "🌲Dibang Valley": "🚗 Roing → Anini → Dibang Valley → Mayudia Pass"
};

// Function to show categories in dropdown initially
function populateInitialDropdown() {
    let dropdown = document.getElementById("destinationSelect");
    dropdown.innerHTML = `
        <option value="">Choose a Category</option>
        <option value="wellKnown">🏕️ Well-Known - Select a Destination</option>
        <option value="lesserKnown">🌿 Lesser-Known - Select a Destination</option>
        <option value="hiddenGems">🌿 Hidden & Unexplored Gems - Select a Destination</option>
    `;
}


// Function to handle dropdown selection
function handleSelection() {
    let dropdown = document.getElementById("destinationSelect");
    let bestTimeResult = document.getElementById("bestTimeResult"); // ✅ Get Best Time display
    let selectedValue = dropdown.value;

    if (selectedValue === "back") {
        populateInitialDropdown(); // ✅ Go back to category selection
        bestTimeResult.innerText = "Best time varies. Please check destination-specific guides."; // ✅ Reset text
    } else if (travelSeasons[selectedValue]) {
        populateDestinations(selectedValue); // ✅ Now updates destinations properly
    } else {
        showBestTime(selectedValue); // ✅ If it's a destination, show best time
    }
}

// Function to populate destinations based on selected category
function populateDestinations(category) {
    let dropdown = document.getElementById("destinationSelect");

    // Store selected category as the first option to keep it visible
    dropdown.innerHTML = `
        <option value="${category}" selected>${dropdown.options[dropdown.selectedIndex].text}</option>
        <option value="back">⬅️ Go Back</option>
    `;

    Object.keys(travelSeasons[category]).forEach((place) => {
        let option = document.createElement("option");
        option.value = place;
        option.textContent = place;
        dropdown.appendChild(option);
    });
}

// Function to display best time when a destination is selected
function showBestTime(destination) {
    let bestTimeResult = document.getElementById("bestTimeResult");

    for (const category in travelSeasons) {
        if (travelSeasons[category][destination]) {
            bestTimeResult.innerText = `📅 Best time to visit ${destination}: ${travelSeasons[category][destination]}`;
            return;
        }
    }

    bestTimeResult.innerText = "Best time varies. Please check destination-specific guides.";
}

// Function to get the featured route for a destination
function getFeaturedRoute() {
    let selectedDestination = document.getElementById("routeSelect").value;
    let routeResult = document.getElementById("routeResult");
    let alternateRouteResult = document.getElementById("alternateRouteResult");

    // Check if the selected destination has a main route
    if (featuredRoutes[selectedDestination]) {
        routeResult.innerText = `🚗 Recommended route for ${selectedDestination}: ${featuredRoutes[selectedDestination]}`;
    } else {
        routeResult.innerText = "Route details not available.";
    }

    // Check if the selected destination has an alternate route
    if (alternateRoutes[selectedDestination]) {
        alternateRouteResult.innerText = `🚗 Alternate route: ${alternateRoutes[selectedDestination]}`;
        alternateRouteResult.style.display = "block"; // Ensure visibility
    } else {
        alternateRouteResult.innerText = "";
        alternateRouteResult.style.display = "none"; // Hide if no alternate route
    }
}

let map;
let routingControl;

// Initialize OpenStreetMap
function initMap() {
    map = L.map('map').setView([20.5937, 78.9629], 6); // Default: India

    // Add OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

// Function to get the selected route and update map
function getFeaturedRoute() {
    let selectedDestination = document.getElementById("routeSelect").value;
    let routeResult = document.getElementById("routeResult");
    let alternateRouteResult = document.getElementById("alternateRouteResult");

    if (featuredRoutes[selectedDestination]) {
        routeResult.innerText = `🚗 Recommended route: ${featuredRoutes[selectedDestination]}`;
        updateRoute(featuredRoutes[selectedDestination]);
    } else {
        routeResult.innerText = "Route details not available.";
    }

    if (alternateRoutes[selectedDestination]) {
        alternateRouteResult.innerText = `🚗 Alternate route: ${alternateRoutes[selectedDestination]}`;
        alternateRouteResult.style.display = "block";
    } else {
        alternateRouteResult.innerText = "";
        alternateRouteResult.style.display = "none";
    }
}

// Function to update the map with the selected route
function updateRoute(routeString) {
    let places = routeString.replace(/🚗/g, "").split(" → ").map(place => place.trim());

    if (places.length < 2) {
        console.error("Not enough valid waypoints found.");
        return;
    }

    // Remove existing route if present
    if (routingControl) {
        map.removeControl(routingControl);
    }

    let waypoints = [];

    // Fetch coordinates for the locations
    let fetchPromises = places.map(place =>
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let lat = parseFloat(data[0].lat);
                let lon = parseFloat(data[0].lon);
                waypoints.push(L.latLng(lat, lon));
            }
        })
    );

    // Wait for all fetch requests to complete before creating the route
    Promise.all(fetchPromises).then(() => {
        if (waypoints.length < 2) {
            console.error("Not enough valid waypoints found.");
            return;
        }

        routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: true,
            createMarker: function (i, waypoint, n) {
                return L.marker(waypoint.latLng).bindPopup(places[i]);
            }
        }).addTo(map);

        // Generate Google Maps Link
        generateGoogleMapsLink(waypoints);
    }).catch(error => console.error("Error fetching route data:", error));
}

// Function to Generate Google Maps Link
function generateGoogleMapsLink(waypoints) {
    if (waypoints.length < 2) return;

    let start = waypoints[0];
    let end = waypoints[waypoints.length - 1];

    let googleMapsLink = `https://www.google.com/maps/dir/${start.lat},${start.lng}/${end.lat},${end.lng}`;

    // Remove existing button if any
    let existingButton = document.getElementById("googleMapsButton");
    if (existingButton) {
        existingButton.remove();
    }

    // Create Google Maps Button
    let button = document.createElement("button");
    button.id = "googleMapsButton";
    button.innerHTML = "Open in Google Maps";
    button.style.margin = "10px";
    button.style.padding = "5px 10px";
    button.style.background = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.onclick = function () {
        window.open(googleMapsLink, "_blank");
    };

    // Append Button to Routing Panel
    let routingContainer = document.querySelector(".leaflet-routing-container");
    if (routingContainer) {
        routingContainer.appendChild(button);
    }
}

// Initialize the map on page load
document.addEventListener("DOMContentLoaded", initMap);

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    populateInitialDropdown(); // ✅ Show categories first

    let routeDropdown = document.getElementById("routeSelect");

    // Ensure route dropdown starts with the correct placeholder
    routeDropdown.innerHTML = '<option value="">🚀🔥 Let\'s Travel 🚀🔥</option>';

    // ✅ Populate the routes dropdown correctly
    Object.keys(featuredRoutes).forEach(place => {
        let option = document.createElement("option");
        option.value = place;
        option.textContent = place;
        routeDropdown.appendChild(option);
    });
});
