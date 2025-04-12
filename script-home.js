
// ✅ Smooth Scrolling for Navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (!href.startsWith("#")) return;

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

// Alternate Routes - Now Stored as Arrays
const alternateRoutes = {
    "🏔️Himalayas": [
        "🚗 Srinagar → Sonmarg → Drass → Kargil → Leh",
        "🚗 Delhi → Shimla → Kinnaur → Spiti → Leh"
    ],
     "🏜️Rajasthan": [
        "🚗 Udaipur → Mount Abu → Jodhpur → Bikaner → Jaipur",
        "🚗 Delhi → Jaipur → Jaisalmer → Jodhpur → Udaipur"
    ],
     "🏝️Goa": [
        "🚗 Margao → Palolem → Colva → Panjim → Vagator",
        "🚗 Pune → Amboli Ghat → Goa"
    ],
    "🌿Kerala": [
        "🚗 Trivandrum → Varkala → Kollam → Kochi → Wayanad",
        "🚗 Calicut → Wayanad → Munnar → Thekkady"
    ],
    "⛰️Ladakh": [
        "🚗 Manali → Keylong → Jispa → Sarchu → Leh",
        "🚗 Srinagar → Kargil → Leh → Pangong"
    ],
     "🌄Sikkim": [
        "🚗 Siliguri → Pelling → Ravangla → Gangtok",
        "🚗 Darjeeling → Namchi → Gangtok"
    ],
    "🏖️Andaman & Nicobar Islands": [
        "🚗 Neil Island → Rangat → Baratang → Ross Island",
        "🚗 Havelock → North Bay → Port Blair"
    ],
    "🌲North-East India": [
        "🚗 Dimapur → Kohima → Mokokchung → Ziro",
        "🚗 Guwahati → Kaziranga → Majuli → Ziro"
    ],
    "🛕Uttarakhand": [
        "🚗 Dehradun → Mussoorie → Tehri → Auli → Kedarnath",
        "🚗 Haridwar → Rishikesh → Devprayag → Chopta → Kedarnath"
    ],
    "❄️Kashmir": [
        "🚗 Jammu → Patnitop → Pahalgam → Gulmarg → Srinagar",
        "🚗 Srinagar → Baramulla → Kupwara → Keran → Pahalgam"
    ],
    "☁️Meghalaya": [
        "🚗 Guwahati → Nongpoh → Shillong → Mawlynnong → Dawki",
        "🚗 Shillong → Jowai → Krangsuri Falls → Dawki → Mawlynnong"
    ],
    "🏔️Spiti Valley": [
        "🚗 Shimla → Reckong Peo → Nako → Kaza → Pin Valley",
        "🚗 Manali → Rohtang Pass → Kunzum Pass → Kaza → Dhankar"
    ],
    "⛰️Zanskar Valley": [
        "🚗 Leh → Lamayuru → Rangdum → Padum → Phugtal Monastery",
        "🚗 Kargil → Suru Valley → Rangdum → Zangla → Padum"
    ],
    "🌴Majuli Island": [
        "🚗 Jorhat → Nimati Ghat → Majuli Island → Garmur → Sivasagar",
        "🚗 Guwahati → Kaziranga → Jorhat → Majuli Island → Sivasagar"
    ],
    "🌋Lonar Crater": [
        "🚗 Aurangabad → Daulatabad → Ellora → Ajanta → Lonar Crater",
        "🚗 Pune → Ahmednagar → Aurangabad → Ajanta → Lonar"
    ],
    "🗻Sandakphu": [
        "🚗 Siliguri → Mirik → Manebhanjan → Sandakphu",
        "🚗 Darjeeling → Tumling → Kalipokhri → Sandakphu"
    ],
    "🙏Tawang": [
        "🚗 Guwahati → Tezpur → Bomdila → Dirang → Tawang",
        "🚗 Itanagar → Ziro → Seppa → Bomdila → Tawang"
    ],
    "🏚️Dhanushkodi": [
        "🚗 Rameswaram → Pamban Bridge → Dhanushkodi → Arichal Munai",
        "🚗 Madurai → Ramanathapuram → Rameswaram → Dhanushkodi"
    ],
    "🌊Gokarna": [
        "🚗 Hubli → Sirsi → Kumta → Gokarna",
        "🚗 Karwar → Om Beach → Kudle Beach → Gokarna"
    ],
    "🏛️Hampi": [
        "🚗 Hubli → Gadag → Badami → Aihole → Pattadakal → Hampi",
        "🚗 Bangalore → Chitradurga → Hospet → Hampi"
    ],
    "🌲Chopta": [
        "🚗 Rishikesh → Devprayag → Rudraprayag → Chopta",
        "🚗 Haridwar → Srinagar → Ukhimath → Chopta"
    ],
    "🌸Valley of Flowers": [
        "🚗 Rishikesh → Joshimath → Govindghat → Hemkund Sahib → Valley of Flowers",
        "🚗 Haridwar → Devprayag → Karnaprayag → Ghangaria → Valley of Flowers"
    ],
    "🌄Khajjiar": [
        "🚗 Pathankot → Dalhousie → Khajjiar → Chamba",
        "🚗 Amritsar → Dharamshala → Dalhousie → Khajjiar"
    ],
    "🏔️Munsiyari": [
        "🚗 Almora → Binsar → Chaukori → Munsiyari",
        "🚗 Pithoragarh → Dharchula → Munsiyari"
    ],
    "🏕️Shillong": [
        "🚗 Guwahati → Nongpoh → Shillong → Laitlum → Dawki",
        "🚗 Shillong → Cherrapunji → Mawlynnong → Dawki"
    ],
    "🏰Mandu": [
        "🚗 Indore → Maheshwar → Omkareshwar → Mandu",
        "🚗 Ujjain → Dewas → Indore → Mandu"
    ],
    "🌳Majkhali": [
        "🚗 Almora → Ranikhet → Majkhali",
        "🚗 Nainital → Bhowali → Ranikhet → Majkhali"
    ],
    "🛕Bhimashankar": [
        "🚗 Pune → Rajgurunagar → Bhimashankar → Matheran",
        "🚗 Mumbai → Lonavala → Karjat → Bhimashankar"
    ],
    "🌊Chandipur": [
        "🚗 Bhubaneswar → Puri → Konark → Chandipur",
        "🚗 Cuttack → Jajpur → Bhadrak → Chandipur"
    ],
    "🌊Hogenakkal": [
        "🚗 Bangalore → Hosur → Denkanikottai → Hogenakkal",
        "🚗 Salem → Mettur → Hogenakkal"
    ],
    "🌿Ziro Valley": [
        "🚗 Itanagar → Ziro Valley → Daporijo",
        "🚗 Dibrugarh → Pasighat → Along → Ziro Valley"
    ],
    "🏞️Mukteshwar": [
        "🚗 Nainital → Bhimtal → Mukteshwar",
        "🚗 Almora → Binsar → Mukteshwar"
    ],
    "🌄Lepchajagat": [
        "🚗 Darjeeling → Jorpokhri → Lepchajagat → Mirik",
        "🚗 Siliguri → Kurseong → Ghoom → Lepchajagat"
    ],
    "🌊Pangong Lake": [
        "🚗 Leh → Chang La → Pangong Lake",
        "🚗 Leh → Hemis → Tso Moriri → Pangong Lake"
    ],
     "🏡Malana": [
        "🚗 Bhuntar → Kasol → Malana → Tosh",
        "🚗 Manali → Naggar → Malana → Tosh"
    ],
    "🍃Araku Valley": [
        "🚗 Visakhapatnam → Simhachalam → Borra Caves → Araku Valley",
        "🚗 Vizag → Lambasingi → Araku"
    ],
     
    "🏕️Kanatal": [
        "🚗 Dehradun → Mussoorie → Kanatal → Dhanaulti",
        "🚗 Rishikesh → Tehri → Kanatal"
    ],
    "🌿Mawlynnong": [
        "🚗 Shillong → Sohra → Mawlynnong → Dawki",
        "🚗 Guwahati → Nongpoh → Shillong → Mawlynnong"
    ],
    "⛰️Laitlum Canyon": [
        "🚗 Shillong → Jowai → Laitlum Canyon → Smit",
        "🚗 Shillong → Mawphlang → Laitlum Canyon"
    ],
    "🔥Agnee Kund": [
        "🚗 Omkareshwar → Ujjain → Agnee Kund",
        "🚗 Indore → Dewas → Omkareshwar → Agnee Kund"
    ],
    "🏔️Gurez Valley": [
        "🚗 Srinagar → Bandipora → Gurez Valley",
        "🚗 Baramulla → Kupwara → Dawar → Gurez Valley"
    ],
    "🪂Bir Billing": [
        "🚗 Mandi → Baijnath → Bir → Billing",
        "🚗 Dharamshala → Palampur → Bir Billing"
    ],
    "🌳Patalkot": [
        "🚗 Chhindwara → Tamia → Patalkot",
        "🚗 Nagpur → Seoni → Patalkot"
    ],
    "🌲Dibang Valley": [
        "🚗 Dibrugarh → Roing → Mayudia Pass → Dibang Valley",
        "🚗 Itanagar → Pasighat → Roing → Dibang Valley"
    ]
};


