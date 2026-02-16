// types/marketplace.ts
// ─────────────────────────────────────────────────────────────────────────────
// Re-exports Agent types + adds Automation, Website, Lead types
// ─────────────────────────────────────────────────────────────────────────────

// ── Re-export Agent types (keep existing file intact) ─────────────────────────
export type { Agent, AgentContent, ProcessedAgent } from "./agent-marketplace";
export { AGENT_CATEGORIES } from "./agent-marketplace";

// ── Automation ────────────────────────────────────────────────────────────────
export interface AutomationContent {
  name: string;
  description: string; // short — card
  fullDescription: string; // long — detail
  features: string[];
  useCases: string[];
  howItWorks?: string;
}

export interface AutomationProduct {
  id: string;
  slug: string;
  price: number;
  priceLabel?: string;
  category: string;
  platform: string[];
  techStack: string[];
  tags: string[];
  difficulty: "Easy" | "Medium" | "Advanced";
  setupTime?: string;
  status: "active" | "inactive" | "coming-soon";
  featured: boolean;
  mainImage: string;
  gallery: string[];
  videoUrl?: string;
  diagramUrl?: string;
  rating: number;
  totalSales: number;
  en: AutomationContent;
  bn: AutomationContent;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ── Website Package ───────────────────────────────────────────────────────────
export interface WebsiteContent {
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  idealFor: string[];
  deliverables: string[];
}

export interface WebsiteProduct {
  id: string;
  slug: string;
  price: number;
  priceLabel?: string;
  category: string;
  techStack: string[];
  tags: string[];
  deliveryDays?: number;
  pages?: number;
  revisions?: number;
  support?: string;
  status: "active" | "inactive" | "coming-soon";
  featured: boolean;
  mainImage: string;
  gallery: string[];
  demoUrl?: string;
  videoUrl?: string;
  rating: number;
  totalSales: number;
  en: WebsiteContent;
  bn: WebsiteContent;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ── CRM Lead ──────────────────────────────────────────────────────────────────
export interface MarketplaceLead {
  id?: string;
  productId: string;
  productSlug: string;
  productType: "agent" | "automation" | "website";
  productName: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  businessType?: string;
  platform?: string;
  requirements?: string;
  status: "new" | "contacted" | "converted" | "closed";
  notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ── Unified product union type (for shared filter/search logic) ───────────────
export type MarketplaceProduct =
  | ({ productType: "agent" } & import("./agent-marketplace").Agent)
  | ({ productType: "automation" } & AutomationProduct)
  | ({ productType: "website" } & WebsiteProduct);

// ── Category constants ────────────────────────────────────────────────────────
export const AUTOMATION_CATEGORIES = [
  "All",
  "Facebook Automation",
  "WhatsApp Automation",
  "E-commerce",
  "CRM & Leads",
  "Email",
  "Data & Reporting",
] as const;
export type AutomationCategory = (typeof AUTOMATION_CATEGORIES)[number];

export const WEBSITE_CATEGORIES = [
  "All",
  "E-commerce",
  "Portfolio",
  "Business",
  "Landing Page",
  "SaaS",
  "Blog",
] as const;
export type WebsiteCategory = (typeof WEBSITE_CATEGORIES)[number];

export const BUSINESS_TYPES = [
  "E-commerce / Online Shop",
  "Restaurant / Food",
  "Agency / Freelancer",
  "Healthcare",
  "Real Estate",
  "Education",
  "SaaS / Tech",
  "Other",
] as const;

export const PLATFORMS = [
  "Facebook",
  "WhatsApp",
  "Facebook + WhatsApp",
  "Website",
  "Other",
] as const;

// ── Difficulty colour map (shared across cards) ───────────────────────────────
export const DIFFICULTY_META: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  Easy: {
    label: "Easy Setup",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  Medium: {
    label: "Medium",
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  Advanced: {
    label: "Advanced",
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
  },
};
