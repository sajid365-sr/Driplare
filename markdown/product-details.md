# Goal: Overhaul Agent Details Page for Maximum Conversion

I have provided all the component code. I want to update the Agent Details Page and its sub-components to look like a premium, high-ticket AI agency. 

## Key Improvements Required:

### 1. AgentDetailsPage (Main Wrapper)
- **Layout:** Use a cleaner grid. Ensure the background has a subtle "AI/Tech" mesh gradient.
- **Sticky CTA:** On mobile, add a sticky bottom bar with "Get Started" and the price, so the user can convert at any time while scrolling.
- **Language Logic:** Ensure `langContent` is used consistently across all child components for BN/EN support.

### 2. AgentHeader (The Hook)
- **Typography:** Use `font-black` and `tracking-tighter` for the name.
- **Social Proof:** Make the "Deployed" and "Rating" badges more prominent with subtle animations.
- **Value Proposition:** Add a "Success Rate" or "Efficiency Boost" mock badge (e.g., "99% Accuracy").
- **Visuals:** Add a "Live Demo" button that scrolls to the Media Gallery.

### 3. AgentPricing (The Closer)
- **Design:** Make the pricing card look like a "Premium Receipt".
- **Checklist:** Add a "What's included" list: 
    - Full Setup & Integration
    - 24/7 AI Automation
    - Human-in-the-loop fallback
    - Weekly Analytics Report
- **Urgency:** Add a small text: "Limited slots available for this month".

### 4. AgentFeatures (Benefits over Features)
- Instead of just a list, use a "Feature Card" with a hover effect.
- Use a "Glassmorphism" effect for the cards.
- Add a "Use Case" section or tab.

### 5. MediaGallery
- Ensure the YouTube embed is responsive and looks like a cinematic preview.
- Add a "zoom" effect on image thumbnails.

## Specific Task for Cursor:
Please refactor the following files based on these principles. Keep the logic for `LeadModal` and `getAgentBySlug` intact but transform the UI. 

- `app/agent-marketplace/[productId]/page.tsx`
- `components/agent-marketplace/AgentHeader.tsx`
- `components/agent-marketplace/AgentPricing.tsx`
- `components/agent-marketplace/AgentFeatures.tsx`
- `components/agent-marketplace/MediaGallery.tsx`

Ensure the code is clean, follows Tailwind CSS best practices, and uses Framer Motion for smooth entrances.