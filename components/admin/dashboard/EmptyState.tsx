import React from 'react';
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  totalSubmissions: number;
  searchTerm: string;
  filter: string;
  onClearFilters: () => void;
  onRefresh: () => void;
}

export function EmptyState({
  totalSubmissions,
  searchTerm,
  filter,
  onClearFilters,
  onRefresh
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">
        {totalSubmissions === 0
          ? "No submissions found in database."
          : "No submissions match your current filters"
        }
      </p>

      {totalSubmissions === 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 text-left max-w-md mx-auto">
          <h4 className="font-semibold text-orange-800 mb-2">Debug Information:</h4>
          <div className="text-sm text-orange-700 space-y-1">
            <p>• Check browser console (F12) for detailed logs</p>
            <p>• Verify data exists in form_submissions table</p>
            <p>• Check RLS policies allow table access</p>
            <p>• Ensure proper authentication if required</p>
          </div>
        </div>
      )}

      {searchTerm || filter !== "all" ? (
        <Button
          variant="link"
          onClick={onClearFilters}
        >
          Clear filters
        </Button>
      ) : (
        <Button
          variant="link"
          onClick={onRefresh}
        >
          Refresh data
        </Button>
      )}
    </div>
  );
}
