// Enhanced DOM Content Loaded with error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize all functionality with error handling
        initMouseTracker();
        initNavigation();
        initScrollAnimations();
        initSkillBars();
        initContactForm();
        initSmoothScrolling();
        initActiveNavLinks();
        initParallaxEffect();
        initCounterAnimation();
        initDynamicBackground();
        initLoadingAnimation();
        initMediumBlog();
        
        // Add console log for successful initialization
        console.log('Portfolio website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Custom Mouse Tracker
function initMouseTracker() {
    try {
        const mouseTracker = document.querySelector('.mouse-tracker');
        if (!mouseTracker) {
            console.warn('Mouse tracker element not found');
            return;
        }

        let mouseX = 0;
        let mouseY = 0;
        let trackerX = 0;
        let trackerY = 0;
        
        // Smooth following animation
        function animateTracker() {
            const dx = mouseX - trackerX;
            const dy = mouseY - trackerY;
            
            trackerX += dx * 0.1;
            trackerY += dy * 0.1;
            
            mouseTracker.style.left = trackerX + 'px';
            mouseTracker.style.top = trackerY + 'px';
            
            requestAnimationFrame(animateTracker);
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Handle hover effects on interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, .btn, .nav-link, .project-card, .timeline-item, .skill-item, .social-link'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                mouseTracker.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', function() {
                mouseTracker.classList.remove('hover');
            });
            
            element.addEventListener('mousedown', function() {
                mouseTracker.classList.add('click');
            });
            
            element.addEventListener('mouseup', function() {
                mouseTracker.classList.remove('click');
            });
        });
        
        // Handle click effects globally
        document.addEventListener('mousedown', function() {
            mouseTracker.classList.add('click');
        });
        
        document.addEventListener('mouseup', function() {
            mouseTracker.classList.remove('click');
        });
        
        // Start animation
        animateTracker();
        
        // Hide tracker when mouse leaves window
        document.addEventListener('mouseleave', function() {
            mouseTracker.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', function() {
            mouseTracker.style.opacity = '1';
        });
        
    } catch (error) {
        console.error('Error initializing mouse tracker:', error);
    }
}

