import { Container } from "@/components/Container";
import { PageShell } from "@/components/PageShell";
import { createPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import { PrivacyContent } from "./PrivacyContent";
import type { Language } from "@/lib/i18n";

export const metadata: Metadata = createPageMetadata("/privacy");

export function PrivacyPageContent({ language = "en" }: { language?: Language }) {
  return (
    <PageShell language={language}>
      <section className="hero-premium border-b border-[#0B1F3A]/10 py-20 sm:py-28">
        <Container>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#C8A96A]">
            Legal
          </p>
          <h1 className="font-display max-w-4xl text-balance text-5xl font-semibold leading-[0.96] text-[#0B1F3A] sm:text-7xl">
            Privacy Policy
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-700 lg:text-xl lg:leading-9">
            This policy explains how BrandLabel Agency handles personal information,
            cookies, analytics, service providers, retention, security, and privacy rights.
          </p>
          <p className="mt-5 text-sm text-slate-500 lg:text-base">
            Last updated: July 29, 2026
          </p>
        </Container>
      </section>

      <PrivacyContent />
    </PageShell>
  );
}

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
