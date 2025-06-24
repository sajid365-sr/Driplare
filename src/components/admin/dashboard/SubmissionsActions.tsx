
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface SubmissionsActionsProps {
  onExport: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  filteredCount: number;
}

export function SubmissionsActions({ 
  onExport, 
  onRefresh, 
  isRefreshing, 
  filteredCount 
}: SubmissionsActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        disabled={filteredCount === 0}
      >
        <Download className="h-4 w-4 mr-2" />
        Export ({filteredCount})
      </Button>
    </div>
  );
}
