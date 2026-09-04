"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LocalizedContent,
  localizedPathname,
  useLanguage,
} from "@/lib/i18n";

const MotionLink = motion.create(Link);

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "gold" | "light" | "outline";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
  onClick,
}: ButtonLinkProps) {
  const { language } = useLanguage();
  const localizedHref = href.startsWith("/")
    ? localizedPathname(href, language)
    : href;

  const variants = {
    dark: "bg-[#0B1F3A] text-white shadow-[0_16px_38px_rgba(11,31,58,0.24)] hover:bg-[#142F55] hover:shadow-[0_20px_48px_rgba(11,31,58,0.3)]",
    gold: "bg-[#C8A96A] text-[#0B1F3A] shadow-[0_16px_38px_rgba(200,169,106,0.28)] hover:bg-[#D6BA7D]",
    light: "bl-soft-gold-hover bg-white text-[#0B1F3A] shadow-[0_16px_38px_rgba(11,31,58,0.12)]",
    outline:
      "bl-soft-gold-hover border border-[#0B1F3A]/15 bg-white/55 text-[#0B1F3A]",
  };

  return (
    <MotionLink
      href={localizedHref}
      onClick={onClick}
      whileTap={{ scale: 0.97, opacity: 0.88 }}
      transition={{ duration: 0.12 }}
      className={`inline-flex min-h-13 touch-manipulation items-center justify-center rounded-sm px-6 text-center text-base font-semibold leading-snug transition duration-200 hover:-translate-y-0.5 lg:text-lg ${variants[variant]} ${className}`}
    >
      <LocalizedContent>{children}</LocalizedContent>
    </MotionLink>
  );
}
