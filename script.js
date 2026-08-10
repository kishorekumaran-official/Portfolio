/* ==========================================================================
   KISHORE KUMARAN — PORTFOLIO INTERACTIVITY SCRIPT
   Voice Engine: Ultra-Deep, Bold, Professional Male Speech Synthesis
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 2. Sticky Navbar Background Shift
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mouse Tracking Ambient Glow (Desktop only)
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // 4. Project Filtering Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Bold & Deep Male Voice Synthesis Engine
  const btnReplays = document.querySelectorAll('.btnReplayIntro');
  const btnMutes = document.querySelectorAll('.btnMuteIntro');
  const aiAvatarCards = document.querySelectorAll('.ai-avatar-card');
  const muteTexts = document.querySelectorAll('.avatarMuteText');

  let isMuted = false;
  let isSpeaking = false;
  let availableVoices = [];

  const introSpeechText = "Hi, I'm Kishore Kumaran. I help businesses build AI-powered websites and modern digital experiences.";

  function populateVoices() {
    if ('speechSynthesis' in window) {
      availableVoices = window.speechSynthesis.getVoices();
    }
  }

  populateVoices();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }

  function getDeepMaleVoice() {
    if (!availableVoices || availableVoices.length === 0) {
      populateVoices();
    }

    // Explicit order: Microsoft David (Windows Deepest Male), Mark, George, Google Male, Daniel, Alex
    const maleVoiceNames = [
      'Microsoft David Desktop - English (United States)',
      'Microsoft David - English (United States)',
      'Microsoft Mark Desktop - English (United States)',
      'Microsoft Mark - English (United States)',
      'Microsoft George - English (United Kingdom)',
      'Google UK English Male',
      'Google US English Male',
      'Daniel',
      'Alex',
      'Rishi'
    ];

    for (const name of maleVoiceNames) {
      const match = availableVoices.find(v => v.name.includes(name) || v.name === name);
      if (match) return match;
    }

    // Search for any voice with "Male", "David", "Mark", "George", or "Guy" in name
    const genericMale = availableVoices.find(v => 
      /david|mark|george|james|male|guy|daniel|alex/i.test(v.name)
    );
    if (genericMale) return genericMale;

    // Fallback to any English voice
    return availableVoices.find(v => v.lang.startsWith('en')) || null;
  }

  function speakIntro() {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(introSpeechText);
    
    // DEEP MALE VOICE SPEECH SETTINGS
    utterance.rate = 0.88;   // Deliberate, fluent, confident pace
    utterance.pitch = 0.65;  // Deep, masculine tone (0.65 forces deep male timbre on all engines)
    utterance.volume = 1.0;

    const maleVoice = getDeepMaleVoice();
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.onstart = () => {
      isSpeaking = true;
      aiAvatarCards.forEach(c => c.classList.add('playing'));
    };

    utterance.onend = () => {
      isSpeaking = false;
      aiAvatarCards.forEach(c => c.classList.remove('playing'));
    };

    utterance.onerror = () => {
      isSpeaking = false;
      aiAvatarCards.forEach(c => c.classList.remove('playing'));
    };

    window.speechSynthesis.speak(utterance);
  }

  btnReplays.forEach(btn => {
    btn.addEventListener('click', () => {
      speakIntro();
    });
  });

  btnMutes.forEach(btn => {
    btn.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        window.speechSynthesis.cancel();
        aiAvatarCards.forEach(c => c.classList.remove('playing'));
        muteTexts.forEach(t => t.textContent = 'Unmute');
      } else {
        muteTexts.forEach(t => t.textContent = 'Mute');
        speakIntro();
      }
    });
  });

  let autoSpoken = false;
  const triggerAutoSpeech = () => {
    if (!autoSpoken) {
      autoSpoken = true;
      speakIntro();
      window.removeEventListener('click', triggerAutoSpeech);
    }
  };
  window.addEventListener('click', triggerAutoSpeech, { once: true });
});
