"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Edit, FileText } from "lucide-react";
import { getAllBlogsForAdmin } from "@/lib/blog-actions";
import BlogTable from "@/components/admin/blog/BlogTable";
import BlogEditor from "@/components/admin/blog/BlogEditor";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image?: string;
  tags: string[];
  category: string;
  status: "published" | "draft" | "archived";
  created_at: string;
  updated_at: string;
  published_at?: string;
  is_archived: boolean;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    const data = await getAllBlogsForAdmin();
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    setEditingPost(null);
    setActiveTab("editor");
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setActiveTab("editor");
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Tabs components remain the same */}
      <TabsContent value="list" className="space-y-6">
        <BlogTable
          blogs={posts}
          isLoading={isLoading}
          onEdit={(id) => handleEditPost(posts.find((p) => p.id === id)!)}
          onDelete={fetchPosts} // ডিলিট হলে রিফ্রেশ হবে
          onArchive={fetchPosts}
        />
      </TabsContent>

      <TabsContent value="editor" className="space-y-6">
        <BlogEditor
          post={editingPost}
          onSave={() => {
            fetchPosts();
            setActiveTab("list");
          }}
          onCancel={() => setActiveTab("list")}
        />
      </TabsContent>
    </div>
  );
}
