// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Mohammad\'s Portfolio Loading...');
    
    // ==========================================
    // PAGE LOADER FUNCTIONALITY
    // ==========================================
    
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('loaded');
            console.log('✅ Page loaded successfully!');
        }
    }, 2000);

    // ==========================================
    // MOBILE NAVIGATION FUNCTIONALITY
    // ==========================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // HERO SECTION TYPING ANIMATION
    // ==========================================
    
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            'Aspiring UI/UX Designer',
            'Graphic Design Enthusiast', 
            'Future Creative Professional',
            'Learning & Growing Daily'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        typeText();
    }

    // ==========================================
    // ANIMATED COUNTERS FOR STATISTICS
    // ==========================================
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 50);
    }

    // ==========================================
    // SKILL BARS ANIMATION
    // ==========================================
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-number')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }

                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }

                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number, .skills-section').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // PORTFOLIO FILTERING FUNCTIONALITY
    // ==========================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // TESTIMONIALS SLIDER FUNCTIONALITY
    // ==========================================
    
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (testimonialItems[index]) {
            testimonialItems[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    setInterval(nextTestimonial, 5000);

    // ==========================================
    // CONTACT FORM FUNCTIONALITY
    // ==========================================
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                btnText.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                this.reset();
                
                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    submitBtn.style.background = '';
                }, 3000);
                
                alert('Thank you for your message! I\'ll get back to you soon.');
            }, 2000);
        });
    }

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // PARALLAX EFFECT FOR FLOATING SHAPES
    // ==========================================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card, .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ==========================================
    // ACTIVE NAVIGATION LINK HIGHLIGHT
    // ==========================================
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // INITIALIZE AOS-LIKE ANIMATIONS
    // ==========================================
    
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                const delay = entry.target.getAttribute('data-aos-delay');
                if (delay) {
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        animateObserver.observe(element);
    });

    // ==========================================
    // FORM FIELD ANIMATIONS
    // ==========================================
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // ==========================================
    // BUTTON CLICK EFFECTS
    // ==========================================
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });

    console.log('🎉 Portfolio website loaded successfully!');
});

// ==========================================
// CSS ANIMATIONS VIA JAVASCRIPT
// ==========================================

const style = document.createElement('style');
style.textContent = `
    [data-aos] {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(30px);
    }
    
    [data-aos="fade-up"].aos-animate {
        transform: translateY(0);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(30px);
    }
    
    [data-aos="fade-left"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-30px);
    }
    
    [data-aos="fade-right"].aos-animate {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);