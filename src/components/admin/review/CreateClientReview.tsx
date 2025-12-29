import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getReview,
  saveReview,
  Testimonial,
  uploadReviewImage,
} from "@/utils/review.utils";
import { ImageIcon, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CreateClientReviewProps {
  reviewId?: string | null;
  onCancel?: () => void;
  handleRefresh?: () => void;
}

const CreateClientReview = ({
  reviewId,
  onCancel,
  handleRefresh,
}: CreateClientReviewProps) => {
  const navigate = useNavigate();
  const coverImageRef = useRef<HTMLInputElement>(null);
  const [newReview, setNewReview] = useState<Testimonial>({
    id: "",
    name: "",
    designation: "",
    company: "",
    testimonialTitle: "",
    videoUrl: "",
    imageUrl: "",
    complement: "",
    created_at: "",
    updated_at: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch review data if editing existing review
  useEffect(() => {
    if (reviewId) {
      setIsLoading(true);
      getReview(reviewId).then((review) => {
        if (review) {
          setNewReview({
            ...review,
            updated_at: new Date().toISOString(),
          });
          setImageUrl(review.imageUrl || "");
        }
        setIsLoading(false);
      });
    }
  }, [reviewId]);

  // Save review into database
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const review = {
      ...newReview,
      imageUrl,
      created_at: newReview.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("Saving review:", review);

    try {
      const savedId = await saveReview(review, reviewId || undefined);
      setIsSubmitting(false);

      if (savedId) {
        toast.success(
          `Review ${reviewId ? "updated" : "created"} successfully.`
        );
        handleRefresh();

        // Navigate back to the reviews list or reset form
        if (onCancel) {
          onCancel();
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(`Error ${reviewId ? "updating" : "creating"} review`);
      console.error(error);
    }
  };

  // Handle cover image upload
  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const imageUrl = await uploadReviewImage(file);
      if (imageUrl) {
        setImageUrl(imageUrl);
        toast.success("Cover image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload cover image");
      console.error("Upload error:", error);
    } finally {
      setIsUploadingCover(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            {reviewId ? "Edit Review" : "Create New Review"}
          </CardTitle>
          <CardDescription>
            {reviewId
              ? "Update existing review."
              : "Create review based on TrustPilot."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <label htmlFor="designation" className="text-sm font-medium">
                  Designation
                </label>
                <Input
                  id="designation"
                  placeholder="HR"
                  value={newReview.designation}
                  onChange={(e) =>
                    setNewReview({ ...newReview, designation: e.target.value })
                  }
                  required
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input
                  id="company"
                  placeholder="Company Name"
                  value={newReview.company}
                  onChange={(e) =>
                    setNewReview({ ...newReview, company: e.target.value })
                  }
                  required
                />
              </div>

              {/* Testimonial Title */}
              <div className="space-y-2">
                <label
                  htmlFor="testimonialTitle"
                  className="text-sm font-medium"
                >
                  Testimonial Title
                </label>
                <Input
                  id="testimonialTitle"
                  placeholder="The are the best"
                  value={newReview.testimonialTitle}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      testimonialTitle: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Video URL */}
              <div className="space-y-2">
                <label htmlFor="videoUrl" className="text-sm font-medium">
                  Video URL
                </label>
                <Input
                  id="videoUrl"
                  placeholder="https://wwww.videourl.com"
                  value={newReview.videoUrl}
                  onChange={(e) =>
                    setNewReview({ ...newReview, videoUrl: e.target.value })
                  }
                />
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="imageUrl">Cover Image</Label>
                <div className="mt-2">
                  <div className="relative mb-4">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Cover preview"
                        className="max-h-60 rounded-md object-cover"
                      />
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-40 border-dashed flex flex-col gap-2 items-center justify-center"
                    onClick={() => coverImageRef.current?.click()}
                    disabled={isUploadingCover}
                  >
                    {isUploadingCover ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-6 w-6" />
                        <span>Upload Cover Image</span>
                      </>
                    )}
                  </Button>

                  <Input
                    id="imageUrl"
                    ref={coverImageRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                  />
                </div>
              </div>

              {/* Complement */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="complement" className="text-sm font-medium">
                  Complement
                </label>
                <textarea
                  id="complement"
                  placeholder="Your can choose them four company growth."
                  className="w-full p-2 rounded-md border border-border bg-background min-h-[100px]"
                  value={newReview.complement}
                  onChange={(e) =>
                    setNewReview({ ...newReview, complement: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {reviewId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{reviewId ? "Update Review" : "Create Review"}</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateClientReview;
