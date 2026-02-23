// types/contact-types.ts

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  status: "new" | "contacted" | "qualified" | "converted" | "closed";
  source: "contact_page" | "whatsapp" | "email" | "other";
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface ContactFormResponse {
  success: boolean;
  error?: string;
  submissionId?: string;
}
