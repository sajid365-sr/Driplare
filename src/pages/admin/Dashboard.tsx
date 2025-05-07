
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  Download, 
  Search, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data for submissions
interface Submission {
  id: string;
  name: string;
  email: string;
  date: string;
  service: string;
  message: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    date: "2023-10-25",
    service: "Web Design",
    message: "I need a new website for my business. Looking for a clean, modern design that's mobile friendly."
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    date: "2023-10-24",
    service: "AI Services",
    message: "Interested in implementing a chatbot for my customer service department."
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    date: "2023-10-23",
    service: "Digital Marketing",
    message: "We need help improving our SEO and social media presence."
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    date: "2023-10-22",
    service: "Web Design",
    message: "Looking for a website redesign for our healthcare practice."
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    date: "2023-10-21",
    service: "AI Services",
    message: "Need consultation on implementing AI in our data analysis workflow."
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@example.com",
    date: "2023-10-20",
    service: "Newsletter",
    message: "Just subscribed to the newsletter. Looking forward to industry insights."
  }
];

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filtered and sorted submissions
  const filteredSubmissions = submissions
    .filter(sub => {
      // Filter by service
      if (filter !== "all" && sub.service !== filter) return false;
      
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
    const headers = ["Name", "Email", "Date", "Service", "Message"];
    const csvRows = [headers.join(",")];
    
    filteredSubmissions.forEach(sub => {
      const row = [
        `"${sub.name}"`,
        `"${sub.email}"`,
        `"${sub.date}"`,
        `"${sub.service}"`,
        `"${sub.message.replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(","));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `driplare-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CSV file downloaded successfully");
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
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
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="Web Design">Web Design</SelectItem>
              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
              <SelectItem value="AI Services">AI Services</SelectItem>
              <SelectItem value="Newsletter">Newsletter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={exportToCSV} 
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>
      
      {/* Submissions Table */}
      <div className="border rounded-md">
        <Table>
          <TableCaption>List of all form submissions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <button 
                  onClick={() => toggleSort("name")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Name
                  {sortBy === "name" && (
                    sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[120px]">
                <button 
                  onClick={() => toggleSort("date")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Date
                  {sortBy === "date" && (
                    sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
              </TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <React.Fragment key={submission.id}>
                  <TableRow 
                    className="cursor-pointer hover:bg-secondary/20"
                    onClick={() => toggleRowExpansion(submission.id)}
                  >
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{formatDate(submission.date)}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {submission.service}
                      </span>
                    </TableCell>
                    <TableCell>{truncateText(submission.message, 50)}</TableCell>
                  </TableRow>
                  
                  {expandedRowId === submission.id && (
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="p-4">
                        <div className="bg-card p-4 rounded-md shadow-sm">
                          <h3 className="font-semibold mb-2">Full Message:</h3>
                          <p className="text-muted-foreground whitespace-pre-wrap">
                            {submission.message}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No submissions found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
