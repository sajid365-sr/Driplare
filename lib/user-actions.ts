"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string | null;
}

export async function deleteUser(userId: string, clerkId: string) {
  try {
    const client = await clerkClient();

    
    await client.users.deleteUser(clerkId);

    
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Clerk deletion failed:", error);
    return { success: false, error: "Authentication provider sync failed" };
  }
}


export async function createAdminUser(data: { email: string; firstName: string; lastName: string }) {
  try {
    const client = await clerkClient();


    const clerkUser = await client.users.createUser({
      emailAddress: [data.email],
      firstName: data.firstName,
      lastName: data.lastName,
      password: "Test@123",
      publicMetadata: { role: "admin" }
    });


    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: data.email,
        role: "admin",
        // অন্য প্রয়োজনীয় ফিল্ড
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { errors?: { message: string }[] };
    return { success: false, error: err.errors?.[0]?.message || "Failed to create user" };
  }
}

export async function getUsers(): Promise<{ success: boolean; data?: User[]; error?: string }> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function getUserById(id: string): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user" };
  }
}

export async function updateUserRole(userId: string, role: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Update in Prisma
    await prisma.user.update({
      where: { id: userId },
      data: { role }
    });

    // Update in Clerk
    const client = await clerkClient();
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      await client.users.updateUser(user.clerkId, {
        publicMetadata: { role }
      });
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role" };
  }
}

export async function createUser(data: { email: string; firstName: string; lastName: string; role?: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await clerkClient();

    const clerkUser = await client.users.createUser({
      emailAddress: [data.email],
      firstName: data.firstName,
      lastName: data.lastName,
      password: "Test@123",
      publicMetadata: { role: data.role || "user" }
    });

    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`.trim(),
        role: data.role || "user",
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { errors?: { message: string }[] };
    return { success: false, error: err.errors?.[0]?.message || "Failed to create user" };
  }
}