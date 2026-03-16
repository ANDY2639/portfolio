export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image_url: string | null
          tags: string[] | null
          reading_time: number | null
          is_published: boolean | null
          published_at: string | null
          views_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          cover_image_url?: string | null
          tags?: string[] | null
          reading_time?: number | null
          is_published?: boolean | null
          published_at?: string | null
          views_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          cover_image_url?: string | null
          tags?: string[] | null
          reading_time?: number | null
          is_published?: boolean | null
          published_at?: string | null
          views_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          technologies: string[] | null
          category: string
          github_url: string | null
          live_url: string | null
          demo_url: string | null
          display_order: number | null
          is_featured: boolean | null
          is_published: boolean | null
          views_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          technologies?: string[] | null
          category: string
          github_url?: string | null
          live_url?: string | null
          demo_url?: string | null
          display_order?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          views_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          technologies?: string[] | null
          category?: string
          github_url?: string | null
          live_url?: string | null
          demo_url?: string | null
          display_order?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          views_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          level: string | null
          icon_url: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          level?: string | null
          icon_url?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          level?: string | null
          icon_url?: string | null
          display_order?: number | null
          created_at?: string
        }
        Relationships: []
      }
      personal_info: {
        Row: {
          id: string
          name: string
          title: string
          bio: string | null
          location: string | null
          email: string | null
          avatar_url: string | null
          github_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          resume_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          bio?: string | null
          location?: string | null
          email?: string | null
          avatar_url?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          bio?: string | null
          location?: string | null
          email?: string | null
          avatar_url?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          is_read: boolean | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          is_read?: boolean | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          is_read?: boolean | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Relationships: []
      }
      site_analytics: {
        Row: {
          id: string
          page_path: string
          visitor_id: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          country: string | null
          city: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          page_path: string
          visitor_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          page_path?: string
          visitor_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          visited_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_site_stats: {
        Args: Record<string, never>
        Returns: {
          total_visits: number
          unique_visitors: number
          today_visits: number
          this_week_visits: number
          this_month_visits: number
        }[]
      }
      increment_post_views: {
        Args: {
          post_id: string
        }
        Returns: void
      }
      increment_project_views: {
        Args: {
          project_id: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
