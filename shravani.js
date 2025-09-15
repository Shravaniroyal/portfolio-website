

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all portfolio functionality
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollAnimations();
    initializeSkillAnimations();
    initializeStatsCounter();
    initializeContactForm();
    initializeParticles();
    initializeThemeEffects();
});

/* =============================================================================
   NAVIGATION FUNCTIONALITY
   Mobile menu toggle, smooth scrolling, and navbar effects
   =============================================================================
*/
function initializeNavigation() {
    // Get navigation elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on hamburger for animation
            hamburger.classList.toggle('active');
            // Toggle active class on nav menu to show/hide
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active classes to close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Smooth scroll to target if element exists
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect - adds background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            // Add scrolled class for background effect
            navbar.classList.add('scrolled');
        } else {
            // Remove scrolled class for transparent effect
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting based on scroll position
    window.addEventListener('scroll', highlightActiveNavLink);
}

/* =============================================================================
   ACTIVE NAVIGATION LINK HIGHLIGHTING
   Highlights current section in navigation menu
   =============================================================================
*/
function highlightActiveNavLink() {
    // Get all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Current scroll position
    const scrollPosition = window.scrollY + 100;

    // Check which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // If current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/* =============================================================================
   HERO SECTION ANIMATIONS
   Role rotation, typing effects, and visual animations
   =============================================================================
*/
function initializeHeroAnimations() {
    // Role rotation animation
    initializeRoleRotation();
    
    // Typing animation for hero title
    initializeTypingAnimation();
    
    // Floating tech tags animation
    initializeFloatingTags();
    
    // Neural network animation
    initializeNeuralNetwork();
}

/* =============================================================================
   ROLE ROTATION ANIMATION
   Cycles through different job titles in hero section
   =============================================================================
*/
function initializeRoleRotation() {
    const roles = document.querySelectorAll('.role');
    let currentRoleIndex = 0;
    
    // Only proceed if roles exist
    if (roles.length === 0) return;

    // Function to rotate to next role
    function rotateRoles() {
        // Remove active class from current role
        roles[currentRoleIndex].classList.remove('active');
        
        // Move to next role (loop back to 0 if at end)
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        
        // Add active class to new current role
        roles[currentRoleIndex].classList.add('active');
    }

    // Start role rotation every 3 seconds
    setInterval(rotateRoles, 3000);
}

/* =============================================================================
   TYPING ANIMATION EFFECT
   Creates typewriter effect for hero text
   =============================================================================
*/
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let charIndex = 0;
    
    // Function to add one character at a time
    function typeCharacter() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            // Random delay between characters for natural effect
            setTimeout(typeCharacter, 100 + Math.random() * 50);
        }
    }
    
    // Start typing animation after page load
    setTimeout(typeCharacter, 1000);
}

/* =============================================================================
   FLOATING TECH TAGS ANIMATION
   Animates floating technology tags around hero avatar
   =============================================================================
*/
function initializeFloatingTags() {
    const floatingTags = document.querySelectorAll('.floating-tech');
    
    floatingTags.forEach((tag, index) => {
        // Add random floating animation delay
        tag.style.animationDelay = `${index * 0.5}s`;
        
        // Add hover effect to pause animation
        tag.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
}

/* =============================================================================
   NEURAL NETWORK ANIMATION
   Animates the neural network visualization in hero section
   =============================================================================
*/
function initializeNeuralNetwork() {
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    
    // Add random pulse timing to nodes
    nodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Add random pulse timing to connections
    connections.forEach((connection, index) => {
        connection.style.animationDelay = `${index * 0.5}s`;
    });
}

/* =============================================================================
   SCROLL ANIMATIONS & INTERSECTION OBSERVER
   Animates elements as they come into viewport
   =============================================================================
*/
function initializeScrollAnimations() {
    // Intersection Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create intersection observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Elements to observe for animations
    const animatedElements = document.querySelectorAll(
        '.about-stats, .skills-grid, .project-card, .timeline-item, .skill-category'
    );

    // Start observing each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* =============================================================================
   INTERSECTION OBSERVER CALLBACK
   Handles element animations when they enter viewport
   =============================================================================
*/
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class to trigger CSS animations
            entry.target.classList.add('animate');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('about-stats')) {
                animateStatsCounter();
            }
            
            if (entry.target.classList.contains('skills-grid')) {
                animateSkillBars();
            }
            
            // Add staggered animation for multiple elements
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                });
            }
        }
    });
}

/* =============================================================================
   SKILL BAR ANIMATIONS
   Animates progress bars when skills section comes into view
   =============================================================================
*/
function initializeSkillAnimations() {
    // This function is called by the intersection observer
    // Individual skill bar animation is handled in animateSkillBars()
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        // Get progress value from data attribute
        const progressValue = bar.getAttribute('data-progress');
        
        // Animate bar with delay based on index
        setTimeout(() => {
            bar.style.width = progressValue + '%';
        }, index * 100);
    });
}

