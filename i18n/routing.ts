import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh"],

  // Used when no locale matches
  defaultLocale: "en",

  // The prefix for the default locale
  localePrefix: "as-needed",

  // Define pathnames for each locale
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      zh: "/about",
    },
    "/contact": {
      en: "/contact",
      zh: "/contact",
    },
    "/dashboard": "/dashboard",
    "/login": "/login",
    "/register": "/register",
  },
});

// Export locales for use in components
export const locales = routing.locales;

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);