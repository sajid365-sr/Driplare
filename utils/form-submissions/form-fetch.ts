// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { CombinedSubmission } from "../types/form-types";

// /**
//  * Get all form submissions with optional pagination
//  */
// export async function getFormSubmissions(): Promise<CombinedSubmission[]> {
//   try {
//     console.log("=== STARTING FORM SUBMISSIONS FETCH ===");
//     console.log("Current time:", new Date().toISOString());

//     // First, let's test basic database connectivity
//     console.log("Testing database connectivity...");
//     const { data: testData, error: testError } = await supabase
//       .from("form_submissions")
//       .select("count", { count: 'exact', head: true });

//     console.log("Database connectivity test:", {
//       count: testData,
//       error: testError,
//       errorCode: testError?.code,
//       errorMessage: testError?.message
//     });

//     // Check if table exists and has any data at all
//     console.log("Checking form_submissions table...");
//     const { data: formData, error: formError, count: formCount } = await supabase
//       .from("form_submissions")
//       .select("*", { count: 'exact' })
//       .order("created_at", { ascending: false });

//     console.log("=== FORM SUBMISSIONS QUERY RESULT ===");
//     console.log("Raw data:", formData);
//     console.log("Error:", formError);
//     console.log("Error code:", formError?.code);
//     console.log("Error message:", formError?.message);
//     console.log("Error details:", formError?.details);
//     console.log("Error hint:", formError?.hint);
//     console.log("Count:", formCount);
//     console.log("Array length:", formData?.length);
//     console.log("Data type:", typeof formData);
//     console.log("Is array:", Array.isArray(formData));

//     // Check newsletter table for comparison
//     console.log("Checking news_letter table...");
//     const { data: newsletterData, error: newsletterError, count: newsletterCount } = await supabase
//       .from("news_letter")
//       .select("*", { count: 'exact' })
//       .order("created_at", { ascending: false });

//     console.log("=== NEWSLETTER SUBMISSIONS QUERY RESULT ===");
//     console.log("Raw data:", newsletterData);
//     console.log("Error:", newsletterError);
//     console.log("Count:", newsletterCount);
//     console.log("Array length:", newsletterData?.length);

//     // Handle errors
//     if (formError) {
//       console.error("❌ FORM SUBMISSIONS ERROR:", formError);
//       console.error("Error breakdown:", {
//         code: formError.code,
//         message: formError.message,
//         details: formError.details,
//         hint: formError.hint
//       });

//       // Check if it's an RLS error
//       if (formError.code === '42501' || formError.message?.includes('RLS') || formError.message?.includes('policy')) {
//         console.error("🔒 RLS POLICY ERROR - User might not have permission to access form_submissions table");
//         toast.error("Permission denied: Cannot access form submissions. Check RLS policies.");
//       } else if (formError.code === '42P01') {
//         console.error("📋 TABLE NOT FOUND - form_submissions table might not exist");
//         toast.error("Table not found: form_submissions table might not exist.");
//       } else {
//         toast.error("Failed to load form submissions: " + formError.message);
//       }
//     }

//     if (newsletterError) {
//       console.error("❌ NEWSLETTER ERROR:", newsletterError);
//       toast.error("Failed to load newsletter submissions: " + newsletterError.message);
//     }

//     // Combine and format the data
//     const combinedData: CombinedSubmission[] = [];

//     // Add form submissions if available
//     if (formData && Array.isArray(formData)) {
//       console.log(`✅ Processing ${formData.length} form submissions...`);
//       formData.forEach((item, index) => {
//         console.log(`Form submission ${index + 1}:`, {
//           id: item.id,
//           name: item.name,
//           email: item.email,
//           form_type: item.form_type,
//           created_at: item.created_at
//         });

//         combinedData.push({
//           id: item.id,
//           name: item.name,
//           email: item.email,
//           form_type: item.form_type || 'contact',
//           phone: item.phone,
//           subject: item.subject,
//           message: item.message,
//           company: item.company,
//           service_type: item.service_type,
//           budget: item.budget,
//           timeline: item.timeline,
//           additional_info: item.additional_info,
//           status: item.status || 'new',
//           created_at: item.created_at
//         });
//       });
//     } else {
//       console.warn("⚠️ No form submissions found or data is not an array");
//       console.log("Form data details:", {
//         value: formData,
//         type: typeof formData,
//         isArray: Array.isArray(formData),
//         isNull: formData === null,
//         isUndefined: formData === undefined
//       });
//     }

//     // Add newsletter submissions if available
//     if (newsletterData && Array.isArray(newsletterData)) {
//       console.log(`✅ Processing ${newsletterData.length} newsletter submissions...`);
//       newsletterData.forEach((item, index) => {
//         console.log(`Newsletter submission ${index + 1}:`, {
//           id: item.id,
//           email: item.email,
//           created_at: item.created_at
//         });

//         combinedData.push({
//           id: item.id,
//           name: 'Newsletter Subscriber',
//           email: item.email,
//           form_type: 'newsletter',
//           status: 'subscribed',
//           created_at: item.created_at
//         });
//       });
//     } else {
//       console.warn("⚠️ No newsletter submissions found or data is not an array");
//     }

//     // Sort by created_at descending
//     combinedData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

//     console.log("=== FINAL RESULTS SUMMARY ===");
//     console.log(`📊 Total combined submissions: ${combinedData.length}`);
//     console.log(`📝 Form submissions: ${formData?.length || 0}`);
//     console.log(`📧 Newsletter submissions: ${newsletterData?.length || 0}`);
//     console.log("Final combined data preview:", combinedData.slice(0, 2));

//     // If no form submissions, provide troubleshooting info
//     if ((!formData || formData.length === 0) && !formError) {
//       console.log("🔍 TROUBLESHOOTING: form_submissions table appears empty");
//       console.log("Possible causes:");
//       console.log("1. No data has been inserted into form_submissions table");
//       console.log("2. RLS policies are blocking access");
//       console.log("3. Data exists but query conditions are filtering it out");

//       // Try a simple count query to verify table access
//       const { count: simpleCount, error: countError } = await supabase
//         .from("form_submissions")
//         .select("*", { count: 'exact', head: true });

//       console.log("Simple count test:", { count: simpleCount, error: countError });
//     }

//     return combinedData;
//   } catch (err) {
//     console.error("💥 UNEXPECTED ERROR in getFormSubmissions:", err);
//     console.error("Error stack:", err instanceof Error ? err.stack : 'No stack trace');
//     toast.error("Failed to load submissions: " + (err instanceof Error ? err.message : 'Unknown error'));
//     return [];
//   }
// }
