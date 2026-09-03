import type { Metadata } from "next";
import {
  localizedAlternates,
  localizedUrl,
  SITE_NAME,
  type Locale,
  type PublicRoute,
} from "@/lib/seo";

type PageSeo = {
  title: string;
  description: string;
  keywords: string[];
  absoluteTitle?: boolean;
  ogTitle?: string;
  ogDescription?: string;
};

const pageSeo: Record<PublicRoute, PageSeo> = {
  "": {
    title: "Custom Business Software & Workflow Automation | BrandLabel",
    description:
      "BrandLabel designs tailored business software, operational platforms and workflow automation around how your company actually works. Based in Belgium.",
    absoluteTitle: true,
    keywords: [
      "custom internal systems",
      "workflow automation for SMEs",
      "client portal development",
      "field service operations system",
      "custom web apps",
      "operations dashboard",
      "business operations software",
      "BrandLabel Agency",
    ],
    ogTitle: "Tailored Operational Platforms & Workflow Automation for SMEs",
    ogDescription:
      "Replace scattered tools with a tailored operational platform, customer interfaces and workflow automation built around your business.",
  },
  "/platforms": {
    title: "Custom Business Software & Operational Platforms | BrandLabel",
    description:
      "See how BrandLabel designs custom business software, operational platforms, workflow automation and integrations around the way your business actually works.",
    absoluteTitle: true,
    keywords: [
      "custom operational platforms",
      "business systems process",
      "workflow platform development",
      "business data migration",
      "software integrations for SMEs",
      "custom platform examples",
    ],
    ogTitle: "How BrandLabel Agency Builds Operational Platforms",
    ogDescription:
      "Explore the process, migration approach, integrations and reconstructed examples behind tailored BrandLabel operational platforms.",
  },
  "/commercial-options": {
    title: "Custom Software Pricing & Ownership Options | BrandLabel",
    description:
      "Explore pricing and flexible ownership options for BrandLabel custom business software and operational platforms, from outright purchase to ongoing access.",
    absoluteTitle: true,
    keywords: [
      "custom platform pricing models",
      "software ownership options",
      "platform subscription",
      "build-to-own software",
      "custom software acquisition",
      "platform maintenance agreement",
    ],
    ogTitle: "Four Ways to Build, Access or Own Your Platform",
    ogDescription:
      "Compare BrandLabel Agency’s four commercial models and understand platform ownership, access, support and data principles.",
  },
  "/diagnostic": {
    title: "Business Process Cost Calculator | BrandLabel",
    description: "Calculate the time and employment cost of repetitive administration and inefficient business processes. Free, instant and no email required.",
    absoluteTitle: true,
    keywords: ["operational cost calculator", "recurring work cost", "administrative cost calculator", "workflow cost estimate"],
    ogTitle: "Calculate the Cost of Recurring Operational Work",
    ogDescription: "Answer five practical questions and receive an immediate indicative cost estimate.",
  },
  "/free-operational-audit": {
    title: "Free Business Process & Operations Audit | BrandLabel",
    description:
      "Request a free operational audit to identify inefficient workflows, repetitive administration and opportunities to simplify or automate your business processes.",
    absoluteTitle: true,
    keywords: [
      "free operational audit",
      "workflow audit",
      "business process review",
      "SME operations consultation",
      "operational clarity audit",
    ],
    ogTitle: "Free Operational Clarity Audit | BrandLabel Agency",
    ogDescription:
      "Share one recurring workflow and receive a manually reviewed operational assessment from BrandLabel Agency.",
  },
  "/contact": {
    title: "Contact BrandLabel | Custom Business Software & Automation",
    description:
      "Discuss your workflows, operational challenges or custom software requirements with BrandLabel Agency. Based in Belgium and working with SMEs internationally.",
    absoluteTitle: true,
    keywords: [
      "free systems audit",
      "custom system quote",
      "workflow audit",
      "operations audit",
      "custom internal system consultation",
      "BrandLabel Agency contact",
    ],
    ogTitle: "Contact BrandLabel Agency: Operational Platform Consultation",
    ogDescription:
      "Tell BrandLabel Agency how your business currently works and discuss a tailored operational platform.",
  },
  "/privacy": {
    title: "Privacy Policy | BrandLabel Agency",
    description:
      "Read how BrandLabel Agency collects, uses, protects and manages personal data, cookies and privacy rights.",
    absoluteTitle: true,
    keywords: [
      "BrandLabel Agency privacy policy",
      "privacy policy",
      "cookie policy",
      "analytics cookies",
      "personal data",
    ],
    ogTitle: "Privacy Policy",
    ogDescription:
      "How BrandLabel Agency handles personal information, cookies, analytics, service providers, retention, security, and privacy rights.",
  },
};

