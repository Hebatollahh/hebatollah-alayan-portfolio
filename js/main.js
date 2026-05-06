/**
 * ============================================================
 * MAIN JAVASCRIPT FILE
 * Hebatollah Alayan - Portfolio
 * ============================================================
 */

'use strict';

// ============================================================
// DOM ELEMENTS
// ============================================================
const DOM = {
    // Navigation
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    hamburgerMenu: document.getElementById('hamburgerMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Dark Mode
    darkModeToggle: document.getElementById('darkModeToggle'),
    darkModeIcon: document.querySelector('#darkModeToggle i'),
    
    // Sections
    sections: document.querySelectorAll('.section, .hero-section'),
    
    // Projects
    projectsContainer: document.getElementById('projectsContainer'),
    
    // Contact Form
    contactForm: document.getElementById('contactForm'),
    formFeedback: document.getElementById('formFeedback'),
    submitBtn: document.getElementById('submitBtn'),
    charCounter: document.getElementById('charCounter'),
    messageInput: document.getElementById('message'),
    
    // Form Fields
    nameInput: document.getElementById('name'),
    emailInput: document.getElementById('email'),
    subjectInput: document.getElementById('subject'),
    
    // Modal / Slider
    imageModal: document.getElementById('imageModal'),
    sliderTrack: document.getElementById('sliderTrack'),
    sliderDots: document.getElementById('sliderDots'),
    prevSlide: document.getElementById('prevSlide'),
    nextSlide: document.getElementById('nextSlide'),
    modalClose: document.querySelector('.modal-close'),
    
    // Back to Top
    backToTop: document.getElementById('backToTop'),
    
    // Footer
    currentYear: document.getElementById('currentYear'),
};

// ============================================================
// SLIDER STATE
// ============================================================
const sliderState = {
    currentIndex: 0,
    totalSlides: 0,
    images: [],
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
const Utils = {
    /**
     * Debounce function for performance
     */
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Set a cookie
     */
    setCookie(name, value, days = 30) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/;SameSite=Lax';
    },
    
    /**
     * Get a cookie value
     */
    getCookie(name) {
        const cookieName = name + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return '';
    },
    
    /**
     * Delete a cookie
     */
    deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    },
};

// ============================================================
// DARK MODE FUNCTIONALITY
// ============================================================
const DarkMode = {
    init() {
        // Check localStorage first, then cookie, then system preference
        const savedTheme = localStorage.getItem('theme') || Utils.getCookie('theme');
        
        if (savedTheme === 'dark') {
            this.enableDarkMode(false);
        } else if (savedTheme === 'light') {
            this.disableDarkMode(false);
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.enableDarkMode(false);
            }
        }
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme') && !Utils.getCookie('theme')) {
                if (e.matches) {
                    this.enableDarkMode(false);
                } else {
                    this.disableDarkMode(false);
                }
            }
        });
    },
    
    toggle() {
        if (document.body.classList.contains('dark-mode')) {
            this.disableDarkMode(true);
        } else {
            this.enableDarkMode(true);
        }
    },
    
    enableDarkMode(save = true) {
        document.body.classList.add('dark-mode');
        DOM.darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        if (save) {
            localStorage.setItem('theme', 'dark');
            Utils.setCookie('theme', 'dark', 30);
        }
    },
    
    disableDarkMode(save = true) {
        document.body.classList.remove('dark-mode');
        DOM.darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        if (save) {
            localStorage.setItem('theme', 'light');
            Utils.setCookie('theme', 'light', 30);
        }
    },
};

// ============================================================
// NAVIGATION FUNCTIONALITY
// ============================================================
const Navigation = {
    init() {
        this.setupHamburgerMenu();
        this.setupScrollSpy();
        this.setupSmoothScroll();
        this.setupNavbarScroll();
    },
    
    setupHamburgerMenu() {
        DOM.hamburgerMenu.addEventListener('click', () => {
            DOM.hamburgerMenu.classList.toggle('active');
            DOM.navMenu.classList.toggle('active');
            document.body.style.overflow = DOM.navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOM.hamburgerMenu.classList.remove('active');
                DOM.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!DOM.navMenu.contains(e.target) && !DOM.hamburgerMenu.contains(e.target)) {
                DOM.hamburgerMenu.classList.remove('active');
                DOM.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    },
    
    setupScrollSpy() {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    DOM.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        DOM.sections.forEach(section => {
            observer.observe(section);
        });
    },
    
    setupSmoothScroll() {
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = DOM.navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });
                }
            });
        });
    },
    
    setupNavbarScroll() {
        window.addEventListener('scroll', Utils.debounce(() => {
            if (window.scrollY > 50) {
                DOM.navbar.classList.add('scrolled');
            } else {
                DOM.navbar.classList.remove('scrolled');
            }
        }, 50));
    },
};

