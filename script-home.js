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
 