/* =============================================================================
   STATS COUNTER ANIMATION
   Animates numbers counting up in about section
   =============================================================================
*/
function initializeStatsCounter() {
    // This function is called by the intersection observer
    // Individual counter animation is handled in animateStatsCounter()
}

function animateStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        // Get target number from data attribute
        const targetNumber = parseInt(counter.getAttribute('data-count'));
        const increment = targetNumber / 100; // Divide animation into 100 steps
        let currentNumber = 0;
        
        // Create interval to increment number
        const timer = setInterval(() => {
            currentNumber += increment;
            
            // Update display with rounded number
            counter.textContent = Math.floor(currentNumber);
            
            // Stop when target is reached
            if (currentNumber >= targetNumber) {
                counter.textContent = targetNumber;
                clearInterval(timer);
            }
        }, 20); // Update every 20ms for smooth animation
    });
}

/* =============================================================================
   CONTACT FORM FUNCTIONALITY
   Handles form validation and submission
   =============================================================================
*/
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    if (!contactForm) return;

    // Add floating label functionality
    formInputs.forEach(input => {
        // Add event listeners for focus and blur
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('input', handleInputChange);
    });

    // Handle form submission
    contactForm.addEventListener('submit', handleFormSubmission);
}

/* =============================================================================
   FORM INPUT HANDLERS
   Handles floating label effects and validation
   =============================================================================
*/
function handleInputFocus(e) {
    // Add focused class for styling
    e.target.parentElement.classList.add('focused');
}

function handleInputBlur(e) {
    // Remove focused class if input is empty
    if (e.target.value === '') {
        e.target.parentElement.classList.remove('focused');
    }
}

function handleInputChange(e) {
    // Keep label floating if input has content
    if (e.target.value !== '') {
        e.target.parentElement.classList.add('has-content');
    } else {
        e.target.parentElement.classList.remove('has-content');
    }
}

/* =============================================================================
   FORM SUBMISSION HANDLER
   Validates and processes contact form
   =============================================================================
*/
function handleFormSubmission(e) {
    // Prevent default form submission
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual submission logic)
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
    
    // Remove floating label classes
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused', 'has-content');
    });
}

/* =============================================================================
   EMAIL VALIDATION UTILITY
   Validates email format using regex
   =============================================================================
*/
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* =============================================================================
   NOTIFICATION SYSTEM
   Shows success/error messages to users
   =============================================================================
*/
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.5s ease;
    `;
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/* =============================================================================
   PARTICLE SYSTEM
   Creates and manages background particles
   =============================================================================
*/
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;

    // Create additional particles dynamically
    const particleCount = 10; // Add more particles
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

/* =============================================================================
   PARTICLE CREATION
   Creates individual animated particles
   =============================================================================
*/
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and properties
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (6 + Math.random() * 4) + 's';
    
    // Random size variation
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random opacity
    particle.style.opacity = 0.3 + Math.random() * 0.3;
    
    container.appendChild(particle);
}

/* =============================================================================
   THEME EFFECTS
   Advanced visual effects and interactions
   =============================================================================
*/
function initializeThemeEffects() {
    // Initialize cursor tracking for interactive effects
    initializeCursorEffects();
    
    // Initialize button hover effects
    initializeButtonEffects();
    
    // Initialize card hover effects
    initializeCardEffects();
    
    // Initialize scroll progress indicator
    initializeScrollProgress();
}

/* =============================================================================
   CURSOR EFFECTS
   Creates interactive cursor following effects
   =============================================================================
*/
function initializeCursorEffects() {
    // Create cursor follower element
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursorFollower);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = (e.clientX - 10) + 'px';
        cursorFollower.style.top = (e.clientY - 10) + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

/* =============================================================================
   BUTTON EFFECTS
   Enhanced button interactions and animations
   =============================================================================
*/
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', createRippleEffect);
        
        // Add magnetic hover effect
        button.addEventListener('mousemove', handleButtonMouseMove);
        button.addEventListener('mouseleave', handleButtonMouseLeave);
    });
}

/* =============================================================================
   RIPPLE EFFECT
   Creates ripple animation on button click
   =============================================================================
*/
function createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    // Calculate ripple position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Style ripple element
    ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
    `;
    
    // Add ripple to button
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/* =============================================================================
   MAGNETIC BUTTON EFFECT
   Creates magnetic hover effect for buttons
   =============================================================================
*/
function handleButtonMouseMove(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Apply magnetic transform
    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
}

function handleButtonMouseLeave(e) {
    const button = e.currentTarget;
    // Reset transform
    button.style.transform = 'translate(0, 0) scale(1)';
}

