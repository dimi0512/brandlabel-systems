import { CaseStudiesShowcase } from "@/components/case-studies/CaseStudiesShowcase";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PageShell } from "@/components/PageShell";
import type { Language } from "@/lib/i18n";
import { createCaseStudyMetadata } from "@/lib/caseStudyMetadata";

export const metadata = createCaseStudyMetadata("/case-studies");

export function CaseStudiesPageContent({ language }: { language: Language }) {
  return (
    <PageShell language={language}>
      <section className="bl-case-hero">
        <Container>
          <h1>Built around the way the business works.</h1>
          <p>Selected BrandLabel systems designed to solve specific operational problems.</p>
        </Container>
      </section>

      <CaseStudiesShowcase />

      <section className="bl-case-closing">
        <Container className="bl-case-closing-inner">
          <h2>Your operation won&apos;t look exactly like these. Your system shouldn&apos;t either.</h2>
          <LocalizedLink href="/contact">Discuss your operation →</LocalizedLink>
        </Container>
      </section>
    </PageShell>
  );
}

export default function CaseStudiesPage() {
  return <CaseStudiesPageContent language="en" />;
}
