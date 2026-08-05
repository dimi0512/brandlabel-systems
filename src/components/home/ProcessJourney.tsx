import { Container } from "@/components/Container";

const processSteps = [
  {
    number: "01",
    short: "Understand",
    title: "Understand the operation.",
    text: "We begin with the business as it operates today—not with a predetermined software solution. We examine how work moves between people, tools and decisions, and identify where time, information or accountability is being lost.",
    details: ["Map the complete workflow", "Review existing tools and data", "Identify friction, repetition and risk"],
    output: "A practical operational blueprint",
  },
  {
    number: "02",
    short: "Define",
    title: "Define the right system.",
    text: "The findings become a clear system plan. Together, we decide what should remain, what should connect, what can be automated and which parts of the operation need a completely new working environment.",
    details: ["Prioritise the highest-value improvements", "Define modules, roles and integrations", "Agree the delivery and commercial model"],
    output: "An agreed platform scope and roadmap",
  },
  {
    number: "03",
    short: "Build",
    title: "Build around real work.",
    text: "The platform is built around real responsibilities and real working situations. Each module is developed, reviewed and refined as part of one connected system rather than as an isolated feature.",
    details: ["Build the core workflows and interfaces", "Test permissions, automation and edge cases", "Review progress through working versions"],
    output: "A tested platform ready for implementation",
  },
  {
    number: "04",
    short: "Launch & evolve",
    title: "Launch, support and evolve.",
    text: "We prepare the environment, introduce it to the people who will use it and support the move into daily operation. After launch, BrandLabel can maintain the platform or remain actively involved in its evolution.",
    details: ["Configure, migrate and prepare for launch", "Support onboarding and adoption", "Maintain or improve under your chosen model"],
    output: "A live operational environment with a clear future",
  },
] as const;

export function ProcessJourney() {
  return (
    <section
      className="bl-process-calm"
      aria-labelledby="process-journey-title"
    >
      <div className="bl-process-calm-backdrop" aria-hidden="true" />
      <Container className="bl-process-calm-shell">
        <header className="bl-process-calm-header">
          <div>
            <p className="bl-process-eyebrow">How a platform takes shape</p>
            <h2 id="process-journey-title">A clear path from operational problem to working system.</h2>
          </div>
          <p>Four deliberate stages keep every decision connected to the way your business actually works.</p>
        </header>

        <div className="bl-process-calm-grid">
          {processSteps.map((step) => (
            <article key={step.number} className="bl-process-calm-card">
              <div className="bl-process-calm-card-head">
                <span aria-hidden="true" />
                <p>{step.short}</p>
              </div>
              <div className="bl-process-calm-card-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ul>
                  {step.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                <footer><span>Outcome</span>{step.output}</footer>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
