// User roles and permissions types
export type UserRole = "user" | "admin" | "system_admin";

export interface User {
    id: string;
    clerkId: string;
    email: string;
    name: string | null;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: UserRole | null;
}

// Permission definitions based on user roles
export interface UserPermissions {
    canCreateUser: boolean;
    canCreateAdmin: boolean;
    canEditUser: boolean;
    canEditAdmin: boolean;
    canDeleteUser: boolean;
    canDeleteAdmin: boolean;
    canDeleteSelf: boolean;
    requiresSuperAdminTransfer: boolean;
    availableRolesToCreate: UserRole[];
    availableRolesToEdit: UserRole[];
}

// User creation form data
export interface CreateUserData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
}

// User edit form data
export interface EditUserData {
    role: UserRole;
}