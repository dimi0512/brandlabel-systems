"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LocalizedContent,
  localizedPathname,
  useLanguage,
} from "@/lib/i18n";
import { Container } from "./Container";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function Footer() {
  const { language } = useLanguage();
  const activeLanguage = language;

  return <LocalizedContent>{(
    <footer className="dark-premium border-t border-white/10 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-14 lg:py-14">
        <div>
          <div className="mb-6 inline-flex rounded-sm bg-[#fffdf8] px-3 py-2">
            <Image
              src="/brandlabel-agency-logo.png"
              alt="BrandLabel Agency"
              width={520}
              height={160}
              className="h-14 w-auto max-w-[13rem] object-contain sm:max-w-[15rem]"
            />
          </div>
          <p className="max-w-lg text-base leading-7 text-neutral-300">
            Tailored operational platforms that make everyday work simpler, clearer and
            easier to control.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-400">
            Built around the way your business operates—not around a generic template.
            Available to SMEs across industries, worldwide.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.16em] text-[#d3b67c]">Explore</p>
          <div className="grid gap-2.5 text-[0.95rem] leading-6 text-neutral-300">
            <Link href={localizedPathname("/", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Home</Link>
            <Link href={localizedPathname("/platforms", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Platforms</Link>
            <Link href={localizedPathname("/commercial-options", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Pricing</Link>
            <Link href={localizedPathname("/diagnostic", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Cost calculator</Link>
            <Link href={localizedPathname("/free-operational-audit", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Free operational audit</Link>
            <Link href={localizedPathname("/contact#faq", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Frequently asked questions</Link>
            <Link href={localizedPathname("/contact", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Contact</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.16em] text-[#d3b67c]">Business details</p>
          <div className="grid gap-2.5 text-[0.95rem] leading-6 text-neutral-300">
            <p>BrandLabel Agency</p>
            <p>VAT BE1040366570</p>
            <a className="break-all hover:text-white" href="mailto:contact@brandlabelagency.com">
              contact@brandlabelagency.com
            </a>
            <a className="break-all hover:text-white" href="mailto:billing@brandlabelagency.com">
              billing@brandlabelagency.com
            </a>
          </div>
          <div className="mt-6 grid gap-2.5 text-sm text-neutral-400">
            <Link href={localizedPathname("/privacy", activeLanguage)} className="touch-manipulation hover:text-white active:opacity-70">Privacy Policy</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-4 text-[0.72rem] leading-5 text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} BrandLabel Agency. All rights reserved.`}</p>
          <p>Operational platforms and automation for SMEs worldwide.</p>
        </Container>
      </div>
    </footer>
  )}</LocalizedContent>;
}
