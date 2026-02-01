"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateLeadInput, UpdateLeadInput, LeadStatus } from "@/types/lead-types";

// Create a new lead
export async function createLead(data: CreateLeadInput) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        businessType: data.businessType,
        platform: data.platform,
        requirements: data.requirements,
        agentSlug: data.agentSlug,
        agentName: data.agentName,
        source: data.source,
        status: "new",
        notes: [],
      },
    });

    revalidatePath("/admin/leads");
    
    return { 
      success: true, 
      data: lead,
      message: "Lead created successfully" 
    };
  } catch (error) {
    console.error("Error creating lead:", error);
    return { 
      success: false, 
      error: "Failed to create lead" 
    };
  }
}

// Get all leads with optional filtering
export async function getAllLeads(filters?: {
  status?: LeadStatus;
  source?: string;
  agentSlug?: string;
}) {
  try {
    const where: any = {};
    
    if (filters?.status) where.status = filters.status;
    if (filters?.source) where.source = filters.source;
    if (filters?.agentSlug) where.agentSlug = filters.agentSlug;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: leads };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}

// Get a single lead by ID
export async function getLeadById(id: string) {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return { success: false, error: "Lead not found" };
    }

    return { success: true, data: lead };
  } catch (error) {
    console.error("Error fetching lead:", error);
    return { success: false, error: "Failed to fetch lead" };
  }
}

// Update lead status and details
export async function updateLead(data: UpdateLeadInput) {
  try {
    const updateData: any = {};

    if (data.status) {
      updateData.status = data.status;
      
      // Auto-set timestamps based on status
      if (data.status === "contacted" && !data.lastContactedAt) {
        updateData.lastContactedAt = new Date();
      }
      if (data.status === "qualified" && !data.qualifiedAt) {
        updateData.qualifiedAt = new Date();
      }
      if (data.status === "paid" && !data.paidAt) {
        updateData.paidAt = new Date();
      }
      if (data.status === "completed" && !data.completedAt) {
        updateData.completedAt = new Date();
      }
    }

    if (data.notes) updateData.notes = data.notes;
    if (data.lastContactedAt) updateData.lastContactedAt = data.lastContactedAt;
    if (data.qualifiedAt) updateData.qualifiedAt = data.qualifiedAt;
    if (data.paidAt) updateData.paidAt = data.paidAt;
    if (data.completedAt) updateData.completedAt = data.completedAt;

    const lead = await prisma.lead.update({
      where: { id: data.id },
      data: updateData,
    });

    revalidatePath("/admin/leads");
    
    return { 
      success: true, 
      data: lead,
      message: "Lead updated successfully" 
    };
  } catch (error) {
    console.error("Error updating lead:", error);
    return { success: false, error: "Failed to update lead" };
  }
}

// Add a note to a lead
export async function addLeadNote(leadId: string, note: string) {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return { success: false, error: "Lead not found" };
    }

    const notes = [...(lead.notes as string[]), note];

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: { notes },
    });

    revalidatePath("/admin/leads");
    
    return { 
      success: true, 
      data: updatedLead,
      message: "Note added successfully" 
    };
  } catch (error) {
    console.error("Error adding note:", error);
    return { success: false, error: "Failed to add note" };
  }
}

// Delete a lead
export async function deleteLead(id: string) {
  try {
    await prisma.lead.delete({
      where: { id },
    });

    revalidatePath("/admin/leads");
    
    return { 
      success: true,
      message: "Lead deleted successfully" 
    };
  } catch (error) {
    console.error("Error deleting lead:", error);
    return { success: false, error: "Failed to delete lead" };
  }
}

// Get lead statistics
export async function getLeadStats() {
  try {
    const totalLeads = await prisma.lead.count();
    const newLeads = await prisma.lead.count({ where: { status: "new" } });
    const qualifiedLeads = await prisma.lead.count({ where: { status: "qualified" } });
    const paidLeads = await prisma.lead.count({ where: { status: "paid" } });
    const completedLeads = await prisma.lead.count({ where: { status: "completed" } });

    // Calculate conversion rates
    const leadToQualified = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;
    const qualifiedToPaid = qualifiedLeads > 0 ? (paidLeads / qualifiedLeads) * 100 : 0;
    const overallConversion = totalLeads > 0 ? (paidLeads / totalLeads) * 100 : 0;

    return {
      success: true,
      data: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        paidLeads,
        completedLeads,
        conversionRates: {
          leadToQualified: Math.round(leadToQualified),
          qualifiedToPaid: Math.round(qualifiedToPaid),
          overallConversion: Math.round(overallConversion),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}