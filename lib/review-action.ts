"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import type { Review, ReviewStats, SaveReviewData } from "@/types/review-types";

/**
 * Get All Reviews (Admin)
 * Fetches all reviews with optional status filter
 */
export async function getAllReviews(
  status?: "pending" | "approved" | "rejected",
) {
  try {
    const where = status ? { status } : {};

    const reviews = await prisma.review.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(reviews)) as Review[],
    };
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return {
      success: false,
      data: [],
    };
  }
}

/**
 * Get Single Review by ID (Admin)
 * Used for edit page
 */
export async function getReview(id: string) {
  try {
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return null;
    }

    return JSON.parse(JSON.stringify(review)) as Review;
  } catch (error) {
    console.error("Failed to fetch review:", error);
    return null;
  }
}

/**
 * Get Approved Reviews Only (Public)
 * For frontend display
 */
export async function getApprovedReviews() {
  try {
    const reviews = await prisma.review.findMany({
      where: { status: "approved" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(reviews)) as Review[],
    };
  } catch (error) {
    console.error("Failed to fetch approved reviews:", error);
    return {
      success: false,
      data: [],
    };
  }
}

/**
 * Get Review Stats (Admin Dashboard)
 */
export async function getReviewStats(): Promise<ReviewStats> {
  try {
    const [total, pending, approved, rejected, featured] = await Promise.all([
      prisma.review.count(),
      prisma.review.count({ where: { status: "pending" } }),
      prisma.review.count({ where: { status: "approved" } }),
      prisma.review.count({ where: { status: "rejected" } }),
      prisma.review.count({ where: { status: "approved", featured: true } }),
    ]);

    return { total, pending, approved, rejected, featured };
  } catch (error) {
    console.error("Failed to fetch review stats:", error);
    return { total: 0, pending: 0, approved: 0, rejected: 0, featured: 0 };
  }
}

/**
 * Save Review (Create or Update)
 * Your existing saveReview function with hybrid support
 */
export async function saveReview(data: SaveReviewData, id?: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const reviewData = {
      clientName: data.clientName,
      clientRole: data.clientRole,
      reviewText: data.reviewText,
      clientPhoto: data.clientPhoto || null,
      videoUrl: data.videoUrl || null,
      rating: data.rating,
      status: data.status,
      featured: data.featured || false,
      submissionSource: "admin_manual" as const,
      approvedBy: data.status === "approved" ? userId : null,
      approvedAt: data.status === "approved" ? new Date() : null,
    };

    if (id) {
      // Update existing review
      await prisma.review.update({
        where: { id },
        data: reviewData,
      });
    } else {
      // Create new review
      await prisma.review.create({
        data: reviewData,
      });
    }

    revalidatePath("/admin/reviews");
    revalidatePath("/"); // Revalidate homepage

    return {
      success: true,
      message: id
        ? "Review updated successfully"
        : "Review created successfully",
    };
  } catch (error) {
    console.error("Failed to save review:", error);
    return {
      success: false,
      message: "Failed to save review",
    };
  }
}

/**
 * Delete Review
 */
export async function deleteReview(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.review.delete({
      where: { id },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false };
  }
}

/**
 * Approve Review (For client submissions)
 * Quick approve action from pending reviews
 */
export async function approveReview(reviewId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.review.update({
      where: { id: reviewId },
      data: {
        status: "approved",
        approvedAt: new Date(),
        approvedBy: userId,
      },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to approve review:", error);
    return { success: false, error: "Failed to approve review" };
  }
}

/**
 * Reject Review (For client submissions)
 */
export async function rejectReview(reviewId: string, reason?: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.review.update({
      where: { id: reviewId },
      data: {
        status: "rejected",
        rejectionReason: reason || null,
      },
    });

    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    console.error("Failed to reject review:", error);
    return { success: false, error: "Failed to reject review" };
  }
}

/**
 * Toggle Featured Status
 */
export async function toggleFeaturedReview(
  reviewId: string,
  featured: boolean,
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.review.update({
      where: { id: reviewId },
      data: { featured },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to toggle featured status:", error);
    return { success: false, error: "Failed to update review" };
  }
}
