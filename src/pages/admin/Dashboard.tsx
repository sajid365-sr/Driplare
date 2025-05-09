import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  Calendar,
  FileText,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Submission interface with status field
interface Submission {
  id: string;
  name: string;
  email: string;
  date: string;
  service: string;
  message: string;
  status: "Pending" | "Reviewed" | "Archived";
  notes?: string;
  tags?: string[];
}

// Mock data with status field added
const mockSubmissions: Submission[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    date: "2023-10-25",
    service: "Web Design",
    message:
      "I need a new website for my business. Looking for a clean, modern design that's mobile friendly.",
    status: "Pending",
    tags: ["New Client", "High Priority"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    date: "2023-10-24",
    service: "AI Services",
    message:
      "Interested in implementing a chatbot for my customer service department.",
    status: "Reviewed",
    notes: "Follow up to discuss AI integration options",
    tags: ["Existing Client"],
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    date: "2023-10-23",
    service: "Digital Marketing",
    message: "We need help improving our SEO and social media presence.",
    status: "Pending",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    date: "2023-10-22",
    service: "Web Design",
    message: "Looking for a website redesign for our healthcare practice.",
    status: "Archived",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    date: "2023-10-21",
    service: "AI Services",
    message:
      "Need consultation on implementing AI in our data analysis workflow.",
    status: "Reviewed",
    notes: "Scheduled consultation for next week",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@example.com",
    date: "2023-10-20",
    service: "Newsletter",
    message:
      "Just subscribed to the newsletter. Looking forward to industry insights.",
    status: "Archived",
  },
];

// Status badge colors
const statusColors = {
  Pending: "secondary",
  Reviewed: "default",
  Archived: "outline",
};

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [viewSubmission, setViewSubmission] = useState<Submission | null>(null);
  const [noteInput, setNoteInput] = useState("");

  // Show a notification for new submissions
  useEffect(() => {
    const timer = setTimeout(() => {
      toast("New submission received", {
        description: "Sarah Johnson has submitted a contact form",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Filtered and sorted submissions
  const filteredSubmissions = submissions
    .filter((sub) => {
      // Filter by service
      if (filter !== "all" && sub.service !== filter) return false;

      // Filter by status
      if (statusFilter !== "all" && sub.status !== statusFilter) return false;

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          sub.name.toLowerCase().includes(term) ||
          sub.email.toLowerCase().includes(term) ||
          sub.message.toLowerCase().includes(term)
        );
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  // Handle row click
  const toggleRowExpansion = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  // Handle sorting
  const toggleSort = (column: "date" | "name") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Date",
      "Service",
      "Status",
      "Message",
      "Notes",
    ];
    const csvRows = [headers.join(",")];

    filteredSubmissions.forEach((sub) => {
      const row = [
        `"${sub.name}"`,
        `"${sub.email}"`,
        `"${sub.date}"`,
        `"${sub.service}"`,
        `"${sub.status}"`,
        `"${sub.message.replace(/"/g, '""')}"`,
        `"${sub.notes || ""}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `driplare-submissions-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV file downloaded successfully");
  };

  // Export to PDF (simplified, in real app would use a library like jspdf)
  const exportToPDF = () => {
    toast.success("PDF file downloaded successfully");
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Handle checkbox selection
  const toggleSelectSubmission = (id: string) => {
    setSelectedSubmissions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Select all submissions
  const toggleSelectAll = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(filteredSubmissions.map((sub) => sub.id));
    }
  };

  // Update status of selected submissions
  const updateStatus = (status: "Pending" | "Reviewed" | "Archived") => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        selectedSubmissions.includes(sub.id) ? { ...sub, status } : sub
      )
    );

    toast.success(
      `${selectedSubmissions.length} submissions marked as ${status}`
    );
    setSelectedSubmissions([]);
  };

  // View submission details
  const handleViewSubmission = (submission: Submission) => {
    setViewSubmission(submission);
    setNoteInput(submission.notes || "");
  };

  // Save notes
  const handleSaveNotes = () => {
    if (!viewSubmission) return;

    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === viewSubmission.id ? { ...sub, notes: noteInput } : sub
      )
    );

    toast.success("Notes saved successfully");
    setViewSubmission(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Submissions Dashboard</h1>

      {/* Search, Filter, and Export */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Web Design">Web Design</SelectItem>
                <SelectItem value="Digital Marketing">
                  Digital Marketing
                </SelectItem>
                <SelectItem value="AI Services">AI Services</SelectItem>
                <SelectItem value="Newsletter">Newsletter</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Bulk Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status Update</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => updateStatus("Pending")}
                disabled={selectedSubmissions.length === 0}
              >
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateStatus("Reviewed")}
                disabled={selectedSubmissions.length === 0}
              >
                Mark as Reviewed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateStatus("Archived")}
                disabled={selectedSubmissions.length === 0}
              >
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToCSV}>
                <FileText className="mr-2 h-4 w-4" />
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="border rounded-md">
        <Table>
          <TableCaption>List of all form submissions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={
                    selectedSubmissions.length === filteredSubmissions.length &&
                    filteredSubmissions.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[180px]">
                <button
                  onClick={() => toggleSort("name")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Name
                  {sortBy === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[120px]">
                <button
                  onClick={() => toggleSort("date")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Date
                  {sortBy === "date" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </button>
              </TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <TableRow
                  key={submission.id}
                  className="cursor-pointer hover:bg-secondary/20"
                  onClick={() => handleViewSubmission(submission)}
                >
                  <TableCell
                    className="p-0 pl-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={selectedSubmissions.includes(submission.id)}
                      onCheckedChange={() =>
                        toggleSelectSubmission(submission.id)
                      }
                      aria-label={`Select ${submission.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {submission.name}
                  </TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{formatDate(submission.date)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {submission.service}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[submission.status] as any}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{truncateText(submission.message, 50)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No submissions found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Submission Detail View Modal */}
      <Dialog
        open={!!viewSubmission}
        onOpenChange={(open) => !open && setViewSubmission(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on {viewSubmission && formatDate(viewSubmission.date)}{" "}
              by {viewSubmission?.name}
            </DialogDescription>
          </DialogHeader>

          {viewSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </h4>
                  <p>{viewSubmission.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </h4>
                  <p>{viewSubmission.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Service
                  </h4>
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {viewSubmission.service}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <div className="flex gap-2 mt-1">
                    <Select
                      value={viewSubmission.status}
                      onValueChange={(value) => {
                        setSubmissions((prev) =>
                          prev.map((sub) =>
                            sub.id === viewSubmission.id
                              ? { ...sub, status: value as any }
                              : sub
                          )
                        );
                        setViewSubmission((prev) =>
                          prev ? { ...prev, status: value as any } : null
                        );
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Reviewed">Reviewed</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Message
                </h4>
                <div className="mt-1 p-3 bg-muted/50 rounded-md">
                  <p className="whitespace-pre-wrap">
                    {viewSubmission.message}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Tags
                </h4>
                <div className="flex gap-2 mt-1">
                  {viewSubmission.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-secondary/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {!viewSubmission.tags?.length && (
                    <span className="text-sm text-muted-foreground">
                      No tags
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Internal Notes
                </h4>
                <div className="mt-1">
                  <Input
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add notes about this submission..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewSubmission(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
