import { InsightsListing } from "@/components/insights/InsightsListing";
import { createInsightsListingMetadata } from "@/lib/insightsMetadata";
import { defaultLocale } from "@/lib/seo";

export const metadata = createInsightsListingMetadata(defaultLocale);

export default function InsightsPage() {
  return <InsightsListing locale={defaultLocale} />;
}
