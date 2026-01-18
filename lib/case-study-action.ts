"use server";

import { prisma } from "@/lib/prisma"; // আপনার প্রিজমা ক্লায়েন্ট পাথ
import { revalidatePath } from "next/cache";

// সব কেস স্টাডি ফেচ করা (নতুনগুলো আগে আসবে)
export async function getAllCaseStudies() {
  try {
    const studies = await prisma.caseStudy.findMany({
      orderBy: {
        createdAt: "desc", // নতুন প্রজেক্ট আগে দেখাবে
      },
    });
    if (!studies) return { success: true, data: [] };
    return { success: true, data: JSON.parse(JSON.stringify(studies)) };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, error: "Failed to fetch case studies" };
  }
}

// আইডি দিয়ে সিঙ্গেল কেস স্টাডি ফেচ করা
export async function getCaseStudyById(id: string) {
  try {
    const study = await prisma.caseStudy.findUnique({
      where: { id },
    });
    if (!study) return { success: false, error: "Case study not found" };
    return { success: true, data: JSON.parse(JSON.stringify(study)) };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, error: "Failed to fetch study" };
  }
}

// ২. ডাটা সেভ করা (Initial Seed এর জন্য ব্যবহার করতে পারেন)
export async function createCaseStudy(data: any) {
  try {
    const study = await prisma.caseStudy.create({
      data: {
        category: data.category,
        techTags: data.techTags,
        en: data.en, // সরাসরি অবজেক্ট পাঠিয়ে দিন
        bn: data.bn, // সরাসরি অবজেক্ট পাঠিয়ে দিন
      },
    });
    return { success: true, data: study };
  } catch (error) {
    console.error("Creation failed:", error);
    return { success: false, error: "Creation failed" };
  }
}

// ৩. ডিলিট করা
export async function deleteCaseStudy(id: string) {
  try {
    await prisma.caseStudy.delete({ where: { id } });
    revalidatePath("/case-studies");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