// Enhanced Navigation Toggle with better UX
function initNavigation() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const body = document.body;

        if (!hamburger || !navMenu) {
            console.warn('Navigation elements not found');
            return;
        }

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open'); // Prevent body scroll when menu is open
            
            // Add ARIA attributes for accessibility
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking on a link with smooth animation
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('nav-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }, 150);
            });
        });

        // Close menu when clicking outside with improved detection
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Enhanced Smooth Scrolling with better performance
function initSmoothScrolling() {
    try {
        const navLinks = document.querySelectorAll('.nav-link');
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        
        [...navLinks, ...heroButtons].forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        
                        // Add active state to clicked link
                        navLinks.forEach(navLink => navLink.classList.remove('active'));
                        if (this.classList.contains('nav-link')) {
                            this.classList.add('active');
                        }
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Add focus management for accessibility
                        targetSection.setAttribute('tabindex', '-1');
                        targetSection.focus();
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Enhanced Active Navigation Links with throttling
function initActiveNavLinks() {
    try {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let isScrolling = false;

        function updateActiveLink() {
            if (isScrolling) return;
            
            const scrollPosition = window.scrollY + 100;
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        // Throttle scroll events for better performance
        let ticking = false;
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateActiveLink(); // Initial call
    } catch (error) {
        console.error('Error initializing active nav links:', error);
    }
}

// Enhanced Scroll Animations with stagger effect
function initScrollAnimations() {
    try {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate-in');
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe elements for animation with staggered delays
        const animatedElements = document.querySelectorAll(
            '.project-card, .timeline-item, .skill-item, .contact-item, .about-stats .stat'
        );

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.dataset.delay = `${index * 100}`;
            observer.observe(element);
        });
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }
}

// Enhanced Skill Bars Animation with counter effect
function initSkillBars() {
    try {
        const skillBars = document.querySelectorAll('.skill-bar');
        const skillPercentages = document.querySelectorAll('.skill-percentage');
        
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const level = parseInt(skillBar.getAttribute('data-level'));
                    const skillItem = skillBar.closest('.skill-item');
                    const percentageElement = skillItem?.querySelector('.skill-percentage');
                    
                    // Animate skill bar
                    setTimeout(() => {
                        skillBar.style.width = level + '%';
                        skillBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 200);
                    
                    // Animate percentage counter
                    if (percentageElement) {
                        animateCounter(percentageElement, 0, level, 1500, '%');
                    }
                    
                    skillObserver.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(skillBar => {
            skillObserver.observe(skillBar);
        });
    } catch (error) {
        console.error('Error initializing skill bars:', error);
    }
}

// Enhanced Contact Form Validation and Submission
function initContactForm() {
    try {
        const form = document.getElementById('contactForm');
        if (!form) {
            console.warn('Contact form not found');
            return;
        }
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = form.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('formSuccess');

        // Real-time validation with debouncing
        const debouncedValidation = debounce((input, errorId, validationFn) => {
            validationFn(input, errorId);
        }, 300);

        nameInput?.addEventListener('input', () => 
            debouncedValidation(nameInput, 'nameError', () => validateField(nameInput, 'nameError', 'Name is required'))
        );
        emailInput?.addEventListener('input', () => 
            debouncedValidation(emailInput, 'emailError', () => validateEmail(emailInput, 'emailError'))
        );
        subjectInput?.addEventListener('input', () => 
            debouncedValidation(subjectInput, 'subjectError', () => validateField(subjectInput, 'subjectError', 'Subject is required'))
        );
        messageInput?.addEventListener('input', () => 
            debouncedValidation(messageInput, 'messageError', () => validateField(messageInput, 'messageError', 'Message is required'))
        );

        // Enhanced form submission with better UX
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateField(nameInput, 'nameError', 'Name is required');
            const isEmailValid = validateEmail(emailInput, 'emailError');
            const isSubjectValid = validateField(subjectInput, 'subjectError', 'Subject is required');
            const isMessageValid = validateField(messageInput, 'messageError', 'Message is required');

            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Enhanced loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate form submission with more realistic timing
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    form.reset();
                    successMessage.classList.add('active');
                    
                    // Add success animation
                    successMessage.style.animation = 'fadeInUp 0.5s ease';
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('active');
                        successMessage.style.animation = '';
                    }, 5000);
                }, Math.random() * 1000 + 1500); // Random delay for realism
            } else {
                // Shake animation for invalid form
                form.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    form.style.animation = '';
                }, 500);
            }
        });
    } catch (error) {
        console.error('Error initializing contact form:', error);
    }
}

// Field validation helper
function validateField(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    const value = input.value.trim();

    if (value === '') {
        showError(errorElement, message);
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

// Email validation
function validateEmail(input, errorId) {
    const errorElement = document.getElementById(errorId);
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showError(errorElement, 'Email is required');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(errorElement, 'Please enter a valid email address');
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

// Show error helper
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('active');
}

// Hide error helper
function hideError(errorElement) {
    errorElement.classList.remove('active');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Typing effect for hero title (optional enhancement)
function initTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.borderRight = '2px solid #667eea';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                heroName.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced timeline card animations
function initTimelineAnimations() {
    try {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.transitionDelay = `${index * 0.15}s`;
            item.style.transform = 'translateY(30px) scale(0.95)';
            
            // Add enhanced hover effects
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 122, 255, 0.15)';
                this.style.borderColor = 'rgba(0, 122, 255, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                this.style.borderColor = 'rgba(0, 122, 255, 0.05)';
            });
            
            timelineObserver.observe(item);
        });
    } catch (error) {
        console.error('Error initializing timeline animations:', error);
    }
}

