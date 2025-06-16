"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { 
  FileText, 
  Users, 
  Settings, 
  GitCommit,
  MessageSquare,
  Calendar,
  ExternalLink
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getInitials } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "document" | "user" | "system" | "commit" | "comment" | "event";
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
    email: string;
  };
  metadata?: {
    status?: "success" | "warning" | "error";
    link?: string;
  };
}

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  const iconClass = "h-4 w-4";
  
  switch (type) {
    case "document":
      return <FileText className={iconClass} />;
    case "user":
      return <Users className={iconClass} />;
    case "system":
      return <Settings className={iconClass} />;
    case "commit":
      return <GitCommit className={iconClass} />;
    case "comment":
      return <MessageSquare className={iconClass} />;
    case "event":
      return <Calendar className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
}

function ActivityItemComponent({ item }: { item: ActivityItem }) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        {item.user ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.user.avatar} alt={item.user.name} />
            <AvatarFallback className="text-xs">
              {getInitials(item.user.name)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <ActivityIcon type={item.type} />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground truncate">
            {item.title}
          </p>
          {item.metadata?.status && (
            <Badge 
              variant="secondary" 
              className={`text-xs ${getStatusColor(item.metadata.status)}`}
            >
              {item.metadata.status}
            </Badge>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
          </p>
          
          {item.metadata?.link && (
            <Button variant="ghost" size="sm" className="h-6 px-2" asChild>
              <Link href={item.metadata.link}>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function RecentActivity() {
  const t = useTranslations("dashboard.recentActivity");

  // Mock data for demo purposes
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "document",
      title: t("documentCreated"),
      description: t("documentCreatedDesc"),
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      user: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
        email: "john@example.com",
      },
      metadata: {
        status: "success",
        link: "/documents/123",
      },
    },
    {
      id: "2",
      type: "user",
      title: t("userJoined"),
      description: t("userJoinedDesc"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      user: {
        name: "Jane Smith",
        avatar: "/avatars/jane.jpg",
        email: "jane@example.com",
      },
      metadata: {
        status: "success",
        link: "/team",
      },
    },
    {
      id: "3",
      type: "commit",
      title: t("codeCommitted"),
      description: t("codeCommittedDesc"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      user: {
        name: "Mike Johnson",
        avatar: "/avatars/mike.jpg",
        email: "mike@example.com",
      },
      metadata: {
        status: "success",
        link: "/projects/abc/commits",
      },
    },
    {
      id: "4",
      type: "system",
      title: t("systemUpdate"),
      description: t("systemUpdateDesc"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      metadata: {
        status: "warning",
      },
    },
    {
      id: "5",
      type: "comment",
      title: t("commentAdded"),
      description: t("commentAddedDesc"),
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      user: {
        name: "Sarah Wilson",
        avatar: "/avatars/sarah.jpg",
        email: "sarah@example.com",
      },
      metadata: {
        status: "success",
        link: "/projects/xyz/discussions",
      },
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
      <CardContent className="p-0">
        <div className="space-y-1">
          {activities.map((activity) => (
            <ActivityItemComponent key={activity.id} item={activity} />
          ))}
        </div>
        
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/activity">
              {t("viewAll")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}