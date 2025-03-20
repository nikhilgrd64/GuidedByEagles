// Alternate Route Display Handling
const alternateRouteResult = document.getElementById("alternateRouteResult");

function updateAlternateRoute(route) {
    if (route && route.trim() !== "") {
        alternateRouteResult.textContent = `🚗 Alternate route: ${route}`;
        alternateRouteResult.style.display = "inline-block"; // Show when route exists
    } else {
        alternateRouteResult.style.display = "none"; // Hide when empty
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


// Function to get the best time to visit a destination
function getBestTime() {
    let destinationDropdown = document.getElementById("destinationSelect");
    let selectedDestination = destinationDropdown.value;
    let bestTimeResult = document.getElementById("bestTimeResult");

    if (travelSeasons[selectedDestination]) {
        bestTimeResult.innerText = `Best time to visit ${selectedDestination}: ${travelSeasons[selectedDestination]}`;
    } else {
        bestTimeResult.innerText = "Best time varies. Please check destination-specific guides.";
    }
}


// Function to get the featured route for a destination
function getFeaturedRoute() {
    let routeDropdown = document.getElementById("routeSelect");
    let selectedDestination = routeDropdown.value;
    let routeResult = document.getElementById("routeResult");
    let alternateRouteResult = document.getElementById("alternateRouteResult");

    if (selectedDestination === "") {
        routeResult.innerText = "Best route varies. Please check destination-specific guides.";
        alternateRouteResult.innerText = "";
    } else if (featuredRoutes[selectedDestination]) {
        routeResult.innerText = `Recommended route for ${selectedDestination}: ${featuredRoutes[selectedDestination]}`;
        alternateRouteResult.innerText = alternateRoutes[selectedDestination] 
            ? `🚗 Alternate route: ${alternateRoutes[selectedDestination]}` 
            : "No alternate route available.";
    } else {
        routeResult.innerText = "Route details not available. Please check specific travel guides.";
        alternateRouteResult.innerText = "";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    let destinationDropdown = document.getElementById("destinationSelect");
    let routeDropdown = document.getElementById("routeSelect");

    // Clear existing options to prevent duplication
    destinationDropdown.innerHTML = '<option value="">🚀🔥 Let\'s Travel 🚀🔥</option>';
    routeDropdown.innerHTML = '<option value="">🚀🔥 Let\'s Travel 🚀🔥</option>';

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
