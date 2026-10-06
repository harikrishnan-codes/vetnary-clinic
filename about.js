// ===================================================
// ABOUT PAGE HERO TIMELINE & MOSAIC GSAP CONTROLLER
// ===================================================
function initAboutHeroSection() {
  const aboutHero = document.getElementById('aboutHero');
  if (!aboutHero || typeof gsap === 'undefined') return;

  const abtTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Text & Credentials Sequence
  abtTl
    .fromTo(
      '.gsap-abt-hero',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12 }
    )
    // 2. Mosaic Visual Canvas pop-in
    .fromTo(
      '.mosaic-canvas',
      { scale: 0.92, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' },
      '-=0.5'
    )
    // 3. Floating Glass Pills entrance
    .fromTo(
      '.about-glass-pill',
      { scale: 0.8, opacity: 0, y: 15 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'elastic.out(1, 0.75)' },
      '-=0.4'
    );

  // 4. Subtle Ambient Parallax on Topographic Contours
  gsap.to('.topographic-mesh', {
    y: 35,
    ease: 'none',
    scrollTrigger: {
      trigger: '#aboutHero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // 5. Continuous Floating Motion for Badges
  gsap.to('.pill-cert', {
    y: '-=8',
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.pill-hours', {
    y: '+=8',
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
  });

  // 6. Number Counter Animation for Legacy Metrics
  const metrics = document.querySelectorAll('.abt-metric-num');
  metrics.forEach((num) => {
    const target = parseFloat(num.getAttribute('data-count'));
    const isDecimal = target % 1 !== 0;

    gsap.to(num, {
      innerText: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: num,
        start: 'top 90%',
        once: true
      },
      snap: isDecimal ? { innerText: 0.1 } : { innerText: 1 },
      onUpdate: function () {
        const val = isDecimal
          ? parseFloat(this.targets()[0].innerText).toFixed(1)
          : Math.round(this.targets()[0].innerText);
        num.innerText = val + (isDecimal ? '%' : target > 30 ? '+' : '+');
      }
    });
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initAboutHeroSection();
});








// ===================================================
// 3D CARD CAROUSEL / COVERFLOW GSAP ENGINE
// ===================================================
function initCoverflowDeck() {
  const cards = document.querySelectorAll('.coverflow-card');
  const dotsContainer = document.getElementById('coverflowDots');
  const prevBtn = document.getElementById('coverflowPrev');
  const nextBtn = document.getElementById('coverflowNext');

  if (!cards || cards.length === 0) return;

  let currentIndex = 2; // Center card (index 2) active by default
  const totalCards = cards.length;
  let isAnimating = false;

  // 1. Build Navigation Dots Dynamically
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `coverflow-dot ${idx === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => updateCoverflow(idx));
      dotsContainer.appendChild(dot);
    });
  }

  // 2. Render 3D Coverflow Perspective
  function renderDeck() {
    const isMobile = window.innerWidth <= 768;
    const spacing = isMobile ? 180 : 250; // Spacing distance between cards
    const dots = document.querySelectorAll('.coverflow-dot');

    cards.forEach((card, idx) => {
      const offset = idx - currentIndex;
      const absOffset = Math.abs(offset);

      // Active state
      card.classList.toggle('active', offset === 0);

      // 3D Matrix Parameters
      let translateX = offset * spacing;
      let translateZ = -absOffset * (isMobile ? 120 : 180);
      let rotateY = offset > 0 ? -42 : offset < 0 ? 42 : 0;
      let opacity = 1 - absOffset * 0.28;
      let zIndex = 100 - absOffset * 10;

      // Hide distant cards beyond 2 steps
      if (absOffset > 2) {
        opacity = 0;
        card.style.pointerEvents = 'none';
      } else {
        card.style.pointerEvents = offset === 0 ? 'auto' : 'auto';
      }

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          x: translateX,
          z: translateZ,
          rotationY: rotateY,
          opacity: Math.max(opacity, 0),
          zIndex: zIndex,
          scale: offset === 0 ? 1 : (isMobile ? 0.88 : 0.84),
          duration: 0.65,
          ease: 'power3.out'
        });
      } else {
        // Fallback without GSAP
        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${offset === 0 ? 1 : 0.85})`;
        card.style.opacity = Math.max(opacity, 0);
        card.style.zIndex = zIndex;
      }
    });

    // Update Dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function updateCoverflow(newIndex) {
    if (newIndex < 0 || newIndex >= totalCards || isAnimating) return;
    isAnimating = true;
    currentIndex = newIndex;
    renderDeck();
    setTimeout(() => { isAnimating = false; }, 400);
  }

  // 3. Navigation Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const target = (currentIndex - 1 + totalCards) % totalCards;
      updateCoverflow(target);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const target = (currentIndex + 1) % totalCards;
      updateCoverflow(target);
    });
  }

  // Click card to center it directly
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx !== currentIndex) {
        updateCoverflow(idx);
      }
    });
  });

  // Touch Swipe Support for Mobile Screens
  let touchStartX = 0;
  let touchEndX = 0;
  const stage = document.getElementById('coverflowDeck');

  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 45;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped Left -> Go Next
      if (currentIndex < totalCards - 1) updateCoverflow(currentIndex + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped Right -> Go Prev
      if (currentIndex > 0) updateCoverflow(currentIndex - 1);
    }
  }

  // 4. GSAP Section Entrance Trigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-coverflow-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#coverflowShowcase',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '#coverflowDeck',
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#coverflowDeck',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // Initial calculation & resize listener
  renderDeck();
  window.addEventListener('resize', () => {
    renderDeck();
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initCoverflowDeck();
});









