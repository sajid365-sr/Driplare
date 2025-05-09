import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, FileText, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "chat" | "submission" | "system";
  timestamp: string;
  read: boolean;
  recipient: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "system",
    recipient: "all",
  });
  const [activeTab, setActiveTab] = useState("all");

  // Load notifications on component mount
  useEffect(() => {
    loadNotifications();

    // Load and process chat logs
    loadChatLogs();
  }, []);

  // Load notifications from localStorage
  const loadNotifications = () => {
    const storedNotifications = localStorage.getItem("driplare_notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  };

  // Process chat logs and convert them to notifications
  const loadChatLogs = () => {
    const chatLogs = JSON.parse(localStorage.getItem("chat_logs") || "[]");

    // Process only lead captures
    const leadNotifications = chatLogs
      .filter((log: any) => log.type === "lead")
      .map((log: any) => ({
        id: `chat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: `New Chat Lead: ${log.data.name}`,
        message: `Email: ${log.data.email}`,
        type: "chat" as const,
        timestamp: log.timestamp,
        read: false,
        recipient: "all",
      }));

    if (leadNotifications.length > 0) {
      // Add to existing notifications
      const updatedNotifications = [...notifications, ...leadNotifications];
      setNotifications(updatedNotifications);

      // Save to localStorage
      localStorage.setItem(
        "driplare_notifications",
        JSON.stringify(updatedNotifications)
      );
    }
  };

  // Save notifications to localStorage
  const saveNotifications = (updatedNotifications: Notification[]) => {
    localStorage.setItem(
      "driplare_notifications",
      JSON.stringify(updatedNotifications)
    );
    setNotifications(updatedNotifications);
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
  const markAsRead = () => {
    const updated = notifications.map((notification) =>
      selectedNotifications.includes(notification.id)
        ? { ...notification, read: true }
        : notification
    );

    saveNotifications(updated);
    setSelectedNotifications([]);
    toast.success("Notifications marked as read");
  };

  // Delete selected notifications
  const deleteSelected = () => {
    const updated = notifications.filter(
      (notification) => !selectedNotifications.includes(notification.id)
    );

    saveNotifications(updated);
    setSelectedNotifications([]);
    toast.success("Notifications deleted");
  };

  // Create a new notification
  const createNotification = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(newNotification);

    if (!newNotification.title || !newNotification.message) {
      toast.error("Please fill out all required fields");
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotification,
      timestamp: new Date().toISOString(),
      read: false,
      type: newNotification.type as "chat" | "submission" | "system",
    };

    const updated = [notification, ...notifications];
    saveNotifications(updated);

    // Reset form
    setNewNotification({
      title: "",
      message: "",
      type: "system",
      recipient: "all",
    });

    toast.success("Notification created");
  };

  return (
    <div className="space-y-6">
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
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center my-5 space-x-2">
            <Button variant="outline" size="sm" onClick={selectAll}>
              {selectedNotifications.length === filteredNotifications.length
                ? "Deselect All"
                : "Select All"}
            </Button>

            <select
              title="options"
              className="px-2 py-1 rounded border border-border bg-background"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="chat">Chat</option>
              <option value="submission">Submission</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAsRead}
              disabled={selectedNotifications.length === 0}
            >
              Mark Read
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteSelected}
              disabled={selectedNotifications.length === 0}
            >
              Delete
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          <NotificationsTable />
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <NotificationsTable />
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <NotificationsTable />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <NotificationsTable />
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Create New Notification</CardTitle>
          <CardDescription>
            Create a notification to be sent to users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createNotification} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Type
                </label>
                <select
                  id="type"
                  className="w-full p-2 rounded-md border border-border bg-background"
                  value={newNotification.type}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      type: e.target.value as any,
                    })
                  }
                >
                  <option value="system">System</option>
                  <option value="submission">Submission</option>
                  <option value="chat">Chat</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-2 rounded-md border border-border bg-background min-h-[100px]"
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      message: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm font-medium">
                  Recipient
                </label>
                <select
                  id="recipient"
                  className="w-full p-2 rounded-md border border-border bg-background"
                  value={newNotification.recipient}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      recipient: e.target.value,
                    })
                  }
                >
                  <option value="all">All Users</option>
                  <option value="admin">Admins Only</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Create Notification</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  // Notifications table component
  function NotificationsTable() {
    if (filteredNotifications.length === 0) {
      return (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-medium">
                No notifications found
              </h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm
                  ? "Try different search terms"
                  : "Notifications will appear here"}
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Notification</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow
                  key={notification.id}
                  className={notification.read ? "" : "bg-secondary/20"}
                >
                  <TableCell className="w-[50px]">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelect(notification.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {notification.type === "chat" && (
                        <MessageSquare className="inline-block mr-2 h-4 w-4 text-blue-500" />
                      )}
                      {notification.type === "submission" && (
                        <FileText className="inline-block mr-2 h-4 w-4 text-green-500" />
                      )}
                      {notification.type === "system" && (
                        <Bell className="inline-block mr-2 h-4 w-4 text-orange-500" />
                      )}
                      {notification.title}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-xs ${
                        notification.type === "chat"
                          ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                          : notification.type === "submission"
                            ? "bg-green-500/20 text-green-700 dark:text-green-300"
                            : "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                      }`}
                    >
                      {notification.type === "chat"
                        ? "Chat Lead"
                        : notification.type === "submission"
                          ? "Form Submission"
                          : "System"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(
                      new Date(notification.timestamp),
                      "MMM d, yyyy h:mm a"
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-xs ${
                        notification.read
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {notification.read ? "Read" : "New"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
}
