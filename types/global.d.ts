import { Database } from './supabase';

declare global {
  type DB = Database;
  
  namespace NodeJS {
    interface ProcessEnv {
      // Next.js
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_APP_NAME: string;
      NODE_ENV: 'development' | 'production' | 'test';
      
      // NextAuth.js
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      
      // OAuth Providers
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
      
      // Database
      DATABASE_URL: string;
      
      // Email
      EMAIL_SERVER_HOST?: string;
      EMAIL_SERVER_PORT?: string;
      EMAIL_SERVER_USER?: string;
      EMAIL_SERVER_PASSWORD?: string;
      EMAIL_FROM?: string;
      
      // Analytics
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
      NEXT_PUBLIC_VERCEL_ANALYTICS?: string;
      
      // Feature Flags
      NEXT_PUBLIC_ENABLE_ANALYTICS?: string;
      NEXT_PUBLIC_ENABLE_FEEDBACK?: string;
      NEXT_PUBLIC_MAINTENANCE_MODE?: string;
    }
  }
  
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: Record<string, any>[];
  }
}

export {};