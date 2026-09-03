"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import {
  DIAGNOSTIC_AUDIT_STORAGE_KEY,
  type DiagnosticAuditContext,
} from "@/lib/diagnosticAudit";
import { useEffect, useState } from "react";
import { useLanguage, type Language } from "@/lib/i18n";

const frictionOptions = [
  "Delays or waiting",
  "Repeated work or duplicate entry",
  "Missing or difficult-to-find information",
  "Errors or manual corrections",
  "Poor visibility or reporting",
  "Difficult follow-up or approvals",
  "Other",
];

function numberLocale(language: Language) {
  return language === "fr" ? "fr-BE" : language === "nl" ? "nl-BE" : "en-BE";
}

function formatMoney(value: number, language: Language) {
  return new Intl.NumberFormat(numberLocale(language), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, language: Language, maximumFractionDigits = 1) {
  return new Intl.NumberFormat(numberLocale(language), { maximumFractionDigits }).format(value);
}

function createDiagnosticSummary(
  context: DiagnosticAuditContext,
  language: Language,
  translate: (value: string) => string,
) {
  const problemLines = context.problems.map(
    (problem, index) =>
      `${index + 1}. ${translate(problem.title)}\n` +
      `   ${problem.people} ${translate(problem.people === 1 ? "person" : "people")}; ${translate(problem.frequency)}; ${problem.minutes} ${translate("minutes each time")}; ${formatMoney(problem.hourlyCost, language)} ${translate("per working hour")}; ${formatMoney(problem.annualCost, language)} ${translate("indicative annual cost")}.`,
  );

  return [
    ...problemLines,
    "",
    `${translate("Combined estimate")}: ${formatNumber(context.totals.weeklyHours, language)} ${translate("hours per week")}; ${formatMoney(context.totals.monthlyCost, language)} ${translate("average monthly cost")}; ${formatMoney(context.totals.annualCost, language)} ${translate("annual cost")}.`,
  ].join("\n");
}

export function FreeAuditExperience() {
  const { language, translate } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [diagnosticSummary, setDiagnosticSummary] = useState("");
  const [hasDiagnostic, setHasDiagnostic] = useState(false);
  const [selectedFrictions, setSelectedFrictions] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(DIAGNOSTIC_AUDIT_STORAGE_KEY);
    if (!stored) return;

    let cancelled = false;

    try {
      const context = JSON.parse(stored) as DiagnosticAuditContext;
      if (context.version !== 1 || !Array.isArray(context.problems)) return;
      queueMicrotask(() => {
        if (cancelled) return;
        setDiagnosticSummary(createDiagnosticSummary(context, language, translate));
        setHasDiagnostic(true);
      });
    } catch {
      window.sessionStorage.removeItem(DIAGNOSTIC_AUDIT_STORAGE_KEY);
    }

    return () => {
      cancelled = true;
    };
  }, [language, translate]);

  const frictionError = selectedFrictions.length === 0 && status === "error";

  function toggleFriction(option: string) {
    setSelectedFrictions((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (selectedFrictions.length === 0) {
      setStatus("error");
      setError("Please select at least one area of difficulty.");
      return;
    }

    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = [
      "FREE OPERATIONAL CLARITY AUDIT",
      "",
      "Diagnostic information:",
      diagnosticSummary || "No calculator result was attached.",
      "",
      "1. Recurring process to improve:",
      String(formData.get("process") || ""),
      "",
      "2. People, tools, files, records or platforms involved:",
      String(formData.get("involved") || ""),
      "",
      "3. Main areas of difficulty:",
      selectedFrictions.join(", "),
      "",
      "4. Desired result:",
      String(formData.get("outcome") || ""),
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "Free Operational Clarity Audit",
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          message,
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Your audit request could not be sent.");

      window.sessionStorage.removeItem(DIAGNOSTIC_AUDIT_STORAGE_KEY);
      setStatus("sent");
      form.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Your audit request could not be sent.",
      );
    }
  }

  if (status === "sent") {
    return (
      <section className="relative isolate overflow-hidden bg-[#eee8dd] py-20 sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(200,169,106,.28),transparent_34%),radial-gradient(circle_at_10%_88%,rgba(55,91,125,.2),transparent_38%)]" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl rounded-sm border border-[#c8a96a]/45 bg-[#fffdf9] p-8 text-center shadow-[0_30px_80px_rgba(11,31,58,.12)] sm:p-14">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#c8a96a]/18 text-2xl text-[#8d692b]">✓</div>
            <h1 className="mt-6 font-display text-4xl leading-tight text-[#0b1f3a] sm:text-5xl">
              Your audit request has been received.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5f6878]">
              BrandLabel Agency will review the information and contact you by email within two business days to arrange a suitable time for the conversation.
            </p>
            <ButtonLink href="/" variant="dark" className="mt-8">
              Return to the homepage
            </ButtonLink>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#e9e6df] py-16 sm:py-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(200,169,106,.34),transparent_32%),radial-gradient(circle_at_8%_88%,rgba(49,86,121,.24),transparent_38%),linear-gradient(135deg,#f1e7d5_0%,#e8e6e1_52%,#d8e3e8_100%)]" />
        <div aria-hidden className="absolute -right-48 top-20 size-[34rem] rounded-full border border-[#9b742f]/25" />
        <Container className="relative z-10 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <h1 className="max-w-3xl font-display text-5xl leading-[.98] text-[#0b1f3a] sm:text-6xl lg:text-7xl">
            Find where one of your business processes could work better.
          </h1>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-[#4f5d70] sm:text-xl sm:leading-9">
              Send us one recurring workflow that takes too much time, creates unnecessary administration or simply feels harder than it should. We&apos;ll review how it works and identify where it could be simplified, improved or automated.
            </p>
          </div>
        </Container>
      </section>

      <section className="bl-audit-parallax py-14 sm:py-20">
        <div className="bl-audit-parallax-shade" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="mx-auto mb-8 max-w-5xl rounded-sm border border-white/75 bg-white/90 p-6 shadow-[0_22px_55px_rgba(11,31,58,.12)] backdrop-blur-md sm:p-8">
            <h2 className="font-display text-3xl leading-tight text-[#0b1f3a] sm:text-4xl">Tell us about the workflow.</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5f6878]">
              You don&apos;t need to know what technology you need. Just explain what happens today and where the difficulty is.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[.14em] text-[#8d692b]">
              Free human review. No obligation. No automated recommendation.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
            {hasDiagnostic ? (
              <section className="rounded-sm border border-[#c8a96a]/50 bg-[linear-gradient(135deg,#fffdf9_40%,#efe0bd)] p-6 shadow-[0_24px_60px_rgba(11,31,58,.08)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8d692b]">Carried from your calculator</p>
                <h2 className="mt-3 font-display text-3xl text-[#0b1f3a] sm:text-4xl">Your diagnostic summary</h2>
                <p className="mt-3 text-base leading-7 text-[#5f6878]">Review or edit this information before submitting it with your audit request.</p>
                <textarea
                  value={diagnosticSummary}
                  onChange={(event) => setDiagnosticSummary(event.target.value)}
                  rows={8}
                  className="mt-5 w-full resize-y rounded-sm border border-[#0b1f3a]/15 bg-white/85 px-4 py-4 text-base leading-7 text-[#0b1f3a] outline-none transition focus:border-[#c8a96a] focus:shadow-[0_0_0_4px_rgba(200,169,106,.16)]"
                  aria-label="Editable diagnostic summary"
                />
              </section>
            ) : (
              <section className="flex flex-col gap-4 rounded-sm border border-[#0b1f3a]/12 bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-base leading-7 text-[#5f6878]">You can request the audit without completing the calculator, or calculate a recurring cost first and bring the result back automatically.</p>
                <ButtonLink href="/diagnostic" variant="outline" className="shrink-0">Use the calculator first</ButtonLink>
              </section>
            )}

            <div className="mt-8 grid gap-6">
              <AuditQuestion number="1" title="What recurring process would you like to improve?" helper="Briefly explain where it begins and when it is complete.">
                <textarea name="process" required rows={5} placeholder="For example: a customer request arrives, the team prepares the work, approval is collected and delivery is confirmed." className="audit-field" />
              </AuditQuestion>

              <AuditQuestion number="2" title="Who and what are involved?" helper="Mention the people or departments and any tools, spreadsheets, files, records or existing platforms involved.">
                <textarea name="involved" required rows={5} placeholder="For example: sales, operations and finance use email, a shared spreadsheet and accounting software." className="audit-field" />
              </AuditQuestion>

              <AuditQuestion number="3" title="What creates the most difficulty?" helper="Select every option that applies.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {frictionOptions.map((option) => {
                    const selected = selectedFrictions.includes(option);
                    return (
                      <label key={option} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 transition ${selected ? "border-[#0b1f3a] bg-[#0b1f3a] text-white" : "border-[#0b1f3a]/15 bg-white hover:border-[#c8a96a]"}`}>
                        <input type="checkbox" checked={selected} onChange={() => toggleFriction(option)} className="size-4 accent-[#c8a96a]" />
                        <span className="font-medium">{option}</span>
                      </label>
                    );
                  })}
                </div>
                {frictionError ? <p className="mt-3 text-sm font-semibold text-red-700">Select at least one area of difficulty.</p> : null}
              </AuditQuestion>

              <AuditQuestion number="4" title="What would a better result look like?" helper="Describe the practical improvement you want. Mention any existing information or integrations that should be preserved, migrated or connected.">
                <textarea name="outcome" required rows={5} placeholder="For example: one clear status, fewer manual updates and an easier handoff between the team and finance." className="audit-field" />
              </AuditQuestion>
            </div>

            <section className="mt-8 rounded-sm border border-[#c8a96a]/45 bg-[#fffdf9] p-6 shadow-[0_26px_70px_rgba(11,31,58,.09)] sm:p-8">
              <h2 className="font-display text-3xl text-[#0b1f3a] sm:text-4xl">Where should we send our response?</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f6878]">We will review the request and contact you by email within two business days to arrange the call.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <AuditField label="Name" name="name" placeholder="Your name" required />
                <AuditField label="Company" name="company" placeholder="Company name" required />
              </div>
              <div className="mt-5">
                <AuditField label="Email" name="email" type="email" placeholder="you@company.com" required />
              </div>
              <label className="hidden">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>

              {error ? <p className="mt-5 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">{error}</p> : null}

              <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-sm bg-[#0b1f3a] px-8 text-lg font-semibold text-white shadow-[0_20px_45px_rgba(11,31,58,.18)] transition hover:-translate-y-0.5 hover:bg-[#17385f] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto">
                {status === "sending" ? "Sending audit request..." : "Request your free audit"}
              </button>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-[#667085]">
                By submitting this request, you agree that BrandLabel Agency may use these details to review your enquiry and contact you. Read the{" "}<LocalizedLink href="/privacy" className="font-semibold text-[#0b1f3a] underline decoration-[#c8a96a] underline-offset-4">Privacy Policy</LocalizedLink>.
              </p>
            </section>
          </form>
          <div className="mx-auto mt-8 max-w-5xl rounded-sm border border-white/75 bg-white/90 p-6 shadow-[0_22px_55px_rgba(11,31,58,.12)] backdrop-blur-md sm:p-8">
            <h2 className="font-display text-3xl leading-tight text-[#0b1f3a] sm:text-4xl">What happens next?</h2>
            <p className="mt-3 max-w-4xl text-base leading-7 text-[#5f6878]">
              We review the workflow manually and look for unnecessary steps, repetitive work, disconnected information and opportunities for automation. If we see a meaningful improvement, we&apos;ll explain what we would change and why.
            </p>
            <p className="mt-3 max-w-4xl text-base leading-7 text-[#5f6878]">
              The answer may be a small process change, a focused operational system or a broader platform. We recommend the scope based on the problem, not on what we want to sell.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

function AuditQuestion({ number, title, helper, children }: { number: string; title: string; helper: string; children: React.ReactNode }) {
  const { translate } = useLanguage();

  return (
    <section className="bl-audit-question rounded-sm border border-white/75 bg-white/90 p-6 shadow-[0_22px_55px_rgba(11,31,58,.12)] backdrop-blur-md sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8d692b]">{translate(`Question ${number} of 4`)}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-[#0b1f3a] sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-[#5f6878]">{helper}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function AuditField({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-base font-semibold text-[#0b1f3a]">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="min-h-14 rounded-sm border border-[#0b1f3a]/15 bg-white px-4 text-base font-normal outline-none transition focus:border-[#c8a96a] focus:shadow-[0_0_0_4px_rgba(200,169,106,.16)]" />
    </label>
  );
}
