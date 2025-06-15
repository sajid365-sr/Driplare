
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
import { getFormSubmissions, updateSubmissionStatus, deleteSubmissions, CombinedSubmission } from "@/utils/form-utils";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/csv-export";
import { DebugInfoPanel } from "@/components/admin/dashboard/DebugInfoPanel";
import { SubmissionsFilters } from "@/components/admin/dashboard/SubmissionsFilters";
import { SubmissionsActions } from "@/components/admin/dashboard/SubmissionsActions";
import { SubmissionsTable } from "@/components/admin/dashboard/SubmissionsTable";
import { EmptyState } from "@/components/admin/dashboard/EmptyState";

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<CombinedSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

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
      
      // Set debug info based on results
      const formSubmissions = data.filter(sub => sub.form_type !== 'newsletter');
      const newsletterSubmissions = data.filter(sub => sub.form_type === 'newsletter');
      
      const debugMessage = `
✅ Fetch completed!
📊 Total: ${data.length} submissions
📝 Form submissions: ${formSubmissions.length}
📧 Newsletter: ${newsletterSubmissions.length}
      `.trim();
      
      setDebugInfo(debugMessage);
      
      if (data.length === 0) {
        console.warn("⚠️ Dashboard: No submissions found - this could indicate:");
        console.warn("- Empty database tables");
        console.warn("- RLS policies blocking access");
        console.warn("- Database connection issues");
        setDebugInfo("⚠️ No submissions found - check console for details");
      } else if (formSubmissions.length === 0 && newsletterSubmissions.length > 0) {
        console.warn("🔍 Dashboard: Only newsletter data found, no form submissions");
        setDebugInfo(`⚠️ Only newsletter data (${newsletterSubmissions.length}) found. Form submissions table appears empty or inaccessible.`);
      }
      
    } catch (error) {
      console.error("💥 Dashboard: Failed to fetch submissions:", error);
      setDebugInfo(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        setSubmissions(submissions.map(sub => 
          sub.id === id ? { ...sub, status } : sub
        ));
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
        setSubmissions(submissions.filter(sub => !selectedSubmissions.includes(sub.id)));
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
    setSelectedSubmissions(prev =>
      prev.includes(id)
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(filteredSubmissions.map(sub => sub.id));
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === "all" || 
      submission.status === filter || 
      submission.form_type === filter ||
      (filter === "contact" && submission.form_type !== 'newsletter') ||
      (filter === "newsletter" && submission.form_type === 'newsletter');
    
    const matchesSearch = searchTerm === "" ||
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.form_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    if (filteredSubmissions.length === 0) {
      toast.error("No data to export");
      return;
    }
    
    exportToCSV(filteredSubmissions, 'form_submissions');
    toast.success(`Exported ${filteredSubmissions.length} submissions to CSV`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilter("all");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle>Form Submissions</CardTitle>
            <CardDescription>
              Manage and respond to form submissions from all sources ({submissions.length} total)
            </CardDescription>
            
            <DebugInfoPanel debugInfo={debugInfo} />
          </div>
          
          <SubmissionsActions
            onExport={handleExport}
            onDelete={handleDelete}
            selectedCount={selectedSubmissions.length}
            filteredCount={filteredSubmissions.length}
            isDeleting={isDeleting}
          />
        </CardHeader>
        
        <CardContent>
          <SubmissionsFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredSubmissions.length > 0 ? (
            <SubmissionsTable
              submissions={filteredSubmissions}
              selectedSubmissions={selectedSubmissions}
              onToggleSelection={toggleSelectSubmission}
              onToggleSelectAll={toggleSelectAll}
              onStatusChange={handleStatusChange}
            />
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
        
        {filteredSubmissions.length > 0 && (
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSubmissions.length} of {submissions.length} submissions
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
