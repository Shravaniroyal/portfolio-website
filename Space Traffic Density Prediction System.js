// ========================================
// ENHANCED RESPONSIVE WINDOW RESIZE HANDLER
// ========================================
window.addEventListener('resize', debounce(function() {
    // Get current window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Recalculate orbital animation sizes based on screen size
    const orbitContainer = document.querySelector('.orbit-container');
    if (orbitContainer) {
        let scale = 1;
        
        // Mobile portrait (up to 480px)
        if (windowWidth <= 480) {
            scale = 0.6;
        }
        // Mobile landscape or small tablet (481px to 768px)
        else if (windowWidth <= 768) {
            scale = 0.7;
        }
        // Tablet (769px to 1024px)
        else if (windowWidth <= 1024) {
            scale = 0.85;
        }
        // Desktop and larger
        else {
            scale = 1;
        }
        
        orbitContainer.style.transform = `scale(${scale})`;
    }
    
    // Adjust navigation menu for different screen sizes
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (windowWidth > 768) {
        // Desktop/tablet view - ensure menu is visible and properly styled
        if (navMenu) {
            navMenu.classList.remove('active');
            navMenu.style.left = '';
            navMenu.style.top = '';
            navMenu.style.position = '';
        }
        if (navToggle) {
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'rotate(0deg) translate(0, 0)';
                bar.style.opacity = '1';
            });
        }
    }
    
    // Adjust hero content layout
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && windowWidth <= 768) {
        heroContent.style.paddingTop = '2rem';
    } else if (heroContent) {
        heroContent.style.paddingTop = '0';
    }
    
    // Recalculate scroll positions and animations
    updateScrollProgress();
    updateActiveNavLink();
    
    // Adjust timeline layout for mobile
    adjustTimelineLayout();
    
    // Handle particle effects based on device performance
    handleParticlePerformance();
    
}, 250));

