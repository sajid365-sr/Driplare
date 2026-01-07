"use server";

import { prisma } from "@/lib/prisma"; // আপনার প্রিজমা ক্লায়েন্ট পাথ অনুযায়ী সেট করুন
import { currentUser } from "@clerk/nextjs/server";

export async function syncUserWithDb() {
  try {
    const user = await currentUser();

    if (!user) {
      console.log("❌ Clerk User not found in Server Action");
      return { success: false, error: "No user found" };
    }

    console.log("✅ Syncing User:", user.emailAddresses[0].emailAddress);

    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
      },
      create: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
      },
    });

    console.log("🚀 Database User Saved/Updated:", dbUser.id);
    return { success: true, user: dbUser };
  } catch (error) {
    console.error("‼️ DATABASE ERROR:", error);
    return { success: false, error: "Database operation failed" };
  }
}

// অন্য ডাটাবেস অপারেশনের জন্য
export async function getDbUser(clerkId: string) {
  return await prisma.user.findUnique({ where: { clerkId } });
}