const localizedPageSeo: Partial<Record<Locale, Partial<Record<PublicRoute, Partial<PageSeo>>>>> = {
  fr: {
    "": {
      title: "Logiciel de gestion sur mesure & automatisation | BrandLabel",
      description: "BrandLabel conçoit des logiciels de gestion sur mesure, des plateformes opérationnelles et des automatisations adaptées au fonctionnement réel de votre entreprise en Belgique.",
      absoluteTitle: true,
      ogTitle: "Plateformes opérationnelles sur mesure pour PME",
      ogDescription: "Remplacez les outils dispersés par une plateforme opérationnelle conçue autour de votre entreprise.",
    },
    "/platforms": {
      title: "Logiciel sur mesure & plateformes opérationnelles | BrandLabel",
      description: "Découvrez comment BrandLabel conçoit des logiciels sur mesure, des plateformes opérationnelles, des automatisations et des intégrations adaptées à votre entreprise.",
      absoluteTitle: true,
      ogTitle: "Comment BrandLabel Agency construit ses plateformes",
      ogDescription: "Découvrez le processus, les migrations, les intégrations et des exemples de plateformes opérationnelles sur mesure.",
    },
    "/commercial-options": {
      title: "Tarifs logiciel sur mesure & options de propriété | BrandLabel",
      description: "Découvrez les tarifs et formules flexibles de BrandLabel pour développer, utiliser ou devenir propriétaire d'un logiciel ou d'une plateforme sur mesure.",
      absoluteTitle: true,
      ogTitle: "Quatre façons d’accéder à votre plateforme ou d’en devenir propriétaire",
      ogDescription: "Comparez les quatre formules commerciales de BrandLabel Agency.",
    },
    "/diagnostic": {
      title: "Calculateur du coût des processus | BrandLabel",
      description: "Calculez le temps et le coût salarial liés aux tâches administratives répétitives et aux processus inefficaces. Gratuit, immédiat et sans e-mail.",
      absoluteTitle: true,
      ogTitle: "Calculez le coût du travail opérationnel récurrent",
      ogDescription: "Répondez à cinq questions pratiques et obtenez immédiatement une estimation indicative.",
    },
    "/free-operational-audit": {
      title: "Audit gratuit des processus & opérations | BrandLabel",
      description: "Demandez un audit opérationnel gratuit pour identifier les processus inefficaces, les tâches répétitives et les possibilités de simplification ou d'automatisation.",
      absoluteTitle: true,
      ogTitle: "Audit opérationnel gratuit | BrandLabel Agency",
      ogDescription: "Décrivez un flux récurrent et recevez une évaluation opérationnelle manuelle.",
    },
    "/contact": {
      title: "Contact BrandLabel | Logiciel sur mesure & automatisation",
      description: "Discutez de vos processus, de vos défis opérationnels ou de vos besoins en logiciel sur mesure avec BrandLabel Agency, basée en Belgique.",
      absoluteTitle: true,
      ogTitle: "Contacter BrandLabel Agency",
      ogDescription: "Expliquez-nous le fonctionnement actuel de votre entreprise et discutons d’une plateforme sur mesure.",
    },
    "/privacy": {
      title: "Politique de confidentialité | BrandLabel Agency",
      description: "Découvrez comment BrandLabel Agency collecte, utilise et protège les données personnelles, gère les cookies et respecte vos droits à la vie privée.",
      absoluteTitle: true,
      ogTitle: "Politique de confidentialité",
      ogDescription: "Comment BrandLabel Agency traite les données personnelles, les cookies, la conservation et les droits liés à la vie privée.",
    },
  },
  nl: {
    "": {
      title: "Software op maat & procesautomatisering | BrandLabel",
      description: "BrandLabel ontwerpt software op maat, operationele bedrijfsplatformen en procesautomatisering rond de manier waarop uw bedrijf werkelijk werkt in België.",
      absoluteTitle: true,
      ogTitle: "Operationele platformen op maat voor kmo’s",
      ogDescription: "Vervang verspreide tools door een operationeel platform dat rond uw bedrijf is gebouwd.",
    },
    "/platforms": {
      title: "Software op maat & operationele bedrijfsplatformen | BrandLabel",
      description: "Ontdek hoe BrandLabel software op maat, operationele bedrijfsplatformen, procesautomatisering en integraties ontwerpt rond de werking van uw bedrijf.",
      absoluteTitle: true,
      ogTitle: "Hoe BrandLabel Agency operationele platformen bouwt",
      ogDescription: "Bekijk het proces, de migratieaanpak, integraties en voorbeelden van platformen op maat.",
    },
    "/commercial-options": {
      title: "Prijzen software op maat & eigendomsopties | BrandLabel",
      description: "Ontdek de prijzen en flexibele formules van BrandLabel om software op maat te laten bouwen, gebruiken of volledig in eigendom te krijgen.",
      absoluteTitle: true,
      ogTitle: "Vier manieren om uw platform te gebruiken of te verwerven",
      ogDescription: "Vergelijk de vier commerciële samenwerkingsvormen van BrandLabel Agency.",
    },
    "/diagnostic": {
      title: "Calculator voor proceskosten | BrandLabel",
      description: "Bereken de tijd en personeelskosten van repetitieve administratie en inefficiënte bedrijfsprocessen. Gratis, direct en zonder e-mailadres.",
      absoluteTitle: true,
      ogTitle: "Bereken de kost van terugkerend operationeel werk",
      ogDescription: "Beantwoord vijf praktische vragen en ontvang meteen een indicatieve kostenraming.",
    },
    "/free-operational-audit": {
      title: "Gratis audit van bedrijfsprocessen | BrandLabel",
      description: "Vraag een gratis operationele audit aan om inefficiënte processen, repetitieve administratie en kansen voor vereenvoudiging of automatisering te identificeren.",
      absoluteTitle: true,
      ogTitle: "Gratis operationele audit | BrandLabel Agency",
      ogDescription: "Beschrijf één terugkerende workflow en ontvang een handmatige operationele beoordeling.",
    },
    "/contact": {
      title: "Contact BrandLabel | Software op maat & automatisering",
      description: "Bespreek uw processen, operationele uitdagingen of behoeften aan software op maat met BrandLabel Agency, gevestigd in België.",
      absoluteTitle: true,
      ogTitle: "Contacteer BrandLabel Agency",
      ogDescription: "Vertel ons hoe uw bedrijf vandaag werkt en bespreek een operationeel platform op maat.",
    },
    "/privacy": {
      title: "Privacybeleid | BrandLabel Agency",
      description: "Lees hoe BrandLabel Agency persoonsgegevens verzamelt, gebruikt en beschermt, cookies beheert en uw privacyrechten respecteert.",
      absoluteTitle: true,
      ogTitle: "Privacybeleid",
      ogDescription: "Hoe BrandLabel Agency omgaat met persoonsgegevens, cookies, bewaring en privacyrechten.",
    },
  },
};

export function createPageMetadata(
  route: PublicRoute,
  locale: Locale = "en",
): Metadata {
  const seo = { ...pageSeo[route], ...localizedPageSeo[locale]?.[route] };
  const url = localizedUrl(route, locale);

  return {
    title: seo.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
      languages: localizedAlternates(route),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      url,
      locale: locale === "fr" ? "fr_FR" : locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale: locale === "fr" ? ["en_GB", "nl_NL"] : locale === "nl" ? ["en_GB", "fr_FR"] : ["fr_FR", "nl_NL"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "BrandLabel Agency operational platform preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      images: ["/og-image.png"],
    },
  };
}
