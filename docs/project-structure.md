# 📁 NextJS Modern Scaffold 项目结构详解

## 🏗️ 项目架构概览

本项目采用 Next.js 15 App Router 架构，结合现代化的开发工具和最佳实践，构建了一个功能完整、可扩展的全栈应用脚手架。

## 📂 目录结构详解

```
nextjs-modern-scaffold/
├── 📄 配置文件
│   ├── .env.example              # 环境变量示例文件
│   ├── .eslintrc.json            # ESLint 代码质量配置
│   ├── .gitignore                # Git 忽略文件配置
│   ├── .prettierignore           # Prettier 忽略文件配置
│   ├── .prettierrc               # Prettier 代码格式化配置
│   ├── components.json           # Shadcn UI 组件配置
│   ├── middleware.ts             # Next.js 中间件（国际化路由）
│   ├── next.config.mjs           # Next.js 框架配置
│   ├── package.json              # 项目依赖和脚本配置
│   ├── pnpm-lock.yaml            # pnpm 锁定文件
│   ├── postcss.config.mjs        # PostCSS 配置
│   ├── tailwind.config.ts        # Tailwind CSS 配置
│   └── tsconfig.json             # TypeScript 编译配置
│
├── 🚀 应用核心 (app/)
│   ├── [locale]/                 # 国际化路由目录
│   │   ├── (auth)/              # 认证相关页面组
│   │   │   ├── login/           # 登录页面
│   │   │   └── register/        # 注册页面
│   │   ├── dashboard/           # 仪表板页面
│   │   │   ├── page.tsx         # 仪表板主页
│   │   │   └── layout.tsx       # 仪表板布局
│   │   ├── layout.tsx           # 根布局组件
│   │   └── page.tsx             # 首页组件
│   ├── api/                     # API 路由
│   │   └── auth/                # 认证相关 API
│   │       └── [...nextauth]/   # NextAuth 动态路由
│   └── globals.css              # 全局样式文件
│
├── 🔐 认证配置 (auth/)
│   └── index.ts                 # NextAuth 配置文件
│
├── 🧩 组件库 (components/)
│   ├── auth/                    # 认证相关组件
│   │   ├── login-form.tsx       # 登录表单组件
│   │   └── register-form.tsx    # 注册表单组件
│   ├── dashboard/               # 仪表板组件
│   │   ├── quick-actions.tsx    # 快速操作组件
│   │   ├── recent-activity.tsx  # 最近活动组件
│   │   ├── stats-cards.tsx      # 统计卡片组件
│   │   └── user-profile.tsx     # 用户资料组件
│   ├── layout/                  # 布局组件
│   │   ├── footer.tsx           # 页脚组件
│   │   ├── header.tsx           # 页头组件
│   │   └── language-toggle.tsx  # 语言切换组件
│   ├── theme/                   # 主题相关组件
│   │   └── theme-toggle.tsx     # 主题切换组件
│   └── ui/                      # 基础 UI 组件 (Shadcn UI)
│       ├── avatar.tsx           # 头像组件
│       ├── badge.tsx            # 徽章组件
│       ├── button.tsx           # 按钮组件
│       ├── card.tsx             # 卡片组件
│       ├── dropdown-menu.tsx    # 下拉菜单组件
│       ├── input.tsx            # 输入框组件
│       ├── label.tsx            # 标签组件
│       ├── separator.tsx        # 分隔符组件
│       ├── sheet.tsx            # 抽屉组件
│       └── tabs.tsx             # 标签页组件
│
├── 🎣 自定义钩子 (hooks/)
│   └── index.ts                 # 自定义 React Hooks 导出
│
├── 🌍 国际化 (i18n/)
│   ├── messages/                # 翻译文件目录
│   │   ├── en.json              # 英文翻译
│   │   └── zh.json              # 中文翻译
│   ├── request.ts               # 国际化请求配置
│   └── routing.ts               # 国际化路由配置
│
├── 📚 工具库 (lib/)
│   ├── auth.ts                  # 认证工具函数
│   ├── supabase.ts              # Supabase 客户端配置
│   └── utils.ts                 # 通用工具函数
│
├── 📝 类型定义 (types/)
│   ├── global.d.ts              # 全局类型定义
│   ├── index.ts                 # 类型导出文件
│   ├── next-auth.d.ts           # NextAuth 类型扩展
│   └── supabase.ts              # Supabase 类型定义
│
└── 📖 文档 (docs/)
    └── project-structure.md     # 项目结构说明文档
```