/* =============================================================================
   CARD EFFECTS
   Enhanced card interactions and animations
   =============================================================================
*/
function initializeCardEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .experience-card');
    
    cards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', handleCardReset);
    });
}

/* =============================================================================
   CARD TILT EFFECT
   Creates 3D tilt effect on card hover
   =============================================================================
*/
function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate tilt values
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * 5;
    const rotateY = (mouseX / (rect.width / 2)) * -5;
    
    // Apply tilt transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function handleCardReset(e) {
    const card = e.currentTarget;
    // Reset card transform
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}

/* =============================================================================
   SCROLL PROGRESS INDICATOR
   Shows scroll progress at top of page
   =============================================================================
*/
function initializeScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

/* =============================================================================
   PERFORMANCE OPTIMIZATION
   Debounce and throttle functions for better performance
   =============================================================================
*/

// Throttle function for scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Debounce function for resize events
function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/* =============================================================================
   WINDOW RESIZE HANDLER
   Handles responsive adjustments on window resize
   =============================================================================
*/
window.addEventListener('resize', debounce(() => {
    // Recalculate animations on resize
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(element => {
        element.classList.remove('animate');
    });
    
    // Reinitialize scroll animations
    setTimeout(() => {
        initializeScrollAnimations();
    }, 100);
}, 250));

/* =============================================================================
   ACCESSIBILITY ENHANCEMENTS
   Keyboard navigation and screen reader support
   =============================================================================
*/

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Skip to main content on Tab press from navigation
    if (e.key === 'Tab' && e.target.classList.contains('nav-link')) {
        const mainContent = document.querySelector('main') || document.querySelector('#home');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// Add focus visible polyfill for better keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-navigation');
});

/* =============================================================================
   ERROR HANDLING
   Global error handling for better user experience
   =============================================================================
*/
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Could add user-friendly error notification here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

/* =============================================================================
   BROWSER SUPPORT CHECK
   Check for required features and provide fallbacks
   =============================================================================
*/
function checkBrowserSupport() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        console.warn('IntersectionObserver not supported, using fallback animations');
        // Immediately show all elements
        document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
            el.classList.add('animate');
        });
    }
    
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-grid-support');
    }
}

// Initialize browser support check
checkBrowserSupport();

/* =============================================================================
   DEVELOPMENT HELPERS
   Console messages and development utilities
   =============================================================================
*/
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🚀 Shravani R S - AI Engineer Portfolio', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cPortfolio loaded successfully!', 'color: #10b981; font-size: 14px;');
    console.log('%cFor any issues, contact: rsshravani04@gmail.com', 'color: #6b7280; font-size: 12px;');
}


/* ===== RESPONSIVE JAVASCRIPT ENHANCEMENTS ===== */

// Add these functions to your existing JavaScript file

/* 1. Enhanced Mobile Menu Functionality */
function enhancedMobileMenuSetup() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}

/* 2. Responsive Viewport Height Fix for Mobile */
function setResponsiveViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update hero section height
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.minHeight = `calc(var(--vh, 1vh) * 100)`;
    }
}

/* 3. Touch Device Detection and Optimization */
function optimizeForTouchDevices() {
    // Detect touch device
    const isTouchDevice = ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0) || 
                         (navigator.msMaxTouchPoints > 0);
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Remove hover effects on touch devices
        const hoverElements = document.querySelectorAll('.project-card, .skill-category, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
}

/* 4. Enhanced Responsive Font Scaling */
function responsiveFontScaling() {
    const updateFontSizes = () => {
        const screenWidth = window.innerWidth;
        const root = document.documentElement;
        
        // Adjust base font size based on screen width
        if (screenWidth < 480) {
            root.style.fontSize = '14px';
        } else if (screenWidth < 768) {
            root.style.fontSize = '15px';
        } else if (screenWidth < 1024) {
            root.style.fontSize = '16px';
        } else {
            root.style.fontSize = '16px';
        }
    };
    
    updateFontSizes();
    window.addEventListener('resize', debounce(updateFontSizes, 250));
}

/* 5. Mobile-Optimized Scroll Animations */
function mobileScrollAnimations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        const complexAnimations = document.querySelectorAll('.particle, .neural-network');
        complexAnimations.forEach(element => {
            element.style.display = 'none';
        });
        
        // Simplify intersection observer for mobile
        const mobileObserverOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        };
        
        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, mobileObserverOptions);
        
        const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            mobileObserver.observe(element);
        });
    }
}

/* 6. Responsive Image and Media Loading */
function responsiveMediaLoading() {
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video');
    
    // Lazy load images on mobile
    if (window.innerWidth <= 768) {
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
        
        videos.forEach(video => {
            video.setAttribute('preload', 'metadata');
        });
    }
}

