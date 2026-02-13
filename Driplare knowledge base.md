# Driplare — Project Knowledge Base

---

## 1. What is Driplare?

Driplare is a **Bangladeshi AI automation agency** that helps local businesses automate their workflows, sales, and operations using artificial intelligence. The company targets small-to-medium businesses (SMEs) in Bangladesh, particularly e-commerce owners, service businesses, and entrepreneurs who want to reduce manual work and grow revenue using AI tools.

The brand is positioned as a modern, tech-forward but approachable agency — technical enough to build complex solutions, but communicates in simple, client-friendly language so non-technical business owners can understand and trust the service.

---

## 2. Business Plan

Driplare operates as a **B2B service agency** with a product-led growth model:

- **Primary Revenue**: One-time project/setup fees + monthly maintenance/retainer
- **Target Market**: Bangladeshi SMEs, e-commerce stores, service businesses, freelancers
- **Geographic Focus**: Bangladesh (with international potential)
- **Sales Model**: Free consultation → free trial → paid retainer
- **Trial Strategy**: 1-2 week free trial for AI Agent service before commitment
- **Pricing Philosophy**: Transparent, no hidden costs. Starting prices shown publicly.
- **Support Channels**: WhatsApp-first support (preferred by Bangladeshi clients)
- **Future Direction**: Expand from AI automation into full-stack web development solutions

---

## 3. Solutions (Services)

### Currently Built / Active:

#### 3.1 AI Agent (Solutions Page: `/solutions/ai-agents`)

Custom AI-powered chatbots deployed on WhatsApp, Facebook, Instagram, Telegram, and websites. Automates customer service, order collection, product recommendations, and FAQs.

- **Pricing**: ৳500–1,000/month (after setup)
- **Setup Time**: 48–72 hours
- **Trial**: 1–2 weeks free
- **Order Collection**: Auto-saves to Google Sheets
- **Languages**: Bangla, English, Banglish

#### 3.2 Web Development (Solutions Page: `/solutions/web-development`)

Full-stack web development covering:

- Custom E-commerce (Laravel/Next.js): ৳40K–80K
- WordPress/WooCommerce E-commerce: ৳15K–30K
- Business/Corporate Website: ৳20K–40K
- Landing Page: ৳8K–15K
- Portfolio Website: ৳10K–20K
- Custom Dashboard/Web App: ৳50K–150K
- Blog/Content Website: ৳12K–25K
- Booking/Service Website: ৳25K–45K

#### 3.3 Workflow Automation _(planned)_

n8n-based workflow automation for business processes.

#### 3.4 Data Scraping _(planned)_

Automated data collection and processing services.

#### 3.5 AI Consultancy _(planned)_

Strategic advice on AI adoption, readiness assessments for companies.

### Navigation: Solutions are accessible via a **Solutions dropdown** in the main navigation.

---

## 4. Website Pages

| Page                     | Route                        | Status                    |
| ------------------------ | ---------------------------- | ------------------------- |
| Homepage                 | `/`                          | ✅ Complete (10 sections) |
| AI Agent Solution        | `/solutions/ai-agents`       | ✅ Complete (8 sections)  |
| Web Development Solution | `/solutions/web-development` | 🔨 In Progress            |
| Pricing                  | `/pricing`                   | ✅ Exists                 |
| Case Studies             | `/case-studies`              | Planned                   |
| Marketplace              | `/marketplace`               | Exists in nav             |
| Insights (Blog)          | `/insights`                  | Exists in nav             |
| Contact                  | `/contact`                   | Exists                    |
| Login                    | `/login`                     | Exists (Clerk auth)       |
| Dashboard                | `/dashboard`                 | Auth-protected            |

### Navigation Structure:

```
Home | Solutions ▾ | Case Studies | Marketplace | Pricing | Insights | Login | [Get Started]
```

---

## 5. Technology Stack

### Framework & Runtime

| Package      | Version | Purpose                                 |
| ------------ | ------- | --------------------------------------- |
| `next`       | Latest  | Full-stack React framework (App Router) |
| `react`      | Latest  | UI library                              |
| `react-dom`  | Latest  | DOM rendering                           |
| `typescript` | Latest  | Type safety                             |
| `node.js`    | Runtime | Server-side execution                   |

### Styling

