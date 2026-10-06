document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-nav-link');

  // ===================================================
  // 1. MOBILE DRAWER OPEN & CLOSE CONTROLS
  // ===================================================
  function openMobileDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('active')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);

  // Close drawer if user presses Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      closeMobileDrawer();
    }
  });

  // ===================================================
  // 2. FIX: AUTO-CLOSE DRAWER WHEN SWITCHING TO DESKTOP
  // ===================================================
  const desktopMediaQuery = window.matchMedia('(min-width: 993px)');

  function handleViewportChange(e) {
    if (e.matches) {
      // Screen expanded to desktop resolution, close any open mobile drawer
      closeMobileDrawer();
    }
  }

  desktopMediaQuery.addEventListener('change', handleViewportChange);
  // Initial check on load
  if (desktopMediaQuery.matches) {
    closeMobileDrawer();
  }

  // ===================================================
  // 3. FIX: MULTI-PAGE ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ===================================================
  function highlightCurrentPage() {
    // Extract current filename from URL path (e.g., 'service.html', 'index.html', or '/' -> 'index.html')
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') {
      currentPath = 'index.html';
    }

    // Helper to test if link href matches the current page
    const checkMatch = (link) => {
      const linkHref = link.getAttribute('href');
      if (!linkHref) return false;

      // Extract filename from the link href (handles paths like './service.html' or 'service.html')
      const linkFile = linkHref.split('/').pop().split('#')[0];
      return linkFile === currentPath;
    };

    // Update Desktop Nav
    desktopLinks.forEach(link => {
      link.classList.remove('active');
      if (checkMatch(link)) {
        link.classList.add('active');
      }
    });

    // Update Mobile Drawer Nav
    mobileLinks.forEach(link => {
      link.classList.remove('active');
      if (checkMatch(link)) {
        link.classList.add('active');
      }
    });
  }

  // Run the page highlighting logic
  highlightCurrentPage();
});









