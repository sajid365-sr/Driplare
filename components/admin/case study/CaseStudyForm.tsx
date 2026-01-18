"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Shadcn UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

// Icons
import { Loader2, Save, FileText, ImageIcon, Info } from "lucide-react";

// Action File
import { createCaseStudy } from "@/lib/case-study-action";

import MetadataStep from "./MetadataStep";
import ContentStep from "./ContentStep";
import VisualsStep from "./VisualsStep";

// --- Schema Definition ---
const caseContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  context: z.string().min(10, "Context is required"),
  problem: z.string().min(10, "Problem statement is required"),
  solution: z.string().min(10, "Solution details is required"),
  myApproach: z.string().optional(),
  result: z.string().min(1, "Result summary is required"),
  metric: z.string().min(1, "Key metric is required"),
  testimonial: z.string().optional(),
});

const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  techTags: z.string().min(1, "Tech stack is required"),
  clientName: z.string().optional(),
  industry: z.string().optional(),
  clientLocation: z.string().optional(),
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

type FormValues = z.infer<typeof formSchema>;

export default function CaseStudyTabsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      techTags: "",
      gallery: [],
      en: {
        title: "",
        context: "",
        problem: "",
        solution: "",
        result: "",
        metric: "",
      },
      bn: {
        title: "",
        context: "",
        problem: "",
        solution: "",
        result: "",
        metric: "",
      },
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    console.log("Form submitted with data:", data);
    // try {
    //   const formattedData = {
    //     ...data,
    //     techTags: data.techTags.split(",").map((tag) => tag.trim()),
    //   };

    //   const result = await createCaseStudy(formattedData);
    //   if (result.success) {
    //     toast.success("Case study published successfully!");
    //     form.reset();
    //   } else {
    //     toast.error(result.error || "Failed to save");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong");
    // } finally {
    //   setIsSubmitting(false);
    // }
    setIsSubmitting(false);
  }

  const handleFormError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Case Study
          </h1>
          <p className="text-muted-foreground">
            Fill in the details to showcase your success story.
          </p>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit, handleFormError)}
          disabled={isSubmitting}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Case Study
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, handleFormError)}
          className="space-y-8"
        >
          <Tabs defaultValue="metadata" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
              <TabsTrigger value="metadata" className="text-base">
                <Info className="w-4 h-4 mr-2" /> Metadata
              </TabsTrigger>
              <TabsTrigger value="english" className="text-base">
                <FileText className="w-4 h-4 mr-2" /> English Content
              </TabsTrigger>
              <TabsTrigger value="bengali" className="text-base">
                <FileText className="w-4 h-4 mr-2" /> Bengali Content
              </TabsTrigger>
              <TabsTrigger value="visuals" className="text-base">
                <ImageIcon className="w-4 h-4 mr-2" /> Visuals & Media
              </TabsTrigger>
            </TabsList>

            {/* --- TAB 1: METADATA --- */}
            <TabsContent value="metadata">
              <MetadataStep form={form} />
            </TabsContent>

            {/* --- TAB 2: ENGLISH --- */}
            <TabsContent value="english">
              <ContentStep form={form} lang="en" title="English Presentation" />
            </TabsContent>

            {/* --- TAB 3: BENGALI --- */}
            <TabsContent value="bengali">
              <ContentStep form={form} lang="bn" title="Bengali Presentation" />
            </TabsContent>

            {/* --- TAB 4: VISUALS --- */}
            <TabsContent value="visuals">
              <VisualsStep form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