| Package                          | Version | Purpose                              |
| -------------------------------- | ------- | ------------------------------------ |
| `tailwindcss`                    | Latest  | Utility-first CSS framework          |
| `tailwind-merge`                 | Latest  | Merge Tailwind classes conditionally |
| `tailwind-animate`               | Latest  | Animation utilities for Tailwind     |
| `class-variance-authority` (cva) | Latest  | Component variant management         |
| `clsx`                           | Latest  | Conditional class names              |

### UI Components

| Package        | Version | Purpose                                          |
| -------------- | ------- | ------------------------------------------------ |
| `shadcn/ui`    | Latest  | Component library (Button, Slider, Dialog, etc.) |
| `@radix-ui/*`  | Latest  | Headless UI primitives (used by shadcn)          |
| `lucide-react` | Latest  | Icon library                                     |

### Animation

| Package         | Version | Purpose                           |
| --------------- | ------- | --------------------------------- |
| `framer-motion` | Latest  | Animations, transitions, gestures |

### Authentication

| Package         | Version | Purpose                          |
| --------------- | ------- | -------------------------------- |
| `@clerk/nextjs` | Latest  | Authentication & user management |

### Database & ORM

| Package          | Version | Purpose                           |
| ---------------- | ------- | --------------------------------- |
| `prisma`         | Latest  | ORM (schema, migrations, queries) |
| `@prisma/client` | Latest  | Prisma database client            |
| `mongodb`        | Latest  | MongoDB driver                    |

### Internationalisation

| Package                        | Version | Purpose                              |
| ------------------------------ | ------- | ------------------------------------ |
| `i18next`                      | Latest  | Core i18n framework                  |
| `react-i18next`                | Latest  | React bindings for i18next           |
| `i18next-resources-to-backend` | Latest  | Dynamically import JSON locale files |

### HTTP & API

| Package | Version | Purpose     |
| ------- | ------- | ----------- |
| `axios` | Latest  | HTTP client |

### Backend / Automation

| Tool  | Purpose                                                      |
| ----- | ------------------------------------------------------------ |
| `n8n` | Workflow automation platform powering the AI chatbot backend |

### Deployment & Infrastructure

| Tool          | Purpose                       |
| ------------- | ----------------------------- |
| Vercel        | Frontend deployment (Next.js) |
| MongoDB Atlas | Cloud database                |
| Hostinger     | Domain & alternative hosting  |
| Cloudflare    | CDN & DNS                     |

---

## 6. Dual Language Support System

### Languages Supported

- **English** (`en`) — default
- **Bangla / Bengali** (`bn`)

> **Note**: Technical words in Bangla translations are kept in English (e.g., "AI Agent", "website", "landing page", "dashboard") as they are not commonly translated in Bangladeshi tech usage.

### Implementation

**Library**: `react-i18next` + `i18next`

**Language detection order**:

1. `localStorage` (user preference saved)
2. Browser language (`navigator.language`)
3. Falls back to `en`

**Language switcher**: Present in the navbar as a flag + language code toggle (`EN` / `BN`).

### JSON File Locations

```
/public/locales/
  ├── bn/
  │   ├── AIAgentPage.json         ← AI Agent solution page (Bangla)
  │   ├── caseStudiesPage.json     ← Case Studies page (Bangla)
  │   ├── common.json              ← Navbar, footer, shared UI text (Bangla)
  │   ├── homePage.json            ← Homepage sections (Bangla)
  │   ├── marketPlacePage.json     ← Marketplace page (Bangla)
  │   ├── pricingPage.json         ← Pricing page (Bangla)
  │   └── webDevelopmentPage.json  ← Web Development page (Bangla)
  |   |__ othersPage.json          ← Others Page (Bangla)
  └── en/
      ├── AIAgentPage.json         ← AI Agent solution page (English)
      ├── caseStudiesPage.json     ← Case Studies page (English)
      ├── common.json              ← Navbar, footer, shared UI text (English)
      ├── homePage.json            ← Homepage sections (English)
      ├── marketPlacePage.json     ← Marketplace page (English)
      ├── pricingPage.json         ← Pricing page (English)
      └── webDevelopmentPage.json  ← Web Development page (English)
      └── othersPage.json          ← Others page (English)
```

### File Naming Convention

Each page has **one JSON file per language** (not one file per section):

| Page            | English File              | Bangla File               |
| --------------- | ------------------------- | ------------------------- |
| Homepage        | `homePage.json`           | `homePage.json`           |
| AI Agent        | `AIAgentPage.json`        | `AIAgentPage.json`        |
| Web Development | `webDevelopmentPage.json` | `webDevelopmentPage.json` |
| Pricing         | `pricingPage.json`        | `pricingPage.json`        |
| Case Studies    | `caseStudiesPage.json`    | `caseStudiesPage.json`    |
| Marketplace     | `marketPlacePage.json`    | `marketPlacePage.json`    |
| Shared UI       | `common.json`             | `common.json`             |

