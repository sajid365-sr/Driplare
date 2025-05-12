
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationsTable } from "./NotificationsTable";
import { NotificationFilters } from "./NotificationFilters";
import { Notification } from "@/utils/notification-utils";

interface NotificationTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  isLoading: boolean;
  filteredNotifications: Notification[];
  selectedNotifications: string[];
  toggleSelect: (id: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectAll: () => void;
  handleMarkAsRead: () => void;
  handleDeleteSelected: () => void;
}

export function NotificationTabs({
  activeTab,
  setActiveTab,
  isLoading,
  filteredNotifications,
  selectedNotifications,
  toggleSelect,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  selectAll,
  handleMarkAsRead,
  handleDeleteSelected,
}: NotificationTabsProps) {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <NotificationFilters
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedNotifications={selectedNotifications}
        filteredNotifications={filteredNotifications}
        selectAll={selectAll}
        handleMarkAsRead={handleMarkAsRead}
        handleDeleteSelected={handleDeleteSelected}
      />

      <TabsContent value="all" className="space-y-6">
        <NotificationsTable
          isLoading={isLoading}
          filteredNotifications={filteredNotifications}
          selectedNotifications={selectedNotifications}
          toggleSelect={toggleSelect}
        />
      </TabsContent>

      <TabsContent value="leads" className="space-y-6">
        <NotificationsTable
          isLoading={isLoading}
          filteredNotifications={filteredNotifications}
          selectedNotifications={selectedNotifications}
          toggleSelect={toggleSelect}
        />
      </TabsContent>

      <TabsContent value="submissions" className="space-y-6">
        <NotificationsTable
          isLoading={isLoading}
          filteredNotifications={filteredNotifications}
          selectedNotifications={selectedNotifications}
          toggleSelect={toggleSelect}
        />
      </TabsContent>

      <TabsContent value="system" className="space-y-6">
        <NotificationsTable
          isLoading={isLoading}
          filteredNotifications={filteredNotifications}
          selectedNotifications={selectedNotifications}
          toggleSelect={toggleSelect}
        />
      </TabsContent>
    </Tabs>
  );
}
