import { CaseStudiesShowcase } from "@/components/case-studies/CaseStudiesShowcase";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PageShell } from "@/components/PageShell";

export default function CaseStudiesPage() {
  return (
    <PageShell>
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
