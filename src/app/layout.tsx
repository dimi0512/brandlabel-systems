import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { Analytics } from "@/components/Analytics";
import { absoluteUrl, SITE_NAME, siteUrl } from "@/lib/seo";
import "./globals.css";
import "@/components/insights/insights.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const display = localFont({
  src: "../../public/fonts/dm-serif-display-latin.woff2",
  variable: "--font-display",
  weight: "400",
  style: "normal",
  display: "swap",
});

const sans = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  variable: "--font-sans",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: siteUrl,
  title: {
    default: `${SITE_NAME} | Operational Platforms for SMEs`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "BrandLabel designs operational platforms around the way your company works, connecting clients, planning, teams, documents, stock, sales and repetitive processes.",
  keywords: [
    "operational platform agency",
    "custom internal systems",
    "custom web apps",
    "workflow automation",
    "client portals",
    "operations dashboard",
    "business process automation",
    "business operations software",
    "operational platforms for SMEs",
    "field service workflow software",
    "custom systems Belgium",
    "workflow automation Belgium",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "en_GB",
    title: `${SITE_NAME} | Tailored Operational Platforms for SMEs`,
    description:
      "Tailored operational platforms, workflow automation and customer interfaces for SMEs across industries, worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrandLabel Agency custom operations dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Tailored Operational Platforms for SMEs`,
    description:
      "Tailored operational platforms, workflow automation and customer interfaces for SMEs across industries, worldwide.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl.toString()}#business`,
    name: SITE_NAME,
    alternateName: "BL",
    url: siteUrl.toString(),
    logo: new URL("/icon-512.png", siteUrl).toString(),
    image: new URL("/og-image.png", siteUrl).toString(),
    description:
      "Tailored operational platforms, workflow automation and connected customer interfaces for SMEs across industries, worldwide.",
    slogan: "Operational platforms built around your business.",
    email: "contact@brandlabelagency.com",
    vatID: "BE1040366570",
    areaServed: ["Belgium", "Europe", "Worldwide"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@brandlabelagency.com",
      availableLanguage: ["English", "French", "Dutch"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Operational platform services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tailored Operational Platforms",
            provider: {
              "@id": `${siteUrl.toString()}#business`,
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Workflow Automation and Integrations",
            provider: {
              "@id": `${siteUrl.toString()}#business`,
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Customer Portals and Public Interfaces",
            provider: {
              "@id": `${siteUrl.toString()}#business`,
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Platform Maintenance and Continuous Improvement",
            provider: {
              "@id": `${siteUrl.toString()}#business`,
            },
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl.toString()}#website`,
    name: SITE_NAME,
    url: siteUrl.toString(),
    publisher: {
      "@id": `${siteUrl.toString()}#business`,
    },
    inLanguage: ["en", "fr", "nl"],
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const routeLocale = requestHeaders.get("x-brandlabel-locale");
  const language = routeLocale === "fr" || routeLocale === "nl" ? routeLocale : "en";

  return (
    <html lang={language}>
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
