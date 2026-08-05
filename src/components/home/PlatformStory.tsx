"use client";

import { useState } from "react";
import { Container } from "@/components/Container";

const stories = [
  {
    label: "Field operations",
    title: "Every moving part, visible.",
    text: "A connected environment for clients, projects, teams, field activity, documents, approvals and management visibility.",
    tags: ["Planning", "Field teams", "Documents", "Reporting"],
    visual: "field",
  },
  {
    label: "Client and business management",
    title: "The whole business, in one rhythm.",
    text: "Appointments, client history, products, stock, services, sales and income—designed around the daily reality of the team.",
    tags: ["Appointments", "Clients", "Stock", "Income"],
    visual: "business",
  },
  {
    label: "Mobile workflows",
    title: "Work completed where it happens.",
    text: "Mobile-first operations for time tracking, vehicles, evidence, signatures, automatic documents and structured handoffs.",
    tags: ["Mobile", "Time tracking", "Signatures", "PDF flows"],
    visual: "mobile",
  },
  {
    label: "Financial operations",
    title: "Clarity behind every number.",
    text: "A private operational layer for expenses, sales, contacts, documents, reporting and controlled financial workflows.",
    tags: ["Expenses", "Sales", "Documents", "Reports"],
    visual: "finance",
  },
];

export function PlatformStory() {
  const [active, setActive] = useState(0);
  const story = stories[active];

  return (
    <section id="examples" className="bg-[#0b1320] py-24 text-white sm:py-36">
      <Container>
        <div className="max-w-3xl">
          <p className="bl-eyebrow text-[#d8c49a]">Real platforms, anonymized data</p>
          <h2 className="bl-title mt-5 text-white">Built for completely different operations.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            The industries change. The principle does not: the platform follows the workflow.
          </p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
          <div className="border-t border-white/18">
            {stories.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={`flex w-full items-center justify-between gap-5 border-b border-white/18 py-6 text-left transition ${
                  active === index ? "text-white" : "text-white/45 hover:text-white/75"
                }`}
              >
                <span className="flex items-center gap-5"><small className="text-[#b99a5e]">0{index + 1}</small><span className="text-lg">{item.label}</span></span>
                <span className={active === index ? "translate-x-0 text-[#b99a5e]" : "-translate-x-2 opacity-0"}>→</span>
              </button>
            ))}
          </div>
          <div className="min-w-0">
            <div className={`bl-platform-visual bl-platform-${story.visual}`} aria-label={`${story.label} platform interface with fictional data`}>
              <div className="bl-platform-nav">
                <span className="size-2 rounded-full bg-[#b99a5e]" /><span /><span /><span />
              </div>
              <div className="bl-platform-content">
                <div className="bl-platform-metric"><small>Today</small><strong>{active === 0 ? "18" : active === 1 ? "12" : active === 2 ? "7h 42" : "€24.8k"}</strong></div>
                <div className="bl-platform-chart" />
                <div className="bl-platform-list">{[0,1,2].map((n) => <span key={n} />)}</div>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs uppercase tracking-[.18em] text-[#b99a5e]">{story.label}</p>
                <h3 className="mt-3 text-3xl">{story.title}</h3>
                <p className="mt-4 max-w-2xl leading-7 text-white/62">{story.text}</p>
              </div>
              <div className="flex flex-wrap content-start gap-2 sm:max-w-48 sm:justify-end">
                {story.tags.map((tag) => <span key={tag} className="border border-white/16 px-3 py-2 text-xs text-white/64">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
