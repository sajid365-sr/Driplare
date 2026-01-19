"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Eye, Trash2 } from "lucide-react";
import { ContactFormSubmission } from "@/types/form-types";
import { StatusSelector } from "./StatusSelector";

interface SubmissionsTableProps {
  submissions: ContactFormSubmission[];
  onStatusUpdate: (
    id: string,
    status: "pending" | "replied" | "resolved" | "archived"
  ) => void;
  onViewDetails: (submission: ContactFormSubmission) => void;
  onDelete: (id: string) => void;
}

/**
 * SubmissionsTable Component
 * Displays form submissions in a table format
 * Allows quick status updates, viewing details, and deletion
 */
export function SubmissionsTable({
  submissions,
  onStatusUpdate,
  onViewDetails,
  onDelete,
}: SubmissionsTableProps) {
  if (submissions.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact Info</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center h-24 text-muted-foreground"
            >
              No form submissions yet. Submissions will appear here when
              visitors fill out the contact form.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact Info</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{submission.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {submission.company}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {submission.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{submission.service}</Badge>
            </TableCell>
            <TableCell>
              <div className="max-w-[250px]">
                <p className="text-sm line-clamp-2 text-left">
                  {submission.details}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <StatusSelector
                value={submission.status}
                onChange={(status) => onStatusUpdate(submission.id, status)}
              />
            </TableCell>
            <TableCell className="text-sm">
              {new Date(submission.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(submission)}
                  title="View Details"
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(submission.id)}
                  className="text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
