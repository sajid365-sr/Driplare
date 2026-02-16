"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

export async function getAllAutomations() {
  try {
    const items = await prisma.automationProduct.findMany({
      where: { status: "active" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return { success: true, data: items };
  } catch (error) {
    console.error("getAllAutomations error:", error);
    return { success: false, error: "Failed to fetch automations", data: [] };
  }
}

export async function getAutomationBySlug(slug: string) {
  try {
    const item = await prisma.automationProduct.findUnique({ where: { slug } });
    if (!item) return { success: false, error: "Not found" };
    return { success: true, data: item };
  } catch (error) {
    return { success: false, error: "Not found" };
  }
}

export async function getFeaturedAutomations(limit = 3) {
  try {
    const items = await prisma.automationProduct.findMany({
      where: { status: "active", featured: true },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: "Failed to fetch", data: [] };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WEBSITE PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

export async function getAllWebsiteProducts() {
  try {
    const items = await prisma.websiteProduct.findMany({
      where: { status: "active" },
      orderBy: [{ featured: "desc" }, { price: "asc" }],
    });
    return { success: true, data: items };
  } catch (error) {
    console.error("getAllWebsiteProducts error:", error);
    return { success: false, error: "Failed to fetch websites", data: [] };
  }
}

export async function getWebsiteProductBySlug(slug: string) {
  try {
    const item = await prisma.websiteProduct.findUnique({ where: { slug } });
    if (!item) return { success: false, error: "Not found" };
    return { success: true, data: item };
  } catch (error) {
    return { success: false, error: "Not found" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKETPLACE LEADS (CRM)
// ─────────────────────────────────────────────────────────────────────────────

interface CreateLeadData {
  productId: string;
  productSlug: string;
  productType: "agent" | "automation" | "website";
  productName: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  businessType?: string;
  platform?: string;
  requirements?: string;
}

export async function createMarketplaceLead(data: CreateLeadData) {
  try {
    const lead = await prisma.marketplaceLead.create({
      data: {
        ...data,
        status: "new",
      },
    });
    revalidatePath("/admin/leads");
    return { success: true, data: lead };
  } catch (error) {
    console.error("createMarketplaceLead error:", error);
    return { success: false, error: "Failed to save lead" };
  }
}

export async function getAllLeads() {
  try {
    const leads = await prisma.marketplaceLead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: leads };
  } catch (error) {
    return { success: false, error: "Failed to fetch leads", data: [] };
  }
}

export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "converted" | "closed",
  notes?: string,
) {
  try {
    const lead = await prisma.marketplaceLead.update({
      where: { id },
      data: { status, ...(notes !== undefined && { notes }) },
    });
    revalidatePath("/admin/leads");
    return { success: true, data: lead };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FETCH ALL MARKETPLACE DATA IN PARALLEL (used by the main page)
// ─────────────────────────────────────────────────────────────────────────────

export async function getAllMarketplaceProducts() {
  const [agentsResult, automationsResult, websitesResult] = await Promise.all([
    // Reuse the existing agent action
    prisma.agent.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.automationProduct.findMany({
      where: { status: "active" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.websiteProduct.findMany({
      where: { status: "active" },
      orderBy: [{ featured: "desc" }, { price: "asc" }],
    }),
  ]);

  return {
    agents: agentsResult ?? [],
    automations: automationsResult ?? [],
    websites: websitesResult ?? [],
  };
}