// ✅ Function to populate destinations based on category selection
function populateDestinations() {
    let categoryDropdown = document.getElementById("categorySelect");
    let destinationDropdown = document.getElementById("destinationSelect");
    let bestTimeResult = document.getElementById("bestTimeResult");

    let selectedCategory = categoryDropdown.value;

    // ✅ Reset best time message
    bestTimeResult.innerHTML = "Best time varies.<br>Please check destination-specific guides.";

    // ✅ Reset destinations dropdown
    destinationDropdown.innerHTML = `<option value="" disabled selected>Choose a Destination</option>`;

    if (selectedCategory && travelSeasons[selectedCategory]) {
        Object.keys(travelSeasons[selectedCategory]).forEach(destination => {
            let option = document.createElement("option");
            option.value = destination;
            option.textContent = destination;
            destinationDropdown.appendChild(option);
        });
    }
}

// ✅ Function to display best time for selected destination
function showBestTime() {
    let destinationDropdown = document.getElementById("destinationSelect");
    let bestTimeResult = document.getElementById("bestTimeResult");
    let selectedDestination = destinationDropdown.value;

    bestTimeResult.innerHTML = "Best time varies<br>Please check destination-specific guides.";

    for (const category in travelSeasons) {
        if (travelSeasons[category][selectedDestination]) {
            bestTimeResult.innerHTML = `📅 Best time to visit:<br>${selectedDestination}: ${travelSeasons[category][selectedDestination]}`;
            return;
        }
    }
}

    // ✅ Function to get featured & alternate routes for a destination
