// Three.js Scene Setup
let scene, camera, renderer, particles = [];
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

function initThreeJS() {
  const canvas = document.getElementById('canvas-bg');
  const hero = document.getElementById('hero');

  if (!canvas || !hero) return;

  const width = hero.clientWidth;
  const height = hero.clientHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 60;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  createAbstractElements();

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse following
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    particles.forEach((particle) => {
      particle.rotation.x += particle.velocityX;
      particle.rotation.y += particle.velocityY;
      particle.rotation.z += particle.velocityZ;

      // Mouse interaction: particles follow mouse with lag
      particle.position.x += (mouseX * 0.03 - particle.position.x) * 0.03;
      particle.position.y += (-mouseY * 0.03 - particle.position.y) * 0.03;
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
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });
}

function createAbstractElements() {
  const colors = [0x00ffff, 0xffff00, 0xff00ff, 0x00ff7f, 0xb000ff];
  const geometries = [
    new THREE.IcosahedronGeometry(3, 5),
    new THREE.OctahedronGeometry(3),
    new THREE.TetrahedronGeometry(3.5),
    new THREE.BoxGeometry(3.5, 3.5, 3.5),
    new THREE.DodecahedronGeometry(2.5),
  ];

  for (let i = 0; i < 7; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.6,
      shininess: 100,
      wireframe: Math.random() > 0.4,
    });

    const particle = new THREE.Mesh(geometry, material);

    particle.position.x = (Math.random() - 0.5) * 120;
    particle.position.y = (Math.random() - 0.5) * 120;
    particle.position.z = (Math.random() - 0.5) * 60;

    particle.velocityX = (Math.random() - 0.5) * 0.015;
    particle.velocityY = (Math.random() - 0.5) * 0.015;
    particle.velocityZ = (Math.random() - 0.5) * 0.015;

    scene.add(particle);
    particles.push(particle);
  }

  // Enhanced lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00ffff, 1.2, 800);
  pointLight1.position.set(100, 100, 80);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff00ff, 1, 800);
  pointLight2.position.set(-100, -100, 80);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffff00, 0.8, 600);
  pointLight3.position.set(0, 0, 120);
  scene.add(pointLight3);

  const pointLight4 = new THREE.PointLight(0x00ff7f, 0.6, 600);
  pointLight4.position.set(100, -100, 0);
  scene.add(pointLight4);
}

// Scroll animations
function setupScrollAnimations() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, options);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.animation = `fadeInSection 0.8s ease-out ${0.1 * index}s both`;
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

// Active nav highlighting
function setupActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      if ((currentPath.includes('index.html') || currentPath.endsWith('/') || currentPath.includes('vlad-panaite-portfolio')) && (href === '#about' || href === 'index.html')) {
        link.classList.add('active');
      } else if (currentPath.includes(href.replace('.html', ''))) {
        link.classList.add('active');
      }
    }
  });
}

// Add glow effect on mouse move
function setupMouseGlow() {
  document.addEventListener('mousemove', (e) => {
    const links = document.querySelectorAll('a, button, .portfolio-item');
    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
        link.style.transform = `translate(0, 0)`;
      }
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  setupMobileMenu();
  setupActiveNav();
  setupScrollAnimations();
  setupMouseGlow();
});
