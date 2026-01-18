"use client";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UploadCloud, X, Plus, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { uploadImageToCloudinary } from "@/lib/upload-image";
import { toast } from "sonner";

interface VisualsStepProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export default function VisualsStep({ form }: VisualsStepProps) {
  const [upLoading, setUpLoading] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
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

    setUpLoading(fieldName);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadImageToCloudinary(formData, "case-studies");

      if (url) {
        form.setValue(fieldName, url);
        toast.success("Workflow diagram uploaded successfully!");
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
      setUpLoading(null);
      // Reset input
      e.target.value = "";
    }
  };

  const handleGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    const maxSize = 10 * 1024 * 1024; // 10MB
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/") || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      toast.error(
        `Some files are invalid. Please select image files under 10MB each.`
      );
      e.target.value = "";
      return;
    }

    // Show local previews immediately
    const localPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...localPreviews]);

    setUpLoading("gallery");
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          return uploadImageToCloudinary(formData, "case-studies/gallery");
        })
      );

      const validUrls = urls.filter((u) => u !== null);
      if (validUrls.length > 0) {
        const current = (form.getValues("gallery") as string[]) || [];
        form.setValue("gallery", [...current, ...validUrls]);
        toast.success(`${validUrls.length} image(s) uploaded successfully!`);

        // Clean up local previews after successful upload
        localPreviews.forEach((preview) => URL.revokeObjectURL(preview));
        setGalleryPreviews((prev) =>
          prev.filter((p) => !localPreviews.includes(p))
        );
      } else {
        toast.error(
          "Failed to upload images. Please check your connection and try again."
        );
        // Clean up previews on error
        localPreviews.forEach((preview) => URL.revokeObjectURL(preview));
        setGalleryPreviews((prev) =>
          prev.filter((p) => !localPreviews.includes(p))
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images. Please try again.");
      // Clean up previews on error
      localPreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setGalleryPreviews((prev) =>
        prev.filter((p) => !localPreviews.includes(p))
      );
    } finally {
      setUpLoading(null);
      // Reset input
      e.target.value = "";
    }
  };

  return (
    <Card className="block w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon size={18} /> Visuals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="videoReviewUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Review URL</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dashboardVideoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo Video URL</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormLabel>Workflow Diagram</FormLabel>
          <div className="flex gap-4 items-center flex-wrap">
            {form.watch("n8nDiagramUrl") || previewUrl ? (
              <div className="relative w-40 h-24 rounded border overflow-hidden bg-muted">
                <Image
                  src={previewUrl || form.watch("n8nDiagramUrl") || ""}
                  fill
                  className="object-cover"
                  alt="Diagram"
                />
                {upLoading === "n8nDiagramUrl" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={24} />
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => {
                    form.setValue("n8nDiagramUrl", "");
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }
                  }}
                  disabled={upLoading === "n8nDiagramUrl"}
                >
                  <X size={12} />
                </Button>
              </div>
            ) : (
              <label className="w-40 h-24 flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer hover:bg-muted transition-colors">
                {upLoading === "n8nDiagramUrl" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <UploadCloud size={20} />
                    <span className="text-xs mt-1">Upload</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e, "n8nDiagramUrl")}
                  disabled={upLoading === "n8nDiagramUrl"}
                />
              </label>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel>Project Gallery</FormLabel>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {/* Show uploaded images */}
            {form.watch("gallery")?.map((img: string, i: number) => (
              <div
                key={`uploaded-${i}`}
                className="relative aspect-square rounded border overflow-hidden group bg-muted"
              >
                <Image src={img} fill className="object-cover" alt="Gallery" />
                <button
                  title="Remove image"
                  type="button"
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const g = form.getValues("gallery") as string[];
                    form.setValue(
                      "gallery",
                      g.filter((_, idx: number) => idx !== i)
                    );
                    toast.success("Image removed");
                  }}
                >
                  <X className="text-white" size={16} />
                </button>
              </div>
            ))}

            {/* Show preview images (before upload completes) */}
            {galleryPreviews.map((preview, i) => (
              <div
                key={`preview-${i}`}
                className="relative aspect-square rounded border overflow-hidden bg-muted"
              >
                <Image
                  src={preview}
                  fill
                  className="object-cover"
                  alt="Preview"
                />
                {upLoading === "gallery" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={20} />
                  </div>
                )}
              </div>
            ))}

            {/* Upload button */}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer hover:bg-muted transition-colors">
              {upLoading === "gallery" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Plus size={20} />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGallery}
                disabled={upLoading === "gallery"}
              />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
