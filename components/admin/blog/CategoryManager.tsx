"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
} from "@/lib/category-actions";

/**
 * Category Manager Component
 * Manage blog categories with CRUD operations
 */
export function CategoryManager() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSaving, setIsSaving] = useState(false);
  const { showAlert } = useAlertDialog();

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsSaving(true);
    try {
      let result;
      if (editingCategory) {
        result = await updateCategory(editingCategory.id, formData);
      } else {
        result = await createCategory(formData);
      }

      if (result.success) {
        toast.success(
          editingCategory
            ? "Category updated successfully"
            : "Category created successfully"
        );
        setFormData({ name: "", description: "" });
        setEditingCategory(null);
        fetchCategories();
      } else {
        toast.error(result.error || "Failed to save category");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
  };

  const handleDelete = async (category: Category) => {
    const confirmed = await showAlert({
      title: "Delete Category?",
      description: `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      const result = await deleteCategory(category.id);
      if (result.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(result.error || "Failed to delete category");
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "" });
    setEditingCategory(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          <Settings className="mr-2 h-4 w-4" />
          Manage Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Blog Categories</DialogTitle>
          <DialogDescription>
            Create, edit, or delete blog categories
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create/Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Machine Learning"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingCategory ? (
                  "Update Category"
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </>
                )}
              </Button>
              {editingCategory && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          {/* Categories List */}
          <div>
            <h3 className="font-semibold mb-3">Existing Categories</h3>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : categories.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No categories yet. Add your first category above.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {category.description || "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(category)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
