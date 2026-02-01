export type LeadStatus = 
  | "new" 
  | "contacted" 
  | "qualified" 
  | "proposal-sent" 
  | "paid" 
  | "completed" 
  | "closed-lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  businessType?: string;
  platform: string; // messenger, whatsapp, both
  requirements?: string;
  
  // Agent info
  agentSlug: string;
  agentName: string;
  
  // Tracking
  source: string; // "product-page", "marketplace", "hero-cta", "bottom-cta"
  status: LeadStatus;
  notes: string[];
  
  // Timestamps
  createdAt: Date | string;
  lastContactedAt?: Date | string;
  qualifiedAt?: Date | string;
  paidAt?: Date | string;
  completedAt?: Date | string;
  updatedAt: Date | string;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  whatsapp: string;
  businessType?: string;
  platform: string;
  requirements?: string;
  agentSlug: string;
  agentName: string;
  source: string;
}

export interface UpdateLeadInput {
  id: string;
  status?: LeadStatus;
  notes?: string[];
  lastContactedAt?: Date;
  qualifiedAt?: Date;
  paidAt?: Date;
  completedAt?: Date;
}