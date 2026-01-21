# Form Submissions Admin Page

This page displays all contact form submissions from the website and allows admins to manage them.

## Features

### 📋 Table View
- **All Submissions**: Displays all contact form submissions in a clean table
- **Pagination**: Shows 5 submissions per page with navigation controls
- **Contact Information**: Name, company, email displayed prominently
- **Service Type**: Shows what service the customer is interested in
- **Details Preview**: Shows first 2 lines of submission details
- **Status Management**: Quick status update dropdown in each row
- **Date Tracking**: Shows submission and last update dates

### 🔄 Status Management
Four status options:
- **Pending** (default) - New submission, not yet reviewed
- **Replied** - Admin has replied to the customer
- **Resolved** - Issue/inquiry has been resolved
- **Archived** - Old submission moved to archive

### 👁️ View Details Dialog
Click the eye icon to open a detailed view with:
- Complete contact information
- Full message details
- Status selector
- Response/notes textarea
- Save response functionality
- Submission and update timestamps

### 🗑️ Delete Functionality
- Delete button with confirmation dialog
- Uses global AlertDialog component
- Permanent deletion with confirmation

## File Structure

```
app/(admin)/admin/form-submission/
├── page.tsx                    # Main admin page (table view)
└── README.md                  # This file

types/
└── form-types.ts              # Global type definitions

lib/
└── form-action.ts             # Server actions (CRUD operations)

components/contact/
└── StepByStepForm.tsx         # Frontend form (customer-facing)

prisma/
└── schema.prisma              # Database schema
```

## Database Schema

```prisma
model ContactSubmission {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  company   String
  email     String
  service   String
  details   String
  status    String   @default("pending") // pending, replied, resolved, archived
  response  String?  // Admin's response/notes
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Type Definitions

### ContactFormSubmission
```typescript
export interface ContactFormSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  details: string;
  status: "pending" | "replied" | "resolved" | "archived";
  response?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### ContactFormData (for frontend)
```typescript
export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  service: string;
  details: string;
}
```

### UpdateSubmissionStatusData
```typescript
export interface UpdateSubmissionStatusData {
  status: "pending" | "replied" | "resolved" | "archived";
  response?: string;
}
```

## Server Actions

### `getContactSubmissions()`
Fetches all contact form submissions, ordered by newest first.

**Returns**: `Promise<ContactFormSubmission[]>`

```typescript
const submissions = await getContactSubmissions();
```

### `getContactSubmission(id)`
Fetches a single submission by ID.

**Parameters**:
- `id: string` - Submission ID

**Returns**: `Promise<ContactFormSubmission | null>`

```typescript
const submission = await getContactSubmission(submissionId);
```

### `updateSubmissionStatus(id, data)`
Updates the status and optional response of a submission.

**Parameters**:
- `id: string` - Submission ID
- `data: UpdateSubmissionStatusData` - Status and response

**Returns**: `Promise<{ success: boolean, message: string }>`

```typescript
const result = await updateSubmissionStatus(id, {
  status: "replied",
  response: "Thank you for your inquiry. We'll be in touch soon."
});
```

### `deleteContactSubmission(id)`
Permanently deletes a submission.

**Parameters**:
- `id: string` - Submission ID

**Returns**: `Promise<{ success: boolean, message: string }>`

```typescript
const result = await deleteContactSubmission(id);
```

### `saveContactSubmission(formData)`
Creates a new submission (called from frontend form).

**Parameters**:
- `formData: ContactFormData` - Form data

**Returns**: `Promise<{ success: boolean, id?: string, error?: string }>`

```typescript
const result = await saveContactSubmission({
  name: "John Doe",
  company: "Tech Corp",
  email: "john@techcorp.com",
  service: "ai-agent",
  details: "We need an AI chatbot for customer support..."
});
```

## Usage

### View All Submissions
1. Navigate to `/admin/form-submissions`
2. Browse submissions in the table
3. Use pagination if more than 5 submissions

### Update Status (Quick)
1. Find the submission in the table
2. Click the status dropdown
3. Select new status
4. Changes save automatically

### View Details & Add Response
1. Click the eye icon on any submission
2. Dialog opens with full details
3. Review all information
4. Change status if needed
5. Add notes in "Response / Notes" field
6. Click "Save Response"

### Delete Submission
1. Click the trash icon on any submission
2. Confirm deletion in the dialog
3. Submission is permanently removed

## Important Notes

### ⚠️ Schema Changes
After updating the Prisma schema, you must:
```bash
# Generate Prisma Client
npx prisma generate

# Push changes to database
npx prisma db push
```

### 🔄 Revalidation
All server actions automatically revalidate the `/admin/form-submissions` path, ensuring the UI updates immediately after any change.

### 🎨 UI Components Used
- Shadcn UI Table
- Shadcn UI Dialog
- Shadcn UI Select
- Shadcn UI Badge
- Shadcn UI Button
- Shadcn UI Textarea
- Lucide React Icons
- Global AlertDialog Provider

### 📱 Responsive Design
- Table is horizontally scrollable on mobile
- Dialog is full-width on small screens
- Pagination controls stack on mobile

## Status Colors

- **Pending**: Gray/Outline
- **Replied**: Blue (`bg-blue-500`)
- **Resolved**: Green (`bg-green-500`)
- **Archived**: Gray secondary

## Future Enhancements

Consider adding:
- [ ] Email notifications when status changes
- [ ] Bulk actions (delete multiple, change status)
- [ ] Export to CSV functionality
- [ ] Search and filter by status, date, service
- [ ] Email integration (reply directly from admin panel)
- [ ] Submission statistics dashboard
- [ ] Automated response templates
- [ ] Customer response history tracking

## Related Files

- **Frontend Form**: `components/contact/StepByStepForm.tsx`
- **Types**: `types/form-types.ts`
- **Actions**: `lib/form-action.ts`
- **Schema**: `prisma/schema.prisma`
- **Admin Layout**: `app/(admin)/admin/layout.tsx`

## Testing Checklist

- [x] Table displays all submissions correctly
- [x] Pagination works with multiple pages
- [x] Status dropdown updates submission
- [x] View details dialog opens and displays correctly
- [x] Response can be added and saved
- [x] Delete with confirmation works
- [x] Toast notifications for all actions
- [x] Loading states display properly
- [x] Empty state shows when no submissions
- [x] Responsive design on mobile devices

---

**Last Updated**: January 19, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
