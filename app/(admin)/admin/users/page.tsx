"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { getUsers, deleteUser, createUser, updateUserRole, getUserById } from "@/lib/user-actions";
import { User, UserRole } from "@/types/user-types";
import { getUserPermissions, canPerformAction, getAvailableRolesForSelection } from "@/utils/user-permissions";
import { UserManagementHeader } from "@/components/admin/user/UserManagementHeader";
import { UserTable } from "@/components/admin/user/UserTable";
import { UserFormDialog } from "@/components/admin/user/UserFormDialog";
import { SystemAdminTransferDialog } from "@/components/admin/user/SystemAdminTransferDialog";
import { DeleteConfirmationDialog } from "@/components/admin/user/DeleteConfirmationDialog";
import { Download } from "lucide-react";

export default function UserManagement() {
  const { user: clerkUser } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentAdminUser, setCurrentAdminUser] = useState<User | null>(null);

  // System admin transfer state
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);
  const [newSuperAdminId, setNewSuperAdminId] = useState<string | null>(null);

  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // CSV Export function
  const exportUsersToCSV = () => {
    if (users.length === 0) {
      return;
    }

    // Define CSV headers
    const headers = [
      "ID",
      "Name",
      "Email",
      "Role",
      "Created At",
      "Last Updated"
    ];

    // Convert data to CSV rows
    const csvRows = [
      headers.join(","), // Header row
      ...users.map((user) =>
        [
          `"${user.id}"`,
          `"${(user.name || "").replace(/"/g, '""')}"`,
          `"${user.email}"`,
          `"${(user.role || "").replace("_", " ")}"`,
          `"${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}"`,
          `"${user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : ""}"`,
        ].join(",")
      ),
    ];

    // Create CSV content
    const csvContent = csvRows.join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `users_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (clerkUser?.id) {
      fetchCurrentAdminUser();
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser?.id]);

  const fetchCurrentAdminUser = async () => {
    if (!clerkUser?.id) return;

    try {
      // Find the user in our database by clerkId
      const allUsers = await getUsers();
      if (allUsers.success && allUsers.data) {
        const currentUser = allUsers.data.find(u => u.clerkId === clerkUser.id);
        if (currentUser) {
          setCurrentAdminUser(currentUser as User);
        }
      }
    } catch (error) {
      console.error("Error fetching current admin user:", error);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getUsers();
      if (res.success && res.data) {
        setUsers(res.data as User[]);
      } else {
        toast.error("Failed to load users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
  }) => {
    try {
      if (editingUser) {
        // Update existing user role
        const res = await updateUserRole(editingUser.id, data.role);
        if (res.success) {
          toast.success("User updated successfully");
          fetchUsers(); // Refresh data
        } else {
          toast.error(res.error || "Failed to update user");
        }
      } else {
        // Create new user
        const res = await createUser(data);
        if (res.success) {
          toast.success("User created successfully");
          fetchUsers(); // Refresh data
        } else {
          toast.error(res.error || "Failed to create user");
        }
      }

      setIsDialogOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    }
  };

  const handleEdit = (user: User) => {
    // Check if current user can edit this user
    if (!canPerformAction(currentAdminUser!, user, 'edit')) {
      toast.error("You don't have permission to edit this user");
      return;
    }

    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    // Check if trying to delete self as system admin
    const isDeletingSelf = currentAdminUser?.id === user.id;
    const isSystemAdmin = currentAdminUser?.role === "system_admin";
    const permissions = getUserPermissions(currentAdminUser?.role || null);

    if (isDeletingSelf && isSystemAdmin && permissions.requiresSuperAdminTransfer) {
      // Check if there are other system admins
      const otherSystemAdmins = users.filter(u => u.role === "system_admin" && u.id !== user.id);
      if (otherSystemAdmins.length === 0) {
        toast.error("You cannot delete yourself as the last system admin. Please assign another user as system admin first.");
        return;
      }

      // Open transfer dialog
      setUserToDeleteId(user.id);
      setIsTransferDialogOpen(true);
      return;
    }

    // Open delete confirmation dialog
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const res = await deleteUser(userToDelete.id, userToDelete.clerkId);
      if (res.success) {
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh data
      } else {
        toast.error(res.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleTransferSuperAdmin = async () => {
    if (!newSuperAdminId || !userToDeleteId) return;

    try {
      // First, promote the selected user to system_admin
      const promoteRes = await updateUserRole(newSuperAdminId, "system_admin");
      if (!promoteRes.success) {
        toast.error("Failed to transfer super admin role");
        return;
      }

      // Then delete the current system admin
      const currentUser = users.find(u => u.id === userToDeleteId);
      if (currentUser) {
        const deleteRes = await deleteUser(userToDeleteId, currentUser.clerkId);
        if (deleteRes.success) {
          toast.success("Super admin role transferred and account deleted successfully");
          fetchUsers(); // Refresh data
          setIsTransferDialogOpen(false);
          setUserToDeleteId(null);
          setNewSuperAdminId(null);
        } else {
          toast.error("Failed to delete account after role transfer");
        }
      }
    } catch (error) {
      console.error("Error transferring super admin role:", error);
      toast.error("Failed to transfer super admin role");
    }
  };


  const totalPages = Math.ceil(users.length / itemsPerPage);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading admin users...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <UserManagementHeader
        onAddUser={() => {
          setEditingUser(null);
          setIsDialogOpen(true);
        }}
        onExportUsers={exportUsersToCSV}
      />

      <Card>
        <CardContent className="pt-6">
          <UserTable
            users={users}
            currentUser={currentAdminUser}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalPages={Math.ceil(users.length / itemsPerPage)}
            onEditUser={(user) => {
              setEditingUser(user);
              setIsDialogOpen(true);
            }}
            onDeleteUser={handleDelete}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      <UserFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingUser={editingUser}
        currentUser={currentAdminUser}
        onSubmit={handleSubmit}
      />

      <SystemAdminTransferDialog
        isOpen={isTransferDialogOpen}
        onOpenChange={setIsTransferDialogOpen}
        users={users}
        userToDeleteId={userToDeleteId}
        newSuperAdminId={newSuperAdminId}
        onNewSuperAdminChange={setNewSuperAdminId}
        onConfirmTransfer={handleTransferSuperAdmin}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        userToDelete={userToDelete}
        currentUserId={currentAdminUser?.id || null}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
}
