    // Smooth Scrolling for Navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
        });
    })

    // Chat Button Click Event
    const chatButton = document.getElementById('chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', function () {
            alert('Live chat support is currently unavailable. Please check back later.');
        });
    }

    // Travel Story Submission
    const storyForm = document.getElementById('story-form');
    if (storyForm) {
        storyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const story = document.getElementById('story').value;
            if (title && story) {
                const newStory = document.createElement('div');
                newStory.innerHTML = `<h3>${title}</h3><p>${story}</p>`;
                document.getElementById('story-gallery').appendChild(newStory);
                alert('Your travel story has been submitted!');
            } else {
                alert('Please fill in all fields before submitting.');
            }
        });
    }

    // Countdown Timer for Next Trip
    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        const tripDate = new Date("2025-07-01T00:00:00").getTime();
        setInterval(function() {
            const now = new Date().getTime();
            const timeLeft = tripDate - now;
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            countdownElement.innerText = days + " days left!";
        }, 1000);
    }
});
