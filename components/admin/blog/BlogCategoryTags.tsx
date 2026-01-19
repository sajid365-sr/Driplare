"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CategoryManager } from "./CategoryManager";

interface BlogCategoryTagsProps {
  category: string;
  categories: string[];
  tags: string[];
  onCategoryChange: (value: string) => void;
  onCategoriesRefresh: () => void;
  onTagAdd: (value: string) => void;
  onTagRemove: (value: string) => void;
}

/**
 * Blog Category & Tags Component
 * Handles category selection and tag management
 */
export function BlogCategoryTags({
  category,
  categories,
  tags,
  onCategoryChange,
  onCategoriesRefresh,
  onTagAdd,
  onTagRemove,
}: BlogCategoryTagsProps) {
  const [open, setOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const handleCategorySelect = (value: string) => {
    onCategoryChange(value);
    setOpen(false);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        onTagAdd(tagInput.trim());
      }
      setTagInput("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Category Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Category *</Label>
          <CategoryManager />
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              onFocus={onCategoriesRefresh}
            >
              {category || "Select category..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandList>
                <CommandEmpty>
                  <div className="p-2 text-center">
                    <p className="text-sm text-muted-foreground">
                      No categories found. Use "Manage Categories" to add one.
                    </p>
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  {categories.map((cat) => (
                    <CommandItem
                      key={cat}
                      value={cat}
                      onSelect={() => handleCategorySelect(cat)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          category === cat ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {cat}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Press Enter to add tags"
        />
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
            >
              {tag}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onTagRemove(tag)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
