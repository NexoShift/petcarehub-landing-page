# PetCare Hub – Veterinary Medical Records Platform

## Project Overview

**PetCare Hub** is a web and mobile platform developed by **NexoShift** that keeps a **longitudinal medical history centered on the pet**, not on the clinic.

Visits, lab tests, treatments and prescriptions stay in a single history that the owner can share with any clinic they authorize. **Computer Vision** and **LLM** assistants support the veterinarian, who always validates, edits or discards each suggestion.

PetCare Hub targets two segments:
- **Veterinarians and veterinary clinics** that treat dogs and cats.
- **Pet owners** who want their pets' medical information in one place.

---

## Key Features

- **Longitudinal Medical History:** one history per pet, available across clinics.
- **Visual Lesion Analysis (Computer Vision):** highlights areas of interest in skin and eye images, for guidance only.
- **Clinical Drafts with LLM:** SOAP drafts from the current visit and the history the vet selects.
- **Plain-Language Explanations:** diagnoses and treatments explained to owners without technical terms.
- **Traceability:** every record stores the professional who created it.
- **Internationalization (i18n):** Spanish (ES, default) and English (EN) through `data-i18n` attributes and a language switcher in the header.

---

## Subscription Plans

| Plan | Price | Best For |
|---|---|---|
| **Owner** | $9/month | Families with pets |
| **Professional** | $29/month | Independent veterinarians |
| **Clinic** | $79/month | Clinics with several professionals |

Direct subscription in US dollars, without SUNAT receipts.

---

## Technologies Used

- **HTML5 & CSS3** — Semantic structure and styling with CSS custom properties for the brand tokens.
- **Vanilla JavaScript** — Shared layout, language switching, mobile menu, scroll animations and sticky header.
- **Google Fonts** — Typography (`Inter`).
- **Flexbox / CSS Grid** — Responsive layout.
- **GitHub Actions + GitHub Pages** — Deployment.

---

## Project Structure

```
petcarehub-website/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # Deploys public/ to GitHub Pages on every push to main
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE.md
├── README.md
└── public/                            # Root of the published site
    ├── index.html                     # Main landing page
    ├── _header.html                   # Shared header (loaded by main.js)
    ├── _footer.html                   # Shared footer (loaded by main.js)
    ├── _language-switcher.html        # Shared ES/EN switcher (loaded by main.js)
    ├── sections/
    │   ├── tos.html                   # Terms of Service
    │   └── policies.html              # Privacy Policy (Ley N° 29733)
    └── assets/
        ├── images/
        │   ├── brand/                 # Isotype and logo
        │   └── team/                  # Team photos
        ├── styles/
        │   ├── style.css              # Entry point, imports the files below
        │   ├── base/                  # Design tokens, reset, typography, layout
        │   ├── components/            # Buttons, header, cards, footer, video
        │   └── sections/              # Hero, product, AI, benefits, plans, team, FAQ, CTA, legal
        └── scripts/
            ├── config.js              # Web application URL and YouTube video links
            ├── i18n.js                # i18n engine
            ├── main.js                # Shared layout, menu, animations, videos
            └── translations/
                ├── es.js              # Spanish translations (Es)
                └── en.js              # English translations (En)
```

---

## Landing Sections

Hero · About the product (video + how it works) · AI features · Benefits · Plans · About the team (video + members) · FAQ · Call to action · Footer.

The video links are set in `public/assets/scripts/config.js` (`VIDEOS.product` and `VIDEOS.team`). Paste the YouTube link as it is; while a link is empty, the section shows a "coming soon" frame.

---

## Deployment

The site is published with **GitHub Pages**. Every push to `main` runs the `Deploy to GitHub Pages` workflow (`.github/workflows/deploy.yml`), which publishes the `public/` folder as the root of the site. The workflow can also be run manually from the **Actions** tab.

First time only: in the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

---

## Version 1.0.0

First stable release.

- Responsive landing page with hero, about the product, AI features, benefits, plans, about the team, FAQ and call to action sections.
- Spanish (ES) and English (EN) internationalization with a language switcher.
- Video frames for "About the product" and "About the team".
- Terms of Service and Privacy Policy (Ley N° 29733) pages.
- Deployment with GitHub Actions and GitHub Pages.

---

## Team — NexoShift

| Name | Code | Role |
|---|---|---|
| Cutiri Agüero, Fabrizio Alexander | U201914181 | Software Engineer |
| Torres Apolinario, Giovany Smith | U202311601 | Software Engineer |
| Lopez Roman, Franco Mauricio | U202315890 | Software Engineer |
| Aru Acevedo, Yair Christofer | U202125984 | Software Engineer |
| Carranza Tesén, Joaquín Enrique | U20191B935 | Software Engineer |

> Software Engineering students at **Universidad Peruana de Ciencias Aplicadas (UPC)**.

---

## Copyright

Copyright © 2026 NexoShift. All rights reserved.
