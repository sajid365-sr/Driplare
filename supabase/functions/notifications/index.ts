
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.5";

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

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { action } = await req.json();

    // Get all notifications
    if (action === "get") {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("timestamp", { ascending: false });
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true, notifications: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Create a new notification
    if (action === "create") {
      const { title, message, type, recipient, userId } = await req.json();
      
      const { data, error } = await supabase
        .from("notifications")
        .insert([
          { 
            title, 
            message, 
            type, 
            recipient,
            timestamp: new Date().toISOString(),
            read: false
          }
        ])
        .select();
      
      if (error) throw error;
      
      // Log the action
      await supabase.from("audit_logs").insert({
        user_id: userId,
        action: "CREATE_NOTIFICATION",
        details: `New notification created: ${title}`,
        module: "NOTIFICATIONS"
      });
      
      return new Response(
        JSON.stringify({ success: true, message: "Notification created successfully", data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Mark notifications as read
    if (action === "mark_read") {
      const { notificationIds, userId } = await req.json();
      
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .in("id", notificationIds);
      
      if (error) throw error;
      
      // Log the action
      await supabase.from("audit_logs").insert({
        user_id: userId,
        action: "MARK_NOTIFICATIONS_READ",
        details: `Marked ${notificationIds.length} notifications as read`,
        module: "NOTIFICATIONS"
      });
      
      return new Response(
        JSON.stringify({ success: true, message: "Notifications marked as read" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Delete notifications
    if (action === "delete") {
      const { notificationIds, userId } = await req.json();
      
      const { error } = await supabase
        .from("notifications")
        .delete()
        .in("id", notificationIds);
      
      if (error) throw error;
      
      // Log the action
      await supabase.from("audit_logs").insert({
        user_id: userId,
        action: "DELETE_NOTIFICATIONS",
        details: `Deleted ${notificationIds.length} notifications`,
        module: "NOTIFICATIONS"
      });
      
      return new Response(
        JSON.stringify({ success: true, message: "Notifications deleted successfully" }),
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
