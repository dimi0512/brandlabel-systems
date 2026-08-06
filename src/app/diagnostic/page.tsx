import type { Metadata } from "next";
import { DiagnosticExperience } from "@/components/diagnostic/DiagnosticExperience";
import { LanguageProvider } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = createPageMetadata("/diagnostic");

export default function DiagnosticPage() {
  return (
    <LanguageProvider>
      <DiagnosticExperience />
    </LanguageProvider>
  );
}
