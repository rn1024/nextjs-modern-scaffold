"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/routing";
import { User, Settings, Crown, Calendar } from "lucide-react";
import { getInitials, formatDate } from "@/lib/utils";
import type { User as UserType } from "next-auth";

interface UserProfileProps {
  user: UserType | null;
}

export function UserProfile({ user }: UserProfileProps) {
  const t = useTranslations("dashboard");

  if (!user) {
    return null;
  }

  // Mock data for demo purposes
  const userStats = {
    joinDate: "2024-01-15",
    plan: "Pro",
    status: "Active",
    lastLogin: new Date().toISOString(),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {t("userProfile")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Avatar and Basic Info */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className="text-lg">
              {getInitials(user.name || "User")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Crown className="h-3 w-3" />
              {userStats.plan}
            </Badge>
            <Badge 
              variant={userStats.status === "Active" ? "default" : "secondary"}
            >
              {userStats.status}
            </Badge>
          </div>
        </div>

        {/* User Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("joinDate")}</span>
            <span className="font-medium">
              {formatDate(userStats.joinDate)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("lastLogin")}</span>
            <span className="font-medium">
              {formatDate(userStats.lastLogin, { 
                dateStyle: "short", 
                timeStyle: "short" 
              })}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("accountType")}</span>
            <span className="font-medium">{userStats.plan}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              {t("editProfile")}
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              {t("accountSettings")}
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">{t("projects")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">48</div>
            <div className="text-xs text-muted-foreground">{t("tasks")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}