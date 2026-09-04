import { InsightArticle } from "@/components/insights/InsightArticle";
import { getInsightArticle, insightArticles } from "@/lib/insights";
import { createInsightArticleMetadata } from "@/lib/insightsMetadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return insightArticles
    .filter((article) => article.locale === "en")
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle("en", slug);
  return article ? createInsightArticleMetadata(article) : {};
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightArticle("en", slug);
  if (!article) notFound();
  return <InsightArticle article={article} />;
}
