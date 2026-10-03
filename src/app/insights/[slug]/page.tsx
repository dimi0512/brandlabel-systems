import { InsightArticle } from "@/components/insights/InsightArticle";
import { getInsightArticle, insightArticles } from "@/lib/insights";
import { createInsightArticleMetadata } from "@/lib/insightsMetadata";
import { notFound } from "next/navigation";
import { defaultLocale } from "@/lib/seo";

export function generateStaticParams() {
  return insightArticles
    .filter((article) => article.locale === defaultLocale)
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle(defaultLocale, slug);
  return article ? createInsightArticleMetadata(article) : {};
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle(defaultLocale, slug);
  if (!article) notFound();
  return <InsightArticle article={article} />;
}