/* 7. Orientation Change Handler */
function handleOrientationChange() {
    const handleChange = () => {
        // Delay to ensure viewport dimensions are updated
        setTimeout(() => {
            setResponsiveViewportHeight();
            
            // Recalculate layouts if needed
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && window.innerWidth <= 896 && window.innerHeight <= 500) {
                heroContent.style.gap = '1rem';
            } else if (heroContent) {
                heroContent.style.gap = '';
            }
            
            // Close mobile menu on orientation change
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }, 100);
    };
    
    window.addEventListener('orientationchange', handleChange);
    window.addEventListener('resize', debounce(handleChange, 250));
}

/* 8. Enhanced Form Responsiveness */
function enhanceFormResponsiveness() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Prevent zoom on iOS when focusing inputs
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            if (parseFloat(window.getComputedStyle(input).fontSize) < 16) {
                input.style.fontSize = '16px';
            }
        }
        
        // Enhanced mobile keyboard handling
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                // Scroll input into view on mobile
                setTimeout(() => {
                    input.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
    });
}

/* 9. Performance Optimization for Mobile */
function mobilePerformanceOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce particle count
        const particleContainer = document.querySelector('.particles-container');
        if (particleContainer) {
            const particles = particleContainer.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                if (index > 2) { // Keep only first 3 particles
                    particle.remove();
                }
            });
        }
        
        // Disable complex animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-animations');
        }
    }
}

/* 10. Responsive Grid Recalculation */
function responsiveGridRecalculation() {
    const grids = document.querySelectorAll('.skills-grid, .projects-grid, .about-stats');
    
    const recalculateGrids = () => {
        grids.forEach(grid => {
            const screenWidth = window.innerWidth;
            
            if (grid.classList.contains('skills-grid')) {
                if (screenWidth <= 480) {
                    grid.style.gridTemplateColumns = '1fr';
                } else if (screenWidth <= 768) {
                    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
                } else {
                    grid.style.gridTemplateColumns = '';
                }
            }
            
            if (grid.classList.contains('about-stats')) {
                if (screenWidth <= 480) {
                    grid.style.gridTemplateColumns = '1fr';
                } else if (screenWidth <= 768) {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    grid.style.gridTemplateColumns = '';
                }
            }
        });
    };
    
    recalculateGrids();
    window.addEventListener('resize', debounce(recalculateGrids, 250));
}

/* 11. Mobile-Optimized Smooth Scrolling */
function mobileOptimizedScrolling() {
    // Enhance smooth scrolling for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* 12. Safe Area Insets for Modern Mobile Devices */
function handleSafeAreaInsets() {
    // Handle iPhone X and similar devices with notches
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.paddingTop = 'env(safe-area-inset-top)';
    }
    
    // Add safe area support to CSS
    const style = document.createElement('style');
    style.textContent = `
        @supports(padding: max(0px)) {
            .navbar {
                padding-left: max(15px, env(safe-area-inset-left));
                padding-right: max(15px, env(safe-area-inset-right));
            }
            
            .container {
                padding-left: max(15px, env(safe-area-inset-left));
                padding-right: max(15px, env(safe-area-inset-right));
            }
        }
    `;
    document.head.appendChild(style);
}

/* 13. Initialize All Responsive Enhancements */
function initializeResponsiveEnhancements() {
    enhancedMobileMenuSetup();
    setResponsiveViewportHeight();
    optimizeForTouchDevices();
    responsiveFontScaling();
    mobileScrollAnimations();
    responsiveMediaLoading();
    handleOrientationChange();
    enhanceFormResponsiveness();
    mobilePerformanceOptimizations();
    responsiveGridRecalculation();
    mobileOptimizedScrolling();
    handleSafeAreaInsets();
}

/* 14. Enhanced Debounce Function */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/* 15. Initialize on DOM Content Loaded */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize your existing functions first
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollAnimations();
    initializeSkillAnimations();
    initializeStatsCounter();
    initializeContactForm();
    initializeParticles();
    initializeThemeEffects();
    
    // Then initialize responsive enhancements
    initializeResponsiveEnhancements();
});

/* 16. Handle Resize Events */
window.addEventListener('resize', debounce(() => {
    setResponsiveViewportHeight();
    
    // Reinitialize animations if needed
    const animatedElements = document.querySelectorAll('.animate');
    if (window.innerWidth !== window.lastWidth) {
        animatedElements.forEach(element => {
            element.classList.remove('animate');
        });
        
        setTimeout(() => {
            initializeScrollAnimations();
        }, 100);
    }
    
    window.lastWidth = window.innerWidth;
}, 250));

/* =============================================================================
   END OF JAVASCRIPT FILE
   All interactive functionality initialized
   =============================================================================

*/
