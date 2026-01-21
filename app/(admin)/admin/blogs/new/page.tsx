"use client";

import { useRouter } from "next/navigation";
import BlogEditor from "@/components/admin/blog/BlogEditor";

/**
 * Create New Blog Post Page
 * Renders the blog editor for creating a new post
 */
export default function NewBlogPage() {
  const router = useRouter();

  const handleSave = () => {
    router.push("/admin/blogs");
  };

  const handleCancel = () => {
    router.push("/admin/blogs");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Create New Blog Post</h2>
      </div>
      <BlogEditor onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
