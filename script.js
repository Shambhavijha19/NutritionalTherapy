// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation and Hide-on-Scroll Functionality
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    let lastScrollTop = 0;
    let isScrolling = false;
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on nav links
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Hide/Show navbar on scroll
    function handleScroll() {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only hide on mobile/tablet and when scrolling down past 100px
            if (scrollTop > 100 && scrollTop > lastScrollTop) {
                // Scrolling down - hide navbar
                header.classList.add('nav-hidden');
            } else if (scrollTop < lastScrollTop) {
                // Scrolling up - show navbar
                header.classList.remove('nav-hidden');
            }
            
            // Always show navbar at top of page
            if (scrollTop <= 50) {
                header.classList.remove('nav-hidden');
            }
            
            lastScrollTop = scrollTop;
            isScrolling = false;
        });
    }
    
    // Throttled scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Smooth scrolling for navigation links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Who I Serve dropdown functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const whoIServe = document.querySelector('.who-i-serve');

    if (dropdownToggle && whoIServe) {
        // Ensure it starts collapsed
        whoIServe.classList.add('collapsed');
        whoIServe.classList.remove('expanded');

        dropdownToggle.addEventListener('click', function() {
            // Toggle classes
            if (whoIServe.classList.contains('collapsed')) {
                whoIServe.classList.remove('collapsed');
                whoIServe.classList.add('expanded');
                dropdownToggle.classList.add('active');
            } else {
                whoIServe.classList.add('collapsed');
                whoIServe.classList.remove('expanded');
                dropdownToggle.classList.remove('active');
            }
        });
    }

    // Services tabs functionality - Fix this section
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('Tab clicked:', tab.getAttribute('data-service')); // Debug log
            
            // Remove active class from all tabs
            serviceTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content sections
            serviceContents.forEach(content => content.classList.remove('active'));

            // Show the corresponding content section
            const serviceId = tab.getAttribute('data-service');
            const targetContent = document.getElementById(serviceId);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Content shown:', serviceId); // Debug log
            }

            // Add a small animation to the icon
            const icon = tab.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bounce');
                setTimeout(() => {
                    icon.classList.remove('fa-bounce');
                }, 500);
            }
        });
    });

    // FAQ accordion functionality - Fix this section
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            console.log('FAQ clicked'); // Debug log
            const faqItem = question.parentElement;

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle the clicked FAQ item
            faqItem.classList.toggle('active');
        });
    });

    // Form validation and submission
    const appointmentForm = document.getElementById('appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            // Basic form validation
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const problem = document.getElementById('problem').value;
            const preferredDate = document.getElementById('preferred-date').value;
            const preferredTime = document.getElementById('preferred-time').value;
            const paymentProof = document.getElementById('payment-proof');

            // Check if required fields are filled
            if (!name || !age || !gender || !email || !phone || !problem || !preferredDate || !preferredTime) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // Age validation
            if (age < 1 || age > 120) {
                e.preventDefault();
                alert('Please enter a valid age between 1 and 120.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                e.preventDefault();
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            // Payment proof validation
            if (!paymentProof.files || paymentProof.files.length === 0) {
                e.preventDefault();
                alert('Please upload payment proof to proceed.');
                return;
            }

            // Check file size (max 10MB)
            if (paymentProof.files[0].size > 10 * 1024 * 1024) {
                e.preventDefault();
                alert('File size should be less than 10MB');
                return;
            }

            // Check file type - allow images and PDFs
            const validTypes = [
                'image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp',
                'application/pdf'
            ];
            
            if (!validTypes.includes(paymentProof.files[0].type)) {
                e.preventDefault();
                alert('Please upload a valid file (JPG, PNG, GIF, PDF)');
                return;
            }

            // If validation passes, the form will submit to FormSubmit
            console.log('Form validated and submitting to FormSubmit');
        });
    }

    // Smooth scrolling for navigation and footer links
    const allNavLinks = document.querySelectorAll('nav a, .hero a, .footer-links a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize FAQ items - Remove the first one being open by default
    // This was causing issues with the functionality

    // Features slider functionality
    const featuresTrack = document.querySelector('.features-track');
    const sliderDots = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');

    if (featuresTrack && sliderDots) {
        const slides = featuresTrack.querySelectorAll('.feature-slide');
        let currentIndex = 0;
        const slidesToShow = Math.floor(featuresTrack.offsetWidth / 300);
        const maxIndex = Math.max(0, slides.length - slidesToShow);

        // Create dots
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }

        // Update dots
        function updateDots() {
            const dots = sliderDots.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Go to slide
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            const slideWidth = slides[0].offsetWidth + 20; // 20px is the gap
            featuresTrack.scrollLeft = currentIndex * slideWidth;
            updateDots();
        }

        // Previous slide
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
        }

        // Next slide
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }

        // Handle scroll events
        featuresTrack.addEventListener('scroll', () => {
            const slideWidth = slides[0].offsetWidth + 20;
            currentIndex = Math.round(featuresTrack.scrollLeft / slideWidth);
            updateDots();
        });

        // Initialize
        goToSlide(0);
    }

    // Animate thank you message on scroll
    const thankYouMessage = document.querySelector('.thank-you-message');
    if (thankYouMessage) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    thankYouMessage.style.opacity = '1';
                    thankYouMessage.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });

        observer.observe(thankYouMessage);
    }

    // Add touch device detection for UPI functionality
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
    const upiLink = document.querySelector('.upi-link');
    const upiIdCopy = document.querySelector('.upi-id-copy');
    
    if (isTouchDevice && upiLink && upiIdCopy) {
        upiLink.style.display = 'none';
        upiIdCopy.style.display = 'flex';
    } else if (upiIdCopy) {
        upiIdCopy.style.display = 'none';
    }
});

