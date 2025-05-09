
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    const { action, userId, apiKey, role, targetUserId, currentUserId, currentRole } = await req.json();

    // Audit log function
    const logAction = async (userId: string, action: string, details: string) => {
      await supabase.from('audit_logs').insert({
        user_id: userId,
        action: action,
        details: details,
        module: 'admin-auth'
      });
    };

    // Verify admin credentials
    if (action === 'verify') {
      // Query the database for the admin user
      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error || !admin) {
        await logAction('system', 'login_failed', `Failed login attempt for user ${userId}: User not found`);
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { headers: { 'Content-Type': 'application/json' }, status: 401 }
        );
      }

      // For the default owner account, allow direct API key comparison
      if (userId === 'owner' && apiKey === 'encrypted-secret-key-1') {
        await logAction(userId, 'login_success', 'Owner login successful using default credentials');
        return new Response(
          JSON.stringify({ success: true, admin }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }

      // For other accounts, compare using bcrypt
      const passwordMatch = await bcrypt.compare(apiKey, admin.api_key);
      
      if (passwordMatch) {
        await logAction(userId, 'login_success', 'Admin login successful');
        return new Response(
          JSON.stringify({ success: true, admin }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        await logAction('system', 'login_failed', `Failed login attempt for user ${userId}: Invalid API key`);
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { headers: { 'Content-Type': 'application/json' }, status: 401 }
        );
      }
    }

    // Create new admin
    else if (action === 'create') {
      // Check permission: Only Owners can create Owners, and all roles can create Admins/Viewers
      if (role === 'Owner' && currentRole !== 'Owner') {
        return new Response(
          JSON.stringify({ success: false, message: 'Only Owners can create Owner accounts' }),
          { headers: { 'Content-Type': 'application/json' }, status: 403 }
        );
      }

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('admins')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingUser) {
        return new Response(
          JSON.stringify({ success: false, message: 'User ID already exists' }),
          { headers: { 'Content-Type': 'application/json' }, status: 409 }
        );
      }

      // Hash the API key
      const hashedApiKey = await bcrypt.hash(apiKey);

      // Insert new admin
      const { data, error } = await supabase
        .from('admins')
        .insert({
          user_id: userId,
          api_key: hashedApiKey,
          role: role
        })
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ success: false, message: error.message }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
      }

      await logAction(currentUserId, 'create_admin', `Created new ${role} account for ${userId}`);

      return new Response(
        JSON.stringify({ success: true, admin: data }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Reset API key
    else if (action === 'reset_key') {
      // Check permissions based on roles
      const { data: targetAdmin, error: fetchError } = await supabase
        .from('admins')
        .select('role')
        .eq('user_id', targetUserId)
        .single();

      if (fetchError) {
        return new Response(
          JSON.stringify({ success: false, message: 'Admin not found' }),
          { headers: { 'Content-Type': 'application/json' }, status: 404 }
        );
      }

      // Only Owners can reset Owner keys, or higher roles can reset lower roles
      if ((targetAdmin.role === 'Owner' && currentRole !== 'Owner') || 
         (targetAdmin.role === 'Admin' && currentRole === 'Viewer')) {
        return new Response(
          JSON.stringify({ success: false, message: 'Permission denied' }),
          { headers: { 'Content-Type': 'application/json' }, status: 403 }
        );
      }

      // Generate a new API key
      const newApiKey = crypto.randomUUID();
      const hashedApiKey = await bcrypt.hash(newApiKey);

      // Update the admin record
      const { error: updateError } = await supabase
        .from('admins')
        .update({ api_key: hashedApiKey })
        .eq('user_id', targetUserId);

      if (updateError) {
        return new Response(
          JSON.stringify({ success: false, message: updateError.message }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
      }

      await logAction(currentUserId, 'reset_api_key', `Reset API key for ${targetUserId}`);

      return new Response(
        JSON.stringify({ success: true, newApiKey }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Revoke admin access
    else if (action === 'revoke') {
      // Check permissions
      const { data: targetAdmin, error: fetchError } = await supabase
        .from('admins')
        .select('role')
        .eq('user_id', targetUserId)
        .single();

      if (fetchError) {
        return new Response(
          JSON.stringify({ success: false, message: 'Admin not found' }),
          { headers: { 'Content-Type': 'application/json' }, status: 404 }
        );
      }

      // Role-based permission check
      if ((targetAdmin.role === 'Owner' && currentRole !== 'Owner') ||
         (targetAdmin.role === 'Admin' && currentRole === 'Viewer') ||
         (currentRole === targetAdmin.role && currentUserId !== targetUserId)) {
        return new Response(
          JSON.stringify({ success: false, message: 'Permission denied' }),
          { headers: { 'Content-Type': 'application/json' }, status: 403 }
        );
      }

      // Delete the admin record
      const { error: deleteError } = await supabase
        .from('admins')
        .delete()
        .eq('user_id', targetUserId);

      if (deleteError) {
        return new Response(
          JSON.stringify({ success: false, message: deleteError.message }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
      }

      await logAction(currentUserId, 'revoke_admin', `Revoked admin access for ${targetUserId}`);

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update admin role
    else if (action === 'update_role') {
      // Only Owners can change roles
      if (currentRole !== 'Owner') {
        return new Response(
          JSON.stringify({ success: false, message: 'Only Owners can update roles' }),
          { headers: { 'Content-Type': 'application/json' }, status: 403 }
        );
      }

      // Update the admin role
      const { error: updateError } = await supabase
        .from('admins')
        .update({ role: newRole })
        .eq('user_id', targetUserId);

      if (updateError) {
        return new Response(
          JSON.stringify({ success: false, message: updateError.message }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
      }

      await logAction(currentUserId, 'update_role', `Updated role for ${targetUserId} to ${newRole}`);

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Unknown action
    return new Response(
      JSON.stringify({ success: false, message: 'Unknown action' }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({ success: false, message: 'Server error', error: String(error) }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
