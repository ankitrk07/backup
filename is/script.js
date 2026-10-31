/**
 * Romantic Love Webpage JavaScript
 * For Isha (Ishu) ❤️ from Kido
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initRelationshipCounter();
  initScrollReveal();
  initLoveLetters();
  initPhotoLightbox();
  initMusicPlayer();
  initForeverQuestion();
  initHeartShower();
  initClickHeartEffects();
});

/* ==================== 1. AMBIENT PARTICLES & HEARTS CANVAS ==================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 45);

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 3 + 1.5;
      this.speedY = Math.random() * 0.6 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.isHeart = Math.random() > 0.6;
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.pulse += 0.02;

      if (this.y < -30 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);

      if (this.isHeart) {
        drawMiniHeart(ctx, this.x, this.y, this.size * 1.6);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#F4A7B9';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(230, 57, 86, 0.6)';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawMiniHeart(ctx, x, y, size) {
    ctx.fillStyle = '#E63956';
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(230, 57, 86, 0.8)';
    ctx.beginPath();
    const d = size;
    ctx.moveTo(x, y + d / 4);
    ctx.quadraticCurveTo(x, y, x + d / 4, y);
    ctx.quadraticCurveTo(x + d / 2, y, x + d / 2, y + d / 4);
    ctx.quadraticCurveTo(x + d / 2, y, x + (d * 3) / 4, y);
    ctx.quadraticCurveTo(x + d, y, x + d, y + d / 4);
    ctx.quadraticCurveTo(x + d, y + d / 2, x + (d * 3) / 4, y + (d * 3) / 4);
    ctx.lineTo(x + d / 2, y + d);
    ctx.lineTo(x + d / 4, y + (d * 3) / 4);
    ctx.quadraticCurveTo(x, y + d / 2, x, y + d / 4);
    ctx.fill();
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==================== 2. LIVE RELATIONSHIP & ANNIVERSARY COUNTER ==================== */
function initRelationshipCounter() {
  // Official Start Date: 4 October 2024
  const startDate = new Date('2024-10-04T00:00:00');

  // 2-Year Milestone Anniversary: 4 October 2026
  const nextMilestoneDate = new Date('2026-10-04T00:00:00');

  const daysEl = document.getElementById('daysCount');
  const hoursEl = document.getElementById('hoursCount');
  const minutesEl = document.getElementById('minutesCount');
  const secondsEl = document.getElementById('secondsCount');
  const milestoneEl = document.getElementById('milestoneCountdown');

  function updateTimer() {
    const now = new Date();

    // 1. Time since started
    const diff = Math.max(0, now - startDate);
    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = days.toLocaleString();
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

    // 2. Countdown to 2-Year Anniversary
    if (milestoneEl) {
      const milestoneDiff = nextMilestoneDate - now;
      if (milestoneDiff > 0) {
        const mDays = Math.floor(milestoneDiff / (1000 * 60 * 60 * 24));
        const mHours = Math.floor((milestoneDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        milestoneEl.innerHTML = `✨ <strong>${mDays} days and ${mHours} hours</strong> until our 2nd Anniversary celebration on 4th October! ❤️`;
      } else {
        milestoneEl.innerHTML = `🎉 <strong>Happy 2nd Anniversary, my beloved Ishu! ❤️ Here's to eternity together!</strong>`;
      }
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==================== 3. SCROLL REVEAL OBSERVER ==================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==================== 4. LOVE LETTERS MODAL ==================== */
function initLoveLetters() {
  const lettersData = {
    letter1: {
      title: "When You Took Care of Me",
      date: "12 February Memory",
      content: `
        <p>My Dearest Ishu,</p>
        <p>I still remember that day on February 12th when I fell sick. In this world where everyone is busy, you went out of your way to check on me, ordering medicines and healthy diet food without a moment's hesitation.</p>
        <p>You didn't do it because you had to—you did it because your heart is full of genuine warmth and kindness. In that moment, seeing how much you cared for me, I knew in my soul that you are the most precious person I could ever have by my side.</p>
        <p>Thank you for your warmth, your tenderness, and for being my biggest comfort.</p>
        <div class="letter-sign">With all my love,<br>Kido</div>
      `
    },
    letter2: {
      title: "Banaras & Vrindavan With You",
      date: "Sacred Journeys",
      content: `
        <p>My Beautiful Ishu,</p>
        <p>Our trips together hold a special place in my soul. When we took our first trip to <strong>Banaras in March 2025</strong>, sitting near the holy ghats as bells chimed and lights floated on the river, having you beside me made the moment heavenly.</p>
        <p>And visiting <strong>Vrindavan during Janmashtami in 2025</strong> and then returning again in <strong>June 2026</strong>—walking those sacred streets with you, seeking blessings for our bond, I realized that my prayers were already answered the day you walked into my life.</p>
        <p>I cannot wait to travel the entire world with you, hand in hand.</p>
        <div class="letter-sign">Forever Yours,<br>Kido</div>
      `
    },
    letter3: {
      title: "Kido's Eternal Promise to Ishu",
      date: "Our Sacred Vow",
      content: `
        <p>My Beloved Ishu,</p>
        <p>I promise to stand by your side through every season of life—the bright sunny days and the stormy nights.</p>
        <p>I promise to always listen when you need to be heard, to hold your hand when the road gets difficult, and to celebrate every single little smile and achievement with you.</p>
        <p>I cannot promise that life will always be simple, but I promise that you will never have to face anything alone. I will love you, cherish you, and respect you every single day.</p>
        <p><em>"If I ever get the chance to choose you again, in another life, another world, or another story... I would still choose you. Every single time."</em></p>
        <div class="letter-sign">Forever & Always,<br>Kido ❤️</div>
      `
    }
  };

  const modal = document.getElementById('letterModal');
  const letterContent = document.getElementById('letterContent');
  const closeBtn = document.getElementById('letterCloseBtn');
  const backdrop = document.getElementById('letterModalBackdrop');

  document.querySelectorAll('.envelope-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-letter-id');
      const letter = lettersData[id];
      if (letter && modal && letterContent) {
        letterContent.innerHTML = `
          <h3>${letter.title}</h3>
          <span style="color: #9C415C; font-size: 0.9rem; font-style: italic;">${letter.date}</span>
          ${letter.content}
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==================== 5. PHOTO LIGHTBOX WITH SLIDESHOW ==================== */
function initPhotoLightbox() {
  const modal = document.getElementById('imageLightbox');
  const imgEl = document.getElementById('lightboxImg');
  const capEl = document.getElementById('lightboxCaption');
  const counterEl = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  const cards = Array.from(document.querySelectorAll('.polaroid-card'));
  const heroAvatar = document.querySelector('.hero-avatar-ring');
  let currentIndex = 0;

  const galleryData = cards.map((card, idx) => {
    const img = card.querySelector('.gallery-img');
    const cap = card.querySelector('.polaroid-caption');
    return {
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : 'Romantic Photo',
      caption: cap ? cap.textContent.trim() : ''
    };
  });

  function showImage(index) {
    if (!modal || !imgEl || galleryData.length === 0) return;
    if (index < 0) index = galleryData.length - 1;
    if (index >= galleryData.length) index = 0;
    currentIndex = index;

    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.95)';

    setTimeout(() => {
      imgEl.src = galleryData[currentIndex].src;
      imgEl.alt = galleryData[currentIndex].alt;
      if (capEl) capEl.textContent = galleryData[currentIndex].caption;
      if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${galleryData.length}`;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 150);
  }

  function openLightbox(index = 0) {
    if (!modal) return;
    showImage(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Card click triggers
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
  });

  // Hero avatar click trigger
  if (heroAvatar) {
    heroAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(0);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  modal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        showImage(currentIndex - 1); // Swipe Right -> Prev
      } else {
        showImage(currentIndex + 1); // Swipe Left -> Next
      }
    }
  }, { passive: true });
}

/* ==================== 6. ROMANTIC MUSIC PLAYER & AMBIENT AUDIO ==================== */
function initMusicPlayer() {
  const musicWidget = document.getElementById('musicPlayer');
  const discBtn = document.getElementById('musicDiscBtn');
  const audio = document.getElementById('bgAudio');
  const musicStatus = document.getElementById('musicStatus');
  const beginStoryBtn = document.getElementById('beginStoryBtn');

  let isPlaying = false;
  let synthAudioCtx = null;
  let synthInterval = null;

  // Fallback Procedural Romantic Ambient Chime Synthesizer
  function startRomanticSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!synthAudioCtx) {
        synthAudioCtx = new AudioContext();
      }
      if (synthAudioCtx.state === 'suspended') {
        synthAudioCtx.resume();
      }

      const notes = [261.63, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

      function playChime(freq, duration = 3.5, delay = 0) {
        setTimeout(() => {
          if (!isPlaying || !synthAudioCtx) return;
          const osc = synthAudioCtx.createOscillator();
          const gain = synthAudioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime);

          gain.gain.setValueAtTime(0.001, synthAudioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, synthAudioCtx.currentTime + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioCtx.currentTime + duration);

          osc.connect(gain);
          gain.connect(synthAudioCtx.destination);

          osc.start();
          osc.stop(synthAudioCtx.currentTime + duration);
        }, delay * 1000);
      }

      function playProgression() {
        const chordPatterns = [
          [261.63, 329.63, 392.00, 523.25],
          [220.00, 261.63, 329.63, 440.00],
          [174.61, 220.00, 261.63, 349.23],
          [196.00, 246.94, 293.66, 392.00]
        ];

        chordPatterns.forEach((chord, i) => {
          chord.forEach((note, j) => {
            playChime(note, 4.0, i * 3.2 + j * 0.4);
          });
        });
      }

      playProgression();
      synthInterval = setInterval(() => {
        if (isPlaying) playProgression();
      }, 13000);
    } catch (e) {
      console.log('Audio notice:', e);
    }
  }

  function stopRomanticSynth() {
    if (synthInterval) clearInterval(synthInterval);
    if (synthAudioCtx && synthAudioCtx.state === 'running') {
      synthAudioCtx.suspend();
    }
  }

  function playMusic() {
    if (isPlaying) return;
    if (audio) {
      audio.volume = 0.75;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying = true;
            updateUI(true);
          })
          .catch(() => {
            isPlaying = true;
            startRomanticSynth();
            updateUI(true);
          });
      }
    } else {
      isPlaying = true;
      startRomanticSynth();
      updateUI(true);
    }
  }

  function pauseMusic() {
    if (!isPlaying) return;
    if (audio) audio.pause();
    stopRomanticSynth();
    isPlaying = false;
    updateUI(false);
  }

  function togglePlay() {
    if (!isPlaying) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  function updateUI(playing) {
    if (playing) {
      musicWidget?.classList.add('music-playing');
      if (musicStatus) musicStatus.textContent = 'Titli Playing For Ishu 🎶';
    } else {
      musicWidget?.classList.remove('music-playing');
      if (musicStatus) musicStatus.textContent = 'Tap to Play 🎵';
    }
  }

  if (discBtn) {
    discBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  // Gentle First Interaction Autoplay (Starts Titli upon first romantic gesture)
  function handleFirstGesture() {
    if (!isPlaying) {
      playMusic();
    }
    window.removeEventListener('click', handleFirstGesture);
    window.removeEventListener('touchstart', handleFirstGesture);
  }

  window.addEventListener('click', handleFirstGesture, { once: true });
  window.addEventListener('touchstart', handleFirstGesture, { once: true });

  if (beginStoryBtn) {
    beginStoryBtn.addEventListener('click', () => {
      playMusic();
    });
  }
}

/* ==================== 7. SPECIAL FOREVER QUESTION (YES/NO) ==================== */
function initForeverQuestion() {
  const yesBtn = document.getElementById('btnQuestionYes');
  const noBtn = document.getElementById('btnQuestionNo');
  const btnGroup = document.getElementById('questionBtnGroup');
  const successBox = document.getElementById('questionSuccessBox');

  const playfulPhrases = [
    "No 🙈",
    "Are you sure? 🥺",
    "Think again! 😜",
    "You can't say no to Kido! ❤️",
    "Please say Yes! 🌹",
    "Okay, tap Yes now! 🥰"
  ];
  let noClickCount = 0;

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      if (btnGroup) {
        btnGroup.style.opacity = '0';
        setTimeout(() => {
          btnGroup.style.display = 'none';
          if (successBox) {
            successBox.style.display = 'block';
            successBox.classList.add('reveal-pop');
          }
        }, 300);
      }

      // Grand romantic continuous heart & rose shower
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      createHeartExplosion(centerX, centerY, 40);
      setTimeout(() => createHeartExplosion(centerX - 100, centerY - 60, 25), 300);
      setTimeout(() => createHeartExplosion(centerX + 100, centerY - 60, 25), 600);
      setTimeout(() => createHeartExplosion(centerX, centerY - 120, 35), 900);
    });
  }

  if (noBtn) {
    // Playful dodging on hover & click
    function handleNoPlayful(e) {
      e.preventDefault();
      noClickCount++;
      const phraseIndex = noClickCount % playfulPhrases.length;
      noBtn.querySelector('span').textContent = playfulPhrases[phraseIndex];

      // Playful gentle translate
      const randomX = (Math.random() - 0.5) * 60;
      const randomY = (Math.random() - 0.5) * 30;
      noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.92)`;
      
      // Make the YES button grow bigger & more glowing with each attempt!
      if (yesBtn) {
        const currentScale = 1 + Math.min(noClickCount * 0.08, 0.4);
        yesBtn.style.transform = `scale(${currentScale})`;
      }
    }

    noBtn.addEventListener('mouseenter', handleNoPlayful);
    noBtn.addEventListener('click', handleNoPlayful);
    noBtn.addEventListener('touchstart', handleNoPlayful, { passive: false });
  }
}

/* ==================== 8. INTERACTIVE HEART SHOWER ==================== */
function initHeartShower() {
  const btn = document.getElementById('heartShowerBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    createHeartExplosion(window.innerWidth / 2, window.innerHeight / 2, 35);
  });
}

function initClickHeartEffects() {
  window.addEventListener('click', (e) => {
    // Avoid double firing on buttons/cards
    if (e.target.closest('button') || e.target.closest('.envelope-card') || e.target.closest('.polaroid-card')) {
      return;
    }
    createHeartExplosion(e.clientX, e.clientY, 8);
  });
}

function createHeartExplosion(x, y, count = 12) {
  const hearts = ['❤️', '💖', '🌹', '✨', '💕', '🥰', '💍'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${Math.random() * 1.5 + 1.1}rem`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transition = 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.opacity = '1';
    el.style.transform = 'translate(-50%, -50%) scale(0.5)';

    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 50;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 80;

    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(${Math.random() * 0.8 + 0.8}) rotate(${Math.random() * 90 - 45}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      el.remove();
    }, 1500);
  }
}
