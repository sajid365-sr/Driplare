
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@/hooks/use-click-outside";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "chat_lead" | "form_submission" | "system";
}

export const NotificationsDropdown = ({ onClose }: { onClose: () => void }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Contact Form Submission",
      message: "Sarah Johnson has submitted a contact form",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      type: "form_submission",
    },
    {
      id: "2",
      title: "New Chat Lead",
      message: "Michael Brown requested information about AI Services",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      type: "chat_lead",
    },
    {
      id: "3",
      title: "System Update",
      message: "The website has been successfully updated to version 2.1",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      type: "system",
    },
  ]);

  const ref = useClickOutside<HTMLDivElement>(onClose);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className="absolute right-0 top-10 w-80 bg-card z-50 border border-border shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-3 border-b border-border flex justify-between items-center">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs text-primary hover:text-primary/80"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-border hover:bg-muted/20 cursor-pointer transition-colors ${
                  !notification.read ? "bg-muted/10" : ""
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    {notification.title}
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-[#F88220]"></span>
                    )}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(notification.timestamp, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
