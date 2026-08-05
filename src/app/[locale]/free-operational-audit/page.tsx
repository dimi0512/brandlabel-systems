import FreeOperationalAuditPage from "@/app/free-operational-audit/page";
import { createPageMetadata } from "@/lib/pageMetadata";
import { isLocale, type Locale } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  return createPageMetadata("/free-operational-audit", locale as Locale);
}

export default async function LocalizedFreeOperationalAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <FreeOperationalAuditPage />;
}
