/**
 * Interacciones de la landing: menú móvil, header al hacer scroll,
 * enlace activo según la sección visible, animaciones de aparición
 * y enlaces hacia la aplicación web.
 */
(function () {
  const config = window.PETCARE_CONFIG;

  function setupAppLinks() {
    document.querySelectorAll('[data-app-link]').forEach((link) => {
      const route = config.ROUTES[link.dataset.appLink];
      if (config.APP_URL && route) {
        link.href = config.APP_URL.replace(/\/$/, '') + route;
      } else {
        // Sin app desplegada aún: los botones llevan a la sección de planes
        link.href = '#planes';
      }
    });
  }

  function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', close);
  }

  function setupHeaderShadow() {
    const header = document.getElementById('header');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function setupActiveLink() {
    const links = document.querySelectorAll('.nav__link');
    const sections = [...links]
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  function setupReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    setupAppLinks();
    setupMobileNav();
    setupHeaderShadow();
    setupActiveLink();
    setupReveal();
  });
})();
