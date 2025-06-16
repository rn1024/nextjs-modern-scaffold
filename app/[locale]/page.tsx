import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Link } from "@/i18n/routing";
import { 
  Shield, 
  Globe, 
  Palette, 
  Code, 
  Zap, 
  Heart,
  ArrowRight,
  Github,
  Star
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="outline" className="mb-4">
                <Star className="mr-1 h-3 w-3" />
                Production Ready
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <HomeTitle />
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                <HomeSubtitle />
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    <HomeGetStarted />
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/yourusername/nextjs-modern-scaffold" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    <HomeLearnMore />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <FeaturesTitle />
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to build modern web applications
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Shield className="h-8 w-8" />}
                title={<AuthTitle />}
                description={<AuthDescription />}
                color="text-blue-500"
              />
              <FeatureCard
                icon={<Globe className="h-8 w-8" />}
                title={<I18nTitle />}
                description={<I18nDescription />}
                color="text-green-500"
              />
              <FeatureCard
                icon={<Palette className="h-8 w-8" />}
                title={<UITitle />}
                description={<UIDescription />}
                color="text-purple-500"
              />
              <FeatureCard
                icon={<Code className="h-8 w-8" />}
                title={<DXTitle />}
                description={<DXDescription />}
                color="text-orange-500"
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Modern Tech Stack
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Built with the latest and greatest technologies
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center rounded-lg border bg-background p-6 text-center transition-colors hover:bg-muted/50"
                >
                  <div className="mb-3 text-2xl">{tech.icon}</div>
                  <h3 className="font-semibold">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clone the repository and start building your next project today.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    <Zap className="mr-2 h-4 w-4" />
                    <HomeGetStarted />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/yourusername/nextjs-modern-scaffold" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Client components for translations
function HomeTitle() {
  const t = useTranslations("home");
  return <>{t("title")}</>;
}

function HomeSubtitle() {
  const t = useTranslations("home");
  return <>{t("subtitle")}</>;
}

function HomeGetStarted() {
  const t = useTranslations("home.cta");
  return <>{t("primary")}</>;
}

function HomeLearnMore() {
  const t = useTranslations("home.cta");
  return <>{t("secondary")}</>;
}

function FeaturesTitle() {
  const t = useTranslations("home.features");
  return <>{t("title")}</>;
}

function AuthTitle() {
  const t = useTranslations("home.features.auth");
  return <>{t("title")}</>;
}

function AuthDescription() {
  const t = useTranslations("home.features.auth");
  return <>{t("description")}</>;
}

function I18nTitle() {
  const t = useTranslations("home.features.i18n");
  return <>{t("title")}</>;
}

function I18nDescription() {
  const t = useTranslations("home.features.i18n");
  return <>{t("description")}</>;
}

function UITitle() {
  const t = useTranslations("home.features.ui");
  return <>{t("title")}</>;
}

function UIDescription() {
  const t = useTranslations("home.features.ui");
  return <>{t("description")}</>;
}

function DXTitle() {
  const t = useTranslations("home.features.dx");
  return <>{t("title")}</>;
}

function DXDescription() {
  const t = useTranslations("home.features.dx");
  return <>{t("description")}</>;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className={`mx-auto mb-4 ${color}`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

const techStack = [
  {
    name: "Next.js 15",
    description: "React Framework",
    icon: "⚡",
  },
  {
    name: "TypeScript",
    description: "Type Safety",
    icon: "🔷",
  },
  {
    name: "Tailwind CSS",
    description: "Styling",
    icon: "🎨",
  },
  {
    name: "Shadcn UI",
    description: "Components",
    icon: "🧩",
  },
  {
    name: "NextAuth.js",
    description: "Authentication",
    icon: "🔐",
  },
  {
    name: "Supabase",
    description: "Database",
    icon: "🗄️",
  },
  {
    name: "next-intl",
    description: "i18n",
    icon: "🌍",
  },
  {
    name: "Framer Motion",
    description: "Animation",
    icon: "🎭",
  },
];