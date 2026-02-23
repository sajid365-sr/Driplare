"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type {
  ContactFormData,
  ContactFormResponse,
  ContactSubmission,
} from "@/types/contact-types";
import {
  sendContactFormConfirmation,
  sendContactNotificationToAdmin,
} from "@/utils/email-service";

/**
 * Submit Contact Form
 * Saves submission to database and sends email notifications
 */
export async function submitContactForm(
  formData: ContactFormData,
): Promise<ContactFormResponse> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        error: "Name, email, and message are required",
      };
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        company: formData.company || "",
        service: formData.service,
        message: formData.message,
        status: "new",
        source: "contact_page",
      },
    });

    // Send confirmation email to client (async, don't block)
    sendContactFormConfirmation(
      formData.name,
      formData.email,
      formData.message,
    ).catch((err) => console.error("Failed to send confirmation email:", err));

    // Send notification email to admin (async, don't block)
    sendContactNotificationToAdmin(
      formData.name,
      formData.email,
      formData.company || "Not provided",
      formData.service,
      formData.message,
    ).catch((err) => console.error("Failed to send admin notification:", err));

    revalidatePath("/contact");

    return {
      success: true,
      submissionId: submission.id,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      error: "Failed to submit contact form. Please try again.",
    };
  }
}

/**
 * Get All Contact Submissions (Admin)
 * Fetches all submissions ordered by date
 */
export async function getAllContactSubmissions() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(submissions)) as ContactSubmission[],
    };
  } catch (error) {
    console.error("Failed to fetch contact submissions:", error);
    return {
      success: false,
      data: [],
    };
  }
}

/**
 * Update Contact Submission Status
 * Updates the status of a contact submission
 */
export async function updateContactSubmissionStatus(
  id: string,
  status: "new" | "contacted" | "qualified" | "converted" | "closed",
  notes?: string,
) {
  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/contacts");

    return { success: true };
  } catch (error) {
    console.error("Failed to update contact status:", error);
    return { success: false };
  }
}

/**
 * Delete Contact Submission
 */
export async function deleteContactSubmission(id: string) {
  try {
    await prisma.contactSubmission.delete({ where: { id } });
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact submission:", error);
    return { success: false };
  }
}
