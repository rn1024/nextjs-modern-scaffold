"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail, Loader2, Eye, EyeOff } from "lucide-react";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const { toast } = useToast();
  const t = useTranslations("auth");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: t("register.error"),
        description: t("register.nameRequired"),
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: t("register.error"),
        description: t("register.emailRequired"),
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        title: t("register.error"),
        description: t("register.passwordTooShort"),
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t("register.error"),
        description: t("register.passwordMismatch"),
        variant: "destructive",
      });
      return false;
    }

    if (!formData.acceptTerms) {
      toast({
        title: t("register.error"),
        description: t("register.acceptTermsRequired"),
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Here you would typically call your registration API
      // For demo purposes, we'll simulate a registration process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t("register.success"),
        description: t("register.accountCreated"),
      });
      
      // Automatically sign in after successful registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result?.error) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast({
        title: t("register.error"),
        description: t("register.somethingWrong"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthRegister = async (provider: "github" | "google") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        title: t("register.error"),
        description: t("register.somethingWrong"),
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
          onClick={() => handleOAuthRegister("github")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          {t("register.continueWithGithub")}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthRegister("google")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          {t("register.continueWithGoogle")}
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("register.orContinueWith")}
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleEmailRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("register.name")}</Label>
          <Input
            id="name"
            type="text"
            placeholder={t("register.namePlaceholder")}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t("register.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("register.emailPlaceholder")}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">{t("register.password")}</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("register.passwordPlaceholder")}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              disabled={isLoading}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("register.passwordHint")}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t("register.confirmPassword")}</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("register.confirmPasswordPlaceholder")}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              required
              disabled={isLoading}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="terms" className="text-sm">
            {t("register.acceptTerms")}{" "}
            <a href="/terms" className="text-primary hover:underline">
              {t("register.termsOfService")}
            </a>{" "}
            {t("register.and")}{" "}
            <a href="/privacy" className="text-primary hover:underline">
              {t("register.privacyPolicy")}
            </a>
          </Label>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("register.createAccount")}
        </Button>
      </form>
    </div>
  );
}