"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getBlogPost } from "@/lib/blog-actions";
import { BlogPost } from "@/types/blog-types";
import BlogEditor from "@/components/admin/blog/BlogEditor";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

/**
 * Edit Blog Post Page
 * Fetches and renders the blog editor with existing post data
 */
export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const data = await getBlogPost(params.id);
      if (data) {
        setBlog(data);
      } else {
        notFound();
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      notFound();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    router.push("/admin/blogs");
  };

  const handleCancel = () => {
    router.push("/admin/blogs");
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading Blog Post...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Edit Blog Post</h2>
      </div>
      <BlogEditor
        blogId={blog.id}
        initialData={blog}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
