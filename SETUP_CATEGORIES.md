# Category System - Setup Guide

## 🚨 Important: Run This First!

The Prisma client needs to be regenerated to include the new `BlogCategory` model.

---

## Setup Steps

### 1. Generate Prisma Client

```bash
npx prisma generate
```

This will:
- ✅ Add `BlogCategory` model to Prisma client
- ✅ Fix TypeScript errors in `category-actions.ts`
- ✅ Enable category CRUD operations

### 2. (Optional) Seed Default Categories

You can add default categories programmatically:

**Option A: Via Admin Page**
1. Navigate to `/admin/blogs/new` or `/admin/blogs/edit/[id]`
2. Click "Manage Categories" button
3. Add categories manually via the UI

**Option B: Via Script** (if you want to seed on first run)

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Technology', description: 'Tech-related posts' },
    { name: 'Automation', description: 'Automation and AI' },
    { name: 'Architecture', description: 'System architecture' },
    { name: 'Development', description: 'Software development' },
  ];

  for (const category of categories) {
    await prisma.blogCategory.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        slug: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: category.description,
      },
    });
  }

  console.log('✅ Default categories seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then run:
```bash
npx prisma db seed
```

---

## Verification

After running `npx prisma generate`:

1. **Check TypeScript errors are gone:**
   - Open `lib/category-actions.ts`
   - Should have no errors

2. **Test Category Manager:**
   - Navigate to blog editor
   - Click "Manage Categories"
   - Add a test category
   - Should work without errors

---

## Troubleshooting

### Error: "Property 'blogCategory' does not exist"

**Cause:** Prisma client not regenerated  
**Fix:** Run `npx prisma generate`

### Error: "Category not found"

**Cause:** No categories in database  
**Fix:** Use Category Manager UI or seed script

### Error: "Cannot delete category"

**Cause:** Blog posts are using that category  
**Expected:** This is a protection feature. Delete or change the blog posts first.

---

## What Happens Next?

After setup:
- ✅ Category Manager button appears in blog editor
- ✅ Categories persist in database
- ✅ No more lost categories
- ✅ Full CRUD operations available
- ✅ Image resizing works via drag handles

---

**Ready to use!** 🎉
