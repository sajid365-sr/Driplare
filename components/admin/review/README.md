# Review Management System

This directory contains all components and logic for managing client reviews in the admin panel.

## Files Structure

```
components/admin/review/
├── reviewFormSchema.ts      # Zod validation schema for review forms
├── ReviewForm.tsx           # Create new review form (multi-step with tabs)
├── EditReviewForm.tsx       # Edit existing review form (multi-step with tabs)
├── ReviewInfoStep.tsx       # Step 1: Client information & rating
├── ReviewContentStep.tsx    # Step 2: Review title & content
├── ReviewMediaStep.tsx      # Step 3: Image upload & video URL
├── ReviewMetricsStep.tsx    # Step 4: Impact metrics & status
└── README.md               # This file

app/(admin)/admin/reviews/
├── page.tsx                 # Main reviews list page
├── new/
│   └── page.tsx            # Create new review page
└── edit/
    └── [id]/
        └── page.tsx        # Edit review page (dynamic route)

types/
└── review-types.ts         # TypeScript interfaces for Review

lib/
├── review-action.ts        # Server actions for CRUD operations
└── upload-image.ts         # Cloudinary image upload utility
```

## Overview

### 1. **Review Form Schema** (`reviewFormSchema.ts`)

Defines validation rules using Zod for all review fields:

- **Client Information**: name, designation, company
- **Review Content**: testimonialTitle, complement (main review text)
- **Media**: imageUrl, videoUrl (optional)
- **Metrics**: timeSaved, efficiencyGain (optional)
- **Rating**: 1-5 stars (default: 5)
- **Status**: approved, pending, or rejected

### 2. **ReviewForm Component** (`ReviewForm.tsx`)

**Purpose**: Create new client reviews using a multi-step form with tabs

**Features**:
- **Multi-step form** with 4 organized tabs
- **Tab-based navigation** for better user experience
- Real-time validation with react-hook-form and zod
- **Cloudinary image upload** for client photos
- Step-by-step data collection:
  - **Step 1 (Client Info)**: Name, designation, company, rating
  - **Step 2 (Content)**: Review title and detailed testimonial text
  - **Step 3 (Media)**: Image upload to Cloudinary + video URL
  - **Step 4 (Metrics)**: Time saved, efficiency gains, publication status
- Image preview and upload progress indicators
- Toast notifications for success/error states
- Automatic redirect to reviews list on success
- Save button accessible from header (always visible)

**Usage**:
```tsx
import ReviewForm from "@/components/admin/review/ReviewForm";

export default function NewReviewPage() {
  return <ReviewForm />;
}
```

### 3. **EditReviewForm Component** (`EditReviewForm.tsx`)

**Purpose**: Edit existing client reviews using a multi-step form

**Features**:
- **Multi-step form** with 4 organized tabs (same as ReviewForm)
- Pre-fills all fields with existing review data
- Same validation and step structure as ReviewForm
- **Cloudinary image upload** with existing image preview
- Updates review in database
- Maintains creation timestamp
- Toast notifications for success/error
- Update button accessible from header

**Usage**:
```tsx
import EditReviewForm from "@/components/admin/review/EditReviewForm";

export default function EditPage({ review }) {
  return <EditReviewForm initialData={review} />;
}
```

### 4. **Review Pages**

#### Main Reviews Page (`app/(admin)/admin/reviews/page.tsx`)
- Lists all reviews in a table format
- Shows client info, rating, status, and creation date
- Edit and delete actions for each review
- Pagination for large datasets
- Uses global AlertDialog for delete confirmations
- Integrated with `useAlertDialog` hook

#### New Review Page (`app/(admin)/admin/reviews/new/page.tsx`)
- Simple wrapper that renders `ReviewForm`
- Route: `/admin/reviews/new`

#### Edit Review Page (`app/(admin)/admin/reviews/edit/[id]/page.tsx`)
- Fetches review by ID from database
- Renders `EditReviewForm` with initial data
- Shows 404 if review doesn't exist
- Route: `/admin/reviews/edit/[reviewId]`

## Database Schema (Prisma)

