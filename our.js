// ===================================================
// VETS PAGE HERO GSAP TIMELINE & METRIC ENGINE
// ===================================================
function initVetsHeroSection() {
  const vetsHero = document.getElementById('vetsHero');
  if (!vetsHero || typeof gsap === 'undefined') return;

  const vetsTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Text & UI Sequence
  vetsTl
    .fromTo(
      '.gsap-vets-hero',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12 }
    )
    // 2. Right Surgeon Podium pop-in
    .fromTo(
      '.faculty-hero-podium',
      { scale: 0.92, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' },
      '-=0.5'
    )
    // 3. Floating Glass Badges entrance
    .fromTo(
      '.vets-floating-badge',
      { scale: 0.8, opacity: 0, y: 15 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'elastic.out(1, 0.75)' },
      '-=0.4'
    );

  // 4. Continuous Gentle Floating Physics for Badges
  gsap.to('.badge-top-left', {
    y: '-=8',
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.badge-bottom-right', {
    y: '+=8',
    duration: 3.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.4
  });

  // 5. Interactive Department Chip Selection
  const filterChips = document.querySelectorAll('#vetsDeptFilter .vets-chip');
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // 6. Incremental Numeric Counter Animation
  const statNumbers = document.querySelectorAll('.vet-stat-number');
  statNumbers.forEach((stat) => {
    const target = parseFloat(stat.getAttribute('data-count'));
    const isPercent = stat.innerText.includes('%') || target === 100;
    const isPlus = target > 30 && !isPercent;

    gsap.to(stat, {
      innerText: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%',
        once: true
      },
      snap: { innerText: 1 },
      onUpdate: function () {
        const val = Math.round(this.targets()[0].innerText);
        stat.innerText = val + (isPercent ? '%' : isPlus ? '+' : '');
      }
    });
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initVetsHeroSection();
});









// ===================================================
// VETS CLAYMORPHISM SECTION GSAP ENTRANCE & 3D TILT
// ===================================================
function initVetsClaySection() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const claySection = document.getElementById('facultyStandards');
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
        trigger: '#facultyStandards',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Staggered Pop-In for Clay Cards
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
        trigger: '.clay-vets-grid',
        start: 'top 80%',
        once: true
      }
    }
  );

  // 3. Tactile 3D Tilt Interaction on Desktop (> 768px)
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.clay-vet-card');
    cards.forEach((card) => {
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
  initVetsClaySection();
});








