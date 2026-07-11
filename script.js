// Three.js immersive scene
let scene, camera, renderer, particles = [];
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

function initThreeJS() {
  const container = document.getElementById('canvas-container');

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 150, 1000);

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Create particles
  createImmersiveParticles();

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x6666ff, 1, 500);
  pointLight1.position.set(100, 100, 100);
  pointLight1.castShadow = true;
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff66ff, 0.8, 400);
  pointLight2.position.set(-100, -100, 50);
  scene.add(pointLight2);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse tracking
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // Rotate and animate particles
    particles.forEach((particle, i) => {
      particle.rotation.x += particle.velocityX;
      particle.rotation.y += particle.velocityY;
      particle.rotation.z += particle.velocityZ;

      // Follow mouse
      particle.position.x += (mouseX * 0.08 - particle.position.x) * 0.03;
      particle.position.y += (-mouseY * 0.08 - particle.position.y) * 0.03;

      // Gentle bobbing
      particle.position.z += Math.sin(Date.now() * 0.001 + i) * 0.01;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 100 - 50;
    targetMouseY = (e.clientY / window.innerHeight) * 100 - 50;
  });
}

function createImmersiveParticles() {
  const colors = [0x6666ff, 0xff66ff, 0x66ffff];
  const geometries = [
    new THREE.IcosahedronGeometry(2, 4),
    new THREE.OctahedronGeometry(2.5),
    new THREE.TetrahedronGeometry(3),
    new THREE.SphereGeometry(2, 16, 16),
  ];

  for (let i = 0; i < 50; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.4,
      shininess: 100,
      wireframe: Math.random() > 0.7,
    });

    const particle = new THREE.Mesh(geometry, material);

    particle.position.x = (Math.random() - 0.5) * 200;
    particle.position.y = (Math.random() - 0.5) * 200;
    particle.position.z = (Math.random() - 0.5) * 100;

    particle.velocityX = (Math.random() - 0.5) * 0.008;
    particle.velocityY = (Math.random() - 0.5) * 0.008;
    particle.velocityZ = (Math.random() - 0.5) * 0.008;

    particle.scale.set(Math.random() * 0.6 + 0.3, Math.random() * 0.6 + 0.3, Math.random() * 0.6 + 0.3);
    particle.castShadow = true;
    particle.receiveShadow = true;

    scene.add(particle);
    particles.push(particle);
  }
}

// Audio autoplay
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgMusic');
  audio.volume = 0.3; // Set volume to 30%

  // Try to play, catch errors
  audio.play().catch(err => {
    console.log('Autoplay prevented:', err);
  });
});

// CTA button functionality
document.querySelector('.cta').addEventListener('click', () => {
  document.getElementById('sound-design').scrollIntoView({ behavior: 'smooth' });
});
