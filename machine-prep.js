function showVehicleTips(vehicle) {
    const tips = {
      motorcycle: `
        <div class="bg-black border border-red-900 rounded-xl p-6 text-white space-y-3">
          <h3 class="text-xl font-bold text-red-500 mb-2">🏍️ Motorcycle Prep Tips</h3>
          <ul class="list-disc list-inside text-gray-300">
            <li>Check oil, chain tension, and brake fluid.</li>
            <li>Inspect tires for grip and punctures.</li>
            <li>Carry a puncture kit and basic tools.</li>
            <li>Ensure headlights and indicators work well.</li>
          </ul>
        </div>
      `,
      car: `
        <div class="bg-black border border-red-900 rounded-xl p-6 text-white space-y-3">
          <h3 class="text-xl font-bold text-red-500 mb-2">🚗 Car Prep Tips</h3>
          <ul class="list-disc list-inside text-gray-300">
            <li>Check coolant, engine oil, and wiper fluid.</li>
            <li>Inspect tire pressure and tread depth.</li>
            <li>Test all lights and battery condition.</li>
            <li>Keep a spare tire, jack, and jumper cables.</li>
          </ul>
        </div>
      `,
      suv: `
        <div class="bg-black border border-red-900 rounded-xl p-6 text-white space-y-3">
          <h3 class="text-xl font-bold text-red-500 mb-2">🚙 SUV Prep Tips</h3>
          <ul class="list-disc list-inside text-gray-300">
            <li>Check 4x4 system functionality if off-roading.</li>
            <li>Inspect suspension, tires, and underbody.</li>
            <li>Ensure traction control and ABS work properly.</li>
            <li>Carry extra fuel and a tire inflator kit.</li>
          </ul>
        </div>
      `,
      van: `
        <div class="bg-black border border-red-900 rounded-xl p-6 text-white space-y-3">
          <h3 class="text-xl font-bold text-red-500 mb-2">🚐 Camper Van Prep Tips</h3>
          <ul class="list-disc list-inside text-gray-300">
            <li>Check gas, water, and electrical systems.</li>
            <li>Inspect brakes, tires, and weight load.</li>
            <li>Test solar panels and backup power.</li>
            <li>Stock up on essentials — food, tools, first aid.</li>
          </ul>
        </div>
      `,
      "4x4": `
        <div class="bg-black border border-red-900 rounded-xl p-6 text-white space-y-3">
          <h3 class="text-xl font-bold text-red-500 mb-2"><i class="fas fa-truck-pickup"></i> 4x4 Off-Roader Prep Tips</h3>
          <ul class="list-disc list-inside text-gray-300">
            <li>Check differential locks, transfer case, and recovery points.</li>
            <li>Inspect suspension, tire tread, and underbody protection.</li>
            <li>Carry traction boards, a shovel, tow straps, and air compressor.</li>
            <li>Secure your gear and check weight distribution before the climb.</li>
          </ul>
        </div>
      `
    };
  
    document.getElementById('vehicle-tips').innerHTML = tips[vehicle];
  }

  function resetVehicleTips() {
    document.getElementById('vehicle-tips').innerHTML = '';
  }

  // Handle collapsible sections
  const coll = document.querySelectorAll(".collapsible");
  coll.forEach(btn => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });