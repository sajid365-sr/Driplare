
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  getAdminSession,
  resetApiKey,
  revokeAdmin,
  updateAdminRole,
  createAdmin
} from "@/utils/admin-auth";

// Extended admin interface with roles
interface AdminWithRole {
  id: string;
  user_id: string;
  role: "Owner" | "Admin" | "Viewer";
  created_at: string;
}

// Badge color mapping for roles
const roleBadgeVariants = {
  "Owner": "default",
  "Admin": "secondary",
  "Viewer": "outline"
};

export default function AdminManagement() {
  const [newUserId, setNewUserId] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [newRole, setNewRole] = useState<"Owner" | "Admin" | "Viewer">("Admin");
  const [admins, setAdmins] = useState<AdminWithRole[]>([]);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resetKeyModal, setResetKeyModal] = useState<{open: boolean, userId: string, newKey: string | null}>({
    open: false,
    userId: "",
    newKey: null
  });

  // Get current admin session
  const adminSession = getAdminSession();
  const currentUserId = adminSession?.userId || "";
  const currentRole = adminSession?.role || "Viewer";
  
  // Fetch admins from Supabase on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id, user_id, role, created_at')
        .order('role', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to load admin users');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new admin
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!newUserId.trim() || !newApiKey.trim()) {
        toast.error("Please enter both User ID and API Key");
        return;
      }
      
      // Check if admin already exists
      const exists = admins.some(admin => admin.user_id === newUserId);
      if (exists) {
        toast.error("Admin with this User ID already exists");
        return;
      }
      
      const success = await createAdmin(
        newUserId, 
        newApiKey, 
        newRole as "Admin" | "Viewer",
        currentUserId,
        currentRole
      );
      
      if (success) {
        // Reset form
        setNewUserId("");
        setNewApiKey("");
        setNewRole("Admin");
        
        // Refresh admins list
        fetchAdmins();
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error("Failed to add admin user");
    }
  };

  // Delete admin confirmation
  const handleConfirmDelete = async () => {
    if (adminToDelete) {
      try {
        const success = await revokeAdmin(adminToDelete, currentUserId, currentRole);
        
        if (success) {
          // Refresh admins list
          fetchAdmins();
          setAdminToDelete(null);
        }
      } catch (error) {
        console.error("Error revoking admin access:", error);
        toast.error("Failed to revoke admin access");
      }
    }
  };
  
  // Handle admin role change
  const handleRoleChange = async (userId: string, newRole: "Owner" | "Admin" | "Viewer") => {
    try {
      const success = await updateAdminRole(userId, newRole, currentUserId, currentRole);
      
      if (success) {
        // Update local state to reflect change
        setAdmins(admins.map(admin => 
          admin.user_id === userId ? { ...admin, role: newRole } : admin
        ));
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update admin role");
    }
  };

  // Handle API key reset
  const handleResetKey = async (userId: string) => {
    try {
      const newKey = await resetApiKey(userId, currentUserId, currentRole);
      
      if (newKey) {
        setResetKeyModal({
          open: true,
          userId,
          newKey
        });
      }
    } catch (error) {
      console.error("Error resetting API key:", error);
      toast.error("Failed to reset API key");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">User Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Admin List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>
                Manage administrators and their access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center py-4">Loading admin users...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.user_id}</TableCell>
                        <TableCell>
                          {currentRole === "Owner" && admin.user_id !== currentUserId ? (
                            <Select 
                              value={admin.role} 
                              onValueChange={(val) => handleRoleChange(
                                admin.user_id, 
                                val as "Owner" | "Admin" | "Viewer"
                              )}
                            >
                              <SelectTrigger className="w-28 h-8">
                                <Badge 
                                  variant={roleBadgeVariants[admin.role] as any} 
                                  className="font-normal"
                                >
                                  {admin.role}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Owner">Owner</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge 
                              variant={roleBadgeVariants[admin.role] as any} 
                              className="font-normal"
                            >
                              {admin.role}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleResetKey(admin.user_id)}
                              disabled={admin.role === "Owner" && admin.user_id !== currentUserId}
                            >
                              Reset Key
                            </Button>
                            {currentRole === "Owner" && admin.user_id !== currentUserId && (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => setAdminToDelete(admin.user_id)}
                              >
                                Revoke
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          {/* Role Permissions Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Access levels for each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>View</TableHead>
                    <TableHead>Edit</TableHead>
                    <TableHead>Export</TableHead>
                    <TableHead>Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="default">Owner</Badge>
                    </TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell>✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary">Admin</Badge>
                    </TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell>❌</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline">Viewer</Badge>
                    </TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell>❌</TableCell>
                    <TableCell>❌</TableCell>
                    <TableCell>❌</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Add Admin Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create New User</CardTitle>
              <CardDescription>
                Add a new administrator to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="add-admin-form" onSubmit={handleAddAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    placeholder="Enter admin user ID"
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter admin API key"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Access Role</Label>
                  <Select 
                    value={newRole} 
                    onValueChange={(value) => setNewRole(value as "Owner" | "Admin" | "Viewer")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentRole === "Owner" && <SelectItem value="Owner">Owner</SelectItem>}
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Owner role can only be assigned by existing Owners
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit"
                form="add-admin-form"
                className="bg-primary hover:bg-primary/90"
              >
                Add User
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Confirmation Dialog for Delete */}
      <AlertDialog open={!!adminToDelete} onOpenChange={() => setAdminToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove admin access for "{adminToDelete}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Reset Key Modal */}
      <AlertDialog 
        open={resetKeyModal.open} 
        onOpenChange={(open) => setResetKeyModal({...resetKeyModal, open})}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>API Key Reset</AlertDialogTitle>
            <AlertDialogDescription>
              <p>A new API key has been generated for user "{resetKeyModal.userId}".</p>
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="font-mono text-sm break-all">{resetKeyModal.newKey}</p>
              </div>
              <p className="mt-4 text-amber-500">
                Save this key now. It will not be shown again for security reasons.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              I've Saved The Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
