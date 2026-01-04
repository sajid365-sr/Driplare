
/**
 * Type definitions for form submission data
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

export interface NewsLetterForm {
  email: string;
}
