'use client'

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, Trash, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface ClientReview {
  id: string;
  clientName: string;
  company: string;
  rating: number;
  review: string;
  project: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

interface ReviewTableProps {
  reviews: ClientReview[];
  onRefresh: () => void;
}

export function ReviewTable({ reviews, onRefresh }: ReviewTableProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusUpdate = async (reviewId: string, status: "approved" | "rejected") => {
    // Mock status update - replace with real API call
    console.log(`Updating review ${reviewId} to ${status}`);
    onRefresh();
  };

  const handleDelete = async (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      // Mock delete - replace with real API call
      console.log(`Deleting review ${reviewId}`);
      onRefresh();
    }
  };

  return (
    <div className="rounded-md border overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{review.clientName}</div>
                  <div className="text-sm text-muted-foreground">
                    {review.company}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm font-medium">
                    {review.rating}/5
                  </span>
                </div>
              </TableCell>
              <TableCell className="max-w-[300px]">
                <p className="text-sm line-clamp-2">{review.review}</p>
              </TableCell>
              <TableCell>{review.project}</TableCell>
              <TableCell>{getStatusBadge(review.status)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(review.createdAt, "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  {review.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusUpdate(review.id, "approved")}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusUpdate(review.id, "rejected")}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
