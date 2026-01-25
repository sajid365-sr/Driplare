import { z } from "zod";

// Lead form data type
export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  platform: "Facebook Messenger" | "WhatsApp" | "Both";
  agentSlug: string;
}

// Zod schema for lead form validation
export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  platform: z.enum(["Facebook Messenger", "WhatsApp", "Both"], {
    required_error: "Please select a platform",
  }),
  agentSlug: z.string().min(1, "Agent slug is required"),
});

// Type for the validated lead data
export type ValidatedLeadData = z.infer<typeof leadFormSchema>;

// Response type for the server action
export interface LeadActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}