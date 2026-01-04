🚀 Driplare Migration Blueprint: Vite to Next.js (Root Level)
Context: Converting the existing "Driplare" project from Vite React to Next.js 14+ (App Router) while integrating MongoDB, Prisma, and Dual Language support.

🎯 Core Objectives
Preserve Design: Maintain 100% of the current "Architectural" and "Premium" look. No changes to CSS, spacing, or typography.

No src/ Folder: All core directories (app/, components/, lib/, prisma/, public/) must reside in the Root Directory.

Database: Use MongoDB Atlas via Prisma ORM.

Internationalization (i18n): Support English (Default) and Bangla.

Tech Stack: Next.js (App Router), Tailwind CSS, ShadcnUI, Framer Motion, Prisma, MongoDB.

/ (Root)
├── app/ # Next.js App Router (Layouts, Pages, API)
├── components/ # UI Components (ShadcnUI + Custom)
├── lib/ # Prisma Client, Utils, i18n Config
├── prisma/ # Schema.prisma
├── public/ # Assets and /locales (JSON translations)
├── styles/ # globals.css
├── .env # MongoDB URI & Secrets
├── tailwind.config.js # Preservation of existing branding colors
└── tsconfig.json # Paths mapping (@/_ -> ./_)

🛠 Phase 1: Environment & Dependencies
Initialize Next.js: Setup Next.js 14+ in the current root.

Update Configs: Adjust tailwind.config.js and tsconfig.json to point to root folders (not src/).

Install Essentials: npm install prisma @prisma/client i18next react-i18next i18next-resources-to-backend framer-motion lucide-react clsx tailwind-merge

🎨 Phase 2: Style & Layout Preservation
Global Styles:

Move the current index.css (from the Vite project) to styles/globals.css.

Ensure all existing Tailwind @layer and custom CSS rules are preserved without modification.

Google Fonts Setup:

Configure next/font/google in app/layout.tsx.

English: Montserrat

Bangla: Hind Siliguri

Apply these fonts as CSS variables (--font-montserrat, --font-hind) so the existing Tailwind classes continue to work perfectly.

Layout Integration (Header & Footer):

DO NOT RECONSTRUCT: Locate the existing Header (with mobile menu logic) and Footer components from the Vite project.

Move them to the root /components/ directory.

Direct Migration: Wrap the children of app/layout.tsx with these exact existing components.

Preserve Logic: Ensure the mobile menu state, transitions, and responsiveness remain exactly as they are in the current version. Use 'use client' at the top of these component files if they use useState or useEffect.

🌍 Updated Phase 3: Dual Language (English/Bangla) Setup
JSON Assets:

Create public/locales/en/common.json and public/locales/bn/common.json.

Structure the JSON files with clear keys (e.g., "hero_title": "...", "nav_services": "...").

Strict Extraction:

Instruction to AI: Scrutinize all components and move every hardcoded string (titles, paragraphs, button labels, image alt texts) into the JSON files.

Ensure no Bangla text remains in the TSX files; all must be called via translation keys.

Language Strategy (Persistence):

State Management: Use i18next with a Cookie or Local Storage strategy so that if a user selects Bangla and refreshes the page, it stays in Bangla.

HTML Attribute: Ensure the <html lang="en"> tag in layout.tsx dynamically changes to <html lang="bn"> based on the selected language (Critical for SEO and Screen Readers).

Language Switcher Component:

Create components/LanguageSwitcher.tsx using ShadcnUI Dropdown Menu.

Display language names clearly (e.g., "English" and "বাংলা").

Position it within the existing Navbar, ensuring it matches the current design perfectly.

Font Integration:

Automatically switch the CSS class between font-montserrat (English) and font-hind (Bangla) based on the active language to ensure the best readability.

💾 Phase 4: Database & Prisma (MongoDB)
Database Connection:

Provider: MongoDB.

Configuration: Initialize prisma/schema.prisma with provider = "mongodb".

Strict Schema Modeling:

User Model (Clerk Integration): Create a User model to sync with Clerk. Fields: id (ObjectId), clerkId (String, @unique), email (String, @unique), name (String?), imageUrl (String?), createdAt (DateTime).

ChatMessage Model: To store chatbot interactions. Fields: id, clerkId (String?, for logged-in users), sessionId (String, for guests), role (enum: user/assistant), content (String), vector (Float[], for Vector Search), createdAt.

Lead Model: For contact form submissions. Fields: id, name, email, phone?, serviceInterested, message, status (default: "PENDING"), createdAt.

Prisma Client Singleton:

Set up a global Prisma client in lib/prisma.ts to prevent multiple active connections during Next.js Hot Reloading.

Backend Logic (API Routes):

Contact Handler: app/api/contact/route.ts to save form data to the Lead model.

Clerk Webhook: Create app/api/webhooks/clerk/route.ts to automatically sync user data from Clerk to MongoDB whenever a user signs up or updates their profile.

🚀 Phase 5: Component & Page Migration (Strict Conversion)
Direct Conversion (Copy-Paste Method): \* Convert existing Vite routes/pages into Next.js file-based routes (e.g., app/services/page.tsx, app/about/page.tsx).

Instruction to AI: Do not write new logic or change UI patterns. Copy the existing React component code and adapt it for the Next.js App Router.

No New Components: \* The AI must strictly avoid creating any new components or pages that do not exist in the current project.

The only exceptions are the components necessary for the Language Switcher (i18n) and Next.js specific files (like layout.tsx).

Directory Consistency: \* All converted components must be placed in the root /components/ folder.

All converted pages must be placed in the root /app/ folder.

Note: We are not using a /src/ directory. All folders (/app, /components, /lib, /public) must be at the root level.

Client/Server Directives: \* Identify components with interactivity (Framer Motion, Forms, Language Switcher) and add the 'use client' directive at the very top.

Keep static parts as Server Components by default.

Image Optimization: \* Carefully replace existing <img> tags with Next.js <Image /> components only where it doesn't break the CSS or layout. Preserve all existing className and styling.

⚠️ Critical Constraints
DO NOT modify the existing color palette or Tailwind custom values.

DO NOT rewrite the UI logic unless necessary for Next.js compatibility.

DO NOT create a src/ directory.

SEO: Ensure each page has a metadata object for title and description.
