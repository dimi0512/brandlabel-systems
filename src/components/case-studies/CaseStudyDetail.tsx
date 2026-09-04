import Image from "next/image";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import { CaseStudyScreenSlider } from "@/components/case-studies/CaseStudyScreenSlider";
import type { CaseStudy, CaseStudyImage } from "@/lib/caseStudies";

function SupportingImage({ image, dark = false }: { image: CaseStudyImage; dark?: boolean }) {
  return (
    <figure className={`bl-study-supporting-image${dark ? " is-dark" : ""}`}>
      <div>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 899px) calc(100vw - 2.5rem), 52vw"
        />
      </div>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function CompactCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className={`bl-study bl-study-compact bl-study-compact-${caseStudy.slug}`}>
      <header className="bl-study-hero bl-study-compact-hero">
        <Container>
          <LocalizedLink className="bl-study-back" href="/case-studies">
            ← All case studies
          </LocalizedLink>
          <p className="bl-study-eyebrow">{caseStudy.eyebrow}</p>
          <h1>{caseStudy.title}</h1>
          <div className="bl-study-compact-copy">
            <p>{caseStudy.summary}</p>
            {caseStudy.compactIntro ? <p>{caseStudy.compactIntro}</p> : null}
          </div>
        </Container>
      </header>

      {caseStudy.screens ? (
        <section className="bl-study-compact-slider-section">
          <Container>
            <CaseStudyScreenSlider screens={caseStudy.screens} />
            <p className="bl-study-disclosure">{caseStudy.confidentiality}</p>
          </Container>
        </section>
      ) : null}

      <section className="bl-study-scope">
        <Container>
          <h2>One system across the operation.</h2>
          <div className="bl-study-scope-grid">
            {caseStudy.scopeGroups?.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="bl-study-scope-summary">
            {caseStudy.scopeSummary}
          </p>
        </Container>
      </section>

      <section className="bl-study-comparison">
        <Container className="bl-study-comparison-grid">
          <div className="bl-study-comparison-copy">
            <div>
              <p className="bl-study-section-label">BEFORE</p>
              <p>{caseStudy.before}</p>
            </div>
            <div>
              <p className="bl-study-section-label">AFTER</p>
              <p>{caseStudy.after}</p>
            </div>
          </div>
          <aside className="bl-study-payroll-result">
            <span>{caseStudy.resultLabel}</span>
            <strong>{caseStudy.resultValue}</strong>
          </aside>
        </Container>
      </section>

      <section className="bl-study-cta bl-study-compact-cta">
        <Container className="bl-study-cta-grid">
          <h2>Your operation will be different. The system should be too.</h2>
          <LocalizedLink href="/contact">Discuss your operation →</LocalizedLink>
        </Container>
      </section>
    </article>
  );
}

