import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { PageShell } from "@/components/PageShell";
import { createPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = createPageMetadata("/commercial-options");

const models = [
  {
    title: "Buy outright",
    statement: "Own the agreed delivered platform after final payment.",
    description:
      "The client pays the full agreed project price. Hosting, maintenance, support and future development remain optional and are quoted separately.",
    included: ["Ownership after final payment", "Agreed platform and code transfer", "Optional ongoing support"],
  },
  {
    title: "Build-to-own",
    statement: "Spread the acquisition over an agreed period.",
    description:
      "The client gradually purchases ownership through a higher monthly payment, normally over an agreed period between 12 and 36 months.",
    included: ["Predictable acquisition payments", "Ownership after the agreed term and any final ownership payment", "Optional maintenance after transfer"],
  },
  {
    title: "Platform Access",
    statement: "Pay for continued use without purchasing the code.",
    description:
      "A lower ongoing subscription keeps the platform available, maintained and supported while BrandLabel Agency retains ownership of the platform.",
    included: ["Hosting, security and backups", "Monitoring, fixes and support", "Client data export when access ends"],
  },
  {
    title: "Continuous Platform Partnership",
    statement: "Keep BrandLabel actively involved as the operation evolves.",
    description:
      "This includes Platform Access together with regular operational reviews, proactive recommendations, priority support and an agreed level of continued improvement.",
    included: ["Operational reviews and guidance", "Relevant shared improvements", "Larger custom work scoped separately"],
  },
] as const;

export default function CommercialOptionsPage() {
  return (
    <PageShell>
      <section className="bl-detail-hero bl-commercial-hero">
        <Container>
          <h1>Choose how you want to invest in your platform.</h1>
          <p>
            The platform is scoped around your operation first. We then structure the
            commercial relationship around the level of ownership, access and continued
            involvement that makes sense for the business.
          </p>
          <ButtonLink href="/contact" variant="dark">
            Discuss the right model
          </ButtonLink>
        </Container>
      </section>

      <section className="bl-commercial-models">
        <Container>
          <div className="bl-commercial-models-intro">
            <h2>Clear differences without artificial packages.</h2>
            <p>
              Pricing depends on scope, workflows, users, integrations, migration,
              infrastructure and the selected ownership model.
            </p>
          </div>
          <div className="bl-commercial-model-grid">
            {models.map((model) => (
              <article key={model.title}>
                <h3>{model.title}</h3>
                <strong>{model.statement}</strong>
                <p>{model.description}</p>
                <ul>
                  {model.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bl-commercial-principles">
        <Container className="bl-commercial-principles-layout">
          <div className="bl-commercial-principles-heading">
            <h2>Your data remains yours.</h2>
            <p>
              Whichever relationship you choose, ownership, responsibilities and the
              limits of the service are made clear before work begins.
            </p>
          </div>
          <div className="bl-commercial-principles-grid">
            <article>
              <h3>Business data</h3>
              <p>
                The client owns its business data under every model. Access, export,
                retention and deletion responsibilities are confirmed in the agreement.
              </p>
            </article>
            <article>
              <h3>Functional changes</h3>
              <p>
                New workflows, modules, integrations and substantial custom development
                are quoted separately unless a written allowance is included.
              </p>
            </article>
            <article>
              <h3>Contract terms</h3>
              <p>
                Minimum term, notice, ownership transfer, early termination charges and
                transition assistance are stated in the individual proposal and contract.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="bl-commercial-final">
        <Container>
          <h2>The right model follows the right scope.</h2>
          <p>
            Tell us what the business needs to achieve and how you would prefer to invest.
            We will explain the suitable options before a proposal is prepared.
          </p>
          <ButtonLink href="/contact" variant="light">
            Start the conversation
          </ButtonLink>
        </Container>
      </section>
    </PageShell>
  );
}
