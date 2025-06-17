import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  getFormSubmissions,
  updateSubmissionStatus,
  deleteSubmissions,
  CombinedSubmission,
} from "@/utils/form-utils";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/csv-export";
import { DebugInfoPanel } from "@/components/admin/dashboard/DebugInfoPanel";
import { SubmissionsFilters } from "@/components/admin/dashboard/SubmissionsFilters";
import { SubmissionsActions } from "@/components/admin/dashboard/SubmissionsActions";
import { SubmissionsTable } from "@/components/admin/dashboard/SubmissionsTable";
import { EmptyState } from "@/components/admin/dashboard/EmptyState";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<CombinedSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    setDebugInfo("🔄 Starting to fetch submissions...");

    try {
      console.log("🚀 Dashboard: Starting submission fetch process");

      const data = await getFormSubmissions();

      console.log("📥 Dashboard: Received data:", data);

      setSubmissions(data);

      // Reset to first page when data changes
      setCurrentPage(1);

      // Set debug info based on results
      const formSubmissions = data.filter(
        (sub) => sub.form_type !== "newsletter"
      );
      const newsletterSubmissions = data.filter(
        (sub) => sub.form_type === "newsletter"
      );

      const debugMessage = `
✅ Fetch completed!
📊 Total: ${data.length} submissions
📝 Form submissions: ${formSubmissions.length}
📧 Newsletter: ${newsletterSubmissions.length}
      `.trim();

      setDebugInfo(debugMessage);

      if (data.length === 0) {
        console.warn(
          "⚠️ Dashboard: No submissions found - this could indicate:"
        );
        console.warn("- Empty database tables");
        console.warn("- RLS policies blocking access");
        console.warn("- Database connection issues");
        setDebugInfo("⚠️ No submissions found - check console for details");
      } else if (
        formSubmissions.length === 0 &&
        newsletterSubmissions.length > 0
      ) {
        console.warn(
          "🔍 Dashboard: Only newsletter data found, no form submissions"
        );
        setDebugInfo(
          `⚠️ Only newsletter data (${newsletterSubmissions.length}) found. Form submissions table appears empty or inaccessible.`
        );
      }
    } catch (error) {
      console.error("💥 Dashboard: Failed to fetch submissions:", error);
      setDebugInfo(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      toast.error("Failed to load form submissions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchSubmissions();
    setIsRefreshing(false);
    toast.success("Data refreshed successfully");
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const success = await updateSubmissionStatus(id, status);
      if (success) {
        setSubmissions(
          submissions.map((sub) => (sub.id === id ? { ...sub, status } : sub))
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update submission status");
    }
  };

  const handleDelete = async () => {
    if (selectedSubmissions.length === 0) return;

    setIsDeleting(true);
    try {
      const success = await deleteSubmissions(selectedSubmissions);
      if (success) {
        setSubmissions(
          submissions.filter((sub) => !selectedSubmissions.includes(sub.id))
        );
        setSelectedSubmissions([]);
      }
    } catch (error) {
      console.error("Failed to delete submissions:", error);
      toast.error("Failed to delete submissions");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelectSubmission = (id: string) => {
    setSelectedSubmissions((prev) =>
      prev.includes(id) ? prev.filter((subId) => subId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedSubmissions.length === paginatedSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(paginatedSubmissions.map((sub) => sub.id));
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesFilter =
      filter === "all" ||
      submission.status === filter ||
      submission.form_type === filter ||
      (filter === "contact" && submission.form_type !== "newsletter") ||
      (filter === "newsletter" && submission.form_type === "newsletter");

    const matchesSearch =
      searchTerm === "" ||
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.form_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedSubmissions([]); // Clear selections when changing pages
  };

  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    const current = currentPage;
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
      if (start > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === current}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
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

  const handleExport = () => {
    if (filteredSubmissions.length === 0) {
      toast.error("No data to export");
      return;
    }

    exportToCSV(filteredSubmissions, "form_submissions");
    toast.success(`Exported ${filteredSubmissions.length} submissions to CSV`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle>Form Submissions</CardTitle>
            <CardDescription>
              Manage and respond to form submissions from all sources (
              {submissions.length} total)
            </CardDescription>

            <DebugInfoPanel debugInfo={debugInfo} />
          </div>
          {selectedSubmissions.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>Delete Selected</>
              )}
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <SubmissionsFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            onExport={handleExport}
            filteredCount={filteredSubmissions.length}
          />

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : paginatedSubmissions.length > 0 ? (
            <>
              <SubmissionsTable
                submissions={paginatedSubmissions}
                selectedSubmissions={selectedSubmissions}
                onToggleSelection={toggleSelectSubmission}
                onToggleSelectAll={toggleSelectAll}
                onStatusChange={handleStatusChange}
              />

              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage <= 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {generatePaginationItems()}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          className={
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              totalSubmissions={submissions.length}
              searchTerm={searchTerm}
              filter={filter}
              onClearFilters={handleClearFilters}
              onRefresh={handleRefresh}
            />
          )}
        </CardContent>

        {paginatedSubmissions.length > 0 && (
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredSubmissions.length)} of{" "}
              {filteredSubmissions.length} submissions
              {filteredSubmissions.length !== submissions.length &&
                ` (filtered from ${submissions.length} total)`}
            </p>
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
