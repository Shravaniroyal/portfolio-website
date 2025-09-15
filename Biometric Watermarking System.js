/* ============================================
   BIOMETRIC WATERMARKING PROJECT JAVASCRIPT
   Interactive functionality and animations
   ============================================ */

/* ============================================
   GLOBAL VARIABLES AND CONSTANTS
   Store references and configuration
   ============================================ */
let particlesCanvas;
let particlesContext;
let particles = [];
let animationId;
const MAX_PARTICLES = 100;
const PARTICLE_SPEED = 0.5;

/* ============================================
   DOM CONTENT LOADED EVENT
   Initialize all functionality when page loads
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Biometric Watermarking Site Initialized');
    
    // Initialize all modules
    initializeParticles();
    initializeNavigation();
    initializeScrollEffects();
    initializeFeatureCards();
    initializeMetricsAnimation();
    initializeMobileMenu();
    initializeBackToTop();
    
    // Start animations
    startParticleAnimation();
    
    console.log('✅ All modules initialized successfully');
});

/* ============================================
   PARTICLES ANIMATION SYSTEM
   Creates animated background particles
   ============================================ */

/**
 * Initialize the particles canvas and context
 */
function initializeParticles() {
    particlesCanvas = document.getElementById('particles-canvas');
    if (!particlesCanvas) return;
    
    particlesContext = particlesCanvas.getContext('2d');
    
    // Set canvas size to match container
    resizeCanvas();
    
    // Create initial particles
    createParticles();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    console.log('🌟 Particles system initialized');
}

/**
 * Resize canvas to match window size
 */
function resizeCanvas() {
    if (!particlesCanvas) return;
    
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

/**
 * Create particle objects with random properties
 */
function createParticles() {
    particles = [];
    
    for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * PARTICLE_SPEED,
            vy: (Math.random() - 0.5) * PARTICLE_SPEED,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            color: `rgba(0, 245, 255, ${Math.random() * 0.5 + 0.2})`
        });
    }
}

/**
 * Update particle positions and handle boundary collisions
 */
function updateParticles() {
    particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= window.innerWidth) {
            particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= window.innerHeight) {
            particle.vy *= -1;
        }
        
        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
    });
}

/**
 * Draw particles on canvas
 */
function drawParticles() {
    if (!particlesContext) return;
    
    // Clear canvas
    particlesContext.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    // Draw particles
    particles.forEach(particle => {
        particlesContext.beginPath();
        particlesContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particlesContext.fillStyle = particle.color;
        particlesContext.fill();
    });
    
    // Draw connections between nearby particles
    drawConnections();
}

/**
 * Draw lines between nearby particles for network effect
 */
function drawConnections() {
    const maxDistance = 100;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (maxDistance - distance) / maxDistance * 0.3;
                particlesContext.beginPath();
                particlesContext.moveTo(particles[i].x, particles[i].y);
                particlesContext.lineTo(particles[j].x, particles[j].y);
                particlesContext.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                particlesContext.lineWidth = 1;
                particlesContext.stroke();
            }
        }
    }
}

/**
 * Main animation loop for particles
 */
function startParticleAnimation() {
    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

/* ============================================
   NAVIGATION FUNCTIONALITY
   Handle navigation interactions
   ============================================ */

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link:not(.portfolio-link)');
    
    // Add click handlers for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    console.log('🧭 Navigation initialized');
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.portfolio-link)');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    // Find current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Smooth scroll to a specific section
 * @param {string} sectionId - ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const headerOffset = 80; // Account for fixed header
    const elementPosition = section.offsetTop;
    const offsetPosition = elementPosition - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    
    console.log(`📍 Scrolled to section: ${sectionId}`);
}

/* ============================================
   SCROLL EFFECTS
   Handle scroll-based animations and effects
   ============================================ */

/**
 * Initialize scroll-based effects
 */
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '50px'
        }
    );
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .result-card, .flow-stage, .scope-item'
    );
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add CSS for animate-in class
    if (!document.querySelector('#scroll-animations-style')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations-style';
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('🌊 Scroll effects initialized');
}

/* ============================================
   FEATURE CARDS INTERACTIONS
   Handle feature card hover and click effects
   ============================================ */

