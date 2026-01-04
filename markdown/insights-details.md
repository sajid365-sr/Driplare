# Page Blueprint: Insight Detail
**Component:** `InsightDetailView`
**Vibe:** Documentation-heavy, minimalist, structured logic.

---

## 1. Top Navigation: The Breadcrumb
**Style:** Monospace font. Very subtle.
`> PROJECTS / INTELLIGENCE_HUB / [CURRENT_POST_TITLE]`

---

## 2. Hero Section: The Header & Spec-Sheet
**Style:** No full-screen background image. Instead, a clean 2-column header.

* **Left (Content):** * **Category Tag:** (e.g., `[ AI_LOGIC ]` in Orange)
    * **Headline:** Large, bold Montserrat font.
    * **Sub-headline:** A one-sentence summary of the "Technical Outcome."
* **Right (Specs):** A small bordered box containing:
    * `ARCHITECT: DRIPLARE_LABS`
    * `READ_TIME: 06_MIN`
    * `VERSION: 1.0.2`
    * `STACK: N8N, OPENAI, REDIS`

---

## 3. The Article Body: "The Logic Flow"
**Style:** Max-width 750px for readability. Using Inter (Regular).

### **[Feature: The "Engineer’s Note" Callout]**
**Design:** A gray-background box with an orange left-border. 
* **Use Case:** Use these for code snippets, math formulas, or deep-dives into specific AI prompts. 
* **Label:** `// ENGINEER'S_NOTE`

### **[Feature: Inline System Diagrams]**
**Design:** Technical flowcharts showing the logic discussed in the text.


### **[Feature: High-Contrast Code Blocks]**
**Design:** JetBrains Mono font. A dark background window with a "Copy to Clipboard" button in the corner.

---

## 4. The Sidebar: "System Context" (Desktop Only)
**Style:** Sticky sidebar on the right side of the screen.

* **Table of Contents:** Quick jump links to sections (The Problem, The Architecture, The Result).
* **Related Schematics:** 2 small thumbnails of other relevant case studies.
* **Newsletter Widget:** A minimalist "Join the Logic" email input.

---

## 5. Bottom Navigation: The Logic Loop
**Component:** `PostNavigation`

* **Previous:** `[ STEP_BACK: Previous_Article_Name ]`
* **Next:** `[ STEP_FORWARD: Next_Article_Name ]`

---

## 6. Footer CTA: The Project Bridge
**Style:** A large "Blueprint Card" that changes based on the post category.

* **Text:** "Interested in implementing this [Category] logic in your business?"
* **Button:** [Request a Technical Brief]