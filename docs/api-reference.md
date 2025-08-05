# 🔌 NextJS Modern Scaffold API 参考文档

## 📋 API 概览

本项目采用 Next.js App Router 的 API Routes 架构，提供了完整的后端API支持。所有API都位于 `app/api/` 目录下，支持 RESTful 设计原则。

## 🏗️ API 架构

### 基础结构
```
app/api/
├── auth/                    # 认证相关API
│   └── [...nextauth]/       # NextAuth.js 动态路由
│       └── route.ts         # 认证处理器
├── users/                   # 用户管理API
│   ├── route.ts            # 用户列表/创建
│   └── [id]/               # 用户详情
│       └── route.ts        # 用户CRUD操作
├── dashboard/              # 仪表板数据API
│   ├── stats/              # 统计数据
│   │   └── route.ts
│   └── activities/         # 活动数据
│       └── route.ts
└── health/                 # 健康检查
    └── route.ts
```

### API 响应格式

所有API响应都遵循统一的格式：

```typescript
// 成功响应
interface ApiResponse<T> {
  success: true
  data: T
  message?: string
  timestamp: string
}

// 错误响应
interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
  timestamp: string
}
```

## 🔐 认证 API

### NextAuth.js 端点

#### `POST /api/auth/signin`
用户登录

**请求体：**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "image": "https://example.com/avatar.jpg"
    },
    "expires": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

#### `POST /api/auth/signout`
用户登出

**响应：**
```json
{
  "success": true,
  "message": "Successfully signed out",
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

#### `GET /api/auth/session`
获取当前会话

**响应：**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "image": "https://example.com/avatar.jpg"
    },
    "expires": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

## 👥 用户管理 API

### `GET /api/users`
获取用户列表

**查询参数：**
- `page`: 页码（默认：1）
- `limit`: 每页数量（默认：10，最大：100）
- `search`: 搜索关键词
- `sort`: 排序字段（name, email, createdAt）
- `order`: 排序方向（asc, desc）

**示例请求：**
```
GET /api/users?page=1&limit=20&search=john&sort=createdAt&order=desc
```

**响应：**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "email": "john@example.com",
        "name": "John Doe",
        "image": "https://example.com/avatar.jpg",
        "createdAt": "2023-12-01T12:00:00.000Z",
        "updatedAt": "2023-12-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  },
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

### `POST /api/users`
创建新用户

**请求体：**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "securepassword123"
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "id": "user_456",
    "email": "newuser@example.com",
    "name": "New User",
    "createdAt": "2023-12-01T12:00:00.000Z"
  },
  "message": "User created successfully",
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

### `GET /api/users/[id]`
获取用户详情

**路径参数：**
- `id`: 用户ID

**响应：**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "john@example.com",
    "name": "John Doe",
    "image": "https://example.com/avatar.jpg",
    "profile": {
      "bio": "Software Developer",
      "location": "San Francisco, CA",
      "website": "https://johndoe.com"
    },
    "createdAt": "2023-12-01T12:00:00.000Z",
    "updatedAt": "2023-12-01T12:00:00.000Z"
  },
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

### `PUT /api/users/[id]`
更新用户信息

**请求体：**
```json
{
  "name": "John Smith",
  "profile": {
    "bio": "Senior Software Developer",
    "location": "New York, NY"
  }
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "john@example.com",
    "name": "John Smith",
    "profile": {
      "bio": "Senior Software Developer",
      "location": "New York, NY",
      "website": "https://johndoe.com"
    },
    "updatedAt": "2023-12-01T12:30:00.000Z"
  },
  "message": "User updated successfully",
  "timestamp": "2023-12-01T12:30:00.000Z"
}
```

### `DELETE /api/users/[id]`
删除用户

**响应：**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

## 📊 仪表板 API

### `GET /api/dashboard/stats`
获取仪表板统计数据

**查询参数：**
- `period`: 时间周期（day, week, month, year）
- `startDate`: 开始日期（ISO 8601格式）
- `endDate`: 结束日期（ISO 8601格式）

**响应：**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 1250,
      "activeUsers": 890,
      "totalRevenue": 45000,
      "growthRate": 12.5
    },
    "charts": {
      "userGrowth": [
        { "date": "2023-11-01", "users": 100 },
        { "date": "2023-11-02", "users": 105 },
        { "date": "2023-11-03", "users": 110 }
      ],
      "revenue": [
        { "date": "2023-11-01", "amount": 1000 },
        { "date": "2023-11-02", "amount": 1200 },
        { "date": "2023-11-03", "amount": 1100 }
      ]
    }
  },
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

### `GET /api/dashboard/activities`
获取最近活动

**查询参数：**
- `limit`: 返回数量（默认：10，最大：50）
- `type`: 活动类型（login, signup, purchase, etc.）

**响应：**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "activity_123",
        "type": "login",
        "user": {
          "id": "user_123",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "description": "User logged in",
        "timestamp": "2023-12-01T11:45:00.000Z",
        "metadata": {
          "ip": "192.168.1.1",
          "userAgent": "Mozilla/5.0..."
        }
      }
    ]
  },
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

## 🏥 健康检查 API

### `GET /api/health`
系统健康检查

**响应：**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2023-12-01T12:00:00.000Z",
    "version": "1.0.0",
    "uptime": 86400,
    "services": {
      "database": "healthy",
      "auth": "healthy",
      "storage": "healthy"
    }
  },
  "timestamp": "2023-12-01T12:00:00.000Z"
}
```

