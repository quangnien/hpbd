# Portfolio Context — Thomas Nguyen (prsn)

> Read this file first before implementing any requirement in this project.
> Last updated: 2026-05-24

---

## 1. Project Overview

**Type:** Static personal portfolio + technical blog (no build tool — pure HTML/CSS/JS)
**Hosted:** GitHub Pages — `https://quangnien.github.io/prsn/`
**Owner:** Thomas Nguyen (Nguyễn Quang Niên)
**Role:** Java Software Engineer · Aspiring System Architect
**Current company:** Amaris Consulting (fintech, confidential project)
**Career path:** Java SE → Tech Lead → System Architect
**Personal philosophy:** *"Everything's A Trade-Off"*

---

## 2. File Structure

```
prsn/
├── index.html                          # Main portfolio page (single-page)
├── 404.html                            # Custom error page
├── CONTEXT.md                          # This file
├── .nojekyll                           # GitHub Pages bypass
├── assets/
│   ├── css/
│   │   ├── style.css                   # MAIN custom CSS — all design tokens & components
│   │   ├── responsive.css              # Responsive overrides
│   │   ├── animate.css                 # WOW/Animate.css library
│   │   ├── bootsnav.css                # Bootsnav navbar library
│   │   ├── bootstrap.min.css           # Bootstrap 3
│   │   ├── flaticon.css                # Flaticon icon font
│   │   ├── font-awesome.min.css        # Font Awesome 4
│   │   ├── owl.carousel.min.css        # Owl Carousel
│   │   └── owl.theme.default.min.css
│   ├── js/
│   │   ├── custom.js                   # MAIN custom JS — all interactive logic
│   │   ├── jquery.js                   # jQuery
│   │   ├── bootstrap.min.js
│   │   ├── bootsnav.js
│   │   ├── jquery.sticky.js            # Sticky header
│   │   ├── jquery.appear.js            # Progress bar trigger
│   │   ├── progressbar.js
│   │   ├── jquery.easing.js
│   │   ├── modernizr.js
│   │   └── owl.carousel.min.js
│   ├── images/
│   │   ├── about/                      # Profile photos (avt-muagiay2.jpg = main profile)
│   │   └── portfolio/                  # Journey/gallery photos
│   ├── download/
│   │   ├── CV_MIDDLE_JAVA_NGUYENQUANGNIEN.pdf   # Primary CV (linked in hero)
│   │   └── CV_NGUYENQUANGNIEN.pdf
│   ├── fonts/                          # Font Awesome, Flaticon, Glyphicons, Linearicons
│   └── logo/
│       ├── man.png                     # Favicon
│       ├── logo.png / logo-head.png
│       └── profile.png
└── blog/
    ├── index.html                      # Blog landing page (post grid)
    ├── blog.css                        # Shared blog CSS (tokens mirrored from style.css)
    ├── everything-trade-off/
    │   └── index.html                  # "Everything's A Trade-Off" — ~15 min read
    ├── docker-toan-tap/
    │   └── index.html                  # Docker guide — ~40 min read
    ├── postgresql-indexing/
    │   └── index.html                  # PostgreSQL Indexing — ~30 min read
    ├── prompt-engineering-roadmap/
    │   └── index.html                  # Prompt Engineering Roadmap — ~45 min read
    └── loose-coupling-spring-boot/
        └── index.html                  # Loose Coupling in Spring Boot — ~25 min read
```

---

## 3. Design System

### CSS Tokens (defined in `assets/css/style.css` `:root`)

| Token | Dark | Light | Purpose |
|---|---|---|---|
| `--bg` | `#060b18` | `#f4f5fa` | Page background |
| `--bg2` | `#091120` | `#ffffff` | Alt section bg |
| `--bg3` | `#0f1928` | `#eceef5` | Tertiary bg |
| `--bg4` | `#172030` | `#e2e5f0` | Card hover bg |
| `--primary` | `#b636ff` | `#8800cc` | Brand purple |
| `--primary-2` | `#d92cf9` | `#a015d0` | Lighter purple |
| `--primary-dark` | `#9f00ff` | `#6e00a8` | Darker purple |
| `--primary-dim` | `rgba(182,54,255,0.12)` | — | Tinted purple bg |
| `--teal` | `#00d4a0` | `#0b7a5a` | Accent teal |
| `--text` | `#e2e7f5` | `#111520` | Main text |
| `--sub` | `#8891a8` | `#4a5270` | Secondary text |
| `--muted` | `#4a5268` | `#8890a8` | Disabled/label text |
| `--card-bg` | `rgba(9,17,32,0.75)` | `rgba(255,255,255,0.92)` | Glass card |
| `--nav-bg` | `rgba(6,11,24,0.88)` | `rgba(244,245,250,0.93)` | Sticky nav |
| `--glass2` | `rgba(255,255,255,0.055)` | `rgba(0,0,0,0.05)` | Button/pill bg |
| `--border2` | `rgba(255,255,255,0.13)` | `rgba(0,0,0,0.14)` | Card borders |
| `--shadow-glow` | `0 0 32px rgba(182,54,255,0.22)` | — | Purple glow shadow |
| `--radius-sm/md/lg/xl` | `8/14/20/28px` | — | Border radii |
| `--transition` | `0.3s ease` | — | Default transition |

