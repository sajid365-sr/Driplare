"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  ContactFormData,
  ContactFormSubmission,
  UpdateSubmissionStatusData,
} from "@/types/form-types";

/**
 * Save Contact Form Submission
 * Creates a new contact form submission from the frontend
 */
export async function saveContactSubmission(formData: ContactFormData) {
  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        service: formData.service,
        details: formData.details,
      },
    });

    // Revalidate admin page
    revalidatePath("/admin/form-submissions");

    return { success: true, id: submission.id };
  } catch (error: unknown) {
    console.error("Submission Error:", error);
    return { success: false, error: "Failed to transmit brief." };
  }
}

/**
 * Newsletter Subscription
 * Subscribes email to newsletter with duplicate handling
 */
export async function subscribeNewsletter(email: string) {
  try {
    await prisma.newsletter.create({
      data: { email },
    });
    return { success: true };
  } catch (error: unknown) {
    // Check for duplicate email error (Prisma error code P2002)
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "This email is already synced!",
      };
    }

    // Handle other errors
    console.error("Newsletter Error:", error);
    return {
      success: false,
      error: "Subscription protocol failed. Please try again later.",
    };
  }
}

/**
 * Get All Contact Submissions
 * Fetches all contact form submissions for admin panel
 */
export async function getContactSubmissions(): Promise<
  ContactFormSubmission[]
> {
  try {
    const data = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return data as ContactFormSubmission[];
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return [];
  }
}

/**
 * Get Single Contact Submission
 * Fetches a single submission by ID
 */
export async function getContactSubmission(
  id: string
): Promise<ContactFormSubmission | null> {
  try {
    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    });
    return submission as ContactFormSubmission | null;
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return null;
  }
}

/**
 * Update Submission Status
 * Updates the status and response of a contact submission
 * 
 * Note: Type assertion is used because the Prisma client needs to be regenerated
 * after schema changes. Run `npx prisma generate` to update types.
 */
export async function updateSubmissionStatus(
  id: string,
  data: UpdateSubmissionStatusData
) {
  try {
    // Type assertion needed until Prisma client is regenerated after schema update
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      status: data.status,
      response: data.response || null,
    };

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/form-submissions");

    return {
      success: true,
      message: "Submission status updated successfully",
      data: updated,
    };
  } catch (error: unknown) {
    console.error("Update Error:", error);
    return { success: false, message: "Failed to update submission status" };
  }
}

/**
 * Delete Contact Submission
 * Deletes a contact form submission
 */
export async function deleteContactSubmission(id: string) {
  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });

    revalidatePath("/admin/form-submissions");

    return { success: true, message: "Submission deleted successfully" };
  } catch (error: unknown) {
    console.error("Delete Error:", error);
    return { success: false, message: "Failed to delete submission" };
  }
}
