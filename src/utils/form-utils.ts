
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
    const response = await supabase.functions.invoke('form-submissions', {
      body: { action: 'submit', formData }
    });
    
    if (response.error) {
      console.error('Error submitting form:', response.error);
      toast.error('Error submitting form: ' + response.error.message);
      return false;
    }
    
    if (!response.data.success) {
      toast.error('Error submitting form: ' + (response.data.message || 'Unknown error'));
      return false;
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
    const response = await supabase.functions.invoke('form-submissions', {
      body: { action: 'get' }
    });
    
    if (response.error || !response.data.success) {
      console.error('Error fetching form submissions:', response.error || response.data.message);
      return [];
    }
    
    return response.data.submissions || [];
  } catch (error) {
    console.error('Failed to fetch form submissions:', error);
    return [];
  }
};

// Update form submission status
export const updateSubmissionStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    const response = await supabase.functions.invoke('form-submissions', {
      body: { action: 'update_status', id, status }
    });
    
    if (response.error || !response.data.success) {
      console.error('Error updating submission status:', response.error || response.data.message);
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
    const response = await supabase.functions.invoke('form-submissions', {
      body: { action: 'delete', submissionIds }
    });
    
    if (response.error || !response.data.success) {
      console.error('Error deleting submissions:', response.error || response.data.message);
      return false;
    }
    
    toast.success('Submissions deleted successfully');
    return true;
  } catch (error) {
    console.error('Failed to delete submissions:', error);
    return false;
  }
};