```prisma
model Review {
  id               String   @id @default(auto()) @map("_id") @db.ObjectId
  name             String
  designation      String
  company          String
  testimonialTitle String
  imageUrl         String
  videoUrl         String?
  complement       String   // The main review text
  timeSaved        String?
  efficiencyGain   String?
  rating           Int      @default(5)
  status           String   @default("approved")
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

## Server Actions (`lib/review-action.ts`)

### `getReviews(page, pageSize)`
- Fetches paginated list of reviews
- Returns: `{ data: Review[], count, page, pageSize }`

### `getReview(id)`
- Fetches single review by ID
- Returns: `Review | null`

### `saveReview(reviewData, reviewId?)`
- Creates new review (if no reviewId)
- Updates existing review (if reviewId provided)
- Returns: `{ success: boolean, id?: string, message: string }`

### `deleteReview(id)`
- Deletes review by ID
- Returns: `{ success: boolean, message: string }`

## Type Definitions

### `Review` (types/review-types.ts)
```typescript
export interface Review {
  id: string;
  name: string;
  designation: string;
  company: string;
  testimonialTitle: string;
  imageUrl: string;
  videoUrl?: string;
  complement: string;
  timeSaved?: string;
  efficiencyGain?: string;
  rating: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### `SaveReviewData` (lib/review-action.ts)
```typescript
export interface SaveReviewData {
  name: string;
  designation: string;
  company: string;
  testimonialTitle: string;
  complement: string;
  imageUrl?: string;
  videoUrl?: string;
  timeSaved?: string;
  efficiencyGain?: string;
  rating?: number;
  status?: string;
}
```

### `ReviewFormValues` (reviewFormSchema.ts)
Inferred from Zod schema - matches form structure exactly

### 4. **Step Components**

#### ReviewInfoStep (`ReviewInfoStep.tsx`)
- Collects client basic information
- Name, designation, company fields
- Star rating selector (1-5)
- Form validation for required fields

#### ReviewContentStep (`ReviewContentStep.tsx`)
- Review title input
- Large textarea for testimonial content
- Character counter (max 1000)
- Descriptive labels and placeholders

#### ReviewMediaStep (`ReviewMediaStep.tsx`)
- **Cloudinary image upload** component
- Circular image preview (profile photo style)
- Upload progress indicator
- Image validation (type, size max 10MB)
- Remove image functionality
- Video URL input field
- Supports YouTube, Loom, and other platforms

#### ReviewMetricsStep (`ReviewMetricsStep.tsx`)
- Optional impact metrics (time saved, efficiency gain)
- Publication status selector
- Visual status indicators (colored dots)
- Descriptive status explanations

## Features

### ✅ Multi-Step Form with Tabs
- **4 organized steps** for better UX
- Tab navigation between sections
- All steps accessible anytime
- Progress indication through tabs
- Consistent layout across steps

### ✅ Cloudinary Image Upload
- **Direct upload to Cloudinary**
- Automatic cloud storage
- Image validation (type & size)
- Local preview before upload
- Upload progress indicator
- Remove/replace functionality
- Folder: `Driplare/Website Asset/Reviews`

### ✅ Form Validation
- Client-side validation with Zod
- Required field indicators (red asterisks)
- Real-time error messages
- Type-safe forms with TypeScript
- Field-level validation

### ✅ User Experience
- Clean, modern UI with Shadcn components
- Card-based layout for organized sections
- Loading states during submission and upload
- Toast notifications for feedback
- Automatic navigation on success
- Save button always visible in header
- Image preview with circular design
- Character counter for review text

### ✅ Security & Data Integrity
- Server-side validation
- Proper error handling
- Type-safe database operations
- Optional fields handled correctly
- Secure cloud image storage

### ✅ Flexibility
- Optional video testimonial URLs
- Optional impact metrics
- Status control (approved/pending/rejected)
- Rating system (1-5 stars)
- Support for various video platforms

## Usage Examples

### Creating a New Review
1. Navigate to `/admin/reviews/new`
2. **Step 1 (Client Info)**: Enter client name, designation, company, and rating
3. **Step 2 (Content)**: Write review title and detailed testimonial
4. **Step 3 (Media)**: Upload client photo (Cloudinary) and add video URL (optional)
5. **Step 4 (Metrics)**: Add impact metrics and set publication status
6. Click "Save Review" from the header (accessible from any step)
7. Review is saved to database and uploaded to Cloudinary
8. Redirected to reviews list on success

### Editing a Review
1. Click edit icon on any review in the list
2. Form opens with all existing data pre-filled
3. Navigate through tabs to update desired fields
4. Upload new image if needed (replaces old one)
5. Click "Update Review" from header
6. Changes saved and redirected to reviews list

### Image Upload Process
1. Click "Upload Photo" button in Media step
2. Select image file (jpg, png, gif, webp, max 10MB)
3. Local preview appears immediately
4. Image uploads to Cloudinary in background
5. Upload progress indicator shown
6. Success message when complete
7. Image URL automatically saved to form
8. Can remove and re-upload anytime

### Deleting a Review
1. Click delete icon on any review
2. Confirm in the AlertDialog
3. Review is permanently deleted
4. List automatically refreshes

## Code Quality

- ✅ No TypeScript errors
- ✅ No ESLint warnings
- ✅ Proper type definitions
- ✅ Comprehensive comments
- ✅ Follows project conventions
- ✅ DRY principles applied
- ✅ Reusable components

## Dependencies

- `react-hook-form` - Form state management
- `@hookform/resolvers` - Zod integration
- `zod` - Schema validation
- `sonner` - Toast notifications
- `@/components/ui/*` - Shadcn UI components (including Tabs)
- `lucide-react` - Icons
- `next/image` - Optimized image component
- `cloudinary` - Image upload and storage

## Environment Variables

Required for Cloudinary image upload:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Notes

- All forms use the same validation schema for consistency
- **Images are uploaded to Cloudinary** (not URL inputs)
- Images stored in folder: `Driplare/Website Asset/Reviews`
- Video URLs support YouTube, Loom, and other platforms
- Status defaults to "approved" for immediate publication
- Rating defaults to 5 stars
- Times are stored as strings for flexibility (e.g., "20 hours/week")
- Efficiency gains stored as strings (e.g., "80% faster")
- Multi-step form with tabs improves data organization
- Image validation: max 10MB, image formats only
- Local preview shown immediately, cloud upload in background

## Recent Updates

### ✅ Completed
- ✅ **Multi-step form with tabs** - Organized into 4 logical steps
- ✅ **Cloudinary image upload** - Direct client photo upload
- ✅ **Image preview** - Circular profile-style preview
- ✅ **Upload progress indicators** - Visual feedback during upload
- ✅ **Step-based components** - Modular and reusable

## Future Enhancements

Consider adding:
- Rich text editor for review content
- Multi-language support
- Review templates
- Bulk import/export
- Analytics dashboard
- Email notifications on new reviews
- Multiple image upload (gallery)
- Image cropping tool
- Drag-and-drop upload
