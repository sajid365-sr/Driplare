
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Trash, Bell, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "chat_lead" | "form_submission" | "system";
  recipient: "all" | string;
  timestamp: Date;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Contact Form Submission",
      message: "Sarah Johnson has submitted a contact form",
      type: "form_submission",
      recipient: "all",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: "2",
      title: "New Chat Lead",
      message: "Michael Brown requested information about AI Services",
      type: "chat_lead",
      recipient: "all",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: "3",
      title: "System Update",
      message: "The website has been successfully updated to version 2.1",
      type: "system",
      recipient: "admin@driplare.com",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "system" as const,
    recipient: "all",
  });

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by search term
    if (
      searchTerm &&
      !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by type
    if (typeFilter !== "all" && notification.type !== typeFilter) {
      return false;
    }

    return true;
  });

  // Handle bulk selection
  const toggleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Handle bulk actions
  const markAsRead = () => {
    if (selectedNotifications.length === 0) return;

    setNotifications((prev) =>
      prev.map((n) =>
        selectedNotifications.includes(n.id) ? { ...n, read: true } : n
      )
    );

    toast.success(`${selectedNotifications.length} notifications marked as read`);
    setSelectedNotifications([]);
  };

  const deleteSelected = () => {
    if (selectedNotifications.length === 0) return;

    setNotifications((prev) =>
      prev.filter((n) => !selectedNotifications.includes(n.id))
    );

    toast.success(`${selectedNotifications.length} notifications deleted`);
    setSelectedNotifications([]);
  };

  // Create new notification
  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast.error("Please fill in all fields");
      return;
    }

    const newItem: Notification = {
      id: Date.now().toString(),
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      recipient: newNotification.recipient,
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [newItem, ...prev]);
    setCreateDialogOpen(false);
    setNewNotification({
      title: "",
      message: "",
      type: "system",
      recipient: "all",
    });

    toast.success("Notification created and sent");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications Management</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="chat_lead">Chat Lead</SelectItem>
              <SelectItem value="form_submission">Form Submission</SelectItem>
              <SelectItem value="system">System Alert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={markAsRead}
            disabled={selectedNotifications.length === 0}
          >
            Mark as Read
          </Button>
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive"
            onClick={deleteSelected}
            disabled={selectedNotifications.length === 0}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={
                    selectedNotifications.length === filteredNotifications.length &&
                    filteredNotifications.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <TableRow
                  key={notification.id}
                  className={!notification.read ? "bg-muted/10" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() => toggleSelect(notification.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          notification.type === "chat_lead"
                            ? "bg-blue-500"
                            : notification.type === "form_submission"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      ></span>
                      <span className="capitalize">
                        {notification.type === "chat_lead"
                          ? "Chat Lead"
                          : notification.type === "form_submission"
                          ? "Form Submission"
                          : "System Alert"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{notification.title}</TableCell>
                  <TableCell>{notification.recipient}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(notification.timestamp, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        notification.read
                          ? "bg-muted/30 text-muted-foreground"
                          : "bg-[#F88220]/10 text-[#F88220]"
                      }`}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {notification.message}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No notifications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Notification Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
            <DialogDescription>
              Create a notification that will be sent to users in real-time
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, title: e.target.value })
                }
                placeholder="Notification title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, message: e.target.value })
                }
                placeholder="Notification message"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value: any) =>
                    setNewNotification({ ...newNotification, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System Alert</SelectItem>
                    <SelectItem value="chat_lead">Chat Lead</SelectItem>
                    <SelectItem value="form_submission">Form Submission</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select
                  value={newNotification.recipient}
                  onValueChange={(value) =>
                    setNewNotification({ ...newNotification, recipient: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="admin@driplare.com">Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNotification}>Create & Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
