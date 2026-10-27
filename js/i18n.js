/**
 * i18n de la landing (ES / EN).
 *
 * Marcado soportado en el HTML:
 *   data-i18n="seccion.clave"            -> reemplaza el texto
 *   data-i18n-html="seccion.clave"       -> reemplaza el HTML (solo textos propios con <b>/<span>)
 *   data-i18n-attr="atributo:seccion.clave;otro:seccion.clave" -> reemplaza atributos
 *
 * Las traducciones viven en /i18n/<idioma>.json. El HTML ya trae el texto en español,
 * así que si los JSON no cargan (por ejemplo, al abrir el archivo con file://) la página
 * se sigue viendo completa.
 */
(function () {
  const config = window.PETCARE_CONFIG;
  const STORAGE_KEY = 'petcarehub.lang';
  const cache = {};

  function getInitialLang() {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* almacenamiento no disponible */ }
    return config.SUPPORTED_LANGS.includes(saved) ? saved : config.DEFAULT_LANG;
  }

  function resolve(dict, path) {
    return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), dict);
  }

  async function loadDictionary(lang) {
    if (cache[lang]) return cache[lang];
    const response = await fetch(`i18n/${lang}.json`, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar i18n/${lang}.json`);
    cache[lang] = await response.json();
    return cache[lang];
  }

  function applyDictionary(dict) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = resolve(dict, el.dataset.i18n);
      if (typeof value === 'string') el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = resolve(dict, el.dataset.i18nHtml);
      if (typeof value === 'string') el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        const value = resolve(dict, key);
        if (attr && typeof value === 'string') el.setAttribute(attr, value);
      });
    });
  }

  function updateSwitch(lang) {
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  }

  async function setLanguage(lang) {
    if (!config.SUPPORTED_LANGS.includes(lang)) return;
    try {
      const dict = await loadDictionary(lang);
      applyDictionary(dict);
      document.documentElement.lang = lang;
      updateSwitch(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) { /* almacenamiento no disponible */ }
      document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
    } catch (error) {
      console.warn('[i18n]', error.message, '- Abre la landing con un servidor local (Live Server) o desde GitHub Pages.');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    const initial = getInitialLang();
    updateSwitch(initial);
    if (initial !== config.DEFAULT_LANG) setLanguage(initial);
  });

  window.PetcareI18n = { setLanguage };
})();
