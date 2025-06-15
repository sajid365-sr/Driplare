
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
    console.log("Starting to fetch submissions from both tables...");
    
    // First, let's check if we can connect to the database at all
    const { data: testConnection, error: testError } = await supabase
      .from("form_submissions")
      .select("count(*)")
      .single();
    
    console.log("Database connection test:", { testConnection, testError });

    // Fetch regular form submissions with detailed logging
    console.log("Fetching form submissions...");
    const { data: formData, error: formError, count: formCount } = await supabase
      .from("form_submissions")
      .select("*", { count: 'exact' })
      .order("created_at", { ascending: false });

    console.log("Form submissions query result:");
    console.log("- Data:", formData);
    console.log("- Error:", formError);
    console.log("- Count:", formCount);
    console.log("- Data length:", formData?.length || 0);

    if (formError) {
      console.error("Error fetching form submissions:", formError);
      console.error("Error details:", JSON.stringify(formError, null, 2));
      toast.error("Failed to load form submissions: " + formError.message);
    }

    // Fetch newsletter submissions with detailed logging
    console.log("Fetching newsletter submissions...");
    const { data: newsletterData, error: newsletterError, count: newsletterCount } = await supabase
      .from("news_letter")
      .select("*", { count: 'exact' })
      .order("created_at", { ascending: false });

    console.log("Newsletter submissions query result:");
    console.log("- Data:", newsletterData);
    console.log("- Error:", newsletterError);
    console.log("- Count:", newsletterCount);
    console.log("- Data length:", newsletterData?.length || 0);

    if (newsletterError) {
      console.error("Error fetching newsletter submissions:", newsletterError);
      console.error("Error details:", JSON.stringify(newsletterError, null, 2));
      toast.error("Failed to load newsletter submissions: " + newsletterError.message);
    }

    // Combine and format the data
    const combinedData: CombinedSubmission[] = [];

    // Add form submissions
    if (formData && Array.isArray(formData) && formData.length > 0) {
      console.log("Processing form submissions data...");
      formData.forEach((item, index) => {
        console.log(`Form submission ${index}:`, item);
        combinedData.push({
          id: item.id,
          name: item.name,
          email: item.email,
          form_type: item.form_type || 'contact',
          phone: item.phone,
          subject: item.subject,
          message: item.message,
          company: item.company,
          service_type: item.service_type,
          budget: item.budget,
          timeline: item.timeline,
          additional_info: item.additional_info,
          status: item.status || 'new',
          created_at: item.created_at
        });
      });
      console.log(`Added ${formData.length} form submissions to combined data`);
    } else {
      console.warn("No form submissions found or data is not an array");
      console.log("Form data type:", typeof formData);
      console.log("Form data value:", formData);
    }

    // Add newsletter submissions
    if (newsletterData && Array.isArray(newsletterData) && newsletterData.length > 0) {
      console.log("Processing newsletter submissions data...");
      newsletterData.forEach((item, index) => {
        console.log(`Newsletter submission ${index}:`, item);
        combinedData.push({
          id: item.id,
          name: 'Newsletter Subscriber',
          email: item.email,
          form_type: 'newsletter',
          status: 'subscribed',
          created_at: item.created_at
        });
      });
      console.log(`Added ${newsletterData.length} newsletter submissions to combined data`);
    } else {
      console.warn("No newsletter submissions found or data is not an array");
      console.log("Newsletter data type:", typeof newsletterData);
      console.log("Newsletter data value:", newsletterData);
    }

    // Sort by created_at descending
    combinedData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    console.log(`Final combined data summary:`);
    console.log(`- Total submissions: ${combinedData.length}`);
    console.log(`- Form submissions: ${formData?.length || 0}`);
    console.log(`- Newsletter submissions: ${newsletterData?.length || 0}`);
    console.log("Combined data structure:", combinedData);
    
    return combinedData;
  } catch (err) {
    console.error("Unexpected error fetching submissions:", err);
    console.error("Error stack:", err instanceof Error ? err.stack : 'No stack trace');
    toast.error("Failed to load submissions: " + (err instanceof Error ? err.message : 'Unknown error'));
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
