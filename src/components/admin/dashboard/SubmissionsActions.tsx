import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmissionsActionsProps {
  onRefresh: () => void;
  onExport: () => void;
  isRefreshing: boolean;
  filteredCount: number;
}

export function SubmissionsActions({
  onRefresh,
  onExport,
  isRefreshing,
  filteredCount,
}: SubmissionsActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
        Refresh
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        disabled={filteredCount === 0}
      >
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
    </div>
  );
}
