import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { CaseStudyLocaleSync } from "@/components/case-studies/CaseStudyLocaleSync";
import { PageShell } from "@/components/PageShell";
import { caseStudySlugs, getCaseStudy } from "@/lib/caseStudies";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ["fr", "nl"].flatMap((locale) =>
    caseStudySlugs.map((slug) => ({ locale, slug })),
  );
}

export default async function LocalizedCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!isLocale(locale) || locale === "en" || !caseStudy) notFound();

  return (
    <PageShell>
      <CaseStudyLocaleSync language={locale} />
      <CaseStudyDetail caseStudy={caseStudy} />
    </PageShell>
  );
}