// ================= Anti-bot & secure submission additions =================
(function(){
    const enhancedForm = document.getElementById('appointment-form');
    if (!enhancedForm) return;
    const loadTime = Date.now();
    const endpoint = enhancedForm.dataset.endpoint;
    const hpVisible = document.getElementById('hp_field');
    const hpHidden = document.getElementById('dyn_honeypot');
    if (hpVisible && hpHidden) {
        const realHpName = 'f_' + Math.random().toString(36).slice(2,10);
        hpHidden.name = realHpName;
        hpVisible.name = 'website';
    }
    const sessionTokenName = 't_' + Math.random().toString(36).slice(2,10);
    const sessionTokenValue = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
    const sessionInput = document.createElement('input');
    sessionInput.type = 'hidden';
    sessionInput.name = sessionTokenName;
    sessionInput.value = sessionTokenValue;
    enhancedForm.appendChild(sessionInput);

    let userInteracted = false;
    enhancedForm.addEventListener('input', () => { userInteracted = true; }, { once: true });

    enhancedForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const requiredIds = ['name','age','gender','email','phone','problem','preferred-date','preferred-time','payment-proof'];
        for (const id of requiredIds) {
            const el = document.getElementById(id);
            if (!el || (el.type === 'file' ? el.files.length === 0 : !el.value.trim())) {
                alert('Please fill in all required fields.');
                return;
            }
        }
        if (hpVisible && hpVisible.value.trim() !== '') { console.warn('Spam blocked (honeypot).'); return; }
        if (Date.now() - loadTime < 2500) { alert('Please take a little more time completing the form.'); return; }
        if (!userInteracted) { alert('Please interact with the form fields first.'); return; }
        const humanCheck = document.getElementById('human_check');
        if (!humanCheck || !humanCheck.checked) { alert('Please confirm you are human.'); return; }
        const paymentProof = document.getElementById('payment-proof');
        const file = paymentProof.files[0];
        if (!file) { alert('Please upload payment proof.'); return; }
        if (file.size > 10 * 1024 * 1024) { alert('File too large (max 10MB).'); return; }
        const allowed = ['image/jpeg','image/png','image/jpg','image/gif','image/webp','application/pdf'];
        if (!allowed.includes(file.type)) { alert('Invalid file type.'); return; }
        const fd = new FormData(enhancedForm);
        if (hpHidden && hpHidden.name) fd.set(hpHidden.name, '');
        fd.set('_subject','New Appointment Request - Nutritional Therapy (Human Verified)');
        fd.set('_template','table');
        try {
            const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { 'Accept':'application/json' } });
            if (res.ok) {
                const next = enhancedForm.querySelector('input[name="_next"]').value;
                window.location.href = next || window.location.href;
            } else {
                alert('Submission failed. Please try again later.');
            }
        } catch (err) {
            console.error(err);
            alert('Network error. Please retry.');
        }
    }, { capture: true });
})();
// ================= End anti-bot additions =================

// UPI copy function (needs to be global for onclick handlers)
function copyUPIId(event) {
    event.preventDefault();
    const upiId = "shreya022055@oksbi";
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(upiId).then(() => {
            showCopyMessage("UPI ID copied to clipboard!");
        }).catch(() => {
            fallbackCopyTextToClipboard(upiId);
        });
    } else {
        fallbackCopyTextToClipboard(upiId);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyMessage("UPI ID copied to clipboard!");
    } catch (err) {
        showCopyMessage("Failed to copy. Please copy manually: " + text);
    }
    
    document.body.removeChild(textArea);
}

// Function to show copy message
function showCopyMessage(message) {
    let messageEl = document.getElementById('copy-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'copy-message';
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.opacity = '1';
    messageEl.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (messageEl && messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}
