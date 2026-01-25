"use server";

import { z } from "zod";
import { PrismaClient } from "../generated/prisma/client";
import { leadFormSchema, type LeadActionResponse, type ValidatedLeadData } from "@/types/booking-types";

const prisma = new PrismaClient();

/**
 * Server action to create a new lead in the database
 * @param formData - The form data submitted by the user
 * @returns Promise<LeadActionResponse> - Success or error response
 */
export async function createLead(formData: ValidatedLeadData): Promise<LeadActionResponse> {
  try {
    // Validate the input data using Zod schema
    const validatedData = leadFormSchema.parse(formData);

    // Create the lead in the database
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        platform: validatedData.platform,
        agentSlug: validatedData.agentSlug,
        status: "pending",
      },
    });

    console.log("Lead created successfully:", lead.id);

    return {
      success: true,
      message: "Lead created successfully",
    };
  } catch (error) {
    console.error("Error creating lead:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed: " + error.errors.map(e => e.message).join(", "),
      };
    }

    return {
      success: false,
      error: "Failed to create lead. Please try again.",
    };
  }
}

/**
 * Server action to handle lead form submission with validation
 * @param formData - Raw form data from the client
 * @returns Promise<LeadActionResponse> - Success or error response
 */
export async function submitLeadForm(formData: FormData): Promise<LeadActionResponse> {
  try {
    // Extract form data
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      platform: formData.get("platform") as "Facebook Messenger" | "WhatsApp" | "Both",
      agentSlug: formData.get("agentSlug") as string,
    };

    // Validate and create lead
    return await createLead(rawData);
  } catch (error) {
    console.error("Error submitting lead form:", error);

    return {
      success: false,
      error: "Failed to submit form. Please try again.",
    };
  }
}