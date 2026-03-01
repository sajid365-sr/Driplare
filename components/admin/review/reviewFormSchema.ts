import { z } from "zod";

/**
 * Review Form Schema
 * Validation schema for creating/editing client reviews
 */
export const reviewFormSchema = z.object({
  // Client Information
  clientName: z.string().min(1, "Client name is required"),
  clientRole: z.string().min(1, "Designation is required"),

  reviewText: z
    .string()
    .min(20, "Review must be at least 20 characters")
    .max(500, "Review must not exceed 500 characters"),

  // Media
  clientPhoto: z.string().optional(),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),

  // Rating & Status
  rating: z.number().min(1).max(5),
  status: z.enum(["pending", "approved", "rejected"]),

  // Featured flag
  featured: z.boolean().optional(),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
