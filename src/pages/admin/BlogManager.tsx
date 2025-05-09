
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BlogTable from "@/components/admin/blog/BlogTable";
import BlogEditor from "@/components/admin/blog/BlogEditor";
import { getBlogPosts, BlogFilters, PaginatedResponse, BlogPost } from "@/utils/blog-utils";
import { Calendar, Search, Filter } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BlogManager() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [paginationData, setPaginationData] = useState<Omit<PaginatedResponse<BlogPost>, 'data'>>({
    count: 0,
    page: 1,
    pageSize: 10
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<BlogFilters>({});

  // Fetch blogs with current pagination and filter settings
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const { data, count, page, pageSize } = await getBlogPosts(
        paginationData.page, 
        paginationData.pageSize,
        {
          ...filters,
          searchQuery: searchQuery.length > 0 ? searchQuery : null
        }
      );
      
      setBlogs(data);
      setPaginationData({ count, page, pageSize });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and on filter/pagination change
  useEffect(() => {
    fetchBlogs();
  }, [paginationData.page, filters]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setPaginationData(prev => ({ ...prev, page }));
  };

  // Handle search
  const handleSearch = () => {
    setPaginationData(prev => ({ ...prev, page: 1 })); // Reset to first page
    fetchBlogs();
  };

  // Handle filter change
  const handleFilterChange = (key: keyof BlogFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPaginationData(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle refresh after blog actions
  const handleBlogActionComplete = () => {
    setIsCreating(false);
    setEditingBlogId(null);
    fetchBlogs();
  };

  // Handle edit blog
  const handleEditBlog = (id: string) => {
    setEditingBlogId(id);
    setIsCreating(true);
  };

  // Total pages calculation
  const totalPages = Math.ceil(paginationData.count / paginationData.pageSize);

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const currentPage = paginationData.page;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
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
          <Button onClick={() => setIsCreating(true)}>
            Create New Blog
          </Button>
        )}
      </div>

      {isCreating ? (
        <BlogEditor 
          blogId={editingBlogId} 
          onCancel={() => { 
            setIsCreating(false);
            setEditingBlogId(null);
          }}
          onSaved={handleBlogActionComplete}
        />
      ) : (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>
                Manage your blog posts, filter, and search through content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by title or content..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button onClick={handleSearch} className="shrink-0">
                    Search
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 md:w-2/3">
                  <div className="w-1/3">
                    <Select 
                      onValueChange={(value) => handleFilterChange('status', value || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-1/3">
                    <Select
                      onValueChange={(value) => handleFilterChange('category', value || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" className="flex gap-2 w-1/3">
                    <Calendar className="h-4 w-4" />
                    <span>Date</span>
                  </Button>
                </div>
              </div>

              {/* Blog table */}
              <BlogTable 
                blogs={blogs} 
                isLoading={isLoading}
                onEdit={handleEditBlog}
                onDelete={handleBlogActionComplete}
                onArchive={handleBlogActionComplete}
              />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(1, paginationData.page - 1))}
                          className={paginationData.page <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {generatePaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(Math.min(totalPages, paginationData.page + 1))}
                          className={paginationData.page >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
