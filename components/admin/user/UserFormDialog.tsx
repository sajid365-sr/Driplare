"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { User, UserRole } from "@/types/user-types";
import { getAvailableRolesForSelection } from "@/utils/user-permissions";

interface UserFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser: User | null;
  currentUser: User | null;
  onSubmit: (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
  }) => void;
}

export function UserFormDialog({
  isOpen,
  onOpenChange,
  editingUser,
  currentUser,
  onSubmit,
}: UserFormDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "user" as UserRole,
  });

  // Reset form when dialog opens/closes or editing user changes
  const resetForm = () => {
    if (editingUser) {
      const nameParts = editingUser.name?.split(" ") || ["", ""];
      setFormData({
        email: editingUser.email,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        password: "", // Password not shown for editing
        role: (editingUser.role || "user") as UserRole,
      });
    } else {
      const permissions = getAvailableRolesForSelection(currentUser?.role || null);
      const defaultRole = permissions[0] || "user";
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        role: defaultRole as UserRole,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Reset form when dialog opens or editing user changes
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, editingUser]);

  const availableRoles = getAvailableRolesForSelection(currentUser?.role || null, !!editingUser);
  const isSystemAdminEditing = currentUser?.role === "system_admin" && editingUser;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? isSystemAdminEditing
                  ? "Change the user's role."
                  : "Update the user's information and permissions."
                : "Create a new user account with specified permissions."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!isSystemAdminEditing && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="col-span-3"
                    required
                    disabled={editingUser ? true : false}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                    required
                    disabled={!!editingUser}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                    required
                    disabled={!!editingUser}
                  />
                </div>
              </>
            )}
            {!editingUser && (
              <div className="space-y-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <div className="col-span-3 relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="pr-10"
                      required
                      placeholder="Enter a secure password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="ml-[calc(25%+1rem)]">
                  <p className="text-sm text-muted-foreground">
                    Password must contain:
                  </p>
                  <ul className="text-xs text-muted-foreground mt-1 ml-4 space-y-1">
                    <li>• At least 8 characters</li>
                    <li>• One uppercase letter</li>
                    <li>• One lowercase letter</li>
                    <li>• One number</li>
                    <li>• One special character (!@#$%^&*)</li>
                  </ul>
                </div>
              </div>
            )}
            {isSystemAdminEditing && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <strong>Current User:</strong> {editingUser.name || editingUser.email}
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, role: value as UserRole }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role === "system_admin" ? "System Admin" : role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {editingUser ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}