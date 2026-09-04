"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/Container";
import { LocalizedContent } from "@/lib/i18n";

const chapters = [
  {
    title: "One tailored operational platform can hold the whole operation together.",
    text: "Projects, clients, quotes, documents, time and approvals become one working environment—reconstructed here from a real platform already built by BrandLabel.",
    screen: "Project workspace",
    accent: "#ff7a00",
  },
  {
    title: "Every appointment becomes useful business history.",
    text: "The calendar is connected to client records, services, formulas, products, payments and reporting—following the real workflow of a service business.",
    screen: "Salon workspace",
    accent: "#8f2846",
  },
  {
    title: "Each working day becomes a clear operational record.",
    text: "Time, pauses, vehicles, mileage, mandatory documents, checks, receipts and signatures are captured where the work happens.",
    screen: "Field activity",
    accent: "#174d87",
  },
  {
    title: "Business records become decision-ready.",
    text: "Sales, expenses, documents, VAT, payment status and attention points are connected in a private financial workspace.",
    screen: "Finance workspace",
    accent: "#6d45e8",
  },
] as const;

const projectNavigation = [
  ["⌂", "Dashboard"],
  ["□", "Calendar"],
  ["◷", "Time tracking"],
  ["◇", "Projects"],
  ["◎", "Clients"],
  ["≡", "Quotes"],
  ["▱", "Documents"],
  ["✓", "Approvals"],
] as const;

const projectStatuses = [
  ["In progress", "4"],
  ["Delayed", "2"],
  ["Upcoming", "3"],
  ["Closed", "6"],
  ["Contacted", "5"],
  ["Offer sent", "7"],
  ["To be invoiced", "3"],
  ["Invoiced", "8"],
] as const;

export function ProjectWorkspace() {
  return <LocalizedContent>{(
    <div className="bl-real-app bl-real-project">
      <aside className="bl-real-sidebar">
        <div className="bl-real-project-brand"><span>PX</span><strong>PROJECT WORKSPACE</strong></div>
        <div className="bl-real-workspace"><strong>Northstar Studio</strong><small>Development workspace</small></div>
        <nav>
          {projectNavigation.map(([icon, label]) => (
            <span key={label} className={label === "Projects" ? "active" : ""}><i>{icon}</i>{label}</span>
          ))}
        </nav>
        <div className="bl-real-sidebar-foot"><span>Install workspace</span><span>Sign out</span></div>
      </aside>
      <section className="bl-real-project-main">
        <header><span>Project operations</span><div><button type="button">Start workday</button><i>⌕</i><i>EN</i></div></header>
        <main>
          <div className="bl-real-page-head"><div><h2>Projects</h2><p>Northstar Studio</p></div><button type="button">Create project</button></div>
          <div className="bl-real-search">Search projects…</div>
          <div className="bl-real-status-grid">
            {projectStatuses.map(([label, count]) => (
              <article key={label}><span className="bl-real-status-icon">◇</span><div><strong>{label}</strong><small>{label === "Delayed" ? "Needs attention" : "Operational status"}</small></div><b>{count}</b></article>
            ))}
          </div>
          <div className="bl-real-project-strip"><span>PR-2047 · Meridian rollout</span><strong>62% complete</strong><i><b /></i></div>
        </main>
      </section>
    </div>
  )}</LocalizedContent>;
}

const salonDays = ["Δευ 20", "Τρι 21", "Τετ 22", "Πεμ 23", "Παρ 24", "Σαβ 25"] as const;
const salonAppointments = [
  { day: 0, row: 1, name: "Ελένη Κ.", service: "Χρώμα · Κούρεμα", tone: "rose" },
  { day: 2, row: 2, name: "Μαρία Α.", service: "Ρεφλέ · Styling", tone: "gold" },
  { day: 3, row: 1, name: "Άννα Π.", service: "Βαφή ρίζας", tone: "sage" },
  { day: 4, row: 3, name: "Σοφία Ν.", service: "Balayage", tone: "blue" },
] as const;

