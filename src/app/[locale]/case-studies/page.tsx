import { CaseStudiesPageContent } from "@/app/case-studies/page";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";
import { createCaseStudyMetadata } from "@/lib/caseStudyMetadata";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") return {};
  return createCaseStudyMetadata("/case-studies", locale);
}

export default async function LocalizedCaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "fr") notFound();
  return <CaseStudiesPageContent language={locale} />;
}
