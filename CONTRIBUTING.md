# Contributing to the PetCare Hub Website

This document sets the rules and workflow that keep the PetCare Hub landing page consistent, accessible and easy to maintain.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Git Workflow & Branching Strategy](#git-workflow--branching-strategy)
3. [Conventional Commits](#conventional-commits)
4. [Semantic Versioning (SemVer)](#semantic-versioning-semver)
5. [HTML Guidelines](#html-guidelines)
6. [CSS Guidelines](#css-guidelines)
7. [JavaScript Guidelines](#javascript-guidelines)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [Development Workflow](#development-workflow)
10. [Pull Request (PR) Process](#pull-request-pr-process)

---

## Project Structure

The website is a static site built with HTML5, CSS3 and vanilla JavaScript. The whole site lives under `public/`, which is published as the root of the site:

```text
public/
├── index.html                    # Landing page
├── _header.html                  # Shared header (loaded by main.js)
├── _footer.html                  # Shared footer (loaded by main.js)
├── _language-switcher.html       # Shared ES/EN switcher (loaded by main.js)
├── sections/
│   ├── tos.html                  # Terms of Service
│   └── policies.html             # Privacy Policy (Ley N° 29733)
└── assets/
    ├── images/                   # brand/ and team/
    ├── styles/
    │   ├── style.css             # Entry point that imports base/, components/ and sections/
    │   ├── base/                 # variables.css (design tokens), reset, typography, layout
    │   ├── components/           # buttons, header, cards, footer, video
    │   └── sections/             # One file per landing section
    └── scripts/
        ├── config.js             # APP_URL and VIDEOS
        ├── i18n.js               # i18n engine
        ├── main.js               # Shared layout, menu, animations, videos
        └── translations/
            ├── es.js             # Spanish translations (Es)
            └── en.js             # English translations (En)
```

- **Shared layout**: pages do not copy the header or footer. They declare `<div id="header-placeholder">` and `<div id="footer-placeholder">`, and `main.js` replaces them with the partials. Inside the partials, `{{home}}` is the landing page and `{{root}}` is the root of the site (the `public/` folder).
- **Partials** start with an underscore (`_header.html`) to show they are fragments, not pages.

---

## Git Workflow & Branching Strategy

We follow the **Git Flow** branching model:

```text
main ──────────────────────────────────────────●────── (Production Releases)
         \                                    /
develop ──●─────────●───────────────●────────●──────── (Integration Branch)
           \       /                 \      /
feature/    ●─────●                   ●────●           (Feature Branches)
```

- `main`: production code, published to GitHub Pages. Only merged from `release/*` or `hotfix/*`. Tagged with SemVer tags (`v1.0.0`).
- `develop`: integration branch where finished features are merged.
- `feature/<short-description>`: new sections or changes, created from `develop` and merged back through a pull request (`feature/shared-layout`, `feature/landing-sections`).
- `release/v<MAJOR.MINOR.PATCH>`: release preparation and changelog, merged to `main` and `develop`.
- `hotfix/<short-description>`: urgent fixes for the published site, created from `main`, merged to `main` and `develop`.

Delete the local and remote branch once its pull request is merged.

---

## Conventional Commits

Commit messages follow [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) and are written in English.

```text
<type>(<scope>): <short summary in imperative mood>
```

| Type       | Description                                                   |
|------------|---------------------------------------------------------------|
| `feat`     | A new section, page or capability                             |
| `fix`      | A bug fix                                                     |
| `docs`     | Documentation only (README, CHANGELOG, CONTRIBUTING)          |
| `style`    | Visual or formatting changes in the stylesheets               |
| `refactor` | Restructuring code without changing its behavior              |
| `chore`    | Maintenance tasks that do not change the website              |
| `ci`       | Changes to the GitHub Actions deployment workflow             |

Scopes: `header`, `footer`, `hero`, `product`, `features`, `benefits`, `plans`, `team`, `faq`, `layout`, `pages`, `tos`, `policies`, `i18n`, `design`, `a11y`, `images`, `readme`, `changelog`, `license`, `contributing`, `deploy`.

Examples:
- `feat(layout): load the shared header and footer from main.js`
- `feat(product): add the about the product video frame`
- `fix(i18n): add the missing plans keys to en.js`
- `ci(deploy): deploy public/ to GitHub Pages with GitHub Actions`

---

## Semantic Versioning (SemVer)

Versions follow [SemVer 2.0.0](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR**: a redesign or a change in the page URLs.
- **MINOR**: new sections, pages or capabilities.
- **PATCH**: bug fixes and text corrections.

Every release records its changes in `CHANGELOG.md`, following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## HTML Guidelines

- Semantic HTML5: `header`, `nav`, `main`, `section`, `footer`, and heading levels in order.
- Section ids use `kebab-case` and end in `-section` (`home-section`, `plans-section`); navigation links point to them.
- Classes follow BEM (`block__element--modifier`): `plan__price`, `btn--primary`.
- Every image has a meaningful `alt`; decorative images use `alt=""`. Icon-only buttons have an `aria-label`.
- Use the shared partials instead of copying the header or footer into a page.

---

## CSS Guidelines

- `style.css` only imports files. Each section has its own file in `styles/sections/`, and reusable pieces go in `styles/components/`.
- Use the custom properties of `base/variables.css` (brand colors `#032B59`, `#023A65`, `#0BC3BD`, the `Inter` font sizes and the 8px spacing scale). Do not hardcode colors; add a token when a new one is needed.
- Keep the existing breakpoints (`1100px`, `960px`, `860px`, `560px`, `480px`) and check the site at 375px wide.
- Animations must respect `prefers-reduced-motion`.

---

## JavaScript Guidelines

- Vanilla JavaScript only, without frameworks or build tools.
- Page behavior goes in `main.js`, inside `initPage()` when it needs the shared header or footer.
- Configuration (web application URL, video links) goes in `config.js`.
- `camelCase` for variables and functions, `UPPER_SNAKE_CASE` for global constants (`SITE_ROOT`), `PascalCase` for the translation objects (`Es`, `En`).

---

## Internationalization (i18n)

- Every visible text has a key: `data-i18n="section.key"` (or `data-i18n-html` / `data-i18n-attr`).
- Add each key to **both** `translations/es.js` and `translations/en.js`, with the same path.
- Spanish is the default language; the text written in the HTML must match the Spanish translation.
- After adding or renaming keys, switch between ES and EN and confirm that no text stays untranslated.

---

## Development Workflow

`main.js` loads the partials with `fetch`, so the site needs a local server (opening the file with `file://` does not load the header or footer).

```bash
# From the root of the repository
cd public
python -m http.server 5500
# open http://localhost:5500
```

The VS Code **Live Server** extension also works (open `public/index.html`).

Manual checks before a PR:
- Desktop and mobile widths (1280px and 375px).
- Spanish and English.
- Mobile menu, FAQ, language switcher and the links of the header and footer.
- Terms of Service and Privacy Policy pages.
- No errors in the browser console.

---

## Pull Request (PR) Process

1. [ ] The branch was created from `develop` and the PR targets `develop` (or `main` for hotfixes).
2. [ ] All commit messages follow Conventional Commits.
3. [ ] Every new or renamed text has its key in both `es.js` and `en.js`.
4. [ ] The manual checks pass on desktop and mobile.
5. [ ] README and CHANGELOG are updated when the change affects them.