// ===================================================
// VETS SPLIT-SCREEN SHOWCASE GSAP ENGINE
// ===================================================
function initVetsSplitShowcase() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const showcase = document.getElementById('vetsSplitShowcase');
  if (!showcase) return;

  // 1. Reveal Section Header
  gsap.fromTo(
    '.gsap-vsplit-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#vetsSplitShowcase',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Animate Left & Right Wings Inward
  if (window.innerWidth > 768) {
    gsap.fromTo(
      '.wing-surgical',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vets-split-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.wing-feline',
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vets-split-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );

    // Center stethoscope emblem pop-in
    gsap.fromTo(
      '.vets-divider-circle',
      { scale: 0, opacity: 0, rotate: -45 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.vets-split-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );
  } else {
    gsap.fromTo(
      '.vets-split-wing',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.vets-split-canvas',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 3. Reveal Foot Banner
  gsap.fromTo(
    '.vets-split-foot-banner',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.vets-split-foot-banner',
        start: 'top 90%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initVetsSplitShowcase();
});








// ===================================================
// 3D TILT & PARALLAX FACULTY CARDS GSAP CONTROLLER
// ===================================================
function initFacultyTiltCards() {
  if (typeof gsap === 'undefined') return;

  const tiltCards = document.querySelectorAll('.tilt-card[data-tilt]');
  if (!tiltCards.length) return;

  // 1. Reveal Section Header & Cards via ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-tilt-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#facultyRoster',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-tilt-card',
      { opacity: 0, y: 45, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tilt-cards-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 2. Interactive 3D Cursor Physics on Desktop (> 768px)
  if (window.innerWidth > 768) {
    tiltCards.forEach((card) => {
      const glare = card.querySelector('.tilt-glare-layer');
      const inner = card.querySelector('.tilt-card-inner');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        // Normalize coordinates from -0.5 to 0.5
        const normX = (cardX / rect.width) - 0.5;
        const normY = (cardY / rect.height) - 0.5;

        // Tilt angles (Max 14 degrees)
        const tiltX = -normY * 16;
        const tiltY = normX * 16;

        gsap.to(card, {
          rotationX: tiltX,
          rotationY: tiltY,
          duration: 0.35,
          ease: 'power1.out',
          transformPerspective: 1200
        });

        // Glare spot reflection
        if (glare) {
          const glareX = (cardX / rect.width) * 100;
          const glareY = (cardY / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
    });
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initFacultyTiltCards();
});









// ===================================================
// SYNAPSE RESEARCH INTERACTIVE ENGINE & GSAP TRIGGERS
// ===================================================
function initSynapseResearchSection() {
  const studyCards = document.querySelectorAll('.study-card[data-study]');
  
  // HUD Target DOM Elements
  const caseFileId = document.getElementById('caseFileId');
  const caseHeadline = document.getElementById('caseHeadline');
  const caseNarrative = document.getElementById('caseNarrative');
  const metricMobility = document.getElementById('metricMobility');
  const metricCortisol = document.getElementById('metricCortisol');
  const metricCohort = document.getElementById('metricCohort');

  if (!studyCards.length || !caseHeadline) return;

  // Study catalog database
  const studyCatalog = {
    ortho: {
      id: 'PROTOCOL #RES-2025-TPLO',
      headline: 'Minimally Invasive Locking-Plate Cruciate Recovery',
      narrative: 'Through custom 3D pre-operative surgical templating, titanium plate osteotomies yield near-zero joint friction, allowing active dogs to initiate controlled physical therapy within 48 hours post-op.',
      mobility: '48 Hours',
      cortisol: '-68%',
      cohort: '340 Patients',
      accentNode: '#bioNode1'
    },
    cardio: {
      id: 'PROTOCOL #RES-2026-DOPPLER',
      headline: 'Color Doppler Micro-Velocity Hemodynamics',
      narrative: 'Ultra-high frame rate 4D color ultrasound maps micro-vascular jet velocities, revealing asymptomatic myocardial hypertrophy and valvular leaks long before physical murmurs manifest.',
      mobility: '24 Hours',
      cortisol: '-45%',
      cohort: '520 Patients',
      accentNode: '#bioNode2'
    },
    fearfree: {
      id: 'PROTOCOL #RES-2025-PHERO',
      headline: 'Ultrasonic Pheromone Micro-Mist Saturation',
      narrative: 'Continuous aerosolized Adaptil & Feliway vaporizers reduce foreign territorial hostility cues, maintaining feline respiratory rate baselines during complex intraoral radiology and vaccinations.',
      mobility: 'Immediate',
      cortisol: '-72%',
      cohort: '1,120 Patients',
      accentNode: '#bioNode3'
    }
  };

  // Study card selection handler
  studyCards.forEach(card => {
    card.addEventListener('click', () => {
      const studyKey = card.getAttribute('data-study');
      const data = studyCatalog[studyKey];

      if (!data || card.classList.contains('active')) return;

      // Update Active Classes
      studyCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Update text values
      caseFileId.textContent = data.id;
      caseHeadline.textContent = data.headline;
      caseNarrative.textContent = data.narrative;
      metricMobility.textContent = data.mobility;
      metricCortisol.textContent = data.cortisol;
      metricCohort.textContent = data.cohort;

      // GSAP Micro-Bump on Data Displays
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(
          ['#caseHeadline', '#caseNarrative', '.case-metric-box'],
          { opacity: 0.5, y: -4 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
        );

        // Flash target bio-node in background
        gsap.fromTo(
          data.accentNode,
          { opacity: 0.8, scale: 1.3 },
          { opacity: 0.5, scale: 1, duration: 1.2, ease: 'power2.out' }
        );
      }
    });
  });

  // Entrance Reveal via GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-synapse-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#facultyResearch',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-synapse-card',
      { opacity: 0, y: 45, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.synapse-stage-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initSynapseResearchSection();
});







