"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail, Loader2 } from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const t = useTranslations("auth");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: t("login.error"),
          description: t("login.invalidCredentials"),
          variant: "destructive",
        });
      } else {
        toast({
          title: t("login.success"),
          description: t("login.welcomeBack"),
        });
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast({
        title: t("login.error"),
        description: t("login.somethingWrong"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "github" | "google") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        title: t("login.error"),
        description: t("login.somethingWrong"),
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* OAuth Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthLogin("github")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          {t("login.continueWithGithub")}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthLogin("google")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          {t("login.continueWithGoogle")}
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("login.orContinueWith")}
          </span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t("login.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("login.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("login.password")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("login.signIn")}
        </Button>
      </form>

      {/* Forgot Password */}
      <div className="text-center">
        <Button variant="link" className="text-sm">
          {t("login.forgotPassword")}
        </Button>
      </div>
    </div>
  );
}