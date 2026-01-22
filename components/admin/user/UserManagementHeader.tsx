import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

interface UserManagementHeaderProps {
  onAddUser: () => void;
  onExportUsers: () => void;
}

export function UserManagementHeader({ onAddUser, onExportUsers }: UserManagementHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onExportUsers}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
        <Button onClick={onAddUser}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
    </div>
  );
}