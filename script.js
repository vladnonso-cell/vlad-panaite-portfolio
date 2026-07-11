// Three.js Scene Setup
let scene, camera, renderer, particles = [];
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

function initThreeJS() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 100, 200);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  createParticles();
  createGeometry();

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse following
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Rotate and move particles
    particles.forEach((particle) => {
      particle.rotation.x += particle.velocityX;
      particle.rotation.y += particle.velocityY;
      particle.rotation.z += particle.velocityZ;

      // Follow mouse with lag
      particle.position.x += (mouseX * 0.01 - particle.position.x) * 0.02;
      particle.position.y += (-mouseY * 0.01 - particle.position.y) * 0.02;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 100 - 50;
    targetMouseY = (e.clientY / window.innerHeight) * 100 - 50;
  });
}

function createParticles() {
  const colors = [0x00ff00, 0x00ffff, 0xff00ff];
  const geometries = [
    new THREE.IcosahedronGeometry(1, 3),
    new THREE.OctahedronGeometry(1),
    new THREE.TetrahedronGeometry(1.2),
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
  ];

  for (let i = 0; i < 40; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.5,
      wireframe: Math.random() > 0.6,
    });

    const particle = new THREE.Mesh(geometry, material);

    particle.position.x = (Math.random() - 0.5) * 150;
    particle.position.y = (Math.random() - 0.5) * 150;
    particle.position.z = (Math.random() - 0.5) * 100;

    particle.velocityX = (Math.random() - 0.5) * 0.01;
    particle.velocityY = (Math.random() - 0.5) * 0.01;
    particle.velocityZ = (Math.random() - 0.5) * 0.01;

    particle.scale.set(Math.random() * 0.5 + 0.2, Math.random() * 0.5 + 0.2, Math.random() * 0.5 + 0.2);

    scene.add(particle);
    particles.push(particle);
  }

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00ff00, 1, 300);
  pointLight1.position.set(80, 80, 60);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x00ffff, 0.8, 300);
  pointLight2.position.set(-80, -80, 60);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xff00ff, 0.6, 250);
  pointLight3.position.set(0, 0, 80);
  scene.add(pointLight3);
}

function createGeometry() {
  // Create grid lines
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = -10; i <= 10; i++) {
    vertices.push(i * 10, -100, 0);
    vertices.push(i * 10, 100, 0);

    vertices.push(-100, i * 10, 0);
    vertices.push(100, i * 10, 0);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

  const material = new THREE.LineBasicMaterial({ color: 0x00ff00, opacity: 0.1, transparent: true });
  const lines = new THREE.LineSegments(geometry, material);
  scene.add(lines);
}

// Data stream generator
function generateDataStream() {
  const chars = '0123456789ABCDEF ';
  let data = '';
  for (let i = 0; i < 3000; i++) {
    data += chars.charAt(Math.floor(Math.random() * chars.length));
    if (Math.random() > 0.95) data += '\n';
  }
  return data;
}

// Initialize data stream
function initDataStream() {
  const stream = document.getElementById('dataStream');
  if (stream) {
    stream.textContent = generateDataStream();
    setInterval(() => {
      if (Math.random() > 0.7) {
        stream.textContent = generateDataStream();
      }
    }, 5000);
  }
}

// Tooltip interactions
function setupTooltips() {
  const zones = document.querySelectorAll('.zone');
  const tooltip = document.querySelector('.tooltip');
  const tooltipContent = document.querySelector('.tooltip-content');

  zones.forEach(zone => {
    zone.addEventListener('mouseenter', (e) => {
      const info = zone.dataset.info;
      tooltipContent.textContent = info;
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

      // For now, just show info
      console.log('Navigate to:', href);
    });
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initDataStream();
  setupTooltips();
  setupNavigation();
});
