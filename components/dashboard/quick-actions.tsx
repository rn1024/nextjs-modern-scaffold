"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { 
  Plus, 
  FileText, 
  Users, 
  Settings, 
  Download, 
  Upload,
  BarChart3,
  Mail
} from "lucide-react";

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline-solid" | "secondary";
}

function QuickAction({ 
  title, 
  description, 
  icon, 
  href, 
  onClick, 
  variant = "outline-solid" 
}: QuickActionProps) {
  const content = (
    <Button 
      variant={variant} 
      className="h-auto p-4 flex flex-col items-start text-left space-y-2 w-full"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 w-full">
        <div className="text-primary">{icon}</div>
        <span className="font-medium text-sm">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground text-left">
        {description}
      </p>
    </Button>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

export function QuickActions() {
  const t = useTranslations("dashboard.quickActions");

  const actions = [
    {
      title: t("createProject"),
      description: t("createProjectDesc"),
      icon: <Plus className="h-4 w-4" />,
      href: "/projects/new",
      variant: "default" as const,
    },
    {
      title: t("newDocument"),
      description: t("newDocumentDesc"),
      icon: <FileText className="h-4 w-4" />,
      href: "/documents/new",
    },
    {
      title: t("inviteUsers"),
      description: t("inviteUsersDesc"),
      icon: <Users className="h-4 w-4" />,
      href: "/team/invite",
    },
    {
      title: t("viewAnalytics"),
      description: t("viewAnalyticsDesc"),
      icon: <BarChart3 className="h-4 w-4" />,
      href: "/analytics",
    },
    {
      title: t("exportData"),
      description: t("exportDataDesc"),
      icon: <Download className="h-4 w-4" />,
      onClick: () => {
        // Mock export functionality
        console.log("Exporting data...");
      },
    },
    {
      title: t("importData"),
      description: t("importDataDesc"),
      icon: <Upload className="h-4 w-4" />,
      onClick: () => {
        // Mock import functionality
        console.log("Importing data...");
      },
    },
    {
      title: t("sendNewsletter"),
      description: t("sendNewsletterDesc"),
      icon: <Mail className="h-4 w-4" />,
      href: "/newsletter/compose",
    },
    {
      title: t("manageSettings"),
      description: t("manageSettingsDesc"),
      icon: <Settings className="h-4 w-4" />,
      href: "/settings",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {actions.map((action) => (
            <QuickAction
              key={action.title}
              title={action.title}
              description={action.description}
              icon={action.icon}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}