## 🔍 核心目录详解

### 📱 App 目录 (`app/`)

采用 Next.js 15 的 App Router 架构：

- **`[locale]/`**: 国际化路由，支持多语言切换
- **`(auth)/`**: 路由组，包含认证相关页面，不影响 URL 结构
- **`api/`**: API 路由，处理服务端逻辑
- **`globals.css`**: 全局样式，包含 Tailwind CSS 基础样式

### 🧩 组件目录 (`components/`)

按功能模块组织的组件库：

- **`ui/`**: 基础 UI 组件，基于 Shadcn UI 和 Radix UI
- **`auth/`**: 认证相关的业务组件
- **`dashboard/`**: 仪表板功能组件
- **`layout/`**: 布局相关组件
- **`theme/`**: 主题切换组件

### 🌍 国际化目录 (`i18n/`)

完整的国际化解决方案：

- **`messages/`**: 各语言的翻译文件
- **`routing.ts`**: 路由国际化配置
- **`request.ts`**: 请求级别的国际化配置

### 📚 工具库目录 (`lib/`)

核心工具和配置：

- **`auth.ts`**: NextAuth 认证配置
- **`supabase.ts`**: 数据库客户端
- **`utils.ts`**: 通用工具函数（包含 cn 函数等）

### 📝 类型定义目录 (`types/`)

TypeScript 类型定义：

- **`global.d.ts`**: 全局类型声明
- **`next-auth.d.ts`**: NextAuth 类型扩展
- **`supabase.ts`**: 数据库类型定义

## 🔧 配置文件说明

### 核心配置

- **`next.config.mjs`**: Next.js 框架配置，包含国际化和构建优化
- **`tailwind.config.ts`**: Tailwind CSS 配置，包含主题和动画
- **`tsconfig.json`**: TypeScript 编译配置，包含路径别名

### 代码质量

- **`.eslintrc.json`**: ESLint 规则配置
- **`.prettierrc`**: 代码格式化规则
- **`components.json`**: Shadcn UI 组件生成配置

### 环境配置

- **`.env.example`**: 环境变量模板
- **`middleware.ts`**: Next.js 中间件，处理国际化路由

## 🚀 架构特点

### 1. 模块化设计
- 按功能模块组织代码
- 清晰的职责分离
- 易于维护和扩展

### 2. 类型安全
- 完整的 TypeScript 支持
- 严格的类型检查
- 类型安全的国际化

### 3. 现代化工具链
- Next.js 15 App Router
- Tailwind CSS 实用优先
- Shadcn UI 组件系统

### 4. 开发体验
- 热重载开发
- 代码质量工具
- 路径别名简化导入

### 5. 生产就绪
- 性能优化配置
- 安全的认证系统
- 完整的国际化支持

## 📋 扩展指南

### 添加新页面
1. 在 `app/[locale]/` 下创建新目录
2. 添加 `page.tsx` 和可选的 `layout.tsx`
3. 更新国际化翻译文件

### 添加新组件
1. 在 `components/` 相应目录下创建组件
2. 遵循现有的命名约定
3. 添加必要的类型定义

### 添加新 API
1. 在 `app/api/` 下创建路由文件
2. 使用 TypeScript 定义请求/响应类型
3. 添加适当的错误处理

### 添加新语言
1. 在 `i18n/messages/` 下添加翻译文件
2. 更新 `i18n/routing.ts` 配置
3. 测试所有页面的翻译

这个项目结构为现代化的 Next.js 应用提供了坚实的基础，支持快速开发和长期维护。