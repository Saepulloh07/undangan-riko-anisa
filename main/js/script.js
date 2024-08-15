// Countdown Timer
const eventDate = new Date("Aug 25, 2024 14:00:00").getTime();
const countdownElement = document.getElementById('countdown');

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeleft = eventDate - now;

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days} hari ${hours} jam ${minutes} menit ${seconds}s`;

    if (timeleft < 0) {
        clearInterval(countdown);
        countdownElement.innerHTML = "Event Started";
    }
}, 1000);

// Music Toggle Functionality
function toggleMusic() {
    const music = document.getElementById("background-music");
    const toggleBtn = document.getElementById("music-toggle");
    
    if (music.paused) {
        music.play();
        toggleBtn.textContent = "🔊";
    } else {
        music.pause();
        toggleBtn.textContent = "🔇";
    }
}

// Firebase Configuration (DatabaseURL only)
const databaseURL = 'https://undangan-001-default-rtdb.asia-southeast1.firebasedatabase.app/';

// Function to handle RSVP Form Submission
document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const attendance = document.getElementById('attendance').value;
    const guests = document.getElementById('guests').value;

    const rsvpData = {
        name,
        contact,
        attendance,
        guests
    };

    // Save to Firebase (using databaseURL)
    fetch(`${databaseURL}/rsvp.json`, {
        method: 'POST',
        body: JSON.stringify(rsvpData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        alert('RSVP Terkirim!');
        document.getElementById('rsvp-form').reset();
    });
});

// Function to handle Guest Greetings Form Submission
document.getElementById('greetings-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const guestName = document.getElementById('guest-name').value;
    const message = document.getElementById('message').value;

    const greetingData = {
        guestName,
        message
    };

    // Save to Firebase (using databaseURL)
    fetch(`${databaseURL}/greetings.json`, {
        method: 'POST',
        body: JSON.stringify(greetingData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        alert('Pesan Terkirim!');
        document.getElementById('greetings-form').reset();
    });
});

// Change Background and Animate Sections on Scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 1.5;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (scrollPosition > sectionTop) {
            section.classList.add('active');
            document.body.style.backgroundImage = section.getAttribute('data-bg');
        } else {
            section.classList.remove('active');
        }
    });
});

// Function to Fetch and Display Guest Greetings
function fetchGreetings() {
    fetch(`${databaseURL}/greetings.json`)
        .then(response => response.json())
        .then(data => {
            const greetingsDisplay = document.getElementById('greetings-display');
            greetingsDisplay.innerHTML = ''; // Clear existing greetings

            if (data) {
                // Convert data object to array and sort by timestamp if available
                const greetingsArray = Object.values(data);
                
                // Display only the most recent 10 greetings
                const recentGreetings = greetingsArray.slice(-10);

                recentGreetings.forEach(greeting => {
                    const greetingElement = document.createElement('div');
                    greetingElement.classList.add('greeting-item');
                    greetingElement.innerHTML = `
                        <p><strong>${greeting.guestName}:</strong> ${greeting.message}</p>
                    `;
                    greetingsDisplay.appendChild(greetingElement);
                });
            } else {
                greetingsDisplay.innerHTML = '<p>Belum ada ucapan yang masuk.</p>';
            }
        });
}

// Call fetchGreetings when the page loads
document.addEventListener('DOMContentLoaded', fetchGreetings);

