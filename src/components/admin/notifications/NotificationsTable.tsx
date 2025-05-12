
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, MessageSquare, FileText, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Notification } from "@/utils/notification-utils";

interface NotificationsTableProps {
  isLoading: boolean;
  filteredNotifications: Notification[];
  selectedNotifications: string[];
  toggleSelect: (id: string) => void;
}

export function NotificationsTable({
  isLoading,
  filteredNotifications,
  selectedNotifications,
  toggleSelect,
}: NotificationsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">Loading notifications...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              Notifications will appear here
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
