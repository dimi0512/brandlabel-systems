import { InsightsListing } from "@/components/insights/InsightsListing";
import { createInsightsListingMetadata } from "@/lib/insightsMetadata";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") return {};
  return createInsightsListingMetadata(locale);
}

export default async function LocalizedInsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") notFound();
  return <InsightsListing locale={locale} />;
}
