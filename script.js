// Datamatics data stream generator
function generateDataStream() {
  const chars = '0123456789 ';
  let data = '';
  for (let i = 0; i < 5000; i++) {
    data += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return data;
}

// Initialize data stream
function initDataStream() {
  const stream = document.getElementById('dataStream');
  if (stream) {
    stream.textContent = generateDataStream();
  }
}

// Hotspot interactions
function setupHotspots() {
  const hotspots = document.querySelectorAll('.hotspot');

  hotspots.forEach(hotspot => {
    hotspot.addEventListener('mouseenter', () => {
      const text = hotspot.querySelector('.hotspot-text');
      if (text) {
        text.style.animation = 'none';
        setTimeout(() => {
          text.style.animation = 'typeIn 0.8s ease-out forwards';
        }, 10);
      }

      // Animate number
      const number = hotspot.querySelector('.hotspot-number');
      if (number) {
        const count = parseInt(number.textContent) || 0;
        let current = 0;
        const interval = setInterval(() => {
          current++;
          number.textContent = current;
          if (current >= 100) {
            clearInterval(interval);
            number.textContent = '✓';
          }
        }, 10);
      }
    });

    hotspot.addEventListener('mouseleave', () => {
      const number = hotspot.querySelector('.hotspot-number');
      if (number) {
        number.textContent = '—';
      }
    });

    // Click to navigate
    const link = hotspot.querySelector('.hotspot-link');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
}

// Mobile menu
function setupMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  if (menuBtn) {
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
}

// Smooth scroll navigation
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Animate numbers in view
function setupNumberAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');

        // Animate any numbers in the element
        const text = entry.target.textContent;
        let animatedText = '';

        for (let char of text) {
          if (/\d/.test(char)) {
            const start = parseInt(char);
            let current = 0;
            const el = document.createElement('span');
            el.textContent = start;

            // Animate the digit
            const interval = setInterval(() => {
              current++;
              const random = Math.floor(Math.random() * 10);
              el.textContent = random;
              if (current >= 10) {
                clearInterval(interval);
                el.textContent = start;
              }
            }, 50);
          }
        }
      }
    });
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Active nav highlighting
function setupActiveNav() {
  const nav = document.querySelector('nav');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });

    nav.querySelectorAll('a').forEach(link => {
      link.style.opacity = '1';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--accent)';
      } else {
        link.style.color = 'var(--text)';
      }
    });
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initDataStream();
  setupHotspots();
  setupMobileMenu();
  setupSmoothScroll();
  setupNumberAnimation();
  setupActiveNav();

  // Refresh data stream periodically
  setInterval(() => {
    const stream = document.getElementById('dataStream');
    if (stream && Math.random() > 0.8) {
      stream.textContent = generateDataStream();
    }
  }, 5000);
});
