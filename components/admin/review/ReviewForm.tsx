"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Save, User, FileText, ImageIcon, TrendingUp } from "lucide-react";
import { ReviewFormValues, reviewFormSchema } from "./reviewFormSchema";
import { saveReview, type SaveReviewData } from "@/lib/review-action";
import ReviewInfoStep from "./ReviewInfoStep";
import ReviewContentStep from "./ReviewContentStep";
import ReviewMediaStep from "./ReviewMediaStep";
import ReviewMetricsStep from "./ReviewMetricsStep";

export default function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      designation: "",
      company: "",
      testimonialTitle: "",
      complement: "",
      imageUrl: "",
      videoUrl: "",
      timeSaved: "",
      efficiencyGain: "",
      rating: 5,
      status: "approved",
      featured: false,
    },
  });

  const handleSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);

    try {
      const reviewData: SaveReviewData = {
        name: data.name,
        designation: data.designation,
        company: data.company,
        testimonialTitle: data.testimonialTitle,
        complement: data.complement,
        imageUrl: data.imageUrl || undefined,
        videoUrl: data.videoUrl || undefined,
        timeSaved: data.timeSaved || undefined,
        efficiencyGain: data.efficiencyGain || undefined,
        rating: data.rating,
        status: data.status,
        featured: data.featured || false,
      };

      const result = await saveReview(reviewData);

      if (result.success) {
        toast.success("Review created successfully!");
        form.reset();
        router.push("/admin/reviews");
      } else {
        toast.error(result.message || "Failed to save review");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormError = (errors: unknown) => {
    console.log("Form validation errors:", errors);
    toast.error("Please check all required fields");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Client Review</h1>
          <p className="text-muted-foreground">
            Add a new testimonial from your satisfied clients.
          </p>
        </div>
        <Button
          onClick={form.handleSubmit(handleSubmit, handleFormError)}
          disabled={isSubmitting}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Review
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleFormError)} className="space-y-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
              <TabsTrigger value="info" className="text-base">
                <User className="w-4 h-4 mr-2" /> Client Info
              </TabsTrigger>
              <TabsTrigger value="content" className="text-base">
                <FileText className="w-4 h-4 mr-2" /> Content
              </TabsTrigger>
              <TabsTrigger value="media" className="text-base">
                <ImageIcon className="w-4 h-4 mr-2" /> Media
              </TabsTrigger>
              <TabsTrigger value="metrics" className="text-base">
                <TrendingUp className="w-4 h-4 mr-2" /> Metrics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <ReviewInfoStep form={form} />
            </TabsContent>

            <TabsContent value="content">
              <ReviewContentStep form={form} />
            </TabsContent>

            <TabsContent value="media">
              <ReviewMediaStep form={form} />
            </TabsContent>

            <TabsContent value="metrics">
              <ReviewMetricsStep form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}