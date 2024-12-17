// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize map
document.addEventListener('DOMContentLoaded', function () {
    // Replace coordinates with your actual location
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker for your location
    L.marker([51.505, -0.09]).addTo(map)
        .bindPopup('Our Location')
        .openPopup();
});

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    let lastScroll = 0;
    
    // Handle scroll for navigation visibility
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('collapsed');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('collapsed')) {
            // Scrolling down
            nav.classList.add('collapsed');
        } else if (currentScroll < lastScroll && nav.classList.contains('collapsed')) {
            // Scrolling up
            nav.classList.remove('collapsed');
        }
        lastScroll = currentScroll;
    });

    // Handle menu toggle
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('collapsed');
        menuToggle.classList.toggle('active');
    });

    // Smooth scrolling
    nav.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({
                behavior: 'smooth'
            });
            nav.classList.add('collapsed');
            menuToggle.classList.remove('active');
        });
    });
}); 