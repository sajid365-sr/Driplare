"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ১. কন্টাক্ট ফর্মের জন্য ইন্টারফেস
export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  service: string;
  details: string;
}

// ২. কন্টাক্ট ফর্ম সাবমিশন সেভ করা
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

    // এডমিন পেজের ডাটা রিফ্রেশ করার জন্য (ঐচ্ছিক)
    revalidatePath("/admin/submissions");

    return { success: true, id: submission.id };
  } catch (error: unknown) {
    console.error("Submission Error:", error);
    return { success: false, error: "Failed to transmit brief." };
  }
}

// ৩. নিউজলেটার সাবস্ক্রিপশন (Error টাইপ হ্যান্ডলিং সহ)
export async function subscribeNewsletter(email: string) {
  try {
    await prisma.newsletter.create({
      data: { email },
    });
    return { success: true };
  } catch (error: any) {
    // এখানে সরাসরি টাইপ চেক না করে এরর অবজেক্টের 'code' প্রপার্টি চেক করা হচ্ছে
    // Prisma-তে ডুপ্লিকেট ডাটার এরর কোড সবসময় "P2002" হয়
    if (error && typeof error === "object" && error.code === "P2002") {
      return {
        success: false,
        error: "This email is already synced!",
      };
    }

    // অন্য যেকোনো সাধারণ এররের জন্য
    console.error("Newsletter Error:", error);
    return {
      success: false,
      error: "Subscription protocol failed. Please try again later.",
    };
  }
}

// ৪. এডমিন প্যানেলের জন্য ডাটা ফেচ করা
export async function getContactSubmissions() {
  try {
    const data = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return data; // এটি স্বয়ংক্রিয়ভাবে Prisma-র জেনারেটেড টাইপ রিটার্ন করবে
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return [];
  }
}
