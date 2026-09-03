import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { PageShell } from "@/components/PageShell";
import { TextFirstHero } from "@/components/home/TextFirstHero";
import { createPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = createPageMetadata("");

const conveniences = [
  {
    icon: "connected",
    title: "One connected workspace",
    text: "The information, people, tasks and documents involved in the operation become easier to find and manage.",
  },
  {
    icon: "simplified",
    title: "Less administration",
    text: "Repeated steps are simplified or automated so your team spends less time maintaining the way work is organised.",
  },
  {
    icon: "visible",
    title: "Clear next actions",
    text: "Follow-ups, approvals, responsibilities and exceptions remain visible instead of depending on memory.",
  },
  {
    icon: "time",
    title: "More time for real work",
    text: "A smoother operation gives people more time for clients, delivery and the decisions that grow the business.",
  },
] as const;

const platformPreviews = [
  {
    title: "Projects and client operations",
    text: "Bring client records, projects, documents, approvals and team responsibilities into one working environment.",
  },
  {
    title: "Scheduling and service delivery",
    text: "Connect appointments, resources, customer history, stock and daily follow-up without adding more disconnected tools.",
  },
  {
    title: "Field and financial visibility",
    text: "Give teams clear actions while management sees activity, exceptions, documents and financial information in context.",
  },
] as const;

function ConvenienceIcon({ name }: { name: (typeof conveniences)[number]["icon"] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "connected") {
    return <svg {...common}><rect x="3.5" y="4" width="8" height="8" rx="2" /><rect x="16.5" y="16" width="8" height="8" rx="2" /><path d="M11.5 8h4a4 4 0 0 1 4 4v4M16.5 20h-4a4 4 0 0 1-4-4v-4" /></svg>;
  }
  if (name === "simplified") {
    return <svg {...common}><path d="M5 8h12M5 14h8M5 20h5" /><path d="m17 18 2.4 2.4L24 15.8" /></svg>;
  }
  if (name === "visible") {
    return <svg {...common}><path d="M3.5 14s3.7-6 10.5-6 10.5 6 10.5 6-3.7 6-10.5 6S3.5 14 3.5 14Z" /><circle cx="14" cy="14" r="2.8" /></svg>;
  }
  return <svg {...common}><circle cx="14" cy="14" r="10" /><path d="M14 8.5V14l3.8 2.4" /></svg>;
}

export default function Home() {
  return (
    <PageShell>
      <TextFirstHero />

      <section id="convenience" className="bl-convenience">
        <Container>
          <div className="bl-convenience-intro">
            <h2>Your business should feel easier to run.</h2>
            <p>
              Not another generic tool. BrandLabel Agency designs tailored business software
              and operational platforms around the way your company actually works—connecting
              information, workflows and automation where they belong.
            </p>
          </div>
          <div className="bl-convenience-grid">
            {conveniences.map((item) => (
              <article key={item.title}>
                <span><ConvenienceIcon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="bl-home-section-action">
            <ButtonLink href="/platforms" variant="outline">
              View how the platform is created
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bl-home-office-teaser" aria-label="What BrandLabel Agency builds">
        <div className="bl-home-office-shade" />
        <Container className="bl-home-office-content">
          <div>
            <h2>Custom business software built around your operation.</h2>
          </div>
          <div>
            <p>
              We start with how the business actually works, then connect the workflows,
              information and customer experience that belong together.
            </p>
            <ButtonLink href="/platforms" variant="light">
              View the complete process
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="examples" className="bl-home-examples">
        <Container>
          <div className="bl-home-section-heading">
            <div>
              <h2>Different businesses. The same need for clarity.</h2>
            </div>
            <p>
              From focused operational systems to complete internal business platforms, the
              scope follows the problem—not a predefined software package.
            </p>
          </div>
          <div className="bl-home-example-cards">
            {platformPreviews.map((platform) => (
              <article key={platform.title}>
                <h3>{platform.title}</h3>
                <p>{platform.text}</p>
              </article>
            ))}
          </div>
          <div className="bl-home-section-action">
            <ButtonLink href="/platforms#examples" variant="dark">
              Explore platform examples
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="options" className="bl-home-options">
        <Container className="bl-home-options-layout">
          <div>
            <h2>Choose the relationship that fits the investment you want to make.</h2>
          </div>
          <div>
            <p>
              Purchase the platform outright, acquire ownership gradually, access it through
              an ongoing service, or keep BrandLabel Agency actively involved as the business evolves.
            </p>
            <ButtonLink href="/commercial-options" variant="dark">
              Compare all commercial options
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bl-home-contact">
        <Container className="bl-home-contact-inner">
          <div>
            <h2>Tell us what feels harder than it should.</h2>
          </div>
          <div>
            <p>
              Request a detailed report, book a consultation, ask to be contacted, or read
              the practical questions clients usually ask before starting.
            </p>
            <ButtonLink href="/contact" variant="light">
              Contact BrandLabel Agency
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="diagnostic" className="bl-home-diagnostic">
        <Container>
          <div>
            <h2>Start with the cost of the problem.</h2>
            <p>
              Answer a few practical questions and receive an immediate estimate of the time
              and employment cost tied to recurring work.
            </p>
            <ButtonLink href="/diagnostic" variant="dark">
              Start the diagnostic
            </ButtonLink>
            <small>No email required to see the result.</small>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
