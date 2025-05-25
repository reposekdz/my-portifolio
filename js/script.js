// Portfolio JavaScript
// Place this in a file named js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Set initial icon based on current mode
    const setToggleIcon = () => {
        const moonIcon = darkModeToggle.querySelector('.fa-moon');
        const sunIcon = darkModeToggle.querySelector('.fa-sun');
        if (htmlElement.classList.contains('dark')) {
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'block';
        } else {
            if (moonIcon) moonIcon.style.display = 'block';
            if (sunIcon) sunIcon.style.display = 'none';
        }
    };
    
    // Check if Font Awesome sun icon needs to be added
    if (darkModeToggle && !darkModeToggle.querySelector('.fa-sun')) {
        const sunIconElement = document.createElement('i');
        sunIconElement.classList.add('fas', 'fa-sun');
        sunIconElement.style.display = 'none'; // Initially hidden
        darkModeToggle.appendChild(sunIconElement);
    }
    
    setToggleIcon(); // Set icon on initial load

    darkModeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'true');
        } else {
            localStorage.setItem('darkMode', 'false');
        }
        setToggleIcon(); // Update icon after toggle
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Change icon to X when menu is open
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // --- Navbar Hide/Show on Scroll ---
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
                // Scroll Down
                navbar.style.top = `-${navbar.offsetHeight}px`;
            } else {
                // Scroll Up
                navbar.style.top = '0';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
            
            // Add shadow on scroll
            if (scrollTop > 50) {
                navbar.classList.add('shadow-lg');
                navbar.classList.remove('shadow-md');
            } else {
                navbar.classList.remove('shadow-lg');
                navbar.classList.add('shadow-md');
            }
        });
    }

    // --- Typing Effect for Hero Section ---
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const skills = ["Software Developer", "Frontend Specialist", "Backend Engineer", "Full-Stack Developer", "Problem Solver"];
        let skillIndex = 0;
        let charIndex = 0;
        let currentSkill = "";
        let isDeleting = false;

        function type() {
            currentSkill = skills[skillIndex];
            if (isDeleting) {
                typingElement.textContent = currentSkill.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentSkill.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentSkill.length) {
                setTimeout(() => isDeleting = true, 2000); // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                skillIndex = (skillIndex + 1) % skills.length;
            }

            const typeSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typeSpeed);
        }
        type(); // Start the typing animation
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('hidden');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.add('hidden');
                backToTopBtn.classList.remove('opacity-100');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Smooth Scroll for Navbar Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is for the current page
            const targetUrl = new URL(this.href, window.location.href);
            if (targetUrl.pathname === window.location.pathname && targetUrl.hash) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    // Consider navbar height for accurate scrolling
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight - 20; // 20px extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // --- Update Copyright Year ---
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Skill/Project Filtering (Basic Example - can be expanded) ---
    const filterButtons = document.querySelectorAll('.skill-filter-btn, .project-filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category'); // For skills page
    const projectCards = document.querySelectorAll('.project-card'); // For projects page

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button style
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');

            // Filter skills
            if (skillCategories.length > 0) {
                skillCategories.forEach(category => {
                    if (filter === 'all' || category.dataset.category === filter) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            }

            // Filter projects
            if (projectCards.length > 0) {
                projectCards.forEach(card => {
                    const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
                    if (filter === 'all' || tags.includes(filter)) {
                        card.style.display = 'block'; // Or 'grid-item' if using grid
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // --- Contact Form Submission (using Formspree example) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            
            formStatus.textContent = 'Sending...';
            formStatus.className = 'mt-4 text-sm text-center text-blue-600 dark:text-blue-400';

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thanks for your message! I will get back to you soon.';
                    formStatus.className = 'mt-4 text-sm text-center text-green-600 dark:text-green-400';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again or email me directly.';
                    }
                    formStatus.className = 'mt-4 text-sm text-center text-red-600 dark:text-red-400';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a network problem. Please try again or email me directly.';
                formStatus.className = 'mt-4 text-sm text-center text-red-600 dark:text-red-400';
            }
        });
    }

});
