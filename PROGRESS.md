# PROGRESS: bouloshaddad.com

## 2026-09-24: Initial build

- [x] Read `SPEC.md` and inspected `assets/images/` (headshot 1280x1454)
- [x] Pulled live ajafrost.com markup, `styles.css`, and `script.js` as the design reference
- [x] `index.html`: semantic HTML5 with skip link, ARIA labels, Open Graph tags, JSON-LD Person schema
  - Sticky split hero (name + grayscale portrait on the left, intro narrative on the right)
  - About meta grid (Based In, Roots, Education, Currently) and numbered Focus Areas
  - Projects: 1px-grid cards for Sprout and Stack, Harmony Refracted (Preview Note), DragonSkin, Google Cloud
  - Experience: ajafrost-style rows with charcoal hover inversion
  - Contact: 3-cell square module grid, charcoal footer
- [x] `assets/css/styles.css`: spec palette tokens, strict 2-font system (Instrument Serif + Space Grotesk), 1px architectural lines, no shadows or gradients
  - Breakpoints: desktop (>1024px), tablet (<=1024px, single column), mobile (<=768px, slide-in menu)
  - Respects `prefers-reduced-motion`
- [x] `assets/js/script.js`: mobile menu (Escape + outside click to close, aria-expanded), nav shrink on scroll, offset smooth scroll, active nav link, scroll reveal with a fail-safe so content is never left hidden
- [x] Google Fonts import verified (Instrument Serif regular + italic, Space Grotesk 400/500/700)
- [x] Favicons: `favicon.svg`, `favicon.png` (32px), `apple-touch-icon.png` (180px), BH monogram in Instrument Serif
- [x] `CNAME`: `bouloshaddad.com`
- [x] QA in headless Chrome at 1440px, 820px, 390px: no horizontal overflow, no console errors, mobile menu verified

## Open items (need Boulos)

- [x] ~~Confirm the public email~~ (done 2026-09-24)
- [x] ~~LinkedIn~~ (done 2026-09-24)
- [ ] Optional: Sprout and Stack channel URLs
- [ ] Optional: DragonSkin press links (FOX 5 San Diego, KUSI)

## 2026-09-24: Contact links

- [x] Email set to `haddadboulos1@gmail.com` (mailto link, placeholder removed)
- [x] LinkedIn module links to https://www.linkedin.com/in/bouloshaddad/ (opens in new tab)
- [x] GitHub module links to https://github.com/haddadboulos (opens in new tab)
- [x] Contact grid is now Email / LinkedIn / GitHub, with a full-width charcoal note underneath (location moved into that note)
- [x] Added email and profile links to the JSON-LD `sameAs` so search engines connect the profiles
- [x] Re-tested at 1440px, 820px, 390px: no overflow, no errors, email wraps cleanly on tablet
