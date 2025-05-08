
import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

// Mock data for audit logs
const mockLogs = [
  { id: "1", user: "admin1", action: "login", timestamp: "2023-11-01T08:23:11", details: "Successful login" },
  { id: "2", user: "admin2", action: "export", timestamp: "2023-11-01T10:45:32", details: "Exported submissions to CSV" },
  { id: "3", user: "admin1", action: "update", timestamp: "2023-11-02T14:12:05", details: "Changed submission status to 'Reviewed'" },
  { id: "4", user: "admin3", action: "login", timestamp: "2023-11-03T09:05:18", details: "Successful login" },
  { id: "5", user: "admin2", action: "update", timestamp: "2023-11-03T16:34:27", details: "Added new admin user" },
  { id: "6", user: "admin1", action: "update", timestamp: "2023-11-04T11:19:45", details: "Changed submission status to 'Archived'" },
  { id: "7", user: "admin3", action: "export", timestamp: "2023-11-05T13:56:02", details: "Exported submissions to Excel" },
  { id: "8", user: "admin2", action: "update", timestamp: "2023-11-06T15:23:41", details: "Updated webhook settings" }
];

// Action types with corresponding badge colors
const actionColors = {
  login: "secondary",
  export: "default",
  update: "primary"
};

export default function AuditLogs() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Format date for better display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  // Filter logs based on selected filters and search term
  const filteredLogs = mockLogs.filter(log => {
    // Filter by action type
    if (filter !== "all" && log.action !== filter) return false;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        log.user.toLowerCase().includes(term) ||
        log.details.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="export">Export</SelectItem>
              <SelectItem value="update">Update</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Logs Table */}
      <div className="border rounded-md">
        <Table>
          <TableCaption>A record of all admin actions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={actionColors[log.action] as "default" | "secondary" | "destructive" | "outline"}
                      className="capitalize"
                    >
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(log.timestamp)}</TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No audit logs found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
