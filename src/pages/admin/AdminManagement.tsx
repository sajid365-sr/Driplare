
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
import { addAdmin, getAdmins, removeAdmin } from "@/utils/admin-utils";

export default function AdminManagement() {
  const [newUserId, setNewUserId] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [admins, setAdmins] = useState(getAdmins());
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);

  // Add a new admin
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!newUserId.trim() || !newApiKey.trim()) {
        toast.error("Please enter both User ID and API Key");
        return;
      }
      
      addAdmin(newUserId, newApiKey);
      setAdmins(getAdmins()); // Refresh the list
      setNewUserId("");
      setNewApiKey("");
      toast.success("Admin added successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // Delete admin confirmation
  const handleConfirmDelete = () => {
    if (adminToDelete) {
      removeAdmin(adminToDelete);
      setAdmins(getAdmins()); // Refresh the list
      setAdminToDelete(null);
      toast.success("Admin removed successfully");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Admin List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>
                List of all administrators that have access to the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.userId}>
                      <TableCell className="font-medium">{admin.userId}</TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setAdminToDelete(admin.userId)}
                        >
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Add Admin Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create New Admin</CardTitle>
              <CardDescription>
                Add a new administrator to the system.
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
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit"
                form="add-admin-form"
                className="bg-primary hover:bg-primary/90"
              >
                Add Admin
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