export function CaseStudyDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  if (caseStudy.screens && caseStudy.scopeGroups) {
    return <CompactCaseStudy caseStudy={caseStudy} />;
  }

  return (
    <article className="bl-study">
      <header className="bl-study-hero">
        <Container>
          <LocalizedLink className="bl-study-back" href="/case-studies">
            ← All case studies
          </LocalizedLink>
          <p className="bl-study-eyebrow">{caseStudy.eyebrow}</p>
          <h1>{caseStudy.title}</h1>
          <p className="bl-study-summary">{caseStudy.summary}</p>
        </Container>
      </header>

      <section className="bl-study-facts" aria-label="Project summary">
        <Container>
          <dl>
            {caseStudy.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bl-study-visual bl-study-visual-primary">
        <Container>
          <div className="bl-study-screen-frame">
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.heroImageAlt}
              width={caseStudy.heroImageWidth}
              height={caseStudy.heroImageHeight}
              sizes="(max-width: 899px) calc(100vw - 2.5rem), 92vw"
              priority
            />
          </div>
          <p className="bl-study-disclosure">{caseStudy.confidentiality}</p>
        </Container>
      </section>

      <section className="bl-study-problem">
        {caseStudy.supportingImages?.problem ? (
          <Container className="bl-study-story-grid">
            <div className="bl-study-story-copy">
              <p className="bl-study-section-label">THE OPERATIONAL PROBLEM</p>
              <h2>{caseStudy.problemTitle}</h2>
              <p>{caseStudy.problem}</p>
            </div>
            <SupportingImage image={caseStudy.supportingImages.problem} />
          </Container>
        ) : (
          <Container className="bl-study-two-column">
            <p className="bl-study-section-label">THE OPERATIONAL PROBLEM</p>
            <div>
              <h2>{caseStudy.problemTitle}</h2>
              <p>{caseStudy.problem}</p>
            </div>
          </Container>
        )}
      </section>

      <section className="bl-study-solution">
        <Container>
          {caseStudy.supportingImages?.solution ? (
            <div className="bl-study-story-grid bl-study-story-grid-reverse">
              <SupportingImage image={caseStudy.supportingImages.solution} />
              <div className="bl-study-story-copy">
                <p className="bl-study-section-label">THE CUSTOM SYSTEM</p>
                <h2>{caseStudy.solutionTitle}</h2>
                <p>{caseStudy.solution}</p>
              </div>
            </div>
          ) : (
            <div className="bl-study-solution-heading">
              <p className="bl-study-section-label">THE CUSTOM SYSTEM</p>
              <h2>{caseStudy.solutionTitle}</h2>
              <p>{caseStudy.solution}</p>
            </div>
          )}
          <ul className="bl-study-capabilities" aria-label="System capabilities">
            {caseStudy.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bl-study-workflow">
        <Container>
          {caseStudy.supportingImages?.workflow ? (
            <div className="bl-study-story-grid">
              <div className="bl-study-story-copy">
                <p className="bl-study-section-label">THE CONNECTED WORKFLOW</p>
                <h2>{caseStudy.workflowTitle}</h2>
              </div>
              <SupportingImage image={caseStudy.supportingImages.workflow} />
            </div>
          ) : (
            <>
              <p className="bl-study-section-label">THE CONNECTED WORKFLOW</p>
              <h2>{caseStudy.workflowTitle}</h2>
            </>
          )}
          <ol>
            {caseStudy.workflow.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {caseStudy.secondaryImage ? (
        <section className="bl-study-secondary-visual">
          <Container className="bl-study-secondary-grid">
            <div className="bl-study-secondary-copy">
              <p className="bl-study-section-label">IN DAILY USE</p>
              <p>{caseStudy.secondaryCaption}</p>
            </div>
            <div className={`bl-study-secondary-frame bl-study-secondary-frame-${caseStudy.slug}`}>
              <Image
                src={caseStudy.secondaryImage}
                alt={caseStudy.secondaryImageAlt ?? ""}
                width={caseStudy.secondaryImageWidth}
                height={caseStudy.secondaryImageHeight}
                sizes="(max-width: 899px) calc(100vw - 2.5rem), 62vw"
              />
            </div>
          </Container>
        </section>
      ) : caseStudy.secondaryCaption && caseStudy.supportingImages?.role ? (
        <section className="bl-study-secondary-visual">
          <Container className="bl-study-secondary-grid">
            <div className="bl-study-secondary-copy">
              <p className="bl-study-section-label">IN DAILY USE</p>
              <p>{caseStudy.secondaryCaption}</p>
            </div>
            <SupportingImage image={caseStudy.supportingImages.role} />
          </Container>
        </section>
      ) : caseStudy.secondaryCaption ? (
        <section className="bl-study-role-note">
          <Container className="bl-study-role-inner">
            <p>{caseStudy.secondaryCaption}</p>
          </Container>
        </section>
      ) : null}

      <section className="bl-study-outcome">
        <Container className={`bl-study-outcome-grid${caseStudy.supportingImages?.outcome ? " has-image" : ""}`}>
          <div>
            <p className="bl-study-section-label">THE OUTCOME</p>
            <strong>{caseStudy.outcomeValue}</strong>
            <span>{caseStudy.outcomeLabel}</span>
          </div>
          <p>{caseStudy.outcome}</p>
          {caseStudy.supportingImages?.outcome ? (
            <SupportingImage image={caseStudy.supportingImages.outcome} dark />
          ) : null}
        </Container>
      </section>

      <section className="bl-study-cta">
        <Container className="bl-study-cta-grid">
          <h2>Your operation will be different. The system should be too.</h2>
          <LocalizedLink href="/contact">Discuss your operation →</LocalizedLink>
        </Container>
      </section>
    </article>
  );
}
