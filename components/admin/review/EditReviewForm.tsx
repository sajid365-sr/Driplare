/* Edit Review Form */


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

// Icons
import { Loader2, Save, User, FileText, ImageIcon, TrendingUp } from "lucide-react";

// Types, Schema & Actions
import { Review, SaveReviewData } from "@/types/review-types";
import { ReviewFormValues, reviewFormSchema } from "./reviewFormSchema";
import { saveReview } from "@/lib/review-action";

// Step Components
import ReviewInfoStep from "./ReviewInfoStep";
import ReviewMediaStep from "./ReviewMediaStep";

interface EditReviewFormProps {
  initialData: Review;
}

/**
 * EditReviewForm Component
 * Handles editing of existing client reviews
 * Pre-fills form with existing data
 */
const EditReviewForm = ({ initialData }: EditReviewFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with existing review data
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      clientName: initialData.clientName,
      clientRole: initialData.clientRole,
      reviewText: initialData.reviewText,
      clientPhoto: initialData.clientPhoto ?? "",
      videoUrl: initialData.videoUrl ?? "",
      rating: initialData.rating,
      status: initialData.status as "pending" | "approved" | "rejected",
    },
  });

  /**
   * Form submission handler
   * Updates existing review with new data
   */
  const handleSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);

    try {
      // Prepare data for server action
      const reviewData: SaveReviewData = {
        clientName: data.clientName,
        clientRole: data.clientRole,
        reviewText: data.reviewText,
        clientPhoto: data.clientPhoto || undefined,
        videoUrl: data.videoUrl || undefined,
        rating: data.rating,
        status: data.status,
      };

      // Call server action to update review
      const result = await saveReview(reviewData, initialData.id);

      if (result.success) {
        toast.success("Review updated successfully!");
        router.push("/admin/reviews");
      } else {
        toast.error(result.message || "Failed to update review");
      }
    } catch (error) {
      console.error("Review update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Form error handler
   * Logs validation errors for debugging
   */
  const handleFormError = (errors: unknown) => {
    console.log("Form validation errors:", errors);
    toast.error("Please check all required fields");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Review</h1>
          <p className="text-muted-foreground">
            Update the client testimonial details.
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
          Update Review
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, handleFormError)}
          className="space-y-8"
        >
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
              <TabsTrigger value="info" className="text-base">
                <User className="w-4 h-4 mr-2" /> Client Info & Content
              </TabsTrigger>
              <TabsTrigger value="media" className="text-base">
                <ImageIcon className="w-4 h-4 mr-2" /> Media
              </TabsTrigger>
            </TabsList>

            {/* Step 1: Client Information */}
            <TabsContent value="info">
              <ReviewInfoStep form={form} />
            </TabsContent>

            {/* Step 2: Media & Assets */}
            <TabsContent value="media">
              <ReviewMediaStep form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default EditReviewForm;
