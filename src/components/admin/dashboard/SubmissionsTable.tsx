
import React from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { MoreHorizontal } from 'lucide-react';
import { CombinedSubmission } from "@/utils/form-utils";

interface SubmissionsTableProps {
  submissions: CombinedSubmission[];
  selectedSubmissions: string[];
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: () => void;
  onStatusChange: (id: string, status: string) => void;
}

export function SubmissionsTable({
  submissions,
  selectedSubmissions,
  onToggleSelection,
  onToggleSelectAll,
  onStatusChange
}: SubmissionsTableProps) {
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
    <div className="rounded-md border overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  selectedSubmissions.length > 0 &&
                  selectedSubmissions.length === submissions.length
                }
                onCheckedChange={onToggleSelectAll}
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
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <Checkbox
                  checked={selectedSubmissions.includes(submission.id)}
                  onCheckedChange={() => onToggleSelection(submission.id)}
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
                    onValueChange={(value) => onStatusChange(submission.id, value)}
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
  );
}
