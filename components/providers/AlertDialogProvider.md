# Global Alert Dialog Usage Guide

The `AlertDialogProvider` is now set up globally in your application. You can use it from any client component!

## How to Use

### 1. Import the hook

```tsx
import { useAlertDialog } from "@/hooks/use-alert-dialog";
```

### 2. Use in your component

```tsx
"use client";

import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  const { showAlert } = useAlertDialog();

  const handleDelete = async () => {
    const confirmed = await showAlert({
      title: "Are you absolutely sure?",
      description: "This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive", // Makes the confirm button red
    });

    if (confirmed) {
      // User clicked "Delete"
      console.log("Confirmed!");
    } else {
      // User clicked "Cancel" or closed the dialog
      console.log("Cancelled!");
    }
  };

  return <Button onClick={handleDelete}>Delete Item</Button>;
}
```

## API Reference

### `showAlert(options)`

Returns a `Promise<boolean>` that resolves to:
- `true` if user clicks the confirm button
- `false` if user clicks cancel or closes the dialog

### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | Required | The title of the alert dialog |
| `description` | `string` | Required | The description/message of the alert |
| `confirmText` | `string` | `"Continue"` | Text for the confirm button |
| `cancelText` | `string` | `"Cancel"` | Text for the cancel button |
| `variant` | `"default" \| "destructive"` | `"default"` | Style variant for the confirm button |

## Examples

### Example 1: Simple Confirmation

```tsx
const confirmed = await showAlert({
  title: "Confirm Action",
  description: "Are you sure you want to proceed?",
});
```

### Example 2: Delete Confirmation (Red/Destructive)

```tsx
const confirmed = await showAlert({
  title: "Delete Item?",
  description: "This will permanently delete this item.",
  confirmText: "Delete",
  variant: "destructive",
});
```

### Example 3: Custom Text

```tsx
const confirmed = await showAlert({
  title: "Save Changes?",
  description: "Do you want to save your changes before leaving?",
  confirmText: "Save",
  cancelText: "Discard",
});
```

## Notes

- This component is already set up globally in `app/layout.tsx`
- It can be used in any client component (components with `"use client"` directive)
- Only one alert can be shown at a time
- The alert will automatically close when the user makes a choice
