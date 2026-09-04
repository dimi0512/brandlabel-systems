"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PageShell } from "@/components/PageShell";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Language } from "@/lib/i18n";

export function ContactPageContent({ language = "en" }: { language?: Language }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: formData.get("requestType"),
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Your request could not be sent.");
      }

      setStatus("sent");
      form.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Your request could not be sent.",
      );
    }
  }

  return (
    <PageShell language={language}>
      <section className="bl-contact-hero">
        <Container className="bl-contact-hero-layout">
          <div className="bl-contact-hero-copy">
            <h1>
              Tell us what needs to work better.
            </h1>
            <p className="bl-contact-hero-intro">
              Request an operational review, book a consultation, or tell us what is not working well in your business. We’ll help determine whether the right next step is a process improvement, a focused operational system or a broader platform.
            </p>
            <div className="premium-card bl-contact-next">
              <p className="bl-contact-next-title">What happens next:</p>
              <ul>
                <li>We review your request and current operational context.</li>
                <li>We clarify the workflows, users, data and integrations involved.</li>
                <li>We recommend the most appropriate next step and commercial model.</li>
              </ul>
              <p className="bl-contact-response-time">
                No commitment is required. We normally respond within one business day.
              </p>
              <p className="bl-contact-email">
                Prefer email?{" "}
                <a className="font-semibold text-[#0B1F3A] underline decoration-[#C8A96A]/70 underline-offset-4" href="mailto:contact@brandlabelagency.com">
                  contact@brandlabelagency.com
                </a>
              </p>
              <ButtonLink href="/free-operational-audit" variant="outline" className="mt-6">
                Request a free operational audit
              </ButtonLink>
            </div>
          </div>

          <div className="bl-contact-form-column">
            {/* Subtle ambient depth behind the form */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-xl bg-[radial-gradient(ellipse_at_18%_10%,rgba(200,169,106,0.18),transparent_55%),radial-gradient(ellipse_at_85%_90%,rgba(11,31,58,0.1),transparent_60%)] blur-2xl"
            />

            {status === "sent" ? (
              <div className="surface bl-gold-shadow-card relative flex min-h-[420px] flex-col items-center justify-center rounded-md p-8 text-center">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A96A]/60 to-transparent"
                />
                <div className="mb-6 grid size-14 place-items-center rounded-full bg-[#C8A96A]/15 text-[#C8A96A]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-display text-4xl font-semibold text-[#0B1F3A]">
                  We received your request.
                </p>
                <p className="mx-auto mt-5 max-w-md text-xl leading-9 text-slate-600">
                  We&apos;ll review it and respond within one business day.
                </p>
                <ButtonLink href="/" variant="outline" className="mt-8">
                  Back to home
                </ButtonLink>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="surface bl-gold-shadow-card bl-contact-form relative rounded-md p-6 sm:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A96A]/60 to-transparent"
                />
                <label className="grid gap-2 text-xl font-medium text-[#0B1F3A]">
                  How can we help?
                  <select
                    name="requestType"
                    required
                    defaultValue=""
                    className="min-h-14 rounded-sm border border-[#0B1F3A]/15 bg-white px-4 text-lg outline-none transition focus:border-[#C8A96A] focus:shadow-[0_0_0_4px_rgba(200,169,106,0.16)]"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Detailed operational report">Request a detailed operational report</option>
                    <option value="Consultation">Book a consultation</option>
                    <option value="Commercial model">Discuss a commercial model</option>
                    <option value="General enquiry">Ask a general question</option>
                  </select>
                </label>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-xl font-medium text-[#0B1F3A]">
                    Name
                    <input
                      name="name"
                      type="text"
                      required
                      className="min-h-14 rounded-sm border border-[#0B1F3A]/15 bg-white px-4 text-lg outline-none transition focus:border-[#C8A96A] focus:shadow-[0_0_0_4px_rgba(200,169,106,0.16)]"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="grid gap-2 text-xl font-medium text-[#0B1F3A]">
                    Company
                    <input
                      name="company"
                      type="text"
                      className="min-h-14 rounded-sm border border-[#0B1F3A]/15 bg-white px-4 text-lg outline-none transition focus:border-[#C8A96A] focus:shadow-[0_0_0_4px_rgba(200,169,106,0.16)]"
                      placeholder="Company name"
                    />
                  </label>
                </div>
                <label className="mt-5 grid gap-2 text-xl font-medium text-[#0B1F3A]">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    className="min-h-14 rounded-sm border border-[#0B1F3A]/15 bg-white px-4 text-lg outline-none transition focus:border-[#C8A96A] focus:shadow-[0_0_0_4px_rgba(200,169,106,0.16)]"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="mt-5 grid gap-2 text-xl font-medium text-[#0B1F3A]">
                  Message
                  <textarea
                    name="message"
                    rows={6}
                    className="resize-none rounded-sm border border-[#0B1F3A]/15 bg-white px-4 py-3 text-lg leading-8 outline-none transition focus:border-[#C8A96A] focus:shadow-[0_0_0_4px_rgba(200,169,106,0.16)]"
                    placeholder="What tools, workflows or client processes could be improved, simplified or connected?"
                />
              </label>
                <label className="hidden">
                  Website
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
                <div className="mt-6">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileTap={{ scale: 0.97, opacity: 0.88 }}
                    transition={{ duration: 0.12 }}
                    className="inline-flex min-h-14 w-full touch-manipulation items-center justify-center rounded-sm bg-[#C8A96A] px-8 text-xl font-semibold tracking-[0.02em] text-[#0B1F3A] shadow-[0_22px_50px_rgba(200,169,106,0.42)] ring-1 ring-[#C8A96A]/45 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.4),0_22px_50px_rgba(200,169,106,0.42)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#D6BA7D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? "Sending request..." : "Send request"}
                  </motion.button>
                </div>
                {status === "error" ? (
                  <p className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-lg leading-7 text-red-700">
                    {error}
                  </p>
                ) : null}
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  We normally respond within one business day. By submitting this form, you
                  agree that we can use your details to respond to your request. Read the{" "}
                  <LocalizedLink
                    href="/privacy"
                    className="font-semibold text-[#0B1F3A] underline decoration-[#C8A96A]/60 underline-offset-4"
                  >
                    Privacy Policy
                  </LocalizedLink>
                  .
                </p>
              </form>
            )}
          </div>
        </Container>
      </section>
      <FAQSection />
    </PageShell>
  );
}

export default function ContactPage() {
  return <ContactPageContent />;
}
