
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.5";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Initialize Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { action, userId, apiKey } = await req.json();

    // Create admin with encrypted API key
    if (action === "create") {
      // Hash the API key for secure storage
      const hashedApiKey = await bcrypt.hash(apiKey);
      
      // Insert new admin with hashed key
      const { data, error } = await supabase
        .from("admins")
        .insert([
          { 
            user_id: userId, 
            api_key: hashedApiKey,
            role: "Admin" // Default role
          }
        ])
        .select();
      
      if (error) throw error;
      
      // Log the action
      await supabase.from("audit_logs").insert({
        user_id: userId,
        action: "CREATE_ADMIN",
        details: "New admin user created",
        module: "ADMIN_AUTH"
      });
      
      return new Response(
        JSON.stringify({ success: true, message: "Admin created successfully", data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Verify admin credentials
    if (action === "verify") {
      // Get admin record by user_id
      const { data: admin, error } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", userId)
        .single();
      
      if (error || !admin) {
        return new Response(
          JSON.stringify({ success: false, message: "Invalid admin credentials" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
        );
      }
      
      // Verify the API key
      const validCredentials = await bcrypt.compare(apiKey, admin.api_key);
      
      if (!validCredentials) {
        return new Response(
          JSON.stringify({ success: false, message: "Invalid admin credentials" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
        );
      }
      
      // Log successful login
      await supabase.from("audit_logs").insert({
        user_id: userId,
        action: "ADMIN_LOGIN",
        details: "Admin login successful",
        module: "ADMIN_AUTH"
      });
      
      // Return admin details with role but without the API key
      const { api_key, ...adminData } = admin;
      
      return new Response(
        JSON.stringify({ success: true, admin: adminData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Reset admin API key
    if (action === "reset_key") {
      const { targetUserId, currentUserId, currentRole } = await req.json();
      
      // Only owners or the admin themselves can reset keys
      if (currentRole !== "Owner" && currentUserId !== targetUserId) {
        return new Response(
          JSON.stringify({ success: false, message: "Unauthorized action" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
        );
      }
      
      // Generate a new API key
      const newApiKey = crypto.randomUUID();
      const hashedApiKey = await bcrypt.hash(newApiKey);
      
      // Update the admin's API key
      const { error } = await supabase
        .from("admins")
        .update({ api_key: hashedApiKey, updated_at: new Date().toISOString() })
        .eq("user_id", targetUserId);
      
      if (error) throw error;
      
      // Log the action
      await supabase.from("audit_logs").insert({
        user_id: currentUserId,
        action: "RESET_API_KEY",
        details: `API key reset for user ${targetUserId}`,
        module: "ADMIN_AUTH"
      });
      
      return new Response(
        JSON.stringify({ success: true, message: "API key reset successfully", newApiKey }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Revoke admin access
    if (action === "revoke") {
      const { targetUserId, currentUserId, currentRole } = await req.json();
      
      // Only owners can revoke access and they can't revoke their own access
      if (currentRole !== "Owner" || currentUserId === targetUserId) {
        return new Response(
          JSON.stringify({ success: false, message: "Unauthorized action" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
        );
      }
      
      // Delete the admin record
      const { error } = await supabase
        .from("admins")
        .delete()
        .eq("user_id", targetUserId);
      
      if (error) throw error;
      
      // Log the action
      await supabase.from("audit_logs").insert({
        user_id: currentUserId,
        action: "REVOKE_ADMIN",
        details: `Admin access revoked for user ${targetUserId}`,
        module: "ADMIN_AUTH"
      });
      
      return new Response(
        JSON.stringify({ success: true, message: "Admin access revoked successfully" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Update admin role
    if (action === "update_role") {
      const { targetUserId, newRole, currentUserId, currentRole } = await req.json();
      
      // Only owners can change roles and they can't downgrade themselves
      if (currentRole !== "Owner" || (currentUserId === targetUserId && newRole !== "Owner")) {
        return new Response(
          JSON.stringify({ success: false, message: "Unauthorized action" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
        );
      }
      
      // Update the admin's role
      const { error } = await supabase
        .from("admins")
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq("user_id", targetUserId);
      
      if (error) throw error;
      
      // Log the action
      await supabase.from("audit_logs").insert({
        user_id: currentUserId,
        action: "UPDATE_ROLE",
        details: `Role updated to ${newRole} for user ${targetUserId}`,
        module: "ADMIN_AUTH"
      });
      
      return new Response(
        JSON.stringify({ success: true, message: "Role updated successfully" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    return new Response(
      JSON.stringify({ success: false, message: "Invalid action" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
