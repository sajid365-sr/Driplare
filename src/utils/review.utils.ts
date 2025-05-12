
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  testimonialTitle: string;
  videoUrl?: string;
  imageUrl: string;
  complement: string;
  created_at: string;
  updated_at: string;
}

// Upload Review Image
export const uploadReviewImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `/${fileName}`;

    const { error } = await supabase.storage
      .from("review-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Storage error:", error);
      toast.error("Error uploading image: " + error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("review-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Failed to upload image");
    return null;
  }
};

// Create or update review - with type safety
export const saveReview = async (
  review: Testimonial,
  reviewId?: string
): Promise<string | null> => {
  try {
    if (reviewId) {
      // Update existing review - strip out any fields that might cause issues
      const { id, created_at, ...updateData } = review; 
      
      // Update existing review with properly formatted data
      const { error } = await supabase
        .from("reviews")
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq("id", reviewId);

      if (error) {
        console.error("Error updating review:", error);
        toast.error("Error updating review: " + error.message);
        return null;
      }

      toast.success("Review updated successfully");
      return reviewId;
    } else {
      // Create new review
      const { data, error } = await supabase
        .from("reviews")
        .insert(review)
        .select("id")
        .single();

      if (error) {
        console.error("Error creating review:", error);
        toast.error("Error creating review: " + error.message);
        return null;
      }

      toast.success("Review created successfully");
      return data.id;
    }
  } catch (error) {
    console.error("Review save error:", error);
    toast.error("Failed to save Review");
    return null;
  }
};

// Fetch a single review by ID - with type safety
export const getReview = async (id: string): Promise<Testimonial | null> => {
  try {
    // Use type assertion since we've verified the schema in SQL
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Error fetching reviews: " + error.message);
      return null;
    }

    return data as unknown as Testimonial;
  } catch (error) {
    console.error("Get review error:", error);
    toast.error("Failed to fetch reviews");
    return null;
  }
};

// Fetch reviews with pagination
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
}
export const getReviews = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Testimonial>> => {
  try {
    // Use type assertion since we've verified the schema in SQL
    const query = supabase.from("reviews").select("*", { count: "exact" });

    // Add pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Error fetching reviews: " + error.message);
      return { data: [], count: 0, page, pageSize };
    }

    return {
      data: data as unknown as Testimonial[],
      count: count || 0,
      page,
      pageSize,
    };
  } catch (error) {
    console.error("List review error:", error);
    toast.error("Failed to fetch reviews");
    return { data: [], count: 0, page, pageSize };
  }
};

// Delete a review
export const deleteReview = async (id: string): Promise<boolean> => {
  try {
    // Use type assertion since we've verified the schema in SQL
    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      console.error("Error deleting review:", error);
      toast.error("Error deleting review: " + error.message);
      return false;
    }

    toast.success("Review deleted successfully");
    return true;
  } catch (error) {
    console.error("Delete blog error:", error);
    toast.error("Failed to delete review");
    return false;
  }
};