/**
 * Initialize feature card interactions
 */
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add hover effect for tilt
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
        
        // Add click interaction
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            showFeatureDetails(feature);
        });
    });
    
    console.log('🎴 Feature cards initialized');
}

/**
 * Show details for a specific feature (placeholder function)
 * @param {string} feature - Feature identifier
 */
function showFeatureDetails(feature) {
    // This could open a modal or expand the card with more details
    console.log(`📋 Showing details for feature: ${feature}`);
    
    // For now, just add a temporary highlight effect
    const card = document.querySelector(`[data-feature="${feature}"]`);
    if (card) {
        card.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.6)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 2000);
    }
}

/* ============================================
   METRICS ANIMATION
   Animate progress bars and counters
   ============================================ */

/**
 * Initialize metrics animations
 */
function initializeMetricsAnimation() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMetrics(entry.target);
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        },
        { threshold: 0.5 }
    );
    
    const metricsCards = document.querySelectorAll('.metrics-card');
    metricsCards.forEach(card => observer.observe(card));
    
    console.log('📊 Metrics animation initialized');
}

/**
 * Animate metrics within a card
 * @param {Element} card - The metrics card element
 */
function animateMetrics(card) {
    const progressBars = card.querySelectorAll('.metric-fill');
    const counters = card.querySelectorAll('.metric-value');
    
    // Animate progress bars
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
    
    // Animate counters (if they contain numbers)
    counters.forEach(counter => {
        const text = counter.textContent;
        const number = parseFloat(text);
        
        if (!isNaN(number)) {
            animateCounter(counter, 0, number, 2000);
        }
    });
}

/**
 * Animate a counter from start to end value
 * @param {Element} element - Counter element
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end < 1;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        
        if (isDecimal) {
            element.textContent = current.toFixed(3);
        } else {
            element.textContent = current.toFixed(1) + '%';
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Easing function for smooth animations
 * @param {number} t - Progress value (0-1)
 * @returns {number} Eased value
 */
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

/* ============================================
   MOBILE MENU FUNCTIONALITY
   Handle mobile navigation menu
   ============================================ */

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.contains('mobile-open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking on links
    const navLinkElements = navLinks.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Add mobile menu styles
    addMobileMenuStyles();
    
    console.log('Mobile menu initialized');
}

/**
 * Open mobile menu with animation
 */
function openMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggleSpans = document.querySelectorAll('.mobile-menu-toggle span');
    
    navLinks.classList.add('mobile-open');
    
    // Animate hamburger to X
    toggleSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    toggleSpans[1].style.opacity = '0';
    toggleSpans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
}

/**
 * Close mobile menu with animation
 */
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggleSpans = document.querySelectorAll('.mobile-menu-toggle span');
    
    navLinks.classList.remove('mobile-open');
    
    // Animate X back to hamburger
    toggleSpans[0].style.transform = 'none';
    toggleSpans[1].style.opacity = '1';
    toggleSpans[2].style.transform = 'none';
}

/**
 * Add mobile menu styles dynamically
 */
