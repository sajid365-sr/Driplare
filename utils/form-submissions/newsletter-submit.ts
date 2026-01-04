// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { NewsLetterForm } from "../types/form-types";

// export async function submitNewsletter(data: NewsLetterForm): Promise<boolean> {
//   try {
//     console.log("Submitting newsletter form:", data);

//     const { error } = await supabase
//       .from("news_letter")
//       .insert(data)
//       .select()
//       .single();

//     if (error) {
//       console.error("Newsletter submission error:", error);
//       toast.error("Failed to submit newsletter. Please try again.");
//       return false;
//     }

//     toast.success("Successfully subscribed to newsletter!");
//     return true;
//   } catch (err) {
//     console.error("Newsletter submission error:", err);
//     toast.error("An unexpected error occurred. Please try again.");
//     return false;
//   }
// }
