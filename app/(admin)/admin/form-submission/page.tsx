"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  getContactSubmissions,
  deleteContactSubmission,
  updateSubmissionStatus,
} from "@/lib/form-action";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { ContactFormSubmission } from "@/types/form-types";

// Import components
import { SubmissionsTable } from "@/components/admin/form-submission/SubmissionsTable";
import { PaginationControls } from "@/components/admin/form-submission/PaginationControls";
import { SubmissionDetailsDialog } from "@/components/admin/form-submission/SubmissionDetailsDialog";

/**
 * Form Submissions Admin Page
 * Displays all contact form submissions from the website
 * Allows admin to view, update status, and delete submissions
 */
export default function FormSubmissionPage() {
  const [submissions, setSubmissions] = useState<ContactFormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlertDialog();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dialog state
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactFormSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  /**
   * Fetch all form submissions
   */
  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load submissions");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle deletion of a submission
   */
  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Are you absolutely sure?",
      description:
        "This action cannot be undone. This will permanently delete this form submission.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
    });

    if (confirmed) {
      try {
        const res = await deleteContactSubmission(id);
        if (res.success) {
          toast.success("Submission deleted successfully");
          fetchSubmissions();
        } else {
          toast.error("Delete failed");
        }
      } catch (error) {
        toast.error("Error deleting submission");
      }
    }
  };

  /**
   * Handle status update
   */
  const handleStatusUpdate = async (
    id: string,
    status: "pending" | "replied" | "resolved" | "archived"
  ) => {
    try {
      const res = await updateSubmissionStatus(id, { status });
      if (res.success) {
        toast.success("Status updated successfully");
        fetchSubmissions();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  /**
   * Open dialog to view submission details
   */
  const handleViewDetails = (submission: ContactFormSubmission) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
  };

  /**
   * Close dialog
   */
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSubmission(null);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  // Loading State
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading Submissions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Form Submissions
          </h2>
          <p className="text-muted-foreground">
            Contact form submissions from your website
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        <Card>
          <CardHeader>
            <CardTitle>All Submissions ({submissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Submissions Table */}
            <SubmissionsTable
              submissions={currentItems}
              onStatusUpdate={handleStatusUpdate}
              onViewDetails={handleViewDetails}
              onDelete={handleDelete}
            />

            {/* Pagination Controls */}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={submissions.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <SubmissionDetailsDialog
        submission={selectedSubmission}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onRefresh={fetchSubmissions}
      />
    </div>
  );
}
