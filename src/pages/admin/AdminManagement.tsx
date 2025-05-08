
import { useState } from "react";
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
import { addAdmin, getAdmins, removeAdmin } from "@/utils/admin-utils";

// Extended admin interface with roles
interface AdminWithRole {
  userId: string;
  apiKey: string;
  role: "Owner" | "Admin" | "Viewer";
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
  
  // Initial admins with mock roles added
  const initialAdmins: AdminWithRole[] = getAdmins().map(admin => ({
    ...admin, 
    role: admin.userId.includes("admin") ? "Admin" : 
          admin.userId.includes("owner") ? "Owner" : "Viewer"
  }));
  
  const [admins, setAdmins] = useState<AdminWithRole[]>(initialAdmins);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);

  // Add a new admin
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!newUserId.trim() || !newApiKey.trim()) {
        toast.error("Please enter both User ID and API Key");
        return;
      }
      
      // Add to localStorage via admin-utils
      addAdmin(newUserId, newApiKey);
      
      // Update local state with role information
      setAdmins([
        ...admins,
        { userId: newUserId, apiKey: newApiKey, role: newRole }
      ]);
      
      // Reset form
      setNewUserId("");
      setNewApiKey("");
      setNewRole("Admin");
      
      toast.success("Admin added successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // Delete admin confirmation
  const handleConfirmDelete = () => {
    if (adminToDelete) {
      // Remove from localStorage
      removeAdmin(adminToDelete);
      
      // Update local state
      setAdmins(admins.filter(admin => admin.userId !== adminToDelete));
      setAdminToDelete(null);
      
      toast.success("Admin removed successfully");
    }
  };
  
  // Change admin role
  const handleRoleChange = (userId: string, newRole: "Owner" | "Admin" | "Viewer") => {
    setAdmins(admins.map(admin => 
      admin.userId === userId ? { ...admin, role: newRole } : admin
    ));
    
    toast.success(`Role updated for ${userId}`);
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
                    <TableRow key={admin.userId}>
                      <TableCell className="font-medium">{admin.userId}</TableCell>
                      <TableCell>
                        <Select 
                          value={admin.role} 
                          onValueChange={(val) => handleRoleChange(
                            admin.userId, 
                            val as "Owner" | "Admin" | "Viewer"
                          )}
                          disabled={admin.role === "Owner"}
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
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={admin.role === "Owner"}
                          >
                            Reset Key
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setAdminToDelete(admin.userId)}
                            disabled={admin.role === "Owner"}
                          >
                            Revoke
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
      
      {/* Confirmation Dialog */}
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
    </div>
  );
}