// ============================================================
// PROJECTS LOADING (AJAX)
// ============================================================
const Projects = {
    async load() {
        try {
            const response = await fetch('includes/fetch_projects.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const projects = await response.json();
            
            if (projects.length > 0) {
                this.render(projects);
            } else {
                DOM.projectsContainer.innerHTML = `
                    <div class="loading-state">
                        <i class="fas fa-folder-open" style="font-size: 48px; color: var(--clr-text-light);"></i>
                        <p>No projects to display yet. Check back soon!</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            DOM.projectsContainer.innerHTML = `
                <div class="loading-state">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: var(--clr-warning);"></i>
                    <p>Failed to load projects. Please try again later.</p>
                </div>
            `;
        }
    },
    
    render(projects) {
        const projectsHTML = projects.map(project => `
            <article class="project-card">
                <div class="project-card-image" onclick="Slider.open('${this.escapeHTML(project.image_url)}', ${JSON.stringify(projects.map(p => ({ src: p.image_url, title: p.title })))})">
                    <img src="${this.escapeHTML(project.image_url)}" alt="${this.escapeHTML(project.title)}" loading="lazy">
                    <div class="project-card-image-overlay">
                        <span>View Gallery</span>
                    </div>
                </div>
                <div class="project-card-body">
                    <h3>${this.escapeHTML(project.title)}</h3>
                    <p>${this.escapeHTML(project.description)}</p>
                </div>
                <div class="project-card-footer">
                    <a href="${this.escapeHTML(project.link)}" target="_blank" rel="noopener noreferrer" class="project-link">
                        View Project <i class="fas fa-arrow-right"></i>
                    </a>
                    <span class="project-date">${this.formatDate(project.created_at)}</span>
                </div>
            </article>
        `).join('');
        
        DOM.projectsContainer.innerHTML = projectsHTML;
    },
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },
    
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
};

// ============================================================
// FORM VALIDATION
// ============================================================
const FormValidator = {
    validators: {
        name(value) {
            if (value.trim().length < 2) return 'Name must be at least 2 characters long';
            if (value.trim().length > 100) return 'Name must be less than 100 characters';
            if (!/^[a-zA-Z\s\-'.]+$/.test(value.trim())) return 'Name contains invalid characters';
            return null;
        },
        email(value) {
            if (!value.trim()) return 'Email is required';
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
            return null;
        },
        message(value) {
            if (value.trim().length < 10) return 'Message must be at least 10 characters long';
            if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
            return null;
        },
    },
    
    validateField(fieldName, value) {
        const group = document.getElementById(fieldName + 'Group');
        const errorElement = document.getElementById(fieldName + 'Error');
        const error = this.validators[fieldName] ? this.validators[fieldName](value) : null;
        
        if (group) {
            if (error) {
                group.classList.add('error');
                group.classList.remove('success');
                if (errorElement) errorElement.textContent = error;
                return false;
            } else {
                group.classList.remove('error');
                group.classList.add('success');
                if (errorElement) errorElement.textContent = '';
                return true;
            }
        }
        return true;
    },
    
    validateAll() {
        const nameValid = this.validateField('name', DOM.nameInput.value);
        const emailValid = this.validateField('email', DOM.emailInput.value);
        const messageValid = this.validateField('message', DOM.messageInput.value);
        
        return nameValid && emailValid && messageValid;
    },
    
    init() {
        // Real-time validation on blur
        DOM.nameInput.addEventListener('blur', () => this.validateField('name', DOM.nameInput.value));
        DOM.emailInput.addEventListener('blur', () => this.validateField('email', DOM.emailInput.value));
        DOM.messageInput.addEventListener('blur', () => this.validateField('message', DOM.messageInput.value));
        
        // Real-time validation on input (after first blur)
        DOM.nameInput.addEventListener('input', () => {
            if (DOM.nameInput.parentElement.parentElement.classList.contains('error') || 
                DOM.nameInput.parentElement.parentElement.classList.contains('success')) {
                this.validateField('name', DOM.nameInput.value);
            }
        });
        
        DOM.emailInput.addEventListener('input', () => {
            if (DOM.emailInput.parentElement.parentElement.classList.contains('error') || 
                DOM.emailInput.parentElement.parentElement.classList.contains('success')) {
                this.validateField('email', DOM.emailInput.value);
            }
        });
        
        // Character counter for message
        DOM.messageInput.addEventListener('input', () => {
            const length = DOM.messageInput.value.length;
            DOM.charCounter.textContent = `${length} / 1000`;
            if (length > 900) {
                DOM.charCounter.style.color = 'var(--clr-warning)';
            } else {
                DOM.charCounter.style.color = 'var(--clr-text-light)';
            }
        });
    },
};

// ============================================================
// CONTACT FORM SUBMISSION (AJAX)
// ============================================================
const ContactForm = {
    init() {
        DOM.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        FormValidator.init();
    },
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Client-side validation
        if (!FormValidator.validateAll()) {
            this.showFeedback('Please fix the errors in the form.', 'error');
            return;
        }
        
        // Disable submit button
        this.setLoading(true);
        
        const formData = new FormData(DOM.contactForm);
        
        try {
            const response = await fetch('includes/contact.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                this.showFeedback(result.message || 'Message sent successfully!', 'success');
                DOM.contactForm.reset();
                
                // Clear success classes
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });
                
                // Reset char counter
                DOM.charCounter.textContent = '0 / 1000';
                DOM.charCounter.style.color = 'var(--clr-text-light)';
            } else {
                this.showFeedback(result.message || 'An error occurred. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFeedback('Network error. Please check your connection and try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    },
    
    setLoading(isLoading) {
        const btnText = DOM.submitBtn.querySelector('.btn-text');
        const btnLoader = DOM.submitBtn.querySelector('.btn-loader');
        
        if (isLoading) {
            DOM.submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        } else {
            DOM.submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    },
    
    showFeedback(message, type) {
        DOM.formFeedback.textContent = message;
        DOM.formFeedback.className = `form-feedback ${type}`;
        DOM.formFeedback.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            DOM.formFeedback.style.display = 'none';
        }, 5000);
        
        // Scroll to feedback
        DOM.formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
};

// ============================================================
// IMAGE SLIDER / MODAL
// ============================================================
const Slider = {
    open(initialImage, allImages) {
        sliderState.images = allImages;
        sliderState.currentIndex = allImages.findIndex(img => img.src === initialImage);
        if (sliderState.currentIndex === -1) sliderState.currentIndex = 0;
        sliderState.totalSlides = allImages.length;
        
        this.render();
        DOM.imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Accessibility
        DOM.imageModal.setAttribute('aria-hidden', 'false');
        DOM.modalClose.focus();
    },
    
    close() {
        DOM.imageModal.classList.remove('show');
        document.body.style.overflow = '';
        DOM.imageModal.setAttribute('aria-hidden', 'true');
    },
    
    render() {
        // Render slides
        DOM.sliderTrack.innerHTML = sliderState.images.map(img => `
            <img src="${img.src}" alt="${img.title || 'Project image'}" loading="lazy">
        `).join('');
        
        // Render dots
        if (sliderState.totalSlides > 1) {
            DOM.sliderDots.innerHTML = sliderState.images.map((_, index) => `
                <button class="slider-dot ${index === sliderState.currentIndex ? 'active' : ''}" 
                        data-index="${index}" 
                        aria-label="Go to slide ${index + 1}"></button>
            `).join('');
        } else {
            DOM.sliderDots.innerHTML = '';
        }
        
        this.goToSlide(sliderState.currentIndex);
        
        // Show/hide navigation buttons
        DOM.prevSlide.style.display = sliderState.totalSlides > 1 ? 'block' : 'none';
        DOM.nextSlide.style.display = sliderState.totalSlides > 1 ? 'block' : 'none';
    },
    
    goToSlide(index) {
        sliderState.currentIndex = index;
        const offset = -index * 100;
        DOM.sliderTrack.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        const dots = DOM.sliderDots.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    },
    
    next() {
        sliderState.currentIndex = (sliderState.currentIndex + 1) % sliderState.totalSlides;
        this.goToSlide(sliderState.currentIndex);
    },
    
    prev() {
        sliderState.currentIndex = (sliderState.currentIndex - 1 + sliderState.totalSlides) % sliderState.totalSlides;
        this.goToSlide(sliderState.currentIndex);
    },
    
    init() {
        // Navigation buttons
        DOM.prevSlide.addEventListener('click', () => this.prev());
        DOM.nextSlide.addEventListener('click', () => this.next());
        
        // Close button
        DOM.modalClose.addEventListener('click', () => this.close());
        
        // Click outside to close
        DOM.imageModal.addEventListener('click', (e) => {
            if (e.target === DOM.imageModal || e.target.classList.contains('modal-overlay')) {
                this.close();
            }
        });
        
        // Dots navigation
        DOM.sliderDots.addEventListener('click', (e) => {
            const dot = e.target.closest('.slider-dot');
            if (dot) {
                const index = parseInt(dot.getAttribute('data-index'));
                this.goToSlide(index);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!DOM.imageModal.classList.contains('show')) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        DOM.sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        DOM.sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    },
};

// ============================================================
// BACK TO TOP BUTTON
// ============================================================
const BackToTop = {
    init() {
        window.addEventListener('scroll', Utils.debounce(() => {
            if (window.scrollY > 500) {
                DOM.backToTop.classList.add('visible');
            } else {
                DOM.backToTop.classList.remove('visible');
            }
        }, 100));
        
        DOM.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    },
};

// ============================================================
// SKILL BARS ANIMATION
// ============================================================
const SkillBars = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width + '%';
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.3 });
        
        document.querySelectorAll('.skill-bar').forEach(bar => {
            observer.observe(bar);
        });
    },
};

// ============================================================
// INITIALIZATION
// ============================================================
function initApp() {
    // Set current year in footer
    if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize all modules
    DarkMode.init();
    Navigation.init();
    Projects.load();
    ContactForm.init();
    Slider.init();
    BackToTop.init();
    SkillBars.init();
    
    // Dark mode toggle event listener
    DOM.darkModeToggle.addEventListener('click', () => DarkMode.toggle());
    
    console.log('Portfolio application initialized successfully.');
}

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);

// ============================================================
// EXPORT FOR GLOBAL ACCESS (for onclick in HTML)
// ============================================================
window.Slider = Slider;