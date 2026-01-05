"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ১. সব এজেন্ট ফেচ করা
export async function getAllAgents() {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: agents };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, error: "Failed to fetch agents" };
  }
}

// ২. সিঙ্গেল এজেন্ট ফেচ করা (ID দিয়ে)
export async function getAgentById(id: string) {
  console.log("id ===========================", id);
  if (id) {
    try {
      const agent = await prisma.agent.findUnique({
        where: { id },
      });
      return { success: true, data: agent };
    } catch (error) {
      return { success: false, error: "Agent not found" };
    }
  }
}

// ৩. নতুন এজেন্ট অ্যাড করা
export async function createAgent(data: any) {
  try {
    const newAgent = await prisma.agent.create({
      data: {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description,
        fullDescription: data.fullDescription,
        features: data.features || [],
        techStack: data.techStack || [],
        image: data.image,
        rating: parseFloat(data.rating) || 0,
        users: data.users || "0",
      },
    });

    revalidatePath("/marketplace"); // পেজ রিফ্রেশ ছাড়াই ডাটা আপডেট হবে
    return { success: true, data: newAgent };
  } catch (error) {
    console.error("Create Error:", error);
    return { success: false, error: "Failed to create agent" };
  }
}

// ৪. এজেন্ট এডিট করা
export async function updateAgent(id: string, data: any) {
  try {
    const updatedAgent = await prisma.agent.update({
      where: { id },
      data: {
        ...data,
        price: data.price ? parseFloat(data.price) : undefined,
        rating: data.rating ? parseFloat(data.rating) : undefined,
      },
    });

    revalidatePath(`/agent/${id}`);
    revalidatePath("/marketplace");
    return { success: true, data: updatedAgent };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}

// ৫. এজেন্ট ডিলিট করা
export async function deleteAgent(id: string) {
  try {
    await prisma.agent.delete({
      where: { id },
    });

    revalidatePath("/marketplace");
    return { success: true, message: "Agent deleted successfully" };
  } catch (error) {
    return { success: false, error: "Delete failed" };
  }
}
