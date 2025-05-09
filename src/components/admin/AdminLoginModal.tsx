import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAdminCredentials } from "@/utils/admin-utils";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { Cross } from "lucide-react";

interface AdminLoginModalProps {
  onSuccess: () => void;
  open: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminLoginModal({
  onSuccess,
  open,
  setClose,
}: AdminLoginModalProps) {
  const [userId, setUserId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would validate these credentials against a backend
    // For this example, we'll just store them and accept any non-empty values
    if (userId.trim() && apiKey.trim()) {
      setAdminCredentials(userId, apiKey);
      toast.success("Login successful");
      onSuccess();
    } else {
      toast.error("Please enter valid credentials");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            Please enter your Admin User ID and API Key to access the admin
            panel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              placeholder="Enter your admin user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