### Theme System
- Toggle via `data-theme="light|dark"` on `<html>`
- Persisted in `localStorage` key `"portfolio-theme"` (main) / `"blog-theme"` (blog)
- Toggle button: `.theme-pill-btn` with sliding `.theme-pip` dot
- Default: `light` on main portfolio; `dark` on blog pages

### Typography
- **Font:** Poppins (Google Fonts) — weights 100–900
- **Monospace accents:** `'Courier New', monospace` — used for labels, tags, code
- **Body size:** 16px, weight 300, line-height 1.7

### Visual Layers (fixed, z-index 0)
- `.mesh-bg` — radial gradient ambient light (purple top-left, teal top-right)
- `.grain-overlay` — SVG fractalNoise texture (opacity ~0.35 dark / 0.12 light)
- `#hero-canvas` — particle network animation on hero section only

---

## 4. Main Portfolio Page (`index.html`)

### Sections (in order, all single-page)

| Section | ID | Background | Description |
|---|---|---|---|
| Navbar | — | `--nav-bg` (sticky) | Logo + nav links + theme toggle |
| Hero | `#welcome-hero` | Background photo + dark overlay | Name, typing effect, stats bar, CV buttons, quick links |
| Signature Quote | `#signature-quote` | `--bg2` | "Everything's A Trade-Off" with animated underline |
| About | `#about` | `--bg` | Bio text + profile photo + social icons |
| Education | `#education` | `--bg2` | Horizontal timeline cards |
| Skills | `#skills` | `--bg` | Animated progress bars (2 columns) |
| Tech Roadmap | `#roadmap` | `--bg2` | SVG bezier node map (6 tiers) |
| Experience | `#experience` | `--bg2` | Vertical timeline (7 jobs) |
| Journey | `#portfolio` | `--bg` | Photo gallery grid (career/life moments) |
| Contact | `#contact` | `--bg2` | Formspree form + contact info |
| Footer | `#footer-copyright` | `--bg` | Year + copyright |

### Navbar Items
- `about`, `education`, `skills`, `experience`, `journey`, `contact` — smooth scroll
- `blog` → `blog/index.html`
- Theme toggle pill

### Hero Stats
| Stat | Value |
|---|---|
| Years Experience | 4+ |
| Projects Delivered | 7 |
| Industry Domains | 3 |
| Tech Companies | 2 |

### CV Buttons
- **View CV** — opens inline iframe (`CV_MIDDLE_JAVA_NGUYENQUANGNIEN.pdf`)
- **Close CV** — hides iframe
- **Download CV** — direct download

---

## 5. Design Components

### `.fade-in-section`
- On scroll into view (IntersectionObserver, threshold 0.1)
- Reveals with 3D: `perspective(1000px) rotateX(6deg) translateY(32px)` → `rotateX(0)`
- `.section-heading.fade-in-section h2::after` — underline animates from width 0 → 52px

### `.section-tag-label`
- Monospace label above each section heading
- Format: `// LABEL` (pseudo `::before` adds `//`)
- Color: `--teal`, animated shimmer

### `.tech-tag`
- Small pill badges on experience cards
- Background: `--primary-dim`, color: `--primary`, border: purple tinted
- Font: Courier New monospace

### `.timeline-content` (experience cards)
- Glass card: `--card-bg`, backdrop-filter blur
- 3D mouse-track tilt on hover (JS: max ±3deg X/Y)
- Hover: border brightens, box-shadow appears

