import { User, UserRole, UserPermissions } from "@/types/user-types";

// Permission checker functions
export const getUserPermissions = (currentUserRole: UserRole | null): UserPermissions => {
  const isSystemAdmin = currentUserRole === "system_admin";
  const isAdmin = currentUserRole === "admin";
  const isUser = currentUserRole === "user";

  if (isSystemAdmin) {
    return {
      canCreateUser: true,
      canCreateAdmin: true,
      canEditUser: true,
      canEditAdmin: true,
      canDeleteUser: true,
      canDeleteAdmin: true,
      canDeleteSelf: true,
      requiresSuperAdminTransfer: true, // Must transfer super admin role before self-deletion
      availableRolesToCreate: ["user", "admin", "system_admin"],
      availableRolesToEdit: ["user", "admin", "system_admin"],
    };
  }

  if (isAdmin) {
    return {
      canCreateUser: true,
      canCreateAdmin: false,
      canEditUser: false, // Admin cannot edit users
      canEditAdmin: false, // Admin cannot edit admins
      canDeleteUser: true,
      canDeleteAdmin: false,
      canDeleteSelf: false,
      requiresSuperAdminTransfer: false,
      availableRolesToCreate: ["user"],
      availableRolesToEdit: [], // Admin cannot edit anyone
    };
  }

  // Default user permissions (shouldn't reach admin panel)
  return {
    canCreateUser: false,
    canCreateAdmin: false,
    canEditUser: false,
    canEditAdmin: false,
    canDeleteUser: false,
    canDeleteAdmin: false,
    canDeleteSelf: false,
    requiresSuperAdminTransfer: false,
    availableRolesToCreate: [],
    availableRolesToEdit: [],
  };
};

// Check if current user can perform action on target user
export const canPerformAction = (
  currentUser: User,
  targetUser: User,
  action: 'edit' | 'delete'
): boolean => {
  const permissions = getUserPermissions(currentUser.role);

  if (action === 'edit') {
    if (targetUser.role === 'system_admin' || targetUser.role === 'admin') {
      return permissions.canEditAdmin;
    }
    return permissions.canEditUser;
  }

  if (action === 'delete') {
    // Cannot delete self unless system admin and transferring role
    if (currentUser.id === targetUser.id) {
      return permissions.canDeleteSelf;
    }

    if (targetUser.role === 'system_admin' || targetUser.role === 'admin') {
      return permissions.canDeleteAdmin;
    }
    return permissions.canDeleteUser;
  }

  return false;
};

// Get available roles for role selection dropdown
export const getAvailableRolesForSelection = (
  currentUserRole: UserRole | null,
  isEditing: boolean = false
): UserRole[] => {
  const permissions = getUserPermissions(currentUserRole);

  if (isEditing) {
    return permissions.availableRolesToEdit;
  }

  return permissions.availableRolesToCreate;
};