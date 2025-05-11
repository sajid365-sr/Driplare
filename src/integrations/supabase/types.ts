export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          api_key: string;
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          api_key: string;
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          api_key?: string;
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          action: string;
          details: string | null;
          id: string;
          module: string | null;
          timestamp: string;
          user_id: string;
        };
        Insert: {
          action: string;
          details?: string | null;
          id?: string;
          module?: string | null;
          timestamp?: string;
          user_id: string;
        };
        Update: {
          action?: string;
          details?: string | null;
          id?: string;
          module?: string | null;
          timestamp?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      blogs: {
        Row: {
          category: string | null;
          content: string;
          cover_image: string | null;
          created_at: string;
          id: string;
          is_archived: boolean;
          published_at: string | null;
          slug: string;
          status: string;
          tags: string[] | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          content: string;
          cover_image?: string | null;
          created_at?: string;
          id?: string;
          is_archived?: boolean;
          published_at?: string | null;
          slug: string;
          status?: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          content?: string;
          cover_image?: string | null;
          created_at?: string;
          id?: string;
          is_archived?: boolean;
          published_at?: string | null;
          slug?: string;
          status?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          designation: string;
          company: string;
          testimonialTitle: string;
          videoUrl?: string;
          imageUrl: string;
          complement: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name?: string;
          designation?: string;
          company?: string;
          testimonialTitle?: string;
          videoUrl?: string;
          imageUrl?: string;
          complement?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          designation?: string;
          company?: string;
          testimonialTitle?: string;
          videoUrl?: string;
          imageUrl?: string;
          complement?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      form_submissions: {
        Row: {
          additional_info: string | null;
          budget: string | null;
          company: string | null;
          created_at: string | null;
          email: string;
          form_type: string;
          id: string;
          message: string | null;
          name: string;
          phone: string | null;
          service_type: string | null;
          status: string | null;
          subject: string | null;
          timeline: string | null;
        };
        Insert: {
          additional_info?: string | null;
          budget?: string | null;
          company?: string | null;
          created_at?: string | null;
          email: string;
          form_type: string;
          id?: string;
          message?: string | null;
          name: string;
          phone?: string | null;
          service_type?: string | null;
          status?: string | null;
          subject?: string | null;
          timeline?: string | null;
        };
        Update: {
          additional_info?: string | null;
          budget?: string | null;
          company?: string | null;
          created_at?: string | null;
          email?: string;
          form_type?: string;
          id?: string;
          message?: string | null;
          name?: string;
          phone?: string | null;
          service_type?: string | null;
          status?: string | null;
          subject?: string | null;
          timeline?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          message: string;
          read: boolean;
          recipient: string;
          timestamp: string;
          title: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message: string;
          read?: boolean;
          recipient?: string;
          timestamp?: string;
          title: string;
          type: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string;
          read?: boolean;
          recipient?: string;
          timestamp?: string;
          title?: string;
          type?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      app_role: "Owner" | "Admin" | "Viewer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["Owner", "Admin", "Viewer"],
    },
  },
} as const;
