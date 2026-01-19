"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ContactFormSubmission } from "@/types/form-types";
import { StatusSelector } from "./StatusSelector";
import { toast } from "sonner";
import { updateSubmissionStatus } from "@/lib/form-action";

interface SubmissionDetailsDialogProps {
  submission: ContactFormSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

/**
 * SubmissionDetailsDialog Component
 * Shows detailed view of a form submission
 * Allows admin to update status and add response/notes
 */
export function SubmissionDetailsDialog({
  submission,
  isOpen,
  onClose,
  onRefresh,
}: SubmissionDetailsDialogProps) {
  const [response, setResponse] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Update response when submission changes
  useEffect(() => {
    if (submission) {
      setResponse(submission.response || "");
    } else {
      setResponse("");
    }
  }, [submission]); // Re-run when submission changes

  /**
   * Handle status update
   */
  const handleStatusUpdate = async (
    status: "pending" | "replied" | "resolved" | "archived"
  ) => {
    if (!submission) return;

    try {
      const res = await updateSubmissionStatus(submission.id, { status });
      if (res.success) {
        toast.success("Status updated successfully");
        onRefresh();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  /**
   * Handle status update with response
   */
  const handleSaveResponse = async () => {
    if (!submission) return;

    setIsUpdating(true);
    try {
      const res = await updateSubmissionStatus(submission.id, {
        status: submission.status,
        response: response,
      });
      if (res.success) {
        toast.success("Response saved successfully");
        onClose();
        onRefresh();
      } else {
        toast.error("Failed to save response");
      }
    } catch (error) {
      toast.error("Error saving response");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    setResponse("");
    onClose();
  };

  if (!submission) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>
            View and manage this form submission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-2">
          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-base">{submission.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Company
              </p>
              <p className="text-base">{submission.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base">{submission.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Service
              </p>
              <Badge variant="secondary">{submission.service}</Badge>
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Details
            </p>
            <p className="text-sm bg-muted p-3 rounded-md">
              {submission.details}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Status
            </p>
            <StatusSelector
              value={submission.status}
              onChange={handleStatusUpdate}
              className="w-[200px]"
              showIndicators={false}
            />
          </div>

          {/* Response/Notes */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Response / Notes
            </p>
            <Textarea
              placeholder="Add your response or notes about this submission..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleSaveResponse}
              disabled={isUpdating}
              className="mt-2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save Response"
              )}
            </Button>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Submitted
              </p>
              <p className="text-sm">
                {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm">
                {new Date(submission.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
