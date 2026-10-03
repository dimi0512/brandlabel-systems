import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { PageShell } from "@/components/PageShell";
import { caseStudySlugs, getCaseStudy } from "@/lib/caseStudies";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";
import { createCaseStudyMetadata } from "@/lib/caseStudyMetadata";

export function generateStaticParams() {
  return ["en", "nl"].flatMap((locale) =>
    caseStudySlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!isLocale(locale) || locale === "fr" || !caseStudy) return {};
  return createCaseStudyMetadata(`/case-studies/${caseStudy.slug}`, locale);
}

export default async function LocalizedCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!isLocale(locale) || locale === "fr" || !caseStudy) notFound();

  return (
    <PageShell language={locale}>
      <CaseStudyDetail caseStudy={caseStudy} />
    </PageShell>
  );
}
