/**
 * Form Types
 * Global type definitions for contact form submissions
 */

export interface ContactFormSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  details: string;
  status: "pending" | "replied" | "resolved" | "archived";
  response?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  service: string;
  details: string;
}

export interface UpdateSubmissionStatusData {
  status: "pending" | "replied" | "resolved" | "archived";
  response?: string;
}
