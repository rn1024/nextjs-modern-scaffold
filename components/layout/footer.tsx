"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { 
  Github, 
  Twitter, 
  Mail, 
  Heart,
  Zap,
  ExternalLink
} from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: t("product.features"), href: "/#features" },
      { name: t("product.pricing"), href: "/pricing" },
      { name: t("product.docs"), href: "/docs" },
      { name: t("product.changelog"), href: "/changelog" },
    ],
    company: [
      { name: t("company.about"), href: "/about" },
      { name: t("company.blog"), href: "/blog" },
      { name: t("company.careers"), href: "/careers" },
      { name: t("company.contact"), href: "/contact" },
    ],
    legal: [
      { name: t("legal.privacy"), href: "/privacy" },
      { name: t("legal.terms"), href: "/terms" },
      { name: t("legal.cookies"), href: "/cookies" },
      { name: t("legal.licenses"), href: "/licenses" },
    ],
    resources: [
      { name: t("resources.community"), href: "/community" },
      { name: t("resources.help"), href: "/help" },
      { name: t("resources.status"), href: "/status" },
      { name: t("resources.api"), href: "/api" },
    ],
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/yourusername/nextjs-modern-scaffold",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/yourusername",
      icon: Twitter,
    },
    {
      name: "Email",
      href: "mailto:hello@yoursite.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg">NextJS Scaffold</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t("description")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4">{t("sections.product")}</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">{t("sections.company")}</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">{t("sections.resources")}</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} NextJS Modern Scaffold. {t("copyright")}
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t("madeWith")}</span>
            <Heart className="h-3 w-3 text-red-500" />
            <span>{t("using")}</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Next.js
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}