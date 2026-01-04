// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";

// export interface AdminSession {
//   userId: string;
//   apiKey: string;
//   role: 'Owner' | 'Admin' | 'Viewer';
//   permissions: {
//     canView: boolean;
//     canEdit: boolean;
//     canDelete: boolean;
//     canExport: boolean;
//     canManageAdmins: boolean;
//   }
// }

// // Verify admin credentials
// export const verifyAdminCredentials = async (userId: string, apiKey: string): Promise<AdminSession | null> => {
//   try {
//     const { data, error } = await supabase
//       .from('admins')
//       .select('user_id, role, api_key')
//       .eq('user_id', userId)
//       .eq('api_key', apiKey)
//       .single();

//     if (error || !data) {
//       toast.error('Invalid credentials');
//       return null;
//     }

//     // Store admin session in localStorage
//     const session = createAdminSession(data.user_id, data.api_key, data.role);
//     setAdminSession(session);

//     return session;
//   } catch (error) {
//     console.error('Authentication error:', error);
//     toast.error('Authentication failed');
//     return null;
//   }
// };

// // Create admin session object with appropriate permissions
// export const createAdminSession = (userId: string, apiKey: string, role: 'Owner' | 'Admin' | 'Viewer'): AdminSession => {
//   // Set permissions based on role
//   const permissions = {
//     canView: true, // All roles can view
//     canEdit: role === 'Owner' || role === 'Admin',
//     canDelete: role === 'Owner' || role === 'Admin',
//     canExport: role === 'Owner' || role === 'Admin',
//     canManageAdmins: role === 'Owner'
//   };

//   return { userId, apiKey, role, permissions };
// };

// // Store admin session in localStorage
// export const setAdminSession = (session: AdminSession): void => {
//   localStorage.setItem('admin_session', JSON.stringify(session));
// };

// // Get admin session from localStorage
// export const getAdminSession = (): AdminSession | null => {
//   const sessionStr = localStorage.getItem('admin_session');
//   if (!sessionStr) return null;

//   try {
//     return JSON.parse(sessionStr) as AdminSession;
//   } catch (error) {
//     console.error('Failed to parse admin session:', error);
//     return null;
//   }
// };

// // Clear admin session from localStorage
// export const clearAdminSession = (): void => {
//   localStorage.removeItem('admin_session');
// };

// export const getAdminApiKey = async (userId: string): Promise<string | null> => {
//   try {
//     const { data, error } = await supabase
//       .from('admins')
//       .select('api_key')
//       .eq('user_id', userId)
//       .single();

//     if (error) {
//       console.error("Error fetching API key:", error);
//       return null;
//     }

//     return data?.api_key || null;
//   } catch (error) {
//     console.error("Error getting API key:", error);
//     return null;
//   }
// };

// export const isAdminUser = async (userId: string): Promise<boolean> => {
//   try {
//     const { data, error } = await supabase
//       .from('admins')
//       .select('*')
//       .eq('user_id', userId)
//       .single();

//     if (error) {
//       // If no row is found, it means the user is not an admin
//       if (error.message.includes('No rows found')) {
//         return false;
//       }
//       console.error("Error checking admin status:", error);
//       return false;
//     }

//     return !!data; // Returns true if data exists, false otherwise
//   } catch (error) {
//     console.error("Error checking admin status:", error);
//     return false;
//   }
// };

// export const getUserRole = async (userId: string): Promise<'Owner' | 'Admin' | 'Viewer' | null> => {
//   try {
//     const { data, error } = await supabase
//       .from('admins')
//       .select('role')
//       .eq('user_id', userId)
//       .single();

//     if (error) {
//       // If no row is found, it means the user is not an admin
//       if (error.message.includes('No rows found')) {
//         return null;
//       }
//       console.error("Error fetching user role:", error);
//       return null;
//     }

//     return data?.role || null;
//   } catch (error) {
//     console.error("Error getting user role:", error);
//     return null;
//   }
// };

// export const createAdmin = async (
//   userId: string,
//   apiKey: string,
//   role: 'Owner' | 'Admin' | 'Viewer',
//   actingUserId: string,
//   actingUserRole: string
// ): Promise<boolean> => {
//   try {
//     // Check if acting user has permission to create admins
//     if (actingUserRole !== 'Owner') {
//       toast.error('Only Owners can create admin users');
//       return false;
//     }

//     const { data, error } = await supabase
//       .from('admins')
//       .insert([{ user_id: userId, role: role, api_key: apiKey }]);

//     if (error) {
//       console.error("Error creating admin user:", error);
//       toast.error('Failed to create admin user');
//       return false;
//     }

//     toast.success('Admin user created successfully');
//     return true;
//   } catch (error) {
//     console.error("Error creating admin user:", error);
//     toast.error('Failed to create admin user');
//     return false;
//   }
// };

