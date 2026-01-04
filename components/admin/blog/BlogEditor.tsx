"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   getBlogPost,
//   saveBlogPost,
//   generateSlug,
//   uploadCoverImage,
//   getBlogCategories,
// } from "@/utils/blog-utils";
import { uploadImageToCloudinary } from "@/lib/blog-actions";
import { Switch } from "@/components/ui/switch";
import { Loader2, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tiptap Imports
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { TiptapMenuBar } from "./TiptapMenuBar"; // Ensure correct import path
import {
  getBlogCategories,
  getBlogPost,
  saveBlogPost,
} from "@/lib/blog-actions";
import { BlogPost } from "@/app/admin/BlogManager";

interface BlogEditorProps {
  blogId?: string | null;
  onCancel: () => void;
  onSave: () => void;
  post?: BlogPost | null;
}

export default function BlogEditor({
  blogId,
  onCancel,
  onSave,
}: BlogEditorProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const coverImageRef = useRef<HTMLInputElement>(null);

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
      Image.configure({ allowBase64: true }),
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

  // Fetch Categories and Blog Data
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const categoryList = await getBlogCategories();
        setCategories(
          categoryList.length > 0
            ? categoryList
            : ["Technology", "Design", "Marketing", "Business", "Development"]
        );

        if (blogId) {
          const blog = await getBlogPost(blogId);
          if (blog) {
            setTitle(blog.title);
            setSlug(blog.slug);
            setCoverImage(blog.cover_image || "");
            setTags(blog.tags || []);
            setCategory(blog.category);
            setContent(blog.content);
            setIsPublished(blog.status === "published");

            if (editor && blog.content) {
              editor.commands.setContent(blog.content);
            }
          }
        }
      } catch (err) {
        toast.error("Error loading blog data");
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [blogId, editor]);

  // Sync slug with title
  // useEffect(() => {
  //   if (title && !blogId) {
  //     setSlug(generateSlug(title));
  //   }
  // }, [title, blogId]);

  const handleSave = async (publishStatus: "published" | "draft") => {
    if (!title || !content) {
      toast.error("Title and Content are required");
      return;
    }

    setIsSaving(true);
    const blogData = {
      title,
      slug,
      content,
      cover_image: coverImage,
      tags,
      category: category || "Uncategorized",
      status: publishStatus,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      is_archived: false,
    };

    try {
      const result = await saveBlogPost(blogData, blogId || undefined);
      if (result) {
        toast.success(
          `Post ${publishStatus === "published" ? "published" : "saved as draft"}`
        );
        onSave();
      }
    } catch (error) {
      toast.error("Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadCoverImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const imageUrl = await uploadImageToCloudinary(formData);
      return imageUrl;
    } catch (error) {
      console.error("Client upload error:", error);
      return null;
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
          {blogId ? "Edit Post" : "Create Post"}
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
            <Switch
              id="published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label htmlFor="published" className="text-sm font-medium">
              {isPublished ? "Public" : "Private"}
            </Label>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Cover Image Section */}
        <div className="group relative w-full h-64 bg-muted rounded-xl overflow-hidden border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-all">
          {coverImage ? (
            <>
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  onClick={() => coverImageRef.current?.click()}
                >
                  Change Image
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setCoverImage("")}
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <button
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              onClick={() => coverImageRef.current?.click()}
              disabled={isUploadingCover}
            >
              {isUploadingCover ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              )}
              <span className="font-medium text-muted-foreground">
                Add Cover Image
              </span>
            </button>
          )}
          <input
            title="input"
            ref={coverImageRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setIsUploadingCover(true);
                uploadCoverImage(file).then((url) => {
                  if (url) setCoverImage(url);
                  setIsUploadingCover(false);
                });
              }
            }}
          />
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-base">Post Title</Label>
            <Input
              className="text-lg font-semibold py-6"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How AI is changing the world"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">URL Slug</Label>
            <Input
              className="font-mono text-sm bg-muted/50"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>

        {/* Categories & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(),
                  setTags([...tags, tagInput]),
                  setTagInput(""))
                }
                placeholder="Press Enter to add"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {t}{" "}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setTags(tags.filter((i) => i !== t))}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="space-y-2">
          <Label className="text-base">Content</Label>
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
          Discard
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
          >
            {isSaving && !isPublished ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save Draft"
            )}
          </Button>
          <Button
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="px-8"
          >
            {isSaving && isPublished ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : blogId ? (
              "Update Post"
            ) : (
              "Publish Now"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
