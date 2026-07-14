// ============================================================
// Matias Perez — Portfolio
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Menú móvil ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Resaltar link activo según sección visible ---------- */
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* ---------- Tema día / noche ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const STORAGE_KEY = 'mp-portfolio-theme';

function applyTheme(theme) {
  if (theme === 'day') {
    root.setAttribute('data-theme', 'day');
    themeLabel.textContent = 'Modo día';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    root.removeAttribute('data-theme');
    themeLabel.textContent = 'Modo noche';
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  applyTheme(saved);
} else {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'day' : 'night');
}

themeToggle.addEventListener('click', () => {
  const isDay = root.getAttribute('data-theme') === 'day';
  const next = isDay ? 'night' : 'day';
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
});

/* ---------- Formulario de contacto (Netlify Forms) ---------- */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = 'Enviando...';

  const data = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  })
    .then(() => {
      status.textContent = '¡Gracias! Tu mensaje fue enviado, te voy a responder a la brevedad.';
      form.reset();
    })
    .catch(() => {
      status.textContent = 'Hubo un problema al enviar. Escribime directo a matiasperezequiel@gmail.com';
    });
});