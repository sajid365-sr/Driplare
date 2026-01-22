import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/user-types";

interface SystemAdminTransferDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  users: User[];
  userToDeleteId: string | null;
  newSuperAdminId: string | null;
  onNewSuperAdminChange: (userId: string) => void;
  onConfirmTransfer: () => void;
}

export function SystemAdminTransferDialog({
  isOpen,
  onOpenChange,
  users,
  userToDeleteId,
  newSuperAdminId,
  onNewSuperAdminChange,
  onConfirmTransfer,
}: SystemAdminTransferDialogProps) {
  const availableUsers = users.filter(u => u.role !== "system_admin" && u.id !== userToDeleteId);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Super Admin Role</DialogTitle>
          <DialogDescription>
            You are the last system admin. Before deleting your account, you must transfer the super admin role to another user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Select New System Admin:</Label>
            <Select value={newSuperAdminId || ""} onValueChange={onNewSuperAdminChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Choose a user to promote" />
              </SelectTrigger>
              <SelectContent>
                {availableUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name || user.email} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirmTransfer}
            disabled={!newSuperAdminId}
          >
            Transfer & Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}