document.addEventListener('DOMContentLoaded', () => {
  // Select all links from Header (desktop), Header (mobile), and Footer
  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-nav-link');
  const footerLinks = document.querySelectorAll('.footer-links .footer-nav-link');

  // ===================================================
  // BULLETPROOF MULTI-PAGE ACTIVE LINK HIGHLIGHTER
  // ===================================================
  function highlightCurrentPage() {
    // 1. Get current clean filename (removes queries, hashes, trailing slashes)
    let currentPath = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];

    // If viewing root / or folder without filename, treat as index.html
    if (!currentPath || currentPath === '' || currentPath === '/') {
      currentPath = 'index.html';
    }

    const checkMatch = (link) => {
      const href = link.getAttribute('href');
      if (!href) return false;
      const targetFile = href.split('/').pop().split('?')[0].split('#')[0];
      return targetFile === currentPath;
    };

    // Update Header Desktop Links
    desktopLinks.forEach((link) => {
      link.classList.remove('active');
      if (checkMatch(link)) link.classList.add('active');
    });

    // Update Header Mobile Links
    mobileLinks.forEach((link) => {
      link.classList.remove('active');
      if (checkMatch(link)) link.classList.add('active');
    });

    // Update Footer Links
    footerLinks.forEach((link) => {
      link.classList.remove('active');
      if (checkMatch(link)) link.classList.add('active');
    });
  }

  // Run immediately on page load
  highlightCurrentPage();

  // ===================================================
  // FOOTER NEWSLETTER VALIDATION & REDIRECT
  // (Isolated strictly so it never interrupts other footer clicks)
  // ===================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterError = document.getElementById('newsletterError');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault(); // ONLY stops form submit, does NOT block nav links

      const emailVal = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailVal || !emailRegex.test(emailVal)) {
        if (newsletterError) newsletterError.textContent = 'Please enter a valid email address.';
        newsletterEmail.classList.add('input-error');
        newsletterEmail.focus();
        return;
      }

      // Valid: clear field and redirect
      if (newsletterError) newsletterError.textContent = '';
      newsletterEmail.classList.remove('input-error');
      newsletterEmail.value = '';

      window.location.href = 'error.html';
    });

    newsletterEmail.addEventListener('input', () => {
      if (newsletterEmail.classList.contains('input-error')) {
        newsletterEmail.classList.remove('input-error');
        if (newsletterError) newsletterError.textContent = '';
      }
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  // Register ScrollTrigger plugin if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ===================================================
  // 1. HERO SECTION MASTER ENTRANCE TIMELINE
  // ===================================================
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Staggered reveal of text, badge, and CTA elements
  heroTl
    .fromTo(
      '.gsap-hero-reveal',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12 }
    )
    // Reveal right side image stack
    .fromTo(
      '.hero-card-stack',
      { scale: 0.92, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' },
      '-=0.6'
    )
    // Floating glass cards pop in
    .fromTo(
      '.glass-float-card',
      { y: 20, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.18, ease: 'elastic.out(1, 0.75)' },
      '-=0.4'
    );

  // Continuous subtle floating loop for glass cards
  gsap.to('.float-top-right', {
    y: '-=10',
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.float-bottom-left', {
    y: '+=10',
    duration: 3.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
  });

  // ===================================================
  // 2. HERO NUMERICAL COUNTERS ANIMATION
  // ===================================================
  const metricNumbers = document.querySelectorAll('.metric-number');
  metricNumbers.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-count'));
    const isDecimal = target % 1 !== 0;
    const hasPlus = counter.textContent.includes('+') || target >= 10;

    gsap.to(counter, {
      innerText: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 90%',
        once: true
      },
      snap: isDecimal ? { innerText: 0.1 } : { innerText: 1 },
      onUpdate: function () {
        const val = isDecimal ? parseFloat(this.targets()[0].innerText).toFixed(1) : Math.round(this.targets()[0].innerText);
        counter.innerText = val + (isDecimal ? '%' : '+');
      }
    });
  });

  // ===================================================
  // 3. UNIVERSAL SECTION SCROLL TRIGGER FOR ALL NAVIGATION PAGES
  // Automatically animates cards, headings, and grids across
  // service.html, about.html, our.html, and contact.html
  // ===================================================
  if (typeof ScrollTrigger !== 'undefined') {
    // Reveal section headers
    gsap.utils.toArray('.section .badge, .section h2, .section p.demo-lead').forEach((elem) => {
      gsap.fromTo(
        elem,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Stagger reveal for cards (.card, .grid-2, .grid-3, .grid-4)
    gsap.utils.toArray('.grid-2, .grid-3, .grid-4').forEach((grid) => {
      const cards = grid.querySelectorAll('.card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  }
});



// ===================================================
// AUTOMATED HERO BACKGROUND SLIDER (WITH KEN BURNS ZOOM)
// ===================================================
function initHeroBgSlider() {
  const slides = document.querySelectorAll('.hero-bg-slider .hero-bg-slide');
  if (!slides || slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 6500; // 6.5 seconds per slide

  function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');

    // Advance index cyclically
    currentSlide = (currentSlide + 1) % slides.length;

    // Trigger active zoom animation on new slide
    slides[currentSlide].classList.add('active');
  }

  // Run automatically in the background
  let autoSlideTimer = setInterval(nextSlide, slideInterval);

  // Pause on tab visibility change to preserve performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoSlideTimer);
    } else {
      autoSlideTimer = setInterval(nextSlide, slideInterval);
    }
  });
}

// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initHeroBgSlider();
});








// GSAP Reveal for Marquee Section
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.fromTo(
    '.marquee-section',
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.marquee-section',
        start: 'top 95%',
        once: true
      }
    }
  );
}








