import type { Metadata } from "next";
import { DiagnosticExperience } from "@/components/diagnostic/DiagnosticExperience";
import { LanguageProvider, type Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = createPageMetadata("/diagnostic");

export function DiagnosticPageContent({ language = "en" }: { language?: Language }) {
  return (
    <LanguageProvider language={language}>
      <DiagnosticExperience />
    </LanguageProvider>
  );
}

export default function DiagnosticPage() {
  return <DiagnosticPageContent />;
}
