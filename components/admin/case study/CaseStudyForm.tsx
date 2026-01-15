"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Save,
  Image as ImageIcon,
  Video,
  Calculator,
  Globe,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// --- 1. Zod Schema (Prisma Model এর সাথে মিল রেখে) ---
const caseContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  context: z.string().min(10, "Context is required"),
  problem: z.string().min(10, "Problem statement is required"),
  solution: z.string().min(10, "Solution details are required"),
  myApproach: z.string().optional(), // Strategy
  failedAttempts: z.string().optional(),
  result: z.string().min(1, "Result summary is required"),
  metric: z.string().min(1, "Key metric is required"), // "70% Cost Reduction"
  testimonial: z.string().optional(),
  testimonialRole: z.string().optional(),
});

const formSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  techTags: z.string(), // We will convert comma separated string to array later

  // Metadata
  clientName: z.string().optional(),
  clientLocation: z.string().optional(),
  industry: z.string().optional(),
  projectDuration: z.string().optional(),

  // Visuals (URLs for now, assuming upload logic handles getting the URL)
  heroImage: z.string().optional(),
  videoReviewUrl: z.string().optional(),
  dashboardVideoUrl: z.string().optional(),
  n8nDiagramUrl: z.string().optional(),

  // ROI Stats (Coerce to number because inputs return strings)
  beforeMetricValue: z.coerce.number().optional(),
  afterMetricValue: z.coerce.number().optional(),
  metricUnit: z.string().optional(),

  // Nested Language Content
  en: caseContentSchema,
  bn: caseContentSchema,
});

type FormValues = z.infer<typeof formSchema>;

export default function CaseStudyForm() {
  const [activeLang, setActiveLang] = useState("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 2. Initialize Form ---
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      category: "",
      techTags: "",
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

  // --- 3. Handle Submit ---
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Tags string কে Array তে কনভার্ট করা
      const formattedData = {
        ...data,
        techTags: data.techTags.split(",").map((tag) => tag.trim()),
      };

      console.log("Submitting Data:", formattedData);
      // TODO: Call your Server Action or API here
      // await createCaseStudy(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- Helper to render Language Fields ---
  const renderContentFields = (lang: "en" | "bn") => (
    <div className="space-y-4 animate-in fade-in-50">
      <FormField
        control={form.control}
        name={`${lang}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Case Title ({lang.toUpperCase()})</FormLabel>
            <FormControl>
              <Input placeholder="Enter catchy title..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${lang}.context`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Context / Backstory</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What was the situation?"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${lang}.problem`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>The Problem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What pain points did they have?"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${lang}.solution`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>The Solution</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How did you solve it?"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${lang}.result`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>The Result</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What was the outcome?"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`${lang}.myApproach`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>My Approach / Strategy (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Unique strategy used..."
                className="h-20"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${lang}.metric`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highlight Metric</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 70% Cost Reduction" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${lang}.testimonial`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Quote</FormLabel>
              <FormControl>
                <Input placeholder="Client feedback..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
        {/* --- Header Actions --- */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Add New Case Study
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a comprehensive case study record.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Discard
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Case Study"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Left Column: Main Content (Tabs) --- */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Study Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeLang}
                  onValueChange={setActiveLang}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="en">English Version</TabsTrigger>
                    <TabsTrigger value="bn">Bengali Version</TabsTrigger>
                  </TabsList>

                  <TabsContent value="en">
                    {renderContentFields("en")}
                  </TabsContent>

                  <TabsContent value="bn">
                    {renderContentFields("bn")}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Visuals Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon size={18} /> Visuals & Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="heroImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Link to the main cover image.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dashboardVideoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Demo Video URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Loom/YouTube Link" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="n8nDiagramUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workflow Diagram URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Image URL" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- Right Column: Metadata & Settings --- */}
          <div className="space-y-6">
            {/* Core Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe size={18} /> Project Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (URL)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. email-automation-saas"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Unique ID for the URL.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Client Company" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="SaaS, Health..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="USA, UK..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Automation, Web Dev..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="techTags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech Stack</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Next.js, n8n, Prisma (comma separated)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* ROI Calculator Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator size={18} /> ROI / Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="beforeMetricValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Before</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="40" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="afterMetricValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>After</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="metricUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="Hours/Week, USD..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