// ===================================================
// KINETIC STACKING CARDS SCROLL CONTROLLER
// ===================================================
function initKineticStacking() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const stackCards = document.querySelectorAll('.kinetic-stack-wrapper .stack-card');
  if (!stackCards || stackCards.length === 0) return;

  // Header Entrance Reveal
  gsap.fromTo(
    '.gsap-stack-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.kinetic-stack-section',
        start: 'top 80%',
        once: true
      }
    }
  );

  // Desktop Stacking Animation (> 768px)
  const isDesktop = window.matchMedia('(min-width: 769px)').matches;

  if (isDesktop) {
    stackCards.forEach((card, index) => {
      // Don't need to scale the final card as nothing stacks over it
      if (index === stackCards.length - 1) return;

      const nextCard = stackCards[index + 1];

      gsap.to(card, {
        scale: 0.92,
        opacity: 0.65,
        filter: 'blur(1px)',
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top 160px',
          end: 'top 120px',
          scrub: true
        }
      });
    });
  } else {
    // Mobile Stagger Reveal (<= 768px)
    stackCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }
}

// Call inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initKineticStacking();
});










// ===================================================
// EXPANDING FLEX CARDS CONTROLLER (DESKTOP + MOBILE)
// ===================================================
function initExpandableDeck() {
  const cards = document.querySelectorAll('#expandDeck .expand-card');
  if (!cards || cards.length === 0) return;

  // 1. Entrance Scroll Animation with GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-expand-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.expand-cards-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#expandDeck',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 2. Expand & Collapse Interaction
  function activateCard(targetCard) {
    cards.forEach(card => card.classList.remove('active'));
    targetCard.classList.add('active');

    // Subtle GSAP entrance bump for newly revealed content
    const content = targetCard.querySelector('.expanded-content');
    if (content && typeof gsap !== 'undefined') {
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: 'power2.out' }
      );
    }
  }

  cards.forEach(card => {
    // Click interaction (Works seamlessly across both desktop and mobile touch)
    card.addEventListener('click', (e) => {
      // Allow direct button links inside card to navigate without triggering accordion collapse
      if (e.target.closest('a') || e.target.closest('button')) return;
      activateCard(card);
    });

    // Optional desktop hover expansion (only active above 768px)
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        activateCard(card);
      }
    });
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
  initExpandableDeck();
});









// ===================================================
// EMERGENCY COMMAND CENTER GSAP TIMELINE
// ===================================================
function initEmergencyCommandSection() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const emergSection = document.getElementById('emergencyCommand');
  if (!emergSection) return;

  // 1. Reveal Header
  gsap.fromTo(
    '.gsap-emerg-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#emergencyCommand',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Reveal Left Main Telemetry Card
  gsap.fromTo(
    '.gsap-emerg-card',
    { opacity: 0, x: -35 },
    {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.command-dashboard-grid',
        start: 'top 80%',
        once: true
      }
    }
  );

  // 3. Stagger Reveal Right Surgical Pods
  gsap.fromTo(
    '.gsap-emerg-pod',
    { opacity: 0, x: 35 },
    {
      opacity: 1,
      x: 0,
      duration: 0.75,
      stagger: 0.16,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.command-dashboard-grid',
        start: 'top 80%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initEmergencyCommandSection();
});

// Add inside initEmergencyCommandSection() in script.js:
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.to('.emergency-bg-img', {
    y: '15%',
    ease: 'none',
    scrollTrigger: {
      trigger: '#emergencyCommand',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}









// ===================================================
// CLAYMORPHISM SECTION GSAP ENTRANCE & 3D TILT
// ===================================================
function initClaySection() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const claySection = document.getElementById('clayPerks');
  if (!claySection) return;

  // 1. Header Reveal
  gsap.fromTo(
    '.gsap-clay-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#clayPerks',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Stagger Entrance for Clay Cards
  gsap.fromTo(
    '.gsap-clay-card',
    { opacity: 0, y: 40, scale: 0.94 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.14,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.clay-grid',
        start: 'top 80%',
        once: true
      }
    }
  );

  // 3. Tactile Mouse Hover Micro-Tilt on Desktop (> 768px)
  if (window.innerWidth > 768) {
    const clayCards = document.querySelectorAll('.clay-card');
    clayCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(card, {
          rotationY: x * 0.05,
          rotationX: -y * 0.05,
          ease: 'power1.out',
          duration: 0.4,
          transformPerspective: 800
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          ease: 'power2.out',
          duration: 0.6
        });
      });
    });
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initClaySection();
});









