"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusSelectorProps {
  value: string;
  onChange: (value: "pending" | "replied" | "resolved" | "archived") => void;
  className?: string;
  showIndicators?: boolean;
}

/**
 * StatusSelector Component
 * Reusable status dropdown for form submissions
 * Shows color indicators for each status
 */
export function StatusSelector({
  value,
  onChange,
  className = "w-[130px]",
  showIndicators = true,
}: StatusSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) =>
        onChange(val as "pending" | "replied" | "resolved" | "archived")
      }
    >
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">
          {showIndicators ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              Pending
            </div>
          ) : (
            "Pending"
          )}
        </SelectItem>
        <SelectItem value="replied">
          {showIndicators ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Replied
            </div>
          ) : (
            "Replied"
          )}
        </SelectItem>
        <SelectItem value="resolved">
          {showIndicators ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Resolved
            </div>
          ) : (
            "Resolved"
          )}
        </SelectItem>
        <SelectItem value="archived">
          {showIndicators ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              Archived
            </div>
          ) : (
            "Archived"
          )}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
