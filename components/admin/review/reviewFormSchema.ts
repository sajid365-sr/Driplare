import * as z from "zod";

/**
 * Review Form Schema
 * Defines validation rules for creating and editing client reviews
 */
export const reviewFormSchema = z.object({
  // Client Information
  name: z.string().min(2, "Client name is required (min 2 characters)"),
  designation: z.string().min(2, "Designation is required"),
  company: z.string().min(2, "Company name is required"),

  // Review Content
  testimonialTitle: z
    .string()
    .min(5, "Title is required (min 5 characters)")
    .max(100, "Title is too long (max 100 characters)"),
  complement: z
    .string()
    .min(20, "Review content is required (min 20 characters)")
    .max(1000, "Review is too long (max 1000 characters)"),

  // Media
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),

  // Metrics (Optional)
  timeSaved: z.string().optional(),
  efficiencyGain: z.string().optional(),

  // Rating & Status
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .default(5),
  status: z.enum(["pending", "approved", "rejected"]).default("approved"),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
