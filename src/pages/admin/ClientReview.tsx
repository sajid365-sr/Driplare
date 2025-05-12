import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogEditor from "@/components/admin/blog/BlogEditor";
import { PaginatedResponse } from "@/utils/blog-utils";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getReviews, Testimonial } from "@/utils/review.utils";
import ReviewTable from "@/components/admin/review/ReviewTable";
import CreateClientReview from "@/components/admin/review/CreateClientReview";

export default function ClientReview() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [paginationData, setPaginationData] = useState<
    Omit<PaginatedResponse<Testimonial>, "data">
  >({
    count: 0,
    page: 1,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const { data, count, page, pageSize } = await getReviews(
        paginationData.page,
        paginationData.pageSize
      );
      setReviews(data);
      setPaginationData({ count, page, pageSize });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [paginationData.page]);

  const handlePageChange = (page: number) =>
    setPaginationData((p) => ({ ...p, page }));

  const handleSearch = () => {
    setPaginationData((p) => ({ ...p, page: 1 }));
    fetchReviews();
  };

  const handleReviewActionComplete = () => {
    setIsCreating(false);
    setEditingReviewId(null);
    fetchReviews();
  };
  
  const handleEditReview = (id: string) => {
    setEditingReviewId(id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingReviewId(null);
  };

  const totalPages = Math.ceil(paginationData.count / paginationData.pageSize);

  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    const current = paginationData.page;
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
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
        <h1 className="text-3xl font-bold">Review Management</h1>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>Create New Review</Button>
        )}
      </div>

      {isCreating ? (
        <CreateClientReview 
          reviewId={editingReviewId} 
          onCancel={handleCancel}
        />
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Reviews</CardTitle>
            <CardDescription>
              Manage reviews with search and pagination
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
            </div>

            <ReviewTable
              reviews={reviews}
              isLoading={isLoading}
              onEdit={handleEditReview}
              onDelete={handleReviewActionComplete}
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
