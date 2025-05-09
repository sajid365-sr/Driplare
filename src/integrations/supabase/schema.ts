
import { SupabaseClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const createBlogsTable = async (supabaseClient: SupabaseClient) => {
  try {
    // Check if blogs table exists
    const { data: existingTables, error: tablesError } = await supabaseClient
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'blogs')
      .eq('table_schema', 'public');

    if (tablesError) {
      console.error('Error checking for blogs table:', tablesError);
      return false;
    }

    // If table doesn't exist, create it
    if (!existingTables || existingTables.length === 0) {
      const { error: createError } = await supabaseClient.rpc('create_blogs_table');
      
      if (createError) {
        console.error('Error creating blogs table:', createError);
        toast.error('Failed to create blogs table in database');
        return false;
      }

      toast.success('Blogs table created successfully');
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error in createBlogsTable:', error);
    return false;
  }
};

// Add this function to initialize the database schema when the app starts
export const initDatabaseSchema = async (supabase: SupabaseClient) => {
  try {
    // First, create the SQL function to create the blogs table if it doesn't exist
    const { error: funcError } = await supabase.rpc('create_blogs_table_function');
    if (funcError) {
      // Function might already exist, attempt to create the table directly
      await createBlogsTable(supabase);
    } else {
      // Now create the table
      await createBlogsTable(supabase);
    }
  } catch (error) {
    console.error('Error initializing database schema:', error);
  }
};