> All sections for a given page are **nested inside a single JSON file**, not split into multiple files.

### JSON Key Path Structure

All translation keys follow a **nested namespace pattern**:

**Examples**:

```json
"hero.title"
"features.mainFeatures"
"faq.questions"
"hero.badge"
"websiteTypes.types"
"techStack.categories"
```

### Usage in Components

Each component specifies its **page namespace** directly in `useTranslation()`:

```tsx
import { useTranslation } from "react-i18next";

// AI Agent page components
export function AIAgentHero() {
  const { t } = useTranslation("AIAgentPage");

  // Simple string
  const title = t("hero.title");

  // Array of objects
  const steps = t("howItWorks.steps", {
    returnObjects: true,
  }) as Array<{ title: string; description: string }>;

  // Simple array
  const items = t("faq.questions", {
    returnObjects: true,
  }) as string[];

  return <h1>{title}</h1>;
}

// Web Development page components
export function WebDevHero() {
  const { t } = useTranslation("webDevelopmentPage");

  const title = t("hero.title");

  return <h1>{title}</h1>;
}

// Shared/common components (navbar, footer, etc.)
export function Navbar() {
  const { t } = useTranslation("common");

  return <nav>{t("nav.home")}</nav>;
}
```

> **Rule**: The namespace passed to `useTranslation()` must exactly match the JSON filename (without `.json`) inside `/public/locales/{lang}/`.

### i18next Initialization (`i18n.ts`)

```ts
"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../public/locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    fallbackLng: "en",
    ns: ["common", "homePage", "pricingPage", "caseStudiesPage"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

export default i18next;
```

> **Note**: Uses `i18next-resources-to-backend` for dynamic imports instead of `i18next-http-backend`. New page namespaces (e.g., `AIAgentPage`, `webDevelopmentPage`, `marketPlacePage`) should be added to the `ns` array as they are created.

---

## 7. Primary Colors

```css
/* CSS Variables (defined in globals.css) */
--primary: #7c3aed /* Violet  — main brand, CTAs, icons */ --secondary: #3b82f6
  /* Blue    — supporting elements, links */ --accent: #10b981
  /* Emerald — success, checkmarks, savings */
  /* Dark mode versions also defined via HSL variables */;
```

| Role        | Color              | Hex       |
| ----------- | ------------------ | --------- |
| Primary     | Violet             | `#7c3aed` |
| Secondary   | Blue               | `#3b82f6` |
| Accent      | Emerald            | `#10b981` |
| Destructive | Red                | `#ef4444` |
| Background  | Dark/Light (theme) | CSS var   |
| Foreground  | Dark/Light (theme) | CSS var   |
| Muted       | Subdued background | CSS var   |
| Border      | Subtle separator   | CSS var   |
| Card        | Card background    | CSS var   |

**Gradient Pattern** (used throughout):

```css
from-primary to-secondary        /* Primary gradient */
from-primary/10 via-secondary/10 to-accent/10  /* Subtle section bg */
from-primary/20 to-secondary/20  /* Icon backgrounds */
```

---

## 8. Design Structure

### Layout

- **Container**: `container mx-auto px-4 md:px-6` on all sections
- **Section Spacing**: `py-20` standard vertical padding
- **Max Widths**: `max-w-3xl` (text-only), `max-w-5xl` (two-col), `max-w-6xl` (grids), `max-w-7xl` (full grid)

### Section Anatomy (Standard Pattern)

```
Section
  └── Background (gradient or muted)
  └── Container
      └── Header (badge + h2 + subtitle) — centered
      └── Content (grid/list/interactive)
      └── CTA (optional, centered at bottom)
```

### Badge Pattern (Section Labels)

```tsx
<div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
  <Icon className="w-4 h-4 text-primary" />
  <span className="text-sm font-semibold text-primary">Badge Text</span>
</div>
```

### Card Pattern

```tsx
<div className="bg-card border-2 border-border rounded-3xl p-6 hover:border-primary/50 transition-all group">
```

### Button Patterns

- **Primary**: `bg-primary hover:bg-primary/90 text-primary-foreground font-bold`
- **Outline**: `border-2 font-bold`
- **With arrow**: `<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />`