// Initialize timeline animations when page loads
document.addEventListener('DOMContentLoaded', initTimelineAnimations);

// Performance optimization: Debounce scroll events
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

// Apply debounced scroll listener for better performance
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for project images (when real images are added)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add smooth reveal animation for sections
function initSectionReveal() {
    try {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.classList.add('section-hidden');
            sectionObserver.observe(section);
        });
    } catch (error) {
        console.error('Error initializing section reveal:', error);
    }
}

// Dynamic background parallax effect
function initParallaxEffect() {
    try {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            hero.style.transform = `translateY(${parallax}px)`;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    } catch (error) {
        console.error('Error initializing parallax effect:', error);
    }
}

// Counter animation for statistics
function initCounterAnimation() {
    try {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = counter.textContent;
                    const numMatch = target.match(/\d+/);
                    
                    if (numMatch) {
                        const targetNum = parseInt(numMatch[0]);
                        const suffix = target.replace(/\d+/, '');
                        animateCounter(counter, 0, targetNum, 2000, suffix);
                    }
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } catch (error) {
        console.error('Error initializing counter animation:', error);
    }
}

// Animated counter helper function
function animateCounter(element, start, end, duration, suffix = '') {
    try {
        const startTime = performance.now();
        const range = end - start;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(start + (range * easeOutQuart));
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    } catch (error) {
        console.error('Error in counter animation:', error);
    }
}

// Dynamic background effect
function initDynamicBackground() {
    try {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            createFloatingParticle(hero);
        }
    } catch (error) {
        console.error('Error initializing dynamic background:', error);
    }
}

// Create floating particle
function createFloatingParticle(container) {
    try {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random position and size
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 122, 255, 0.3);
            border-radius: 50%;
            left: ${left}%;
            top: 100%;
            animation: floatUp ${duration}s linear infinite;
            z-index: 1;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    } catch (error) {
        console.error('Error creating floating particle:', error);
    }
}

