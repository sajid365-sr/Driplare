"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BlogMetadataProps {
  title: string;
  slug: string;
  excerpt: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onExcerptChange: (value: string) => void;
}

/**
 * Blog Metadata Component
 * Handles title, slug, and excerpt fields
 */
export function BlogMetadata({
  title,
  slug,
  excerpt,
  onTitleChange,
  onSlugChange,
  onExcerptChange,
}: BlogMetadataProps) {
  return (
    <>
      {/* Title and Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-base">Post Title *</Label>
          <Input
            className="text-lg font-semibold py-6"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. How AI is changing the world"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-base">URL Slug *</Label>
          <Input
            className="font-mono text-sm bg-muted/50"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="auto-generated-from-title"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label className="text-base">Excerpt (Summary)</Label>
        <Input
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Brief summary for blog cards (optional)"
          maxLength={200}
        />
        <p className="text-xs text-muted-foreground">
          {excerpt.length}/200 characters
        </p>
      </div>
    </>
  );
}
