// ===================================================
// CONTACT PAGE HERO TIMELINE & CONSTELLATION ENGINE
// ===================================================
function initContactHeroSection() {
  const contactHero = document.getElementById('contactHero');
  if (!contactHero || typeof gsap === 'undefined') return;

  const contactTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Text & Triage Sequence
  contactTl
    .fromTo(
      '.gsap-contact-hero',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12 }
    )
    // 2. Right Dispatch Card pop-in
    .fromTo(
      '.hospital-dispatch-card',
      { scale: 0.94, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' },
      '-=0.5'
    );

  // 3. Gentle Organic Drift on Constellation Points
  const dots = document.querySelectorAll('#contactConstellation .c-dot');
  dots.forEach((dot, i) => {
    gsap.to(dot, {
      y: `-=${gsap.utils.random(25, 60)}`,
      x: `+=${gsap.utils.random(-25, 25)}`,
      opacity: gsap.utils.random(0.3, 0.7),
      duration: gsap.utils.random(4, 7),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.2
    });
  });

  // 4. Subtle Parallax for Ambient Glows
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.to('.orb-teal', {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#contactHero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.orb-amber', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#contactHero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initContactHeroSection();
});









// ===================================================
// INTAKE CONCIERGE MULTI-STEP ENGINE & LIVE SUMMARY
// ===================================================
function initIntakeConcierge() {
  const form = document.getElementById('clinicalIntakeForm');
  if (!form) return;

  // 1. Companion Card Selector
  const compCards = document.querySelectorAll('.companion-card');
  const sumCompanion = document.getElementById('sumCompanion');
  compCards.forEach(card => {
    card.addEventListener('click', () => {
      compCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const species = card.querySelector('input').value;
      if (sumCompanion) {
        sumCompanion.textContent = 
          species === 'canine' ? 'Canine (Heated Foam Suite)' :
          species === 'feline' ? 'Feline (Acoustic Haven)' : 'Exotic / Avian Wing';
      }
    });
  });

  // 2. Discipline Tier Selector & Dynamic Summary Sync
  const discCards = document.querySelectorAll('.discipline-card');
  const sumHeadline = document.getElementById('sumHeadline');
  const sumTypeTag = document.getElementById('sumTypeTag');
  const sumDuration = document.getElementById('sumDuration');
  const sumDoctor = document.getElementById('sumDoctor');

  const disciplineData = {
    wellness: {
      tag: 'Routine Physical',
      headline: 'Comprehensive Physical Exam',
      duration: '45 Minutes Unhurried',
      doctor: 'Faculty General Clinician'
    },
    surgery: {
      tag: 'Surgical Consult',
      headline: 'Surgical & Orthopedic Review',
      duration: '60 Minutes Deep-Dive',
      doctor: 'Dr. Amanda Vance, DACVS'
    },
    cardio: {
      tag: 'Cardiology Unit',
      headline: '4D Echocardiogram & Murmur',
      duration: '50 Minutes Non-Invasive',
      doctor: 'Dr. Marcus Thorne, DACVIM'
    },
    urgent: {
      tag: 'Acute Triage',
      headline: 'Priority Same-Day Triage',
      duration: 'Immediate Bedside',
      doctor: 'Attending Emergency Resident'
    }
  };

  discCards.forEach(card => {
    card.addEventListener('click', () => {
      discCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const val = card.querySelector('input').value;
      const data = disciplineData[val];
      if (data && sumHeadline) {
        sumTypeTag.textContent = data.tag;
        sumHeadline.textContent = data.headline;
        sumDuration.textContent = data.duration;
        sumDoctor.textContent = data.doctor;
      }
    });
  });

  // 3. Amenity Chip Toggle Behavior
  const amenityChips = document.querySelectorAll('.amenity-check-chip');
  amenityChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const input = chip.querySelector('input');
      chip.classList.toggle('active', input.checked);
    });
  });

  // 4. Default Date to Tomorrow
  const dateInput = document.getElementById('bookingDateInput');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // 5. Entrance Reveal with GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-intake-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#bookingConcierge',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-intake-card',
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.intake-console-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }
}

