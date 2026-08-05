import type { Metadata } from "next";
import { DiagnosticExperience } from "@/components/diagnostic/DiagnosticExperience";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Operational Cost Diagnostic | BrandLabel Agency",
  description: "Estimate how much repetitive administration, disconnected tools and poor visibility may be costing your business.",
};

export default function DiagnosticPage() {
  return (
    <LanguageProvider>
      <DiagnosticExperience />
    </LanguageProvider>
  );
}
