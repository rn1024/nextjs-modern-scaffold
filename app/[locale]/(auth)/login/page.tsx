import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Github, Mail } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });

  return {
    title: t("login.title"),
    description: t("login.description"),
  };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("backToHome")}
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo/Brand */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              NextJS Modern Scaffold
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("login.subtitle")}
            </p>
          </div>

          {/* Login Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>{t("login.title")}</CardTitle>
              <CardDescription>
                {t("login.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("login.noAccount")}{" "}
              <Link 
                href="/register" 
                className="font-medium text-primary hover:underline"
              >
                {t("register.title")}
              </Link>
            </p>
          </div>

          {/* Demo Notice */}
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-sm">
                  {t("demo.title")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t("demo.description")}
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Github className="h-3 w-3" />
                    <span>GitHub OAuth</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="h-3 w-3" />
                    <span>Google OAuth</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © 2024 NextJS Modern Scaffold. Built with{" "}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Next.js
            </a>
            {" "}&{" "}
            <a 
              href="https://ui.shadcn.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Shadcn UI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}