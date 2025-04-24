
import { toast } from "sonner";

let resendApiKey: string | null = "re_cy4tD9PC_MDjHH82iBD3mQZsFmbEbek2n";

export const setResendApiKey = (key: string) => {
  if (!key.startsWith('re_')) {
    toast.error('Invalid Resend API key format');
    return false;
  }
  
  resendApiKey = key;
  localStorage.setItem('resend_api_key', key);
  toast.success('API key saved successfully');
  return true;
};

export const getResendApiKey = (): string | null => {
  if (!resendApiKey) {
    resendApiKey = localStorage.getItem('resend_api_key');
  }
  return resendApiKey;
};

export const clearResendApiKey = () => {
  resendApiKey = null;
  localStorage.removeItem('resend_api_key');
  toast.success('API key cleared');
};