// Loading animation
function initLoadingAnimation() {
    try {
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <p class="loading-text">Loading Portfolio...</p>
        `;
        
        document.body.appendChild(loadingOverlay);
        
        // Hide loading overlay after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }, 1000);
        });
    } catch (error) {
        console.error('Error initializing loading animation:', error);
    }
}

// Enhanced Field validation helper with better UX
function validateField(input, errorId, message) {
    try {
        if (!input) return false;
        
        const errorElement = document.getElementById(errorId);
        const value = input.value.trim();

        if (value === '') {
            showError(errorElement, message);
            input.classList.add('error');
            input.classList.remove('valid');
            return false;
        } else {
            hideError(errorElement);
            input.classList.remove('error');
            input.classList.add('valid');
            return true;
        }
    } catch (error) {
        console.error('Error validating field:', error);
        return false;
    }
}

// Enhanced Email validation with better regex
function validateEmail(input, errorId) {
    try {
        if (!input) return false;
        
        const errorElement = document.getElementById(errorId);
        const value = input.value.trim();
        // More comprehensive email regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (value === '') {
            showError(errorElement, 'Email is required');
            input.classList.add('error');
            input.classList.remove('valid');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(errorElement, 'Please enter a valid email address');
            input.classList.add('error');
            input.classList.remove('valid');
            return false;
        } else {
            hideError(errorElement);
            input.classList.remove('error');
            input.classList.add('valid');
            return true;
        }
    } catch (error) {
        console.error('Error validating email:', error);
        return false;
    }
}

// Enhanced error display with animations
function showError(errorElement, message) {
    try {
        if (!errorElement) return;
        
        errorElement.textContent = message;
        errorElement.classList.add('active');
        errorElement.style.animation = 'fadeInUp 0.3s ease';
    } catch (error) {
        console.error('Error showing error message:', error);
    }
}

// Enhanced error hiding with animations
function hideError(errorElement) {
    try {
        if (!errorElement) return;
        
        errorElement.classList.remove('active');
        errorElement.style.animation = '';
    } catch (error) {
        console.error('Error hiding error message:', error);
    }
}

// Enhanced navbar scroll effect with better performance
const enhancedNavbarScroll = (() => {
    let ticking = false;
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (!navbar) return;
        
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.05)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    return requestTick;
})();

window.addEventListener('scroll', enhancedNavbarScroll, { passive: true });

// Enhanced debounce function with immediate option
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Enhanced throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Error boundary for global error handling
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    // You could implement user-friendly error reporting here
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Log performance metrics
        if (loadTime > 3000) {
            console.warn('Page load time is slower than expected');
        }
    }
});

// Medium Blog Integration
function initMediumBlog() {
    try {
        console.log('Initializing Medium blog section...');
        loadMediumPosts();
    } catch (error) {
        console.error('Error initializing Medium blog:', error);
        displayBlogError();
    }
}

// Load Medium posts function
async function loadMediumPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) {
        console.warn('Blog grid element not found');
        return;
    }

    try {
        // Simulate loading with realistic data
        // In a real implementation, you would use Medium's RSS feed or a proxy service
        await simulateLoading(2000);
        
        const blogPosts = await getMediumPosts();
        displayBlogPosts(blogPosts);
        
    } catch (error) {
        console.error('Error loading Medium posts:', error);
        displayBlogError();
    }
}

// Simulate Medium posts (replace with actual API call)
async function getMediumPosts() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample Medium posts data (replace with actual Medium RSS/API data)
    return [
        {
            title: "What's New in Swift 6.2: Performance, Concurrency, and Modern Features",
            excerpt: "Swift 6.2 is here with exciting improvements for performance, concurrency safety, and developer productivity. In this article, we'll break down the key features that every iOS developer should know about.",
            url: "https://medium.com/@dhruvinbhalodiya752/whats-new-in-swift-6-2-performance-concurrency-and-modern-features-e80b2bf2b621",
            publishedDate: "2024-12-14",
            readTime: "8 min read",
            tags: ["Swift", "iOS Development", "Programming", "Mobile Development"],
            image: "https://miro.medium.com/v2/resize:fill:320:214/1*Kr7VqkoO1c57BBMu7qEfnA.png"
        },
        {
            title: "Building Scalable iOS Apps with MVVM Architecture",
            excerpt: "Learn how to implement MVVM architecture in your iOS applications for better code organization, testability, and maintainability. This comprehensive guide covers best practices and real-world examples.",
            url: "https://medium.com/@dhruvinbhalodiya752/building-scalable-ios-apps-mvvm-architecture",
            publishedDate: "2024-12-10",
            readTime: "12 min read",
            tags: ["MVVM", "iOS Architecture", "Swift", "Design Patterns"],
            image: null
        },
        {
            title: "SwiftUI vs UIKit: When to Choose What in 2024",
            excerpt: "A comprehensive comparison between SwiftUI and UIKit, helping iOS developers make informed decisions about which framework to use for their next project. Includes performance benchmarks and use cases.",
            url: "https://medium.com/@dhruvinbhalodiya752/swiftui-vs-uikit-comparison-2024",
            publishedDate: "2024-12-05",
            readTime: "10 min read",
            tags: ["SwiftUI", "UIKit", "iOS Development", "Framework Comparison"],
            image: null
        }
    ];
}

// Display blog posts
function displayBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    const postsHTML = posts.map(post => createBlogCard(post)).join('');
    
    // Animate the transition
    blogGrid.style.opacity = '0';
    blogGrid.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        blogGrid.innerHTML = postsHTML;
        blogGrid.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        blogGrid.style.opacity = '1';
        blogGrid.style.transform = 'translateY(0)';
        
        // Initialize animations for blog cards
        initBlogCardAnimations();
    }, 100);
}

// Create blog card HTML
function createBlogCard(post) {
    const formattedDate = formatDate(post.publishedDate);
    const tagsHTML = post.tags.slice(0, 3).map(tag => 
        `<span class="blog-tag">${tag}</span>`
    ).join('');
    
    return `
        <article class="blog-card">
            <div class="blog-image">
                ${post.image ? 
                    `<img src="${post.image}" alt="${post.title}" loading="lazy">` :
                    `<div class="blog-placeholder"><i class="fas fa-blog"></i></div>`
                }
            </div>
            <div class="blog-content-area">
                <div class="blog-meta">
                    <div class="blog-date">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="blog-read-time">
                        <i class="fas fa-clock"></i>
                        <span>${post.readTime}</span>
                    </div>
                </div>
                <h3 class="blog-title">
                    <a href="${post.url}" target="_blank" rel="noopener noreferrer">
                        ${post.title}
                    </a>
                </h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${tagsHTML}
                </div>
                <div class="blog-footer-area">
                    <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="blog-read-more">
                        Read on Medium
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Display blog error
function displayBlogError() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = `
        <div class="blog-error">
            <div class="blog-error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 class="blog-error-title">Unable to Load Articles</h3>
            <p class="blog-error-message">
                There was an issue loading the latest blog posts. Please try again later or visit Medium directly.
            </p>
            <button class="blog-retry" onclick="loadMediumPosts()">
                <i class="fas fa-refresh"></i>
                Try Again
            </button>
        </div>
    `;
}

// Initialize blog card animations
function initBlogCardAnimations() {
    try {
        const blogCards = document.querySelectorAll('.blog-card');
        
        const blogObserver = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    blogObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        blogCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            blogObserver.observe(card);
        });
    } catch (error) {
        console.error('Error initializing blog card animations:', error);
    }
}

