import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Type definition for form submission data
 */
export interface FormSubmission {
  name: string;
  email: string;
  form_type: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string;
  service_type?: string;
  budget?: string;
  timeline?: string;
  additional_info?: string;
}

/**
 * Submit form data to Supabase
 */
export async function submitForm(data: FormSubmission): Promise<boolean> {
  try {
    console.log("Submitting form:", data);

    // Insert data into the form_submissions table
    const { error } = await supabase.from("form_submissions").insert([data]);

    if (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form. Please try again.");
      return false;
    }

    toast.success("Form submitted successfully!");
    return true;
  } catch (err) {
    console.error("Form submission error:", err);
    toast.error("An unexpected error occurred. Please try again.");
    return false;
  }
}

/**
 * Get all form submissions with optional pagination
 */
export async function getFormSubmissions(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching form submissions:", error);
      toast.error("Failed to load form submissions");
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error fetching form submissions:", err);
    return [];
  }
}

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
    const { error } = await supabase
      .from("form_submissions")
      .delete()
      .in("id", ids);

    if (error) {
      console.error("Error deleting submissions:", error);
      toast.error("Failed to delete submissions");
      return false;
    }

    toast.success(`${ids.length} submission(s) deleted`);
    return true;
  } catch (err) {
    console.error("Error deleting submissions:", err);
    return false;
  }
}

/* =========================== NEWSLETTER ================================== */

export interface NewsLetterForm {
  email: string;
}
export async function submitNewsletter(data: NewsLetterForm): Promise<boolean> {
  try {
    console.log("Submitting newsletter form:", data);

    // Insert data into the form_submissions table
    const { error } = await supabase.from("news_letter").insert(data);

    if (error) {
      console.error("Newsletter submission error:", error);
      toast.error("Failed to submit form. Please try again.");
      return false;
    }

    toast.success("Form submitted successfully!");
    return true;
  } catch (err) {
    console.error("Form submission error:", err);
    toast.error("An unexpected error occurred. Please try again.");
    return false;
  }
}
