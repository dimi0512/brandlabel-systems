"use client";

import { Container } from "@/components/Container";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import {
  getLanguageFromPathname,
  localizedPathname,
  useLanguage,
} from "@/lib/i18n";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { LocalizedLink } from "@/components/LocalizedLink";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Shared motion language                                                    */
/* -------------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const stageVariants: Variants = {
  enter: { opacity: 0, y: 24, scale: 0.985 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    transition: { duration: 0.45, ease: EASE },
  },
};

const layerStaggerContainer: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: {},
};

const layerItem: Variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.35, ease: EASE } },
};

/* -------------------------------------------------------------------------- */
/*  HERO — layered floating-windows scene with mouse + scroll parallax        */
/* -------------------------------------------------------------------------- */

function HeroFloatingWindow({
  className = "",
  style,
  children,
  parallax,
  depth,
  delay = 0,
  isDesktop,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  parallax: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
  delay?: number;
  isDesktop: boolean;
}) {
  const x = useTransform(parallax.x, (v) => v * depth);
  const y = useTransform(parallax.y, (v) => v * depth);

  return (
    <motion.div
      initial={isDesktop ? { opacity: 0, y: 30 } : false}
      animate={isDesktop ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE, delay }}
      style={isDesktop ? { x, y, ...style } : style}
      className={`absolute rounded-2xl border border-white/14 bg-[rgba(11,31,58,0.85)] shadow-[0_30px_80px_rgba(8,16,30,0.45)] ring-1 ring-white/5 lg:bg-[rgba(11,31,58,0.55)] lg:backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MobileServicesHeroVisual({
  backY,
  contentY,
}: {
  backY: MotionValue<number>;
  contentY: MotionValue<number>;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[25rem] overflow-hidden rounded-2xl border border-[#0B1F3A]/12 bg-[#071423] p-4 text-white shadow-[0_28px_80px_rgba(11,31,58,0.26)] ring-1 ring-[#C8A96A]/10">
      <motion.div
        style={{ y: backY }}
        className="pointer-events-none absolute -inset-y-8 inset-x-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(200,169,106,0.22),transparent_58%)]"
      />
      <motion.div
        style={{ y: backY }}
        className="pointer-events-none absolute -inset-y-8 inset-x-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <motion.div style={{ y: contentY }} className="relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
              Operations layer
            </p>
            <p className="font-display mt-1 text-xl font-semibold leading-tight">
              One connected system
            </p>
          </div>
          <span className="rounded-sm border border-[#C8A96A]/35 bg-[#C8A96A]/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F3DEAA]">
            Live
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["Projects", "24"],
            ["Clients", "42"],
            ["Docs", "138"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-2"
            >
              <p className="text-[9px] uppercase tracking-[0.12em] text-slate-400">
                {label}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.05] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
              Workflow
            </p>
            <p className="text-[10px] text-slate-400">3 of 4 on track</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Lead", "Quote", "Sign", "Deliver"].map((stage, i) => (
              <div
                key={stage}
                className={`rounded-sm border px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                  i <= 2
                    ? "border-[#C8A96A]/35 bg-[#C8A96A]/14 text-[#F3DEAA]"
                    : "border-white/10 bg-white/[0.04] text-slate-400"
                }`}
              >
                {stage}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {[
            ["Approval", "Quote awaiting review"],
            ["Schedule", "Site visit today 14:00"],
            ["Signature", "OTP verified"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2"
            >
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#C8A96A]">
                {label}
              </span>
              <span className="truncate text-xs text-slate-200">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ServicesHero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDesktopHero = useIsDesktop();

  // Mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 80, damping: 22, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 80, damping: 22, mass: 0.6 });

  // Scroll parallax — desktop only (avoids scene overlapping text on stacked mobile layout)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mobileHeroBackY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const mobileHeroContentY = useTransform(scrollYProgress, [0, 1], [8, -24]);

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!isDesktopHero) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / rect.width; // -0.5..0.5
    const ny = (e.clientY - cy) / rect.height;
    // ±18px range at depth=1
    rawX.set(nx * 36);
    rawY.set(ny * 28);
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden border-b border-[#0B1F3A]/10 bg-[linear-gradient(180deg,#fbf8f1_0%,#f4efe5_55%,#ecdfc8_100%)]"
    >
      {/* Background ambient glows */}
      <motion.div
        aria-hidden
        style={isDesktopHero ? { y: glowY } : undefined}
        className="pointer-events-none absolute -left-40 top-10 size-[36rem] rounded-full bg-[#C8A96A]/22 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={isDesktopHero ? { y: glowY } : undefined}
        className="pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-[#0B1F3A]/16 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(11,31,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,58,0.05)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <Container className="relative grid min-h-[calc(100svh-80px)] items-center gap-12 py-20 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-24">
        {/* Left — text. On mobile skip entrance animation so content is visible immediately. */}
        <motion.div
          style={isDesktopHero ? { y: textY } : undefined}
          initial={isDesktopHero ? "hidden" : false}
          animate={isDesktopHero ? "show" : undefined}
          variants={isDesktopHero ? {
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          } : undefined}
        >
          <motion.h1
            variants={isDesktopHero ? fadeUp : undefined}
            className="font-display max-w-[20ch] text-balance text-5xl font-semibold leading-[0.98] text-[#0B1F3A] sm:text-6xl lg:text-[4.75rem]"
          >
            Operational platforms built around the way your business works.
          </motion.h1>
          <motion.p
            variants={isDesktopHero ? fadeUp : undefined}
            className="mt-7 max-w-xl text-lg leading-8 text-[#0B1F3A]/72"
          >
            From internal tools to customer-facing interfaces, BrandLabel Agency designs
            connected working environments that replace scattered processes with clear,
            structured workflows. Customer portals and public interfaces can be included
            where they support the wider operation.
          </motion.p>
          <motion.div variants={isDesktopHero ? fadeUp : undefined} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryCTA href="/contact" variant="dark">
              Discuss your operation
            </PrimaryCTA>
          </motion.div>
          <motion.p
            variants={isDesktopHero ? fadeUp : undefined}
            className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1F3A] sm:text-base"
          >
            Custom-built · Designed in-house · Maintained for the long run
          </motion.p>
        </motion.div>

        <div className="lg:hidden">
          <MobileServicesHeroVisual
            backY={mobileHeroBackY}
            contentY={mobileHeroContentY}
          />
        </div>

        {/* Right — layered floating-windows scene (pointer-events-none: decorative only) */}
        <motion.div
          style={isDesktopHero ? { y: sceneY } : undefined}
          className="pointer-events-none relative mx-auto hidden aspect-[4/3] w-full max-w-[640px] lg:block"
        >
          {/* Backdrop slab */}
          <motion.div
            aria-hidden
            initial={isDesktopHero ? { opacity: 0, y: 18 } : false}
            animate={isDesktopHero ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE }}
            className="absolute inset-x-0 top-[6%] mx-auto h-[88%] w-[92%] rounded-[28px] bg-[linear-gradient(160deg,#0b1f3a_0%,#142f55_55%,#0b1f3a_100%)] shadow-[0_60px_140px_rgba(11,31,58,0.35)] ring-1 ring-[#C8A96A]/15"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(ellipse_at_25%_15%,rgba(200,169,106,0.22),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />
            <div className="pointer-events-none absolute -top-px left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-[#C8A96A]/65 to-transparent" />
          </motion.div>

          {/* Window 1 — Approvals (background depth) */}
          <HeroFloatingWindow
            isDesktop={isDesktopHero}
            parallax={{ x: px, y: py }}
            depth={0.18}
            delay={0.1}
            className="left-[6%] top-[4%] w-[52%] p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
                Approvals
              </p>
              <span className="rounded-full bg-[#C8A96A]/18 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#F3DEAA]">
                3 pending
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {[
                { name: "Quote · Meridian", state: "Awaiting", tone: "amber" },
                { name: "PO · Site 04", state: "Approved", tone: "ok" },
                { name: "Contract · v3", state: "In review", tone: "muted" },
              ].map((row) => (
                <li
                  key={row.name}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
                >
                  <span className="truncate text-[11px] text-slate-100">{row.name}</span>
                  <span
                    className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
                      row.tone === "amber"
                        ? "text-[#F3DEAA]"
                        : row.tone === "ok"
                          ? "text-emerald-200/85"
                          : "text-slate-400"
                    }`}
                  >
                    {row.state}
                  </span>
                </li>
              ))}
            </ul>
          </HeroFloatingWindow>

          {/* Window 2 — Schedule (mid depth) */}
          <HeroFloatingWindow
            isDesktop={isDesktopHero}
            parallax={{ x: px, y: py }}
            depth={0.32}
            delay={0.18}
            className="right-[5%] top-[18%] w-[46%] p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
                Schedule
              </p>
              <span className="text-[9px] text-slate-400">Wed · 14</span>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1">
              {Array.from({ length: 21 }).map((_, i) => {
                const filled = [3, 5, 8, 12, 14, 17].includes(i);
                const accent = i === 14;
                return (
                  <div
                    key={i}
                    className={`h-3 rounded-sm ${
                      accent
                        ? "bg-[#C8A96A]"
                        : filled
                          ? "bg-white/40"
                          : "bg-white/[0.07]"
                    }`}
                  />
                );
              })}
            </div>
            <div className="mt-3 rounded-md border border-[#C8A96A]/30 bg-[#C8A96A]/10 px-2.5 py-1.5">
              <p className="text-[10px] font-semibold text-[#F3DEAA]">14:00 · Site visit</p>
              <p className="text-[9px] text-slate-300/85">Meridian · Dock 4</p>
            </div>
          </HeroFloatingWindow>

          {/* Window 3 — Signature (foreground) */}
          <HeroFloatingWindow
            isDesktop={isDesktopHero}
            parallax={{ x: px, y: py }}
            depth={0.55}
            delay={0.28}
            className="bottom-[8%] left-[14%] w-[48%] p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
                Signature
              </p>
              <span className="rounded-sm border border-[#C8A96A]/35 bg-[#C8A96A]/15 px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.16em] text-[#F3DEAA]">
                OTP OK
              </span>
            </div>
            <p className="mt-2 font-display text-base font-semibold text-white">
              Master services · v3
            </p>
            <p className="mt-1 text-[10px] text-slate-300/80">ops@meridian.test</p>
            <div className="mt-3 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent" />
            <p className="mt-2 font-display text-[15px] italic text-white/95">
              Signed · 09:42
            </p>
          </HeroFloatingWindow>

          {/* Window 4 — Workflow chip (most-foreground) */}
          <HeroFloatingWindow
            isDesktop={isDesktopHero}
            parallax={{ x: px, y: py }}
            depth={0.7}
            delay={0.4}
            className="bottom-[20%] right-[6%] w-[36%] p-3"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
              Workflow
            </p>
            <div className="mt-2 flex items-center gap-1">
              {["Lead", "Quote", "Sign", "Deliver"].map((stage, i) => (
                <div key={stage} className="flex items-center gap-1">
                  <span
                    className={`rounded-sm px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] ${
                      i <= 2
                        ? "bg-[#C8A96A]/18 text-[#F3DEAA]"
                        : "bg-white/[0.06] text-slate-400"
                    }`}
                  >
                    {stage}
                  </span>
                  {i < 3 && <span className="text-[8px] text-slate-500">→</span>}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[9px] text-slate-300/75">3 of 4 · on track</p>
          </HeroFloatingWindow>
        </motion.div>
      </Container>
    </section>
  );
}

function PrimaryCTA({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "dark" | "ghost";
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const activeLanguage = getLanguageFromPathname(pathname) ?? language;
  const base =
    "group relative inline-flex min-h-12 touch-manipulation items-center justify-center overflow-hidden rounded-sm px-6 text-base font-semibold transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A] sm:text-lg";
  const styles =
    variant === "dark"
      ? "bg-[#C8A96A] text-[#0B1F3A] shadow-[0_16px_38px_rgba(200,169,106,0.28)] hover:bg-[#D6BA7D]"
      : "border border-[#0B1F3A]/15 bg-white/65 text-[#0B1F3A] hover:border-[#C8A96A]/55 hover:bg-white hover:shadow-[0_18px_44px_rgba(11,31,58,0.12)]";
  return (
    <MotionLink
      href={localizedPathname(href, activeLanguage)}
      whileTap={{ scale: 0.97, opacity: 0.88 }}
      transition={{ duration: 0.12 }}
      className={`${base} ${styles}`}
    >
      <span className="relative z-[1] tracking-wide">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 translate-x-0 bg-gradient-to-r from-transparent via-[#C8A96A]/30 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[300%] group-hover:opacity-100"
      />
    </MotionLink>
  );
}

/* -------------------------------------------------------------------------- */
/*  SHOWCASE — sticky split-screen with 5 services                            */
/* -------------------------------------------------------------------------- */

type ServiceKey =
  | "custom-systems"
  | "web-apps"
  | "websites"
  | "automation"
  | "maintenance";

type Service = {
  key: ServiceKey;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  how: string;
  bestFor: string;
  deliverables: string;
};

const SERVICES: Service[] = [
  {
    key: "custom-systems",
    number: "01",
    title: "Custom Systems",
    tagline: "Operational command center",
    description: "One system for projects, clients, documents, schedules, and approvals.",
    highlights: [
      "Centralized projects, clients, tasks",
      "Approval gates and audit trails",
      "Scheduling, signatures, documents",
    ],
    how: "We map the workflow, design the key screens, then build the operating dashboard.",
    bestFor: "Teams managing work across too many tools.",
    deliverables: "Dashboard, client records, task flow, documents, permissions, and launch support.",
  },
  {
    key: "web-apps",
    number: "02",
    title: "Web Apps",
    tagline: "Modern client portals & internal apps",
    description: "Client portals and internal apps for clear daily actions.",
    highlights: [
      "Onboarding & secure sign-in",
      "Role-based dashboards",
      "Live updates and collaboration",
    ],
    how: "We define user journeys, then build the portal, forms, dashboard, and access flow.",
    bestFor: "Portals, booking tools, quote approvals, and internal apps.",
    deliverables: "Responsive app, portal screens, forms, notifications, and handover notes.",
  },
  {
    key: "websites",
    number: "03",
    title: "Websites",
    tagline: "Premium, conversion-focused presence",
    description: "Premium websites that explain your offer and support qualified enquiries.",
    highlights: [
      "Editorial layouts and tone",
      "Lead capture and analytics",
      "Brand-grade content systems",
    ],
    how: "We clarify the offer, structure the pages, design the interface, and build the site.",
    bestFor: "Service businesses that need clearer positioning and stronger trust.",
    deliverables: "Pages, responsive design, SEO metadata, contact flow, analytics, and launch checklist.",
  },
  {
    key: "automation",
    number: "04",
    title: "Automation & Workflow Tools",
    tagline: "Workflow orchestration",
    description: "Automations for repetitive work, reminders, approvals, and handoffs.",
    highlights: [
      "Connected systems and triggers",
      "Routing and approval logic",
      "Sync states across tools",
    ],
    how: "We define triggers, connect tools, and test the workflow before launch.",
    bestFor: "Follow-ups, document routing, reminders, approvals, handoffs, email flows, and status updates.",
    deliverables: "Workflow map, automation rules, connected tools, checks, and operating guide.",
  },
  {
    key: "maintenance",
    number: "05",
    title: "Maintenance & Improvements",
    tagline: "Care, performance, evolution",
    description: "Ongoing care so your system stays fast, secure, and useful.",
    highlights: [
      "Uptime & performance",
      "Security & dependency updates",
      "Issue tracking and roadmap",
    ],
    how: "We monitor, fix issues, improve slow points, and add small features.",
    bestFor: "Businesses that want their system to stay useful after launch.",
    deliverables: "Checks, refinements, bug fixes, performance updates, and improvement planning.",
  },
];

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-[#0B1F3A]/10 bg-white/88 p-5 shadow-[0_12px_28px_rgba(11,31,58,0.06)]">
      <p className="text-base font-semibold uppercase tracking-[0.12em] text-[#087E74]">
        {title}
      </p>
      <p className="mt-3 text-xl leading-9 text-slate-600">
        {children}
      </p>
    </div>
  );
}

function sceneFor(key: ServiceKey) {
  if (key === "custom-systems") return <SceneCustomSystems />;
  if (key === "web-apps") return <SceneWebApps />;
  if (key === "websites") return <SceneWebsites />;
  if (key === "automation") return <SceneAutomation />;
  return <SceneMaintenance />;
}

function MobileAccordion() {
  const [openKey, setOpenKey] = useState<ServiceKey | null>(SERVICES[0].key);

  return (
    <ul className="overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(20,40,72,0.85),rgba(7,17,32,0.92))] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      {SERVICES.map((s, idx) => {
        const isOpen = openKey === s.key;
        const isLast = idx === SERVICES.length - 1;
        return (
          <li
            key={s.key}
            className={!isLast ? "border-b border-white/8" : undefined}
          >
            <motion.button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${s.key}`}
              onClick={() => setOpenKey((k) => (k === s.key ? null : s.key))}
              whileTap={{ opacity: 0.75 }}
              transition={{ duration: 0.1 }}
              className="group flex w-full touch-manipulation items-center gap-4 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#C8A96A]"
            >
              <span className="font-display text-base tabular-nums text-[#C8A96A]">
                {s.number}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold leading-tight text-white">
                  {s.title}
                </p>
                <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-white/62">
                  {s.tagline}
                </p>
              </div>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`grid size-8 shrink-0 place-items-center rounded-full border transition-[background-color,border-color] duration-300 ${
                  isOpen
                    ? "border-[#C8A96A]/55 bg-[#C8A96A]/15 text-[#F3DEAA]"
                    : "border-white/15 bg-white/[0.04] text-[#C8A96A]"
                }`}
              >
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.section
                  key="panel"
                  id={`accordion-panel-${s.key}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: EASE },
                    opacity: { duration: 0.3, ease: EASE },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-5 pb-6">
                    <p className="text-xl leading-9 text-white/88">
                      {s.description}
                    </p>
                    <ul className="mt-4 grid gap-2">
                      {s.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 rounded-sm border border-white/12 bg-white/[0.05] px-3 py-2.5 text-lg leading-7 tracking-wide text-white/88"
                        >
                          <span className="mt-1 size-1 shrink-0 rounded-full bg-[#C8A96A]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 grid gap-3">
                      <DetailBlock title="How we build it">{s.how}</DetailBlock>
                      <DetailBlock title="Best for">{s.bestFor}</DetailBlock>
                      <DetailBlock title="Typical deliverables">{s.deliverables}</DetailBlock>
                    </div>
                    {/* Scene visual — softer surface so layers read clearly on phone */}
                    <div
                      className={`relative mt-5 aspect-[16/10] overflow-hidden rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
                        s.key === "web-apps" || s.key === "automation"
                          ? "border-white/12 bg-[linear-gradient(165deg,rgba(20,40,72,0.7),rgba(8,18,36,0.78))]"
                          : "border-[#0B1F3A]/10 bg-[linear-gradient(160deg,#f9fcfb_0%,#fff9ec_100%)]"
                      }`}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] opacity-55"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(200,169,106,0.22),transparent_55%)]"
                      />
                      <motion.div
                        variants={layerStaggerContainer}
                        initial={false}
                        animate="center"
                        className="relative h-full"
                      >
                        {sceneFor(s.key)}
                      </motion.div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function ServicesShowcase() {
  const [active, setActive] = useState<ServiceKey | null>(SERVICES[0].key);
  const activeService = useMemo(
    () => (active ? SERVICES.find((s) => s.key === active) ?? null : null),
    [active],
  );

  return (
    <section className="relative bg-[linear-gradient(180deg,#f8fbfa_0%,#fffdf8_48%,#eef7f6_100%)] py-24 text-[#0B1F3A] sm:py-28">
      {/* Soft warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(43,179,163,0.18),transparent_55%),radial-gradient(ellipse_at_85%_100%,rgba(200,169,106,0.2),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(11,31,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,58,0.05)_1px,transparent_1px)] [background-size:60px_60px]"
      />

      <Container className="relative">
        <div className="max-w-2xl">
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-lg font-semibold uppercase tracking-[0.18em] text-[#0B1F3A] sm:text-xl"
          >
            What we build
          </motion.p>
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl"
          >
            Five disciplines, composed into one operating layer.
          </motion.h2>
        </div>

        {/* Desktop: sticky split-screen */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
          {/* Sticky vertical nav */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ul className="flex flex-col">
              {SERVICES.map((s) => {
                const isActive = s.key === active;
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() =>
                        setActive((k) => (k === s.key ? null : s.key))
                      }
                      className="group relative w-full touch-manipulation border-t border-[#0B1F3A]/10 py-6 text-left transition-[background-color,padding,border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-0.5 hover:border-[#2BB3A3]/35 hover:bg-white/70 hover:shadow-[0_18px_44px_rgba(11,31,58,0.09)] active:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2BB3A3]"
                      style={isActive ? { paddingLeft: 18 } : undefined}
                    >
                      {/* Gold indicator bar */}
                      <motion.span
                        aria-hidden
                        layout
                        className="absolute left-0 top-1/2 block h-10 -translate-y-1/2 rounded-r bg-[#C8A96A]"
                        animate={{
                          width: isActive ? 4 : 0,
                          opacity: isActive ? 1 : 0,
                          boxShadow: isActive
                            ? "0 0 22px rgba(43,179,163,0.45)"
                            : "0 0 0 rgba(200,169,106,0)",
                        }}
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                      <div className="flex items-baseline gap-5">
                        <span
                          className={`font-display text-base transition-colors duration-500 ${
                            isActive ? "text-[#087E74]" : "text-[#0B1F3A]/35"
                          }`}
                        >
                          {s.number}
                        </span>
                        <span
                          className={`font-display text-[1.7rem] font-semibold tracking-tight transition-[color,transform] duration-500 ease-out group-hover:translate-x-0.5 sm:text-3xl ${
                            isActive ? "text-[#0B1F3A]" : "text-[#0B1F3A]/45"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                      <p
                        className={`mt-2 pl-10 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${
                          isActive ? "text-[#087E74]" : "text-[#0B1F3A]/35"
                        }`}
                      >
                        {s.tagline}
                      </p>
                    </button>
                  </li>
                );
              })}
              <li className="border-t border-[#0B1F3A]/10" aria-hidden />
            </ul>
          </div>

          {/* Right — cinematic stage */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-[#0B1F3A]/10 bg-white/86 p-6 shadow-[0_34px_90px_rgba(11,31,58,0.12)] sm:p-8">
              {/* Decorative gold rule */}
              <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#2BB3A3]/55 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_-10%,rgba(43,179,163,0.14),transparent_60%)]" />

              <div className="relative">
                <AnimatePresence mode="wait">
                  {activeService ? (
                    <motion.div
                      key={activeService.key}
                      variants={stageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg text-[#C8A96A]">
                          {activeService.number}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0B1F3A]/60">
                          {activeService.tagline}
                        </span>
                      </div>
                      <h3 className="font-display mt-3 text-balance text-4xl font-semibold leading-[1.04] sm:text-[2.75rem] lg:text-[3rem]">
                        {activeService.title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-2xl leading-10 text-slate-600">
                        {activeService.description}
                      </p>

                      <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                        {activeService.highlights.map((h) => (
                          <li
                            key={h}
                            className="rounded-sm border border-[#0B1F3A]/10 bg-[#F7FBFA] px-4 py-3 text-lg leading-7 tracking-wide text-slate-700"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 grid gap-3 lg:grid-cols-3">
                        <DetailBlock title="How we build it">{activeService.how}</DetailBlock>
                        <DetailBlock title="Best for">{activeService.bestFor}</DetailBlock>
                        <DetailBlock title="Typical deliverables">{activeService.deliverables}</DetailBlock>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
                        Browse capabilities
                      </p>
                      <h3 className="font-display mt-3 text-balance text-4xl font-semibold leading-[1.04] sm:text-[2.75rem] lg:text-[3rem]">
                        Choose a capability to explore.
                      </h3>
                      <p className="mt-5 max-w-2xl text-xl leading-9 text-slate-600">
                        Click any of the five disciplines on the left to see how it
                        fits into a complete operating layer for your business.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Visual stage */}
                <div
                  className={`relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
                    activeService?.key === "web-apps" || activeService?.key === "automation"
                      ? "border-white/10 bg-[linear-gradient(165deg,rgba(11,31,58,0.85),rgba(5,12,24,0.95))]"
                      : "border-[#0B1F3A]/10 bg-[linear-gradient(160deg,#f9fcfb_0%,#fff9ec_100%)]"
                  }`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] opacity-60"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(200,169,106,0.18),transparent_55%)]"
                  />
                  <AnimatePresence mode="wait">
                    {activeService ? (
                      <motion.div
                        key={activeService.key}
                        variants={layerStaggerContainer}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="relative h-full"
                      >
                        {activeService.key === "custom-systems" && <SceneCustomSystems />}
                        {activeService.key === "web-apps" && <SceneWebApps />}
                        {activeService.key === "websites" && <SceneWebsites />}
                        {activeService.key === "automation" && <SceneAutomation />}
                        {activeService.key === "maintenance" && <SceneMaintenance />}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle-stage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="relative grid h-full place-items-center"
                      >
                        <div className="text-center">
                          <p className="font-display text-2xl font-semibold text-white/55">
                            ✦
                          </p>
                          <p className="mt-3 text-[11px] uppercase tracking-[0.32em] text-white/45">
                            Select a capability
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & mobile: tap-to-expand accordion — one open at a time */}
        <div className="mt-10 lg:hidden">
          <MobileAccordion />
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  SCENES — one per service                                                  */
/* -------------------------------------------------------------------------- */

function SceneLayer({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div variants={layerItem} className={`absolute ${className}`}>
      {children}
    </motion.div>
  );
}

function SceneCustomSystems() {
  return (
    <>
      <SceneLayer className="left-[5%] top-[8%] w-[44%] rounded-xl border border-[#0B1F3A]/10 bg-white/92 p-3 text-[#0B1F3A] shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#087E74]">
          Approvals
        </p>
        <ul className="mt-2.5 space-y-1.5">
          {["Quote · Meridian", "PO · Site 04", "Contract · v3"].map((row, i) => (
            <li
              key={row}
              className="flex items-center justify-between rounded border border-[#0B1F3A]/10 bg-[#F7FBFA] px-2 py-1 text-[10px] text-[#0B1F3A]"
            >
              <span className="truncate">{row}</span>
              <span
                className={`text-[8px] uppercase tracking-[0.14em] ${i === 0 ? "text-[#8F6B24]" : "text-slate-500"}`}
              >
                {i === 0 ? "Awaiting" : i === 1 ? "Approved" : "Review"}
              </span>
            </li>
          ))}
        </ul>
      </SceneLayer>
      <SceneLayer className="right-[5%] top-[14%] w-[42%] rounded-xl border border-[#0B1F3A]/10 bg-white/92 p-3 text-[#0B1F3A] shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#087E74]">
            Schedule
          </p>
          <span className="text-[9px] text-slate-500">Wed</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-0.5">
          {Array.from({ length: 21 }).map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded-sm ${i === 13 ? "bg-[#C8A96A]" : [3, 7, 10, 16].includes(i) ? "bg-[#2BB3A3]/40" : "bg-[#0B1F3A]/8"}`}
            />
          ))}
        </div>
        <p className="mt-2 text-[9px] text-slate-600">14:00 · Site visit</p>
      </SceneLayer>
      <SceneLayer className="bottom-[8%] left-[14%] w-[60%] rounded-xl border border-[#C8A96A]/30 bg-[#fff8e7]/90 p-3 text-[#0B1F3A] shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8F6B24]">
          Workflow
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          {["Lead", "Quote", "Sign", "Deliver", "Archive"].map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${i <= 2 ? "bg-[#C8A96A]/25 text-[#0B1F3A]" : "bg-white/70 text-slate-500"}`}
              >
                {s}
              </span>
              {i < 4 && <span className="text-[8px] text-slate-500">→</span>}
            </div>
          ))}
        </div>
      </SceneLayer>
    </>
  );
}

function SceneWebApps() {
  return (
    <>
      <SceneLayer className="left-[5%] top-[7%] w-[62%] overflow-hidden rounded-xl border border-white/14 bg-[linear-gradient(145deg,rgba(11,31,58,0.92),rgba(5,15,29,0.94))] p-0 shadow-2xl backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(200,169,106,0.22),transparent_32%)]" />
        <div className="relative z-10 flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
          <div className="ml-2 flex h-4 flex-1 items-center rounded-sm bg-white/[0.07] px-2 text-[8px] text-slate-400">
            portal.brandlabel.app / workspace
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-[0.3fr_0.7fr] gap-2 p-3">
          <div className="space-y-1">
            {["Home", "Clients", "Documents", "Team"].map((it, i) => (
              <div
                key={it}
                className={`rounded px-1.5 py-1 text-[9px] ${i === 0 ? "border border-[#C8A96A]/30 bg-[#C8A96A]/15 text-[#F3DEAA]" : "text-slate-400"}`}
              >
                {it}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[
                ["Open tasks", "34"],
                ["Clients", "18"],
                ["Approvals", "7"],
              ].map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-white/[0.055] p-1.5">
                  <p className="text-[7px] uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="text-sm font-semibold tabular-nums text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-[#C8A96A]/30 bg-[#C8A96A]/10 p-2">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#F3DEAA]">
                  Client request
                </p>
                <span className="rounded bg-[#C8A96A] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-[#0B1F3A]">
                  Ready
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <span className="block h-1.5 w-[88%] rounded-full bg-white/35" />
                <span className="block h-1.5 w-[66%] rounded-full bg-white/18" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {["Message thread", "Shared files"].map((item, i) => (
                <div key={item} className="rounded border border-white/10 bg-black/20 p-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${i === 0 ? "bg-[#C8A96A]" : "bg-white/35"}`} />
                    <p className="truncate text-[8px] font-medium text-slate-200">{item}</p>
                  </div>
                  <div className="mt-1 h-1 w-[70%] rounded-full bg-white/15" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SceneLayer>
      <SceneLayer className="right-[5%] top-[16%] w-[34%] rounded-xl border border-white/12 bg-[rgba(11,31,58,0.84)] p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
          Access flow
        </p>
        <ol className="mt-2 space-y-1.5 text-[10px] text-slate-200">
          {["Invite client", "Verify email", "Open portal"].map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={`grid size-3.5 place-items-center rounded-full text-[8px] ${i < 2 ? "bg-[#C8A96A] text-[#0B1F3A]" : "border border-white/25 text-slate-400"}`}
              >
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </SceneLayer>
      <SceneLayer className="bottom-[6%] left-[16%] w-[58%] rounded-xl border border-white/12 bg-[rgba(11,31,58,0.86)] p-3 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
            Live activity
          </p>
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8px] font-semibold text-emerald-200">
            Synced
          </span>
        </div>
        <ul className="mt-2 space-y-1">
          {["Maya joined the portal", "Brief.pdf approved", "Comment added to Project Atlas"].map((line) => (
            <li key={line} className="flex items-center gap-2 text-[9px] text-slate-300">
              <span className="size-1 rounded-full bg-[#C8A96A]" />
              <span className="truncate">{line}</span>
            </li>
          ))}
        </ul>
      </SceneLayer>
    </>
  );
}

function SceneWebsites() {
  return (
    <>
      <SceneLayer className="left-[5%] top-[6%] right-[5%] rounded-xl border border-white/15 bg-[rgba(255,253,248,0.97)] text-[#0B1F3A] p-0 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#0B1F3A]/10 bg-white px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-sm bg-[#C8A96A]" />
            <span className="font-display text-[8px] font-semibold tracking-[0.2em]">
              MERIDIAN
            </span>
          </div>
          <div className="flex items-center gap-2 text-[7px] uppercase tracking-[0.18em] text-[#0B1F3A]/60">
            <span>Work</span>
            <span>About</span>
            <span>Services</span>
            <span className="rounded-sm bg-[#0B1F3A] px-1.5 py-[2px] text-[#F3DEAA]">
              Contact
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 p-3">
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
              Premium studio
            </p>
            <p className="font-display mt-1 text-[12px] font-semibold leading-[1.05]">
              Built to convert. Crafted to last.
            </p>
            <p className="mt-1.5 text-[8px] leading-[1.35] text-[#0B1F3A]/65">
              Strategy, design, and build for businesses that need a sharper online presence.
            </p>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-sm bg-[#0B1F3A] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-[#F3DEAA]">
                Get a quote
              </span>
              <span className="rounded-sm border border-[#0B1F3A]/25 bg-white px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.16em]">
                Our work
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[#0B1F3A] via-[#142f55] to-[#0B1F3A] ring-1 ring-[#0B1F3A]/20">
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(200,169,106,0.35),transparent_60%)]" />
            <span className="absolute right-1.5 top-1.5 rounded-full bg-[#C8A96A]/25 px-1.5 py-[2px] text-[7px] uppercase tracking-[0.16em] text-[#F3DEAA]">
              Featured
            </span>
            <div className="absolute bottom-1.5 left-1.5 right-1.5">
              <p className="text-[7px] uppercase tracking-[0.16em] text-[#F3DEAA]/85">
                Case study
              </p>
              <p className="font-display text-[8px] font-semibold text-white">
                Brand & site relaunch
              </p>
            </div>
          </div>
        </div>
      </SceneLayer>
      <SceneLayer className="bottom-[6%] right-[6%] w-[48%] rounded-xl border border-white/12 bg-[rgba(11,31,58,0.7)] p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8A96A]">
          Analytics
        </p>
        <div className="mt-2 flex h-12 items-end gap-1">
          {[35, 52, 44, 68, 60, 78, 72, 86].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0B1F3A] to-[#C8A96A]/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-slate-300">
          <span>Visitors · 1,284</span>
          <span className="text-[#F3DEAA]">+18%</span>
        </div>
      </SceneLayer>
    </>
  );
}

function SceneAutomation() {
  // Four outer nodes around a central hub. Coordinates in % of stage box.
  const nodes = [
    { x: 14, y: 22, label: "CRM", sub: "Trigger" },
    { x: 86, y: 22, label: "Email", sub: "Sender" },
    { x: 86, y: 78, label: "Calendar", sub: "Schedule" },
    { x: 14, y: 78, label: "Storage", sub: "Archive" },
  ];
  const hub = { x: 50, y: 50 };

  return (
    <>
      {/* Soft glow around the hub */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "50%",
          width: "60%",
          height: "60%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="size-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.22),transparent_70%)]" />
      </div>

      {/* Connecting paths with animated flow */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="autoFlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(200,169,106,0)" />
            <stop offset="50%" stopColor="rgba(200,169,106,0.85)" />
            <stop offset="100%" stopColor="rgba(200,169,106,0)" />
          </linearGradient>
        </defs>
        {nodes.map((n, i) => (
          <g key={n.label}>
            {/* Static base line */}
            <motion.line
              x1={n.x}
              y1={n.y}
              x2={hub.x}
              y2={hub.y}
              stroke="rgba(200,169,106,0.28)"
              strokeWidth={0.35}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.1 }}
            />
            {/* Animated flowing dashes */}
            <motion.line
              x1={n.x}
              y1={n.y}
              x2={hub.x}
              y2={hub.y}
              stroke="url(#autoFlow)"
              strokeWidth={0.7}
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={{ strokeDashoffset: -36, opacity: 1 }}
              transition={{
                strokeDashoffset: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.35,
                },
                opacity: { duration: 0.8, delay: 0.6 + i * 0.1 },
              }}
            />
          </g>
        ))}
      </svg>

      {/* Outer nodes */}
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute z-10"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            variants={layerItem}
            className="rounded-lg border border-white/14 bg-[rgba(11,31,58,0.85)] px-2.5 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C8A96A]">
              {n.label}
            </p>
            <p className="mt-0.5 text-[8px] text-slate-300/85">{n.sub}</p>
          </motion.div>
        </div>
      ))}

      {/* Central hub */}
      <div
        className="absolute z-20"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <motion.div variants={layerItem} className="relative">
          {/* Pulsing ring */}
          <motion.span
            aria-hidden
            className="absolute -inset-2 rounded-full border border-[#C8A96A]/50"
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
          <div className="relative rounded-full border border-[#C8A96A]/55 bg-[rgba(200,169,106,0.18)] px-3 py-2 shadow-[0_0_30px_rgba(200,169,106,0.45)] backdrop-blur-md">
            <p className="text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-[#F3DEAA]">
              Hub
            </p>
            <p className="mt-0.5 text-center text-[8px] text-slate-100/85">
              Routing engine
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom status strip */}
      <div className="absolute bottom-2 left-2 right-2 z-10">
        <motion.div
          variants={layerItem}
          className="flex items-center justify-between rounded-md border border-white/12 bg-[rgba(11,31,58,0.78)] px-2.5 py-1.5 backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5">
            <motion.span
              className="size-1.5 rounded-full bg-[#C8A96A] shadow-[0_0_8px_rgba(200,169,106,0.85)]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#F3DEAA]">
              Live
            </span>
          </div>
          <span className="text-[8px] text-slate-300/85">
            12 triggers · 3 routes · synced
          </span>
        </motion.div>
      </div>
    </>
  );
}

