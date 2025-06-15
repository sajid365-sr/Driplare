
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
 * Combined type for all submissions including newsletter
 */
export interface CombinedSubmission {
  id: string;
  name?: string;
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
  status?: string;
  created_at: string;
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
export async function getFormSubmissions(): Promise<CombinedSubmission[]> {
  try {
    console.log("Fetching form submissions...");
    
    // Fetch regular form submissions
    const { data: formData, error: formError } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (formError) {
      console.error("Error fetching form submissions:", formError);
      throw formError;
    }

    // Fetch newsletter submissions
    const { data: newsletterData, error: newsletterError } = await supabase
      .from("news_letter")
      .select("*")
      .order("created_at", { ascending: false });

    if (newsletterError) {
      console.error("Error fetching newsletter submissions:", newsletterError);
      throw newsletterError;
    }

    // Combine and format the data
    const combinedData: CombinedSubmission[] = [
      ...(formData || []).map(item => ({
        ...item,
        form_type: item.form_type || 'contact'
      })),
      ...(newsletterData || []).map(item => ({
        id: item.id,
        name: 'Newsletter Subscriber',
        email: item.email || '',
        form_type: 'newsletter',
        created_at: item.created_at,
        status: 'new'
      }))
    ];

    // Sort by created_at descending
    combinedData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    console.log(`Fetched ${combinedData.length} total submissions`);
    return combinedData;
  } catch (err) {
    console.error("Error fetching submissions:", err);
    toast.error("Failed to load submissions");
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

/* =========================== NEWSLETTER ================================== */

export interface NewsLetterForm {
  email: string;
}

export async function submitNewsletter(data: NewsLetterForm): Promise<boolean> {
  try {
    console.log("Submitting newsletter form:", data);

    const { error } = await supabase
      .from("news_letter")
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Newsletter submission error:", error);
      toast.error("Failed to submit newsletter. Please try again.");
      return false;
    }

    toast.success("Successfully subscribed to newsletter!");
    return true;
  } catch (err) {
    console.error("Newsletter submission error:", err);
    toast.error("An unexpected error occurred. Please try again.");
    return false;
  }
}
