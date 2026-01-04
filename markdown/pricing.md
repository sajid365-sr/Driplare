# Page Blueprint: System Investment
**Goal:** Transparency, Tiered Value, and Lead Qualification.

---

## 1. Hero Section: The ROI Header
**Component:** `PricingHero`
**Style:** High-contrast white background with orange accents.

* **Headline:** Invest in Systems, **Not Just Software.**
* **Sub-headline:** We don't charge for hours; we charge for the value our systems create. Choose a plan that fits your current scale, or request a custom architectural quote.
* **Toggle Component:** [ Monthly Retainer | One-Time Setup ] 

---

## 2. The Core AI Agent Tiers (Productized)
**Component:** `PricingTable`
**Style:** 3-column grid. The middle card ("Business") has a 2px Orange border and a "Most Efficient" tag.

| Starter Agent | **Efficiency Pro** (Popular) | Enterprise Architect |
| :--- | :--- | :--- |
| **$X,XXX** / Setup | **$X,XXX** / Setup | **Custom** / Setup |
| 1 Custom AI Agent | 3 Interconnected Agents | Full AI Workforce |
| Basic Knowledge Base (RAG) | Deep Integration (CRM/Docs) | Custom MERN Dashboard |
| 7-Day Deployment | 14-Day Deployment | Priority Architecture |
| Email Support | Priority Slack Support | 24/7 System Monitoring |
| [Get Started] | [Engineer My Business] | [Book Consultation] |

---

## 3. Specialist Services (The "Starting From" Grid)
**Component:** `ServicePriceGrid`
**Style:** 2-column grid with minimalist "Blueprint" cards.
**Logic:** This handles your MERN and Scraping services which are hard to "Tier."

* **Workflow Automation (n8n):** Starting at **$X,XXX**. *Best for connecting fragmented apps.*
* **Data Scraping & Monitoring:** Starting at **$XXX** / mo. *Best for market intelligence.*
* **Custom MERN Development:** Starting at **$X,XXX**. *Best for unique business tools.*

---

## 4. The "Cost of Manual Work" Calculator (Interactive)
**Component:** `ROICalculator`
**Style:** A simple slider tool where users input their team size and average manual hours.
**Effect:** It calculates how much money they are *losing* by not automating, making your price look like a bargain.



---

## 5. Transparency & Running Costs (The Trust Builder)
**Component:** `TransparencyNote`
**Style:** Monospace font (JetBrains Mono) in a subtle gray box.

* **Note on API Costs:** "Our setup fees cover the architecture. Third-party API costs (OpenAI, Anthropic) and hosting are billed directly based on your usage to ensure no hidden markups."

---

## 6. FAQ: The Decision Closer
**Component:** `AccordionFAQ`

* **Q: Do you offer maintenance?**
    * **A:** Yes. We offer "System Oversight" retainers to ensure your AI stays updated as your business evolves.
* **Q: What if I need a custom stack?**
    * **A:** We specialize in MERN. If your requirements exceed our tiers, we provide a detailed 'Technical Specification' and a custom quote.

---

## 7. Final Call to Action
**Component:** `PricingCTA`

* **Headline:** Ready to buy back your time?
* **Button:** [Start Your Efficiency Audit]