function SceneMaintenance() {
  return (
    <>
      <SceneLayer className="left-[5%] top-[8%] w-[44%] rounded-xl border border-[#0B1F3A]/10 bg-white/92 p-3 text-[#0B1F3A] shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#087E74]">
          Uptime
        </p>
        <div className="mt-2 flex items-end gap-2">
          <p className="font-display text-3xl font-semibold text-[#0B1F3A]">99.98%</p>
          <p className="pb-1 text-[9px] text-[#087E74]">last 90 days</p>
        </div>
        <div className="mt-2 flex h-2 gap-[2px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={`flex-1 rounded-sm ${i === 9 ? "bg-[#C8A96A]" : "bg-[#2BB3A3]/55"}`}
            />
          ))}
        </div>
      </SceneLayer>
      <SceneLayer className="right-[5%] top-[10%] w-[44%] rounded-xl border border-[#0B1F3A]/10 bg-white/92 p-3 text-[#0B1F3A] shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#087E74]">
          Performance
        </p>
        <ul className="mt-2 space-y-1.5 text-[10px]">
          {[
            { k: "TTFB", v: "184 ms" },
            { k: "LCP", v: "1.2 s" },
            { k: "CLS", v: "0.02" },
          ].map((m) => (
            <li
              key={m.k}
              className="flex items-center justify-between rounded border border-[#0B1F3A]/10 bg-[#F7FBFA] px-2 py-1"
            >
              <span className="text-slate-600">{m.k}</span>
              <span className="font-semibold text-[#0B1F3A]">{m.v}</span>
            </li>
          ))}
        </ul>
      </SceneLayer>
      <SceneLayer className="bottom-[8%] left-[14%] w-[64%] rounded-xl border border-[#C8A96A]/30 bg-[#fff8e7]/90 p-3 text-[#0B1F3A] shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8F6B24]">
          Releases
        </p>
        <ul className="mt-2 space-y-1">
          {[
            { v: "v1.18.2", note: "Security patches", tag: "shipped" },
            { v: "v1.18.3", note: "Calendar refinements", tag: "in QA" },
            { v: "v1.19.0", note: "Multi-language", tag: "planned" },
          ].map((r) => (
            <li
              key={r.v}
              className="flex items-center justify-between rounded border border-[#0B1F3A]/10 bg-white/70 px-2 py-1 text-[10px]"
            >
              <span className="font-display tabular-nums text-[#0B1F3A]">{r.v}</span>
              <span className="text-slate-600">{r.note}</span>
              <span
                className={`text-[8px] uppercase tracking-[0.16em] ${r.tag === "shipped" ? "text-[#087E74]" : r.tag === "in QA" ? "text-[#8F6B24]" : "text-slate-500"}`}
              >
                {r.tag}
              </span>
            </li>
          ))}
        </ul>
      </SceneLayer>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  PARALLAX EDITORIAL STATEMENT                                              */
