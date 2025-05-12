
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  getNotifications,
  markNotificationsAsRead,
  deleteNotifications,
  Notification,
} from "@/utils/notification-utils";
import { NotificationHeader } from "@/components/admin/notifications/NotificationHeader";
import { NotificationTabs } from "@/components/admin/notifications/NotificationTabs";
import CreateNotification from "@/components/admin/notifications/CreateNotification";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Load notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications from Supabase
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);

      // Also update localStorage for compatibility with existing code
      localStorage.setItem(
        "driplare_notifications",
        JSON.stringify(fetchedNotifications)
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter notifications based on search and filter criteria
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      searchTerm === "" ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      filter === notification.type;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "leads" && notification.type === "chat") ||
      (activeTab === "submissions" && notification.type === "submission") ||
      (activeTab === "system" && notification.type === "system");

    return matchesSearch && matchesFilter && matchesTab;
  });

  // Handle notification selection
  const toggleSelect = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all visible notifications
  const selectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  // Mark notifications as read
  const handleMarkAsRead = async () => {
    if (!selectedNotifications.length) return;

    try {
      const success = await markNotificationsAsRead(selectedNotifications);

      if (success) {
        // Update local state
        const updatedNotifications = notifications.map((notification) =>
          selectedNotifications.includes(notification.id)
            ? { ...notification, read: true }
            : notification
        );

        setNotifications(updatedNotifications);
        localStorage.setItem(
          "driplare_notifications",
          JSON.stringify(updatedNotifications)
        );
        setSelectedNotifications([]);
        toast.success("Notifications marked as read");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      toast.error("Failed to update notifications");
    }
  };

  // Delete selected notifications
  const handleDeleteSelected = async () => {
    if (!selectedNotifications.length) return;

    try {
      const success = await deleteNotifications(selectedNotifications);

      if (success) {
        // Update local state
        const updatedNotifications = notifications.filter(
          (notification) => !selectedNotifications.includes(notification.id)
        );

        setNotifications(updatedNotifications);
        localStorage.setItem(
          "driplare_notifications",
          JSON.stringify(updatedNotifications)
        );
        setSelectedNotifications([]);
      }
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const handleNotificationCreated = () => {
    fetchNotifications();
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <NotificationHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchNotifications={fetchNotifications}
        isLoading={isLoading}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />

      {isCreating ? (
        <CreateNotification onSuccess={handleNotificationCreated} />
      ) : (
        <NotificationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoading={isLoading}
          filteredNotifications={filteredNotifications}
          selectedNotifications={selectedNotifications}
          toggleSelect={toggleSelect}
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectAll={selectAll}
          handleMarkAsRead={handleMarkAsRead}
          handleDeleteSelected={handleDeleteSelected}
        />
      )}
    </div>
  );
}
