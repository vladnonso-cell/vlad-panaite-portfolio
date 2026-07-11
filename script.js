// Wave oscilloscope effect
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetMouseX = mouseX;
let targetMouseY = mouseY;

let time = 0;
const waveData = new Array(300).fill(0);

// Smooth mouse tracking
document.addEventListener('mousemove', (e) => {
  targetMouseX = e.clientX;
  targetMouseY = e.clientY;
});

// Initialize wave data
function initWaveData() {
  for (let i = 0; i < waveData.length; i++) {
    waveData[i] = Math.sin((i / waveData.length) * Math.PI * 4) * 30;
  }
}

function drawWave() {
  // Smooth mouse following
  mouseX += (targetMouseX - mouseX) * 0.1;
  mouseY += (targetMouseY - mouseY) * 0.1;

  // Clear canvas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update wave data based on mouse
  const influence = (canvas.width / 2 - Math.abs(mouseX - canvas.width / 2)) / (canvas.width / 2);
  const verticalInfluence = Math.max(0, 1 - Math.abs(mouseY - canvas.height / 2) / (canvas.height / 2));

  for (let i = 0; i < waveData.length; i++) {
    const baseWave = Math.sin((i / waveData.length) * Math.PI * 4 + time * 0.05) * 40;
    const mouseInfluence = Math.sin(time * 0.1 + i * 0.1) * influence * verticalInfluence * 80;
    waveData[i] = baseWave + mouseInfluence;
  }

  // Draw multiple waves with different phases
  const waves = [
    { offset: 0, color: 'rgba(0, 102, 255, 0.6)', y: canvas.height / 2 - 80 },
    { offset: Math.PI / 2, color: 'rgba(0, 102, 255, 0.4)', y: canvas.height / 2 },
    { offset: Math.PI, color: 'rgba(0, 102, 255, 0.2)', y: canvas.height / 2 + 80 }
  ];

  waves.forEach(wave => {
    ctx.strokeStyle = wave.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < waveData.length; i++) {
      const x = (i / waveData.length) * canvas.width;
      const y = wave.y + Math.sin(time * 0.05 + i * 0.05 + wave.offset) * 50 +
                waveData[i] * verticalInfluence;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  });

  // Draw center line
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  time++;
  requestAnimationFrame(drawWave);
}

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Tooltip interactions
function setupTooltips() {
  const zones = document.querySelectorAll('.zone');
  const tooltip = document.getElementById('tooltip');
  const tooltipText = document.querySelector('.tooltip-text');

  zones.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
      const info = zone.dataset.info;
      tooltipText.textContent = info;
      tooltip.classList.add('active');
    });

    zone.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.clientX + 20) + 'px';
      tooltip.style.top = (e.clientY + 20) + 'px';
    });

    zone.addEventListener('mouseleave', () => {
      tooltip.classList.remove('active');
    });
  });
}

// Navigation
function setupNavigation() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      // TODO: Navigate to sections
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initWaveData();
  drawWave();
  setupTooltips();
  setupNavigation();
});