// ========================================
// RESPONSIVE TIMELINE LAYOUT ADJUSTMENT
// ========================================
function adjustTimelineLayout() {
    const timeline = document.querySelector('.methodology-timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timeline || !timelineItems.length) return;
    
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 768) {
        // Mobile timeline layout
        timeline.style.paddingLeft = '0';
        timelineItems.forEach((item, index) => {
            item.style.flexDirection = 'column';
            item.style.alignItems = 'flex-start';
            item.style.paddingLeft = '60px';
            
            const icon = item.querySelector('.timeline-icon');
            if (icon) {
                icon.style.position = 'absolute';
                icon.style.left = '0';
                icon.style.width = '50px';
                icon.style.height = '50px';
            }
        });
    } else {
        // Desktop timeline layout
        timeline.style.paddingLeft = '';
        timelineItems.forEach((item, index) => {
            item.style.flexDirection = 'row';
            item.style.alignItems = 'center';
            item.style.paddingLeft = '0';
            
            const icon = item.querySelector('.timeline-icon');
            if (icon) {
                icon.style.position = 'relative';
                icon.style.left = 'auto';
                icon.style.width = '100px';
                icon.style.height = '100px';
            }
        });
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION FOR MOBILE
// ========================================
function handleParticlePerformance() {
    const windowWidth = window.innerWidth;
    const particleContainer = document.querySelector('.particle-container');
    
    if (particleContainer) {
        const particles = particleContainer.querySelectorAll('.floating-particle');
        
        // Reduce particles on mobile for better performance
        if (windowWidth <= 768) {
            particles.forEach((particle, index) => {
                if (index > 20) { // Keep only 20 particles on mobile
                    particle.style.display = 'none';
                }
            });
        } else {
            particles.forEach(particle => {
                particle.style.display = 'block';
            });
        }
    }
}

// ========================================
// TOUCH DEVICE OPTIMIZATIONS
// ========================================
function initializeTouchOptimizations() {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Add touch-friendly interactions
        const interactiveElements = document.querySelectorAll('.tech-item, .highlight-card, .metric-card, .insight-card');
        
        interactiveElements.forEach(element => {
            // Add touch feedback
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Prevent hover effects on touch devices
            element.style.transition = 'transform 0.2s ease';
        });
        
        // Optimize scroll behavior for touch
        document.body.style.overflowX = 'hidden';
        document.body.style.webkitOverflowScrolling = 'touch';
    }
}

// ========================================
// RESPONSIVE FONT SIZE ADJUSTMENTS
// ========================================
function adjustResponsiveFonts() {
    const windowWidth = window.innerWidth;
    const root = document.documentElement;
    
    // Adjust base font size for different screen sizes
    if (windowWidth <= 480) {
        root.style.fontSize = '14px';
    } else if (windowWidth <= 768) {
        root.style.fontSize = '15px';
    } else if (windowWidth <= 1024) {
        root.style.fontSize = '16px';
    } else {
        root.style.fontSize = '16px';
    }
}

// ========================================
// ORIENTATION CHANGE HANDLER
// ========================================
window.addEventListener('orientationchange', function() {
    // Add delay to allow for orientation change to complete
    setTimeout(() => {
        // Recalculate layouts
        adjustTimelineLayout();
        handleParticlePerformance();
        
        // Adjust hero animation for landscape on mobile
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const heroAnimation = document.querySelector('.hero-animation');
        
        if (windowHeight < 500 && windowWidth > windowHeight && heroAnimation) {
            // Landscape mode on mobile - reduce animation height
            heroAnimation.style.height = Math.min(windowHeight * 0.6, 250) + 'px';
        }
        
        // Force layout recalculation
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

// ========================================
// VIEWPORT META TAG DYNAMIC ADJUSTMENT
// ========================================
function adjustViewportMeta() {
    let viewport = document.querySelector('meta[name=viewport]');
    
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
    }
    
    // Enhanced viewport settings for better mobile experience
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
}

// ========================================
// INITIALIZE ALL RESPONSIVE FEATURES
// ========================================
function initializeResponsiveFeatures() {
    // Set up viewport meta tag
    adjustViewportMeta();
    
    // Initialize touch optimizations
    initializeTouchOptimizations();
    
    // Set initial font sizes
    adjustResponsiveFonts();
    
    // Set initial timeline layout
    adjustTimelineLayout();
    
    // Handle initial particle performance
    handleParticlePerformance();
    
    // Add responsive classes to body
    document.body.classList.add('responsive-enabled');
    
    // Add window width class for CSS targeting
    updateWindowSizeClass();
}

// ========================================
// UPDATE WINDOW SIZE CLASS FOR CSS
// ========================================
function updateWindowSizeClass() {
    const windowWidth = window.innerWidth;
    const body = document.body;
    
    // Remove existing size classes
    body.classList.remove('mobile', 'tablet', 'desktop', 'large-desktop');
    
    // Add appropriate size class
    if (windowWidth <= 768) {
        body.classList.add('mobile');
    } else if (windowWidth <= 1024) {
        body.classList.add('tablet');
    } else if (windowWidth <= 1440) {
        body.classList.add('desktop');
    } else {
        body.classList.add('large-desktop');
    }
}

// Update the resize handler to include new responsive features
window.addEventListener('resize', debounce(function() {
    // Update window size class
    updateWindowSizeClass();
    
    // Adjust responsive fonts
    adjustResponsiveFonts();
    
    // Original resize handler code...
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const orbitContainer = document.querySelector('.orbit-container');
    if (orbitContainer) {
        let scale = 1;
        
        if (windowWidth <= 480) {
            scale = 0.6;
        } else if (windowWidth <= 768) {
            scale = 0.7;
        } else if (windowWidth <= 1024) {
            scale = 0.85;
        }
        
        orbitContainer.style.transform = `scale(${scale})`;
    }
    
    // Adjust navigation for different screen sizes
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (windowWidth > 768 && navMenu) {
        // Desktop/tablet view - ensure menu is visible and properly styled
        navMenu.classList.remove('active');
        navMenu.style.left = '';
        navMenu.style.top = '';
        navMenu.style.position = '';
        
        if (navToggle) {
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'rotate(0deg) translate(0, 0)';
                bar.style.opacity = '1';
            });
        }
    }
    
    // Adjust hero content layout
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && windowWidth <= 768) {
        heroContent.style.paddingTop = '2rem';
    } else if (heroContent) {
        heroContent.style.paddingTop = '0';
    }
    
    // Recalculate responsive elements
    adjustTimelineLayout();
    handleParticlePerformance();
    updateScrollProgress();
    updateActiveNavLink();
    
}, 250));

// ========================================
// IMPROVED MOBILE MENU FUNCTIONALITY
// ========================================
function enhanceMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Enhanced mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                // Close menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                animateHamburger(false);
            } else {
                // Open menu
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.classList.add('menu-open');
                animateHamburger(true);
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                animateHamburger(false);
            }
        }
    });
    
    // Enhanced nav link functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu on any link click
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                animateHamburger(false);
            }
            
            // Handle smooth scrolling for internal links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const offsetTop = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    setTimeout(() => {
                        updateActiveNavLink();
                    }, 100);
                }
            }
        });
    });
}

