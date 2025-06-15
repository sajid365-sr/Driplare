
// Re-export all utilities from their respective modules for backward compatibility
export type { FormSubmission, CombinedSubmission, NewsLetterForm } from './types/form-types';
export { submitForm } from './form-submissions/form-submit';
export { submitNewsletter } from './form-submissions/newsletter-submit';
export { getFormSubmissions } from './form-submissions/form-fetch';
export { updateSubmissionStatus, deleteSubmissions } from './form-submissions/form-operations';
