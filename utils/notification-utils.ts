// import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "chat" | "submission" | "system";
  recipient: string;
  read: boolean;
  timestamp: string;
}

// Get all notifications
export const getNotifications = async () => {
  //   try {
  //     const response = await supabase.functions.invoke('notifications', {
  //       body: { action: 'get' }
  //     });
  //     if (response.error) {
  //       console.error('Error fetching notifications:', response.error);
  //       return [];
  //     }
  //     return response.data.notifications || [];
  //   } catch (error) {
  //     console.error('Failed to fetch notifications:', error);
  //     return [];
  //   }
};

// Create a new notification
export const createNotification = async (
  title: string,
  message: string,
  type: "chat" | "submission" | "system",
  recipient: string = "all",
  userId: string = "system"
): Promise<boolean> => {
  try {
    // const response = await supabase.functions.invoke('notifications', {
    //   body: {
    //     action: 'create',
    //     title,
    //     message,
    //     type,
    //     recipient,
    //     userId
    //   }
    // });

    // if (response.error || !response.data.success) {
    //   console.error('Error creating notification:', response.error || response.data.message);
    //   return false;
    // }

    return true;
  } catch (error) {
    console.error("Failed to create notification:", error);
    return false;
  }
};

// Mark notifications as read
export const markNotificationsAsRead = async (
  notificationIds: string[],
  userId: string = "system"
): Promise<boolean> => {
  try {
    // if (!notificationIds.length) return false;

    // const response = await supabase.functions.invoke('notifications', {
    //   body: {
    //     action: 'mark_read',
    //     notificationIds,
    //     userId
    //   }
    // });

    // if (response.error || !response.data.success) {
    //   console.error('Error marking notifications as read:', response.error || response.data.message);
    //   return false;
    // }

    return true;
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
    return false;
  }
};

// Delete notifications
export const deleteNotifications = async (
  notificationIds: string[],
  userId: string = "system"
): Promise<boolean> => {
  try {
    // if (!notificationIds.length) return false;

    // const response = await supabase.functions.invoke('notifications', {
    //   body: {
    //     action: 'delete',
    //     notificationIds,
    //     userId
    //   }
    // });

    // if (response.error || !response.data.success) {
    //   console.error('Error deleting notifications:', response.error || response.data.message);
    //   toast.error('Failed to delete notifications');
    //   return false;
    // }

    toast.success("Notifications deleted successfully");
    return true;
  } catch (error) {
    console.error("Failed to delete notifications:", error);
    toast.error("Failed to delete notifications");
    return false;
  }
};

// Initialize notifications in localStorage for compatibility
export const initializeNotificationsFromSupabase = async () => {
  try {
    const notifications = await getNotifications();
    localStorage.setItem(
      "driplare_notifications",
      JSON.stringify(notifications)
    );
  } catch (error) {
    console.error("Failed to initialize notifications:", error);
  }
};
