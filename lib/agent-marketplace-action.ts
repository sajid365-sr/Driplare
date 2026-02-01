"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AgentContent } from "@/types/agent-marketplace";

// Types for agent operations
interface CreateAgentData {
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  price: string;
  rating?: string;
  totalSales?: string;
  category: string;
  mainImage: string;
  gallery?: string[];
  videoUrl?: string;
  techStack?: string[];
  difficulty?: string;
  setupTime?: string;
  status?: string;
  en?: Partial<AgentContent>;
  bn?: Partial<AgentContent>;
}

interface UpdateAgentData extends Partial<CreateAgentData> {
  id: string;
}

// ১. সব এজেন্ট ফেচ করা (Marketplace Main Page)
export async function getAllAgents() {
  try {
    const count = await prisma.agent.count();
    console.log("Total agents in DB:", count);
    const agents = await prisma.agent.findMany({
      // where: { status: "active" },
      orderBy: { createdAt: "desc" },
    });

    
    return { success: true, data: agents };
  } catch (error: unknown) {
    console.error("Error fetching agents:", error);
    return { success: false, error: "Failed to fetch agents" };
  }
}

// ২. স্লাগ (Slug) দিয়ে এজেন্ট ফেচ করা (Details Page)
export async function getAgentBySlug(slug: string) {
  try {
    const agent = await prisma.agent.findUnique({
      where: { slug },
    });
    return { success: true, data: agent };
  } catch (error: unknown) {
    return { success: false, error: "Agent not found" };
  }
}

// ৩. নতুন এজেন্ট অ্যাড করা (Admin Panel)
export async function createAgent(data: CreateAgentData) {
  try {
    const newAgent = await prisma.agent.create({
      data: {
        slug: data.slug,
        price: parseFloat(data.price),
        rating: data.rating ? parseFloat(data.rating) : 5.0,
        totalSales: data.totalSales ? parseInt(data.totalSales) : 0,
        category: data.category,
        mainImage: data.mainImage,
        gallery: data.gallery,
        videoUrl: data.videoUrl,
        techStack: data.techStack || [],
        difficulty: data.difficulty || "Easy",
        setupTime: data.setupTime || null,
        status: data.status || "active",
        en: {
          name: data.en?.name || data.name,
          description: data.en?.description || data.description,
          fullDescription: data.en?.fullDescription || data.fullDescription,
          features: data.en?.features || data.features,
        },
        bn: {
          name: data.bn?.name || data.en?.name || data.name,
          description: data.bn?.description || data.en?.description || data.description,
          fullDescription: data.bn?.fullDescription || data.en?.fullDescription || data.fullDescription,
          features: data.bn?.features || data.en?.features || data.features,
        },
      },
    });
    revalidatePath("/agent-marketplace");
    return { success: true, data: newAgent };
  } catch (error) {
    return { success: false, error: "Creation failed" };
  }
}

// ৪. এজেন্ট এডিট করা
export async function updateAgent(id: string, data: Partial<CreateAgentData>) {
  try {
    const updateData: Record<string, unknown> = {};

    // Handle basic fields
    if (data.slug) updateData.slug = data.slug;
    if (data.price) updateData.price = parseFloat(data.price);
    if (data.rating) updateData.rating = parseFloat(data.rating);
    if (data.totalSales !== undefined) updateData.totalSales = parseInt(data.totalSales);
    if (data.category) updateData.category = data.category;
    if (data.mainImage) updateData.mainImage = data.mainImage;
    if (data.gallery) updateData.gallery = Array.isArray(data.gallery) ? data.gallery : [];
    if (data.videoUrl !== undefined) updateData.videoUrl = data.videoUrl;
    if (data.techStack) updateData.techStack = Array.isArray(data.techStack) ? data.techStack : [];
    if (data.difficulty) updateData.difficulty = data.difficulty;
    if (data.setupTime !== undefined) updateData.setupTime = data.setupTime;
    if (data.status) updateData.status = data.status;

    // Handle language-specific content
    if (data.en) {
      updateData.en = {
        name: data.en.name,
        description: data.en.description,
        fullDescription: data.en.fullDescription,
        features: Array.isArray(data.en.features) ? data.en.features : [],
      };
    }

    if (data.bn) {
      updateData.bn = {
        name: data.bn.name,
        description: data.bn.description,
        fullDescription: data.bn.fullDescription,
        features: Array.isArray(data.bn.features) ? data.bn.features : [],
      };
    }

    const updatedAgent = await prisma.agent.update({
      where: { id },
      data: updateData,
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
