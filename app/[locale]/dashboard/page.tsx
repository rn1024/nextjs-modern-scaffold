import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UserProfile } from "@/components/dashboard/user-profile";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { 
  User, 
  Settings, 
  Activity, 
  BarChart3,
  Calendar,
  FileText,
  Users,
  TrendingUp
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  <DashboardWelcome userName={session.user?.name || "User"} />
                </h1>
                <p className="text-muted-foreground">
                  <DashboardSubtitle />
                </p>
              </div>
              <Badge variant="outline" className="hidden sm:flex">
                <TrendingUp className="mr-1 h-3 w-3" />
                <DashboardStatus />
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <DashboardOverview />
                  </CardTitle>
                  <CardDescription>
                    <DashboardOverviewDesc />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="analytics" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="analytics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <DashboardAnalytics />
                      </TabsTrigger>
                      <TabsTrigger value="activity">
                        <Activity className="mr-2 h-4 w-4" />
                        <DashboardActivity />
                      </TabsTrigger>
                      <TabsTrigger value="reports">
                        <FileText className="mr-2 h-4 w-4" />
                        <DashboardReports />
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="analytics" className="mt-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Total Users
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">
                              +12% from last month
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Active Sessions
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">89</div>
                            <p className="text-xs text-muted-foreground">
                              +5% from last hour
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="activity" className="mt-6">
                      <RecentActivity />
                    </TabsContent>
                    <TabsContent value="reports" className="mt-6">
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No reports yet</h3>
                        <p className="text-muted-foreground">
                          Reports will appear here once you start generating them.
                        </p>
                        <Button className="mt-4">
                          Generate Report
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* User Profile */}
              <UserProfile user={session.user} />

              {/* Quick Actions */}
              <QuickActions />

              {/* Recent Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <DashboardRecentActivity />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Profile updated</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New login detected</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Settings changed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Client components for translations
function DashboardWelcome({ userName }: { userName: string }) {
  const t = useTranslations("dashboard");
  return <>{t("welcome", { name: userName })}</>;
}

function DashboardSubtitle() {
  const t = useTranslations("dashboard");
  return <>{t("subtitle")}</>;
}

function DashboardStatus() {
  const t = useTranslations("dashboard");
  return <>{t("status")}</>;
}

function DashboardOverview() {
  const t = useTranslations("dashboard");
  return <>{t("overview")}</>;
}

function DashboardOverviewDescription() {
  const t = useTranslations("dashboard");
  return <>{t("overviewDescription")}</>;
}

function DashboardAnalytics() {
  const t = useTranslations("dashboard");
  return <>{t("analytics")}</>;
}

function DashboardActivity() {
  const t = useTranslations("dashboard");
  return <>{t("activity")}</>;
}

function DashboardReports() {
  const t = useTranslations("dashboard");
  return <>{t("reports")}</>;
}

function DashboardRecentActivity() {
  const t = useTranslations("dashboard");
  return <>{t("recentActivity")}</>;
}