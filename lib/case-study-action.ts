"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CaseStudy } from "@/types/case-study-types";

const REVALIDATE_PATHS = ["/case-studies", "/"];

function revalidateAll() {
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
}

// ─────────────────────────────────────────────────────────────────
// READ — Multiple
// ─────────────────────────────────────────────────────────────────

/** Fetch all PUBLISHED case studies, newest first */
export async function getAllCaseStudies() {
  try {
    const studies = await prisma.caseStudy.findMany({
      where: { status: "published" },
      orderBy: [
        { featured: "desc" }, // Featured items always come first
        { createdAt: "desc" }, // Then newest
      ],
    });
    return { success: true, data: JSON.parse(JSON.stringify(studies)) };
  } catch (error) {
    console.error("getAllCaseStudies error:", error);
    return { success: false, error: "Failed to fetch case studies", data: [] };
  }
}

/** Fetch ALL case studies including drafts (admin use only) */
export async function getAllCaseStudiesAdmin() {
  try {
    const studies = await prisma.caseStudy.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return { success: true, data: JSON.parse(JSON.stringify(studies)) };
  } catch (error) {
    console.error("getAllCaseStudiesAdmin error:", error);
    return { success: false, error: "Failed to fetch case studies", data: [] };
  }
}

/** Fetch published case studies filtered by category */
export async function getCaseStudiesByCategory(category: string) {
  try {
    const studies = await prisma.caseStudy.findMany({
      where: {
        status: "published",
        category,
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return { success: true, data: JSON.parse(JSON.stringify(studies)) };
  } catch (error) {
    console.error("getCaseStudiesByCategory error:", error);
    return { success: false, error: "Failed to fetch case studies", data: [] };
  }
}

/** Fetch all distinct published categories (for filter tabs — always live from DB) */
export async function getCaseStudyCategories(): Promise<string[]> {
  try {
    const studies = await prisma.caseStudy.findMany({
      where: { status: "published" },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });
    return studies.map((s) => s.category);
  } catch (error) {
    console.error("getCaseStudyCategories error:", error);
    return [];
  }
}

/** Fetch featured published case studies (for homepage section) */
export async function getFeaturedCaseStudies(limit = 3) {
  try {
    const studies = await prisma.caseStudy.findMany({
      where: {
        status: "published",
        featured: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return { success: true, data: JSON.parse(JSON.stringify(studies)) };
  } catch (error) {
    console.error("getFeaturedCaseStudies error:", error);
    return {
      success: false,
      error: "Failed to fetch featured studies",
      data: [],
    };
  }
}

// ─────────────────────────────────────────────────────────────────
// READ — Single
// ─────────────────────────────────────────────────────────────────

/** Fetch single case study by ID */
export async function getCaseStudyById(id: string) {
  try {
    const study = await prisma.caseStudy.findUnique({ where: { id } });
    if (!study) return { success: false, error: "Case study not found" };
    return { success: true, data: JSON.parse(JSON.stringify(study)) };
  } catch (error) {
    console.error("getCaseStudyById error:", error);
    return { success: false, error: "Failed to fetch study" };
  }
}

/**
 * Fetch single PUBLISHED case study by slug
 * Used by: /case-studies/[slug] detail page
 */
export async function getCaseStudyBySlug(slug: string) {
  try {
    const study = await prisma.caseStudy.findFirst({
      where: {
        slug,
        status: "published",
      },
    });
    if (!study) return { success: false, error: "Case study not found" };
    return { success: true, data: JSON.parse(JSON.stringify(study)) };
  } catch (error) {
    console.error("getCaseStudyBySlug error:", error);
    return { success: false, error: "Failed to fetch study" };
  }
}

// ─────────────────────────────────────────────────────────────────
// WRITE
// ─────────────────────────────────────────────────────────────────

/** Create a new case study */
export async function createCaseStudy(data: CaseStudy) {
  try {
    const study = await prisma.caseStudy.create({ data: { ...data } });
    revalidateAll();
    return { success: true, data: study };
  } catch (error) {
    console.error("createCaseStudy error:", error);
    return { success: false, error: "Creation failed" };
  }
}

/** Update an existing case study by ID */
export async function updateCaseStudy(id: string, data: Partial<CaseStudy>) {
  try {
    const study = await prisma.caseStudy.update({
      where: { id },
      data: { ...data },
    });
    revalidateAll();
    // Also revalidate the specific slug page if slug is known
    if (study.slug) revalidatePath(`/case-studies/${study.slug}`);
    return { success: true, data: study };
  } catch (error) {
    console.error("updateCaseStudy error:", error);
    return { success: false, error: "Update failed" };
  }
}

/** Delete a case study by ID */
export async function deleteCaseStudy(id: string) {
  try {
    // Get slug before deleting so we can revalidate its path
    const study = await prisma.caseStudy.findUnique({
      where: { id },
      select: { slug: true },
    });

    await prisma.caseStudy.delete({ where: { id } });

    revalidateAll();
    if (study?.slug) revalidatePath(`/case-studies/${study.slug}`);

    return { success: true };
  } catch (error) {
    console.error("deleteCaseStudy error:", error);
    return { success: false, error: "Deletion failed" };
  }
}

/** Toggle featured status */
export async function toggleCaseStudyFeatured(id: string, featured: boolean) {
  try {
    await prisma.caseStudy.update({
      where: { id },
      data: { featured },
    });
    revalidateAll();
    return { success: true };
  } catch (error) {
    console.error("toggleFeatured error:", error);
    return { success: false, error: "Failed to update featured status" };
  }
}

/** Publish or unpublish a case study */
export async function setCaseStudyStatus(
  id: string,
  status: "published" | "draft",
) {
  try {
    const study = await prisma.caseStudy.update({
      where: { id },
      data: { status },
    });
    revalidateAll();
    if (study.slug) revalidatePath(`/case-studies/${study.slug}`);
    return { success: true };
  } catch (error) {
    console.error("setCaseStudyStatus error:", error);
    return { success: false, error: "Failed to update status" };
  }
}
