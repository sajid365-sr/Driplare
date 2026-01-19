"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UploadCloud, X, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { uploadImageToCloudinary } from "@/lib/upload-image";
import { toast } from "sonner";

interface ReviewMediaStepProps<TFormValues> {
  form: UseFormReturn<TFormValues>;
}

/**
 * ReviewMediaStep Component
 * Step 3: Media & Assets
 * Handles client photo upload to Cloudinary and video URL
 */
export default function ReviewMediaStep<TFormValues extends Record<string, any>>({
  form,
}: ReviewMediaStepProps<TFormValues>) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  /**
   * Handle image upload to Cloudinary
   * Validates file type and size, shows preview, uploads to cloud
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size must be less than 10MB");
      e.target.value = "";
      return;
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadImageToCloudinary(
        formData,
        "Driplare/Website Asset/Reviews"
      );

      if (url) {
        form.setValue("imageUrl", url);
        toast.success("Client photo uploaded successfully!");
        // Clean up local preview
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(null);
      } else {
        toast.error(
          "Failed to upload image. Please check your connection and try again."
        );
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  /**
   * Remove uploaded image
   * Clears form value and local preview
   */
  const handleRemoveImage = () => {
    form.setValue("imageUrl", "");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    toast.success("Image removed");
  };

  return (
    <Card className="block w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon size={18} /> Media & Assets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client Photo Upload */}
        <div className="space-y-2">
          <FormLabel>Client Photo</FormLabel>
          <FormDescription className="text-xs">
            Upload client's profile picture or company logo (max 10MB)
          </FormDescription>
          <div className="flex gap-4 items-center flex-wrap">
            {form.watch("imageUrl") || previewUrl ? (
              <div className="relative w-32 h-32 rounded-full border overflow-hidden bg-muted">
                <Image
                  src={previewUrl || form.watch("imageUrl") || ""}
                  fill
                  className="object-cover"
                  alt="Client Photo"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={24} />
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 rounded-full"
                  onClick={handleRemoveImage}
                  disabled={isUploading}
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-full cursor-pointer hover:bg-muted transition-colors">
                {isUploading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <UploadCloud size={24} />
                    <span className="text-xs mt-2">Upload Photo</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* Video Testimonial URL */}
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Testimonial URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                YouTube, Loom, or any video platform URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
