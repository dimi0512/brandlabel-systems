import type { Metadata } from "next";
import {
  localizedAlternates,
  localizedUrl,
  type Locale,
  type PublicRoute,
} from "@/lib/seo";

type PageSeo = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
};

const pageSeo: Record<PublicRoute, PageSeo> = {
  "": {
    title: "Tailored Operational Platforms & Workflow Automation for SMEs",
    description:
      "BrandLabel Agency builds tailored operational platforms, client portals and workflow automation for SMEs that need clearer, more convenient operations.",
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
    title: "Operational Platforms: Process, Migration & Examples",
    description:
      "See how BrandLabel Agency understands an operation, defines the right environment, handles migration and integrations, and builds tailored platforms for SMEs.",
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
    title: "Commercial Options: Access, Acquisition & Ownership",
    description:
      "Compare Buy outright, Build-to-own, Platform Access and Continuous Platform Partnership for a tailored BrandLabel operational platform.",
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
    title: "Recurring Operational Cost Calculator",
    description: "Estimate the time and employment cost tied to recurring operational problems without providing an email address.",
    keywords: ["operational cost calculator", "recurring work cost", "administrative cost calculator", "workflow cost estimate"],
    ogTitle: "Calculate the Cost of Recurring Operational Work",
    ogDescription: "Answer five practical questions and receive an immediate indicative cost estimate.",
  },
  "/free-operational-audit": {
    title: "Free Operational Clarity Audit",
    description:
      "Request a free, manually reviewed audit of one recurring business workflow from BrandLabel Agency.",
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
    title: "Contact BrandLabel Agency: Operational Platform Consultation",
    description:
      "Contact BrandLabel Agency to discuss your workflows, operational challenges, platform requirements and commercial options.",
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
    title: "Privacy Policy",
    description:
      "How BrandLabel Agency collects, uses, stores, protects, and discloses personal information.",
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
      title: "Plateformes opérationnelles sur mesure et automatisation pour PME",
      description: "BrandLabel Agency crée des plateformes opérationnelles, portails clients et automatisations sur mesure pour les PME qui souhaitent une activité plus claire et plus fluide.",
      ogTitle: "Plateformes opérationnelles sur mesure pour PME",
      ogDescription: "Remplacez les outils dispersés par une plateforme opérationnelle conçue autour de votre entreprise.",
    },
    "/platforms": {
      title: "Plateformes opérationnelles : processus, migration et exemples",
      description: "Découvrez comment BrandLabel Agency analyse une activité, définit le bon environnement, gère la migration et construit des plateformes sur mesure.",
      ogTitle: "Comment BrandLabel Agency construit ses plateformes",
      ogDescription: "Découvrez le processus, les migrations, les intégrations et des exemples de plateformes opérationnelles sur mesure.",
    },
    "/commercial-options": {
      title: "Tarifs : accès, acquisition et propriété de la plateforme",
      description: "Comparez l’achat intégral, l’acquisition progressive, l’Accès à la plateforme et le Partenariat continu autour de la plateforme.",
      ogTitle: "Quatre façons d’accéder à votre plateforme ou d’en devenir propriétaire",
      ogDescription: "Comparez les quatre formules commerciales de BrandLabel Agency.",
    },
    "/diagnostic": {
      title: "Calculateur du coût des problèmes opérationnels récurrents",
      description: "Estimez le temps et le coût salarial liés aux problèmes opérationnels récurrents, sans fournir d’adresse e-mail.",
      ogTitle: "Calculez le coût du travail opérationnel récurrent",
      ogDescription: "Répondez à cinq questions pratiques et obtenez immédiatement une estimation indicative.",
    },
    "/free-operational-audit": {
      title: "Audit gratuit de clarté opérationnelle",
      description: "Demandez à BrandLabel Agency un audit gratuit, examiné manuellement, d’un flux de travail récurrent.",
      ogTitle: "Audit opérationnel gratuit | BrandLabel Agency",
      ogDescription: "Décrivez un flux récurrent et recevez une évaluation opérationnelle manuelle.",
    },
    "/contact": {
      title: "Contacter BrandLabel Agency : consultation plateforme opérationnelle",
      description: "Contactez BrandLabel Agency pour discuter de vos flux de travail, difficultés opérationnelles et besoins en plateforme.",
      ogTitle: "Contacter BrandLabel Agency",
      ogDescription: "Expliquez-nous le fonctionnement actuel de votre entreprise et discutons d’une plateforme sur mesure.",
    },
    "/privacy": {
      title: "Politique de confidentialité",
      description: "Comment BrandLabel Agency collecte, utilise, conserve, protège et communique les données personnelles.",
      ogTitle: "Politique de confidentialité",
      ogDescription: "Comment BrandLabel Agency traite les données personnelles, les cookies, la conservation et les droits liés à la vie privée.",
    },
  },
  nl: {
    "": {
      title: "Operationele platformen op maat en automatisering voor kmo’s",
      description: "BrandLabel Agency bouwt operationele platformen, klantenportalen en automatisering op maat voor kmo’s die duidelijker en vlotter willen werken.",
      ogTitle: "Operationele platformen op maat voor kmo’s",
      ogDescription: "Vervang verspreide tools door een operationeel platform dat rond uw bedrijf is gebouwd.",
    },
    "/platforms": {
      title: "Operationele platformen: proces, migratie en voorbeelden",
      description: "Ontdek hoe BrandLabel Agency een werking begrijpt, de juiste omgeving bepaalt, migraties beheert en platformen op maat bouwt.",
      ogTitle: "Hoe BrandLabel Agency operationele platformen bouwt",
      ogDescription: "Bekijk het proces, de migratieaanpak, integraties en voorbeelden van platformen op maat.",
    },
    "/commercial-options": {
      title: "Tarieven: platformtoegang, verwerving en eigendom",
      description: "Vergelijk volledige aankoop, geleidelijke eigendomsverwerving, Platformtoegang en Doorlopend platformpartnerschap.",
      ogTitle: "Vier manieren om uw platform te gebruiken of te verwerven",
      ogDescription: "Vergelijk de vier commerciële samenwerkingsvormen van BrandLabel Agency.",
    },
    "/diagnostic": {
      title: "Calculator voor terugkerende operationele kosten",
      description: "Raam de tijd en loonkost van terugkerende operationele problemen zonder een e-mailadres op te geven.",
      ogTitle: "Bereken de kost van terugkerend operationeel werk",
      ogDescription: "Beantwoord vijf praktische vragen en ontvang meteen een indicatieve kostenraming.",
    },
    "/free-operational-audit": {
      title: "Gratis operationele duidelijkheidsaudit",
      description: "Vraag BrandLabel Agency om een gratis, handmatig beoordeelde audit van één terugkerende workflow.",
      ogTitle: "Gratis operationele audit | BrandLabel Agency",
      ogDescription: "Beschrijf één terugkerende workflow en ontvang een handmatige operationele beoordeling.",
    },
    "/contact": {
      title: "Contacteer BrandLabel Agency: operationeel platformgesprek",
      description: "Contacteer BrandLabel Agency over uw workflows, operationele uitdagingen en platformbehoeften.",
      ogTitle: "Contacteer BrandLabel Agency",
      ogDescription: "Vertel ons hoe uw bedrijf vandaag werkt en bespreek een operationeel platform op maat.",
    },
    "/privacy": {
      title: "Privacybeleid",
      description: "Hoe BrandLabel Agency persoonsgegevens verzamelt, gebruikt, bewaart, beschermt en deelt.",
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
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
      languages: localizedAlternates(route),
    },
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      url,
      locale: locale === "fr" ? "fr_FR" : locale === "nl" ? "nl_NL" : "en_GB",
    },
  };
}