## 🔧 API 实现示例

### 基础 API 路由模板

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

// 请求验证模式
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
})

const getUsersSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sort: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
})

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    // 认证检查
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      )
    }

    // 参数验证
    const { searchParams } = new URL(request.url)
    const params = getUsersSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      search: searchParams.get('search'),
      sort: searchParams.get('sort'),
      order: searchParams.get('order'),
    })

    // 数据库查询
    let query = supabase
      .from('users')
      .select('id, email, name, image, created_at, updated_at', { count: 'exact' })

    // 搜索过滤
    if (params.search) {
      query = query.or(`name.ilike.%${params.search}%,email.ilike.%${params.search}%`)
    }

    // 排序
    query = query.order(params.sort, { ascending: params.order === 'asc' })

    // 分页
    const from = (params.page - 1) * params.limit
    const to = from + params.limit - 1
    query = query.range(from, to)

    const { data: users, error, count } = await query

    if (error) {
      throw error
    }

    // 成功响应
    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page: params.page,
          limit: params.limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / params.limit),
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('GET /api/users error:', error)

    // 验证错误
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request parameters',
            details: error.errors,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // 服务器错误
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Internal server error',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    // 认证检查
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      )
    }

    // 请求体验证
    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    // 创建用户
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: validatedData.email,
        name: validatedData.name,
        password_hash: await hashPassword(validatedData.password),
      })
      .select('id, email, name, created_at')
      .single()

    if (error) {
      throw error
    }

    // 成功响应
    return NextResponse.json(
      {
        success: true,
        data: user,
        message: 'User created successfully',
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/users error:', error)

    // 验证错误
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.errors,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // 数据库错误
    if (error.code === '23505') { // 唯一约束违反
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_EMAIL',
            message: 'Email already exists',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 409 }
      )
    }

    // 服务器错误
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Internal server error',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
```

## 🔒 API 安全

### 认证中间件
```typescript
// lib/api-auth.ts
import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function requireAuth(request: NextRequest) {
  const session = await auth()
  
  if (!session) {
    throw new Error('Authentication required')
  }
  
  return session
}

export async function requireRole(request: NextRequest, role: string) {
  const session = await requireAuth(request)
  
  if (session.user.role !== role) {
    throw new Error('Insufficient permissions')
  }
  
  return session
}
```

### 速率限制
```typescript
// lib/rate-limit.ts
import { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function rateLimit(request: NextRequest, limit = 10, window = 60000) {
  const ip = request.ip || 'anonymous'
  const now = Date.now()
  const windowStart = now - window
  
  const requests = rateLimitMap.get(ip) || []
  const validRequests = requests.filter(time => time > windowStart)
  
  if (validRequests.length >= limit) {
    throw new Error('Rate limit exceeded')
  }
  
  validRequests.push(now)
  rateLimitMap.set(ip, validRequests)
}
```

## 📝 API 类型定义

```typescript
// types/api.ts
export interface ApiResponse<T = any> {
  success: true
  data: T
  message?: string
  timestamp: string
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
  timestamp: string
}

export interface PaginationParams {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: PaginationParams
}

// 用户相关类型
export interface User {
  id: string
  email: string
  name: string
  image?: string
  profile?: UserProfile
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  bio?: string
  location?: string
  website?: string
}

export interface CreateUserRequest {
  email: string
  name: string
  password: string
}

export interface UpdateUserRequest {
  name?: string
  profile?: Partial<UserProfile>
}
```

这个API参考文档为开发者提供了完整的API使用指南，包括请求格式、响应格式、错误处理和安全考虑。