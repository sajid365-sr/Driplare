// Base Agent Content (Language-specific fields)
export interface AgentContent {
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits?: string[];
  howItHelps?: string;
}

// Main Agent Interface (MongoDB Schema)
export interface Agent {
  id: string;
  slug: string;
  price: number;
  rating: number;
  totalSales: number;
  category: string;
  mainImage: string;
  gallery: string[];
  videoUrl?: string;
  techStack: string[];
  difficulty: "Easy" | "Medium" | "Advanced";
  setupTime: string;
  status: "active" | "inactive" | "coming-soon";
  
  // Enhanced conversion fields
  guarantee?: string;
  includes?: string[];
  
  // Language content
  en: AgentContent;
  bn: AgentContent;
  
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Processed Agent (for marketplace listing with active language)
export interface ProcessedAgent {
  id: string;
  slug: string;
  category: string;
  price: number;
  rating: number;
  totalSales: number;
  mainImage: string;
  gallery: string[];
  videoUrl?: string;
  techStack: string[];
  difficulty: "Easy" | "Medium" | "Advanced";
  setupTime: string;
  status: "active" | "inactive" | "coming-soon";
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // Active language content
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits?: string[];
  howItHelps?: string;
}

// Categories
export const AGENT_CATEGORIES = [
  "All",
  "E-commerce Automation",
  "Customer Support",
  "Lead Generation",
  "Data Scraping",
  "Workflow Automation",
  "Content Creation",
  "Analytics & Reporting"
] as const;

export type AgentCategory = typeof AGENT_CATEGORIES[number];