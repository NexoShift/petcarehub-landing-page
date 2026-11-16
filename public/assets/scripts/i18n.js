/**
 * i18n engine (ES / EN).
 *
 * Supported markup:
 *   data-i18n="section.key"          -> replaces the text
 *   data-i18n-html="section.key"     -> replaces the HTML (only our own texts with <b>/<span>)
 *   data-i18n-attr="attribute:section.key;other:section.key" -> replaces attributes
 *
 * Translations live in assets/scripts/translations/es.js (Es) and en.js (En).
 * The HTML already contains the Spanish text, which is the default language.
 */
(function () {
    const config = window.PETCARE_CONFIG;
    const STORAGE_KEY = 'petcarehub.lang';
    const DICTIONARIES = { es: Es, en: En };
    let currentLanguage = config.DEFAULT_LANG;

    function getSavedLanguage() {
        let saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch (error) { /* storage not available */ }
        return config.SUPPORTED_LANGS.includes(saved) ? saved : config.DEFAULT_LANG;
    }

    function resolve(dictionary, path) {
        return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), dictionary);
    }

    function applyTranslations(root = document) {
        const dictionary = DICTIONARIES[currentLanguage];
        if (!dictionary) return;

        root.querySelectorAll('[data-i18n]').forEach((element) => {
            const value = resolve(dictionary, element.dataset.i18n);
            if (typeof value === 'string') element.textContent = value;
        });

        root.querySelectorAll('[data-i18n-html]').forEach((element) => {
            const value = resolve(dictionary, element.dataset.i18nHtml);
            if (typeof value === 'string') element.innerHTML = value;
        });

        root.querySelectorAll('[data-i18n-attr]').forEach((element) => {
            element.dataset.i18nAttr.split(';').forEach((pair) => {
                const [attribute, key] = pair.split(':').map((part) => part.trim());
                const value = resolve(dictionary, key);
                if (attribute && typeof value === 'string') element.setAttribute(attribute, value);
            });
        });

        document.documentElement.lang = currentLanguage;
        document.querySelectorAll('[data-lang]').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.lang === currentLanguage));
        });
    }

    function setLanguage(language) {
        if (!config.SUPPORTED_LANGS.includes(language)) return;
        currentLanguage = language;
        try {
            localStorage.setItem(STORAGE_KEY, language);
        } catch (error) { /* storage not available */ }
        applyTranslations();
    }

    function bindLanguageButtons() {
        document.querySelectorAll('[data-lang]').forEach((button) => {
            button.addEventListener('click', () => setLanguage(button.dataset.lang));
        });
    }

    function translate(key) {
        return resolve(DICTIONARIES[currentLanguage], key);
    }

    currentLanguage = getSavedLanguage();

    window.PetcareI18n = { applyTranslations, bindLanguageButtons, setLanguage, translate };
})();