// Global Step Switcher Function for HTML onclick
window.navigateIntakeStep = function(stepNumber) {
  const panes = document.querySelectorAll('.intake-step-pane');
  const indicators = document.querySelectorAll('.intake-steps-bar .step-indicator');
  const targetPane = document.getElementById(`intakeStep${stepNumber}`);

  if (!targetPane) return;

  panes.forEach(pane => {
    pane.classList.remove('active');
    pane.style.display = 'none';
  });

  targetPane.style.display = 'block';
  setTimeout(() => targetPane.classList.add('active'), 20);

  indicators.forEach(ind => {
    const num = parseInt(ind.getAttribute('data-step'), 10);
    ind.classList.toggle('active', num <= stepNumber);
  });
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initIntakeConcierge();
});









// ===================================================
// CAMPUS WAYFINDING & EMERGENCY TRANSIT ROUTE ENGINE
// ===================================================
function initCampusTransitWayfinding() {
  const routeButtons = document.querySelectorAll('#arrivalRouteStack .route-select-card');
  
  // Deck Target DOM Elements
  const deckRouteCode = document.getElementById('deckRouteCode');
  const deckStatusBadge = document.getElementById('deckStatusBadge');
  const deckStepTag = document.getElementById('deckStepTag');
  const deckTitle = document.getElementById('deckTitle');
  const deckText = document.getElementById('deckText');
  const deckCheckpoints = document.getElementById('deckCheckpoints');

  if (!routeButtons.length || !deckTitle) return;

  // Wayfinding dataset
  const routeCatalog = {
    emergency: {
      code: 'GATE_01 // NORTH TRAUMA',
      badgeHtml: '<i class="fa-solid fa-circle-check"></i> IMMEDIATE ADMISSION',
      stepTag: 'CRITICAL ARRIVAL PROTOCOL',
      title: 'Proceed To North Ambulance Bay (Bay 01)',
      text: 'Enter through Medical Center Boulevard. Follow red illuminated perimeter pavement markers directly to the overhead heated ambulance port. An emergency triage technician will receive the patient at your vehicle.',
      checkpoints: [
        'Follow Red Reflective Pavement Markings',
        'Zero Barrier Automated License Scanner',
        'Emergency Nurse Dispatch Button At Gate'
      ]
    },
    feline: {
      code: 'GATE_02 // WEST CAT HAVEN',
      badgeHtml: '<i class="fa-solid fa-shield-cat"></i> ACOUSTIC ISOLATION',
      stepTag: 'FEAR-FREE FELINE PROTOCOL',
      title: 'Direct West Corridor & Feline Parking Bay',
      text: 'Take West Medical Drive directly to Dedicated Cat Bays 12–18. This route guarantees zero canine barking and leads directly through a private pheromone-diffused entrance without passing the main lobby.',
      checkpoints: [
        'Private Feline-Only Covered Parking Spaces',
        'Direct RFID Keycard Concierge Entrance',
        'Continuous Feliway Pheromone Diffused Airway'
      ]
    },
    outpatient: {
      code: 'GATE_03 // SOUTH PLAZA',
      badgeHtml: '<i class="fa-solid fa-square-parking"></i> 42 STALLS FREE',
      stepTag: 'OUTPATIENT & WELLNESS VISITS',
      title: 'South Concourse & Covered Validation Garage',
      text: 'Turn into South Plaza Concourse. Park on Level 1 (Stalls 20–60). Take the ground floor barrier-free elevator directly to our main wellness reception lobby where your pre-assigned room awaits.',
      checkpoints: [
        'Complimentary 3-Hour Ticket Validation',
        'Electric Vehicle Level-2 Fast Chargers Available',
        'Full ADA Roll-In Ramps & Companion Dog Turf'
      ]
    }
  };

  // Route selector click handler
  routeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const routeKey = btn.getAttribute('data-route');
      const data = routeCatalog[routeKey];

      if (!data || btn.classList.contains('active')) return;

      // Update Active Classes
      routeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update text values
      deckRouteCode.textContent = data.code;
      deckStatusBadge.innerHTML = data.badgeHtml;
      deckStepTag.textContent = data.stepTag;
      deckTitle.textContent = data.title;
      deckText.textContent = data.text;

      // Rebuild Checkpoints HTML
      deckCheckpoints.innerHTML = data.checkpoints.map(pt => `
        <div class="checkpoint-item">
          <i class="fa-solid fa-circle-dot"></i>
          <span>${pt}</span>
        </div>
      `).join('');

      // GSAP Micro-Bump on Wayfinding Deck
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(
          ['#deckTitle', '#deckText', '.deck-checkpoints-list'],
          { opacity: 0.5, y: -4 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
        );
      }
    });
  });

  // Entrance Reveal via GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-transit-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#campusTransit',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-transit-card',
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.transit-console-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initCampusTransitWayfinding();
});








