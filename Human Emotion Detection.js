/* =============================================================================
   FACIAL EXPRESSION RECOGNITION PROJECT - JAVASCRIPT
   Interactive functionality for project showcase page
   =============================================================================
*/

/* =============================================================================
   DOM CONTENT LOADED EVENT LISTENER
   Ensures all JavaScript runs after the DOM is fully loaded
   =============================================================================
*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all project page functionality
    initializeNavigation();
    initializeAnimations();
    initializeEmotionWheel();
    initializeProgressBars();
    initializeParticles();
    initializeScrollEffects();
    initializeInteractiveElements();
    
    // Initialize AOS (Animate On Scroll) library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});

/* =============================================================================
   NAVIGATION FUNCTIONALITY
   Mobile menu toggle and smooth scrolling
   =============================================================================
*/
function initializeNavigation() {
    // Get navigation elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle hamburger animation
            hamburger.classList.toggle('active');
            // Toggle navigation menu visibility
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active classes to close mobile menu
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Smooth scroll to target section
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', highlightActiveNavLink);
}

/* =============================================================================
   ACTIVE NAVIGATION LINK HIGHLIGHTING
   Updates active navigation based on scroll position
   =============================================================================
*/
function highlightActiveNavLink() {
    // Get all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    // Current scroll position
    const scrollPosition = window.scrollY + headerHeight + 100;

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
   EMOTION WHEEL INTERACTIONS
   Interactive emotion indicators in hero section
   =============================================================================
*/
function initializeEmotionWheel() {
    const emotionIndicators = document.querySelectorAll('.emotion-indicator');
    const centerFace = document.querySelector('.center-face');
    
    // Define emotion icons and colors
    const emotionData = {
        happy: { icon: 'fas fa-smile', color: '#fbbf24' },
        sad: { icon: 'fas fa-frown', color: '#3b82f6' },
        angry: { icon: 'fas fa-angry', color: '#ef4444' },
        surprise: { icon: 'fas fa-surprise', color: '#8b5cf6' },
        fear: { icon: 'fas fa-grimace', color: '#6b7280' },
        disgust: { icon: 'fas fa-meh-rolling-eyes', color: '#10b981' },
        neutral: { icon: 'fas fa-meh', color: '#9ca3af' }
    };

    // Add hover effects to emotion indicators
    emotionIndicators.forEach(indicator => {
        const emotion = indicator.getAttribute('data-emotion');
        const emotionInfo = emotionData[emotion];
        
        // Hover enter effect
        indicator.addEventListener('mouseenter', function() {
            // Change center face to match hovered emotion
            if (centerFace && emotionInfo) {
                const centerIcon = centerFace.querySelector('i');
                if (centerIcon) {
                    centerIcon.className = emotionInfo.icon;
                    centerFace.style.boxShadow = `0 0 60px ${emotionInfo.color}50`;
                }
                
                // Add pulse animation to indicator
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = `0 0 20px ${emotionInfo.color}`;
            }
        });

        // Hover leave effect
        indicator.addEventListener('mouseleave', function() {
            // Reset center face to default
            if (centerFace) {
                const centerIcon = centerFace.querySelector('i');
                if (centerIcon) {
                    centerIcon.className = 'fas fa-smile-beam';
                    centerFace.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.3)';
                }
                
                // Reset indicator transform
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });

        // Click effect for demonstration
        indicator.addEventListener('click', function() {
            // Create ripple effect
            createRippleEffect(this, emotionInfo.color);
            
            // Show emotion name in console (for demo purposes)
            console.log(`Emotion detected: ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`);
        });
    });
}

/* =============================================================================
   RIPPLE EFFECT CREATION
   Creates visual ripple effect on click
   =============================================================================
*/
function createRippleEffect(element, color = '#00d4ff') {
    // Create ripple element
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    // Set ripple styles
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${color};
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        left: 50%;
        top: 50%;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        pointer-events: none;
    `;
    
    // Add ripple to element
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/* =============================================================================
   PROGRESS BAR ANIMATIONS
   Animates performance metrics and results
   =============================================================================
*/
function initializeProgressBars() {
    // Observe progress bars for animation
    const progressBars = document.querySelectorAll('.fill');
    const accuracyBars = document.querySelectorAll('.accuracy-bar');
    
    // Create intersection observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate fill bars
                if (entry.target.classList.contains('fill')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.transition = 'width 2s ease-out';
                        entry.target.style.width = width;
                    }, 100);
                }
                
                // Animate accuracy bars
                if (entry.target.classList.contains('accuracy-bar')) {
                    const height = entry.target.style.height;
                    entry.target.style.height = '0%';
                    setTimeout(() => {
                        entry.target.style.transition = 'height 2s ease-out';
                        entry.target.style.height = height;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    // Start observing progress elements
    progressBars.forEach(bar => progressObserver.observe(bar));
    accuracyBars.forEach(bar => progressObserver.observe(bar));
}

/* =============================================================================
   PARTICLE SYSTEM ENHANCEMENT
   Advanced particle animations for background
   =============================================================================
*/
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;

    // Create additional dynamic particles
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        createDynamicParticle(particlesContainer, i);
    }
    
    // Add mouse interaction with particles
    initializeParticleInteraction();
}

/* =============================================================================
   DYNAMIC PARTICLE CREATION
   Creates animated particles with random properties
   =============================================================================
*/
function createDynamicParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle dynamic-particle';
    
    // Random particle properties
    const size = 2 + Math.random() * 6;
    const opacity = 0.2 + Math.random() * 0.4;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * 10;
    
    // Set particle styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: ${opacity};
        left: ${Math.random() * 100}%;
        animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

/* =============================================================================
   PARTICLE INTERACTION
   Mouse interaction effects with particles
   =============================================================================
*/
function initializeParticleInteraction() {
    const particles = document.querySelectorAll('.particle');
    
    // Track mouse movement for particle interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + 
                Math.pow(mouseY - particleY, 2)
            );
            
            // Apply interaction effect if close enough
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.style.transform = `scale(${1 + force * 0.5})`;
                particle.style.opacity = Math.min(1, parseFloat(particle.style.opacity) + force * 0.3);
            } else {
                particle.style.transform = 'scale(1)';
            }
        });
    });
}

/* =============================================================================
   SCROLL EFFECTS
   Advanced scroll-based animations and effects
   =============================================================================
*/
function initializeScrollEffects() {
    // Initialize parallax effects
    initializeParallaxEffects();
    
    // Initialize scroll progress indicator
    initializeScrollProgress();
    
    // Initialize header scroll effects
    initializeHeaderScrollEffects();
}

/* =============================================================================
   PARALLAX EFFECTS
   Creates depth with scroll-based transformations
   =============================================================================
*/
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.emotion-wheel, .hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

/* =============================================================================
   SCROLL PROGRESS INDICATOR
   Shows reading progress at top of page
   =============================================================================
*/
function initializeScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
    });
}

/* =============================================================================
   HEADER SCROLL EFFECTS
   Dynamic header styling based on scroll position
   =============================================================================
*/
function initializeHeaderScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            header.style.background = 'rgba(10, 10, 15, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

/* =============================================================================
   INTERACTIVE ELEMENTS
   Enhanced interactions for cards and buttons
   =============================================================================
*/
function initializeInteractiveElements() {
    // Initialize card tilt effects
    initializeCardTilts();
    
    // Initialize button enhancements
    initializeButtonEffects();
    
    // Initialize statistic animations
    initializeStatisticAnimations();
}

/* =============================================================================
   CARD TILT EFFECTS
   3D tilt effect for cards on mouse movement
   =============================================================================
*/
function initializeCardTilts() {
    const tiltCards = document.querySelectorAll('.spec-card, .test-card, .team-member, .chart-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', handleCardReset);
    });
}

/* =============================================================================
   CARD TILT HANDLER
   Calculates and applies tilt transformation
   =============================================================================
*/
function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate tilt values (limited range for subtle effect)
    const rotateX = (mouseY / (rect.height / 2)) * 8;
    const rotateY = (mouseX / (rect.width / 2)) * -8;
    
    // Apply 3D tilt transformation
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

/* =============================================================================
   CARD RESET HANDLER
   Resets card to original position
   =============================================================================
*/
function handleCardReset(e) {
    const card = e.currentTarget;
    // Reset card transformation with smooth transition
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}

/* =============================================================================
   BUTTON EFFECTS ENHANCEMENT
   Advanced button interactions and animations
   =============================================================================
*/
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.nav-link, .back-link');
    
    buttons.forEach(button => {
        // Add magnetic hover effect
        button.addEventListener('mousemove', handleButtonMagnetism);
        button.addEventListener('mouseleave', handleButtonReset);
        
        // Add click ripple effect
        button.addEventListener('click', (e) => {
            createButtonRipple(e, button);
        });
    });
}

/* =============================================================================
   BUTTON MAGNETISM EFFECT
   Subtle magnetic attraction to mouse cursor
   =============================================================================
*/
function handleButtonMagnetism(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate mouse position relative to button center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Apply subtle magnetic movement
    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
}

/* =============================================================================
   BUTTON RESET HANDLER
   Resets button to original position
   =============================================================================
*/
function handleButtonReset(e) {
    const button = e.currentTarget;
    button.style.transform = 'translate(0, 0)';
}

/* =============================================================================
   BUTTON RIPPLE EFFECT
   Creates ripple animation on button click
   =============================================================================
*/
function createButtonRipple(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    // Calculate ripple position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Style ripple element
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: buttonRipple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        pointer-events: none;
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
   STATISTIC ANIMATIONS
   Animated counters for performance metrics
   =============================================================================
*/
function initializeStatisticAnimations() {
    const statisticElements = document.querySelectorAll('.stat-number, .metric-value');
    
    // Create observer for statistic animations
    const statisticObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                animateStatistic(entry.target);
                entry.target.setAttribute('data-animated', 'true');
            }
        });
    }, { threshold: 0.5 });

    // Observe statistic elements
    statisticElements.forEach(element => {
        statisticObserver.observe(element);
    });
}

/* =============================================================================
   STATISTIC ANIMATION HANDLER
   Animates number counting for statistics
   =============================================================================
*/
function animateStatistic(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    
    // Only animate if element contains a number
    if (isNaN(number)) return;
    
    const suffix = text.replace(/[\d.]/g, '');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = number / steps;
    const stepTime = duration / steps;
    
    let currentValue = 0;
    let currentStep = 0;
    
    // Animation timer
    const timer = setInterval(() => {
        currentValue += stepValue;
        currentStep++;
        
        // Update element text
        if (currentStep < steps) {
            element.textContent = Math.floor(currentValue) + suffix;
        } else {
            element.textContent = number + suffix;
            clearInterval(timer);
        }
    }, stepTime);
}

/* =============================================================================
   UTILITY FUNCTIONS
   Helper functions for various animations and effects
   =============================================================================
*/

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* =============================================================================
   KEYBOARD ACCESSIBILITY
   Enhanced keyboard navigation support
   =============================================================================
*/
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

/* =============================================================================
   WINDOW RESIZE HANDLER
   Handles responsive behavior on window resize
   =============================================================================
*/
window.addEventListener('resize', debounce(() => {
    // Recalculate emotion wheel positioning
    const emotionWheel = document.querySelector('.emotion-wheel');
    if (emotionWheel) {
        // Reset any transforms on resize
        emotionWheel.style.transform = 'translateY(0)';
    }
    
    // Reset card tilts on resize
    const tiltCards = document.querySelectorAll('.spec-card, .test-card, .team-member');
    tiltCards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}, 250));

/* =============================================================================
   ERROR HANDLING
   Global error handling for better user experience
   =============================================================================
*/
window.addEventListener('error', (e) => {
    console.error('Project Page Error:', e.error);
    // Could implement user-friendly error notifications here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

/* =============================================================================
   DEVELOPMENT HELPERS
   Console messages and utilities for development
   =============================================================================
*/
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🧠 Facial Expression Recognition Project', 'color: #00d4ff; font-size: 18px; font-weight: bold;');
    console.log('%cProject page loaded successfully!', 'color: #10b981; font-size: 14px;');
    console.log('%cDeveloped by Shravani R S', 'color: #6b7280; font-size: 12px;');
}

/* =============================================================================
   DYNAMIC CSS ANIMATIONS
   Add required CSS animations dynamically
   =============================================================================
*/
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes buttonRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10%, 90% {
                opacity: 0.4;
            }
            50% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
        
        .keyboard-navigation *:focus {
            outline: 3px solid var(--primary-color) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

/* =============================================================================
   END OF JAVASCRIPT FILE
   All project page functionality initialized
   =============================================================================
*/