// ========================================
// HAMBURGER MENU ANIMATION
// ========================================
function animateHamburger(isActive) {
    const bars = document.querySelectorAll('.nav-toggle .bar');
    
    if (bars.length >= 3) {
        if (isActive) {
            // Transform to X
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[1].style.transform = 'translateX(20px)';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            // Transform back to hamburger
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[1].style.transform = 'translateX(0)';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    }
}

// ========================================
// ENHANCED SMOOTH SCROLLING
// ========================================
function initializeEnhancedScrolling() {
    // Polyfill for smooth scrolling in older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
    
    // Custom smooth scroll with easing
    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-in-out cubic)
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startY + distance * easeInOutCubic);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    // Apply to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetY = target.offsetTop - navHeight - 20;
                smoothScrollTo(targetY);
            }
        });
    });
}

// ========================================
// LOADING ANIMATIONS FOR IMAGES
// ========================================
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '0.5';
                this.alt = 'Image failed to load';
            });
        }
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
function initializeAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: var(--bg-primary);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when menu toggles
        const navMenu = document.querySelector('.nav-menu');
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isActive = navMenu.classList.contains('active');
                    navToggle.setAttribute('aria-expanded', isActive.toString());
                }
            });
        });
        
        if (navMenu) {
            observer.observe(navMenu, { attributes: true });
        }
    }
    
    // Add focus management
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ========================================
// UPDATE INITIALIZATION FUNCTION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when DOM is loaded
    initializeNavigation();
    enhanceMobileMenu(); // Enhanced mobile menu
    initializeScrollEffects();
    initializeEnhancedScrolling(); // Enhanced smooth scrolling
    initializeAnimations();
    initializePerformanceCharts();
    initializeInteractiveElements();
    initializeResponsiveFeatures(); // New responsive features
    initializeImageLoading(); // Image loading animations
    initializeAccessibility(); // Accessibility enhancements
    
    // Call responsive adjustments on load
    updateWindowSizeClass();
    adjustTimelineLayout();
    handleParticlePerformance();
    
    console.log('🚀 Space Traffic Prediction page loaded with full responsive support!');
});

