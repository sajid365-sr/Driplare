'use client'

export function NotificationsDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 top-10 w-80 bg-card z-50 border border-border shadow-lg rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border flex justify-between items-center">
        <h3 className="font-medium">Notifications</h3>
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        <div className="py-6 text-center text-muted-foreground">
          No notifications
        </div>
      </div>
    </div>
  );
}
