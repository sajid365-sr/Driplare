"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  designation: string;
  company: string;
  testimonial: string;
  testimonialTitle: string;
  imageUrl: string;
  complement: string;
  videoUrl?: string; // ইতিমধ্যেই অপশনাল
  timeSaved?: string; // ইতিমধ্যেই অপশনাল
  efficiencyGain?: string; // ইতিমধ্যেই অপশনাল
  createdAt: Date; // ইতিমধ্যেই অপশনাল
  clientName: string;
  rating: number;
  review: string;
  project: string;
  status: "pending" | "approved" | "rejected";
}

// ১. Fetch a single review by ID
export const getReview = async (id: string) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id },
    });
    return review;
  } catch (error) {
    console.error("Get review error:", error);
    return null;
  }
};

// ২. Fetch reviews with pagination
export const getReviews = async (page: number = 1, pageSize: number = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    const [reviews, count] = await Promise.all([
      prisma.review.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.review.count(),
    ]);

    // Prisma এর ডাটাকে Testimonial ইন্টারফেসের সাথে সামঞ্জস্যপূর্ণ করা
    const formattedData: Testimonial[] = reviews.map((r: any) => ({
      ...r,
      videoUrl: r.videoUrl || undefined,
      timeSaved: r.timeSaved || undefined,
      efficiencyGain: r.efficiencyGain || undefined,
      title: r.designation, // designation কে title হিসেবে ম্যাপ করা হলো UI এর জন্য
    }));

    return {
      data: formattedData,
      count,
      page,
      pageSize,
    };
  } catch (error) {
    console.error("List review error:", error);
    return { data: [], count: 0, page, pageSize };
  }
};

// Interface for saving reviews
export interface SaveReviewData {
  name: string;
  designation: string;
  company: string;
  testimonialTitle: string;
  complement: string;
  imageUrl?: string;
  videoUrl?: string;
  timeSaved?: string;
  efficiencyGain?: string;
  rating?: number;
  status?: string;
}

// ৩. Create or Update review
export const saveReview = async (review: SaveReviewData, reviewId?: string) => {
  try {
    if (reviewId) {
      const updated = await prisma.review.update({
        where: { id: reviewId },
        data: {
          name: review.name,
          designation: review.designation,
          company: review.company,
          testimonialTitle: review.testimonialTitle,
          videoUrl: review.videoUrl || null,
          imageUrl: review.imageUrl || "",
          complement: review.complement,
          timeSaved: review.timeSaved || null,
          efficiencyGain: review.efficiencyGain || null,
          rating: review.rating || 5,
          status: review.status || "approved",
        },
      });
      revalidatePath("/");
      return {
        success: true,
        id: updated.id,
        message: "Review updated successfully",
      };
    } else {
      const created = await prisma.review.create({
        data: {
          name: review.name,
          designation: review.designation,
          company: review.company,
          testimonialTitle: review.testimonialTitle,
          videoUrl: review.videoUrl || null,
          imageUrl: review.imageUrl || "",
          complement: review.complement,
          timeSaved: review.timeSaved || null,
          efficiencyGain: review.efficiencyGain || null,
          rating: review.rating || 5,
          status: review.status || "approved",
        },
      });
      revalidatePath("/");
      return {
        success: true,
        id: created.id,
        message: "Review created successfully",
      };
    }
  } catch (error) {
    console.error("Review save error:", error);
    return { success: false, message: "Failed to save Review" };
  }
};

// ৪. Delete a review
export const deleteReview = async (id: string) => {
  try {
    await prisma.review.delete({
      where: { id },
    });
    revalidatePath("/");
    return { success: true, message: "Review deleted successfully" };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, message: "Failed to delete review" };
  }
};
