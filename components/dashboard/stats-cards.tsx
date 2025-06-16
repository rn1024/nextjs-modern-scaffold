"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.value > 0) {
      return <ArrowUpRight className="h-3 w-3" />;
    } else if (trend.value < 0) {
      return <ArrowDownRight className="h-3 w-3" />;
    } else {
      return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return "";
    
    if (trend.value > 0) {
      return "text-green-600 dark:text-green-400";
    } else if (trend.value < 0) {
      return "text-red-600 dark:text-red-400";
    } else {
      return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          <CardDescription className="text-xs">{description}</CardDescription>
          {trend && (
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs flex items-center gap-1",
                getTrendColor()
              )}
            >
              {getTrendIcon()}
              {Math.abs(trend.value)}%
            </Badge>
          )}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const t = useTranslations("dashboard.stats");

  // Mock data for demo purposes
  const stats = [
    {
      title: t("totalUsers"),
      value: "2,350",
      description: t("totalUsersDesc"),
      icon: <Users className="h-4 w-4" />,
      trend: {
        value: 12.5,
        label: t("fromLastMonth"),
      },
    },
    {
      title: t("activeUsers"),
      value: "1,234",
      description: t("activeUsersDesc"),
      icon: <Activity className="h-4 w-4" />,
      trend: {
        value: 8.2,
        label: t("fromLastWeek"),
      },
    },
    {
      title: t("revenue"),
      value: "$12,345",
      description: t("revenueDesc"),
      icon: <DollarSign className="h-4 w-4" />,
      trend: {
        value: -2.1,
        label: t("fromLastMonth"),
      },
    },
    {
      title: t("growth"),
      value: "23.5%",
      description: t("growthDesc"),
      icon: <TrendingUp className="h-4 w-4" />,
      trend: {
        value: 15.3,
        label: t("fromLastQuarter"),
      },
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          className={index === 0 ? "md:col-span-2 lg:col-span-1" : ""}
        />
      ))}
    </div>
  );
}