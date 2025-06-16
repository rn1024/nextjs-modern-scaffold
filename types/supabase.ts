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
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          image: string | null
          role: 'user' | 'admin' | 'moderator'
          plan: 'free' | 'pro' | 'enterprise'
          status: 'active' | 'inactive' | 'pending' | 'suspended'
          email_verified: string | null
          created_at: string
          updated_at: string
          last_login_at: string | null
          preferences: Json | null
          profile: Json | null
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          image?: string | null
          role?: 'user' | 'admin' | 'moderator'
          plan?: 'free' | 'pro' | 'enterprise'
          status?: 'active' | 'inactive' | 'pending' | 'suspended'
          email_verified?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          preferences?: Json | null
          profile?: Json | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          image?: string | null
          role?: 'user' | 'admin' | 'moderator'
          plan?: 'free' | 'pro' | 'enterprise'
          status?: 'active' | 'inactive' | 'pending' | 'suspended'
          email_verified?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          preferences?: Json | null
          profile?: Json | null
        }
        Relationships: []
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token: string | null
          access_token: string | null
          expires_at: number | null
          token_type: string | null
          scope: string | null
          id_token: string | null
          session_state: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          id: string
          session_token: string
          user_id: string
          expires: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_token: string
          user_id: string
          expires: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_token?: string
          user_id?: string
          expires?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      verification_tokens: {
        Row: {
          identifier: string
          token: string
          expires: string
          created_at: string
        }
        Insert: {
          identifier: string
          token: string
          expires: string
          created_at?: string
        }
        Update: {
          identifier?: string
          token?: string
          expires?: string
          created_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: 'active' | 'completed' | 'paused' | 'cancelled'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          progress: number
          start_date: string
          end_date: string | null
          owner_id: string
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: 'active' | 'completed' | 'paused' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          progress?: number
          start_date: string
          end_date?: string | null
          owner_id: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: 'active' | 'completed' | 'paused' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          progress?: number
          start_date?: string
          end_date?: string | null
          owner_id?: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'todo' | 'in-progress' | 'review' | 'done'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          assignee_id: string | null
          project_id: string | null
          due_date: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
          tags: string[] | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assignee_id?: string | null
          project_id?: string | null
          due_date?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
          tags?: string[] | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assignee_id?: string | null
          project_id?: string | null
          due_date?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'info' | 'success' | 'warning' | 'error'
          title: string
          message: string
          read: boolean
          action_url: string | null
          action_text: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'info' | 'success' | 'warning' | 'error'
          title: string
          message: string
          read?: boolean
          action_url?: string | null
          action_text?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'info' | 'success' | 'warning' | 'error'
          title?: string
          message?: string
          read?: boolean
          action_url?: string | null
          action_text?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}