"use client";

import Link from "next/link";
import {
  LocalizedContent,
  localizedPathname,
  useLanguage,
} from "@/lib/i18n";

type LocalizedLinkProps = React.ComponentProps<typeof Link>;

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { language } = useLanguage();
  const nextHref =
    typeof href === "string" && href.startsWith("/")
      ? localizedPathname(href, language)
      : href;

  const { children, ...linkProps } = props;
  return <Link href={nextHref} {...linkProps}><LocalizedContent>{children}</LocalizedContent></Link>;
}
