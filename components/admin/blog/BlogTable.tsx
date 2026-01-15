import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Edit, Trash, Archive } from "lucide-react";
import { deleteBlogPost, archiveBlogPost } from "@/lib/blog-actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import { BlogPost } from "@/app/(admin)/admin/BlogManager";
// import { BlogPost } from "./BlogEditor";

interface BlogTableProps {
  blogs: BlogPost[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: () => void;
  onArchive: () => void;
}

export default function BlogTable({
  blogs,
  isLoading,
  onEdit,
  onDelete,
  onArchive,
}: BlogTableProps) {
  const handleDelete = async (id: string) => {
    const res = await deleteBlogPost(id);
    if (res.success) {
      toast.success("Blog deleted");
      onDelete();
    }
  };

  const handleArchive = async (id: string) => {
    const res = await archiveBlogPost(id);
    if (res.success) {
      toast.success("Blog archived");
      onArchive();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-500 hover:bg-green-500">Published</Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Draft
          </Badge>
        );
      case "archived":
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading blog posts...</div>;
  }

  if (blogs.length === 0) {
    return <div className="py-10 text-center">No blog posts found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.map((blog) => (
          <TableRow key={blog.id}>
            <TableCell className="font-medium">{blog.title}</TableCell>
            <TableCell>{getStatusBadge(blog.status)}</TableCell>
            <TableCell>{blog.category}</TableCell>
            <TableCell>
              {" "}
              {format(new Date(blog.created_at), "d/MM/yy h:mm a")}
            </TableCell>
            <TableCell>
              {format(new Date(blog.updated_at), "d/MM/yy h:mm a")}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(blog.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the blog post "{blog.title}" from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleArchive(blog.id)}
                  disabled={blog.status === "archived"}
                >
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