// export const updateAdminRole = async (
//   userId: string,
//   newRole: 'Owner' | 'Admin' | 'Viewer',
//   actingUserId: string,
//   actingUserRole: string
// ): Promise<boolean> => {
//   try {
//     // Check if acting user has permission to update admin roles
//     if (actingUserRole !== 'Owner') {
//       toast.error('Only Owners can update admin roles');
//       return false;
//     }

//     // Prevent changing own role
//     if (userId === actingUserId) {
//       toast.error('You cannot change your own role');
//       return false;
//     }

//     const { data, error } = await supabase
//       .from('admins')
//       .update({ role: newRole })
//       .eq('user_id', userId);

//     if (error) {
//       console.error("Error updating admin role:", error);
//       toast.error('Failed to update admin role');
//       return false;
//     }

//     toast.success('Admin role updated successfully');
//     return true;
//   } catch (error) {
//     console.error("Error updating admin role:", error);
//     toast.error('Failed to update admin role');
//     return false;
//   }
// };

// // Alias for updateAdminRole to fix the error
// export const updateAdminUserRole = updateAdminRole;

// export const revokeAdmin = async (
//   userId: string,
//   actingUserId: string,
//   actingUserRole: string
// ): Promise<boolean> => {
//   try {
//     // Check if acting user has permission to revoke admins
//     if (actingUserRole !== 'Owner') {
//       toast.error('Only Owners can revoke admin access');
//       return false;
//     }

//     // Prevent revoking own access
//     if (userId === actingUserId) {
//       toast.error('You cannot revoke your own access');
//       return false;
//     }

//     const { data, error } = await supabase
//       .from('admins')
//       .delete()
//       .eq('user_id', userId);

//     if (error) {
//       console.error("Error revoking admin access:", error);
//       toast.error('Failed to revoke admin access');
//       return false;
//     }

//     toast.success('Admin access revoked successfully');
//     return true;
//   } catch (error) {
//     console.error("Error revoking admin access:", error);
//     toast.error('Failed to revoke admin access');
//     return false;
//   }
// };

// // Generate a secure API key
// const generateApiKey = (): string => {
//   // Fix: crypto.randomBytes doesn't exist, use crypto.getRandomValues instead
//   const array = new Uint8Array(16);
//   crypto.getRandomValues(array);
//   return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
// };

// export const resetApiKey = async (
//   userId: string,
//   actingUserId: string,
//   actingUserRole: string
// ): Promise<string | null> => {
//   try {
//     // Check if acting user has permission to reset API keys
//     if (actingUserRole !== 'Owner' && userId !== actingUserId) {
//       toast.error('You do not have permission to reset this API key');
//       return null;
//     }

//     const newApiKey = generateApiKey();

//     const { data, error } = await supabase
//       .from('admins')
//       .update({ api_key: newApiKey })
//       .eq('user_id', userId);

//     if (error) {
//       console.error("Error resetting API key:", error);
//       toast.error('Failed to reset API key');
//       return null;
//     }

//     toast.success('API key reset successfully');

//     // If the user reset their own API key, update their session
//     if (userId === actingUserId) {
//       const session = getAdminSession();
//       if (session) {
//         session.apiKey = newApiKey;
//         setAdminSession(session);
//       }
//     }

//     return newApiKey;
//   } catch (error) {
//     console.error("Error resetting API key:", error);
//     toast.error('Failed to reset API key');
//     return null;
//   }
// };

// export const checkApiKeyValidity = async (apiKey: string): Promise<boolean> => {
//   try {
//     const { data, error } = await supabase
//       .from('admins')
//       .select('id')
//       .eq('api_key', apiKey)
//       .single();

//     if (error) {
//       // If no row is found, the API key is invalid
//       if (error.message.includes('No rows found')) {
//         return false;
//       }
//       console.error("Error checking API key validity:", error);
//       return false;
//     }

//     return !!data; // Returns true if data exists, false otherwise
//   } catch (error) {
//     console.error("Error checking API key validity:", error);
//     return false;
//   }
// };

// export const withAdminAuth = (handler: any) => {
//   return async (req: any, res: any) => {
//     const apiKey = req.headers['x-api-key'];

//     if (!apiKey) {
//       return res.status(401).json({ message: 'No API key provided' });
//     }

//     const isValid = await checkApiKeyValidity(apiKey);

//     if (!isValid) {
//       return res.status(401).json({ message: 'Invalid API key' });
//     }

//     // Fetch the user's role based on the API key
//     const { data: adminData, error: adminError } = await supabase
//       .from('admins')
//       .select('role')
//       .eq('api_key', apiKey)
//       .single();

//     if (adminError) {
//       console.error("Error fetching admin data:", adminError);
//       return res.status(500).json({ message: 'Failed to authenticate' });
//     }

//     const currentUserRole = adminData?.role;

//     // Check if the user has the necessary role to access the handler
//     if (!currentUserRole) {
//       return res.status(403).json({ message: 'Unauthorized: User role not found' });
//     }

//     if (currentUserRole === 'Admin' || currentUserRole === 'Viewer') {
//       // Only Admin or Viewer roles can reach this code
//       return handler(req, res);
//     } else {
//       return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
//     }
//   };
// };
