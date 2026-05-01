/* ================================================
   KMY GROW — СПІЛЬНІ СКРИПТИ
   Підключається на ВСІХ сторінках
   ================================================ */

/* --- SCROLL АНІМАЦІЯ --- */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
}

/* --- АКОРДЕОН --- */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body    = header.nextElementSibling;
      const chevron = header.querySelector('.accordion-chevron');
      const isOpen  = body.classList.contains('open');
      body.classList.toggle('open', !isOpen);
      if (chevron) chevron.classList.toggle('open', !isOpen);
    });
  });
}

/* --- АКТИВНА ЛАНКА В НАВІГАЦІЇ --- */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href && href === path) link.classList.add('active');
  });
}

/* --- ІНІЦІАЛІЗАЦІЯ --- */
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initAccordions();
  initActiveNav();
});
