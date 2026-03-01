"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReviewTableRow } from "./ReviewTableRow";
import { Review } from "@/types/review-types";

interface ReviewsTableProps {
  reviews: Review[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onToggleFeatured: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

export function ReviewsTable({
  reviews,
  onApprove,
  onReject,
  onToggleFeatured,
  onDelete,
}: ReviewsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client Info</TableHead>
          <TableHead>Review</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewTableRow
              key={review.id}
              review={review}
              onApprove={onApprove}
              onReject={onReject}
              onToggleFeatured={onToggleFeatured}
              onDelete={onDelete}
            />
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center h-24 text-muted-foreground"
            >
              No reviews found. Start by adding one!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}