function addMobileMenuStyles() {
    if (document.querySelector('#mobile-menu-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                right: -300px;
                width: 250px;
                height: calc(100vh - 70px);
                background: rgba(26, 26, 46, 0.95);
                backdrop-filter: blur(20px);
                flex-direction: column;
                align-items: flex-start;
                padding: 2rem;
                transition: right 0.3s ease;
                border-left: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .nav-links.mobile-open {
                right: 0;
            }
            
            .nav-link {
                width: 100%;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .portfolio-link {
                margin-top: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   BACK TO TOP FUNCTIONALITY
   Smooth scroll to top with visibility control
   ============================================ */

/**
 * Initialize back to top button
 */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    console.log('Back to top button initialized');
}

/**
 * Scroll to top of page smoothly
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    console.log('Scrolled to top');
}

/* ============================================
   ARCHITECTURE FLOW INTERACTIONS
   Interactive system architecture diagram
   ============================================ */

/**
 * Initialize architecture flow interactions
 */
function initializeArchitectureFlow() {
    const flowStages = document.querySelectorAll('.flow-stage');
    
    flowStages.forEach((stage, index) => {
        stage.addEventListener('click', function() {
            highlightFlowStage(this, index);
        });
    });
}

/**
 * Highlight a specific flow stage
 * @param {Element} stage - The clicked stage element
 * @param {number} index - Stage index
 */
function highlightFlowStage(stage, index) {
    // Remove previous highlights
    document.querySelectorAll('.flow-stage').forEach(s => {
        s.classList.remove('highlighted');
    });
    
    // Add highlight to clicked stage
    stage.classList.add('highlighted');
    
    // Add highlight styles if not present
    if (!document.querySelector('#flow-highlight-styles')) {
        const style = document.createElement('style');
        style.id = 'flow-highlight-styles';
        style.textContent = `
            .flow-stage.highlighted .stage-content {
                border-color: var(--primary-color);
                box-shadow: var(--shadow-glow);
                background: rgba(0, 245, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log(`Flow stage ${index + 1} highlighted`);
}

/* ============================================
   THEME SWITCHING FUNCTIONALITY
   Optional dark/light theme toggle (future enhancement)
   ============================================ */

/**
 * Initialize theme switching (placeholder for future enhancement)
 */
function initializeThemeSwitcher() {
    // This could be expanded to include theme switching functionality
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (!prefersDark) {
        // User prefers light mode - could adjust colors accordingly
        console.log('Light mode preferred');
    }
}

/* ============================================
   FORM INTERACTIONS
   Handle any form submissions or interactions (if added)
   ============================================ */

/**
 * Initialize form interactions (placeholder for contact forms, etc.)
 */
function initializeFormInteractions() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

/**
 * Handle form submission
 * @param {Element} form - Form element
 */
function handleFormSubmission(form) {
    // Add loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form processing
    setTimeout(() => {
        submitButton.textContent = 'Sent!';
        submitButton.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            form.reset();
        }, 2000);
    }, 1000);
}

/* ============================================
   PERFORMANCE MONITORING
   Monitor and log performance metrics
   ============================================ */

/**
 * Initialize performance monitoring
 */
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Log Web Vitals if available
        if ('web-vital' in window) {
            // This would require the web-vitals library
            // webVitals.getLCP(console.log);
            // webVitals.getFID(console.log);
            // webVitals.getCLS(console.log);
        }
    });
    
    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            console.log(`FPS: ${frameCount}`);
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorFPS);
    }
    
    // Start FPS monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        requestAnimationFrame(monitorFPS);
    }
}

/* ============================================
   ERROR HANDLING
   Global error handling and reporting
   ============================================ */

/**
 * Initialize error handling
 */
function initializeErrorHandling() {
    // Handle JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        
        // Could send error reports to analytics service
        // reportError(e.error);
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        
        // Prevent default browser behavior
        e.preventDefault();
    });
    
    console.log('Error handling initialized');
}

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   Improve accessibility for all users
   ============================================ */

/**
 * Initialize accessibility enhancements
 */
function initializeAccessibility() {
    // Add skip links
    addSkipLinks();
    
    // Improve focus management
    improveFocusManagement();
    
    // Add ARIA labels where needed
    addAriaLabels();
    
    // Handle keyboard navigation
    handleKeyboardNavigation();
    
    console.log('Accessibility enhancements initialized');
}

/**
 * Add skip links for keyboard users
 */
function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: var(--background-dark);
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
}

/**
 * Improve focus management for better keyboard navigation
 */
function improveFocusManagement() {
    // Add focus visible utility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add focus styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .using-keyboard *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        body:not(.using-keyboard) *:focus {
            outline: none;
        }
    `;
    document.head.appendChild(focusStyle);
}

/**
 * Add ARIA labels for better screen reader support
 */
function addAriaLabels() {
    // Add labels to interactive elements
    const navToggle = document.querySelector('.mobile-menu-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.setAttribute('aria-label', 'Back to top of page');
    }
    
    // Add section landmarks
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.getAttribute('role')) {
            section.setAttribute('role', 'region');
        }
    });
}

/**
 * Handle keyboard navigation for interactive elements
 */
function handleKeyboardNavigation() {
    // Handle escape key for closing mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Handle arrow keys for feature card navigation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch (e.key) {
                case 'ArrowLeft':
                    targetIndex = index > 0 ? index - 1 : featureCards.length - 1;
                    break;
                case 'ArrowRight':
                    targetIndex = index < featureCards.length - 1 ? index + 1 : 0;
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.click();
                    return;
                default:
                    return;
            }
            
            if (targetIndex !== undefined) {
                e.preventDefault();
                featureCards[targetIndex].focus();
            }
        });
    });
}

