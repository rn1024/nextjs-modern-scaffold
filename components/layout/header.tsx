"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { Link } from "@/i18n/routing";
import { 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Home, 
  BarChart3,
  FileText,
  HelpCircle,
  Zap
} from "lucide-react";
import { getInitials } from "@/lib/utils";

export function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  const navigation = [
    {
      name: t("home"),
      href: "/",
      icon: Home,
    },
    {
      name: t("dashboard"),
      href: "/dashboard",
      icon: BarChart3,
      requireAuth: true,
    },
    {
      name: t("docs"),
      href: "/docs",
      icon: FileText,
    },
    {
      name: t("help"),
      href: "/help",
      icon: HelpCircle,
    },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="hidden font-bold sm:inline-block">
              NextJS Scaffold
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              if (item.requireAuth && !session) return null;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme & Language Toggles */}
          <div className="hidden sm:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* User Menu or Auth Buttons */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>
                      {getInitials(session.user?.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    {t("dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t("signIn")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">{t("signUp")}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                size="sm"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6">
                {/* Mobile Logo */}
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="font-bold">NextJS Scaffold</span>
                </Link>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => {
                    if (item.requireAuth && !session) return null;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile User Section */}
                {session ? (
                  <div className="border-t pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback>
                          {getInitials(session.user?.name || "User")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{session.user?.name}</p>
                        <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" className="justify-start" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/profile">
                          <User className="mr-2 h-4 w-4" />
                          {t("profile")}
                        </Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          {t("settings")}
                        </Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("signOut")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-6 flex flex-col gap-2">
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link href="/login">{t("signIn")}</Link>
                    </Button>
                    <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                      <Link href="/register">{t("signUp")}</Link>
                    </Button>
                  </div>
                )}

                {/* Mobile Theme & Language */}
                <div className="border-t pt-6 flex items-center justify-between">
                  <span className="text-sm font-medium">Preferences</span>
                  <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}