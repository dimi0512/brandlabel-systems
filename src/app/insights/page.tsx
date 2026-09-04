import { InsightsListing } from "@/components/insights/InsightsListing";
import { createInsightsListingMetadata } from "@/lib/insightsMetadata";

export const metadata = createInsightsListingMetadata("en");

export default function InsightsPage() {
  return <InsightsListing locale="en" />;
}
