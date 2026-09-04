import { Container } from "@/components/Container";

const companyProof =
  "60+ Companies · 80+ Projects Delivered · 3 Languages · Belgium Based";
const industryProof =
  "Hospitality · Professional Services · Events · Field Operations · Agencies · SMEs";

function MarqueeLine({
  children,
  direction,
  emphasis,
}: {
  children: string;
  direction: "forward" | "reverse";
  emphasis: "primary" | "secondary";
}) {
  return (
    <div
      className={`bl-credibility-marquee bl-credibility-marquee-${emphasis}`}
      aria-hidden="true"
    >
      <div className={`bl-credibility-track bl-credibility-track-${direction}`}>
        {[0, 1].map((group) => (
          <div className="bl-credibility-group" key={group}>
            {[0, 1].map((item) => (
              <span className="bl-credibility-item" key={item}>
                {children}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CredibilityBand() {
  return (
    <section className="bl-credibility" aria-labelledby="credibility-heading">
      <Container>
        <h2 id="credibility-heading">
          Built across different businesses. Designed around each one.
        </h2>
      </Container>

      <div className="bl-credibility-lines">
        <MarqueeLine direction="forward" emphasis="primary">
          {companyProof}
        </MarqueeLine>
        <MarqueeLine direction="reverse" emphasis="secondary">
          {industryProof}
        </MarqueeLine>
      </div>

      <div className="sr-only">
        <p>{companyProof}</p>
        <p>{industryProof}</p>
      </div>
    </section>
  );
}
