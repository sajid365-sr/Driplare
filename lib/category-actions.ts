"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    });
    return JSON.parse(JSON.stringify(categories)) as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Create a new category
 */
export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  try {
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const category = await prisma.blogCategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
      },
    });

    revalidatePath("/admin/blogs");
    return {
      success: true,
      category: JSON.parse(JSON.stringify(category)) as Category,
    };
  } catch (error: unknown) {
    console.error("Error creating category:", error);
    // Check for unique constraint violation
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return { success: false, error: "Category name already exists" };
    }
    return { success: false, error: "Failed to create category" };
  }
}

/**
 * Update a category
 */
export async function updateCategory(
  id: string,
  data: { name: string; description?: string }
) {
  try {
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const category = await prisma.blogCategory.update({
      where: { id },
      data: {
        name: data.name,
        slug,
        description: data.description,
      },
    });

    revalidatePath("/admin/blogs");
    return {
      success: true,
      category: JSON.parse(JSON.stringify(category)) as Category,
    };
  } catch (error: unknown) {
    console.error("Error updating category:", error);
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return { success: false, error: "Category name already exists" };
    }
    return { success: false, error: "Failed to update category" };
  }
}

/**
 * Delete a category
 */
export async function deleteCategory(id: string) {
  try {
    // Check if any blog posts use this category
    const category = await prisma.blogCategory.findUnique({ where: { id } });
    if (!category) {
      return { success: false, error: "Category not found" };
    }

    const postsUsingCategory = await prisma.blogPost.count({
      where: { category: category.name },
    });

    if (postsUsingCategory > 0) {
      return {
        success: false,
        error: `Cannot delete category. ${postsUsingCategory} blog post(s) are using it.`,
      };
    }

    await prisma.blogCategory.delete({ where: { id } });

    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

/**
 * Seed default categories if none exist
 */
export async function seedDefaultCategories() {
  try {
    const count = await prisma.blogCategory.count();
    if (count === 0) {
      const defaultCategories = [
        { name: "Technology", description: "Tech-related posts" },
        { name: "Automation", description: "Automation and AI" },
        { name: "Architecture", description: "System architecture" },
        { name: "Development", description: "Software development" },
      ];

      for (const cat of defaultCategories) {
        await createCategory(cat);
      }
      return { success: true, message: "Default categories seeded" };
    }
    return { success: true, message: "Categories already exist" };
  } catch (error) {
    console.error("Error seeding categories:", error);
    return { success: false, error: "Failed to seed categories" };
  }
}