// ===================================================
// MASONRY GRID STAGGERED ENTRANCE CONTROLLER
// ===================================================
function initMasonryGrid() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const masonryWall = document.getElementById('masonryWall');
  if (!masonryWall) return;

  // 1. Reveal Section Header
  gsap.fromTo(
    '.gsap-masonry-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#hospitalCulture',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Stagger Masonry Bricks Entrance
  const bricks = document.querySelectorAll('.gsap-brick');
  gsap.fromTo(
    bricks,
    { opacity: 0, y: 40, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#masonryWall',
        start: 'top 80%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initMasonryGrid();
});









// ===================================================
// SPLIT-SCREEN COMPARATIVE SHOWCASE GSAP ENGINE
// ===================================================
function initSplitShowcase() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const splitSection = document.getElementById('splitShowcase');
  if (!splitSection) return;

  // 1. Reveal Section Header
  gsap.fromTo(
    '.gsap-split-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#splitShowcase',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Animate Left & Right Panels Inward
  if (window.innerWidth > 768) {
    gsap.fromTo(
      '.panel-traditional',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.split-screen-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.panel-modern',
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.split-screen-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );

    // VS Center Badge Pulse Pop
    gsap.fromTo(
      '.split-vs-circle',
      { scale: 0, opacity: 0, rotate: -45 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.split-screen-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );
  } else {
    // Simple vertical reveal for mobile
    gsap.fromTo(
      '.split-panel',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.split-screen-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 3. Reveal Bottom Banner
  gsap.fromTo(
    '.split-footer-banner',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.split-footer-banner',
        start: 'top 90%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initSplitShowcase();
});








// ===================================================
// FEAR-FREE SENSORY BIOMETRIC CONSOLE ENGINE
// ===================================================
function initSensoryBiometricConsole() {
  const patientBtns = document.querySelectorAll('#patientSelector .patient-btn');
  const channelCards = document.querySelectorAll('#sensoryChannels .channel-card');

  // HUD Targets
  const hudTitle = document.getElementById('hudTitle');
  const hudStateTag = document.getElementById('hudStateTag');
  const gaugeStressVal = document.getElementById('gaugeStressVal');
  const gaugeRing = document.getElementById('gaugeRing');
  const metricBpm = document.getElementById('metricBpm');
  const metricDecibel = document.getElementById('metricDecibel');
  const metricTemp = document.getElementById('metricTemp');
  const hudBriefText = document.getElementById('hudBriefText');

  if (!channelCards.length || !gaugeRing) return;

  // State tracker
  let currentAnimal = 'dog';
  let currentChannel = 'acoustic';

  // Sensory dataset with stress factors
  const sensoryData = {
    acoustic: {
      title: 'Acoustic Shielding Active',
      state: 'OPTIMAL TRANQUILITY',
      stress: { dog: '16%', cat: '11%' },
      offset: { dog: 430, cat: 450 }, // SVG circumference: 515
      bpm: { dog: '74 BPM', cat: '124 BPM' },
      decibel: '28 dB',
      temp: '38.4°C',
      brief: {
        dog: 'Sound-dampening acoustic wall baffles eliminate sharp echoing barks, maintaining resting canine heart rates within calm baseline.',
        cat: 'Acoustically isolated chambers suppress foreign ultrasonic noise, lowering resting feline respiration rates by 42% within minutes.'
      }
    },
    optical: {
      title: 'Circadian Light Calibration',
      state: 'RESTFUL VISUAL SPECTRUM',
      stress: { dog: '18%', cat: '14%' },
      offset: { dog: 420, cat: 440 },
      bpm: { dog: '78 BPM', cat: '128 BPM' },
      decibel: '31 dB',
      temp: '38.5°C',
      brief: {
        dog: 'Zero-flicker 2700K ambient luminaires prevent photic retinal fatigue during neurological and eye examinations.',
        cat: 'Low-lux dimmable examination suites allow dilated pupil comfort and calm postural demeanor during gentle handling.'
      }
    },
    thermal: {
      title: 'Therapeutic Thermal Padding',
      state: 'MUSCULOSKELETAL COMFORT',
      stress: { dog: '12%', cat: '09%' },
      offset: { dog: 450, cat: 465 },
      bpm: { dog: '70 BPM', cat: '118 BPM' },
      decibel: '30 dB',
      temp: '38.8°C',
      brief: {
        dog: 'Warm memory-foam exam pads replace cold stainless steel, instantly reducing joint stiffness in senior arthritic dogs.',
        cat: 'Thermostatically warmed exam cocoons support feline core heat retention and encourage self-soothing kneading behaviors.'
      }
    },
    olfactory: {
      title: 'Bio-Identical Pheromone Mist',
      state: 'NEURO-CHEMICAL CALM',
      stress: { dog: '08%', cat: '06%' },
      offset: { dog: 470, cat: 480 },
      bpm: { dog: '68 BPM', cat: '112 BPM' },
      decibel: '26 dB',
      temp: '38.3°C',
      brief: {
        dog: 'Adaptil maternal appeasing pheromones naturally lower salivary cortisol levels by 68% throughout clinical physicals.',
        cat: 'Feliway feline facial pheromone vaporizers soothe unfamiliar territory anxiety, prompting relaxed whisker positions.'
      }
    }
  };

  // Recalculate HUD & trigger GSAP micro-bumps
  function updateConsole() {
    const data = sensoryData[currentChannel];

    hudTitle.textContent = data.title;
    hudStateTag.textContent = data.state;
    gaugeStressVal.textContent = data.stress[currentAnimal];
    metricBpm.textContent = data.bpm[currentAnimal];
    metricDecibel.textContent = data.decibel;
    metricTemp.textContent = data.temp;
    hudBriefText.textContent = data.brief[currentAnimal];

    // Animate SVG stroke offset with GSAP
    if (typeof gsap !== 'undefined') {
      gsap.to(gaugeRing, {
        strokeDashoffset: data.offset[currentAnimal],
        duration: 0.85,
        ease: 'power3.out'
      });

      // Subtle pulse on values
      gsap.fromTo(
        ['#gaugeStressVal', '#metricBpm', '#metricDecibel', '#metricTemp', '#hudBriefText'],
        { opacity: 0.6, y: -3 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      );
    } else {
      gaugeRing.style.strokeDashoffset = data.offset[currentAnimal];
    }
  }

  // Animal Switch Listeners
  patientBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      patientBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAnimal = btn.getAttribute('data-animal');
      updateConsole();
    });
  });

  // Channel Selection Listeners
  channelCards.forEach(card => {
    card.addEventListener('click', () => {
      channelCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentChannel = card.getAttribute('data-channel');
      updateConsole();
    });
  });

  // GSAP ScrollTrigger Entrance Reveal
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-motion-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#sensoryConsole',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-motion-card',
      { opacity: 0, y: 45, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#sensoryConsole',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // Initialize defaults
  updateConsole();
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initSensoryBiometricConsole();
});









// ===================================================
// ABOUT PAGE CTA GSAP SCROLL ENTRANCE
// ===================================================
function initAboutCtaSection() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const abtCta = document.querySelector('.gsap-abt-cta');
  if (!abtCta) return;

  gsap.fromTo(
    abtCta,
    { opacity: 0, y: 45, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#aboutCta',
        start: 'top 85%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initAboutCtaSection();
});