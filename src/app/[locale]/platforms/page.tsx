import { PlatformsPageContent } from "@/app/platforms/page";
import { createPageMetadata } from "@/lib/pageMetadata";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") return {};
  return createPageMetadata("/platforms", locale);
}

export default async function LocalizedPlatformsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") notFound();
  return <PlatformsPageContent language={locale} />;
}
