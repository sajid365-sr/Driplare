# Instruction: Implement High-Converting Lead Capture System for Agent Marketplace

## Context
I am building an AI Agent Marketplace. We need to implement a "Get Started" flow that avoids direct payment and focuses on lead generation, consultancy, and trust-building. The tech stack is Next.js (App Router), Prisma, MongoDB, Tailwind CSS, and Shadcn UI.

## Goal
Replace the direct purchase flow with a multi-step Lead Capture Modal that opens when a user clicks the "Get Started" button on the Agent Details page.

## 1. Database Schema Update
Add a `Lead` model to `schema.prisma` to store potential customer data:
- `id`: String (ObjectId)
- `name`: String
- `phone`: String
- `email`: String (optional)
- `platform`: String (e.g., Facebook, WhatsApp, Both)
- `agentSlug`: String (to track which agent they are interested in)
- `status`: String (default: "pending")
- `createdAt`: DateTime (default: now)

## 2. Types and Server Actions
- Create a `types/booking-types.ts` to define the Lead form data.
- Create a Server Action `lib/booking-action.ts`:
    - Implement a `createLead` function to save form data to MongoDB.
    - Add basic server-side validation using Zod.

## 3. UI/UX Workflow (Lead Modal)
Create a modern, responsive, and dual-language (English/Bengali) modal using `framer-motion` for smooth transitions.

### Step 1: Information Form
Capture user details with a clean, minimalist form:
- Fields: Full Name, WhatsApp Number (Required), Email (Optional), Targeted Platform (Dropdown: Facebook Messenger, WhatsApp, Both).
- Logic: Integrate with `i18next` for translation.

### Step 2: Choice Screen (The "Hybrid" Approach)
After form submission, show a "Success" state with two high-value action buttons:
1. **Button A (Primary):** "Chat with AI Expert (WhatsApp)". 
   - Action: Redirect to WhatsApp with a pre-filled message including their name and the agent name.
2. **Button B (Secondary):** "Book a Free Consultation".
   - Action: Link to a Calendly or Google Calendar booking page.

## 4. Design Guidelines
- **Modern Aesthetic:** Use glassmorphism or clean white cards with soft shadows.
- **Micro-interactions:** Add subtle loading states on the button and smooth slide-in animations for the modal.
- **Consistency:** Use the existing theme colors and typography of the marketplace.
- **Responsiveness:** Ensure the modal looks perfect on mobile devices (since many users will come from Facebook/mobile).

## 5. Integration
- Connect the "Get Started" button on the `AgentDetails` page to trigger this new `LeadModal`.
- Ensure the `agentSlug` is automatically passed to the form to track user intent.

## Implementation Rules
- DO NOT repeat code; use reusable Shadcn components (Input, Button, Dialog).
- Ensure the code is clean, well-commented, and follows Next.js best practices for Server Components vs Client Components.
- Use `lucide-react` for icons (WhatsApp icon, Calendar icon).