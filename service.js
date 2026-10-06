// ===================================================
// SERVICE PAGE HERO GSAP ENTRANCE & FLOATING LOOP
// ===================================================
function initServiceHeroSection() {
  const serviceHero = document.getElementById('serviceHero');
  if (!serviceHero || typeof gsap === 'undefined') return;

  const srvTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Text & UI elements staggered slide-up
  srvTl
    .fromTo(
      '.gsap-srv-hero',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }
    )
    // 2. Right Visual Card pop-in
    .fromTo(
      '.service-card-canvas',
      { scale: 0.92, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'back.out(1.4)' },
      '-=0.5'
    )
    // 3. Floating glass badges bounce entrance
    .fromTo(
      '.srv-glass-pill',
      { scale: 0.8, opacity: 0, y: 15 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'elastic.out(1, 0.75)' },
      '-=0.4'
    );

  // 4. Subtle continuous floating motion for glass pills
  gsap.to('.pill-top-right', {
    y: '-=8',
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.pill-bottom-left', {
    y: '+=8',
    duration: 3.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.4
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initServiceHeroSection();
});









// ===================================================
// AURORA GRADIENT PATHWAYS GSAP TIMELINE & MOTION
// ===================================================
function initAuroraPathways() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const auroraSection = document.getElementById('auroraPathways');
  if (!auroraSection) return;

  // 1. Reveal Section Header
  gsap.fromTo(
    '.gsap-aurora-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#auroraPathways',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Staggered Holo Cards Reveal
  gsap.fromTo(
    '.gsap-aurora-card',
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.16,
      ease: 'back.out(1.3)',
      scrollTrigger: {
        trigger: '.aurora-cards-grid',
        start: 'top 80%',
        once: true
      }
    }
  );

  // 3. Fluid floating animation for background aurora streams
  gsap.to('.stream-teal', {
    x: 40,
    y: 30,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.stream-amber', {
    x: -35,
    y: -25,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
  });

  gsap.to('.stream-mint', {
    x: 25,
    y: -30,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initAuroraPathways();
});









