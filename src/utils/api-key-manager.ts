
import { toast } from "sonner";

// LocalStorage key for the API key
const RESEND_API_KEY = "resend_api_key";

/**
 * Get the stored Resend API key
 */
export const getResendApiKey = (): string | null => {
  return localStorage.getItem(RESEND_API_KEY);
};

/**
 * Set the Resend API key
 */
export const setResendApiKey = (apiKey: string): void => {
  if (!apiKey) {
    toast.error("API key cannot be empty");
    return;
  }
  
  // Validate API key format (simple check for re_ prefix)
  if (!apiKey.startsWith("re_")) {
    toast.error("Invalid Resend API key format. It should start with 're_'");
    return;
  }
  
  localStorage.setItem(RESEND_API_KEY, apiKey);
  toast.success("Resend API key has been set successfully");
};

/**
 * Clear the stored Resend API key
 */
export const clearResendApiKey = (): void => {
  localStorage.removeItem(RESEND_API_KEY);
  toast.info("Resend API key has been cleared");
};

/**
 * Check if an API key is set
 */
export const hasResendApiKey = (): boolean => {
  const key = getResendApiKey();
  return key !== null && key !== "" && key !== "Test Key";
};
