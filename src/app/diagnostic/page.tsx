import type { Metadata } from "next";
import { DiagnosticExperience } from "@/components/diagnostic/DiagnosticExperience";
import { LanguageProvider, type Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/pageMetadata";
import { defaultLocale } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("/diagnostic");

export function DiagnosticPageContent({ language = defaultLocale }: { language?: Language }) {
  return (
    <LanguageProvider language={language}>
      <DiagnosticExperience />
    </LanguageProvider>
  );
}

export default function DiagnosticPage() {
  return <DiagnosticPageContent />;
}