// ===================================================
// CLASSY TESTIMONIALS SLIDER & GSAP CONTROLLER
// ===================================================
function initTestimonialsSection() {
  const slides = document.querySelectorAll('.testi-slide');
  const dots = document.querySelectorAll('.testi-dot');
  const prevBtn = document.getElementById('prevTesti');
  const nextBtn = document.getElementById('nextTesti');
  
  if (!slides || slides.length === 0) return;

  let currentIdx = 0;
  let isAnimating = false;

  // 1. Entrance Reveal via GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-testi-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#testimonials',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-testi-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testi-stage-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 2. Slide Transition Function
  function showSlide(index, direction = 'next') {
    if (isAnimating || index === currentIdx) return;
    isAnimating = true;

    const currentSlide = slides[currentIdx];
    const targetSlide = slides[index];

    // Update Dots
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

    if (typeof gsap !== 'undefined') {
      const xOut = direction === 'next' ? -30 : 30;
      const xIn = direction === 'next' ? 30 : -30;

      // Animate Out Current
      gsap.to(currentSlide, {
        opacity: 0,
        x: xOut,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          currentSlide.classList.remove('active');
          targetSlide.classList.add('active');

          // Animate In Target
          gsap.fromTo(
            targetSlide,
            { opacity: 0, x: xIn },
            {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: 'power2.out',
              onComplete: () => {
                currentIdx = index;
                isAnimating = false;
              }
            }
          );
        }
      });
    } else {
      // Graceful fallback without GSAP
      currentSlide.classList.remove('active');
      targetSlide.classList.add('active');
      currentIdx = index;
      isAnimating = false;
    }
  }

  // Next / Prev Triggers
  function nextSlide() {
    const nextIdx = (currentIdx + 1) % slides.length;
    showSlide(nextIdx, 'next');
  }

  function prevSlide() {
    const prevIdx = (currentIdx - 1 + slides.length) % slides.length;
    showSlide(prevIdx, 'prev');
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Dot Click Triggers
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
      showSlide(targetIndex, targetIndex > currentIdx ? 'next' : 'prev');
    });
  });

  // Optional: Auto cycle every 7 seconds when in view
  let autoSlideTimer = setInterval(nextSlide, 7000);

  const sliderWrapper = document.querySelector('.testi-slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    sliderWrapper.addEventListener('mouseleave', () => {
      clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(nextSlide, 7000);
    });
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initTestimonialsSection();
});








// ===================================================
// FAQ ACCORDION SYSTEM & GSAP SCROLL ENTRANCE
// ===================================================
function initFaqSection() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems || faqItems.length === 0) return;

  // 1. Entrance Scroll Trigger Reveal
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-faq-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#faq',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-faq-sidebar',
      { opacity: 0, x: -35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-grid',
          start: 'top 80%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.faq-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-accordion-group',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 2. Initial Setup for Active Items
  faqItems.forEach(item => {
    const content = item.querySelector('.faq-content');
    if (item.classList.contains('active') && content) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });

  // 3. Interactive Accordion Toggle
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Collapse all other accordion items (accordion behavior)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initFaqSection();
});








// ===================================================
// LIGHT CANVAS CTA INTERACTIVITY & GSAP ANIMATION
// ===================================================
function initLightCtaSection() {
  // 1. Service Pill Button Active Selection
  const servicePillBtns = document.querySelectorAll('.service-pill-btn');
  servicePillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      servicePillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 2. GSAP Entrance ScrollTrigger Animation
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const pedestal = document.querySelector('.gsap-light-cta');
    if (!pedestal) return;

    gsap.fromTo(
      pedestal,
      { opacity: 0, y: 45, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#bookingCta',
          start: 'top 85%',
          once: true
        }
      }
    );
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initLightCtaSection();
});