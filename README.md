# Nova Properties — Dubai Luxury Real Estate Portal (React + Vite)

A modern, high-performance **React 19 + Vite** web application built for **Nova Properties** (`https://novaproperties.vip/`), combining the content and brand identity of Nova Properties with the high-converting architectural design language from **Stage Properties** (`https://stageproperties.com/`) and **Golden Oak Properties** (`https://goldenoakproperties.com/`).

---

## 🏛️ React Architecture & Component Structure

```
├── dist/                          # Production-ready static output (npm run build)
├── public/                        # Static assets
├── src/
│   ├── components/
│   │   ├── TopBar.jsx             # Top bar with currency selector & unit switcher
│   │   ├── Header.jsx             # Sticky glassmorphism header & navigation
│   │   ├── MobileDrawer.jsx       # Mobile navigation drawer with slide animation
│   │   ├── Hero.jsx               # Hero with Stage Properties multi-tab search engine
│   │   ├── MarketTicker.jsx       # Live Dubai real estate market stats marquee
│   │   ├── StatsStrip.jsx         # 4 Key performance metrics (AED 2.4B+ volume, etc.)
│   │   ├── PropertyListings.jsx   # Curated properties grid with live filtering & currency
│   │   ├── PropertyModal.jsx      # Luxury property inspection modal with image gallery
│   │   ├── OffPlanSection.jsx     # Off-plan launches with payment plans & brochure triggers
│   │   ├── DeveloperAlliance.jsx  # Emaar, Nakheel, DAMAC, Sobha, Binghatti logos
│   │   ├── CommunitiesSection.jsx # Prime Dubai enclaves with yield stats & click-to-filter
│   │   ├── MortgageCalculator.jsx # Stage Properties interactive mortgage & DLD fee math
│   │   ├── WhyNova.jsx            # 4 institutional trust pillars (RERA, 12 years, etc.)
│   │   ├── AboutSection.jsx       # Story of James Whitfield & Level 14 DIFC Gate HQ
│   │   ├── AdvisorsSection.jsx    # Senior advisory board with direct Call & WhatsApp links
│   │   ├── TestimonialsSection.jsx# Client reviews with 4.9★ Google Verified badge
│   │   ├── ContactSection.jsx     # VIP consultation brief form with WhatsApp handover
│   │   ├── Footer.jsx             # Architectural footer with RERA registration & sitemap
│   │   └── FloatingActions.jsx    # Floating WhatsApp advisor button & toast alerts
│   ├── data/
│   │   └── propertiesData.js      # Centralized ES6 store with all listings & exchange rates
│   ├── App.jsx                    # Root component with centralized state management
│   ├── index.css                  # Bespoke luxury stylesheet adhering to Taste guidelines
│   └── main.jsx                   # React 19 entry point
├── index.html                     # Semantic HTML5 template with Schema.org JSON-LD
├── vite.config.js                 # Vite bundler configuration
├── package.json                   # Project manifest & scripts
├── vercel.json                    # 1-Click Vercel edge deployment config
├── netlify.toml                   # 1-Click Netlify deployment config
└── README.md                      # Documentation
```

---

## ⚡ Interactive Features

1. **Global Dynamic Currency Engine:** Real-time conversion across **AED (د.إ)**, **USD ($)**, **EUR (€)**, **GBP (£)**, and **INR (₹)**. All property prices, off-plan starting figures, and mortgage calculations update instantaneously.
2. **Measurement Unit Toggle:** Switch seamlessly between **Square Feet (sq. ft.)** and **Square Meters (m²)**.
3. **Stage Properties Multi-Tab Search Engine:** Tabbed search for **Buy Residential**, **Rent Luxury**, **Off-Plan Projects**, and **Commercial & DIFC** with live filtering by Area, Type, Bedrooms, and Budget.
4. **Interactive Mortgage & DLD 4% Calculator:** Real-time formula calculating monthly installments, loan amounts, interest, and Dubai Land Department transfer fees based on interactive sliders.
5. **Interactive Property Detail Modal:** Multi-photo gallery thumbnail switcher, comprehensive specifications, amenities checklist, and viewing request trigger.
6. **Off-Plan Developer Allocations:** Milestone payment plans (60/40, 70/30, 80/20) with official Emaar, Nakheel, DAMAC, Sobha, and Select Group allocations.
7. **Direct WhatsApp & Phone Handover:** Direct WhatsApp integration on every property card, off-plan development, advisor profile, and contact form submission.

---

## 🛠️ Local Development & Build Commands

```bash
# 1. Start local development server with hot-module reload (HMR)
npm run dev

# 2. Build production-optimized static bundle for hosting
npm run build

# 3. Preview production build locally
npm run preview
```

The production build is written to `dist/` in under 1 second.

---

## 🌐 1-Click Hosting Guide

### A. Deploy to Vercel (Recommended)
1. Push this folder to your GitHub / GitLab repository.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Vercel will automatically detect `vercel.json`, use `npm run build`, and serve `dist/` on edge CDN with automatic SSL.

### B. Deploy to Netlify
* **Option 1 (Git):** Connect your repository on [Netlify](https://www.netlify.com). It will read `netlify.toml` and deploy automatically.
* **Option 2 (Drag & Drop):** Run `npm run build` locally, then drag the generated `dist/` folder into Netlify Drop.

### C. Deploy to cPanel / Traditional Shared Hosting
1. Run `npm run build` locally.
2. Open the generated `dist/` folder.
3. Compress the contents of `dist/` into a `.zip` file.
4. Upload and extract into your hosting server's `public_html/` directory.
