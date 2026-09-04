import { CommercialOptionsPageContent } from "@/app/commercial-options/page";
import { createPageMetadata } from "@/lib/pageMetadata";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "nl" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  return createPageMetadata("/commercial-options", locale);
}

export default async function LocalizedCommercialOptionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <CommercialOptionsPageContent language={locale} />;
}
