import { FreeAuditExperience } from "@/components/audit/FreeAuditExperience";
import { PageShell } from "@/components/PageShell";
import type { Language } from "@/lib/i18n";

export function FreeOperationalAuditPageContent({ language = "en" }: { language?: Language }) {
  return (
    <PageShell language={language}>
      <FreeAuditExperience />
    </PageShell>
  );
}

export default function FreeOperationalAuditPage() {
  return <FreeOperationalAuditPageContent />;
}
