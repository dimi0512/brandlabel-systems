import { InsightArticle } from "@/components/insights/InsightArticle";
import { getInsightArticle, insightArticles } from "@/lib/insights";
import { createInsightArticleMetadata } from "@/lib/insightsMetadata";
import { isLocale } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return insightArticles
    .filter((article) => article.locale !== "en")
    .map((article) => ({ locale: article.locale, slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  const article = getInsightArticle(locale, slug);
  return article ? createInsightArticleMetadata(article) : {};
}

export default async function LocalizedInsightArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  const article = getInsightArticle(locale, slug);
  if (!article) notFound();
  return <InsightArticle article={article} />;
}
