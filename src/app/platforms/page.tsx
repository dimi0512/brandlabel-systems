import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { OperatingSystemHero } from "@/components/home/OperatingSystemHero";
import { PageShell } from "@/components/PageShell";
import { PlatformsHero } from "@/components/platforms/PlatformsHero";
import { createPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = createPageMetadata("/platforms");

const process = [
  {
    title: "Understand the operation",
    text: "We examine how work moves today, who is involved, which tools are used and where time, visibility or control is being lost.",
  },
  {
    title: "Define the right environment",
    text: "We decide what should remain, what should connect, what should be migrated and what needs to be designed specifically for the business.",
  },
  {
    title: "Build and validate",
    text: "The platform is created around real workflows, permissions and responsibilities, with clear review and approval points throughout development.",
  },
  {
    title: "Launch and evolve",
    text: "We prepare agreed data, test the complete workflow, support adoption and remain available through the maintenance or partnership model selected.",
  },
] as const;

export default function PlatformsPage() {
  return (
    <PageShell>
      <PlatformsHero />

      <section className="bl-platform-process">
        <Container>
          <div className="bl-platform-process-heading">
            <h2>A structured process adapted to each project.</h2>
            <p>
              Scope, timing and approval points are agreed before development. The work
              remains visible and decisions are made with the client throughout.
            </p>
          </div>
          <div className="bl-platform-process-grid">
            {process.map((item) => (
              <article key={item.title}>
                <span aria-hidden>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="m6 12 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bl-platform-migration">
        <Container className="bl-platform-migration-layout">
          <div>
            <h2>Your useful information does not need to be left behind.</h2>
          </div>
          <div>
            <p>
              Existing records can usually be prepared and migrated when they are
              accessible and suitable for transfer. Current tools may also remain
              connected when they provide a reliable API, integration method or export.
            </p>
            <p>
              We assess feasibility, data quality, responsibilities, third-party costs and
              validation requirements before this work is included in the scope.
            </p>
          </div>
        </Container>
      </section>

      <OperatingSystemHero />

      <section className="bl-platform-final">
        <Container>
          <h2>See the workflow that matters to your business.</h2>
          <p>
            Where confidentiality permits, selected platform flows can be presented
            privately using anonymised or fictional demonstration data.
          </p>
          <ButtonLink href="/contact" variant="light">
            Request a demonstration
          </ButtonLink>
        </Container>
      </section>
    </PageShell>
  );
}
