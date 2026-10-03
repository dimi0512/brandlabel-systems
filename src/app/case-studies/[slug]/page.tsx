import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { PageShell } from "@/components/PageShell";
import { caseStudySlugs, getCaseStudy } from "@/lib/caseStudies";
import { notFound } from "next/navigation";
import { createCaseStudyMetadata } from "@/lib/caseStudyMetadata";
import { defaultLocale } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return createCaseStudyMetadata(`/case-studies/${caseStudy.slug}`);
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
    <PageShell language={defaultLocale}>
      <CaseStudyDetail caseStudy={caseStudy} />
    </PageShell>
  );
}
