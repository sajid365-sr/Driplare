
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import {
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { getFormSubmissions, updateSubmissionStatus, deleteSubmissions, CombinedSubmission } from "@/utils/form-utils";
import { toast } from "sonner";

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<CombinedSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      console.log("Dashboard: Starting to fetch submissions...");
      console.log("Dashboard: Current time:", new Date().toISOString());
      
      const data = await getFormSubmissions();
      
      console.log("Dashboard: Received submissions data:", data);
      console.log("Dashboard: Number of submissions:", data.length);
      console.log("Dashboard: Data types in array:", data.map(item => ({
        id: item.id,
        form_type: item.form_type,
        email: item.email,
        name: item.name
      })));
      
      setSubmissions(data);
      
      if (data.length === 0) {
        console.log("Dashboard: No submissions found in database");
        console.log("Dashboard: This could indicate:");
        console.log("- Empty tables in database");
        console.log("- Database connection issues");
        console.log("- RLS (Row Level Security) blocking access");
        console.log("- Query permission issues");
        toast.info("No submissions found. Check console for debugging details.");
      } else {
        console.log(`Dashboard: Successfully loaded ${data.length} submissions`);
        
        // Log breakdown by type
        const formSubmissions = data.filter(sub => sub.form_type !== 'newsletter');
        const newsletterSubmissions = data.filter(sub => sub.form_type === 'newsletter');
        console.log(`Dashboard: Form submissions: ${formSubmissions.length}`);
        console.log(`Dashboard: Newsletter submissions: ${newsletterSubmissions.length}`);
        
        // Log first few items for inspection
        console.log("Dashboard: First few submissions:", data.slice(0, 3));
      }
    } catch (error) {
      console.error("Dashboard: Failed to fetch submissions:", error);
      console.error("Dashboard: Error details:", JSON.stringify(error, null, 2));
      toast.error("Failed to load form submissions. Check console for details.");
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
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "in_progress": return "warning";
      case "completed": return "success";
      case "spam": return "destructive";
      default: return "secondary";
    }
  };

  const formatFormType = (formType: string) => {
    if (!formType) return "Unknown";
    
    return formType
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getFormTypeColor = (formType: string) => {
    switch (formType) {
      case "newsletter": return "bg-blue-100 text-blue-800";
      case "contact": return "bg-green-100 text-green-800";
      case "service_request": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle>Form Submissions</CardTitle>
            <CardDescription>
              Manage and respond to form submissions from all sources ({submissions.length} total)
              {submissions.length === 0 && (
                <span className="block text-orange-600 mt-1">
                  ⚠️ No data found - Check browser console for debugging info
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                defaultValue="all"
                value={filter}
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="contact">Contact Forms</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="service_request">Service Requests</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredSubmissions.length > 0 ? (
            <div className="rounded-md border overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedSubmissions.length > 0 &&
                          selectedSubmissions.length === filteredSubmissions.length
                        }
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[120px]">Type</TableHead>
                    <TableHead className="w-[180px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Message/Subject</TableHead>
                    <TableHead className="hidden lg:table-cell">Company</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="hidden lg:table-cell w-[120px]">Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSubmissions.includes(submission.id)}
                          onCheckedChange={() => toggleSelectSubmission(submission.id)}
                          aria-label="Select row"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormTypeColor(submission.form_type || 'unknown')}`}>
                          {formatFormType(submission.form_type || 'unknown')}
                        </span>
                      </TableCell>
                      <TableCell>{submission.name || 'N/A'}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {submission.email}
                        </a>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                        {submission.subject || submission.message || "No message"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                        {submission.company || "N/A"}
                      </TableCell>
                      <TableCell>
                        {submission.form_type === 'newsletter' ? (
                          <Badge variant="secondary">Subscribed</Badge>
                        ) : (
                          <Select
                            value={submission.status || "new"}
                            onValueChange={(value) => handleStatusChange(submission.id, value)}
                          >
                            <SelectTrigger className="w-[110px] h-8">
                              <SelectValue>
                                <Badge variant={getBadgeVariant(submission.status || "new") as any}>
                                  {submission.status ? submission.status.replace("_", " ") : "New"}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="spam">Spam</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {submission.created_at
                          ? formatDistance(new Date(submission.created_at), new Date(), {
                              addSuffix: true,
                            })
                          : "Unknown"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {submissions.length === 0 
                  ? "No submissions found in database." 
                  : "No submissions match your current filters"
                }
              </p>
              {submissions.length === 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 text-left max-w-md mx-auto">
                  <h4 className="font-semibold text-orange-800 mb-2">Debugging Steps:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Check browser console for detailed logs</li>
                    <li>• Verify data exists in Supabase tables</li>
                    <li>• Check database permissions</li>
                    <li>• Ensure RLS policies allow access</li>
                  </ul>
                </div>
              )}
              {searchTerm || filter !== "all" ? (
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button
                  variant="link"
                  onClick={handleRefresh}
                >
                  Refresh data
                </Button>
              )}
            </div>
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