/* -------------------------------------------------------------------------- */

function ParallaxStatement() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Two-layer depth: back moves slowly, mid moves faster, foreground scrolls opposite.
  const backY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["-38%", "38%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["28%", "-28%"]);
  const mobileBackY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const mobileMidY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const mobileFgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const lampOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.5, 1, 0.5],
  );
  // Lifted veil so the warm workspace background is clearly visible.
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.45, 0.3, 0.3, 0.45],
  );

  // Use lighter ranges below 900px so the parallax is visible without text drift.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 900px)");
    const sync = () => setIsDesktop(m.matches);
    m.addEventListener("change", sync);
    const id = window.requestAnimationFrame(sync);
    return () => {
      m.removeEventListener("change", sync);
      window.cancelAnimationFrame(id);
    };
  }, []);

  const SUPPORTING = [
    "One workflow. One source of truth.",
    "From internal dashboards to customer-facing portals.",
    "Systems that scale with the business.",
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0B1F3A] text-white"
      aria-label="Editorial parallax"
    >
      {/* BACK LAYER */}
      <motion.div
        aria-hidden
        style={{ y: isDesktop ? backY : mobileBackY }}
        className="pointer-events-none absolute -top-[40%] -bottom-[40%] left-0 right-0"
      >
        {/* Warm wood floor / desk surface */}
        <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(180deg,#3f2918_0%,#1c1108_100%)]" />
        {/* Wall warm wash */}
        <div className="absolute inset-x-0 top-0 h-[56%] bg-[linear-gradient(180deg,#2a2114_0%,#15110a_100%)]" />
        {/* Window light wash */}
        <div className="absolute left-[8%] top-[10%] h-[58%] w-[34%] rounded-sm bg-[linear-gradient(180deg,rgba(252,229,180,0.45)_0%,rgba(80,55,28,0.08)_100%)] blur-[3px]" />
        <div className="absolute left-[8%] top-[10%] h-[58%] w-[34%] rounded-sm border-l border-r border-white/12" />
      </motion.div>

      {/* MID LAYER */}
      <motion.div
        aria-hidden
        style={{ y: isDesktop ? midY : mobileMidY }}
        className="pointer-events-none absolute -top-[55%] -bottom-[55%] left-0 right-0"
      >
        {/* Window mullions */}
        {[0, 1, 2].map((i) => (
          <span
            key={`mul-${i}`}
            className="absolute left-[8%] w-[34%] border-t border-white/14"
            style={{ top: `${10 + (i + 1) * 14.5}%` }}
          />
        ))}
        {/* Architectural beam */}
        <span className="absolute left-0 right-0 top-[58%] h-[2px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.22)_50%,transparent_100%)]" />
        {/* Distant pendant lamp cord */}
        <span className="absolute right-[18%] top-[8%] h-[14%] w-[1px] bg-white/22" />
        {/* Pendant lamp glow (its own opacity-driven by scroll for breathing) */}
        <motion.span
          style={{ opacity: lampOpacity }}
          className="absolute right-[16%] top-[22%] size-3 rounded-full bg-[#C8A96A]/70 shadow-[0_0_60px_rgba(200,169,106,0.85)]"
        />
        {/* Desk surface highlight */}
        <span className="absolute left-[12%] right-[14%] top-[64%] h-[2px] rounded-full bg-[linear-gradient(90deg,transparent,rgba(200,169,106,0.55),transparent)]" />
        {/* Soft books / objects on the desk */}
        <span className="absolute right-[20%] top-[60%] h-[6%] w-[10%] rounded-[2px] bg-[#1c0f06] shadow-[0_10px_30px_rgba(0,0,0,0.65)]" />
        <span className="absolute right-[14%] top-[63%] h-[4%] w-[6%] rounded-[2px] bg-[#28160a]" />
      </motion.div>

      {/* Tonal veil for legibility — lighter so the workspace reads through */}
      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.6)_0%,rgba(11,31,58,0.32)_50%,rgba(5,12,24,0.66)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_25%,rgba(200,169,106,0.18),transparent_55%)]"
      />

      {/* Foreground — headline + supporting lines */}
      <motion.div
        style={{ y: isDesktop ? fgY : mobileFgY }}
        className="relative"
      >
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <motion.p
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-base font-semibold uppercase tracking-[0.22em] text-[#F3DEAA] sm:text-lg"
            >
              The thinking behind it
            </motion.p>

            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.95, ease: EASE }}
              className="font-display mt-6 text-balance text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-[4.25rem]"
            >
              Built around how your company actually works.
            </motion.h2>

            <ul className="mt-8 grid gap-4 sm:mt-10 sm:gap-5">
              {SUPPORTING.map((line) => (
                <motion.li
                  key={line}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                  className="text-2xl font-medium leading-snug text-white/90 sm:text-3xl"
                >
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  SUPPORT LEVELS — three engagement options under the parallax              */
/* -------------------------------------------------------------------------- */

function SupportLevels() {
  const items = [
    {
      title: "Build from scratch",
      body: "Start with a clean foundation. We design and build a custom system shaped around how your business actually operates today.",
      line: "Start a new system →",
    },
    {
      title: "Improve existing tools",
      body: "Refine what already works. We extend, restructure, and modernize the tools you have so they scale with your operations.",
      line: "Refine your stack →",
    },
    {
      title: "Maintain and evolve",
      body: "Long-term care after launch. We monitor, update, and quietly evolve your system as your team and workflows grow.",
      line: "Long-term partnership →",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf8f1_0%,#f4efe5_100%)] py-18 sm:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(200,169,106,0.18),transparent_55%)]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="font-display text-balance text-4xl font-semibold leading-[1.04] text-[#0B1F3A] sm:text-5xl"
          >
            Choose the level of support your business needs.
          </motion.h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}
              className="group relative flex flex-col rounded-xl border border-[#0B1F3A]/12 bg-white p-7 shadow-[0_18px_44px_rgba(11,31,58,0.08)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#C8A96A]/55 hover:shadow-[0_28px_70px_rgba(11,31,58,0.14)] lg:bg-white/85 lg:backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A96A]/0 to-transparent transition-[background-image] duration-300 group-hover:via-[#C8A96A]/55" />
              <h3 className="font-display text-3xl font-semibold leading-tight text-[#0B1F3A]">
                {item.title}
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {item.body}
              </p>
              <LocalizedLink
                href="/contact"
                className="mt-6 inline-flex touch-manipulation items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#0B1F3A] transition-colors group-hover:text-[#C8A96A] active:opacity-70"
              >
                {item.line}
              </LocalizedLink>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA — minimal, premium                                                    */
/* -------------------------------------------------------------------------- */

function ServicesCTA() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf8f1_0%,#f1ead9_100%)] py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(200,169,106,0.18),transparent_55%)]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
            className="font-display text-balance text-5xl font-semibold leading-[1.02] text-[#0B1F3A] sm:text-6xl lg:text-7xl"
          >
            A quiet system, designed around your business.
          </motion.h2>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
            className="mx-auto mt-7 max-w-2xl text-xl leading-9 text-[#0B1F3A]/72"
          >
            Start with a free audit. We map your workflow, identify where time is
            lost, and propose the smallest, most precise system that delivers the
            largest change.
          </motion.p>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.24 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <PrimaryCTA href="/contact" variant="dark">
              Request a free audit
            </PrimaryCTA>
          </motion.div>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
            className="mx-auto mt-6 max-w-xl border-t border-[#0B1F3A]/12 pt-4 text-sm font-semibold leading-7 text-[#0B1F3A] sm:text-base"
          >
            Custom offers start from €1,000. Final quote depends on scope, workflow complexity, and integrations.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page composition                                                          */
/* -------------------------------------------------------------------------- */

export function ServicesExperience() {
  return (
    <div>
      <ServicesHero />
      <ServicesShowcase />
      <ParallaxStatement />
      <SupportLevels />
      <ServicesCTA />
    </div>
  );
}
