/**
 * Pastel Magic Particles & Ambient Music Manager
 * For Khushi's Birthday Surprise 💜
 */

(function () {
  // 1. Spawning Ambient Floating Pastel Elements (Butterflies, Petals, Hearts, Sparkles)
  function initAmbientElements() {
    let container = document.querySelector('.ambient-decorations');
    if (!container) {
      container = document.createElement('div');
      container.className = 'ambient-decorations';
      document.body.appendChild(container);
    }

    const items = ['🌸', '🦋', '💜', '✨', '🎀', '☁️', '🌷', '💫'];
    const count = window.innerWidth < 768 ? 14 : 24;

    for (let i = 0; i < count; i++) {
      createAmbientItem(container, items, i);
    }
  }

  function createAmbientItem(container, items, index) {
    const item = document.createElement('div');
    item.className = 'ambient-item';
    item.textContent = items[Math.floor(Math.random() * items.length)];

    const startLeft = Math.random() * 96;
    const duration = 10 + Math.random() * 12;
    const delay = Math.random() * 10;
    const size = 16 + Math.random() * 18;

    item.style.left = `${startLeft}vw`;
    item.style.fontSize = `${size}px`;
    item.style.animationDuration = `${duration}s`;
    item.style.animationDelay = `${delay}s`;

    container.appendChild(item);
  }

  // 2. Audio State Persistence Across Pages
  function initSharedAudio() {
    const audio = document.getElementById('birthday-song') || document.getElementById('background-music');
    const audioBtn = document.getElementById('shared-audio-btn') || document.getElementById('play-pause') || document.getElementById('music-toggle');

    if (!audio || !audioBtn) return;

    // Check if user previously enabled music in this session
    const wasPlaying = sessionStorage.getItem('khushi_music_playing') === 'true';

    function updateBtnState(isPlaying) {
      if (isPlaying) {
        audioBtn.innerHTML = '⏸️';
        sessionStorage.setItem('khushi_music_playing', 'true');
      } else {
        audioBtn.innerHTML = '▶️';
        sessionStorage.setItem('khushi_music_playing', 'false');
      }
    }

    if (wasPlaying) {
      audio.play().then(() => {
        updateBtnState(true);
      }).catch(() => {
        // Autoplay blocked without user gesture
        updateBtnState(false);
      });
    }

    audioBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().then(() => {
          updateBtnState(true);
        }).catch(err => console.log('Audio playback prevented:', err));
      } else {
        audio.pause();
        updateBtnState(false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initAmbientElements();
    initSharedAudio();
  });
})();
