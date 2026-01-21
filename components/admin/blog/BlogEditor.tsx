"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Tiptap Imports
import { EditorContent, useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { ResizableImageView } from "./ResizableImage";

// Components
import { TiptapMenuBar } from "./TiptapMenuBar";
import { CoverImageUpload } from "./CoverImageUpload";
import { BlogMetadata } from "./BlogMetadata";
import { BlogCategoryTags } from "./BlogCategoryTags";

// Actions & Types
import {
  getBlogCategories,
  saveBlogPost,
} from "@/lib/blog-actions";
import { uploadImageToCloudinary } from "@/lib/upload-image";
import { BlogPost } from "@/types/blog-types";

interface BlogEditorProps {
  blogId?: string;
  initialData?: BlogPost | null;
  onCancel: () => void;
  onSave: () => void;
}

/**
 * Blog Editor Component
 * Refactored rich text editor for creating and editing blog posts
 */
export default function BlogEditor({
  blogId,
  initialData,
  onCancel,
  onSave,
}: BlogEditorProps) {
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Placeholder.configure({ placeholder: "Write your story here..." }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: "auto",
              renderHTML: (attributes) => {
                return { width: attributes.width };
              },
            },
            height: {
              default: "auto",
              renderHTML: (attributes) => {
                return { height: attributes.height };
              },
            },
          };
        },
        addNodeView() {
          return ReactNodeViewRenderer(ResizableImageView);
        },
      }).configure({ allowBase64: true }),
      Highlight.configure({ multicolor: true }),
    ],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[400px] w-full",
      },
    },
  });

  /**
   * Load categories and initial data
   */
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        await loadCategories();

        if (initialData) {
          setTitle(initialData.title);
          setSlug(initialData.slug);
          setCoverImage(initialData.cover_image || "");
          setExcerpt(initialData.excerpt || "");
          setTags(initialData.tags || []);
          setCategory(initialData.category);
          setContent(initialData.content);
          setIsPublished(initialData.published);

          if (editor && initialData.content) {
            editor.commands.setContent(initialData.content);
          }
        }
      } catch (err) {
        toast.error("Error loading blog data");
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [initialData, editor]);

  /**
   * Load categories from database
   */
  const loadCategories = async () => {
    const categoryList = await getBlogCategories();
    setCategories(categoryList);
  };

  /**
   * Auto-generate slug from title
   */
  useEffect(() => {
    if (title && !blogId) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  }, [title, blogId]);

  /**
   * Handle save/publish
   */
  const handleSave = async () => {
    if (!title || !content) {
      toast.error("Title and Content are required");
      return;
    }

    if (!slug) {
      toast.error("URL Slug is required");
      return;
    }

    if (!category) {
      toast.error("Category is required");
      return;
    }

    setIsSaving(true);
    const blogData: Partial<BlogPost> = {
      title,
      slug,
      content,
      cover_image: coverImage,
      excerpt: excerpt || undefined,
      tags,
      category,
      published: isPublished,
    };

    try {
      const result = await saveBlogPost(blogData as BlogPost, blogId);
      if (result.success) {
        toast.success(
          blogId ? "Blog updated successfully" : "Blog created successfully"
        );
        onSave();
      } else {
        toast.error("Failed to save blog post");
      }
    } catch (error) {
      toast.error("Error saving blog post");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Upload cover image to Cloudinary
   */
  const handleCoverImageUpload = async (file: File) => {
    setIsUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const imageUrl = await uploadImageToCloudinary(formData, "blog-covers");
      if (imageUrl) {
        setCoverImage(imageUrl);
        toast.success("Cover image uploaded");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploadingCover(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-20 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground italic">Loading Editor...</p>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-lg border-t-4 border-t-primary">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {blogId ? "Edit Blog Post" : "Create New Blog Post"}
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
            <Switch
              id="published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label htmlFor="published" className="text-sm font-medium">
              {isPublished ? "Published" : "Draft"}
            </Label>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Cover Image */}
        <CoverImageUpload
          coverImage={coverImage}
          isUploading={isUploadingCover}
          onUpload={handleCoverImageUpload}
          onRemove={() => setCoverImage("")}
        />

        {/* Title, Slug, Excerpt */}
        <BlogMetadata
          title={title}
          slug={slug}
          excerpt={excerpt}
          onTitleChange={setTitle}
          onSlugChange={setSlug}
          onExcerptChange={setExcerpt}
        />

        {/* Category & Tags */}
        <BlogCategoryTags
          category={category}
          categories={categories}
          tags={tags}
          onCategoryChange={setCategory}
          onCategoriesRefresh={loadCategories}
          onTagAdd={(tag) => setTags([...tags, tag])}
          onTagRemove={(tag) => setTags(tags.filter((t) => t !== tag))}
        />

        {/* Rich Text Editor */}
        <div className="space-y-2">
          <Label className="text-base">Content *</Label>
          <div className="border-2 rounded-xl overflow-hidden focus-within:border-primary transition-colors">
            {editor && <TiptapMenuBar editor={editor} />}
            <div className="p-6 prose prose-slate dark:prose-invert max-w-none min-h-[400px]">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6 bg-muted/20">
        <Button variant="ghost" onClick={onCancel} className="font-medium">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving} className="px-8">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : blogId ? (
            "Update Post"
          ) : (
            `${isPublished ? "Publish" : "Save Draft"}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
