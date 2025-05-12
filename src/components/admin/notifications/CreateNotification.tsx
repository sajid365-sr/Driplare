
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createNotification } from "@/utils/notification-utils";

interface CreateNotificationProps {
  onSuccess: () => void;
}

const CreateNotification: React.FC<CreateNotificationProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "system" as "chat" | "submission" | "system",
    recipient: "all",
  });

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newNotification.title || !newNotification.message) {
      toast.error("Please fill out all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await createNotification(
        newNotification.title,
        newNotification.message,
        newNotification.type,
        newNotification.recipient
      );

      if (success) {
        // Reset form
        setNewNotification({
          title: "",
          message: "",
          type: "system",
          recipient: "all",
        });

        toast.success("Notification created");
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Create New Notification</CardTitle>
        <CardDescription>
          Create a notification to be sent to users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateNotification} className="space-y-4">
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
                    type: e.target.value as "chat" | "submission" | "system",
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Creating...
                </>
              ) : (
                "Create Notification"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateNotification;
