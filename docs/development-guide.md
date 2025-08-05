# 🚀 NextJS Modern Scaffold 开发指南

## 🎯 开发环境准备

### 系统要求
- **Node.js**: 18.0.0 或更高版本
- **pnpm**: 8.0.0 或更高版本（必需）
- **Git**: 最新版本
- **VS Code**: 推荐的开发编辑器

### 推荐的VS Code扩展
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

## 🏗️ 项目初始化

### 1. 克隆项目
```bash
git clone <repository-url>
cd nextjs-modern-scaffold
```

### 2. 安装依赖
```bash
# 确保使用 pnpm
pnpm install
```

### 3. 环境配置
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
vim .env.local
```

### 4. 启动开发服务器
```bash
pnpm dev
```

## 📝 开发规范

### 代码风格

#### 文件命名规范
```
# 组件文件
components/ui/button.tsx          # kebab-case
components/auth/login-form.tsx    # kebab-case

# 页面文件
app/[locale]/dashboard/page.tsx   # Next.js 约定
app/[locale]/settings/layout.tsx  # Next.js 约定

# 工具文件
lib/utils.ts                      # kebab-case
lib/auth-config.ts                # kebab-case

# 类型文件
types/user.ts                     # kebab-case
types/api-response.ts             # kebab-case
```

#### 组件命名规范
```typescript
// ✅ 正确：PascalCase
export function LoginForm() {
  return <form>...</form>
}

// ✅ 正确：使用 FC 类型
export const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return <div>...</div>
}

// ❌ 错误：camelCase
export function loginForm() {
  return <form>...</form>
}
```

#### 变量命名规范
```typescript
// ✅ 正确：camelCase
const userName = 'john'
const isLoggedIn = true
const userPreferences = {}

// ✅ 正确：常量使用 UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3

// ✅ 正确：类型使用 PascalCase
interface UserProfile {
  id: string
  name: string
}

type ApiResponse<T> = {
  data: T
  status: number
}
```

### 导入规范

#### 导入顺序
```typescript
// 1. React 相关
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'

// 2. 第三方库
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

// 3. 内部组件（使用别名）
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 4. 内部工具
import { cn } from '@/lib/utils'
import { auth } from '@/lib/auth'

// 5. 类型导入
import type { User } from '@/types/user'
import type { ApiResponse } from '@/types/api'
```

#### 路径别名使用
```typescript
// ✅ 正确：使用 @ 别名
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'

// ❌ 错误：相对路径
import { Button } from '../../../components/ui/button'
import { cn } from '../../lib/utils'
```

## 🧩 组件开发

### 组件结构模板
```typescript
'use client' // 仅在需要客户端功能时添加

import React from 'react'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

// 1. 类型定义
interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

// 2. 组件实现
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // 基础样式
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        // 变体样式
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border border-input bg-background hover:bg-accent': variant === 'outline',
        },
        // 尺寸样式
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        // 状态样式
        {
          'opacity-50 cursor-not-allowed': disabled || loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
          {/* 加载图标 */}
        </svg>
      )}
      {children}
    </button>
  )
}

// 3. 默认导出（可选）
export default Button
```

### Hooks 开发规范
```typescript
// hooks/use-local-storage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 1. 状态定义
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 2. 设置值函数
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
```

## 🌍 国际化开发

### 添加新翻译
```json
// i18n/messages/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong",
    "success": "Success!"
  },
  "auth": {
    "login": "Sign In",
    "logout": "Sign Out",
    "register": "Sign Up"
  }
}

// i18n/messages/zh.json
{
  "common": {
    "loading": "加载中...",
    "error": "出现错误",
    "success": "成功！"
  },
  "auth": {
    "login": "登录",
    "logout": "退出",
    "register": "注册"
  }
}
```

### 在组件中使用翻译
```typescript
import { useTranslations } from 'next-intl'

export function LoginForm() {
  const t = useTranslations('auth')
  
  return (
    <form>
      <button type="submit">
        {t('login')}
      </button>
    </form>
  )
}
```

## 🎨 样式开发

### Tailwind CSS 最佳实践
```typescript
// ✅ 正确：使用 cn 函数组合类名
import { cn } from '@/lib/utils'

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  )
}

// ✅ 正确：使用条件类名
function Button({ variant, size, className }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        {
          'bg-primary text-primary-foreground': variant === 'primary',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
        },
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
        },
        className
      )}
    />
  )
}
```

### 自定义CSS变量
```css
/* app/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
}
```

## 🔐 认证开发

### NextAuth 配置
```typescript
// lib/auth.ts
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
})
```

### 保护路由
```typescript
// middleware.ts
import { auth } from '@/lib/auth'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
})

export default auth((req) => {
  const { pathname } = req.nextUrl
  
  // 保护的路由
  const protectedRoutes = ['/dashboard', '/settings', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.includes(route)
  )
  
  if (isProtectedRoute && !req.auth) {
    const signInUrl = new URL('/login', req.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return Response.redirect(signInUrl)
  }
  
  return intlMiddleware(req)
})
```

## 📊 状态管理

### 使用 Zustand（推荐）
```typescript
// stores/user-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  preferences: UserPreferences
  setUser: (user: User | null) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}

export const useUserStore = create<UserState>()()
  persist(
    (set, get) => ({
      user: null,
      preferences: {
        theme: 'system',
        language: 'en',
      },
      setUser: (user) => set({ user }),
      updatePreferences: (newPreferences) => 
        set(state => ({
          preferences: { ...state.preferences, ...newPreferences }
        })),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        preferences: state.preferences 
      }),
    }
  )
```

## 🧪 测试开发

### Playwright E2E测试
```typescript
// tests/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should login with Google', async ({ page }) => {
    await page.goto('/login')
    
    // 点击Google登录按钮
    await page.click('[data-testid="google-login"]')
    
    // 等待重定向到仪表板
    await expect(page).toHaveURL('/dashboard')
    
    // 验证用户已登录
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
  })
  
  test('should logout successfully', async ({ page }) => {
    // 假设用户已登录
    await page.goto('/dashboard')
    
    // 点击用户菜单
    await page.click('[data-testid="user-menu"]')
    
    // 点击退出登录
    await page.click('[data-testid="logout-button"]')
    
    // 验证重定向到首页
    await expect(page).toHaveURL('/')
  })
})
```

## 🚀 部署指南

### Vercel部署
```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署项目
vercel

# 4. 设置环境变量
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
```

### Docker部署
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## 🔧 常见问题解决

### 1. pnpm 安装问题
```bash
# 清除缓存
pnpm store prune

# 删除 node_modules 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 2. TypeScript 类型错误
```bash
# 重新生成类型
pnpm type-check

# 清除 Next.js 缓存
rm -rf .next
pnpm dev
```

### 3. 样式不生效
```bash
# 重新构建 Tailwind
rm -rf .next
pnpm dev

# 检查 Tailwind 配置
npx tailwindcss --help
```

### 4. 国际化路由问题
```typescript
// 检查 middleware.ts 配置
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## 📚 学习资源

### 官方文档
- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [NextAuth.js 文档](https://next-auth.js.org)

### 社区资源
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind UI](https://tailwindui.com)
- [React Hook Form](https://react-hook-form.com)

这个开发指南为团队提供了统一的开发标准和最佳实践，确保代码质量和项目的可维护性。