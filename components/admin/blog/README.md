# Blog Admin Components

## Overview

This folder contains the admin components for managing blog posts in the Driplare platform. The blog management system follows the same pattern as case studies and reviews.

---

## Components

### 1. `BlogEditor.tsx`

Rich text editor for creating and editing blog posts.

#### Features:
- ✅ **Tiptap Rich Text Editor** - Full-featured WYSIWYG editor
- ✅ **Cover Image Upload** - Direct Cloudinary integration
- ✅ **Auto Slug Generation** - From title
- ✅ **Tag Management** - Add/remove tags dynamically
- ✅ **Category Selection** - From database categories
- ✅ **Excerpt Field** - For blog card previews
- ✅ **Publish/Draft Toggle** - Control visibility
- ✅ **Create & Edit Modes** - Same component for both operations

#### Props:
```typescript
interface BlogEditorProps {
  blogId?: string;              // For edit mode
  initialData?: BlogPost | null; // Existing blog data
  onCancel: () => void;          // Cancel callback
  onSave: () => void;            // Save success callback
}
```

#### Usage:
```tsx
// Create new blog
<BlogEditor
  onSave={() => router.push("/admin/blogs")}
  onCancel={() => router.push("/admin/blogs")}
/>

// Edit existing blog
<BlogEditor
  blogId={blog.id}
  initialData={blog}
  onSave={() => router.push("/admin/blogs")}
  onCancel={() => router.push("/admin/blogs")}
/>
```

---

### 2. `TiptapMenuBar.tsx`

Toolbar for the Tiptap editor with formatting options.

#### Features:
- Text formatting (bold, italic, underline, strikethrough)
- Headings (H1, H2, H3)
- Lists (bullet, ordered)
- Text alignment (left, center, right)
- Links
- Code blocks
- Blockquotes
- Images
- Undo/Redo

---

## Pages

### Main Admin Page: `app/(admin)/admin/blogs/page.tsx`

Displays all blog posts in a table with CRUD operations.

#### Features:
- ✅ Table view with key data
- ✅ Action buttons (View, Edit, Archive, Delete)
- ✅ Status badges (Published/Draft)
- ✅ Pagination (5 items per page)
- ✅ Global alert dialog for confirmations
- ✅ Tag preview (first 2 tags + count)

#### Table Columns:
1. **Title** - Blog post title with icon
2. **Category** - Category badge
3. **Status** - Published/Draft badge
4. **Tags** - Up to 2 tags shown + count
5. **Created** - Creation date
6. **Actions** - View, Edit, Archive, Delete buttons

---

### Create Page: `app/(admin)/admin/blogs/new/page.tsx`

Simple wrapper that renders `BlogEditor` for creating new posts.

---

### Edit Page: `app/(admin)/admin/blogs/edit/[id]/page.tsx`

Fetches blog by ID and renders `BlogEditor` with existing data.

#### Features:
- Fetches blog post data
- Loading state
- 404 handling if blog not found
- Passes data to editor

---

## Server Actions

All blog operations use server actions from `lib/blog-actions.ts`:

### Available Actions:
```typescript
getAllBlogsForAdmin()      // Fetch all blogs (admin)
getAllPublishedBlogs()     // Fetch published blogs (public)
getBlogPost(id)            // Fetch single blog
getBlogPostDetails(id)     // Fetch blog with related posts
saveBlogPost(data, id?)    // Create or update blog
deleteBlogPost(id)         // Delete blog permanently
archiveBlogPost(id)        // Unpublish blog
getBlogCategories()        // Get distinct categories
```

---

## Type Definitions

All types are defined in `types/blog-types.ts`:

```typescript
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;           // HTML content
  cover_image: string;
  category: string;
  excerpt?: string | null;   // Optional summary
  tags: string[];
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
```

---

## Workflow

### Creating a New Blog Post:

1. Navigate to `/admin/blogs`
2. Click "Create New Post"
3. Fill in required fields:
   - Title *
   - URL Slug * (auto-generated)
   - Content *
   - Cover Image (optional)
   - Category
   - Tags
   - Excerpt
4. Toggle "Published" or keep as "Draft"
5. Click "Publish Now" or "Save Draft"

### Editing a Blog Post:

1. Navigate to `/admin/blogs`
2. Click "Edit" button (blue pencil icon)
3. Modify fields as needed
4. Click "Update Post"

### Archiving a Blog:

1. Navigate to `/admin/blogs`
2. Click "Archive" button (amber archive icon)
3. Confirm in dialog
4. Blog status changes to unpublished

### Deleting a Blog:

1. Navigate to `/admin/blogs`
2. Click "Delete" button (red trash icon)
3. Confirm in dialog
4. Blog is permanently deleted

