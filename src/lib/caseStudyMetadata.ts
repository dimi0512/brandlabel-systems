import type { Metadata } from "next";
import type { CaseStudySlug } from "@/lib/caseStudies";
import {
  localizedAlternates,
  localizedUrl,
  SITE_NAME,
  type Locale,
} from "@/lib/seo";

export type CaseStudyRoute = "/case-studies" | `/case-studies/${CaseStudySlug}`;

type CaseStudySeo = { title: string; description: string };

const caseStudySeo: Record<Locale, Record<CaseStudyRoute, CaseStudySeo>> = {
  en: {
    "/case-studies": {
      title: "Case Studies: Custom Operational Systems | BrandLabel",
      description: "Explore selected BrandLabel systems for project operations, workforce management and client operations, built around specific business workflows.",
    },
    "/case-studies/project-operations": {
      title: "Agency Project Operations Case Study | BrandLabel",
      description: "See how a Belgian marketing company connected its lead pipeline, projects, quotations, client communication and approvals in one custom system.",
    },
    "/case-studies/workforce-operations": {
      title: "LabelX Workforce Operations Case Study | BrandLabel",
      description: "See how LabelX connected field work, time tracking, projects, payroll, payments, inventory and administration for a service company.",
    },
    "/case-studies/client-operations": {
      title: "Salon Client Operations Case Study | BrandLabel",
      description: "See how a hair salon connected appointments, client history, formulas, allergies, stock, income and expenses in one private operational system.",
    },
  },
  fr: {
    "/case-studies": {
      title: "Études de cas : systèmes opérationnels sur mesure | BrandLabel",
      description: "Découvrez une sélection de systèmes BrandLabel pour la gestion de projets, des équipes et des clients, conçus autour de processus métier spécifiques.",
    },
    "/case-studies/project-operations": {
      title: "Étude de cas : opérations de projet d’une agence | BrandLabel",
      description: "Découvrez comment une agence marketing belge a réuni prospects, projets, devis, communication client et validations dans un système sur mesure.",
    },
    "/case-studies/workforce-operations": {
      title: "Étude de cas LabelX : gestion des équipes terrain | BrandLabel",
      description: "Découvrez comment LabelX a relié travail terrain, suivi du temps, projets, paie, paiements, stock et administration pour une entreprise de services.",
    },
    "/case-studies/client-operations": {
      title: "Étude de cas : gestion clients pour un salon | BrandLabel",
      description: "Découvrez comment un salon a réuni rendez-vous, historique client, formules, allergies, stock, revenus et dépenses dans un système privé.",
    },
  },
  nl: {
    "/case-studies": {
      title: "Case studies: operationele systemen op maat | BrandLabel",
      description: "Ontdek geselecteerde BrandLabel-systemen voor projectbeheer, personeelsbeheer en klantactiviteiten, gebouwd rond specifieke bedrijfsprocessen.",
    },
    "/case-studies/project-operations": {
      title: "Case study: projectoperaties voor een bureau | BrandLabel",
      description: "Ontdek hoe een Belgisch marketingbedrijf leads, projecten, offertes, klantcommunicatie en goedkeuringen in één systeem op maat samenbracht.",
    },
    "/case-studies/workforce-operations": {
      title: "LabelX case study: personeels- en terreinbeheer | BrandLabel",
      description: "Ontdek hoe LabelX terreinwerk, tijdregistratie, projecten, loonverwerking, betalingen, voorraad en administratie verbond voor een dienstenbedrijf.",
    },
    "/case-studies/client-operations": {
      title: "Case study: klantbeheer voor een kapsalon | BrandLabel",
      description: "Ontdek hoe een kapsalon afspraken, klantgeschiedenis, formules, allergieën, voorraad, inkomsten en uitgaven in één privaat systeem samenbracht.",
    },
  },
};

export function createCaseStudyMetadata(
  route: CaseStudyRoute,
  locale: Locale = "en",
): Metadata {
  const seo = caseStudySeo[locale][route];
  const url = localizedUrl(route, locale);

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: url,
      languages: localizedAlternates(route),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: seo.title,
      description: seo.description,
      url,
      locale: locale === "fr" ? "fr_FR" : locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale: locale === "fr" ? ["en_GB", "nl_NL"] : locale === "nl" ? ["en_GB", "fr_FR"] : ["fr_FR", "nl_NL"],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BrandLabel Agency operational platform preview" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    },
  };
}
