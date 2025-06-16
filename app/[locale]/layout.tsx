import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { auth } from "@/auth";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const title = (messages as any)?.home?.title || "NextJS Modern Scaffold";
  const description = (messages as any)?.home?.subtitle || "Modern Next.js 15 Scaffold with TypeScript, Tailwind CSS, Shadcn UI, NextAuth, Supabase, i18n, and AI Integration";

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    keywords: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "NextAuth",
      "Supabase",
      "i18n",
      "Scaffold",
      "Template",
    ],
    authors: [{ name: "NextJS Modern Scaffold" }],
    creator: "NextJS Modern Scaffold",
    publisher: "NextJS Modern Scaffold",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "zh-CN": "/zh",
        "es-ES": "/es",
        "fr-FR": "/fr",
        "de-DE": "/de",
        "ja-JP": "/ja",
        "ko-KR": "/ko",
        "pt-BR": "/pt",
        "ru-RU": "/ru",
        "it-IT": "/it",
        "nl-NL": "/nl",
        "ar-SA": "/ar",
        "hi-IN": "/hi",
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: "/",
      title,
      description,
      siteName: title,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@nextjs",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
      yahoo: "yahoo-site-verification-code",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <div className="flex-1">{children}</div>
              </div>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                  },
                }}
              />
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}