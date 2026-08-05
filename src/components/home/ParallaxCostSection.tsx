import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import { SalonWorkspace } from "@/components/home/OperatingSystemHero";

const connectedAreas = [
  ["Customer journey", "Leads, clients, communication, quotes and follow-ups."],
  ["Daily operations", "Projects, appointments, tasks, teams and field activity."],
  ["Business control", "Documents, approvals, reporting, stock and financial visibility."],
  ["Digital experience", "Customer portals, public interfaces, integrations and practical AI."],
];

const buildSteps = [
  ["Understand", "We examine the operation, the people involved and the tools already in use."],
  ["Define", "We decide what should stay, what should connect and what should be rebuilt."],
  ["Build", "We create and test the platform around real workflows and responsibilities."],
  ["Launch", "We introduce it to the team, support adoption and improve it as the business evolves."],
];

export function ParallaxCostSection() {
  return (
    <div className="bl-scroll-office" aria-label="What BrandLabel builds and how">
      <div className="bl-scroll-office-backdrop" aria-hidden="true">
        <div className="bl-scroll-office-photo" />
        <div className="bl-scroll-office-wash" />
        <div className="bl-scroll-office-frame"><i /><i /><i /></div>
      </div>

      <div className="bl-scroll-office-sections">
        <section id="what-we-build" className="bl-office-content-section bl-office-content-intro">
          <Container>
            <div className="bl-office-content-panel">
              <div className="bl-office-intro-heading">
                <div>
                  <p className="bl-office-kicker">What we build</p>
                  <h2>One platform for the work behind your business.</h2>
                </div>
                <div>
                  <p className="bl-office-lead">
                    BrandLabel designs tailored operational platforms that connect the complete flow of work—from
                    first contact to final delivery.
                  </p>
                  <p className="bl-office-support">
                    The platform may include an internal system, a customer portal, a website or public interface,
                    automation and integrations when each part serves the wider operation.
                  </p>
                </div>
              </div>
              <div className="bl-office-connected-grid">
                {connectedAreas.map(([title, text]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="how-it-works" className="bl-office-content-section bl-office-content-process">
          <Container>
            <div className="bl-office-content-panel">
              <div className="bl-office-process-heading">
                <div>
                  <p className="bl-office-kicker">How we build it</p>
                  <h2>We start with the operation. Not the software.</h2>
                </div>
                <p className="bl-office-lead">
                  Your business does not adapt to a template. We understand how the work happens first, then design
                  the system it needs.
                </p>
              </div>
              <ol className="bl-office-process-list">
                {buildSteps.map(([title, text], index) => (
                  <li key={title}>
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
              <LocalizedLink className="bl-office-platform-link" href="/#examples">
                Explore completed platform examples <span>→</span>
              </LocalizedLink>
            </div>
          </Container>
        </section>

        <div className="bl-office-system-transition">
          <div className="bl-office-transition-system" aria-hidden="true">
            <SalonWorkspace />
          </div>
          <div className="bl-office-transition-shade" />
          <Container className="bl-office-transition-copy">
            <p>From operation to working platform</p>
            <h2>Built around your operation.</h2>
            <span>
              A completed BrandLabel platform, reconstructed with fictional data.
              <i>Continue into the real systems</i>
            </span>
          </Container>
        </div>
      </div>

    </div>
  );
}
