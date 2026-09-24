# SPEC: Personal Website for Boulos Haddad (bouloshaddad.com)

## Objective
Design and build a world-class, responsive personal website for Boulos Haddad inspired directly by the editorial, minimalist, and typographic aesthetic of **ajafrost.com**.

## Design Philosophy & System (The ajafrost.com Reference)
- **Palette**:
  - `--paper: #FDFBF7` (warm ivory paper background)
  - `--charcoal: #1A1A1A` (deep off-black text and borders)
  - `--white: #FFFFFF`
  - `--grid-line: #1A1A1A` (crisp 1px solid architectural grid lines)
  - `--border-subtle: #E5E0D8`
- **Typography**:
  - Headings / Name: `'Instrument Serif', Georgia, serif` (editorial, high-contrast, elegant italic accents)
  - Body / UI / Labels: `'Space Grotesk', -apple-system, sans-serif` (clean, modern, geometric)
  - Strict 2-font system.
  - Section Labels: `.label` or `.page-label` in `Space Grotesk`, uppercase, `0.75rem`, letter-spacing `0.15em`, bold.
- **Layout Architecture**:
  - Sticky / Fixed split layout on desktop (or hero sticky column with fluid editorial right column), transitioning gracefully to single-column on mobile.
  - Generous whitespace, razor-sharp 1px border dividers, no generic SaaS shadows or cartoon gradients.
  - Clean top navigation bar with minimal monogram logo `BH` and uppercase tracked links (`ABOUT`, `PROJECTS`, `EXPERIENCE`, `CONTACT`).

## Biographical & Project Details for Boulos Haddad

### Identity & Headline
- **Name**: Boulos Haddad
- **Monogram**: BH
- **Domain**: `bouloshaddad.com`
- **Current Focus**: Entrepreneur, Venture Builder, Product & Customer Development Leader.
- **Locations**: Los Angeles & San Francisco Bay Area, California (Roots in San Bernardino / Inland Empire).

### Introductory Narrative
Boulos Haddad is an entrepreneur and venture builder with deep expertise across customer discovery, enterprise platform scaling, hard-tech hardware innovation, and autonomous AI systems. 

Previously at **Google Cloud**, Boulos worked in Customer Development and Success within the Business Application Platform team (Apigee / AppSheet), partnering with high-growth startups and enterprise leaders to deploy modern API architecture and digital workflows.

As Co-Founder of **DragonSkin**, he took an urgent coastal safety problem and engineered the world's first ray-resistant protective footwear for surfers, driving the venture from zero to materials science prototyping, manufacturing, and national press acclaim.

Educated at the **University of California, San Diego (UCSD)**, Boulos earned a double major in the Sciences and Business alongside a double minor in Political Science and the Humanities. Formed by his upbringing in San Bernardino, Boulos also ran for the San Bernardino School Board with a student-first platform centered on educational access, nutrition, and technological equity.

---

### Featured Projects to Highlight

1. **Sprout and Stack** (Active Venture)
   - *Role*: Founder & Operator
   - *Description*: An automated media brand and retail intelligence platform built to stack savings for everyday shoppers. Powered by autonomous data scraping, real-time price verification, and automated programmatic video generation delivering high-impact deals content across YouTube, TikTok, and Instagram.

2. **Harmony Refracted** (Preview Note)
   - *Role*: Creator / Research
   - *Status*: Preview Note
   - *Description*: An exploratory creative and philosophical inquiry examining harmony, systems design, and human agency in an algorithmic age. Further details and essay series arriving soon.

3. **DragonSkin Footwear** (Prior Venture)
   - *Role*: Co-Founder
   - *Description*: Conceived and developed the world’s first ray-resistant protective booties for surfers and beachgoers. Led early customer discovery, mechanical puncture resistance testing, supplier sourcing, and manufacturing partnerships. Featured on FOX 5 San Diego and KUSI News.

4. **Google Cloud (Business Application Platform)**
   - *Role*: Customer Development & Success
   - *Description*: Scaled customer adoption across Google Cloud’s enterprise application and API management platforms (Apigee & AppSheet), driving technical alignment and operational growth.

---

### Focus Areas
- Autonomous AI Agent Pipelines & Media Automation
- Early-Stage Venture Strategy & Customer Development
- Enterprise Platform Growth & API Architecture
- Civic Equity, Education & Systems Design

---

### Assets Available in Project
- Headshot image: `assets/images/boulos_headshot.jpg` (high-res portrait)
- Target directory: `/Users/bouloshaddad/.openclaw/workspace/bouloshaddad-site/`
- Target files to create/verify:
  - `index.html` (Complete, semantic, accessible HTML5)
  - `assets/css/styles.css` (Faithful to the ajafrost.com aesthetic, responsive, crisp grid lines)
  - `assets/js/script.js` (Minimal JS for mobile menu toggle and smooth navigation)
  - `assets/images/favicon.svg` & `assets/images/favicon.png` (Crisp BH monogram)
  - `CNAME` (`bouloshaddad.com`)
  - `PROGRESS.md` (Checklist of completed items)

## Instructions
1. Inspect the existing assets in `assets/images/`.
2. Craft the complete `index.html`, `assets/css/styles.css`, and `assets/js/script.js`.
3. Ensure responsiveness across mobile (<768px), tablet (<1024px), and desktop (>1024px).
4. Verify typography imports from Google Fonts (`Instrument Serif` and `Space Grotesk`).
5. Generate the favicon assets (`favicon.svg`, `favicon.png`).
6. Append completed milestones to `PROGRESS.md`.