export function SalonWorkspace() {
  return <LocalizedContent>{(
    <div className="bl-real-app bl-real-salon">
      <aside className="bl-real-sidebar">
        <div className="bl-real-salon-brand"><span>KS</span><strong>Salon workspace</strong><small>Ιστορικό πελατών</small></div>
        <nav>
          {[
            ["▦", "Ημερολόγιο"],
            ["◎", "Πελάτες"],
            ["✦", "Υπηρεσίες"],
            ["◉", "Χρώματα"],
            ["▤", "Προϊόντα"],
            ["▥", "Αναφορές"],
          ].map(([icon, label]) => <span key={label} className={label === "Ημερολόγιο" ? "active" : ""}><i>{icon}</i>{label}</span>)}
        </nav>
        <div className="bl-real-salon-stock"><small>Χαμηλό απόθεμα</small><strong>3 προϊόντα</strong></div>
      </aside>
      <section className="bl-real-salon-main">
        <header>
          <div><small>Ημερολόγιο</small><h2>20–25 Ιουλίου 2026</h2></div>
          <div className="bl-real-segments"><span>Ημέρα</span><span className="active">Εβδομάδα</span><span>Μήνας</span></div>
          <button type="button">+ Νέο ραντεβού</button>
        </header>
        <main>
          <div className="bl-real-calendar">
            <div className="bl-real-calendar-corner" />
            {salonDays.map((day) => <strong key={day}>{day}</strong>)}
            {["09:00", "11:00", "13:00", "15:00"].map((time, row) => (
              <div className="bl-real-calendar-row" key={time}>
                <time>{time}</time>
                {salonDays.map((day, dayIndex) => {
                  const appointment = salonAppointments.find((item) => item.day === dayIndex && item.row === row);
                  return (
                    <div className="bl-real-slot" key={day}>
                      {appointment ? <article className={`tone-${appointment.tone}`}><strong>{appointment.name}</strong><small>{appointment.service}</small></article> : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <aside className="bl-real-salon-summary">
            <small>Σήμερα</small><strong>5 ραντεβού</strong>
            <div><span>Έσοδα ημέρας</span><b>€340</b></div>
            <div><span>Επόμενο</span><b>11:00</b></div>
            <div><span>Υπόλοιπα</span><b>€75</b></div>
          </aside>
        </main>
      </section>
    </div>
  )}</LocalizedContent>;
}

function Toggle({ checked = true }: { checked?: boolean }) {
  return <span className={checked ? "bl-real-toggle checked" : "bl-real-toggle"}><i /></span>;
}

function FieldWorkspace() {
  return <LocalizedContent>{(
    <div className="bl-real-app bl-real-field">
      <aside className="bl-real-sidebar">
        <div className="bl-real-field-brand"><strong>FLEET OPS</strong><small>Field activity</small></div>
        <nav>
          {[
            ["▦", "Journée"],
            ["◎", "Profil"],
            ["▱", "Documents"],
            ["◇", "Véhicules"],
            ["◷", "Heures"],
            ["◉", "Équipe"],
          ].map(([icon, label]) => <span key={label} className={label === "Journée" ? "active" : ""}><i>{icon}</i>{label}</span>)}
        </nav>
        <div className="bl-real-driver"><span>AM</span><div><strong>Alex Martin</strong><small>Chauffeur</small></div></div>
      </aside>
      <section className="bl-real-field-main">
        <header><div><h2>D.J.A.</h2><small>Déclaration journalière d’activité</small></div><button type="button">◉ Travail en cours · 02:14</button></header>
        <main>
          <section>
            <article className="bl-real-field-panel">
              <header><div><span>▱</span><strong>Documents obligatoires</strong></div><b>Complet</b></header>
              <div className="bl-real-check-grid">
                {["Carte grise", "Carte verte", "Licence transport", "Horaires de service"].map((label) => <div key={label}><span>{label}</span><Toggle /></div>)}
              </div>
              <p>Les documents obligatoires sont présents.</p>
            </article>
            <article className="bl-real-field-panel">
              <header><div><span>◇</span><strong>Contrôle du véhicule</strong></div><b>Validé</b></header>
              <div className="bl-real-check-grid">
                {["Extérieur OK", "Sécurité OK", "Niveaux OK", "Photos compteur"].map((label, index) => <div key={label}><span>{label}</span><Toggle checked={index !== 3} /></div>)}
              </div>
            </article>
          </section>
          <aside>
            <article className="bl-real-shift-card"><small>Journée du 27 juillet</small><strong>07:58 → maintenant</strong><div><span>Travail</span><b>7h 12</b></div><div><span>Pause</span><b>0h 34</b></div><div><span>Net</span><b>6h 38</b></div><button type="button">Terminer la journée</button></article>
            <article className="bl-real-vehicle-card"><small>Véhicule assigné</small><strong>Utilitaire 04</strong><span>AB-247-FX · 84 231 km</span></article>
          </aside>
        </main>
      </section>
    </div>
  )}</LocalizedContent>;
}

const financeMetrics = [
  ["Revenue", "€48,240", "↑ 12.4%"],
  ["Expenses", "€18,905", "↓ 3.1%"],
  ["Estimated result", "€29,335", "This period"],
  ["Unpaid invoices", "€6,480", "4 invoices"],
] as const;

function FinanceWorkspace() {
  return <LocalizedContent>{(
    <div className="bl-real-app bl-real-finance">
      <aside className="bl-real-sidebar">
        <div className="bl-real-finance-brand"><span>K</span><div><strong>Private Books</strong><small>Private workspace</small></div></div>
        <small className="bl-real-nav-label">WORKSPACE</small>
        <nav>
          {[
            ["🧭", "Dashboard"],
            ["🧾", "Sales invoices"],
            ["💳", "Expenses"],
            ["📂", "Documents"],
            ["📊", "Reports"],
          ].map(([icon, label]) => <span key={label} className={label === "Dashboard" ? "active" : ""}><i>{icon}</i>{label}</span>)}
        </nav>
        <small className="bl-real-nav-label">SETTINGS</small>
        <nav><span><i>👥</i>Contacts</span><span><i>🏢</i>Company</span></nav>
        <div className="bl-real-finance-owner"><span>O</span><div><strong>Owner</strong><small>Protected session</small></div></div>
      </aside>
      <section className="bl-real-finance-main">
        <header><div><small>Financial overview</small><h2>Dashboard</h2></div><div><span>2026 · Year to date</span><button type="button">Add expense</button></div></header>
        <main>
          <div className="bl-real-finance-metrics">
            {financeMetrics.map(([label, value, detail]) => <article key={label}><div><span>{label}</span><i>↗</i></div><strong>{value}</strong><small>{detail}</small></article>)}
          </div>
          <article className="bl-real-vat">
            <header><div><span>VAT</span><strong>Estimated VAT position</strong></div><small>Current filing period</small></header>
            <div><span><small>VAT charged</small><strong>€8,680</strong></span><i>−</i><span><small>Potential deduction</small><strong>€3,410</strong></span><i>=</i><span className="balance"><small>Estimated balance</small><strong>€5,270</strong></span></div>
          </article>
          <div className="bl-real-finance-lower">
            <article className="bl-real-finance-chart"><header><strong>Revenue and expenses</strong><small>Last 6 months</small></header><div>{[38, 57, 49, 72, 66, 88].map((height, index) => <span key={height} style={{ height: `${height}%` }}><i style={{ height: `${Math.max(20, height - 31)}%` }} /><small>{["Feb", "Mar", "Apr", "May", "Jun", "Jul"][index]}</small></span>)}</div></article>
            <article className="bl-real-finance-attention"><header><strong>Needs attention</strong><b>6</b></header>{["2 missing documents", "3 overdue invoices", "1 VAT review"].map((item) => <div key={item}><span>!</span>{item}</div>)}</article>
          </div>
        </main>
      </section>
    </div>
  )}</LocalizedContent>;
}

const screens = [ProjectWorkspace, SalonWorkspace, FieldWorkspace, FinanceWorkspace] as const;

export function OperatingSystemHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const backdropY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? "0%" : "-8%", reduceMotion ? "0%" : "8%"]);
  const platformY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 76, reduceMotion ? 0 : -76]);
  const platformRotate = useTransform(scrollYProgress, [0, .2, .8, 1], [reduceMotion ? 0 : 1.6, 0, 0, reduceMotion ? 0 : -1.2]);
  const platformScale = useTransform(scrollYProgress, [0, .5, 1], [reduceMotion ? 1 : .975, 1, reduceMotion ? 1 : 1.025]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["8%", "82%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(chapters.length - 1, Math.floor(value * chapters.length));
    setActiveChapter((current) => current === next ? current : next);
  });

  const chapter = chapters[activeChapter];
  const ActiveScreen = screens[activeChapter];

  return <LocalizedContent>{(
    <section id="examples" ref={sectionRef} className="bl-os-hero bl-real-hero" aria-label="BrandLabel completed platform story">
      <div className="bl-os-sticky">
        <motion.div className="bl-os-backdrop-plane" style={{ y: backdropY }} aria-hidden="true" />
        <motion.div className="bl-os-ambient" style={{ x: glowX, backgroundColor: chapter.accent }} aria-hidden="true" />
        <Container className="bl-os-layout">
          <motion.div
            key={chapter.title}
            className="bl-os-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>{chapter.title}</h2>
            <p>{chapter.text}</p>
          </motion.div>

          <div className="bl-os-stage bl-real-stage">
            <motion.div className="bl-os-device bl-real-device" style={{ y: platformY, rotateX: platformRotate, scale: platformScale }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter}
                  className="bl-real-screen"
                  initial={reduceMotion ? false : { opacity: 0, scale: .985, x: 18 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: .99, x: -14 }}
                  transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {activeChapter === 2 ? (
              <motion.aside
                className="bl-real-field-phone"
                initial={reduceMotion ? false : { opacity: 0, y: 30, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                aria-label="Mobile field activity interface with fictional data"
              >
                <div className="bl-real-phone-notch" />
                <header><span>09:41</span><b>● ●</b></header>
                <small>JOURNÉE</small><h2>Bonjour, Alex.</h2>
                <article><span>Travail en cours</span><strong>02:14:36</strong><small>Véhicule 04 · Bruxelles</small></article>
                <button type="button">Mettre en pause</button>
                <div><span><b>5/5</b>Documents</span><span><b>3/4</b>Contrôles</span></div>
              </motion.aside>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  )}</LocalizedContent>;
}