function getFeaturedRoute() {
    let selectedDestination = document.getElementById("routeSelect").value;
    let routeResult = document.getElementById("routeResult");
    let alternateRouteResult = document.getElementById("alternateRouteResult");

    if (!selectedDestination) {
        routeResult.innerHTML = "Best route varies.<br>Please check destination-specific guides.";
        alternateRouteResult.innerHTML = "Select a destination for alternate route.";
        alternateRouteResult.style.display = "block";
        return;
    }

// ✅ Show main route
routeResult.innerHTML = featuredRoutes[selectedDestination]
? `🚗 Recommended route:<br>${featuredRoutes[selectedDestination]}`
: "Route details not available.";

// ✅ Show multiple alternate routes properly
if (alternateRoutes[selectedDestination]) {
let formattedRoutes = alternateRoutes[selectedDestination].map(route => `🚗 ${route}`).join("<br>");
alternateRouteResult.innerHTML = formattedRoutes;
alternateRouteResult.style.display = "block";
} else {
alternateRouteResult.innerHTML = "Select a destination for alternate route.";
alternateRouteResult.style.display = "block";
}
}

// ✅ Ensure correct dropdown behavior on page load
document.addEventListener("DOMContentLoaded", () => {
    // Handle vision intro popup
    const visionIntro = document.getElementById("vision-intro");
    const skipBtn = document.getElementById("skip-button");
  
    // Check if the user has already skipped the popup using localStorage
    if (localStorage.getItem("popupSkipped")) {
      visionIntro.classList.add("hidden");
    }
  
    // Skip button to hide the popup and store the skip action in localStorage
    skipBtn.addEventListener("click", () => {
      visionIntro.classList.add("hidden");
      localStorage.setItem("popupSkipped", "true");
    });
  
    // Populate default category (Assuming you have a function to do this)
    populateDestinations();
  
    // Populate routes dropdown
    let routeDropdown = document.getElementById("routeSelect");
    routeDropdown.innerHTML = `<option value="">🚀🔥 Let's Travel 🚀🔥</option>`;
  
    Object.keys(featuredRoutes).forEach(place => {
      let option = document.createElement("option");
      option.value = place;
      option.textContent = place;
      routeDropdown.appendChild(option);
    });
  
    // Set correct default messages
    document.getElementById("routeResult").innerHTML = "Best route varies.<br>Please check destination-specific guides.";
    document.getElementById("alternateRouteResult").innerHTML = "Select a destination for alternate route.";
    document.getElementById("alternateRouteResult").style.display = "block";
  });
  
