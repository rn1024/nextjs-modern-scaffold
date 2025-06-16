# 🚀 NextJS Modern Scaffold

> Modern Next.js 15 Scaffold with TypeScript, Tailwind CSS, Shadcn UI, NextAuth, Supabase, i18n, and AI Integration - Production Ready Template

## ✨ Features

### 🔐 Authentication System
- **NextAuth 5.0** - Latest authentication solution
- **OAuth Providers** - Google, GitHub integration
- **Session Management** - Secure user sessions
- **Protected Routes** - Route-level authentication

### 🌍 Internationalization
- **13 Languages** - Comprehensive language support
- **Dynamic Routing** - Locale-based URL routing
- **Language Switcher** - Easy language switching
- **Type-safe Translations** - TypeScript integration

### 🎨 Modern UI System
- **Shadcn UI** - Beautiful, accessible components
- **Dark/Light Theme** - System preference support
- **Responsive Design** - Mobile-first approach
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### 🛠️ Developer Experience
- **TypeScript** - Full type safety
- **ESLint + Prettier** - Code quality tools
- **Hot Reload** - Fast development
- **Path Aliases** - Clean imports
- **Form Validation** - React Hook Form + Zod

### 🚀 Production Ready
- **Next.js 15** - Latest features and optimizations
- **App Router** - Modern routing system
- **Supabase** - Backend as a Service
- **Environment Config** - Secure configuration
- **Performance Optimized** - Built for speed

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Authentication**: NextAuth.js 5.0
- **Database**: Supabase
- **Internationalization**: next-intl
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## 📦 Quick Start

### Prerequisites

- Node.js 18+ 
- **pnpm** (Required - This project uses pnpm as the package manager)
- Git

> ⚠️ **Important**: This project requires pnpm. Please install pnpm globally:
> ```bash
> npm install -g pnpm
> ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-modern-scaffold.git
   cd nextjs-modern-scaffold
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   
   > ⚠️ **Note**: This project uses pnpm exclusively. Do not use npm or yarn as it may cause dependency conflicts.

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - `SUPABASE_URL` and `SUPABASE_ANON_KEY`
   - `AUTH_SECRET` (generate with `openssl rand -base64 32`)
   - OAuth provider credentials (Google, GitHub)

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextjs-modern-scaffold/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── (auth)/        # Authentication pages
│   │   ├── dashboard/     # Protected dashboard
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── theme.css          # Theme variables
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   └── theme/            # Theme components
├── lib/                  # Utility libraries
│   ├── utils.ts          # Helper functions
│   ├── auth.ts           # Auth configuration
│   └── supabase.ts       # Database client
├── i18n/                 # Internationalization
│   ├── messages/         # Translation files
│   ├── routing.ts        # Route configuration
│   └── request.ts        # Request configuration
├── types/                # TypeScript definitions
├── hooks/                # Custom React hooks
└── middleware.ts         # Next.js middleware
```

## 🔧 Configuration

### Authentication Setup

1. **Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins

2. **GitHub OAuth**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Set authorization callback URL

### Database Setup

1. **Supabase**
   - Create account at [Supabase](https://supabase.com/)
   - Create new project
   - Copy URL and anon key to `.env.local`

### Internationalization

Supported locales:
- English (en)
- Chinese Simplified (zh)
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Korean (ko)
- Portuguese (pt)
- Russian (ru)
- Italian (it)
- Dutch (nl)
- Arabic (ar)
- Hindi (hi)

## 📝 Available Scripts

```bash
# Development
pnpm dev             # Start development server
pnpm build           # Build for production
pnpm start           # Start production server

# Code Quality
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix ESLint issues
pnpm format          # Format with Prettier
pnpm format:check    # Check Prettier formatting
pnpm type-check      # TypeScript type checking
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Configure environment variables
4. Deploy automatically

### Other Platforms

- **Netlify**: Configure build command as `pnpm build`
- **Railway**: Use the provided `Dockerfile`
- **DigitalOcean**: Deploy using App Platform

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful UI components
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:

- Open an [issue](https://github.com/yourusername/nextjs-modern-scaffold/issues)
- Start a [discussion](https://github.com/yourusername/nextjs-modern-scaffold/discussions)
- Contact us at [your-email@example.com](mailto:your-email@example.com)

---

**Happy coding! 🎉**