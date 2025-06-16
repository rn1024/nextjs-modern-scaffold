"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { locales } from "@/i18n/routing";

const languageNames = {
  en: "English",
  zh: "中文",
} as const;

const languageFlags = {
  en: "🇺🇸",
  zh: "🇨🇳",
} as const;

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languages");

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">
                {languageFlags[loc as keyof typeof languageFlags]}
              </span>
              <span className="text-sm">
                {languageNames[loc as keyof typeof languageNames]}
              </span>
            </div>
            {locale === loc && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}