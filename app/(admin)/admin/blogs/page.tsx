"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Edit,
  ExternalLink,
  Loader2,
  Plus,
  Trash2,
  Archive,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  getAllBlogsForAdmin,
  deleteBlogPost,
  archiveBlogPost,
} from "@/lib/blog-actions";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { BlogPost } from "@/types/blog-types";

/**
 * Blog Management Admin Page
 * Displays all blog posts in a table with CRUD operations
 */
export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlertDialog();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBlogs();
  }, []);

  /**
   * Fetch all blogs from database
   */
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await getAllBlogsForAdmin();
      if (res.success) {
        setBlogs(res.data);
      } else {
        toast.error("Failed to load blogs");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle blog deletion with confirmation
   */
  const handleDelete = async (id: string, title: string) => {
    const confirmed = await showAlert({
      title: "Are you absolutely sure?",
      description: `This action cannot be undone. This will permanently delete "${title}" from the database.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      try {
        const res = await deleteBlogPost(id);
        if (res.success) {
          toast.success("Blog deleted successfully");
          fetchBlogs();
        } else {
          toast.error("Delete failed");
        }
      } catch (error) {
        toast.error("Error deleting blog");
      }
    }
  };

  /**
   * Handle blog archiving
   */
  const handleArchive = async (id: string, title: string) => {
    const confirmed = await showAlert({
      title: "Archive this blog post?",
      description: `"${title}" will be unpublished and moved to archived status. You can restore it later.`,
      confirmText: "Archive",
      cancelText: "Cancel",
      variant: "default",
    });

    if (confirmed) {
      try {
        const res = await archiveBlogPost(id);
        if (res.success) {
          toast.success("Blog archived successfully");
          fetchBlogs();
        } else {
          toast.error("Archive failed");
        }
      } catch (error) {
        toast.error("Error archiving blog");
      }
    }
  };

  /**
   * Get status badge based on published status
   */
  const getStatusBadge = (published: boolean) => {
    if (published) {
      return (
        <Badge className="bg-green-500 hover:bg-green-500">Published</Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-amber-500 text-amber-500">
        Draft
      </Badge>
    );
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading Blog Posts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Post
          </Button>
        </Link>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts ({blogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div className="font-medium max-w-[300px] truncate">
                          {blog.title}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{blog.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(blog.published)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap max-w-[150px]">
                        {blog.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-muted px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{blog.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          title="View Live"
                        >
                          <Link href={`/insights/${blog.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          title="Edit"
                        >
                          <Link href={`/admin/blogs/edit/${blog.id}`}>
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleArchive(blog.id, blog.title)}
                          className="text-amber-600 hover:text-amber-700"
                          title="Archive"
                          disabled={!blog.published}
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No blog posts found. Start by creating one!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, blogs.length)} of {blogs.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