/* ============================================
   UTILITY FUNCTIONS
   Helper functions used throughout the application
   ============================================ */

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
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

/**
 * Check if an element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Generate random ID for dynamic elements
 * @param {number} length - Length of the ID
 * @returns {string} Random ID
 */
function generateRandomId(length = 8) {
    return Math.random().toString(36).substr(2, length);
}

/**
 * Format numbers with appropriate units
 * @param {number} number - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}

/* ============================================
   ENHANCED RESPONSIVE FUNCTIONALITY
   Additional JavaScript for improved mobile experience
   ============================================ */

/**
 * Enhanced mobile detection and optimization
 */
function initializeMobileOptimizations() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bTablet\b)|KFAPWI|KFTHWI|KFOT|KFTT|KFTHWA|KFASWI|KFDOWI|KFJWA|KFJWI|KFMEWI|KFFOWI|KFSAWI|KFTHWI/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Add device classes to body for CSS targeting
    document.body.classList.add(
        isMobile ? 'mobile-device' : 'desktop-device',
        isTablet ? 'tablet-device' : 'non-tablet-device',
        isTouchDevice ? 'touch-device' : 'non-touch-device'
    );
    
    // Optimize animations for mobile devices
    if (isMobile) {
        optimizeForMobile();
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Handle viewport changes for mobile browsers
    handleViewportChanges();
    
    console.log('Mobile optimizations initialized');
}

/**
 * Optimize performance and animations for mobile devices
 */
function optimizeForMobile() {
    // Reduce particle count for mobile
    const mobileParticleCount = Math.min(MAX_PARTICLES, 50);
    
    // Disable complex animations on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    if (isLowEndDevice) {
        document.body.classList.add('low-performance-device');
        
        // Add styles for low-end devices
        const lowEndStyles = document.createElement('style');
        lowEndStyles.textContent = `
            .low-performance-device .rubik-cube {
                animation: none;
            }
            .low-performance-device .particles-container {
                display: none;
            }
            .low-performance-device .bio-icon {
                animation: none;
            }
        `;
        document.head.appendChild(lowEndStyles);
    }
    
    // Optimize scroll performance
    let ticking = false;
    const optimizedScrollHandler = function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    // Replace regular scroll handler with optimized version
    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

/**
 * Handle orientation changes for better mobile experience
 */
function handleOrientationChange() {
    setTimeout(() => {
        // Recalculate canvas size after orientation change
        resizeCanvas();
        
        // Adjust hero section height
        adjustHeroHeight();
        
        // Re-initialize any layout-dependent features
        reinitializeLayoutFeatures();
        
        console.log('Orientation changed, layout adjusted');
    }, 100);
}

/**
 * Adjust hero section height based on viewport
 */
function adjustHeroHeight() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Use CSS custom property for height
    const heroStyles = document.createElement('style');
    heroStyles.id = 'hero-height-fix';
    heroStyles.textContent = `
        .hero-section {
            min-height: calc(var(--vh, 1vh) * 100);
        }
    `;
    
    // Remove existing style and add new one
    const existingStyle = document.getElementById('hero-height-fix');
    if (existingStyle) existingStyle.remove();
    document.head.appendChild(heroStyles);
}

/**
 * Handle viewport changes for mobile browsers with collapsing address bars
 */
function handleViewportChanges() {
    // Set initial viewport height
    adjustHeroHeight();
    
    // Update on resize
    window.addEventListener('resize', throttle(adjustHeroHeight, 100));
    
    // Handle iOS Safari viewport issues
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        const iosViewportFix = document.createElement('style');
        iosViewportFix.textContent = `
            body {
                -webkit-overflow-scrolling: touch;
            }
            .hero-section {
                min-height: -webkit-fill-available;
            }
        `;
        document.head.appendChild(iosViewportFix);
    }
}

/**
 * Reinitialize layout-dependent features after orientation change
 */
