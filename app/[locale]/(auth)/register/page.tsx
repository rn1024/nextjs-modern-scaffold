import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Shield, Users, Zap } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });

  return {
    title: t("register.title"),
    description: t("register.description"),
  };
}

export default async function RegisterPage({ params }: Props) {
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
              {t("register.subtitle")}
            </p>
          </div>

          {/* Register Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>{t("register.title")}</CardTitle>
              <CardDescription>
                {t("register.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("register.hasAccount")}{" "}
              <Link 
                href="/login" 
                className="font-medium text-primary hover:underline"
              >
                {t("login.title")}
              </Link>
            </p>
          </div>

          {/* Features */}
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-center">
                  {t("register.features.title")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>{t("register.features.secure")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{t("register.features.community")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Zap className="h-4 w-4 text-orange-500" />
                    <span>{t("register.features.fast")}</span>
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