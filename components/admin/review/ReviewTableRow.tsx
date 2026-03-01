"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    Star,
    Edit,
    Trash2,
    User,
    Check,
    X,
    StarIcon,
} from "lucide-react";
import Link from "next/link";
import { Review } from "@/types/review-types";

interface ReviewTableRowProps {
    review: Review;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onToggleFeatured: (id: string, currentStatus: boolean) => void;
    onDelete: (id: string) => void;
}

export function ReviewTableRow({
    review,
    onApprove,
    onReject,
    onToggleFeatured,
    onDelete,
}: ReviewTableRowProps) {
    const renderStars = (rating: number) => {

        console.log(review)
        return (
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        className={`h-3 w-3 ${i < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 fill-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
            case "pending":
                return <Badge variant="secondary">Pending</Badge>;
            case "rejected":
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getSourceBadge = (source: string) => {
        return source === "client_form" ? (
            <Badge variant="outline" className="text-xs">
                Client
            </Badge>
        ) : (
            <Badge variant="outline" className="text-xs">
                Manual
            </Badge>
        );
    };

    return (
        <TableRow>
            {/* Client Info */}
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <div className="font-medium flex items-center gap-2">
                            {review.clientName}
                            {review.featured && (
                                <StarIcon className="w-3 h-3 fill-amber-500 text-amber-500" />
                            )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {review.clientRole}
                        </div>
                    </div>
                </div>
            </TableCell>

            {/* Review Content */}
            <TableCell>
                <div className="max-w-[250px]">
                    <div className="font-medium text-sm mb-1 truncate">
                        {review.reviewText || "No title"}
                    </div>
                    {/* <div className="text-xs text-muted-foreground truncate">
                        {review.complement}
                    </div> */}
                </div>
            </TableCell>

            {/* Rating */}
            <TableCell>
                <div className="flex flex-col gap-1">
                    {renderStars(review.rating)}
                    <span className="text-xs text-muted-foreground">
                        {review.rating}/5
                    </span>
                </div>
            </TableCell>

            {/* Status */}
            <TableCell>{getStatusBadge(review.status)}</TableCell>

            {/* Source */}
            <TableCell>{getSourceBadge(review.submissionSource)}</TableCell>

            {/* Date */}
            <TableCell className="text-sm">
                {new Date(review.createdAt).toLocaleDateString()}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex items-center gap-2 justify-end">
                    {/* Approve/Reject for pending */}
                    {review.status === "pending" && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onApprove(review.id)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                title="Approve"
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onReject(review.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Reject"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                    {/* Featured toggle (approved only) */}
                    {review.status === "approved" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleFeatured(review.id, review.featured)}
                            title={
                                review.featured ? "Remove from featured" : "Mark as featured"
                            }
                        >
                            <StarIcon
                                className={`h-4 w-4 ${review.featured
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-muted-foreground"
                                    }`}
                            />
                        </Button>
                    )}

                    {/* Edit */}
                    <Button variant="ghost" size="sm" asChild title="Edit">
                        <Link href={`/admin/reviews/edit/${review.id}`}>
                            <Edit className="h-4 w-4 text-blue-600" />
                        </Link>
                    </Button>

                    {/* Delete */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(review.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}