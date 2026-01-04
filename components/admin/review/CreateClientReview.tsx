"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Star, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { saveReview, Testimonial } from "@/lib/review-action";
import { uploadImageToCloudinary } from "@/lib/upload-image";

interface CreateClientReviewProps {
  onSave: () => void;
  onCancel: () => void;
}

export function CreateClientReview({
  onSave,
  onCancel,
}: CreateClientReviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    designation: "",
    company: "",
    review: "",
    project: "",
  });

  // ইমেজ প্রিভিউ হ্যান্ডলার
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please select a client image");
      return;
    }

    setIsLoading(true);
    try {
      // ১. Cloudinary-তে ইমেজ আপলোড (Folder name 'testimonials' যোগ করা হয়েছে)
      const imageFormData = new FormData();
      imageFormData.append("file", imageFile);

      // এখানে ২য় আর্গুমেন্ট হিসেবে ফোল্ডারের নাম পাঠানো হয়েছে
      const uploadedImageUrl = await uploadImageToCloudinary(
        imageFormData,
        "testimonials"
      );

      if (!uploadedImageUrl) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      // ২. MongoDB-তে ডাটা সেভ (সব রিকোয়ার্ড টাইপ মেইনটেইন করে)
      const result = await saveReview({
        name: formData.clientName,
        title: formData.designation,
        designation: formData.designation,
        company: formData.company,
        testimonial: formData.review,
        testimonialTitle: formData.project,
        complement: formData.review,
        imageUrl: uploadedImageUrl,
        videoUrl: "",
        timeSaved: "",
        efficiencyGain: "",
        // createdAt এরর ফিক্স:
        // যদি টাইপস্ক্রিপ্ট Date অবজেক্ট নিয়ে ঝামেলা করে, তবে নিশ্চিত করুন ইন্টারফেসে এটি অপশনাল কি না।
        createdAt: new Date(),
        clientName: formData.clientName,
        rating: rating, // আপনার স্টেট থেকে আসা রেটিং
        review: formData.review,
        project: formData.project,
        status: "pending",
      } as Testimonial); // টাইপ কাস্টিং করে দিলে এরর চলে যাবে

      if (result?.success) {
        toast.success("Review published successfully!");
        onSave();
      } else {
        toast.error(result?.message || "Failed to save to database");
      }
    } catch (error) {
      console.error("Client side error:", error);
      toast.error("An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0">
        <CardTitle className="text-xl">Create Testimonial</CardTitle>
        <CardDescription>
          Fill in the client details to display on the social proof section.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload Section */}
          <div className="flex items-center gap-5 p-4 border rounded-lg bg-muted/30">
            <div className="h-20 w-20 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden bg-background">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="image-upload"
                className="cursor-pointer text-primary hover:underline"
              >
                Upload Client Photo
              </Label>
              <Input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">
                Square image recommended (Max 2MB)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input
                required
                placeholder="Ex: Md. Farid Uddin"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <Input
                required
                placeholder="Ex: CEO or HR Manager"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              required
              placeholder="Ex: Spark Infrastructure"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Project / Category</Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, project: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI Agent Development">
                  AI Agent Development
                </SelectItem>
                <SelectItem value="Workflow Automation">
                  Workflow Automation
                </SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Review Content</Label>
            <Textarea
              required
              placeholder="Write the testimonial here..."
              rows={4}
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-4 py-2">
            <Label>Rating:</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-5 w-5 cursor-pointer ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(s)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Add Review"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
