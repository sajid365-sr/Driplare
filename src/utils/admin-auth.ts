
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Admin session interface
export interface AdminSession {
  id: string;
  userId: string;
  role: 'Owner' | 'Admin' | 'Viewer';
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canExport: boolean;
    canManageAdmins: boolean;
  };
}

// Set admin session in localStorage 
export const setAdminSession = (session: AdminSession): void => {
  localStorage.setItem('driplare_admin_session', JSON.stringify(session));
};

// Get admin session from localStorage
export const getAdminSession = (): AdminSession | null => {
  const stored = localStorage.getItem('driplare_admin_session');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as AdminSession;
  } catch (error) {
    console.error('Failed to parse admin session:', error);
    return null;
  }
};

// Clear admin session from localStorage
export const clearAdminSession = (): void => {
  localStorage.removeItem('driplare_admin_session');
};

// Determine permissions based on role
export const getRolePermissions = (role: 'Owner' | 'Admin' | 'Viewer') => {
  switch (role) {
    case 'Owner':
      return {
        canView: true,
        canEdit: true,
        canExport: true,
        canManageAdmins: true
      };
    case 'Admin':
      return {
        canView: true,
        canEdit: true,
        canExport: true,
        canManageAdmins: false
      };
    case 'Viewer':
      return {
        canView: true,
        canEdit: false,
        canExport: false,
        canManageAdmins: false
      };
    default:
      return {
        canView: false,
        canEdit: false,
        canExport: false,
        canManageAdmins: false
      };
  }
};

// Verify admin credentials against Supabase
export const verifyAdminCredentials = async (
  userId: string, 
  apiKey: string
): Promise<AdminSession | null> => {
  try {
    // Call our admin-auth edge function
    const response = await supabase.functions.invoke('admin-auth', {
      body: { action: 'verify', userId, apiKey }
    });
    
    if (response.error) {
      toast.error('Authentication failed: ' + response.error.message);
      return null;
    }
    
    if (!response.data.success) {
      toast.error('Invalid credentials');
      return null;
    }
    
    const adminData = response.data.admin;
    
    // Create an admin session with role-based permissions
    const session: AdminSession = {
      id: adminData.id,
      userId: adminData.user_id,
      role: adminData.role,
      permissions: getRolePermissions(adminData.role)
    };
    
    // Store the session
    setAdminSession(session);
    
    return session;
  } catch (error) {
    console.error('Admin authentication error:', error);
    toast.error('Authentication failed. Please try again.');
    return null;
  }
};

// Create a new admin
export const createAdmin = async (
  userId: string, 
  apiKey: string, 
  role: 'Admin' | 'Viewer',
  currentUserId: string,
  currentRole: string
): Promise<boolean> => {
  try {
    // Only Owners can create Owners
    if (role === 'Owner' && currentRole !== 'Owner') {
      toast.error('Only Owners can create Owner accounts');
      return false;
    }
    
    // Call our admin-auth edge function
    const response = await supabase.functions.invoke('admin-auth', {
      body: { 
        action: 'create', 
        userId, 
        apiKey,
        role,
        currentUserId,
        currentRole
      }
    });
    
    if (response.error || !response.data.success) {
      toast.error('Failed to create admin: ' + (response.error?.message || response.data.message));
      return false;
    }
    
    toast.success('Admin created successfully');
    return true;
  } catch (error) {
    console.error('Create admin error:', error);
    toast.error('Failed to create admin. Please try again.');
    return false;
  }
};

// Reset admin API key
export const resetApiKey = async (
  targetUserId: string,
  currentUserId: string,
  currentRole: string
): Promise<string | null> => {
  try {
    const response = await supabase.functions.invoke('admin-auth', {
      body: { 
        action: 'reset_key', 
        targetUserId,
        currentUserId,
        currentRole
      }
    });
    
    if (response.error || !response.data.success) {
      toast.error('Failed to reset API key: ' + (response.error?.message || response.data.message));
      return null;
    }
    
    toast.success('API key reset successfully');
    return response.data.newApiKey;
  } catch (error) {
    console.error('Reset API key error:', error);
    toast.error('Failed to reset API key. Please try again.');
    return null;
  }
};

// Revoke admin access
export const revokeAdmin = async (
  targetUserId: string,
  currentUserId: string,
  currentRole: string
): Promise<boolean> => {
  try {
    const response = await supabase.functions.invoke('admin-auth', {
      body: { 
        action: 'revoke', 
        targetUserId,
        currentUserId,
        currentRole
      }
    });
    
    if (response.error || !response.data.success) {
      toast.error('Failed to revoke access: ' + (response.error?.message || response.data.message));
      return false;
    }
    
    toast.success('Admin access revoked successfully');
    return true;
  } catch (error) {
    console.error('Revoke admin error:', error);
    toast.error('Failed to revoke admin access. Please try again.');
    return false;
  }
};

// Update admin role
export const updateAdminRole = async (
  targetUserId: string,
  newRole: 'Owner' | 'Admin' | 'Viewer',
  currentUserId: string,
  currentRole: string
): Promise<boolean> => {
  try {
    const response = await supabase.functions.invoke('admin-auth', {
      body: { 
        action: 'update_role', 
        targetUserId,
        newRole,
        currentUserId,
        currentRole
      }
    });
    
    if (response.error || !response.data.success) {
      toast.error('Failed to update role: ' + (response.error?.message || response.data.message));
      return false;
    }
    
    toast.success('Role updated successfully');
    return true;
  } catch (error) {
    console.error('Update role error:', error);
    toast.error('Failed to update role. Please try again.');
    return false;
  }
};
