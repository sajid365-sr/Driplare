
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from 'lucide-react';

interface SubmissionsActionsProps {
  onExport: () => void;
  onDelete: () => void;
  selectedCount: number;
  filteredCount: number;
  isDeleting: boolean;
}

export function SubmissionsActions({
  onExport,
  onDelete,
  selectedCount,
  filteredCount,
  isDeleting
}: SubmissionsActionsProps) {
  return (
    <div className="flex gap-2 mt-4 sm:mt-0">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onExport}
        disabled={filteredCount === 0}
      >
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
      {selectedCount > 0 && (
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Deleting...
            </>
          ) : (
            <>Delete Selected</>
          )}
        </Button>
      )}
    </div>
  );
}
