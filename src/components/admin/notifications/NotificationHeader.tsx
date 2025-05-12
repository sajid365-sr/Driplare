
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NotificationHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  fetchNotifications: () => void;
  isLoading: boolean;
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
}

export function NotificationHeader({
  searchTerm,
  setSearchTerm,
  fetchNotifications,
  isLoading,
  isCreating,
  setIsCreating,
}: NotificationHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Manage chat leads, form submissions, and system notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            className="max-w-xs"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={fetchNotifications}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Refresh
          </Button>
        </div>
      </div>

      {!isCreating ? (
        <div className="flex justify-end">
          <Button onClick={() => setIsCreating(true)}>Create Notification</Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsCreating(false)}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}
