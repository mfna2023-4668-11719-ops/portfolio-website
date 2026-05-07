// ============================================================
// PORTFOLIO SCRIPTS — Maria Francia N. Abdula
// ============================================================

// ── NAVBAR ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link tracking
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ── MOBILE MENU ──
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = navToggle.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.cssText = 'transform: rotate(45deg) translate(4.5px, 4.5px)';
    spans[1].style.cssText = 'opacity: 0';
    spans[2].style.cssText = 'transform: rotate(-45deg) translate(4.5px, -4.5px)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Staggered reveals
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal-stagger'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 120);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-stagger').forEach(el => {
  staggerObserver.observe(el);
});

// ── SKILL BAR ANIMATION ──
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = fill.style.getPropertyValue('--w') ||
            getComputedStyle(fill).getPropertyValue('--w');
          fill.style.width = fill.parentElement.previousElementSibling
            ? fill.style.cssText.match(/--w:\s*([\d%]+)/)?.[1] || '75%'
            : fill.style.cssText;
        }, i * 200 + 300);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
  skillBarObserver.observe(card);
});

// Trigger skill fills properly via CSS custom properties
function triggerSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    const w = fill.style.cssText.match(/--w:\s*([^;]+)/)?.[1] || '75%';
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            fill.style.width = w;
          }, 400);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    barObserver.observe(fill.closest('.skill-card'));
  });
}
triggerSkillBars();

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--accent-2)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── CURSOR TRAIL (subtle) ──
// Lightweight sparkle on mousemove
let lastTrail = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTrail < 80) return;
  lastTrail = now;

  const spark = document.createElement('div');
  spark.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(79,209,197,0.5);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.6s ease, transform 0.6s ease;
  `;
  document.body.appendChild(spark);
  requestAnimationFrame(() => {
    spark.style.opacity = '0';
    spark.style.transform = 'translate(-50%, -50%) scale(3)';
  });
  setTimeout(() => spark.remove(), 600);
});

// ── PAGE LOAD PROGRESS ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
