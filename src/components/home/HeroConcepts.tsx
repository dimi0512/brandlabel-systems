"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";

type Concept = "core" | "crm";

const crmContacts = [
  ["Aurora Atelier", "Proposal sent", "€18,400", "JS"],
  ["Northline Foods", "Discovery", "€12,800", "MK"],
  ["Mare & Co.", "Review", "€26,500", "AL"],
] as const;

function OperationalCore() {
  return (
    <div className="bl-concept-core bl-core-v2" aria-label="Architectural connected operational platform">
      <div className="bl-core-architecture" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className="bl-core-horizon" aria-hidden="true" />
      <div className="bl-core-v2-kicker">
        <span>BRANDLABEL OPERATING ENVIRONMENT</span>
        <i />
        <small>LIVE SYSTEM</small>
      </div>
      <div className="bl-core-v2-wing bl-core-v2-wing-left">
        <small>CLIENT ACTIVITY</small>
        <strong>184</strong>
        <span><i />12 active opportunities</span>
      </div>
      <div className="bl-core-v2-wing bl-core-v2-wing-right">
        <small>TIME RECOVERED</small>
        <strong>31.4h</strong>
        <span>Across 08 workflows ↗</span>
      </div>
      <div className="bl-core-v2-plane">
        <header>
          <div>
            <span>BL / OS</span>
            <p><small>OPERATING CORE</small><strong>Meridian Group</strong></p>
          </div>
          <nav><i className="active" /><i /><i /></nav>
          <b>27 JUL · 09:41</b>
        </header>
        <main>
          <div className="bl-core-v2-title">
            <div><small>EXECUTIVE OVERVIEW</small><strong>Everything important,<br />in one place.</strong></div>
            <span>System health <b>98%</b></span>
          </div>
          <div className="bl-core-v2-metrics">
            <article><small>REVENUE FLOW</small><strong>€148.6k</strong><span>+12.8% ↗</span></article>
            <article><small>ACTIVE WORK</small><strong>24</strong><span>06 due this week</span></article>
            <article><small>AUTOMATIONS</small><strong>1,284</strong><span>Runs this month</span></article>
          </div>
          <div className="bl-core-v2-lower">
            <article className="bl-core-v2-flow">
              <header><strong>Operational flow</strong><small>Live across the business</small></header>
              <div>
                {[
                  ["Lead captured", "184"],
                  ["Qualified", "62"],
                  ["In delivery", "24"],
                  ["Completed", "91"],
                ].map(([label, value], index) => (
                  <span key={label}><i>{String(index + 1).padStart(2, "0")}</i><small>{label}</small><strong>{value}</strong></span>
                ))}
              </div>
            </article>
            <article className="bl-core-v2-chart">
              <header><strong>Performance</strong><small>Last 8 weeks</small></header>
              <div>
                {[48, 56, 51, 68, 62, 76, 72, 91].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
            </article>
          </div>
        </main>
      </div>
      <div className="bl-core-v2-floor" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className="bl-core-v2-status">
        <span><i />All systems connected</span>
        <span>Clients · Work · Finance · Automation</span>
      </div>
    </div>
  );
}

function CrmConcept() {
  return (
    <div className="bl-concept-crm" aria-label="Fictional customer relationship platform">
      <aside className="bl-crm-rail">
        <div className="bl-crm-mark">BL</div>
        {["⌂", "◎", "◇", "▤", "↗"].map((item, index) => (
          <span className={index === 1 ? "active" : ""} key={item + index}>{item}</span>
        ))}
        <i>DK</i>
      </aside>
      <section className="bl-crm-main">
        <header>
          <div><small>CLIENT OPERATIONS</small><strong>Relationship overview</strong></div>
          <div><span>⌕</span><span>•••</span><button type="button">New opportunity</button></div>
        </header>
        <main>
          <div className="bl-crm-heading">
            <div><small>GOOD EVENING</small><h2>Command centre</h2></div>
            <span>27 July 2026</span>
          </div>
          <div className="bl-crm-metrics">
            <article><small>ACTIVE PIPELINE</small><strong>€94.2k</strong><span>+18.4% this month</span></article>
            <article><small>OPEN OPPORTUNITIES</small><strong>12</strong><span>4 need attention</span></article>
            <article><small>FOLLOW-UPS TODAY</small><strong>07</strong><span>3 completed</span></article>
          </div>
          <div className="bl-crm-content">
            <article className="bl-crm-list">
              <header><div><strong>Priority relationships</strong><small>Live commercial activity</small></div><span>View all →</span></header>
              {crmContacts.map(([name, status, amount, initials]) => (
                <div key={name}>
                  <i>{initials}</i>
                  <span><strong>{name}</strong><small>{status}</small></span>
                  <b>{amount}</b>
                </div>
              ))}
            </article>
            <article className="bl-crm-pipeline">
              <header><strong>Pipeline movement</strong><span>Last 30 days</span></header>
              <div className="bl-crm-bars">
                {[35, 56, 46, 72, 64, 88, 78].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
              <footer><span>Qualified</span><span>Won</span></footer>
            </article>
          </div>
        </main>
      </section>
      <aside className="bl-crm-float">
        <small>NEXT BEST ACTION</small>
        <strong>Follow up with<br />Aurora Atelier</strong>
        <span>Proposal viewed 42 minutes ago</span>
        <button type="button">Open relationship →</button>
      </aside>
    </div>
  );
}

export function HeroConcepts() {
  const [concept, setConcept] = useState<Concept>("core");
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero-choices" className={`bl-concepts bl-concepts-${concept}`} aria-label="Two proposed homepage hero concepts">
      <div className="bl-concept-glow" aria-hidden="true" />
      <div className="bl-concept-lines" aria-hidden="true" />
      <Container className="bl-concepts-shell">
        <div className="bl-concept-picker" aria-label="Choose a hero concept">
          <button
            type="button"
            className={concept === "core" ? "active" : ""}
            onClick={() => setConcept("core")}
            aria-pressed={concept === "core"}
          >
            <span>01</span>
            <div><strong>Operational Core</strong><small>BrandLabel concept</small></div>
          </button>
          <button
            type="button"
            className={concept === "crm" ? "active" : ""}
            onClick={() => setConcept("crm")}
            aria-pressed={concept === "crm"}
          >
            <span>02</span>
            <div><strong>Fictional CRM</strong><small>Your concept</small></div>
          </button>
        </div>

        <div className="bl-concepts-layout">
          <motion.div
            className="bl-concepts-copy"
            key={`copy-${concept}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="bl-os-eyebrow"><span />Operational platforms for growing businesses</p>
            <h1>The system behind a better-run business.</h1>
            <p>
              We design tailored platforms that connect your work, information and customer experience—reducing
              administration and the hidden costs of disconnected systems.
            </p>
            <div className="bl-os-actions">
              <LocalizedLink href="/diagnostic">Calculate your operational cost <span>→</span></LocalizedLink>
              <a href="#examples">See platform examples</a>
            </div>
            <div className="bl-concept-note">
              <span>{concept === "core" ? "UNIVERSAL IDEA" : "FICTIONAL INTERFACE"}</span>
              <p>
                {concept === "core"
                  ? "Expresses the complete BrandLabel offer without making the company look like a CRM vendor."
                  : "Immediately recognisable and concrete, while the fictional data keeps it independent of a real client."}
              </p>
            </div>
          </motion.div>

          <div className="bl-concept-stage">
            <div className="bl-concept-caption">
              <span>CONCEPT {concept === "core" ? "01" : "02"}</span>
              <small>{concept === "core" ? "Connected operational environment" : "CRM demonstration · fictional data"}</small>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="bl-concept-visual"
                key={concept}
                initial={reduceMotion ? false : { opacity: 0, scale: .975, x: 18 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: .985, x: -14 }}
                transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
              >
                {concept === "core" ? <OperationalCore /> : <CrmConcept />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
      <a className="bl-concept-scroll" href="#examples"><span>SCROLL TO PLATFORM EXAMPLES</span><i /></a>
    </section>
  );
}
