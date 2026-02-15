// types/case-study-types.ts

export type CaseStudyStatus = "draft" | "published";

export interface CaseContent {
  title: string;
  context: string;
  problem: string;
  solution: string;
  myApproach?: string; // The Strategy / Story
  failedAttempts?: string; // Challenges & what didn't work initially
  result: string;
  metric: string; // Primary headline metric e.g. "85% ROI in First Month"
  testimonial?: string;
  testimonialRole?: string; // e.g. "Founder, FashionHub"
}

export interface CaseStudy {
  id?: string;

  // ── Routing ──────────────────────────────────────────────────
  slug: string; // URL-safe unique identifier e.g. "ecommerce-ai-sales-agent"

  // ── Classification ───────────────────────────────────────────
  category: string; // e.g. "AI Agents" | "Workflow Automation" | "Web Development" | "AI Consulting"
  techTags: string[]; // e.g. ["n8n", "OpenAI GPT-4", "Meta API"]
  industry?: string; // e.g. "E-commerce" | "Healthcare" | "Real Estate"

  // ── Client Info ──────────────────────────────────────────────
  clientName?: string;
  clientLocation?: string; // e.g. "USA" | "UK" | "Bangladesh"
  clientLogo?: string; // Optional: client logo image URL (high trust signal)

  // ── Project Meta ─────────────────────────────────────────────
  projectDuration?: string; // e.g. "3 Weeks" | "2 Months"
  status: CaseStudyStatus; // "draft" | "published"
  featured: boolean; // Pin to top of grid regardless of date

  // ── Media ────────────────────────────────────────────────────
  heroImage?: string; // Cover image for the detail page hero
  videoReviewUrl?: string; // Client testimonial video (YouTube / Loom)
  dashboardVideoUrl?: string; // Solution demo video (YouTube / Loom)
  n8nDiagramUrl?: string; // Workflow diagram image
  gallery: string[]; // [image1_url, image2_url, ...] — min 2 recommended

  // ── Metrics ──────────────────────────────────────────────────
  beforeMetricValue?: number; // e.g. 40
  afterMetricValue?: number; // e.g. 1
  metricUnit?: string; // e.g. "hours/week" | "USD" | "%"
  roi?: string; // Headline ROI string e.g. "280%" (shown on card)
  secondaryMetric?: string; // e.g. "Saved $1,800/mo" — second key win

  // ── Localised Content ────────────────────────────────────────
  en: CaseContent;
  bn: CaseContent;

  // ── Timestamps ───────────────────────────────────────────────
  createdAt: string;
  updatedAt: string;
}

// ── Helper type for card display (subset of CaseStudy) ───────────
export type CaseStudyCard = Pick<
  CaseStudy,
  | "id"
  | "slug"
  | "category"
  | "techTags"
  | "clientName"
  | "clientLocation"
  | "clientLogo"
  | "industry"
  | "projectDuration"
  | "beforeMetricValue"
  | "afterMetricValue"
  | "metricUnit"
  | "roi"
  | "secondaryMetric"
  | "featured"
  | "en"
  | "bn"
>;

// ── Category constants — keep in sync with your DB values ────────
export const CASE_STUDY_CATEGORIES = [
  "AI Agents",
  "Workflow Automation",
  "Web Development",
  "AI Consulting",
] as const;

export type CaseStudyCategory = (typeof CASE_STUDY_CATEGORIES)[number];
