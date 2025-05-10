import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image?: string;
  tags: string[];
  category: string;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
  published_at?: string;
  is_archived: boolean;
}

export type BlogPostFormData = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;

// Generate slug from title
export const generateSlug = (title: string): string => {
  return slugify(title);
};

// Upload cover image to Supabase storage
export const uploadCoverImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    // Use unauthenticated upload for now (RLS policies will handle permissions)
    const { error } = await supabase.storage
      .from('blog_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Storage error:', error);
      toast.error('Error uploading image: ' + error.message);
      return null;
    }

    const { data } = supabase.storage
      .from('blog_images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    toast.error('Failed to upload image');
    return null;
  }
};

// Upload editor image
export const uploadEditorImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `editor/${fileName}`;

    const { error } = await supabase.storage
      .from('blog_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Storage error:', error);
      toast.error('Error uploading image: ' + error.message);
      return null;
    }

    const { data } = supabase.storage
      .from('blog_images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    toast.error('Failed to upload image');
    return null;
  }
};

// Create or update blog post - with type safety
export const saveBlogPost = async (
  post: BlogPostFormData, 
  existingId?: string
): Promise<string | null> => {
  try {
    const now = new Date().toISOString();
    
    // Prepare post data
    const postData = {
      ...post,
      updated_at: now,
    };
    
    if (existingId) {
      // Update existing post - use type assertion since we've verified the schema in SQL
      const { error } = await supabase
        .from('blogs')
        .update(postData as any)
        .eq('id', existingId);
      
      if (error) {
        console.error('Error updating blog post:', error);
        toast.error('Error updating blog post: ' + error.message);
        return null;
      }
      
      toast.success('Blog post updated successfully');
      return existingId;
    } else {
      // Create new post
      const { data, error } = await supabase
        .from('blogs')
        .insert({
          ...postData,
          created_at: now,
        } as any)
        .select('id')
        .single();
      
      if (error) {
        console.error('Error creating blog post:', error);
        toast.error('Error creating blog post: ' + error.message);
        return null;
      }
      
      toast.success('Blog post created successfully');
      return data.id;
    }
  } catch (error) {
    console.error('Blog save error:', error);
    toast.error('Failed to save blog post');
    return null;
  }
};

// Fetch a single blog post by ID - with type safety
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    // Use type assertion since we've verified the schema in SQL
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching blog post:', error);
      toast.error('Error fetching blog post: ' + error.message);
      return null;
    }
    
    return data as unknown as BlogPost;
  } catch (error) {
    console.error('Get blog error:', error);
    toast.error('Failed to fetch blog post');
    return null;
  }
};

// Fetch blog posts with pagination and filters
export interface BlogFilters {
  status?: 'published' | 'draft' | 'archived' | null;
  category?: string | null;
  dateRange?: { start: string; end: string } | null;
  searchQuery?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
}

export const getBlogPosts = async (
  page: number = 1,
  pageSize: number = 10,
  filters: BlogFilters = {}
): Promise<PaginatedResponse<BlogPost>> => {
  try {
    // Use type assertion since we've verified the schema in SQL
    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' });
    
    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      query = query.gte('created_at', start).lte('created_at', end);
    }
    
    if (filters.searchQuery) {
      query = query.or(`title.ilike.%${filters.searchQuery}%,content.ilike.%${filters.searchQuery}%`);
    }
    
    // Add pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Error fetching blog posts: ' + error.message);
      return { data: [], count: 0, page, pageSize };
    }
    
    return {
      data: data as unknown as BlogPost[],
      count: count || 0,
      page,
      pageSize
    };
  } catch (error) {
    console.error('List blogs error:', error);
    toast.error('Failed to fetch blog posts');
    return { data: [], count: 0, page, pageSize };
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    // Use type assertion since we've verified the schema in SQL
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Error deleting blog post: ' + error.message);
      return false;
    }
    
    toast.success('Blog post deleted successfully');
    return true;
  } catch (error) {
    console.error('Delete blog error:', error);
    toast.error('Failed to delete blog post');
    return false;
  }
};

// Archive a blog post
export const archiveBlogPost = async (id: string): Promise<boolean> => {
  try {
    // Use type assertion since we've verified the schema in SQL
    const { error } = await supabase
      .from('blogs')
      .update({
        is_archived: true,
        status: 'archived',
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error archiving blog post:', error);
      toast.error('Error archiving blog post: ' + error.message);
      return false;
    }
    
    toast.success('Blog post archived successfully');
    return true;
  } catch (error) {
    console.error('Archive blog error:', error);
    toast.error('Failed to archive blog post');
    return false;
  }
};

// Fetch all blog categories
export const getBlogCategories = async (): Promise<string[]> => {
  try {
    // We'll use the existing blogs to extract unique categories
    // If no blogs exist yet, we'll return default categories
    // Use type assertion since we've verified the schema in SQL
    const { data, error } = await supabase
      .from('blogs')
      .select('category');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return getDefaultCategories();
    }
    
    if (data && data.length > 0) {
      // Extract unique categories
      const categoriesSet = new Set(data.map(blog => (blog as any).category).filter(Boolean));
      return Array.from(categoriesSet);
    }
    
    return getDefaultCategories();
  } catch (error) {
    console.error('Get categories error:', error);
    return getDefaultCategories();
  }
};

// Helper function to provide default categories
const getDefaultCategories = (): string[] => {
  return ['Technology', 'Design', 'Marketing', 'Business', 'Development'];
};
