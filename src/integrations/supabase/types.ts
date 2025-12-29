export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          api_key: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          details: string | null
          id: string
          module: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          action: string
          details?: string | null
          id?: string
          module?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          action?: string
          details?: string | null
          id?: string
          module?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          category: string | null
          content: string
          cover_image: string | null
          created_at: string
          id: string
          is_archived: boolean
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          cover_image?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at: string
        }
        Update: {
          category?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_sync_settings: {
        Row: {
          content_file_url: string | null
          content_snippets: string | null
          id: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          content_file_url?: string | null
          content_snippets?: string | null
          id?: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          content_file_url?: string | null
          content_snippets?: string | null
          id?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          additional_info: string | null
          budget: string | null
          company: string | null
          created_at: string | null
          email: string
          form_type: string
          id: string
          message: string | null
          name: string
          phone: string | null
          service_type: string | null
          status: string | null
          subject: string | null
          timeline: string | null
        }
        Insert: {
          additional_info?: string | null
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          form_type: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          service_type?: string | null
          status?: string | null
          subject?: string | null
          timeline?: string | null
        }
        Update: {
          additional_info?: string | null
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          form_type?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          service_type?: string | null
          status?: string | null
          subject?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      news_letter: {
        Row: {
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          recipient: string
          timestamp: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          recipient?: string
          timestamp?: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          recipient?: string
          timestamp?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          company: string | null
          complement: string | null
          created_at: string
          designation: string | null
          id: string
          imageUrl: string | null
          name: string | null
          testimonialTitle: string | null
          updated_at: string | null
          videoUrl: string | null
        }
        Insert: {
          company?: string | null
          complement?: string | null
          created_at?: string
          designation?: string | null
          id?: string
          imageUrl?: string | null
          name?: string | null
          testimonialTitle?: string | null
          updated_at?: string | null
          videoUrl?: string | null
        }
        Update: {
          company?: string | null
          complement?: string | null
          created_at?: string
          designation?: string | null
          id?: string
          imageUrl?: string | null
          name?: string | null
          testimonialTitle?: string | null
          updated_at?: string | null
          videoUrl?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "Owner" | "Admin" | "Viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["Owner", "Admin", "Viewer"],
    },
  },
} as const
