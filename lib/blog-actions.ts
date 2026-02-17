"use server";

import { prisma } from "@/lib/prisma";
import {
  BlogPost,
  BlogPostDetails,
  RelatedPost,
  PostNavigationInfo,
} from "@/types/blog-types";
import { revalidatePath } from "next/cache";


/**
 * Get Blog Post by Slug
 * Used by the /insights/[slug] detail page.
 * Optionally filter by locale (after migration adds the locale field).
 */
export async function getBlogPostBySlug(
  slug: string,
  locale?: string
): Promise<BlogPostDetails | null> {
  try {
    // Build where clause — locale is optional until migration runs
    const where: Record<string, unknown> = { slug, published: true };
    if (locale) where.locale = locale;

    const post = await prisma.blogPost.findFirst({ where });
    if (!post) return null;

    const localeFilter = locale ? { locale } : {};

    // Related posts — same category, same locale
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        published: true,
        ...localeFilter,
      },
      take: 2,
      select: { id: true, title: true, cover_image: true, slug: true },
    });

    // Prev / next navigation
    const prevPost = await prisma.blogPost.findFirst({
      where: { createdAt: { lt: post.createdAt }, published: true, ...localeFilter },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true },
    });

    const nextPost = await prisma.blogPost.findFirst({
      where: { createdAt: { gt: post.createdAt }, published: true, ...localeFilter },
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true, slug: true },
    });

    return {
      post: JSON.parse(JSON.stringify(post)) as BlogPost,
      relatedPosts: JSON.parse(JSON.stringify(relatedPosts)) as RelatedPost[],
      prevPost: prevPost ? JSON.parse(JSON.stringify(prevPost)) as PostNavigationInfo : null,
      nextPost: nextPost ? JSON.parse(JSON.stringify(nextPost)) as PostNavigationInfo : null,
    };
  } catch (error) {
    console.error("getBlogPostBySlug error:", error);
    return null;
  }
}

/**
 * Get Blog Post Details
 * Fetches a single blog post with related posts and navigation
 */
export async function getBlogPostDetails(
  id: string
): Promise<BlogPostDetails | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) return null;

    // Related posts (same category)
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: id },
        published: true,
      },
      take: 2,
      select: {
        id: true,
        title: true,
        cover_image: true,
        slug: true,
      },
    });

    // Previous post
    const prevPost = await prisma.blogPost.findFirst({
      where: {
        createdAt: { lt: post.createdAt },
        published: true,
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true },
    });

    // Next post
    const nextPost = await prisma.blogPost.findFirst({
      where: {
        createdAt: { gt: post.createdAt },
        published: true,
      },
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true, slug: true },
    });

    return {
      post: JSON.parse(JSON.stringify(post)) as BlogPost,
      relatedPosts: JSON.parse(JSON.stringify(relatedPosts)) as RelatedPost[],
      prevPost: prevPost
        ? (JSON.parse(JSON.stringify(prevPost)) as PostNavigationInfo)
        : null,
      nextPost: nextPost
        ? (JSON.parse(JSON.stringify(nextPost)) as PostNavigationInfo)
        : null,
    };
  } catch (error) {
    console.error("Details Fetch Error:", error);
    return null;
  }
}

/**
 * Save Blog Post
 * Creates or updates a blog post
 */
export async function saveBlogPost(data: BlogPost, id?: string) {
  try {
    // Generate slug from title if not provided
    const postData = {
      ...data,
      slug:
        data.slug ||
        data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      updatedAt: new Date(),
    };

    if (id) {
      await prisma.blogPost.update({
        where: { id },
        data: postData,
      });
    } else {
      await prisma.blogPost.create({
        data: postData,
      });
    }

    revalidatePath("/admin/blog");
    revalidatePath("/insights");
    revalidatePath(`/insights/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Save Error:", error);
    return { success: false, error: "Failed to save blog post" };
  }
}

/**
 * Get All Blogs For Admin
 * Fetches all blog posts (including unpublished) for admin panel
 */
export async function getAllBlogsForAdmin() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(blogs)) as BlogPost[],
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, data: [] };
  }
}

/**
 * Get All Published Blogs — with optional locale filter
 * Replace your existing getAllPublishedBlogs with this version.
 * Pass locale="en" or locale="bn" to filter; omit for all posts (admin use).
 */
export async function getAllPublishedBlogs(locale?: string) {
  try {
    const where: Record<string, unknown> = { published: true };
    if (locale) where.locale = locale;

    const blogs = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(blogs)) as BlogPost[],
    };
  } catch (error) {
    console.error("getAllPublishedBlogs error:", error);
    return { success: false, data: [] };
  }
}

/**
 * Get Single Blog Post
 * Fetches a single blog post by ID
 */
export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { id },
    });
    return blog ? (JSON.parse(JSON.stringify(blog)) as BlogPost) : null;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

/**
 * Delete Blog Post
 * Permanently deletes a blog post
 */
export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/insights");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

/**
 * Archive Blog Post
 * Sets a blog post as unpublished
 */
export async function archiveBlogPost(id: string) {
  try {
    await prisma.blogPost.update({
      where: { id },
      data: { published: false },
    });
    revalidatePath("/admin/blog");
    revalidatePath("/insights");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

/**
 * Get Blog Categories
 * Returns categories from BlogCategory collection
 */
export async function getBlogCategories(): Promise<string[]> {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      select: { name: true },
    });

    const categoryList = categories.map((item) => item.name);

    // If no categories exist, return empty array (user should use Category Manager)
    return categoryList;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
