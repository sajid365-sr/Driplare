
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Update submission status
 */
export async function updateSubmissionStatus(
  id: string,
  status: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("form_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating submission status:", error);
      toast.error("Failed to update status");
      return false;
    }

    toast.success(`Status updated to ${status}`);
    return true;
  } catch (err) {
    console.error("Error updating submission status:", err);
    return false;
  }
}

/**
 * Delete submissions by ID
 */
export async function deleteSubmissions(ids: string[]): Promise<boolean> {
  try {
    // Separate form submissions and newsletter submissions
    const formIds: string[] = [];
    const newsletterIds: string[] = [];
    
    // We need to check which table each ID belongs to
    for (const id of ids) {
      // Try to find in form_submissions first
      const { data: formData } = await supabase
        .from("form_submissions")
        .select("id")
        .eq("id", id)
        .single();
      
      if (formData) {
        formIds.push(id);
      } else {
        newsletterIds.push(id);
      }
    }

    // Delete from form_submissions
    if (formIds.length > 0) {
      const { error: formError } = await supabase
        .from("form_submissions")
        .delete()
        .in("id", formIds);

      if (formError) {
        console.error("Error deleting form submissions:", formError);
        throw formError;
      }
    }

    // Delete from news_letter
    if (newsletterIds.length > 0) {
      const { error: newsletterError } = await supabase
        .from("news_letter")
        .delete()
        .in("id", newsletterIds);

      if (newsletterError) {
        console.error("Error deleting newsletter submissions:", newsletterError);
        throw newsletterError;
      }
    }

    toast.success(`${ids.length} submission(s) deleted`);
    return true;
  } catch (err) {
    console.error("Error deleting submissions:", err);
    toast.error("Failed to delete submissions");
    return false;
  }
}
