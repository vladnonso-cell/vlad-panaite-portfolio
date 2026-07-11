// Spectrogram-style animated canvas
function initSpectrogramCanvas() {
  const canvas = document.getElementById('canvas-bg');
  const hero = document.getElementById('hero');

  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  const width = hero.clientWidth;
  const height = hero.clientHeight;

  canvas.width = width;
  canvas.height = height;

  let time = 0;
  const numBars = 60;
  const colors = [
    '#7c3aed', // violet
    '#0369a1', // sky blue
    '#00d9ff', // cyan
    '#10b981', // emerald
  ];

  function drawSpectrogram() {
    // Clear with semi-transparent white
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, width, height);

    // Draw animated frequency bars
    const barWidth = width / numBars;

    for (let i = 0; i < numBars; i++) {
      // Create wave-like motion
      const frequency = Math.sin(time * 0.005 + (i / numBars) * Math.PI * 2) * 0.5 + 0.5;
      const amplitude = Math.sin(time * 0.003 + (i / numBars) * Math.PI) * 0.3 + 0.7;

      // Vary height based on frequency
      const barHeight = (frequency * amplitude) * height * 0.6;

      // Color based on frequency
      const colorIndex = Math.floor((frequency * (colors.length - 1)));
      ctx.fillStyle = colors[colorIndex];

      // Opacity varies with motion
      ctx.globalAlpha = frequency * 0.6 + 0.2;

      // Draw bar from center outward
      const centerY = height / 2;
      ctx.fillRect(i * barWidth, centerY - barHeight / 2, barWidth - 2, barHeight);
    }

    ctx.globalAlpha = 1;

    // Draw subtle waveform lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;

    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const wave = Math.sin((x + time * 0.1) * 0.01 + y * 0.003) * 20;
        const yPos = y + wave;
        if (x === 0) ctx.moveTo(x, yPos);
        else ctx.lineTo(x, yPos);
      }
      ctx.stroke();
    }

    time++;
    requestAnimationFrame(drawSpectrogram);
  }

  drawSpectrogram();

  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  });
}

// Mobile menu
function setupMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  if (!menuBtn) return;

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    menuBtn.textContent = nav.classList.contains('mobile-open') ? '✕' : '☰';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
      nav.classList.remove('mobile-open');
      menuBtn.textContent = '☰';
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-open');
      menuBtn.textContent = '☰';
    });
  });
}

// Smooth scroll and active nav
function setupNav() {
  const navLinks = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('.html', ''))) {
      link.style.opacity = '0.5';
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initSpectrogramCanvas();
  setupMobileMenu();
  setupNav();
});
