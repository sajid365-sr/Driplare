"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, X } from "lucide-react";

interface CoverImageUploadProps {
  coverImage: string;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export function CoverImageUpload({
  coverImage,
  isUploading,
  onUpload,
  onRemove,
}: CoverImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
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
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Change Image
            </Button>
            <Button
              variant="destructive"
              onClick={onRemove}
              size="icon"
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="w-full h-full flex flex-col items-center justify-center gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          )}
          <span className="font-medium text-muted-foreground">
            {isUploading ? "Uploading..." : "Add Cover Image"}
          </span>
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
