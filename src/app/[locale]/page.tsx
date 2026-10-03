import { HomePageContent } from "@/app/page";
import { createPageMetadata } from "@/lib/pageMetadata";
import { isLocale, type Locale } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") notFound();
  return createPageMetadata("", locale as Locale);
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") notFound();
  return <HomePageContent language={locale} />;
}
