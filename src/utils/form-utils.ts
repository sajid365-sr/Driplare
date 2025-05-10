
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface FormSubmission {
  form_type: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  subject?: string;
  service_type?: string;
  budget?: string;
  timeline?: string;
  additional_info?: string;
}

// Submit a form and create a notification
export const submitForm = async (formData: FormSubmission): Promise<boolean> => {
  try {
    // First, insert the form submission into the database
    const { error: submissionError } = await supabase
      .from('form_submissions')
      .insert(formData);
      
    if (submissionError) {
      console.error('Error submitting form to database:', submissionError);
      toast.error('Error submitting form: ' + submissionError.message);
      return false;
    }
    
    // Create a notification about the submission via the edge function
    const response = await supabase.functions.invoke('form-submissions', {
      body: { action: 'submit', formData }
    });
    
    if (response.error) {
      console.error('Error creating notification:', response.error);
      // Don't return false here - the form submission was successful
    }
    
    toast.success('Form submitted successfully!');
    return true;
  } catch (error) {
    console.error('Form submission error:', error);
    toast.error('Failed to submit form');
    return false;
  }
};

// Get all form submissions
export const getFormSubmissions = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching form submissions:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch form submissions:', error);
    return [];
  }
};

// Update form submission status
export const updateSubmissionStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('form_submissions')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating submission status:', error);
      return false;
    }
    
    toast.success('Submission status updated');
    return true;
  } catch (error) {
    console.error('Failed to update submission status:', error);
    return false;
  }
};

// Delete form submissions
export const deleteSubmissions = async (submissionIds: string[]): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('form_submissions')
      .delete()
      .in('id', submissionIds);
    
    if (error) {
      console.error('Error deleting submissions:', error);
      return false;
    }
    
    toast.success('Submissions deleted successfully');
    return true;
  } catch (error) {
    console.error('Failed to delete submissions:', error);
    return false;
  }
};