// ===================================================
// MICRO-INTERACTIVE TREATMENT BLUEPRINT ENGINE
// ===================================================
function initInteractiveBlueprint() {
  const speciesBtns = document.querySelectorAll('#speciesToggle .motion-pill-btn');
  const stageTabs = document.querySelectorAll('#stageTabs .stage-tab');
  const weightSlider = document.getElementById('weightSlider');
  const weightDisplay = document.getElementById('weightDisplay');
  const priorityTags = document.querySelectorAll('#priorityTags .motion-tag');

  // Blueprint output DOM targets
  const blueprintCode = document.getElementById('blueprintCode');
  const timeEstimate = document.getElementById('timeEstimate');
  const freqEstimate = document.getElementById('freqEstimate');
  const estimatePrice = document.getElementById('estimatePrice');
  const planItemList = document.getElementById('planItemList');

  if (!speciesBtns.length || !weightSlider) return;

  // Active state tracker
  const state = {
    species: 'canine',
    stage: 'adult',
    weight: 22,
    priority: 'wellness'
  };

  // Treatment protocols catalog
  const protocols = {
    junior: {
      time: '35 Mins',
      freq: 'Every 3-4 Weeks (Boosters)',
      price: '$95 - $130',
      items: [
        'Pediatric developmental anatomy screening',
        'Series core vaccination protocol (DHPP/FVRCP + Rabies)',
        'Microchip painless subcutaneous implantation',
        'Early behavior, crate training & nutrition guide'
      ]
    },
    adult: {
      time: '45 Mins',
      freq: 'Annual (1x/year)',
      price: '$120 - $165',
      items: [
        '15-Point head-to-tail musculoskeletal physical',
        'Standard core & lifestyle risk boosters (Bordetella/Lepto)',
        'Heartworm antigen & intestinal parasite screen',
        'Body condition index & weight maintenance evaluation'
      ]
    },
    senior: {
      time: '60 Mins',
      freq: 'Bi-Annual (Every 6 Months)',
      price: '$180 - $240',
      items: [
        'Comprehensive geriatric organ biochemistry lab panel',
        'Joint mobility & osteoarthritis ultrasound assessment',
        'Blood pressure and resting cardiac evaluation',
        'Vision, dental staging & metabolic renal monitoring'
      ]
    }
  };

  // Recalculate Blueprint Output with GSAP Micro-Bumps
  function updateBlueprint() {
    // 1. Update text displays
    weightDisplay.textContent = `${state.weight} kg`;
    const specCode = state.species === 'canine' ? 'CAN' : 'FEL';
    blueprintCode.textContent = `${specCode}-${state.stage.toUpperCase()}-W${state.weight}`;

    const activeProto = protocols[state.stage];
    timeEstimate.textContent = activeProto.time;
    freqEstimate.textContent = activeProto.freq;
    estimatePrice.textContent = activeProto.price;

    // 2. Render Checkpoints
    planItemList.innerHTML = activeProto.items
      .map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`)
      .join('');

    // 3. GSAP Micro-Motion Feedback
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        ['#blueprintCode', '#timeEstimate', '#freqEstimate', '#estimatePrice', '.plan-item-list li'],
        { opacity: 0.6, y: -4 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }

  // Event Listeners: Species
  speciesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speciesBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.species = btn.getAttribute('data-species');
      updateBlueprint();
    });
  });

  // Event Listeners: Life Stages
  stageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stageTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.stage = tab.getAttribute('data-stage');
      updateBlueprint();
    });
  });

  // Event Listeners: Weight Slider
  weightSlider.addEventListener('input', (e) => {
    state.weight = e.target.value;
    updateBlueprint();
  });

  // Event Listeners: Priority Tags
  priorityTags.forEach(tag => {
    tag.addEventListener('click', () => {
      priorityTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      state.priority = tag.getAttribute('data-tag');
      updateBlueprint();
    });
  });

  // GSAP Scroll Reveal for Section
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
          trigger: '#interactiveCare',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-motion-card',
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#interactiveCare',
          start: 'top 80%',
          once: true
        }
      }
    );
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initInteractiveBlueprint();
});









// ===================================================
// SURGICAL TELEMETRY SECTION & LIVE BACKGROUND PARTICLES
// ===================================================
function initSurgicalTelemetry() {
  if (typeof gsap === 'undefined') return;

  const teleSection = document.getElementById('surgicalSuites');
  if (!teleSection) return;

  // 1. Reveal Section Header
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-tele-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#surgicalSuites',
          start: 'top 85%',
          once: true
        }
      }
    );

    // 2. Staggered Surgical Pods Entrance
    gsap.fromTo(
      '.gsap-tele-card',
      { opacity: 0, y: 45, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.telemetry-pods-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 3. Continuous Organic Floating Particle Motion
  const particles = document.querySelectorAll('#telemetryParticles .particle');
  particles.forEach((p, i) => {
    gsap.to(p, {
      y: `-=${gsap.utils.random(40, 90)}`,
      x: `+=${gsap.utils.random(-30, 30)}`,
      opacity: gsap.utils.random(0.2, 0.7),
      duration: gsap.utils.random(4, 8),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.25
    });
  });

  // 4. Mouse Interactive Parallax Float (Only on Desktop > 768px)
  if (window.innerWidth > 768) {
    teleSection.addEventListener('mousemove', (e) => {
      const rect = teleSection.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to('#orb1', {
        x: relX * 65,
        y: relY * 65,
        duration: 1.2,
        ease: 'power1.out'
      });

      gsap.to('#orb2', {
        x: relX * -75,
        y: relY * -75,
        duration: 1.4,
        ease: 'power1.out'
      });
    });
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initSurgicalTelemetry();
});










// ===================================================
// BENTO GRID SECTION GSAP ENTRANCE TIMELINE
// ===================================================
function initBentoGrid() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const bentoSection = document.getElementById('bentoEcosystem');
  if (!bentoSection) return;

  // 1. Reveal Section Header
  gsap.fromTo(
    '.gsap-bento-header',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#bentoEcosystem',
        start: 'top 85%',
        once: true
      }
    }
  );

  // 2. Staggered Bento Cards Entrance
  gsap.fromTo(
    '.gsap-bento-item',
    { opacity: 0, y: 40, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 80%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initBentoGrid();
});









// ===================================================
// SERVICE CTA SECTION GSAP SCROLL ENTRANCE
// ===================================================
function initServiceCtaSection() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const ctaPod = document.querySelector('.gsap-srv-cta');
  if (!ctaPod) return;

  gsap.fromTo(
    ctaPod,
    { opacity: 0, y: 45, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#serviceCta',
        start: 'top 85%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initServiceCtaSection();
});