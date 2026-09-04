"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getLanguageFromPathname,
  localizedPathname,
  useLanguage,
} from "@/lib/i18n";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";

const MotionLink = motion.create(Link);

const navItems = [
  { href: "/platforms", label: "Platforms" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/commercial-options", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { language, languages, setLanguage, translate } = useLanguage();
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center rounded-sm border border-[#0B1F3A]/10 bg-white/75 p-1 shadow-sm ${
        compact ? "justify-center" : ""
      }`}
      aria-label={translate("Language")}
    >
      {languages.map((item) => {
        const active = item.code === language;
        return (
          <Link
            key={item.code}
            onClick={() => setLanguage(item.code)}
            href={localizedPathname(pathname, item.code)}
            aria-pressed={active}
            className={`inline-flex min-h-9 min-w-10 items-center justify-center rounded-sm px-2.5 text-center text-sm font-semibold leading-none transition ${
              active
                ? "bg-[#0B1F3A] text-[#C8A96A]"
                : "bl-header-gold-hover text-[#0B1F3A]/65 hover:text-[#0B1F3A]"
            }`}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const activeLanguage = getLanguageFromPathname(pathname) ?? language;

  // Close on Escape. (No body scroll lock — on Mobile Safari that combo
  // with a sticky header causes a reflow that drops the next tap.)
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[80] border-b border-[#0B1F3A]/10 bg-[#fffdf8] md:bg-[#fffdf8]/95 md:backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between md:grid md:h-22 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-5 lg:gap-7">
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="pointer-events-auto relative z-[9999] grid size-10 touch-manipulation place-items-center rounded-sm border border-[#0B1F3A]/15 bg-white text-[#0B1F3A] shadow-[0_8px_22px_rgba(11,31,58,0.08)] active:scale-95 active:opacity-80 md:hidden"
          >
            {menuOpen ? (
              <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden>
                <path
                  d="M3 3l12 12M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 18 14" width="18" height="14" aria-hidden>
                <path
                  d="M1 1h16M1 7h16M1 13h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <Link
            href={localizedPathname("/", activeLanguage)}
            className="flex min-w-0 items-center"
            aria-label="BrandLabel Agency home"
          >
            <Image
              src="/brandlabel-agency-logo.png"
              alt="BrandLabel Agency"
              width={520}
              height={160}
              priority
              className="h-10 w-auto max-w-[8.75rem] shrink-0 object-contain sm:h-12 sm:max-w-[10rem] lg:h-13 lg:max-w-[12rem] xl:h-14 xl:max-w-[14rem]"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden items-center justify-center gap-1 md:flex lg:gap-3 xl:gap-5"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localizedPathname(item.href, activeLanguage)}
              className="bl-header-gold-hover rounded-sm px-2.5 py-2 text-sm text-slate-600 hover:text-[#0B1F3A] lg:px-3 lg:text-base xl:text-lg"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-2 lg:gap-3">
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          <div className="md:hidden">
            <LanguageSelector compact />
          </div>

          <div className="hidden md:block">
            <ButtonLink
              href={localizedPathname("/diagnostic", activeLanguage)}
              variant="dark"
              className="bl-header-cta bl-header-gold-hover"
            >
              <span>Calculate your cost</span>
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/*
        Mobile menu — plain block child INSIDE the <header>.
        No fixed positioning, no portal, no z-index gymnastics.
        The sticky header simply grows when the menu opens, so the menu
        is always visible directly below the top bar.
      */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false);
          }}
          // min-h-screen is a fallback for browsers without svh support (older Samsung Internet)
          className="pointer-events-auto min-h-screen min-h-[calc(100svh-5rem)] border-t border-[#0B1F3A]/10 bg-[#fffdf8] md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col py-2"
          >
            {navItems.map((item) => (
              <MotionLink
                key={item.href}
                href={localizedPathname(item.href, activeLanguage)}
                onClick={() => setMenuOpen(false)}
                whileTap={{ opacity: 0.6, backgroundColor: "#f5f1e6" }}
                transition={{ duration: 0.1 }}
                className="bl-header-gold-hover pointer-events-auto flex min-h-[3.5rem] touch-manipulation items-center border-b border-[#0B1F3A]/[0.08] px-6 text-lg font-medium text-[#0B1F3A] last:border-b-0"
              >
                <span>{item.label}</span>
              </MotionLink>
            ))}
          </nav>
          <div className="px-6 pb-8 pt-4">
            <ButtonLink
              href={localizedPathname("/diagnostic", activeLanguage)}
              variant="dark"
              className="bl-header-cta bl-header-gold-hover w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <span>Calculate your cost</span>
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