// ===================================================
// EMERGENCY TRIAGE HERO SHOWCASE GSAP ENGINE
// ===================================================
function initTriageHeroShowcase() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const pod = document.querySelector('.gsap-triage-hero');
  if (!pod) return;

  // Staggered Pod Reveal
  gsap.fromTo(
    pod,
    { opacity: 0, y: 45, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#triageDispatch',
        start: 'top 85%',
        once: true
      }
    }
  );

  // Parallax on Backdrop Image
  gsap.to('.triage-backdrop-img', {
    y: 40,
    ease: 'none',
    scrollTrigger: {
      trigger: '#triageDispatch',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initTriageHeroShowcase();
});









// ===================================================
// PRE-ARRIVAL CLINICAL CHECKLIST & PREPARATION ENGINE
// ===================================================
function initVisitPreparation() {
  const modeButtons = document.querySelectorAll('#prepModeStack .prep-mode-btn');
  const checklistContainer = document.getElementById('prepChecklistContainer');
  
  // Header Elements
  const deckCategory = document.getElementById('deckCategory');
  const deckMainHead = document.getElementById('deckMainHead');
  const deckTimerChip = document.getElementById('deckTimerChip');
  const deckSummaryText = document.getElementById('deckSummaryText');
  const deckAdvisoryText = document.getElementById('deckAdvisoryText');
  
  // Progress Elements
  const progressText = document.getElementById('prepProgressText');
  const progressFill = document.getElementById('prepProgressFill');

  if (!modeButtons.length || !checklistContainer) return;

  // Dataset of Checklist Configurations
  const checklistCatalog = {
    surgery: {
      category: 'SURGICAL PRE-OP GUIDELINE',
      headline: 'Pre-Anesthetic Fasting & Admission Protocol',
      timer: '<i class="fa-solid fa-clock"></i> 8:00 AM INTAKE',
      summary: 'Proper pre-operative fasting prevents aspiration during anesthesia while keeping blood sugar stable. Please adhere strictly to the following parameters prior to dropping off your patient.',
      advisory: 'If your pet accidentally ate breakfast, call our surgical coordinator immediately.',
      items: [
        { title: 'Withhold Food by Midnight', desc: 'No dry or wet food after 12:00 AM the night before surgery. Water is completely safe until intake.' },
        { title: 'Morning Medication Verification', desc: 'Administer only pre-authorized cardiac or seizure medications with a single teaspoon of water.' },
        { title: 'Leash or Secure Carrier Arrival', desc: 'All canine surgical arrivals must be on a standard non-retractable leash; cats in secure carriers.' },
        { title: 'Pre-Op Digital Consent Review', desc: 'Review electronic surgical and anesthesia authorization forms sent to your mobile portal.' }
      ]
    },
    feline: {
      category: 'FEAR-FREE FELINE TRAVEL',
      headline: 'Carrier Acclimation & Transit Relaxation Guide',
      timer: '<i class="fa-solid fa-shield-cat"></i> LOW-STRESS SETUP',
      summary: 'Most feline stress occurs before even arriving at the hospital. Preparing the carrier with calming pheromones ensures an easy transition into our quiet feline sanctuary.',
      advisory: 'Need a pheromone wipe? Request one at reception upon vehicle arrival.',
      items: [
        { title: 'Spray Carrier 30 Mins in Advance', desc: 'Apply 2-3 sprays of Feliway classic pheromone to carrier bedding at least 30 minutes before departure.' },
        { title: 'Cover Carrier with Light Towel', desc: 'Visual shielding prevents sensory overload from passing vehicles and outdoor movements.' },
        { title: 'Level Placement on Car Floor', desc: 'Position carrier on the floorboard behind the front seat rather than on a tilted seat cushion.' },
        { title: 'Skip the Heavy Meal Before Transit', desc: 'Offering a light snack instead of a full bowl reduces car sickness and nausea on the road.' }
      ]
    },
    diagnostics: {
      category: 'PATHOLOGY & LAB PREPARATION',
      headline: 'Diagnostic Bloodwork & Ultrasound Readiness',
      timer: '<i class="fa-solid fa-microscope"></i> FASTED SAMPLES',
      summary: 'Accurate biochemical and echocardiographic results depend on clean sample baselines and non-distended stomach margins. Follow these simple steps for precise metrics.',
      advisory: 'If taking a routine wellness blood draw, a standard 4-hour fast is sufficient.',
      items: [
        { title: '8-Hour Food Fast for Abdominal Ultrasounds', desc: 'An empty stomach allows clear acoustic visualization of the pancreas, gallbladder, and liver.' },
        { title: 'Full Bladder for Cystocentesis Samples', desc: 'Prevent dogs from urinating in the parking lot 30 minutes prior to scheduled ultrasound appointments.' },
        { title: 'Bring Previous Prescription Bottles', desc: 'Bring original pharmaceutical containers so clinicians can record exact active dosages.' },
        { title: 'Prepare Symptom Timestamp Logs', desc: 'Note down frequency, timing, and video clips of intermittent coughing or limping episodes.' }
      ]
    }
  };

  // State
  let currentMode = 'surgery';
  let completedItems = new Set();

  // Progress Bar Recalculator
  function updateProgress(totalCount) {
    const completedCount = completedItems.size;
    const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    
    if (progressText) progressText.textContent = `${completedCount} OF ${totalCount} READY`;
    if (progressFill) progressFill.style.width = `${percentage}%`;
  }

  // Render Checklist
  function renderChecklist(modeKey) {
    const data = checklistCatalog[modeKey];
    if (!data) return;

    deckCategory.textContent = data.category;
    deckMainHead.textContent = data.headline;
    deckTimerChip.innerHTML = data.timer;
    deckSummaryText.textContent = data.summary;
    deckAdvisoryText.textContent = data.advisory;

    // Reset Completed State
    completedItems.clear();

    checklistContainer.innerHTML = data.items.map((item, idx) => `
      <div class="check-item-card" data-index="${idx}">
        <div class="custom-checkbox">
          <i class="fa-solid fa-check"></i>
        </div>
        <div class="check-item-body">
          <strong class="check-title">${item.title}</strong>
          <p class="check-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');

    updateProgress(data.items.length);

    // Attach Toggle Listeners
    const cards = checklistContainer.querySelectorAll('.check-item-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = card.getAttribute('data-index');
        card.classList.toggle('completed');
        
        if (card.classList.contains('completed')) {
          completedItems.add(idx);
        } else {
          completedItems.delete(idx);
        }

        updateProgress(data.items.length);
      });
    });

    // GSAP Micro Animation
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        ['#deckMainHead', '#deckSummaryText', '.check-item-card'],
        { opacity: 0.6, y: -4 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }

  // Mode Selection Listeners
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode === currentMode) return;

      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = mode;

      renderChecklist(currentMode);
    });
  });

  // Entrance Reveal via GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(
      '.gsap-prep-header',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#visitPreparation',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.gsap-prep-card',
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.prep-console-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // Initialize Default
  renderChecklist('surgery');
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initVisitPreparation();
});








// ===================================================
// FINAL CONTACT CTA GSAP SCROLL ENTRANCE
// ===================================================
function initFinalContactCta() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const ctaPod = document.querySelector('.gsap-final-cta');
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
        trigger: '#contactFinalCta',
        start: 'top 85%',
        once: true
      }
    }
  );
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initFinalContactCta();
});