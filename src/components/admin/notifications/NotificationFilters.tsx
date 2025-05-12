
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NotificationFiltersProps {
  filter: string;
  setFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedNotifications: string[];
  filteredNotifications: any[];
  selectAll: () => void;
  handleMarkAsRead: () => void;
  handleDeleteSelected: () => void;
}

export function NotificationFilters({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  selectedNotifications,
  filteredNotifications,
  selectAll,
  handleMarkAsRead,
  handleDeleteSelected,
}: NotificationFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center my-5 space-x-2">
        <Button variant="outline" size="sm" onClick={selectAll}>
          {selectedNotifications.length === filteredNotifications.length
            ? "Deselect All"
            : "Select All"}
        </Button>
        <div className="flex-1">
          <Select onValueChange={setFilter} value={filter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
              <SelectItem value="submission">Submission</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAsRead}
          disabled={selectedNotifications.length === 0}
        >
          Mark Read
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeleteSelected}
          disabled={selectedNotifications.length === 0}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
