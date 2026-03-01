"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, Upload, Loader2, CheckCircle2, X } from "lucide-react";
import Image from "next/image";
import type { ReviewFormData } from "@/types/review-types";

export function ReviewSubmissionForm() {
    const { t } = useTranslation("reviewPage");
    const [formData, setFormData] = useState<ReviewFormData>({
        clientName: "",
        clientEmail: "",
        clientRole: "",
        reviewText: "",
        rating: 5,
        projectType: "AI Agents",
        videoUrl: "",
    });
    const [clientPhoto, setClientPhoto] = useState<string>("");
    const [photoPreview, setPhotoPreview] = useState<string>("");
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingClick = (rating: number) => {
        setFormData({ ...formData, rating });
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setErrorMessage("Please upload an image file (JPG, PNG, etc.)");
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setErrorMessage("Image size must be less than 10MB");
            return;
        }

        setUploadingPhoto(true);
        setErrorMessage("");

        try {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Upload to Cloudinary via API
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);

            const response = await fetch("/api/upload/image", {
                method: "POST",
                body: uploadFormData,
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Upload failed");
            }

            setClientPhoto(result.imageUrl);
        } catch (error: any) {
            console.error("Photo upload error:", error);
            setErrorMessage(error.message || "Failed to upload photo");
            setPhotoPreview("");
        } finally {
            setUploadingPhoto(false);
        }
    };

    const removePhoto = () => {
        setClientPhoto("");
        setPhotoPreview("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/reviews/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    clientPhoto,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to submit review");
            }

            setStatus("success");
        } catch (error: any) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage(error.message || "Failed to submit review. Please try again.");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-16"
            >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-black text-foreground mb-4">
                    {t("submit.successTitle")}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                    {t("submit.successMessage")}
                </p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90
                     text-primary-foreground font-bold px-8 py-3 rounded-xl
                     transition-colors"
                >
                    {t("submit.backToHome")}
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                        {t("submit.name")} *
                    </label>
                    <input
                        type="text"
                        name="clientName"
                        required
                        value={formData.clientName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-xl
                       text-foreground placeholder:text-muted-foreground/50
                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                       transition-all"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                        {t("submit.email")} *
                    </label>
                    <input
                        type="email"
                        name="clientEmail"
                        required
                        value={formData.clientEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-xl
                       text-foreground placeholder:text-muted-foreground/50
                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                       transition-all"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            {/* Role & Project Type */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                        {t("submit.role")}
                    </label>
                    <input
                        type="text"
                        name="clientRole"
                        value={formData.clientRole}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-xl
                       text-foreground placeholder:text-muted-foreground/50
                       focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                       transition-all"
                        placeholder="CEO at ABC Corp"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                        {t("submit.projectType")} *
                    </label>
                    <select
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-xl
                       text-foreground focus:outline-none focus:border-primary/50
                       focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                        <option>AI Agents</option>
                        <option>Workflow Automation</option>
                        <option>Web Development</option>
                        <option>AI Consulting</option>
                    </select>
                </div>
            </div>

            {/* Rating */}
            <div>
                <label className="block text-sm font-bold text-foreground mb-3">
                    {t("submit.rating")} *
                </label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            className="transition-all hover:scale-110"
                        >
                            <Star
                                className={`w-10 h-10 ${star <= formData.rating
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-muted-foreground/30"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Review Text */}
            <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                    {t("submit.reviewText")} *
                </label>
                <textarea
                    name="reviewText"
                    required
                    value={formData.reviewText}
                    onChange={handleChange}
                    rows={5}
                    minLength={20}
                    maxLength={500}
                    className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-xl
                     text-foreground placeholder:text-muted-foreground/50 resize-none
                     focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                     transition-all"
                    placeholder="Tell us about your experience working with Driplare..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                    {formData.reviewText.length}/500 characters (minimum 20)
                </p>
            </div>

            {/* Photo Upload */}
            <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                    {t("submit.photo")}
                </label>

                {photoPreview ? (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-border">
                        <Image
                            src={photoPreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500
                         text-white flex items-center justify-center hover:bg-red-600
                         transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <label
                        className="flex flex-col items-center justify-center w-full h-32 
                       border-2 border-dashed border-border rounded-xl
                       hover:border-primary/50 cursor-pointer transition-colors
                       bg-muted/30 hover:bg-muted/50"
                    >
                        {uploadingPhoto ? (
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                <span className="text-sm text-muted-foreground">
                                    {t("submit.uploadPhoto")}
                                </span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            disabled={uploadingPhoto}
                        />
                    </label>
                )}
            </div>

            {/* Video URL */}
            <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                    {t("submit.videoUrl")}
                </label>
                <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-xl
                     text-foreground placeholder:text-muted-foreground/50
                     focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                     transition-all"
                    placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                    {t("submit.videoHint")}
                </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === "submitting" || uploadingPhoto}
                className="w-full inline-flex items-center justify-center gap-2
                   bg-primary hover:bg-primary/90 disabled:bg-primary/50
                   text-primary-foreground font-black text-base px-8 py-4 rounded-xl
                   shadow-lg shadow-primary/20 transition-all"
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t("submit.submitting")}
                    </>
                ) : (
                    t("submit.submit")
                )}
            </button>

            <p className="text-xs text-center text-muted-foreground">
                {t("submit.disclaimer")}
            </p>
        </form>
    );
}