
import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBlogPost, saveBlogPost, generateSlug, uploadCoverImage, getBlogCategories } from "@/utils/blog-utils";
import { Switch } from "@/components/ui/switch";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import Tiptap dependencies
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TiptapMenuBar from "./TiptapMenuBar";
import { Image } from '@tiptap/extension-image';

interface BlogEditorProps {
  blogId?: string | null;
  onCancel: () => void;
  onSaved: () => void;
}

export default function BlogEditor({ blogId, onCancel, onSaved }: BlogEditorProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const coverImageRef = useRef<HTMLInputElement>(null);

  // Initialize the Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your blog content...',
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Fetch blog data if editing existing blog
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList = await getBlogCategories();
      setCategories(categoryList.length > 0 ? categoryList : [
        'Technology', 'Design', 'Marketing', 'Business', 'Development'
      ]);
    };

    fetchCategories();
    
    if (blogId) {
      setIsLoading(true);
      getBlogPost(blogId).then(blog => {
        if (blog) {
          setTitle(blog.title);
          setSlug(blog.slug);
          setCoverImage(blog.cover_image || "");
          setTags(blog.tags || []);
          setCategory(blog.category);
          setContent(blog.content);
          if (editor) {
            editor.commands.setContent(blog.content);
          }
          setStatus(blog.status === 'published' ? 'published' : 'draft');
          setIsPublished(blog.status === 'published');
        }
        setIsLoading(false);
      });
    }
  }, [blogId, editor]);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !blogId) {
      setSlug(generateSlug(title));
    }
  }, [title, blogId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!blogId) {
      setSlug(generateSlug(e.target.value));
    }
  };

  // Handle cover image upload
  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const imageUrl = await uploadCoverImage(file);
      if (imageUrl) {
        setCoverImage(imageUrl);
        toast.success("Cover image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload cover image");
      console.error("Upload error:", error);
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Handle adding tags
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Handle removing tags
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle saving blog
  const handleSave = async (publishStatus: "published" | "draft") => {
    if (!title) {
      toast.error("Title is required");
      return;
    }

    if (!content) {
      toast.error("Content is required");
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
      published_at: publishStatus === 'published' ? new Date().toISOString() : undefined,
      is_archived: false
    };

    try {
      const savedId = await saveBlogPost(blogData, blogId || undefined);
      setIsSaving(false);
      
      if (savedId) {
        onSaved();
      }
    } catch (error) {
      setIsSaving(false);
      toast.error("Error saving blog post");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{blogId ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter blog title"
            />
          </div>
          
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input 
              id="slug" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="blog-post-slug"
            />
          </div>
          
          {/* Cover Image */}
          <div>
            <Label htmlFor="coverImage">Cover Image</Label>
            <div className="mt-2">
              {coverImage ? (
                <div className="relative mb-4">
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="max-h-60 rounded-md object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => coverImageRef.current?.click()}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full h-40 border-dashed flex flex-col gap-2 items-center justify-center"
                  onClick={() => coverImageRef.current?.click()}
                  disabled={isUploadingCover}
                >
                  {isUploadingCover ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-6 w-6" />
                      <span>Upload Cover Image</span>
                    </>
                  )}
                </Button>
              )}
              <Input 
                id="coverImage"
                ref={coverImageRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverImageChange}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tags"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button 
                type="button" 
                variant="secondary"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <div 
                  key={tag} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {tag}
                  <button 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rich Text Editor */}
          <div className="mt-6">
            <Label>Content</Label>
            <div className="mt-2 border rounded-md min-h-[300px]">
              {editor && <TiptapMenuBar editor={editor} />}
              <div className="p-4 min-h-[300px]">
                <EditorContent editor={editor} className="min-h-[300px] prose max-w-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Publication Status */}
        <div className="flex items-center space-x-2">
          <Switch 
            id="published"
            checked={isPublished}
            onCheckedChange={(checked) => {
              setIsPublished(checked);
              setStatus(checked ? "published" : "draft");
            }}
          />
          <Label htmlFor="published">
            {isPublished ? "Published" : "Draft"}
          </Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <div className="space-x-2">
          <Button 
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
          >
            {isSaving && status === "draft" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save as Draft
          </Button>
          <Button 
            onClick={() => handleSave("published")}
            disabled={isSaving}
          >
            {isSaving && status === "published" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {blogId ? "Update" : "Publish"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
