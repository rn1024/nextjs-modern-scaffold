import { type User } from "next-auth";
import { type JWT } from "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    picture?: string | null;
  }
}

// Common types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// UI Component types
export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
}

export interface NavConfig {
  mainNav: NavItem[];
  sidebarNav: NavItem[];
}

// Theme types
export type Theme = "light" | "dark" | "system";

export interface ThemeConfig {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Locale types
export type Locale = "en" | "zh";

export interface LocaleConfig {
  code: Locale;
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

// Database types
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  theme: Theme;
  locale: Locale;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profile_visibility: "public" | "private";
    show_email: boolean;
    show_location: boolean;
  };
  created_at: string;
  updated_at: string;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

export interface PageView {
  page: string;
  referrer?: string;
  user_agent?: string;
  timestamp: Date;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Component prop types
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface WithOptionalChildren {
  children?: React.ReactNode;
}

export type ComponentProps<T = {}> = T & WithClassName & WithOptionalChildren;

// API route types
export interface NextApiRequest extends Request {
  query: Record<string, string | string[]>;
  body: any;
}

export interface NextApiResponse<T = any> {
  status: (code: number) => NextApiResponse<T>;
  json: (data: T) => void;
  end: () => void;
}

// SEO types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  locale?: Locale;
  siteName?: string;
}

// Feature flags
export interface FeatureFlags {
  enableAnalytics: boolean;
  enableNotifications: boolean;
  enableBetaFeatures: boolean;
  enableAI: boolean;
  enableDarkMode: boolean;
  enableI18n: boolean;
}