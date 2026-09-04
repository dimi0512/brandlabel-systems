import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { CaseStudyLocaleSync } from "@/components/case-studies/CaseStudyLocaleSync";
import { PageShell } from "@/components/PageShell";
import { caseStudySlugs, getCaseStudy } from "@/lib/caseStudies";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <PageShell>
      <CaseStudyLocaleSync language="en" />
      <CaseStudyDetail caseStudy={caseStudy} />
    </PageShell>
  );
}
