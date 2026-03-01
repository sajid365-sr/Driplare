"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import {
  deleteReview,
  getAllReviews,
  approveReview,
  rejectReview,
  toggleFeaturedReview,
} from "@/lib/review-action";
import { Review } from "@/types/review-types";
import { ReviewPagination } from "@/components/admin/review/ReviewPagination";
import { ReviewsTable } from "@/components/admin/review/ReviewTables";

export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { showAlert } = useAlertDialog();

  const itemsPerPage = 10;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await getAllReviews();
      if (res && res.data) {
        setAllReviews(res.data as Review[]);
      } else {
        toast.error("Failed to load reviews");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await approveReview(id);
      if (res.success) {
        toast.success("Review approved successfully");
        fetchReviews();
      } else {
        toast.error("Failed to approve review");
      }
    } catch (error) {
      toast.error("Error approving review");
    }
  };

  const handleReject = async (id: string) => {
    const confirmed = await showAlert({
      title: "Reject this review?",
      description: "This will mark the review as rejected. You can still approve it later.",
      confirmText: "Reject",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      try {
        const res = await rejectReview(id);
        if (res.success) {
          toast.success("Review rejected");
          fetchReviews();
        } else {
          toast.error("Failed to reject review");
        }
      } catch (error) {
        toast.error("Error rejecting review");
      }
    }
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await toggleFeaturedReview(id, !currentStatus);
      if (res.success) {
        toast.success(currentStatus ? "Removed from featured" : "Marked as featured");
        fetchReviews();
      } else {
        toast.error("Failed to update featured status");
      }
    } catch (error) {
      toast.error("Error updating featured status");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Are you absolutely sure?",
      description: "This action cannot be undone. This will permanently delete this review.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      try {
        const res = await deleteReview(id);
        if (res.success) {
          toast.success("Review deleted successfully");
          fetchReviews();
        } else {
          toast.error("Delete failed");
        }
      } catch (error) {
        toast.error("Error deleting review");
      }
    }
  };

  // Filter and paginate
  const filteredReviews = activeTab === "all"
    ? allReviews
    : allReviews.filter((r) => r.status === activeTab);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  // Counts
  const pendingCount = allReviews.filter((r) => r.status === "pending").length;
  const approvedCount = allReviews.filter((r) => r.status === "approved").length;
  const rejectedCount = allReviews.filter((r) => r.status === "rejected").length;

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading Reviews...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Client Reviews</h2>
        <Link href="/admin/reviews/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Review
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({allReviews.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all"
                  ? `All Reviews (${allReviews.length})`
                  : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Reviews (${filteredReviews.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewsTable
                reviews={currentItems}
                onApprove={handleApprove}
                onReject={handleReject}
                onToggleFeatured={handleToggleFeatured}
                onDelete={handleDelete}
              />

              <ReviewPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredReviews.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}