---

## Tiptap Editor Extensions

The editor includes these extensions:

1. **StarterKit** - Base functionality
   - Headings (H1, H2, H3)
   - Bullet & Ordered Lists
   - Bold, Italic, Strike
   - Blockquotes
   - Code blocks
   - Horizontal rules

2. **Placeholder** - "Write your story here..."
3. **Underline** - Text underline
4. **Link** - Clickable links
5. **TextAlign** - Left, center, right
6. **Image** - Image embedding
7. **Highlight** - Text highlighting

---

## Image Upload

Cover images are uploaded directly to Cloudinary:

```typescript
uploadImageToCloudinary(formData, "blog-covers")
```

- Folder: `blog-covers`
- Accepts: `image/*`
- Shows upload progress
- Preview on upload
- Can be changed or removed

---

## Slug Generation

Slugs are auto-generated from the title:

```typescript
title.toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");
```

Example:
- Title: `"How AI is Changing the World"`
- Slug: `"how-ai-is-changing-the-world"`

---

## Tag Management

Tags are managed dynamically:

1. Type tag name
2. Press **Enter** to add
3. Click **X** on tag to remove
4. Duplicates are prevented

---

## Status Badges

### Published Badge:
```tsx
<Badge className="bg-green-500">Published</Badge>
```

### Draft Badge:
```tsx
<Badge variant="outline" className="border-amber-500 text-amber-500">
  Draft
</Badge>
```

---

## Action Buttons

### View Live:
- Icon: `ExternalLink`
- Opens: `/insights/{blogId}` in new tab
- Visible for all posts

### Edit:
- Icon: `Edit` (blue)
- Navigates to: `/admin/blogs/edit/{blogId}`
- Visible for all posts

### Archive:
- Icon: `Archive` (amber)
- Action: Unpublish blog
- Disabled if already unpublished

### Delete:
- Icon: `Trash2` (red)
- Action: Permanent deletion
- Confirmation required

---

## Pagination

- **Items per page**: 5
- **Controls**: Previous, Page Numbers, Next
- **Info**: "Showing X to Y of Z"
- Only shows if total pages > 1

---

## Global Alert Dialog

Uses `useAlertDialog` hook from `@/hooks/use-alert-dialog`:

### Delete Confirmation:
```typescript
const confirmed = await showAlert({
  title: "Are you absolutely sure?",
  description: `This will permanently delete "${title}"`,
  confirmText: "Delete",
  cancelText: "Cancel",
  variant: "destructive",
});
```

### Archive Confirmation:
```typescript
const confirmed = await showAlert({
  title: "Archive this blog post?",
  description: `"${title}" will be unpublished`,
  confirmText: "Archive",
  cancelText: "Cancel",
  variant: "default",
});
```

---

## Error Handling

### Loading States:
- Main page loading: Spinner with "Loading Blog Posts..."
- Editor loading: Spinner with "Loading Editor..."
- Image upload: Spinner with "Uploading..."

### Validation:
- Title required
- Content required
- Slug required
- Toast errors for validation failures

### 404 Handling:
- Edit page calls `notFound()` if blog doesn't exist
- Shows Next.js 404 page

---

## Design Consistency

Follows the same pattern as:
- ✅ Case Studies (`app/(admin)/admin/case-studies`)
- ✅ Reviews (`app/(admin)/admin/reviews`)

### Shared Features:
- Table-based listing
- Pagination
- Global alert dialog
- Create/Edit page structure
- Loading states
- Action button layout
- Badge styling

---

## Database Schema

```prisma
model BlogPost {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  slug        String   @unique
  content     String   // HTML content
  cover_image String
  category    String   @default("Technical")
  excerpt     String?
  tags        String[] @default([])
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## Best Practices

1. ✅ **Type Safety** - All components use proper TypeScript types
2. ✅ **Reusable Components** - Single editor for create & edit
3. ✅ **Consistent UI** - Matches other admin pages
4. ✅ **Error Handling** - Proper loading and error states
5. ✅ **User Feedback** - Toast notifications for all actions
6. ✅ **Confirmation Dialogs** - For destructive actions
7. ✅ **Responsive Design** - Works on all screen sizes
8. ✅ **Accessibility** - Proper labels and ARIA attributes

---

## Future Enhancements

Consider adding:
- [ ] Bulk operations (delete multiple posts)
- [ ] Advanced search/filter
- [ ] Draft auto-save
- [ ] Version history
- [ ] Co-author support
- [ ] Scheduled publishing
- [ ] SEO metadata editor
- [ ] Image gallery/manager
- [ ] Template system
- [ ] Export to markdown

---

**Last Updated**: January 19, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
