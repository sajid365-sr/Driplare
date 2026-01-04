"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";
// import { verifyAdminCredentials } from "@/utils/admin-auth";

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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setIsSubmitting(true);
    // try {
    //   // Validate non-empty credentials
    //   if (!userId.trim() || !apiKey.trim()) {
    //     toast.error("Please enter valid credentials");
    //     setIsSubmitting(false);
    //     return;
    //   }
    //   // Verify admin credentials against Supabase
    //   const session = await verifyAdminCredentials(userId, apiKey);
    //   if (session) {
    //     toast.success("Login successful");
    //     onSuccess();
    //     // Add navigation to admin page after successful login
    //     setTimeout(() => {
    //       router.push('/admin');
    //       setClose(false);
    //     }, 500);
    //   } else {
    //     setIsSubmitting(false);
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    //   toast.error("Login failed. Please try again.");
    //   setIsSubmitting(false);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={() => setClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            Please enter your Admin User ID and API Key to access the admin
            panel. Default login is user ID: "owner" and API Key:
            "encrypted-secret-key-1"
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
