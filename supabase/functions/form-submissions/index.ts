
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse the request body
    const { action, submissionIds, formData } = await req.json();

    // Handle different actions
    switch (action) {
      case 'get': {
        const { data, error } = await supabaseClient
          .from('form_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true, submissions: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'submit': {
        if (!formData || !formData.name || !formData.email || !formData.form_type) {
          return new Response(
            JSON.stringify({ success: false, message: 'Missing required fields' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        // Create a notification for the form submission
        const { data: notificationData, error: notificationError } = await supabaseClient
          .from('notifications')
          .insert({
            title: 'New form submission',
            message: `New ${formData.form_type} form submitted by ${formData.name}`,
            type: 'submission',
            recipient: 'admin'
          })
          .select();
        
        if (notificationError) {
          console.error('Notification creation error:', notificationError);
        }
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Notification created',
            notification: notificationData ? notificationData[0] : null 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update_status': {
        const { id, status } = await req.json();
        
        if (!id || !status) {
          return new Response(
            JSON.stringify({ success: false, message: 'Missing required fields' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { data, error } = await supabaseClient
          .from('form_submissions')
          .update({ status })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true, submission: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'delete': {
        if (!submissionIds || !Array.isArray(submissionIds) || submissionIds.length === 0) {
          return new Response(
            JSON.stringify({ success: false, message: 'No submission IDs provided' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }

        const { error } = await supabaseClient
          .from('form_submissions')
          .delete()
          .in('id', submissionIds);
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true, message: 'Submissions deleted' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