function reinitializeLayoutFeatures() {
    // Recalculate particle positions
    if (particles.length > 0) {
        createParticles();
    }
    
    // Update any layout-dependent measurements
    const elements = document.querySelectorAll('.feature-card, .result-card');
    elements.forEach(element => {
        // Trigger reflow for proper positioning
        element.style.transform = 'translateZ(0)';
    });
}

/**
 * Enhanced touch interactions for mobile devices
 */
function initializeTouchInteractions() {
    if (!('ontouchstart' in window)) return;
    
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll(
        '.feature-card, .result-card, .flow-stage, .scope-item, .cta-primary, .cta-secondary'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Add touch feedback styles
    const touchStyles = document.createElement('style');
    touchStyles.textContent = `
        .touch-active {
            transform: scale(0.98) !important;
            opacity: 0.8;
            transition: transform 0.1s ease, opacity 0.1s ease !important;
        }
    `;
    document.head.appendChild(touchStyles);
    
    // Handle swipe gestures for mobile menu
    initializeSwipeGestures();
    
    console.log('Touch interactions initialized');
}

/**
 * Initialize swipe gestures for mobile navigation
 */
function initializeSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check for horizontal swipe (minimum distance and primarily horizontal)
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            const navLinks = document.querySelector('.nav-links');
            
            // Swipe left to close menu, swipe right to open menu
            if (deltaX < -50 && navLinks.classList.contains('mobile-open')) {
                closeMobileMenu();
            } else if (deltaX > 50 && !navLinks.classList.contains('mobile-open') && startX < 50) {
                openMobileMenu();
            }
        }
    }, { passive: true });
}

/**
 * Enhanced mobile menu with better touch support
 */
function enhanceMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    // Add better mobile menu styles
    const enhancedMobileStyles = document.createElement('style');
    enhancedMobileStyles.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 60px;
                right: -100vw;
                width: min(300px, 80vw);
                height: calc(100vh - 60px);
                background: rgba(26, 26, 46, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                align-items: stretch;
                padding: 1rem;
                transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-left: 1px solid rgba(0, 245, 255, 0.2);
                z-index: 1000;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            .nav-links.mobile-open {
                right: 0;
            }
            
            .nav-link {
                width: 100%;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                text-align: center;
                border-radius: 8px;
                margin-bottom: 0.5rem;
            }
            
            .nav-link:hover,
            .nav-link.active {
                background: rgba(0, 245, 255, 0.1);
            }
            
            .portfolio-link {
                margin-top: 1rem;
                justify-content: center;
            }
            
            .mobile-menu-overlay {
                position: fixed;
                top: 60px;
                left: 0;
                width: 100vw;
                height: calc(100vh - 60px);
                background: rgba(0, 0, 0, 0.5);
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                z-index: 999;
            }
            
            .mobile-menu-overlay.active {
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(enhancedMobileStyles);
    
    // Add overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    // Enhanced open/close functions
    const originalOpenMobileMenu = openMobileMenu;
    const originalCloseMobileMenu = closeMobileMenu;
    
    window.openMobileMenu = function() {
        originalOpenMobileMenu();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileToggle.setAttribute('aria-expanded', 'true');
    };
    
    window.closeMobileMenu = function() {
        originalCloseMobileMenu();
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileToggle.setAttribute('aria-expanded', 'false');
    };
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMobileMenu);
}

/**
 * Responsive typography adjustments
 */
function initializeResponsiveTypography() {
    function adjustFontSizes() {
        const viewportWidth = window.innerWidth;
        const root = document.documentElement;
        
        // Adjust base font size based on viewport
        if (viewportWidth < 360) {
            root.style.fontSize = '13px';
        } else if (viewportWidth < 480) {
            root.style.fontSize = '14px';
        } else if (viewportWidth < 768) {
            root.style.fontSize = '15px';
        } else {
            root.style.fontSize = '16px';
        }
        
        // Adjust line heights for mobile
        if (viewportWidth < 768) {
            root.style.lineHeight = '1.5';
        } else {
            root.style.lineHeight = '1.6';
        }
    }
    
    // Apply initial adjustments
    adjustFontSizes();
    
    // Update on resize
    window.addEventListener('resize', debounce(adjustFontSizes, 150));
    
    console.log('Responsive typography initialized');
}

