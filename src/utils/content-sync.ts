
import { supabase } from "@/integrations/supabase/client";

/**
 * Uploads a file to the content_sync_files bucket and returns the public URL.
 */
export async function uploadContentFile(file: File): Promise<string | null> {
  const filePath = `uploaded/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("content_sync_files")
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error("File upload error:", error);
    throw new Error(error.message);
  }

  // Get public URL for the file
  const { data } = supabase.storage
    .from("content_sync_files")
    .getPublicUrl(filePath);

  return data?.publicUrl || null;
}

/**
 * Get the (singleton) content sync settings from Supabase.
 */
export async function fetchContentSyncSettings() {
  const { data, error } = await supabase
    .from("content_sync_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch content sync settings:", error);
    throw error;
  }
  return data;
}

/**
 * Upserts settings and returns the new/updated row.
 * Provide fileUrl if uploading a new file; if not, set to null to remove.
 */
export async function saveContentSyncSettings({
  websiteUrl,
  contentSnippets,
  fileUrl,
}: {
  websiteUrl: string;
  contentSnippets: string;
  fileUrl: string | null;
}) {
  const { data, error } = await supabase
    .from("content_sync_settings")
    .upsert([
      {
        website_url: websiteUrl,
        content_snippets: contentSnippets,
        content_file_url: fileUrl,
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Failed to save content sync settings:", error);
    throw error;
  }
  return data;
}

