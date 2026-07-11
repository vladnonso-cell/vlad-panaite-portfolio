document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupActiveNav();
  setupRevealOnScroll();
});

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

function setupActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' || href === '/') {
      if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/vlad-panaite-portfolio/')) {
        link.classList.add('active');
      }
    } else if (href && currentPath.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });
}

function setupRevealOnScroll() {
  const elements = document.querySelectorAll('section, .case-study, .composition-project');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
