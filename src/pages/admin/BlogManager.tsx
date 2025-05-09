import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogTable from "@/components/admin/blog/BlogTable";
import BlogEditor from "@/components/admin/blog/BlogEditor";
import {
  getBlogPosts,
  BlogFilters,
  PaginatedResponse,
  BlogPost,
} from "@/utils/blog-utils";
import { Calendar, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BlogManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [paginationData, setPaginationData] = useState<
    Omit<PaginatedResponse<BlogPost>, "data">
  >({
    count: 0,
    page: 1,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<BlogFilters>({
    status: null,
    category: null,
  });

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const { data, count, page, pageSize } = await getBlogPosts(
        paginationData.page,
        paginationData.pageSize,
        {
          ...filters,
          searchQuery: searchQuery || null,
        }
      );
      setBlogs(data);
      setPaginationData({ count, page, pageSize });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [paginationData.page, filters]);

  const handlePageChange = (page: number) =>
    setPaginationData((p) => ({ ...p, page }));

  const handleSearch = () => {
    setPaginationData((p) => ({ ...p, page: 1 }));
    fetchBlogs();
  };

  const handleFilterChange = (key: keyof BlogFilters, value: string) => {
    setFilters((f) => ({
      ...f,
      [key]: value === "all" ? null : value,
    }));
    setPaginationData((p) => ({ ...p, page: 1 }));
  };

  const handleBlogActionComplete = () => {
    setIsCreating(false);
    setEditingBlogId(null);
    fetchBlogs();
  };
  const handleEditBlog = (id: string) => {
    setEditingBlogId(id);
    setIsCreating(true);
  };

  const totalPages = Math.ceil(paginationData.count / paginationData.pageSize);

  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    const current = paginationData.page;
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    if (start > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (start > 2)
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
    }
    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            className={i === current ? "bg-primary text-white" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (end < totalPages) {
      if (end < totalPages - 1)
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>Create New Blog</Button>
        )}
      </div>

      {isCreating ? (
        <BlogEditor
          blogId={editingBlogId}
          onCancel={() => setIsCreating(false)}
          onSaved={handleBlogActionComplete}
        />
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>
              Manage blog posts with search, filters, and pagination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch}>Search</Button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 md:w-2/3">
                <Select onValueChange={(v) => handleFilterChange("status", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(v) => handleFilterChange("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Button>
              </div>
            </div>

            <BlogTable
              blogs={blogs}
              isLoading={isLoading}
              onEdit={handleEditBlog}
              onDelete={handleBlogActionComplete}
              onArchive={handleBlogActionComplete}
            />

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(Math.max(1, paginationData.page - 1))
                        }
                        className={
                          paginationData.page <= 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {generatePaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, paginationData.page + 1)
                          )
                        }
                        className={
                          paginationData.page >= totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
