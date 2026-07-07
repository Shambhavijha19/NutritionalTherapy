// ============================================================
// NUTRITIONAL THERAPY — PREMIUM REDESIGN  |  script.js
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    /* ─────────────────────────────────────────────
       1.  MOBILE NAVIGATION
    ───────────────────────────────────────────── */
    const header       = document.getElementById('main-header');
    const mobileBtn    = document.getElementById('mobile-menu-btn');
    const navLinks     = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('#nav-links a');

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.className = 'fas fa-bars';
    }

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });

        navLinkItems.forEach(link => link.addEventListener('click', closeMobileMenu));

        document.addEventListener('click', function (e) {
            if (!e.target.closest('nav')) closeMobileMenu();
        });
    }

    /* ─────────────────────────────────────────────
       2.  SCROLL: HIDE / SHOW NAV + SCROLLED CLASS
    ───────────────────────────────────────────── */
    let lastScrollY   = 0;
    let ticking       = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentY = window.scrollY;

                // Scrolled class for glass shadow
                if (currentY > 10) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide on scroll-down past 200px; show on scroll-up
                if (currentY > 200 && currentY > lastScrollY) {
                    header.classList.add('nav-hidden');
                } else if (currentY < lastScrollY) {
                    header.classList.remove('nav-hidden');
                }

                if (currentY <= 50) header.classList.remove('nav-hidden');

                lastScrollY = currentY;
                ticking     = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* ─────────────────────────────────────────────
       3.  SMOOTH SCROLL FOR ALL ANCHOR LINKS
    ───────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = header ? header.offsetHeight + 20 : 80;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });

    /* ─────────────────────────────────────────────
       4.  SCROLL-REVEAL ANIMATIONS
    ───────────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObs.observe(el));
    } else {
        // Fallback: just show all
        revealEls.forEach(el => el.classList.add('visible'));
    }

    /* ─────────────────────────────────────────────
       5.  SERVICE TABS
    ───────────────────────────────────────────── */
    const serviceTabs     = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            serviceTabs.forEach(t => t.classList.remove('active'));
            serviceContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const id = this.dataset.service;
            const content = document.getElementById(id);
            if (content) content.classList.add('active');
        });
    });

    /* ─────────────────────────────────────────────
       6.  WHO I SERVE DROPDOWN
    ───────────────────────────────────────────── */
    const whoToggle  = document.getElementById('who-serve-toggle');
    const whoContent = document.getElementById('who-serve-content');

    if (whoToggle && whoContent) {
        whoContent.classList.add('collapsed');

        whoToggle.addEventListener('click', function () {
            const isCollapsed = whoContent.classList.contains('collapsed');
            whoContent.classList.toggle('collapsed', !isCollapsed);
            whoContent.classList.toggle('expanded', isCollapsed);
            whoToggle.classList.toggle('active', isCollapsed);
        });
    }

    /* ─────────────────────────────────────────────
       7.  FEATURES SLIDER
    ───────────────────────────────────────────── */
    const track     = document.getElementById('features-track');
    const dotsWrap  = document.getElementById('slider-dots');
    const prevBtn   = document.getElementById('slider-prev');
    const nextBtn   = document.getElementById('slider-next');

    if (track && dotsWrap) {
        const slides  = track.querySelectorAll('.feature-slide');
        let currentI  = 0;

        function getVisible() {
            return Math.max(1, Math.floor(track.offsetWidth / 280));
        }

        function buildDots() {
            dotsWrap.innerHTML = '';
            const count = Math.max(1, slides.length - getVisible() + 1);
            for (let i = 0; i < count; i++) {
                const dot = document.createElement('div');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            }
        }

        function updateDots() {
            dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) =>
                d.classList.toggle('active', i === currentI)
            );
        }

        function goTo(idx) {
            const max = Math.max(0, slides.length - getVisible());
            currentI = Math.max(0, Math.min(idx, max));
            const slideW = slides[0].offsetWidth + 20;
            track.scrollTo({ left: currentI * slideW, behavior: 'smooth' });
            updateDots();
        }

        prevBtn && prevBtn.addEventListener('click', () => goTo(currentI - 1));
        nextBtn && nextBtn.addEventListener('click', () => goTo(currentI + 1));

        track.addEventListener('scroll', () => {
            const slideW = slides[0].offsetWidth + 20;
            currentI = Math.round(track.scrollLeft / slideW);
            updateDots();
        });

        buildDots();
        goTo(0);
        window.addEventListener('resize', () => { buildDots(); goTo(0); });
    }

    /* ─────────────────────────────────────────────
       8.  FAQ ACCORDION
    ───────────────────────────────────────────── */
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function () {
            const item = q.closest('.faq-item');
            const wasActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            // Open clicked (unless it was already open)
            if (!wasActive) item.classList.add('active');
        });
    });

    /* ─────────────────────────────────────────────
       9.  PRICING PLAN SYNC  (Enroll → Form)
    ───────────────────────────────────────────── */
    const pricingPlan      = document.getElementById('pricing-plan');
    const serviceTypeInput = document.getElementById('selected-service-type');
    const planTextEl       = document.getElementById('selected-plan-text');
    const planAmountEl     = document.getElementById('selected-plan-amount');

    const planMap = {
        '1 Week Starter - &#8377;1,999':  { label: '1 Week Starter',  amount: '&#8377;1,999'  },
        '1 Month Plan - &#8377;4,499':    { label: '1 Month Plan',     amount: '&#8377;4,499'  },
        '3 Months Plan - &#8377;12,999':  { label: '3 Months Plan',    amount: '&#8377;12,999' },
        '6 Months Plan - &#8377;24,999':  { label: '6 Months Plan',    amount: '&#8377;24,999' }
    };

    function syncPlan(value) {
        const info = planMap[value];
        if (!info) return;
        if (pricingPlan)      pricingPlan.value           = value;
        if (serviceTypeInput) serviceTypeInput.value      = value;
        if (planTextEl)       planTextEl.textContent      = info.label;
        if (planAmountEl)     planAmountEl.innerHTML      = info.amount;
        
        // Update UPI Deep Link Amount
        const payBtn = document.getElementById('pay-upi-app-btn');
        if (payBtn) {
            const rawAmount = info.amount.replace(/[^0-9]/g, '');
            payBtn.href = `upi://pay?pa=shreya022055@oksbi&pn=Dt%20Shreya&cu=INR&am=${rawAmount}`;
        }
    }

    if (pricingPlan) {
        pricingPlan.addEventListener('change', () => syncPlan(pricingPlan.value));
    }

    // "Enroll Now" buttons on pricing cards
    document.querySelectorAll('.pricing-enroll-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const plan = this.dataset.plan;
            syncPlan(plan);
            const apptSection = document.getElementById('appointment');
            if (apptSection) {
                const offset = header ? header.offsetHeight + 20 : 80;
                window.scrollTo({ top: apptSection.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // Default plan
    syncPlan('1 Week Starter - &#8377;1,999');

    /* ─────────────────────────────────────────────
       10. FORM — Set min date to today
    ───────────────────────────────────────────── */
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    /* ─────────────────────────────────────────────
       11. UPI/PAYMENT — MOBILE DETECTION
    ───────────────────────────────────────────── */
    const isMobile   = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const downloadBtn = document.getElementById('download-qr-btn');
    const copyBtn     = document.getElementById('copy-upi-btn');
    const upiAppBtn   = document.getElementById('pay-upi-app-btn');

    if (isMobile) {
        if (downloadBtn) downloadBtn.style.display = 'none';
        if (copyBtn)     copyBtn.style.display = 'inline-flex';
    } else {
        if (copyBtn)   copyBtn.style.display = 'none';
    }

    /* ─────────────────────────────────────────────
       WEB3FORMS — AJAX SUBMISSION
       Sends to lnjoshihome@gmail.com instantly.
       No email confirmation required.
       Redirects to thank-you.html on success.
    ───────────────────────────────────────────── */
    const form       = document.getElementById('appointment-form');
    const submitBtn  = document.getElementById('submit-btn');
    const resultBox  = document.getElementById('form-result');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Basic validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

            const formData = new FormData(form);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Redirect to thank-you page with user details as URL params
                    const name  = encodeURIComponent(form.querySelector('#name').value.trim());
                    const plan  = encodeURIComponent(form.querySelector('#pricing-plan').value.trim());
                    window.location.href = `thank-you.html?name=${name}&plan=${plan}`;
                } else {
                    // Show error inline
                    resultBox.style.display = 'block';
                    resultBox.style.background = '#fff0f0';
                    resultBox.style.border = '1.5px solid #e55';
                    resultBox.style.color = '#c00';
                    resultBox.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again or contact us on WhatsApp.';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Submit Appointment Request</span>';
                    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } catch (err) {
                resultBox.style.display = 'block';
                resultBox.style.background = '#fff0f0';
                resultBox.style.border = '1.5px solid #e55';
                resultBox.style.color = '#c00';
                resultBox.innerHTML = '<i class="fas fa-wifi"></i> Network error. Please check your connection and try again.';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Submit Appointment Request</span>';
            }
        });
    }

}); // end DOMContentLoaded


/* ─────────────────────────────────────────────
   HELPERS — Global scope (used by onclick attrs)
───────────────────────────────────────────── */

function showFormError(message) {
    let el = document.getElementById('form-error-msg');
    if (!el) {
        el = document.createElement('div');
        el.id = 'form-error-msg';
        Object.assign(el.style, {
            background: '#fff0f0',
            border: '1.5px solid #e55',
            color: '#c00',
            padding: '14px 20px',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: '500',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'Inter', sans-serif"
        });
        const form = document.getElementById('appointment-form');
        if (form) {
            const submitBtn = document.getElementById('submit-btn');
            form.insertBefore(el, submitBtn);
        }
    }
    el.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 5000);
}
