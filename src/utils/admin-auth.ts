import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const getAdminApiKey = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('api_key')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error("Error fetching API key:", error);
      return null;
    }

    return data?.api_key || null;
  } catch (error) {
    console.error("Error getting API key:", error);
    return null;
  }
};

export const isAdminUser = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // If no row is found, it means the user is not an admin
      if (error.message.includes('No rows found')) {
        return false;
      }
      console.error("Error checking admin status:", error);
      return false;
    }

    return !!data; // Returns true if data exists, false otherwise
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

export const getUserRole = async (userId: string): Promise<'Owner' | 'Admin' | 'Viewer' | null> => {
    try {
        const { data, error } = await supabase
            .from('admins')
            .select('role')
            .eq('user_id', userId)
            .single();

        if (error) {
            // If no row is found, it means the user is not an admin
            if (error.message.includes('No rows found')) {
                return null;
            }
            console.error("Error fetching user role:", error);
            return null;
        }

        return data?.role || null;
    } catch (error) {
        console.error("Error getting user role:", error);
        return null;
    }
};

export const createAdminUser = async (userId: string, role: 'Owner' | 'Admin' | 'Viewer'): Promise<boolean> => {
    try {
        const apiKey = generateApiKey();
        const { data, error } = await supabase
            .from('admins')
            .insert([{ user_id: userId, role: role, api_key: apiKey }]);

        if (error) {
            console.error("Error creating admin user:", error);
            toast.error('Failed to create admin user');
            return false;
        }

        toast.success('Admin user created successfully');
        return true;
    } catch (error) {
        console.error("Error creating admin user:", error);
        toast.error('Failed to create admin user');
        return false;
    }
};

export const updateAdminUserRole = async (userId: string, newRole: 'Owner' | 'Admin' | 'Viewer'): Promise<boolean> => {
    try {
        const { data, error } = await supabase
            .from('admins')
            .update({ role: newRole })
            .eq('user_id', userId);

        if (error) {
            console.error("Error updating admin user role:", error);
            toast.error('Failed to update admin user role');
            return false;
        }

        toast.success('Admin user role updated successfully');
        return true;
    } catch (error) {
        console.error("Error updating admin user role:", error);
        toast.error('Failed to update admin user role');
        return false;
    }
};

export const deleteAdminUser = async (userId: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase
            .from('admins')
            .delete()
            .eq('user_id', userId);

        if (error) {
            console.error("Error deleting admin user:", error);
            toast.error('Failed to delete admin user');
            return false;
        }

        toast.success('Admin user deleted successfully');
        return true;
    } catch (error) {
        console.error("Error deleting admin user:", error);
        toast.error('Failed to delete admin user');
        return false;
    }
};

// Generate a secure API key
const generateApiKey = (): string => {
    const apiKey = crypto.randomBytes(32).toString('hex');
    return apiKey;
};

export const checkApiKeyValidity = async (apiKey: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase
            .from('admins')
            .select('id')
            .eq('api_key', apiKey)
            .single();

        if (error) {
            // If no row is found, the API key is invalid
            if (error.message.includes('No rows found')) {
                return false;
            }
            console.error("Error checking API key validity:", error);
            return false;
        }

        return !!data; // Returns true if data exists, false otherwise
    } catch (error) {
        console.error("Error checking API key validity:", error);
        return false;
    }
};

export const withAdminAuth = (handler: any) => {
    return async (req: any, res: any) => {
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
            return res.status(401).json({ message: 'No API key provided' });
        }

        const isValid = await checkApiKeyValidity(apiKey);

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid API key' });
        }

        // Fetch the user's role based on the API key
        const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('role')
            .eq('api_key', apiKey)
            .single();

        if (adminError) {
            console.error("Error fetching admin data:", adminError);
            return res.status(500).json({ message: 'Failed to authenticate' });
        }

        const currentUserRole = adminData?.role;

        // Check if the user has the necessary role to access the handler
        if (!currentUserRole) {
            return res.status(403).json({ message: 'Unauthorized: User role not found' });
        }

        // Example: Allow only 'Owner' role to perform certain actions
        // if (currentUserRole === 'Owner') {
        //     // Only Owner roles can reach this code
        //     return handler(req, res);
        // } else {
        //     return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
        // }

        if (currentUserRole === 'Admin' || currentUserRole === 'Viewer') {
            // Only Admin or Viewer roles can reach this code
            return handler(req, res);
        } else {
            return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
        }
    };
};
