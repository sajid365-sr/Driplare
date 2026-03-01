// types/review-types.ts
// Updated to match your existing admin structure + hybrid support

export interface Review {
  id: string;

  // Client Information
  clientName: string;
  clientRole?: string;

  // Review Content
  reviewText: string;
  rating: number; // 1-5

  // Media
  clientPhoto?: string | null;
  videoUrl?: string | null;

  // Status & Moderation
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  submissionSource: "client_form" | "admin_manual";

  // Additional fields for client submissions
  clientEmail?: string | null;
  projectType?: string | null;
  ip?: string | null;

  // Metadata
  createdAt: Date | string;
  updatedAt: Date | string;
  approvedAt?: Date | string | null;
  approvedBy?: string | null;
  rejectionReason?: string | null;
}

// For client-side review submission form
export interface ReviewFormData {
  clientName: string;
  clientEmail: string;
  clientRole?: string;
  reviewText: string;
  rating: number;
  projectType: string;
  videoUrl?: string;
}

// For admin manual entry (your existing structure)
export interface AdminReviewData {
  clientName: string;
  clientRole: string;
  reviewText: string;
  clientPhoto?: string;
  videoUrl?: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  featured?: boolean;
}

export interface ReviewSubmissionResponse {
  success: boolean;
  error?: string;
  reviewId?: string;
  message?: string;
}

export interface ReviewStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  featured: number;
}

// Type for saveReview function (your existing)
export type SaveReviewData = AdminReviewData;
