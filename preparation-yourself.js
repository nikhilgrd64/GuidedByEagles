document.addEventListener("DOMContentLoaded", () => {
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

  // Sidebar toggle for mobile
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.remove('hidden');
      menuToggle.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.add('hidden');
      menuToggle.style.display = 'block';
    });
  }
});

// Readiness score calculator
function calculateReadiness() {
  const checks = document.querySelectorAll('.readiness-check');
  const radios = document.querySelectorAll('.readiness-quiz');
  let score = 0;
  let total = checks.length + 3; // 3 quiz questions

  checks.forEach(c => {
    if (c.checked) score++;
  });

  let answered = new Set();
  radios.forEach(r => {
    if (r.checked && r.value === 'yes') {
      let qName = r.name;
      if (!answered.has(qName)) {
        answered.add(qName);
        score++;
      }
    }
  });

  let percent = Math.round((score / total) * 100);
  document.getElementById('readiness-score').innerText = `You're ${percent}% Ready`;
  document.getElementById('readiness-bar').value = percent;
}