// ========================================
// CSS INJECTION FOR RESPONSIVE UTILITIES
// ========================================
function injectResponsiveStyles() {
    if (!document.querySelector('#responsive-utilities')) {
        const style = document.createElement('style');
        style.id = 'responsive-utilities';
        style.textContent = `
            /* Menu open state styles */
            .menu-open {
                overflow: hidden;
            }
            
            .menu-open .nav-menu {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            /* Enhanced focus styles */
            .skip-link:focus {
                top: 6px !important;
            }
            
            /* Touch device optimizations */
            .touch-device * {
                -webkit-tap-highlight-color: rgba(0, 212, 255, 0.2);
            }
            
            /* High DPI display optimizations */
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
                .nav-logo i, .timeline-icon i, .tech-item i {
                    transform: translateZ(0);
                    -webkit-font-smoothing: antialiased;
                }
            }
            
            /* Reduced motion preferences */
            @media (prefers-reduced-motion: reduce) {
                .orbit-1, .orbit-2, .orbit-3, .earth {
                    animation: none !important;
                }
                
                .stars, .stars2, .stars3 {
                    animation: none !important;
                }
                
                .floating-particle {
                    animation: none !important;
                    opacity: 0.3 !important;
                }
            }
            
            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
                :root {
                    --bg-primary: #0a0e27;
                    --bg-secondary: #151b32;
                    --text-primary: #ffffff;
                }
            }
            
            /* High contrast mode */
            @media (prefers-contrast: high) {
                :root {
                    --accent-color: #00ffff;
                    --text-primary: #ffffff;
                    --bg-primary: #000000;
                }
                
                .navbar, .highlight-card, .tech-item, .metric-card {
                    border: 2px solid var(--accent-color) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inject responsive styles on load
injectResponsiveStyles();

// ========================================
// ERROR HANDLING AND PERFORMANCE MONITORING
// ========================================
window.addEventListener('error', function(e) {
    console.warn('Non-critical error occurred:', e.error);
    // Gracefully continue without breaking functionality
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }
        }, 100);
    });
}/* ========================================
   SPACE TRAFFIC DENSITY PREDICTION - JAVASCRIPT
   Interactive Functionality & Animations
   ======================================== */

// ========================================
// DOCUMENT READY AND INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when DOM is loaded
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializePerformanceCharts();
    initializeInteractiveElements();
    
    console.log('🚀 Space Traffic Prediction page loaded successfully!');
});

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                bar.style.transform = navMenu.classList.contains('active') 
                    ? `rotate(${index === 0 ? 45 : index === 1 ? 0 : -45}deg) translate(${index === 1 ? '100px' : '0'}, ${index === 0 ? 6 : index === 2 ? -6 : 0}px)`
                    : 'rotate(0deg) translate(0, 0)';
                bar.style.opacity = index === 1 && navMenu.classList.contains('active') ? '0' : '1';
            });
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger menu animation
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'rotate(0deg) translate(0, 0)';
                bar.style.opacity = '1';
            });
            
            // Smooth scroll to section if it's an internal link
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect - change appearance on scroll (always visible)
    window.addEventListener('scroll', function() {
        if (navbar) {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class for styling
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Keep navbar always visible and fixed
            navbar.style.transform = 'translateY(0)';
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
        }
    });
}

// ========================================
// SCROLL EFFECTS AND ANIMATIONS
// ========================================
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add stagger animation for child elements
                const children = entry.target.querySelectorAll('.timeline-item, .tech-item, .metric-card, .highlight-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-up');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and animated elements
    const animatedElements = document.querySelectorAll('section, .timeline-item, .tech-item, .metric-card, .highlight-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.stars, .stars2, .stars3');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Update scroll progress indicator
        updateScrollProgress();
        
        // Update active navigation link
        updateActiveNavLink();
    });
}

// ========================================
// PERFORMANCE CHARTS ANIMATION
// ========================================
function initializePerformanceCharts() {
    const performanceData = {
        'Decision Tree': 89.3,
        'Random Forest': 86.7,
        'Logistic Regression': 84.0,
        'KNN': 82.7,
        'SVM': 79.3
    };
    
    // Animate performance bars when they come into view
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePerformanceBars();
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const resultsChart = document.querySelector('.results-chart');
    if (resultsChart) {
        chartObserver.observe(resultsChart);
    }
}

function animatePerformanceBars() {
    const bars = document.querySelectorAll('.bar-fill');
    
    bars.forEach((bar, index) => {
        const percentage = parseFloat(bar.dataset.percentage);
        
        setTimeout(() => {
            bar.style.width = `${percentage}%`;
            
            // Add counter animation for percentage text
            const percentageText = bar.parentElement.nextElementSibling;
            animateCounter(percentageText, 0, percentage, 1500, '%');
            
        }, index * 200);
    });
}

// ========================================
// COUNTER ANIMATIONS
// ========================================
function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (end - start) * easeOutQuart;
        
        element.textContent = currentValue.toFixed(1) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end.toFixed(1) + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animate statistics in hero section
function initializeHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const heroStatsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach((stat, index) => {
                    const text = stat.textContent;
                    let endValue = parseFloat(text);
                    let suffix = '';
                    
                    // Handle different types of statistics
                    if (text.includes('%')) {
                        suffix = '%';
                    } else if (text.includes('K')) {
                        suffix = 'K+';
                        endValue = parseFloat(text.replace('K+', ''));
                    } else if (text.includes('Years')) {
                        suffix = ' Years';
                        endValue = parseFloat(text.replace(' Years', ''));
                    }
                    
                    setTimeout(() => {
                        animateCounter(stat, 0, endValue, 2000, suffix);
                    }, index * 300);
                });
                
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }
}

// ========================================
// INTERACTIVE ELEMENTS AND HOVER EFFECTS
// ========================================
function initializeInteractiveElements() {
    // Add ripple effect to buttons and cards
    const interactiveElements = document.querySelectorAll('.highlight-card, .tech-item, .metric-card, .back-to-portfolio, .back-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Add hover sound effect (optional - can be enabled with sound files)
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize tooltip functionality
    initializeTooltips();
    
    // Initialize typing animation for hero title
    initializeTypingAnimation();
    
    // Initialize particle effects for hero section
    initializeParticleEffects();
    
    // Initialize hero stats animation
    initializeHeroStats();
}

// ========================================
// RIPPLE EFFECT FUNCTION
// ========================================
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles dynamically
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 212, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                z-index: 100;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ========================================
// TOOLTIP FUNCTIONALITY
// ========================================
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = createTooltip(this.dataset.tooltip);
            document.body.appendChild(tooltip);
            positionTooltip(tooltip, e);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) tooltip.remove();
        });
        
        element.addEventListener('mousemove', function(e) {
            const tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) positionTooltip(tooltip, e);
        });
    });
}

function createTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(26, 31, 54, 0.95);
        color: var(--text-primary);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9rem;
        z-index: 10000;
        pointer-events: none;
        border: 1px solid var(--accent-color);
        backdrop-filter: blur(10px);
        animation: fadeInTooltip 0.3s ease;
    `;
    
    return tooltip;
}

function positionTooltip(tooltip, event) {
    tooltip.style.left = event.clientX + 10 + 'px';
    tooltip.style.top = event.clientY - 40 + 'px';
}

// ========================================
// TYPING ANIMATION FOR HERO TITLE
// ========================================
function initializeTypingAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalHTML = titleElement.innerHTML;
    const text = titleElement.textContent;
    
    // Clear the title and start typing animation
    titleElement.innerHTML = '<span class="gradient-text"></span><span class="highlight"></span>';
    const gradientSpan = titleElement.querySelector('.gradient-text');
    const highlightSpan = titleElement.querySelector('.highlight');
    
    const lines = ['Space Traffic Density', 'Prediction System'];
    let currentLine = 0;
    let currentChar = 0;
    
    function typeWriter() {
        if (currentLine < lines.length) {
            const currentText = lines[currentLine];
            const targetSpan = currentLine === 0 ? gradientSpan : highlightSpan;
            
            if (currentChar < currentText.length) {
                targetSpan.textContent += currentText.charAt(currentChar);
                currentChar++;
                setTimeout(typeWriter, 100);
            } else {
                currentLine++;
                currentChar = 0;
                setTimeout(typeWriter, 500);
            }
        } else {
            // Add blinking cursor effect
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            titleElement.appendChild(cursor);
            
            // Remove cursor after 3 seconds
            setTimeout(() => cursor.remove(), 3000);
        }
    }
    
    // Start typing animation with delay
    setTimeout(typeWriter, 1000);
    
    // Add blinking cursor animation
    if (!document.querySelector('#cursor-styles')) {
        const style = document.createElement('style');
        style.id = 'cursor-styles';
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            .typing-cursor {
                color: var(--accent-color);
                font-weight: normal;
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// PARTICLE EFFECTS FOR HERO SECTION
// ========================================
function initializeParticleEffects() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    heroSection.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createFloatingParticle(particleContainer);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: floatUp ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px rgba(0, 212, 255, 0.3);
    `;
    
    container.appendChild(particle);
    
    // Add floating animation if not exists
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatUp {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0;
                }
                10%, 90% {
                    opacity: 1;
                }
                50% {
                    transform: translateY(-100px) rotate(180deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
}

// ========================================
// ACTIVE NAVIGATION LINK UPDATE
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// ADDITIONAL ANIMATIONS AND INTERACTIONS
// ========================================
function initializeAnimations() {
    // Add CSS for fade-in animations if not exists
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .fade-in {
                animation: fadeInUp 0.8s ease forwards;
            }
            .animate-up {
                animation: slideInUp 0.6s ease forwards;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes fadeInTooltip {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize 3D tilt effect for cards
    initializeTiltEffect();
}

// ========================================
// 3D TILT EFFECT FOR CARDS
// ========================================
function initializeTiltEffect() {
    const tiltElements = document.querySelectorAll('.tech-item, .highlight-card, .metric-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 10;
            const rotateY = (centerX - x) / centerX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Throttle function for scroll events
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
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ========================================
// WINDOW RESIZE HANDLER
// ========================================
window.addEventListener('resize', debounce(function() {
    // Recalculate animations and positions on resize
    const orbitContainer = document.querySelector('.orbit-container');
    if (orbitContainer && window.innerWidth < 768) {
        orbitContainer.style.transform = 'scale(0.8)';
    } else if (orbitContainer) {
        orbitContainer.style.transform = 'scale(1)';
    }
}, 250));

// ========================================
// ERROR HANDLING AND FALLBACKS
// ========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
    // Gracefully handle errors without breaking functionality
});

// Check for browser support and add fallbacks
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    const allAnimatedElements = document.querySelectorAll('section, .timeline-item, .tech-item, .metric-card, .highlight-card');
    allAnimatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// ========================================
// CONSOLE STYLING (DEVELOPMENT)
// ========================================
console.log('%c🚀 Space Traffic Prediction System Loaded! 🛰️', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern web technologies for enhanced user experience', 'color: #ff6b6b; font-style: italic;');