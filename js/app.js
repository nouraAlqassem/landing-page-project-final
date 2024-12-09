// Get all sections and the navigation container
const sections = document.querySelectorAll('section');
const navBar = document.getElementById('navbar__list');

// Create a button for "Scroll to Top"
const scrollToTopButton = document.createElement('button');
scrollToTopButton.id = 'scroll-to-top';
scrollToTopButton.textContent = 'Top';
document.body.appendChild(scrollToTopButton);

/**
 * Build the navigation dynamically based on sections
 */
const buildNavigation = () => {
    // Create a fragment to improve performance
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        // Create a list item and anchor tag for each section
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');

        // Set attributes and text for the navigation link
        navLink.href = `#${section.id}`;
        navLink.textContent = section.dataset.nav;
        navLink.classList.add('menu__link');

        // Append the link to the list item and the list item to the fragment
        navItem.appendChild(navLink);
        fragment.appendChild(navItem);
    });

    // Append the fragment to the navbar
    navBar.appendChild(fragment);
};

/**
 * Add 'active' class to the section in the viewport and its navigation link
 */
const setActiveSection = () => {
    sections.forEach(section => {
        const bounding = section.getBoundingClientRect();

        // Check if the section is in the viewport
        if (bounding.top >= 0 && bounding.top <= window.innerHeight / 2) {
            section.classList.add('active');

            // Highlight the corresponding navigation link
            const navLink = navBar.querySelector(`a[href="#${section.id}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
        } else {
            section.classList.remove('active');

            // Remove the highlight from the corresponding navigation link
            const navLink = navBar.querySelector(`a[href="#${section.id}"]`);
            if (navLink) {
                navLink.classList.remove('active');
            }
        }
    });
};

/**
 * Enable smooth scrolling when clicking navigation links
 */
const enableSmoothScrolling = () => {
    navBar.addEventListener('click', event => {
        event.preventDefault();

        // Check if the clicked target is a link
        if (event.target.nodeName === 'A') {
            const targetSection = document.querySelector(event.target.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
};

/**
 * Show or hide the navigation bar based on scrolling
 */
let scrollTimeout;
const handleNavBarVisibility = () => {
    navBar.style.display = 'block';

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        navBar.style.display = 'none';
    }, 2000);
};

/**
 * Show "Scroll to Top" button when scrolling down
 */
const handleScrollToTopButton = () => {
    if (window.scrollY > 500) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

/**
 * Scroll to top functionality
 */
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize functions
buildNavigation();
enableSmoothScrolling();
scrollToTopButton.addEventListener('click', scrollToTop);

// Add scroll event listeners for additional functionality
document.addEventListener('scroll', () => {
    setActiveSection();
    handleNavBarVisibility();
    handleScrollToTopButton();
});