### Typography

- **H1 (Hero)**: `text-4xl md:text-5xl lg:text-6xl font-black`
- **H2 (Section)**: `text-3xl md:text-5xl font-black`
- **H3 (Card)**: `text-xl md:text-2xl font-bold`
- **Body**: `text-muted-foreground leading-relaxed`
- **Small/Label**: `text-sm font-semibold` or `text-xs font-bold`

### Grid Patterns

- **2-col**: `grid md:grid-cols-2 gap-8`
- **3-col**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- **4-col**: `grid grid-cols-2 md:grid-cols-4 gap-4`

---

## 9. Theme

### Mode

Supports **both light and dark mode** via CSS variables in `globals.css`.

Toggle: Available in the navbar (moon/sun icon).

### Dark Mode Implementation

All colors use **CSS custom properties** (not hardcoded hex):

```css
/* Example from globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  ...
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  ...
}
```

All Tailwind classes reference these variables:

- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `bg-muted`, `text-muted-foreground`
- `border-border`

### Visual Style

- **Rounded**: Heavy use of `rounded-2xl` and `rounded-3xl` (modern, friendly)
- **Shadows**: `shadow-lg shadow-primary/20` (colored shadows)
- **Borders**: `border-2 border-border` default, `border-primary/30` on hover
- **Blur**: `blur-3xl` decorative background blobs

---

## 10. Global Rules

### i18next

- All user-facing text must come from translation files — **no hardcoded strings** in components
- Always pass the page namespace to `useTranslation()`: `const { t } = useTranslation("AIAgentPage")`
- Key path: `services.{ServiceName}.{sectionName}.{key}`
- Arrays use `{ returnObjects: true }` with TypeScript cast
- Both `en` and `bn` JSON files must be created for every page
- New namespaces must be added to the `ns` array in `i18n.ts`
- Technical terms in Bangla (AI, website, dashboard, etc.) stay in English

### Animations (Framer Motion)

- All sections use `whileInView` with `viewport={{ once: true }}`
- Standard entrance: `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`
- Stagger children: `transition={{ delay: index * 0.1 }}`
- Hover effects: `whileHover={{ scale: 1.05 }}` on interactive cards
- Spring animations for icons/circles: `transition={{ type: "spring" }}`

### Responsiveness

- **Mobile-first** approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- All grids collapse to single column on mobile
- Images hidden or resized on mobile where appropriate
- Touch-friendly tap targets (minimum 44px)

### Image Placeholders

- All images that require real assets use commented-out `<Image />` components
- Placeholder divs replace them with gradient backgrounds + icon
- Comment format:
  ```tsx
  {
    /*
    IMAGE PLACEHOLDER: [Description]
    Dimensions: [W x H]px
    Path: [/path/to/image.ext]
    Content: [What should be shown]
  */
  }
  ```

### Code Quality

- All components are `"use client"` where hooks/interactivity is used
- Icons imported from `lucide-react` only
- No inline styles except for `backgroundImage` patterns
- Shadcn UI components used for: Button, Slider, Dialog, Sheet, etc.
- No hardcoded colors — use CSS variable-based Tailwind classes only

### Section Structure Rules

- Every section has: badge pill → h2 → subtitle → content → optional CTA
- Sections alternate background: `bg-background` ↔ `bg-muted/30`
- Max content width never exceeds `max-w-7xl`
- CTAs always link to `/contact` (primary) or `/pricing` (secondary)

### Sales & Content Rules

- Language is always **simple, client-friendly** — no jargon
- Every feature explains **what it does for the client**, not how it works technically
- Prices are shown in **Bangladeshi Taka (৳)**
- Free trial / no-commitment messaging is emphasized throughout
- WhatsApp is the preferred support contact method

### Component File Naming

```
[section-name]-section.tsx    ← Standard sections
[page-name]-hero.tsx          ← Hero sections
[page-name]-faq-section.tsx   ← FAQ sections
[page-name]-simple-cta.tsx    ← CTA sections
```

### Translation File Naming

One file per page, per language. Named in **PascalCase** with `Page` suffix:

```
/public/locales/en/[PageName]Page.json
/public/locales/bn/[PageName]Page.json
```

Examples:

```
/public/locales/en/AIAgentPage.json
/public/locales/bn/AIAgentPage.json
/public/locales/en/webDevelopmentPage.json
/public/locales/bn/webDevelopmentPage.json
```

All sections for a page are nested inside that single file — never split across multiple files.
