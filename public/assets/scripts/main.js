/**
 * Landing behavior: shared layout (header, footer and language switcher),
 * i18n, mobile menu, sticky header, active link, scroll animations,
 * videos and links to the web application.
 */

// Root of the site (the public/ folder), resolved from this script: assets/scripts/main.js
const SITE_ROOT = new URL('../../', document.currentScript.src).href;

(function () {
    const config = window.PETCARE_CONFIG;
    const i18n = window.PetcareI18n;

    function isHomePage() {
        const rootPath = new URL(SITE_ROOT).pathname;
        return location.pathname === rootPath || location.pathname === rootPath + 'index.html';
    }

    function homeUrl() {
        return isHomePage() ? '' : new URL('index.html', SITE_ROOT).href;
    }

    // Each page declares <div id="header-placeholder"> and <div id="footer-placeholder">; the header
    // declares <div id="language-switcher-placeholder">. In the partials, {{home}} is the home page
    // ("" on the home page itself, so its links only scroll) and {{root}} is the root of the site.
    async function loadPartial(placeholderId, fileName) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return;

        const response = await fetch(SITE_ROOT + fileName);
        if (!response.ok) throw new Error(`Could not load ${fileName}`);

        const html = (await response.text())
            .replace(/\{\{home\}\}/g, homeUrl())
            .replace(/\{\{root\}\}/g, SITE_ROOT);

        const template = document.createElement('template');
        template.innerHTML = html.trim();
        placeholder.replaceWith(template.content);
    }

    async function loadSharedLayout() {
        await Promise.all([
            loadPartial('header-placeholder', '_header.html'),
            loadPartial('footer-placeholder', '_footer.html')
        ]);
        await loadPartial('language-switcher-placeholder', '_language-switcher.html');
    }

    function setupAppLinks() {
        document.querySelectorAll('[data-app-link]').forEach((link) => {
            const route = config.ROUTES[link.dataset.appLink];
            if (config.APP_URL && route) {
                link.href = config.APP_URL.replace(/\/$/, '') + route;
            } else {
                // No web application deployed yet: the buttons go to the plans section
                link.href = homeUrl() + '#plans-section';
            }
        });
    }

    function toEmbedUrl(link) {
        if (!link) return '';
        const youtube = link.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
        return youtube ? `https://www.youtube-nocookie.com/embed/${youtube[1]}` : link;
    }

    function setupVideos() {
        document.querySelectorAll('[data-video]').forEach((video) => {
            const kind = video.dataset.video;
            const embedUrl = toEmbedUrl(config.VIDEOS[kind]);
            if (!embedUrl) return;

            const iframe = document.createElement('iframe');
            iframe.src = embedUrl;
            iframe.loading = 'lazy';
            iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.dataset.i18nAttr = `title:video.${kind}Title`;
            video.querySelector('.video__frame').replaceChildren(iframe);
        });
    }

    function setupMobileNavigation() {
        const menuButton = document.querySelector('.nav-toggle');
        const navigation = document.getElementById('nav');
        if (!menuButton || !navigation) return;

        const close = () => {
            navigation.classList.remove('is-open');
            menuButton.setAttribute('aria-expanded', 'false');
        };

        menuButton.addEventListener('click', () => {
            const isOpen = navigation.classList.toggle('is-open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });

        navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
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
        if (!isHomePage() || !('IntersectionObserver' in window)) return;
        const links = document.querySelectorAll('.nav__link');
        const sections = [...links]
            .map((link) => document.querySelector(new URL(link.href).hash))
            .filter(Boolean);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((link) => {
                    link.classList.toggle('is-active', new URL(link.href).hash === `#${entry.target.id}`);
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

    function setupFooterYear() {
        document.querySelectorAll('.footer__year').forEach((year) => {
            year.textContent = new Date().getFullYear();
        });
    }

    // When the page opens with a #section in the URL, scroll again once the header is in place
    function scrollToHash() {
        if (!location.hash) return;
        const target = document.querySelector(location.hash);
        if (target) target.scrollIntoView();
    }

    async function initPage() {
        try {
            await loadSharedLayout();
        } catch (error) {
            console.warn('[layout]', error.message, '- Open the site with a local server (Live Server) or from GitHub Pages.');
        }

        setupAppLinks();
        setupVideos();
        i18n.applyTranslations();
        i18n.bindLanguageButtons();
        setupMobileNavigation();
        setupHeaderShadow();
        setupActiveLink();
        setupReveal();
        setupFooterYear();
        scrollToHash();
    }

    document.addEventListener('DOMContentLoaded', initPage);
})();
