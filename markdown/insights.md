# Page Blueprint: Intelligence Hub
**Goal:** Prove technical depth and stay top-of-mind for AI/MERN trends.

---

## 1. Hero Section: The "Live Scan"
**Component:** `InsightsHero`
**Style:** Minimalist. Typewriter effect mimics a terminal output.

* **Main Header:** `Driplare_Intelligence_v2.0`
* **Sub-header:** Our internal research on AI Agents, MERN Architecture, and Automated Market Intelligence.
* **Featured Title (Typewriter):** This should display the latest post title with a cursor `_` at the end.
* **Color Tone:** White background with Carbon Black text.

---

## 2. The Search & Filter Bridge
**Component:** `SearchInterface`
**Style:** 1px black border around the input. Monospace labels.

* **Placeholder:** `> Search_Database...`
* **Categories (Filter Tags):** `[ AI_AGENTS ]` `[ WORKFLOW_ENGINEERING ]` `[ MERN_SCALING ]` `[ DATA_STRATEGY ]`

---

## 3. Featured Insight (The "Master File")
**Component:** `FeaturedPost`
**Style:** Instead of a full-image background, use a "Split Schematic" view.

* **Left (Data):** Category, Date, Read Time, and "Impact Score."
* **Right (Visual):** A grayscale image with a 10% Orange "Glitch" or "Scan" overlay.
* **Design:** Add "Corner Brackets" to the image to make it look like a technical view-finder.

---

## 4. The Intelligence Grid (The "Logs")
**Component:** `PostGrid`
**Style:** Cards look like folders or technical documents.

* **Card UI:** No rounded corners (square edges for an industrial look). 1px border.
* **Meta-Information:** Every card should display the tech stack discussed in the article (e.g., `STACK: n8n, OpenAI, MongoDB`).
* **Interaction:** On hover, the 1px border turns Safety Orange and the card "lifts" by 4px.

---

## 5. Insight Detail View: "Deep Documentation"
**Component:** `PostDetail`
**Style:** Highly readable prose with "Technical Sidebars."

* **Sidebar:** A sticky table of contents on the left.
* **Callouts:** "Engineer's Notes" boxes (Gray background) for complex technical deep-dives within the article.
* **CTA:** Each article ends with a project-specific CTA (e.g., "Ready to implement this AI logic? [Book a Call]").