// Simulate loading delay
function simulateLoading(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Enhanced Medium blog functionality with retry mechanism
class MediumBlogLoader {
    constructor() {
        this.retryCount = 0;
        this.maxRetries = 3;
        this.baseDelay = 1000;
    }
    
    async loadWithRetry() {
        try {
            return await this.loadPosts();
        } catch (error) {
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                const delay = this.baseDelay * Math.pow(2, this.retryCount - 1);
                console.log(`Retrying blog load in ${delay}ms (attempt ${this.retryCount}/${this.maxRetries})`);
                
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.loadWithRetry();
            } else {
                throw new Error(`Failed to load blog posts after ${this.maxRetries} attempts`);
            }
        }
    }
    
    async loadPosts() {
        // This would be replaced with actual Medium RSS feed or API call
        // For now, we'll use our mock data
        return getMediumPosts();
    }
}

// Real Medium RSS integration (commented out - would need CORS proxy)
/*
async function fetchMediumRSS() {
    try {
        // Medium RSS URL (would need CORS proxy in production)
        const rssUrl = 'https://medium.com/feed/@dhruvinbhalodiya752';
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
        const data = await response.json();
        
        // Parse RSS XML
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/xml');
        const items = xml.querySelectorAll('item');
        
        const posts = Array.from(items).slice(0, 3).map(item => {
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            
            return {
                title: title,
                excerpt: stripHTML(description).substring(0, 150) + '...',
                url: link,
                publishedDate: new Date(pubDate).toISOString().split('T')[0],
                readTime: estimateReadTime(description),
                tags: extractTags(description),
                image: extractImage(description)
            };
        });
        
        return posts;
    } catch (error) {
        console.error('Error fetching Medium RSS:', error);
        throw error;
    }
}

// Helper functions for RSS parsing
function stripHTML(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function estimateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = stripHTML(content).split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}

function extractTags(description) {
    // This would need to be customized based on how you tag your Medium articles
    return ['iOS Development', 'Swift'];
}

function extractImage(description) {
    const imgMatch = description.match(/<img[^>]+src="([^"]+)"/i);
    return imgMatch ? imgMatch[1] : null;
}
*/