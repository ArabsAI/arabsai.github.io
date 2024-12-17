document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.dynamic-nav');
    const hamburger = document.querySelector('.hamburger');
    let scrollThreshold = 100;

    // Handle scroll for navigation visibility
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= scrollThreshold) {
            nav.classList.remove('visible');
            return;
        }
        
        nav.classList.add('visible');
    });

    // Handle hamburger menu click
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.dynamic-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            const navHeight = nav.offsetHeight;
            const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            // Close mobile menu if open
            nav.classList.remove('menu-open');
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('menu-open')) {
            nav.classList.remove('menu-open');
        }
    });
});
