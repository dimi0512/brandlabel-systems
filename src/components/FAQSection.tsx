import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

const questions = [
  {
    question: "What does BrandLabel Agency build?",
    answer:
      "BrandLabel Agency designs custom business software, focused operational systems and complete operational platforms. Depending on the problem, this can include workflows, dashboards, client portals, planning, approvals, documents, integrations, automation and other internal or customer-facing functionality. The scope is defined around how the business actually operates, not around a generic software package.",
  },
  {
    question: "What does the procedure look like?",
    answer:
      "We understand how the operation works today, define the workflows, users, integrations and data involved, prepare the agreed structure, build and test the platform, migrate agreed information, and support launch and adoption. Every project receives its own scope, milestones and approval points.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timing depends on workflow complexity, modules, integrations, migration, client availability and approval speed. A focused operational system may take several weeks, while a broader operational environment may require several months. A realistic milestone plan is agreed before development begins.",
  },
  {
    question: "Can information from our current tools be migrated?",
    answer:
      "Usually, yes. BrandLabel Agency assesses the source, format, quality and volume first. The client provides authorised access and confirms the accuracy and lawful use of the information; BrandLabel handles the agreed preparation, import and validation work.",
  },
  {
    question: "Can the platform connect to tools we already use?",
    answer:
      "Often, yes. Existing accounting, communication, scheduling, document, payment and operational tools may be connected when they provide a suitable API, integration method or reliable export. Feasibility and third-party costs are confirmed during scoping.",
  },
  {
    question: "Who owns our business data?",
    answer:
      "The client owns its business data under every commercial model. BrandLabel Agency does not claim ownership of client data. Access, processing, export, retention and deletion responsibilities are confirmed in the agreement.",
  },
  {
    question: "Who owns the platform and source code?",
    answer:
      "Buy outright transfers ownership after final payment. Build-to-own transfers ownership after the agreed term and any final ownership payment. Platform Access and Continuous Platform Partnership provide continued use of a BrandLabel-held platform and do not transfer the source code.",
  },
  {
    question: "What happens if an access agreement ends?",
    answer:
      "For Platform Access or Continuous Platform Partnership, access ends when the agreement ends. The client can export or receive its business data but does not receive the source code. Minimum term, notice, early termination charges and transition assistance are stated in the proposal and contract.",
  },
  {
    question: "What do hosting, maintenance and support include?",
    answer:
      "The exact setup depends on the platform and commercial model. Platform Access includes hosting, security, backups, monitoring, fixes to existing functionality, maintenance and technical support. New modules, workflows and substantial custom development are assessed separately unless a written allowance is included.",
  },
  {
    question: "Which industries and countries do you work with?",
    answer:
      "BrandLabel Agency works with SMEs across industries and can collaborate worldwide. The important question is whether the operation contains repeated work, fragmented information, avoidable administration or a need for better visibility and control.",
  },
  {
    question: "Can we see a private demonstration?",
    answer:
      "Yes. Where confidentiality permits, BrandLabel Agency can present selected platform flows privately using anonymised or fictional demonstration data. Client identities and protected business information are never disclosed without authorisation.",
  },
] as const;

export function FAQSection() {
  return (
    <section id="faq" className="bl-contact-faq">
      <Container className="bl-contact-faq-layout">
        <div>
          <p className="bl-eyebrow">Frequently asked questions</p>
          <h2>Practical answers before we begin.</h2>
          <p>
            Your proposal and contract will contain the exact scope and legal terms.
            These answers explain the principles that remain consistent.
          </p>
          <ButtonLink href="mailto:contact@brandlabelagency.com" variant="outline">
            Ask another question
          </ButtonLink>
        </div>
        <div className="bl-contact-faq-list">
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                <span>{item.question}</span>
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
                  <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
