import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
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
  onStatusChange,
}: SubmissionsTableProps) {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatFormType = (formType: string) => {
    if (!formType) return "Unknown";

    return formType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getFormTypeColor = (formType: string) => {
    switch (formType) {
      case "newsletter":
        return "bg-blue-100 text-blue-800";
      case "contact":
        return "bg-green-100 text-green-800";
      case "service_request":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            <TableHead className="hidden md:table-cell">
              Message/Subject
            </TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="hidden lg:table-cell w-[120px]">
              Date
            </TableHead>
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
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getFormTypeColor(submission.form_type || "unknown")}`}
                >
                  {formatFormType(submission.form_type || "unknown")}
                </span>
              </TableCell>
              <TableCell>{submission.name || "N/A"}</TableCell>
              <TableCell className="hidden md:table-cell">
                <a
                  href={`mailto:${submission.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {submission.email}
                </a>
              </TableCell>
              <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                {submission.subject || submission.message || "N/A"}
              </TableCell>
              <TableCell>
                <Select
                  value={submission.status || "pending"}
                  onValueChange={(value) => onStatusChange(submission.id, value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <Badge variant={getBadgeVariant(submission.status || "pending")}>
                      {submission.status || "pending"}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {format(new Date(submission.created_at), "d/MM/yy h:mm a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
