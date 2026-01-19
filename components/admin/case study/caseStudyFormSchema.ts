import * as z from "zod";

// --- Schema Definition ---
export const caseContentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    context: z.string().min(10, "Context is required"),
    problem: z.string().min(10, "Problem statement is required"),
    solution: z.string().min(10, "Solution details is required"),
    myApproach: z.string().optional(),
    result: z.string().min(1, "Result summary is required"),
    metric: z.string().min(1, "Key metric is required"),
    testimonial: z.string().optional(),
});

export const caseStudyFormSchema = z.object({
    category: z.string().min(1, "Category is required"),
    techTags: z.string().min(1, "Tech stack is required"),
    clientName: z.string().optional(),
    industry: z.string().optional(),
    clientLocation: z.string().optional(),
    projectDuration: z.string(),
    beforeMetricValue: z.coerce.number().optional(),
    afterMetricValue: z.coerce.number().optional(),
    metricUnit: z.string().optional(),
    en: caseContentSchema,
    bn: caseContentSchema,
    videoReviewUrl: z.string().optional(),
    dashboardVideoUrl: z.string().optional(),
    n8nDiagramUrl: z.string().optional(),
    gallery: z.array(z.string()).default([]),
});

export type CaseStudyFormValues = z.infer<typeof caseStudyFormSchema>;