/**
 * Enhanced loading states for mobile
 */
function initializeMobileLoadingStates() {
    // Show loading indicator for slower mobile connections
    if (navigator.connection && navigator.connection.effectiveType === '2g') {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--background-dark);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                flex-direction: column;
                color: var(--primary-color);
            ">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(0, 245, 255, 0.3);
                    border-top: 3px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <p style="margin-top: 1rem; font-family: 'Orbitron', monospace;">
                    Loading Biometric Security...
                </p>
            </div>
        `;
        loadingIndicator.className = 'mobile-loading-indicator';
        document.body.appendChild(loadingIndicator);
        
        // Remove loading indicator when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingIndicator.style.opacity = '0';
                setTimeout(() => {
                    loadingIndicator.remove();
                }, 300);
            }, 500);
        });
    }
}

/**
 * Optimize images for different screen densities
 */
function initializeResponsiveImages() {
    // Add srcset support for high-DPI displays
    const images = document.querySelectorAll('img');
    const pixelRatio = window.devicePixelRatio || 1;
    
    images.forEach(img => {
        if (pixelRatio > 1 && !img.srcset) {
            // This would be used if you have actual image files
            // img.srcset = img.src.replace('.jpg', '@2x.jpg') + ' 2x';
        }
        
        // Add loading attribute for modern browsers
        img.loading = 'lazy';
    });
}

/**
 * Enhanced scroll performance for mobile
 */
function initializeMobileScrollOptimizations() {
    let isScrolling = false;
    
    // Use passive event listeners for better performance
    const passiveScrollHandler = function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                // Update back to top button
                const backToTopButton = document.getElementById('back-to-top');
                if (backToTopButton) {
                    if (window.scrollY > 300) {
                        backToTopButton.classList.add('visible');
                    } else {
                        backToTopButton.classList.remove('visible');
                    }
                }
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    };
    
    window.addEventListener('scroll', passiveScrollHandler, { passive: true });
    
    // Optimize intersection observer for mobile
    const mobileObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        {
            threshold: 0.05, // Lower threshold for mobile
            rootMargin: '20px' // Smaller margin for mobile
        }
    );
    
    // Re-observe elements with mobile-optimized settings
    const animateElements = document.querySelectorAll(
        '.feature-card, .result-card, .flow-stage, .scope-item'
    );
    animateElements.forEach(element => mobileObserver.observe(element));
}

/**
 * Initialize all mobile enhancements
 */
function initializeAllMobileEnhancements() {
    initializeMobileOptimizations();
    initializeTouchInteractions();
    enhanceMobileMenu();
    initializeResponsiveTypography();
    initializeMobileLoadingStates();
    initializeResponsiveImages();
    initializeMobileScrollOptimizations();
    
    console.log('All mobile enhancements initialized');
}

// Initialize mobile enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAllMobileEnhancements();
});

// Update existing initialization to include mobile enhancements
const originalDOMContentLoaded = document.readyState === 'loading' ? 
    document.addEventListener('DOMContentLoaded', originalInit) : 
    originalInit();

function originalInit() {
    console.log('🚀 Biometric Watermarking Site Initialized');
    
    // Initialize all modules
    initializeParticles();
    initializeNavigation();
    initializeScrollEffects();
    initializeFeatureCards();
    initializeMetricsAnimation();
    initializeMobileMenu();
    initializeBackToTop();
    
    // Initialize mobile enhancements
    initializeAllMobileEnhancements();
    
    // Start animations
    startParticleAnimation();
    
    console.log('✅ All modules initialized successfully');
}

/* ============================================
   INITIALIZATION SEQUENCE
   Final initialization call
   ============================================ */

// Additional initialization after DOM is loaded
window.addEventListener('load', function() {
    initializeArchitectureFlow();
    initializeThemeSwitcher();
    initializeFormInteractions();
    initializePerformanceMonitoring();
    initializeErrorHandling();
    initializeAccessibility();
    initializeCleanup();
    
    console.log('Advanced features initialized');
});

// Export functions for global access (if needed)
window.BiometricProject = {
    scrollToSection,
    scrollToTop,
    showFeatureDetails
};