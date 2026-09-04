import type { Metadata } from "next";
import type { InsightArticle } from "@/lib/insights";
import { getInsightArticleAlternates } from "@/lib/insights";
import {
  localizedAlternates,
  localizedUrl,
  SITE_NAME,
  type Locale,
} from "@/lib/seo";

const listingSeo: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Business Operations & Custom Software Insights | BrandLabel",
    description: "Practical insights from BrandLabel on business processes, custom software and automation that create real operational value.",
  },
  fr: {
    title: "Processus, logiciel sur mesure & automatisation | BrandLabel",
    description: "Des analyses pratiques de BrandLabel sur les processus d’entreprise, le logiciel sur mesure et l’automatisation au service d’une réelle valeur opérationnelle.",
  },
  nl: {
    title: "Bedrijfsprocessen, software op maat & automatisering | BrandLabel",
    description: "Praktische inzichten van BrandLabel over bedrijfsprocessen, software op maat en automatisering die echte operationele waarde creëren.",
  },
};

function socialMetadata(title: string, description: string, url: string, locale: Locale) {
  return {
    openGraph: {
      type: "website" as const,
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: locale === "fr" ? "fr_FR" : locale === "nl" ? "nl_NL" : "en_GB",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BrandLabel Agency operational platform preview" }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export function createInsightsListingMetadata(locale: Locale = "en"): Metadata {
  const seo = listingSeo[locale];
  const url = localizedUrl("/insights", locale);

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: url,
      languages: localizedAlternates("/insights"),
    },
    ...socialMetadata(seo.title, seo.description, url, locale),
  };
}

export function createInsightArticleMetadata(article: InsightArticle): Metadata {
  const route = `/insights/${article.slug}`;
  const url = localizedUrl(route, article.locale);
  const equivalents = getInsightArticleAlternates(article);
  const languages = Object.fromEntries(
    equivalents.map((equivalent) => [
      equivalent.locale,
      localizedUrl(`/insights/${equivalent.slug}`, equivalent.locale),
    ]),
  );
  const englishEquivalent = equivalents.find((equivalent) => equivalent.locale === "en");
  if (englishEquivalent) {
    languages["x-default"] = localizedUrl(
      `/insights/${englishEquivalent.slug}`,
      "en",
    );
  }

  return {
    title: { absolute: article.metadata.title },
    description: article.metadata.description,
    alternates: {
      canonical: url,
      languages: Object.keys(languages).length > 1 ? languages : undefined,
    },
    ...socialMetadata(article.metadata.title, article.metadata.description, url, article.locale),
  };
}
