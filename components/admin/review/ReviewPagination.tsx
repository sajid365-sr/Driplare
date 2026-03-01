"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function ReviewPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: ReviewPaginationProps) {
    if (totalPages <= 1) return null;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return (
        <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>

                <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                className="w-8 h-8 p-0"
                                onClick={() => onPageChange(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}