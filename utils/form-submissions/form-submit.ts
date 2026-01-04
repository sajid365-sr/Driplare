// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { FormSubmission } from "../types/form-types";

// /**
//  * Submit form data to Supabase
//  */
// export async function submitForm(data: FormSubmission): Promise<boolean> {
//   try {
//     console.log("Submitting form:", data);

//     // Insert data into the form_submissions table
//     const { error } = await supabase.from("form_submissions").insert([data]);

//     if (error) {
//       console.error("Form submission error:", error);
//       toast.error("Failed to submit form. Please try again.");
//       return false;
//     }

//     toast.success("Form submitted successfully!");
//     return true;
//   } catch (err) {
//     console.error("Form submission error:", err);
//     toast.error("An unexpected error occurred. Please try again.");
//     return false;
//   }
// }
