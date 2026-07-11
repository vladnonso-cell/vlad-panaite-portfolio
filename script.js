// Three.js Scene Setup
let scene, camera, renderer, particles = [];
let mouseX = 0, mouseY = 0;

function initThreeJS() {
  const canvas = document.getElementById('canvas-bg');
  const hero = document.getElementById('hero');

  if (!canvas || !hero) return;

  const width = hero.clientWidth;
  const height = hero.clientHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Create abstract 3D elements
  createAbstractElements();

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate and update particles
    particles.forEach((particle, i) => {
      particle.rotation.x += particle.velocityX;
      particle.rotation.y += particle.velocityY;
      particle.rotation.z += particle.velocityZ;

      // Mouse interaction: tilt towards mouse
      particle.position.x += (mouseX * 0.01 - particle.position.x) * 0.02;
      particle.position.y += (-mouseY * 0.01 - particle.position.y) * 0.02;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const newWidth = hero.clientWidth;
    const newHeight = hero.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

function createAbstractElements() {
  const colors = [0x00ffff, 0xffff00, 0xff00ff]; // cyan, yellow, magenta
  const geometries = [
    new THREE.IcosahedronGeometry(2, 4),
    new THREE.OctahedronGeometry(2.5),
    new THREE.TetrahedronGeometry(3),
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.DodecahedronGeometry(2),
  ];

  for (let i = 0; i < 5; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.8,
      wireframe: Math.random() > 0.5,
    });

    const particle = new THREE.Mesh(geometry, material);

    particle.position.x = (Math.random() - 0.5) * 100;
    particle.position.y = (Math.random() - 0.5) * 100;
    particle.position.z = (Math.random() - 0.5) * 50;

    particle.velocityX = (Math.random() - 0.5) * 0.02;
    particle.velocityY = (Math.random() - 0.5) * 0.02;
    particle.velocityZ = (Math.random() - 0.5) * 0.02;

    scene.add(particle);
    particles.push(particle);
  }

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00ffff, 1, 500);
  pointLight1.position.set(50, 50, 50);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff00ff, 1, 500);
  pointLight2.position.set(-50, -50, 50);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffff00, 0.5, 300);
  pointLight3.position.set(0, 0, 100);
  scene.add(pointLight3);
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

// Active nav highlighting
function setupActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      if ((currentPath.includes('index.html') || currentPath.endsWith('/') || currentPath.includes('vlad-panaite-portfolio')) && href === '#about') {
        link.classList.add('active');
      } else if (currentPath.includes(href.replace('.html', ''))) {
        link.classList.add('active');
      }
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  setupMobileMenu();
  setupActiveNav();
});
