import Image from "next/image";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PageShell } from "@/components/PageShell";
import type { InsightArticle as InsightArticleData } from "@/lib/insights";
import { localizedUrl, SITE_URL } from "@/lib/seo";

function articleJsonLd(article: InsightArticleData) {
  const url = localizedUrl(`/insights/${article.slug}`, article.locale);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metadata.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: article.locale,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: { "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
    image: localizedUrl(article.image?.src ?? "/og-image.png"),
  };
}

export function InsightArticle({ article }: { article: InsightArticleData }) {
  const dateLocale = article.locale === "fr" ? "fr-BE" : article.locale === "nl" ? "nl-BE" : "en-GB";
  const labels = article.locale === "fr"
    ? {
        back: "← Analyses",
        updated: "Mis à jour",
        actions: "Actions associées",
        diagnostic: "Calculez le coût d'un processus récurrent →",
        audit: "Demandez un audit opérationnel gratuit →",
      }
    : article.locale === "nl"
      ? {
          back: "← Inzichten",
          updated: "Bijgewerkt",
          actions: "Gerelateerde acties",
          diagnostic: "Bereken de kost van een terugkerend proces →",
          audit: "Vraag een gratis operationele audit aan →",
        }
      : {
          back: "← Insights",
          updated: "Updated",
          actions: "Related actions",
          diagnostic: "Calculate the cost of a recurring process →",
          audit: "Request a free operational audit →",
        };
  const formatDate = (value: string) => new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00Z`));

  return (
    <PageShell language={article.locale}>
      <article className="bl-insight-article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd(article)).replaceAll("<", "\\u003c"),
          }}
        />
        <header className="bl-insight-article-hero">
          <Container>
            <LocalizedLink className="bl-insight-article-back" href="/insights">{labels.back}</LocalizedLink>
            <h1>{article.title}</h1>
            <p className="bl-insight-article-intro">{article.introduction}</p>
            <div className="bl-insight-article-meta">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {article.updatedAt ? <span>{labels.updated} {formatDate(article.updatedAt)}</span> : null}
              {article.readingTime ? <span>{article.readingTime}</span> : null}
            </div>
          </Container>
        </header>

        <div className="bl-insight-article-reading">
          {article.image ? (
            <Container className="bl-insight-article-lead-image">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                width={article.image.width}
                height={article.image.height}
                sizes="(max-width: 900px) 100vw, 960px"
                priority
              />
            </Container>
          ) : null}

          <Container className="bl-insight-article-body">
            {article.content.map((block, index) => {
            if (block.type === "placeholder") {
              return <p className="bl-insight-article-placeholder" key={index}>{block.text}</p>;
            }
            if (block.type === "heading") {
              return block.level === 2
                ? <h2 id={block.id} key={index}>{block.text}</h2>
                : <h3 id={block.id} key={index}>{block.text}</h3>;
            }
            if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
            if (block.type === "linkedParagraph") {
              return (
                <p key={index}>
                  {block.before}
                  <LocalizedLink
                    className="bl-insight-inline-link"
                    href={block.href}
                    {...(block.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {block.label}
                  </LocalizedLink>
                  {block.after}
                </p>
              );
            }
            if (block.type === "list") {
              const List = block.ordered ? "ol" : "ul";
              return <List key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</List>;
            }
            if (block.type === "quote") {
              return (
                <blockquote key={index}>
                  <p>{block.text}</p>
                  {block.citation ? <cite>{block.citation}</cite> : null}
                </blockquote>
              );
            }
            if (block.type === "table") {
              return (
                <div className="bl-insight-article-table-wrap" key={index}>
                  <table>
                    {block.caption ? <caption>{block.caption}</caption> : null}
                    <thead>
                      <tr>{block.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.type === "image") {
              return (
                <figure key={index}>
                  <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 900px) 100vw, 760px" />
                  {block.caption ? <figcaption>{block.caption}</figcaption> : null}
                </figure>
              );
            }
            if (block.type === "link") {
              return (
                <LocalizedLink
                  className={block.external ? "bl-insight-source-link" : undefined}
                  href={block.href}
                  key={index}
                  {...(block.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {block.label}
                </LocalizedLink>
              );
            }
            return (
              <aside className="bl-insight-article-cta" key={index}>
                <h2>{block.heading}</h2>
                {block.text ? <p>{block.text}</p> : null}
                <LocalizedLink href={block.href}>{block.label}</LocalizedLink>
              </aside>
            );
            })}
          </Container>
        </div>

        <section className="bl-insight-related-actions" aria-label={labels.actions}>
          <Container>
            <LocalizedLink href="/diagnostic">{labels.diagnostic}</LocalizedLink>
            <LocalizedLink href="/free-operational-audit">{labels.audit}</LocalizedLink>
          </Container>
        </section>
      </article>
    </PageShell>
  );
}
