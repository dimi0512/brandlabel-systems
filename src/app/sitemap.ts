import type { MetadataRoute } from "next";
import {
  locales,
  localizedAlternates,
  localizedUrl,
  publicRoutes,
  type PublicRoute,
} from "@/lib/seo";

const lastModifiedByRoute: Record<PublicRoute, string> = {
  "": "2026-08-06",
  "/platforms": "2026-08-06",
  "/commercial-options": "2026-08-06",
  "/diagnostic": "2026-08-06",
  "/free-operational-audit": "2026-08-06",
  "/contact": "2026-08-06",
  "/privacy": "2026-07-29",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(route, locale),
      lastModified: lastModifiedByRoute[route],
      alternates: {
        languages: localizedAlternates(route),
      },
    })),
  );
}
