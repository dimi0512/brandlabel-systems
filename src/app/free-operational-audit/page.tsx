import { FreeAuditExperience } from "@/components/audit/FreeAuditExperience";
import { PageShell } from "@/components/PageShell";
import type { Language } from "@/lib/i18n";
import { defaultLocale } from "@/lib/seo";

export function FreeOperationalAuditPageContent({ language = defaultLocale }: { language?: Language }) {
  return (
    <PageShell language={language}>
      <FreeAuditExperience />
    </PageShell>
  );
}

export default function FreeOperationalAuditPage() {
  return <FreeOperationalAuditPageContent />;
}
