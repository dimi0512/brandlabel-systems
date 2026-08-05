export const SITE_URL = "https://www.brandlabelagency.com";
export const SITE_NAME = "BrandLabel Agency";

export const siteUrl = new URL(SITE_URL);

export const locales = ["en", "fr", "nl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const publicRoutes = [
  "",
  "/platforms",
  "/commercial-options",
  "/diagnostic",
  "/free-operational-audit",
  "/contact",
  "/privacy",
] as const;
export type PublicRoute = (typeof publicRoutes)[number];

export function absoluteUrl(path = "") {
  return new URL(path || "/", siteUrl).toString().replace(/\/$/, "");
}

export function localizedPath(route: PublicRoute | string, locale: Locale = defaultLocale) {
  const cleanRoute = route === "/" ? "" : route;
  if (locale === defaultLocale) return cleanRoute || "/";
  return `/${locale}${cleanRoute}`;
}

export function localizedUrl(route: PublicRoute | string, locale: Locale = defaultLocale) {
  return absoluteUrl(localizedPath(route, locale));
}

export function localizedAlternates(route: PublicRoute | string) {
  return {
    en: localizedUrl(route, "en"),
    fr: localizedUrl(route, "fr"),
    nl: localizedUrl(route, "nl"),
    "x-default": localizedUrl(route, "en"),
  };
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
