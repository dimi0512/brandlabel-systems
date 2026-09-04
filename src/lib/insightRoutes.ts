import type { Locale } from "@/lib/seo";

export const customBusinessSoftwareTranslationKey =
  "custom-business-software-belgium";

export const customBusinessSoftwareSlugs: Record<Locale, string> = {
  en: "custom-business-software-belgium",
  fr: "plateforme-metier-sur-mesure-belgique",
  nl: "software-op-maat-belgie",
};

const insightRoutesByTranslationKey: Record<
  string,
  Record<Locale, string>
> = {
  [customBusinessSoftwareTranslationKey]: customBusinessSoftwareSlugs,
};

export function getLocalizedInsightRoute(
  route: string,
  targetLocale: Locale,
) {
  for (const slugs of Object.values(insightRoutesByTranslationKey)) {
    const isEquivalentRoute = Object.values(slugs).some(
      (slug) => route === `/insights/${slug}`,
    );

    if (isEquivalentRoute) {
      return `/insights/${slugs[targetLocale]}`;
    }
  }

  return null;
}
