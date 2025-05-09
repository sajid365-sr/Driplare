
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@/hooks/use-click-outside";
import { formatDistanceToNow } from "date-fns";
import { getNotifications, markNotificationsAsRead } from "@/utils/notification-utils";
import { Notification } from "@/utils/notification-utils";

export const NotificationsDropdown = ({ onClose }: { onClose: () => void }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ref = useClickOutside<HTMLDivElement>(onClose);

  const handleMarkAsRead = async (id: string) => {
    try {
      const success = await markNotificationsAsRead([id]);
      
      if (success) {
        // Update local state
        const updatedNotifications = notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        );
        
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications
      .filter(n => !n.read)
      .map(n => n.id);
    
    if (!unreadIds.length) return;
    
    try {
      const success = await markNotificationsAsRead(unreadIds);
      
      if (success) {
        // Update local state
        const updatedNotifications = notifications.map(notification => ({
          ...notification,
          read: true
        }));
        
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const unreadCount = notifications?.filter((n) => !n.read).length;

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
          {isLoading ? (
            <div className="py-6 text-center text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications?.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications?.map((notification) => (
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
                    {formatDistanceToNow(new Date(notification.timestamp), {
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
