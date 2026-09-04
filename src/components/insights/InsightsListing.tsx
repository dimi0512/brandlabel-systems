import Image from "next/image";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PageShell } from "@/components/PageShell";
import { insightListingEntries } from "@/lib/insights";
import type { Locale } from "@/lib/seo";

const copy = {
  en: {
    heading: "Insights for better business operations.",
    supporting: "Practical thinking on business processes, custom software and automation—focused on when they create real operational value.",
    read: "Read article →",
    comingSoon: "Articles are being prepared.",
    emptyText: "Practical insights will appear here as they are published.",
    planned: "Article in preparation",
  },
  fr: {
    heading: "Des idées pour mieux faire fonctionner votre entreprise.",
    supporting: "Des analyses pratiques sur les processus d’entreprise, les logiciels sur mesure et l’automatisation, avec un objectif : créer une réelle valeur opérationnelle.",
    read: "Lire l’article →",
    comingSoon: "De nouveaux articles sont en préparation.",
    emptyText: "Nos analyses pratiques apparaîtront ici au fil de leur publication.",
    planned: "Article en préparation",
  },
  nl: {
    heading: "Inzichten voor een bedrijf dat beter werkt.",
    supporting: "Praktische inzichten over bedrijfsprocessen, software op maat en automatisering, gericht op waar ze echte operationele waarde creëren.",
    read: "Lees het artikel →",
    comingSoon: "Nieuwe artikelen worden voorbereid.",
    emptyText: "Praktische inzichten verschijnen hier zodra ze worden gepubliceerd.",
    planned: "Artikel in voorbereiding",
  },
} satisfies Record<Locale, Record<string, string>>;

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(
    locale === "fr" ? "fr-BE" : locale === "nl" ? "nl-BE" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(`${value}T12:00:00Z`));
}

export function InsightsListing({ locale }: { locale: Locale }) {
  const pageCopy = copy[locale];
  const entries = insightListingEntries[locale].filter((entry) => entry.published);

  return (
    <PageShell language={locale}>
      <section className="bl-insights-hero">
        <Container>
          <h1>{pageCopy.heading}</h1>
          <p className="bl-insights-intro">{pageCopy.supporting}</p>
        </Container>
      </section>

      <section className="bl-insights-listing">
        <div className="bl-insights-parallax-background" aria-hidden="true">
          <div className="bl-insights-parallax-media">
            <Image
              src="/insights/insights-editorial-parallax-v2.png"
              alt=""
              fill
              sizes="100vw"
              loading="eager"
            />
          </div>
          <div className="bl-insights-parallax-shade" />
        </div>
        <Container className="bl-insights-parallax-content">
          {entries.length ? (
            <div className="bl-insights-grid">
              {entries.map((entry) => (
                <article className="bl-insight-card" key={entry.slug}>
                  {entry.image ? (
                    <div className="bl-insight-card-image">
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width={entry.image.width}
                        height={entry.image.height}
                        sizes="(max-width: 760px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="bl-insight-card-body">
                    <p className="bl-insight-card-category">{entry.category}</p>
                    <h2>{entry.title}</h2>
                    <p className="bl-insight-card-description">{entry.description}</p>
                    <div className="bl-insight-card-meta">
                      <span>{entry.publishedAt ? formatDate(entry.publishedAt, locale) : pageCopy.planned}</span>
                      {entry.readingTime ? <span>{entry.readingTime}</span> : null}
                    </div>
                    {entry.published ? (
                      <LocalizedLink className="bl-insight-card-link" href={`/insights/${entry.slug}`}>
                        {pageCopy.read}
                      </LocalizedLink>
                    ) : (
                      <span className="bl-insight-card-link is-disabled" aria-disabled="true">
                        {pageCopy.read}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bl-insights-empty">
              <h2>{pageCopy.comingSoon}</h2>
              <p>{pageCopy.emptyText}</p>
            </div>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
