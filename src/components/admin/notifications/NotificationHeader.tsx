import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface NotificationHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchNotifications: () => Promise<void>;
  isLoading: boolean;
  isCreating: boolean;
  setIsCreating: (creating: boolean) => void;
}

export function NotificationHeader({
  searchTerm,
  setSearchTerm,
  fetchNotifications,
  isLoading,
  isCreating,
  setIsCreating,
}: NotificationHeaderProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchNotifications();
      toast.success("Notifications refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh notifications");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Manage system notifications and alerts
        </p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-fore-ground" />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing || isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>

        <Button
          onClick={() => setIsCreating(true)}
          disabled={isCreating}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>
    </div>
  );
}
