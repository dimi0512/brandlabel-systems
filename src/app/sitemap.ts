import type { MetadataRoute } from "next";
import { locales, localizedAlternates, localizedUrl, publicRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(route, locale),
      alternates: {
        languages: localizedAlternates(route),
      },
    })),
  );
}