### `.isotope .item` (journey grid)
- Hover: 3D tilt (max ±6deg, JS-driven), overlay fades in
- Overlay: purple/dark gradient with text label

### Tech Roadmap Nodes (`.rm-node`)
- 3 levels: `.rm-expert` (purple), `.rm-proficient` (teal), `.rm-learning` (dim)
- SVG bezier lines connecting tiers, animated on scroll
- Tooltip via `data-tooltip` attribute
- 6 tiers: Java → Spring ecosystem → Data layer → Integration → DevOps → Modern/Soft skills

### Progress Bars
- Triggered by `.appear()` (jquery.appear)
- Width set from `aria-valuenow` attribute
- Staggered transition-delay per bar index

---

## 6. JavaScript Features (`assets/js/custom.js`)

| Feature | How |
|---|---|
| Theme toggle | `toggleTheme()`, saves to localStorage |
| Scroll-to-top | jQuery, shows after 600px scroll |
| Smooth scroll | jQuery easing `easeInOutExpo` |
| Progress bars | jquery.appear + width animation |
| Hero canvas | Canvas API particle network (72 particles, mouse interact) |
| Typing effect | Custom typewriter — 4 phrases, 90ms type / 45ms delete |
| Fade-in sections | IntersectionObserver, threshold 0.1 |
| PDF viewer | Toggle iframe src on/off, Escape key closes |
| Contact form | Fetch POST to Formspree `xeoegbbw`, no page reload |
| Roadmap SVG | Bezier paths drawn on load, animated with strokeDashoffset on scroll |
| 3D tilt cards | mousemove → perspective rotateX/Y, mouseleave resets |
| Signature quote | IntersectionObserver adds `.quote-visible` class (threshold 0.3) |
| Footer year | Auto-filled from `new Date().getFullYear()` |

---

## 7. Contact

| Channel | Value |
|---|---|
| Email | quangnien24@gmail.com |
| Phone | 0855-586-358 |
| Location | Ho Chi Minh City, Vietnam |
| LinkedIn | `linkedin.com/in/niên-nguyễn-quang-12871124a/` |
| GitHub | `github.com/quangnien` |
| Facebook | `facebook.com/quangnien0911/` |
| YouTube | `youtube.com/@quangnienspring1091` |
| Instagram | `instagram.com/qnien_0911` |
| Form backend | Formspree form ID `xeoegbbw` |

---

## 8. Experience Timeline (7 entries)

| Period | Title | Company | Project | Tech |
|---|---|---|---|---|
| 2025 – Present | Java Software Engineer | Amaris Consulting | Fintech Platform (confidential) | Java, Spring Boot, Microservices |
| Mar–May 2025 | Java Software Engineer | Smartee Vina | KimFund (fund cert & investment) | Java, Spring Boot, Spring Security, PostgreSQL |
| Aug 2024–Mar 2025 | Java Backend Developer | Smartee Vina | MES (Manufacturing Execution System) | Java, Spring Boot, JPA/Hibernate, MySQL |
| Mar–Aug 2024 | Java Software Engineer | Smartee Vina | FLAT (Franchise Platform) | Java, Spring Boot, PostgreSQL, Microservices |
| Aug 2023–Mar 2024 | Java Software Engineer | Smartee Vina | SSL (certificate sales platform) | Java, Spring Boot, Spring Security, PostgreSQL |
| Jun 2022–Apr 2023 | Java Software Engineer | UNIT Company | RTP for ACH System (HSBC/Samsung) | Java, Spring Boot, Apache Kafka, PostgreSQL |
| Jan–May 2022 | Java Software Engineer | UNIT Company | Web-Admin 4.0 (legacy migration) | Java, Spring MVC, Spring Boot, Oracle DB |

---

## 9. Blog System

### Blog Landing (`blog/index.html`)
- Separate CSS: `blog/blog.css` (tokens mirrored from `style.css`)
- Theme stored in `localStorage` key `"blog-theme"` (default: dark)
- Grid of `.blog-card` elements linking to individual posts

### Blog Posts

