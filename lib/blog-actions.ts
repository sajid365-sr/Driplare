"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { BlogPost } from "@/app/(admin)/admin/BlogManager";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// lib/blog-action.ts বা যেখানে ফাংশনটি আছে
export async function uploadImageToCloudinary(
  formData: FormData,
  folder: string
) {
  try {
    const file = formData.get("file") as File; // FormData থেকে ফাইলটি বের করা
    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: folder }, // এখানে 'folder' প্যারামিটার ব্যবহার করুন
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    })) as any;

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
}

// একটি ব্লগের বিস্তারিত এবং নেভিগেশন (Prev/Next) আনা
export async function getBlogPostDetails(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) return null;

    // রিলেটেড পোস্ট (একই ক্যাটাগরির অন্য ২ টি পোস্ট)
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: id },
        status: "published",
      },
      take: 2,
      select: { id: true, title: true, coverImage: true },
    });

    // আগের এবং পরের পোস্টের ID ও টাইটেল আনা (নেভিগেশনের জন্য)
    const prevPost = await prisma.blogPost.findFirst({
      where: { createdAt: { lt: post.createdAt }, status: "published" },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true },
    });

    const nextPost = await prisma.blogPost.findFirst({
      where: { createdAt: { gt: post.createdAt }, status: "published" },
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true },
    });

    return {
      post: JSON.parse(JSON.stringify(post)), // Serializing for Client Component
      relatedPosts,
      prevPost,
      nextPost,
    };
  } catch (error) {
    console.error("Details Fetch Error:", error);
    return null;
  }
}

// ব্লগ ডিলিট
export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// ব্লগ সেভ বা আপডেট
export async function saveBlogPost(data: any, id?: string) {
  try {
    if (id) {
      await prisma.blogPost.update({ where: { id }, data });
    } else {
      await prisma.blogPost.create({ data });
    }
    revalidatePath("/admin/blog");
    revalidatePath("/insights");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save" };
  }
}

// সব ব্লগ লিস্ট আনা (অ্যাডমিন প্যানেলের জন্য)
export async function getAllBlogsForAdmin() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}
// একটি ব্লগ আনা (For insights details page)
export async function getBlogPost(id: string) {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { id },
    });
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// আর্কাইভ করা (Status পরিবর্তন)
export async function archiveBlogPost(id: string) {
  try {
    await prisma.blogPost.update({
      where: { id },
      data: { status: "archived" },
    });
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getBlogCategories() {
  try {
    // ডাটাবেজের সব ব্লগ থেকে ইউনিক ক্যাটাগরিগুলো নিয়ে আসবে
    const categories = await prisma.blogPost.findMany({
      where: {
        is_archived: false, // আর্কাইভ করা ব্লগ বাদ দিতে চাইলে
      },
      select: {
        category: true,
      },
      distinct: ["category"], // শুধুমাত্র আলাদা আলাদা ক্যাটাগরি ফিল্টার করবে
    });

    // আমরা চাই শুধু স্ট্রিং এর একটি অ্যারে (যেমন: ["Tech", "Design"])
    const categoryList = categories
      .map((item: any) => item.category)
      .filter((cat: any) => cat !== null && cat !== ""); // খালি ক্যাটাগরি বাদ দিবে

    return categoryList;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // যদি ডাটাবেজে কোনো ক্যাটাগরি না থাকে বা এরর হয়, তবে ডিফল্ট কিছু ক্যাটাগরি রিটার্ন করবে
    return ["Technology", "Design", "Marketing", "Business", "Development"];
  }
}
