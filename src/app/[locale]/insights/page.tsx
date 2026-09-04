import { InsightsListing } from "@/components/insights/InsightsListing";
import { createInsightsListingMetadata } from "@/lib/insightsMetadata";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "nl" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  return createInsightsListingMetadata(locale);
}

export default async function LocalizedInsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <InsightsListing locale={locale} />;
}