| Slug | Title | Lang | Read time | Topics |
|---|---|---|---|---|
| `prompt-engineering-roadmap/` | Prompt Engineering Roadmap — Từ Zero Đến Hero | Vietnamese | ~45 min | AI/LLM, Zero-shot, Few-shot, CoT, RAG, ReAct, DSPy, LLMOps, Spring AI |
| `everything-trade-off/` | Everything's A Trade-Off | Vietnamese intro | ~15 min | System Design, CAP Theorem, Architecture philosophy, Architect mindset |
| `docker-toan-tap/` | Docker Toàn Tập — Từ Zero Đến Production | Vietnamese | ~40 min | Docker, DevOps, CI/CD, Security, Multi-platform |
| `postgresql-indexing/` | PostgreSQL Indexing Complete Reference Guide | Vietnamese intro | ~30 min | B-Tree, Hash, GiST, GIN, BRIN, EXPLAIN ANALYZE, Bitmap Scan |
| `loose-coupling-spring-boot/` | Loose Coupling — Xương sống của backend | Vietnamese | ~25 min | IoC, DIP, DI, IoC Container, Spring internals, Mockito |

### Blog Post Layout (individual posts)
- Each post has its own HTML file
- Uses `blog.css` for shared styles
- Fixed bottom navigation bar with prev/next post links (glass morphism)
- Reading progress bar (`#reading-progress`) at top of viewport
- Posts contain interactive diagrams/visualizations (HTML/CSS/JS animations)

---

## 10. Education

| Period | Institution | Degree/Level |
|---|---|---|
| 2016–2019 | Le Quy Don Gifted High School (Phan Rang, Ninh Thuan) | Mathematics — Gifted Programme |
| 2019–2024 | Posts and Telecommunications Institute of Technology (PTIT), HCM | B.Eng Software Technology — Very Good (Distinction) |

---

## 11. Skills (progress bars)

**Backend & Architecture:**
- Java: 78%
- Spring Boot: 78%
- Spring Security: 72%
- Microservices / REST API: 73%
- SQL / PostgreSQL / MySQL: 68%
- Apache Kafka / Redis: 60%

**Workflow, Tools & Languages:**
- Git / Version Control: 82%
- Agile / Scrum: 75%
- AI Dev Tools (Copilot, ChatGPT): 72%
- Maven / Gradle: 72%
- Docker / DevOps: 62%
- English — B2 Level: 70%

---

## 12. Key Conventions & Patterns

- **No build tool** — direct HTML/CSS/JS, no npm, no bundler
- **Bootstrap 3** (not 4/5) + Bootsnav for navbar
- **jQuery** available globally (used for sticky, smooth scroll, progress bars)
- **Sections alternate** `--bg` / `--bg2` backgrounds
- **All `a` tags** have `display: inline-block` from base reset — override if needed
- **Glass cards** use `backdrop-filter: blur(12px)` + `--card-bg` background
- **Section headings** always use `.section-tag-label` + `<h2>` pattern + `.fade-in-section`
- **Blog posts** each have their own styles embedded or via `blog.css`
- **Meta theme-color** is updated dynamically on theme toggle
- **Social links** always have `target="_blank" rel="noopener noreferrer"` and `aria-label`

---

## 13. URLs & Assets

| Asset | Path |
|---|---|
| Main profile photo | `assets/images/about/avt-muagiay2.jpg` |
| Hero background | `assets/images/about/welcome-tang17.jpg` |
| Favicon | `assets/logo/man.png` |
| Primary CV PDF | `assets/download/CV_MIDDLE_JAVA_NGUYENQUANGNIEN.pdf` |
| Live URL | `https://quangnien.github.io/prsn/` |
| Canonical | `https://quangnien.github.io/prsn/` |

---

## 14. Things to Watch Out For

1. **Blog CSS is separate** (`blog/blog.css`) and must be kept in sync with `style.css` tokens manually
2. **Bootstrap 3 grid** — column classes are `col-sm-*`, `col-md-*`, `col-xs-*`
3. **jQuery is loaded last** (before `custom.js`) — don't use ES6 modules
4. **3D transforms** use `perspective(...)` inline — CSS and JS both set transforms; JS clears on mouseleave
5. **Roadmap SVG lines** are redrawn on resize — changes to `.rm-tier`/`.rm-node` layout require re-checking `drawLines()`
6. **Theme toggle** on blog pages uses a different localStorage key than the main portfolio
7. **Contact form** uses Formspree (no server) — form action is hardcoded `https://formspree.io/f/xeoegbbw`
8. **Progress bar** width is read from `aria-valuenow` on `.progress-bar` — update both the attribute AND the display `<h3>` text
9. **Particle canvas** is always running on the hero — heavy on low-end devices; don't add more canvases
10. **`.nojekyll`** is required for GitHub Pages to serve files with underscores/dots correctly
