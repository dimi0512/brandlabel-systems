import type { Locale } from "@/lib/seo";
import {
  customBusinessSoftwareSlugs,
  customBusinessSoftwareTranslationKey,
} from "@/lib/insightRoutes";

export type InsightListingEntry = {
  slug: string;
  category: string;
  title: string;
  description: string;
  publishedAt?: string;
  readingTime?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  published: boolean;
};

export type InsightContentBlock =
  | { type: "placeholder"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | {
      type: "linkedParagraph";
      before: string;
      href: string;
      label: string;
      after: string;
      external?: boolean;
    }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; citation?: string }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }
  | { type: "link"; href: string; label: string; external?: boolean }
  | { type: "cta"; heading: string; text?: string; href: string; label: string };

export type InsightArticle = {
  locale: Locale;
  slug: string;
  translationKey: string;
  category: string;
  title: string;
  introduction: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: string;
  image?: InsightListingEntry["image"];
  metadata: {
    title: string;
    description: string;
  };
  content: InsightContentBlock[];
};

export const insightListingEntries: Record<Locale, InsightListingEntry[]> = {
  en: [
    {
      slug: customBusinessSoftwareSlugs.en,
      category: "Custom business software",
      title: "Custom business software in Belgium: when does your company actually need it?",
      description: "How to recognise when standard software is enough, when your processes need something more specific, and when custom development actually makes business sense.",
      publishedAt: "2026-09-04",
      readingTime: "8 min read",
      published: true,
    },
  ],
  fr: [
    {
      slug: customBusinessSoftwareSlugs.fr,
      category: "Plateforme métier sur mesure",
      title: "Plateforme métier sur mesure en Belgique : quand est-elle réellement nécessaire ?",
      description: "Comment déterminer quand un logiciel standard suffit, quand vos processus nécessitent une solution plus spécifique et quand le développement sur mesure devient réellement pertinent.",
      publishedAt: "2026-09-04",
      readingTime: "8 min de lecture",
      published: true,
    },
    {
      slug: "logiciel-sur-mesure-ou-standard",
      category: "Choix logiciel",
      title: "Logiciel sur mesure ou logiciel standard : comment choisir ?",
      description: "Les critères opérationnels à examiner pour choisir entre une solution existante et un système conçu autour de votre fonctionnement.",
      published: false,
    },
    {
      slug: "cout-logiciel-sur-mesure-belgique",
      category: "Investissement logiciel",
      title: "Combien coûte un logiciel sur mesure en Belgique ?",
      description: "Les principaux éléments qui influencent le périmètre, le budget et la valeur à long terme d’un logiciel métier sur mesure.",
      published: false,
    },
  ],
  nl: [
    {
      slug: customBusinessSoftwareSlugs.nl,
      category: "Software op maat",
      title: "Software op maat in België: wanneer heeft uw bedrijf het echt nodig?",
      description: "Hoe bepaalt u wanneer standaardsoftware volstaat, wanneer uw processen iets specifiekers nodig hebben en wanneer maatwerksoftware zakelijk echt zinvol wordt?",
      publishedAt: "2026-09-04",
      readingTime: "8 min leestijd",
      published: true,
    },
  ],
};

// Localized article records share one translation key for reciprocal routing and SEO.
export const insightArticles: InsightArticle[] = [
  {
    locale: "en",
    slug: customBusinessSoftwareSlugs.en,
    translationKey: customBusinessSoftwareTranslationKey,
    category: "CUSTOM BUSINESS SOFTWARE",
    title: "Custom business software in Belgium: when does your company actually need it?",
    introduction: "How to recognise when standard software is enough, when your processes need something more specific, and when custom development actually makes business sense.",
    publishedAt: "2026-09-04",
    readingTime: "8 min read",
    metadata: {
      title: "Custom Business Software Belgium: When Do You Need It? | BrandLabel",
      description: "When does custom business software make sense? Learn the key operational signals, when standard software is better, and what Belgian SMEs should evaluate first.",
    },
    content: [
      { type: "paragraph", text: "Most businesses do not need more software." },
      { type: "paragraph", text: "They need fewer manual steps, clearer information and systems that work together properly." },
      { type: "paragraph", text: "That distinction matters." },
      { type: "paragraph", text: "When an operation becomes difficult to manage, buying another tool can feel like the obvious solution. A new CRM, planning application, project-management platform or automation service promises to solve the problem." },
      { type: "paragraph", text: "Sometimes it does." },
      { type: "paragraph", text: "Sometimes it simply becomes one more system employees need to keep updated." },
      { type: "paragraph", text: "Custom business software becomes interesting when the problem is no longer the absence of software, but the gap between how the business actually operates and what its existing tools allow it to do." },
      { type: "paragraph", text: "So how do you know when custom software is justified — and when an existing solution would be the better investment?" },

      { type: "heading", level: 2, text: "What does “custom business software” actually mean?", id: "what-custom-business-software-means" },
      { type: "paragraph", text: "Custom software does not necessarily mean replacing every application in your company with one enormous platform." },
      { type: "paragraph", text: "It can be much more focused." },
      { type: "paragraph", text: "A business might need a system that manages:" },
      { type: "list", items: [
        "projects and their progress;",
        "workforce planning and time tracking;",
        "quotations and approvals;",
        "client information and history;",
        "documents;",
        "stock or equipment;",
        "recurring administrative processes;",
        "reporting and dashboards;",
        "communication between operational steps;",
        "connections between existing applications.",
      ] },
      { type: "paragraph", text: "The defining characteristic is not the number of features." },
      { type: "paragraph", text: "It is that the system is designed around a specific operational requirement, rather than requiring the business to adapt itself to a predefined software package." },
      { type: "paragraph", text: "And even then, custom does not mean everything should be built from scratch." },
      { type: "paragraph", text: "A good solution can combine custom functionality with existing services for accounting, payments, email, document storage or other standard requirements." },

      { type: "heading", level: 2, text: "Signal 1: your employees have become the integration between your tools", id: "employees-integrate-tools" },
      { type: "paragraph", text: "Consider a company using a CRM, spreadsheets, email, a shared calendar, accounting software and cloud storage." },
      { type: "paragraph", text: "None of those tools is necessarily a problem." },
      { type: "paragraph", text: "The problem starts when information has to move between them manually." },
      { type: "paragraph", text: "A request arrives by email." },
      { type: "paragraph", text: "Someone enters it into a spreadsheet." },
      { type: "paragraph", text: "Another person updates the planning." },
      { type: "paragraph", text: "Documents are saved elsewhere." },
      { type: "paragraph", text: "Project information sits in another application." },
      { type: "paragraph", text: "At the end of the week, somebody combines all of it again to prepare a report, invoice, payroll file or management overview." },
      { type: "paragraph", text: "The company technically has digital systems." },
      { type: "paragraph", text: "But employees are doing the work that the systems should be doing between themselves." },
      { type: "paragraph", text: "That creates three costs:" },
      { type: "list", items: [
        "Time. Information is repeatedly entered, copied, checked and searched for.",
        "Errors. Every manual transfer creates another opportunity for information to become incomplete or inconsistent.",
        "Visibility. No single system provides a reliable picture of what is actually happening."
      ] },
      { type: "paragraph", text: "In this situation, the answer might be a custom platform." },
      { type: "paragraph", text: "But it might also be an integration or a smaller operational system connecting only the parts that currently create friction." },

      { type: "heading", level: 2, text: "Signal 2: a small administrative task becomes expensive because it happens constantly", id: "repetitive-administration-cost" },
      { type: "paragraph", text: "Not every repetitive task should be automated." },
      { type: "paragraph", text: "If something takes ten minutes twice a year, building software to remove it probably makes no economic sense." },
      { type: "paragraph", text: "Frequency changes the calculation." },
      { type: "paragraph", text: "Imagine five employees each spend twenty minutes per working day searching for information, copying data between systems or updating repetitive administrative records." },
      { type: "paragraph", text: "That is 100 minutes every day." },
      { type: "paragraph", text: "Over five working days, it becomes more than eight hours." },
      { type: "paragraph", text: "Over approximately 48 working weeks, it becomes around 400 hours of work per year." },
      { type: "paragraph", text: "The individual task still looks insignificant." },
      { type: "paragraph", text: "The accumulated operational cost does not." },
      { type: "paragraph", text: "This is why the correct question is rarely:" },
      { type: "quote", text: "“Can this be automated?”" },
      { type: "paragraph", text: "Almost anything can be automated with enough money and effort." },
      { type: "paragraph", text: "The useful question is:" },
      { type: "quote", text: "“Does the cost of this process justify changing it?”" },
      { type: "paragraph", text: "That requires understanding frequency, people involved, labour cost and the value of the time that could be recovered." },

      { type: "heading", level: 2, text: "Signal 3: workarounds have become part of the official process", id: "workarounds-become-process" },
      { type: "paragraph", text: "Every company has workarounds." },
      { type: "paragraph", text: "A spreadsheet used for one unusual situation is not a reason to commission custom software." },
      { type: "paragraph", text: "But listen to how people describe their daily work:" },
      { type: "list", items: [
        "“We use the CRM, except for this part.”",
        "“That has to be tracked separately in Excel.”",
        "“The system can’t handle that approval, so we do it by email.”",
        "“After every job, someone has to enter the same information again.”",
        "“Only one person knows how to prepare that report.”",
        "“Every Friday we export everything and rebuild it manually.”"
      ] },
      { type: "paragraph", text: "When exceptions become permanent, the business may have outgrown the process supported by its current software." },
      { type: "paragraph", text: "The important point is that the problem may not be the software itself." },
      { type: "paragraph", text: "The workflow may also need to be redesigned." },
      { type: "paragraph", text: "Automating an inefficient process without questioning it can simply make a bad process run faster." },

      { type: "heading", level: 2, text: "Signal 4: the information exists, but getting an answer is difficult", id: "information-without-answers" },
      { type: "paragraph", text: "A manager asks:" },
      { type: "list", items: [
        "Which projects are behind schedule?",
        "Which quotations are waiting for approval?",
        "Which clients need follow-up?",
        "How many hours have been spent on this project?",
        "Which documents are missing?",
        "Which tasks are blocked?",
        "What happened with this customer three months ago?"
      ] },
      { type: "paragraph", text: "If answering those questions requires asking several employees, checking different applications or manually assembling a spreadsheet, the company probably does not have a data problem." },
      { type: "paragraph", text: "It has a structure problem." },
      { type: "paragraph", text: "The information already exists." },
      { type: "paragraph", text: "It simply does not exist in a form that supports the decisions the business needs to make." },
      { type: "paragraph", text: "One of the most valuable roles of an operational platform is therefore not automation." },
      { type: "paragraph", text: "It is creating a coherent operational picture." },

      { type: "heading", level: 2, text: "Signal 5: growth creates disproportionately more administration", id: "growth-creates-administration" },
      { type: "paragraph", text: "Growth should increase the amount of productive work a business performs." },
      { type: "paragraph", text: "But in some companies, every new client, employee or project also creates another layer of administration." },
      { type: "paragraph", text: "Five projects are manageable." },
      { type: "paragraph", text: "Twenty require spreadsheets." },
      { type: "paragraph", text: "Forty require somebody to maintain the spreadsheets." },
      { type: "paragraph", text: "Eighty require another person to check the person maintaining the spreadsheets." },
      { type: "paragraph", text: "This is an important signal." },
      { type: "paragraph", text: "If administrative complexity grows faster than the business itself, the underlying operational system may not scale with the company." },
      { type: "paragraph", text: "Custom software can make sense when it removes that relationship between growth and administrative workload." },
      { type: "paragraph", text: "But again, the goal is not “automation” for its own sake." },
      { type: "paragraph", text: "The goal is to allow the business to handle more activity without administrative complexity increasing at the same rate." },

      { type: "heading", level: 2, text: "When custom software is the wrong answer", id: "when-custom-software-is-wrong" },
      { type: "paragraph", text: "Custom software is not automatically better than standard software." },
      { type: "paragraph", text: "Quite often, it is the wrong investment." },
      { type: "paragraph", text: "If an established product already handles the requirement well, using it will usually be faster, cheaper and less risky than rebuilding the same functionality." },
      { type: "paragraph", text: "There is little reason for most SMEs to develop their own accounting software, email platform, payment processor or document-storage infrastructure." },
      { type: "paragraph", text: "Those are largely standard problems with mature existing solutions." },
      { type: "paragraph", text: "Custom development becomes more valuable when the competitive or operational value lies in how several activities need to work together for that particular business." },
      { type: "paragraph", text: "There is also an important middle ground:" },
      { type: "paragraph", text: "keep the software that works and build only what is missing." },
      { type: "paragraph", text: "For example, a company might retain its accounting package but build an operational platform that prepares the information the accounting system requires." },
      { type: "paragraph", text: "Or keep Microsoft 365 for documents while creating a custom workflow controlling when those documents are generated, reviewed and approved." },
      { type: "paragraph", text: "The objective should not be to replace software." },
      { type: "paragraph", text: "It should be to remove operational friction." },

      { type: "heading", level: 2, text: "Focused system or complete operational platform?", id: "focused-system-or-platform" },
      { type: "paragraph", text: "This is another decision businesses often get wrong." },
      { type: "paragraph", text: "“Custom software” can sound like a large transformation project." },
      { type: "paragraph", text: "It does not have to be." },
      { type: "paragraph", text: "Imagine a company where most operations work well, but weekly payroll preparation requires several hours of manually consolidating timesheets, schedules and employee information." },
      { type: "paragraph", text: "The right answer might be a focused system that solves that one process." },
      { type: "paragraph", text: "Building an entire ERP would be unnecessary." },
      { type: "paragraph", text: "Now imagine another company where client information, planning, projects, documents, approvals and reporting all depend on disconnected tools and manual transfers." },
      { type: "paragraph", text: "Solving each problem separately could create yet another collection of applications." },
      { type: "paragraph", text: "In that case, a broader operational platform may make more sense." },
      { type: "paragraph", text: "A useful principle is:" },
      { type: "quote", text: "The size of the solution should follow the size of the operational problem. Not the ambitions of the software project." },

      { type: "heading", level: 2, text: "What about Belgian SMEs?", id: "belgian-smes" },
      { type: "paragraph", text: "Belgian businesses are already highly digitalised compared with many European markets." },
      { type: "link", href: "https://economie.fgov.be/fr/themes/entreprises/pme-et-independants-en/digitalisation-des-pme/digitalisation-des-pme-belges", label: "Source: Belgian FPS Economy — Digitalisation of Belgian SMEs: an international comparison", external: true },
      { type: "paragraph", text: "The challenge is therefore increasingly not whether a company uses digital tools, but whether those tools actually work together effectively." },
      { type: "paragraph", text: "For an SME, this distinction is particularly important." },
      { type: "paragraph", text: "Custom development consumes money and management attention. It should therefore solve a sufficiently valuable problem." },
      { type: "paragraph", text: "Before considering it, the business should understand:" },
      { type: "list", items: [
        "what the current process costs;",
        "where the friction actually occurs;",
        "which existing systems should remain;",
        "what can be solved through configuration or integration;",
        "what genuinely requires custom functionality;",
        "and what measurable improvement the change should create."
      ] },
      { type: "paragraph", text: "This also protects the company from overbuilding." },
      { type: "paragraph", text: "A €5,000 operational problem should not automatically receive a €50,000 technical solution." },

      { type: "heading", level: 2, text: "Nine questions to answer before commissioning custom software", id: "questions-before-custom-software" },
      { type: "paragraph", text: "Before choosing a developer, platform or technology, answer these questions:" },
      { type: "list", ordered: true, items: [
        "Which specific process is causing the problem?",
        "Who is involved in that process?",
        "How often does it happen?",
        "How much time does it currently require?",
        "Where does information enter the process?",
        "Where is information copied, checked or re-entered manually?",
        "Which existing tools already work well and should remain?",
        "Could an existing product or integration solve the problem sufficiently?",
        "What measurable improvement would make the investment worthwhile?"
      ] },
      { type: "paragraph", text: "If those answers are unclear, selecting technology is premature." },
      { type: "paragraph", text: "The first task is understanding the operation." },

      { type: "heading", level: 2, text: "The real choice is rarely “standard or custom”", id: "standard-or-custom" },
      { type: "paragraph", text: "Modern business systems do not need to be entirely standard or entirely custom." },
      { type: "paragraph", text: "A company can use established services for email, accounting, payments and document storage while using custom software for the workflows that are specific to its operation." },
      { type: "paragraph", text: "That hybrid approach is often the most sensible." },
      { type: "paragraph", text: "Standard where the requirement is standard." },
      { type: "paragraph", text: "Custom where the way the business works creates specific operational value." },
      { type: "paragraph", text: "So before asking:" },
      { type: "quote", text: "“How much does custom business software cost?”" },
      { type: "paragraph", text: "there is a better question:" },
      { type: "quote", text: "“What operational problem are we trying to solve, and what is that problem costing the business today?”" },
      { type: "paragraph", text: "Once that is understood, the appropriate technology — and whether anything needs to be built at all — becomes much easier to determine." }
    ],
  },
  {
    locale: "fr",
    slug: customBusinessSoftwareSlugs.fr,
    translationKey: customBusinessSoftwareTranslationKey,
    category: "PLATEFORME MÉTIER SUR MESURE",
    title: "Plateforme métier sur mesure en Belgique : quand est-elle réellement nécessaire ?",
    introduction: "Comment déterminer quand un logiciel standard suffit, quand vos processus nécessitent une solution plus spécifique et quand le développement sur mesure devient réellement pertinent.",
    publishedAt: "2026-09-04",
    readingTime: "8 min de lecture",
    metadata: {
      title: "Plateforme métier sur mesure Belgique : quand en avez-vous besoin ? | BrandLabel",
      description: "Quand une plateforme métier sur mesure est-elle réellement utile ? Découvrez les signaux à analyser, les alternatives et les questions qu'une PME belge devrait se poser.",
    },
    content: [
      { type: "paragraph", text: "La plupart des entreprises n’ont pas besoin d’un logiciel supplémentaire." },
      { type: "paragraph", text: "Elles ont besoin de moins d’étapes manuelles, d’informations plus faciles à retrouver et d’outils qui fonctionnent correctement ensemble." },
      { type: "paragraph", text: "La différence est importante." },
      { type: "paragraph", text: "Lorsqu’une organisation devient difficile à gérer, ajouter un CRM, un outil de planification, un logiciel de gestion de projets ou une nouvelle automatisation peut sembler être la solution évidente." },
      { type: "paragraph", text: "Parfois, c’est effectivement le cas." },
      { type: "paragraph", text: "Mais parfois, ce nouvel outil devient simplement un système supplémentaire que l’équipe doit alimenter et maintenir." },
      { type: "paragraph", text: "Une plateforme métier sur mesure devient réellement intéressante lorsque le problème n’est plus l’absence de logiciels, mais l’écart entre le fonctionnement réel de l’entreprise et ce que ses outils actuels lui permettent de faire." },
      { type: "paragraph", text: "Alors, comment savoir si le développement sur mesure est justifié — ou si une solution existante serait un meilleur investissement ?" },

      { type: "heading", level: 2, text: "Qu’est-ce qu’une plateforme métier sur mesure ?", id: "definition-plateforme-metier-sur-mesure" },
      { type: "paragraph", text: "Une plateforme métier sur mesure n’est pas nécessairement un énorme ERP destiné à remplacer tous les logiciels d’une entreprise." },
      { type: "paragraph", text: "Elle peut être beaucoup plus ciblée." },
      { type: "paragraph", text: "Selon les besoins, elle peut notamment réunir :" },
      { type: "list", items: [
        "la gestion des clients et de leurs demandes ;",
        "les projets et leur avancement ;",
        "la planification des équipes ;",
        "le suivi du temps ;",
        "les devis et validations ;",
        "les documents ;",
        "les stocks ou équipements ;",
        "certaines opérations financières ;",
        "les tâches et demandes internes ;",
        "le reporting et les tableaux de bord ;",
        "les automatisations entre différentes étapes du travail."
      ] },
      { type: "paragraph", text: "Ce qui définit le sur mesure n’est donc pas le nombre de fonctionnalités." },
      { type: "paragraph", text: "C’est le fait que le système soit conçu autour d’un besoin opérationnel spécifique, au lieu d’obliger l’entreprise à adapter son fonctionnement à un logiciel prédéfini." },
      { type: "paragraph", text: "Cela ne signifie pas non plus que tout doit être développé à partir de zéro." },
      { type: "paragraph", text: "Une plateforme peut parfaitement conserver et intégrer les solutions existantes qui fonctionnent déjà correctement : comptabilité, paiement, messagerie, stockage documentaire ou autres services spécialisés." },

      { type: "heading", level: 2, text: "Premier signal : vos collaborateurs font le lien entre vos logiciels", id: "collaborateurs-lien-logiciels" },
      { type: "paragraph", text: "Prenons une PME qui utilise un CRM, Excel, une messagerie, un calendrier partagé, un logiciel comptable et un espace de stockage en ligne." },
      { type: "paragraph", text: "Aucun de ces outils n’est nécessairement mauvais." },
      { type: "paragraph", text: "Le problème commence lorsque les informations doivent constamment être transférées manuellement de l’un à l’autre." },
      { type: "paragraph", text: "Une demande arrive par e-mail." },
      { type: "paragraph", text: "Quelqu’un la recopie dans Excel." },
      { type: "paragraph", text: "Une autre personne modifie le planning." },
      { type: "paragraph", text: "Les documents sont enregistrés ailleurs." },
      { type: "paragraph", text: "Les informations relatives au projet se trouvent dans un autre logiciel." },
      { type: "paragraph", text: "Et en fin de semaine, quelqu’un rassemble à nouveau toutes ces données pour préparer un rapport, une facture, la paie ou un tableau de suivi." },
      { type: "paragraph", text: "L’entreprise est digitalisée." },
      { type: "paragraph", text: "Mais ce sont ses collaborateurs qui assurent manuellement l’intégration entre les différents systèmes." },
      { type: "paragraph", text: "Cela génère trois coûts importants." },
      { type: "list", items: [
        "Du temps. Les mêmes informations sont saisies, copiées, vérifiées et recherchées plusieurs fois.",
        "Des erreurs. Chaque transfert manuel augmente le risque d’informations manquantes, incorrectes ou obsolètes.",
        "Un manque de visibilité. Aucun environnement ne donne une vision suffisamment fiable de la situation actuelle."
      ] },
      { type: "paragraph", text: "Dans ce cas, une plateforme métier sur mesure peut être pertinente." },
      { type: "paragraph", text: "Mais une intégration entre certains outils ou un système opérationnel plus ciblé peut parfois suffire." },

      { type: "heading", level: 2, text: "Deuxième signal : une petite tâche administrative devient coûteuse parce qu’elle se répète", id: "tache-administrative-repetee" },
      { type: "paragraph", text: "Toutes les tâches répétitives ne méritent pas d’être automatisées." },
      { type: "paragraph", text: "Si une opération prend dix minutes et n’est effectuée que deux fois par an, développer un système pour la supprimer a peu de chances d’être rentable." },
      { type: "paragraph", text: "La fréquence change complètement le calcul." },
      { type: "paragraph", text: "Imaginons que cinq collaborateurs consacrent chacun vingt minutes par jour à rechercher des informations, recopier des données ou mettre à jour différents systèmes." },
      { type: "paragraph", text: "Cela représente 100 minutes par jour." },
      { type: "paragraph", text: "Plus de huit heures par semaine." },
      { type: "paragraph", text: "Sur environ 48 semaines de travail, cela représente près de 400 heures de travail par an." },
      { type: "paragraph", text: "La tâche individuelle paraît insignifiante." },
      { type: "paragraph", text: "Son coût cumulé ne l’est plus." },
      { type: "paragraph", text: "C’est pourquoi la bonne question n’est pas :" },
      { type: "quote", text: "« Peut-on automatiser cette tâche ? »" },
      { type: "paragraph", text: "Avec suffisamment de temps et de budget, presque tout peut être automatisé." },
      { type: "paragraph", text: "La vraie question est :" },
      { type: "quote", text: "« Le coût de ce processus justifie-t-il de le modifier ? »" },
      { type: "paragraph", text: "Pour y répondre, il faut connaître sa fréquence, le nombre de personnes concernées, le temps consacré et le coût du travail mobilisé." },

      { type: "heading", level: 2, text: "Troisième signal : les contournements sont devenus le fonctionnement normal", id: "contournements-fonctionnement-normal" },
      { type: "paragraph", text: "Toutes les entreprises ont des exceptions." },
      { type: "paragraph", text: "Un fichier Excel utilisé ponctuellement pour gérer une situation particulière ne justifie pas le développement d’un logiciel de gestion sur mesure." },
      { type: "paragraph", text: "Mais certaines phrases doivent attirer l’attention :" },
      { type: "list", items: [
        "« On utilise le CRM, sauf pour cette partie. »",
        "« Ça, on doit encore le suivre dans Excel. »",
        "« Le logiciel ne permet pas cette validation, donc on la fait par e-mail. »",
        "« Après chaque intervention, quelqu’un doit encoder à nouveau les mêmes informations. »",
        "« Une seule personne sait préparer ce rapport. »",
        "« Chaque vendredi, on exporte tout pour refaire le tableau ailleurs. »"
      ] },
      { type: "paragraph", text: "Lorsque les exceptions deviennent permanentes, l’entreprise a peut-être dépassé les limites du processus que son logiciel actuel peut correctement supporter." },
      { type: "paragraph", text: "Mais il faut également éviter une autre erreur : considérer automatiquement que le logiciel est responsable." },
      { type: "paragraph", text: "Le processus lui-même peut être mal conçu." },
      { type: "paragraph", text: "Automatiser un mauvais processus ne le rend pas nécessairement meilleur. Cela peut simplement le rendre plus rapide." },
      { type: "paragraph", text: "Il faut donc comprendre le fonctionnement avant de choisir la technologie." },

      { type: "heading", level: 2, text: "Quatrième signal : l’information existe, mais obtenir une réponse reste compliqué", id: "information-reponse-compliquee" },
      { type: "paragraph", text: "Un responsable souhaite savoir :" },
      { type: "list", items: [
        "quels projets prennent du retard ;",
        "quels devis attendent encore une validation ;",
        "quels clients doivent être relancés ;",
        "combien d’heures ont été consacrées à un projet ;",
        "quels documents sont manquants ;",
        "quelles tâches sont bloquées ;",
        "ce qui s’est passé avec un client plusieurs mois auparavant."
      ] },
      { type: "paragraph", text: "Si répondre à ces questions nécessite d’interroger plusieurs collaborateurs, d’ouvrir différents logiciels ou de reconstruire manuellement un tableau Excel, le problème n’est probablement pas l’absence de données." },
      { type: "paragraph", text: "Les données existent déjà." },
      { type: "paragraph", text: "Elles ne sont simplement pas organisées de manière à soutenir les décisions que l’entreprise doit prendre." },
      { type: "paragraph", text: "Une plateforme opérationnelle peut donc apporter de la valeur sans nécessairement automatiser des dizaines de tâches." },
      { type: "paragraph", text: "Elle peut simplement créer une source d’information cohérente et exploitable." },

      { type: "heading", level: 2, text: "Cinquième signal : la croissance génère proportionnellement trop d’administration", id: "croissance-administration" },
      { type: "paragraph", text: "La croissance devrait principalement augmenter l’activité productive de l’entreprise." },
      { type: "paragraph", text: "Dans certaines organisations, elle augmente surtout l’administration." },
      { type: "paragraph", text: "Cinq projets sont faciles à suivre." },
      { type: "paragraph", text: "À vingt projets, un tableau Excel devient nécessaire." },
      { type: "paragraph", text: "À quarante, quelqu’un doit maintenir ce tableau." },
      { type: "paragraph", text: "À quatre-vingts, une autre personne doit vérifier les informations du tableau et préparer les rapports." },
      { type: "paragraph", text: "Le même phénomène peut apparaître avec les clients, les collaborateurs, les interventions, les devis ou les documents." },
      { type: "paragraph", text: "Lorsque la complexité administrative augmente plus rapidement que l’activité elle-même, cela peut indiquer que le système opérationnel n’évolue plus correctement avec l’entreprise." },
      { type: "paragraph", text: "Une solution sur mesure peut alors permettre d’absorber davantage d’activité sans faire augmenter l’administration au même rythme." },

      { type: "heading", level: 2, text: "Quand le sur mesure n’est-il pas la bonne solution ?", id: "quand-sur-mesure-mauvaise-solution" },
      { type: "paragraph", text: "Une solution sur mesure n’est pas automatiquement supérieure à un logiciel standard." },
      { type: "paragraph", text: "Dans de nombreux cas, elle constitue même un mauvais investissement." },
      { type: "paragraph", text: "Lorsqu’un logiciel existant répond correctement au besoin, il sera généralement plus rapide, moins coûteux et moins risqué de l’utiliser plutôt que de reconstruire les mêmes fonctionnalités." },
      { type: "paragraph", text: "Une PME a rarement intérêt à développer son propre logiciel comptable, son système de messagerie ou son infrastructure de paiement si des solutions matures répondent déjà correctement à ces besoins." },
      { type: "paragraph", text: "Le développement sur mesure devient plus pertinent lorsque la valeur se trouve dans la manière spécifique dont plusieurs activités doivent fonctionner ensemble." },
      { type: "paragraph", text: "Il existe aussi une troisième possibilité, souvent plus intelligente :" },
      { type: "paragraph", text: "conserver les bons logiciels et développer uniquement ce qui manque entre eux." },
      { type: "paragraph", text: "Une entreprise peut, par exemple, conserver son logiciel comptable tout en développant un système opérationnel qui prépare automatiquement les informations nécessaires à la facturation." },
      { type: "paragraph", text: "Elle peut continuer à utiliser Microsoft 365 pour ses documents, tout en ajoutant un processus spécifique pour leur création, leur validation et leur suivi." },
      { type: "paragraph", text: "L’objectif n’est donc pas de remplacer un maximum de logiciels." },
      { type: "paragraph", text: "L’objectif est de réduire la friction entre le travail, les informations et les outils." },

      { type: "heading", level: 2, text: "Système ciblé ou plateforme métier complète ?", id: "systeme-cible-ou-plateforme-complete" },
      { type: "paragraph", text: "Le terme « développement sur mesure » donne parfois l’impression qu’il faut nécessairement lancer un projet informatique énorme." },
      { type: "paragraph", text: "Ce n’est pas le cas." },
      { type: "paragraph", text: "Imaginons une entreprise dont l’organisation fonctionne correctement dans son ensemble, mais où la préparation hebdomadaire de la paie nécessite plusieurs heures pour rassembler les horaires, les prestations et les informations des collaborateurs." },
      { type: "paragraph", text: "Un système ciblé peut suffire à résoudre ce problème." },
      { type: "paragraph", text: "Il serait inutile de reconstruire toute l’entreprise dans un nouvel ERP." },
      { type: "paragraph", text: "Prenons maintenant une entreprise où les mêmes difficultés apparaissent dans la gestion des clients, la planification, les projets, les documents, les validations et le reporting." },
      { type: "paragraph", text: "Résoudre chaque problème avec un outil différent risque simplement de créer une nouvelle collection de logiciels déconnectés." },
      { type: "paragraph", text: "Dans ce cas, une plateforme métier plus large peut devenir plus logique." },
      { type: "paragraph", text: "Le principe est simple :" },
      { type: "quote", text: "La taille de la solution doit suivre la taille du problème opérationnel. Pas l’ambition du projet informatique." },

      { type: "heading", level: 2, text: "Et pour les PME en Belgique ?", id: "pme-belgique" },
      { type: "paragraph", text: "Les entreprises belges sont déjà fortement digitalisées." },
      {
        type: "linkedParagraph",
        before: "Le ",
        href: "https://economie.fgov.be/fr/themes/entreprises/pme-et-independants-en/digitalisation-des-pme/digitalisation-des-pme-belges",
        label: "SPF Économie souligne",
        after: " que les PME belges affichent un niveau élevé d’intensité numérique par rapport à la moyenne européenne, même si les petites entreprises restent davantage confrontées à certains obstacles, notamment le coût des investissements, le manque de ressources techniques internes et les difficultés de compatibilité entre systèmes.",
        external: true
      },
      { type: "paragraph", text: "Cela change progressivement la nature du problème." },
      { type: "paragraph", text: "Pour de nombreuses PME, le prochain gain de productivité ne viendra pas nécessairement du fait de digitaliser davantage." },
      { type: "paragraph", text: "Il peut venir du fait de mieux organiser, connecter et simplifier ce qui est déjà digitalisé." },
      { type: "paragraph", text: "Une plateforme métier sur mesure peut jouer ce rôle, mais uniquement lorsque le problème opérationnel justifie l’investissement." },
      { type: "paragraph", text: "Avant d’envisager un développement, l’entreprise devrait donc comprendre :" },
      { type: "list", items: [
        "le coût du processus actuel ;",
        "l’endroit précis où se situe la friction ;",
        "les logiciels existants qui doivent être conservés ;",
        "ce qui peut être résolu par une meilleure configuration ;",
        "ce qui peut être résolu par une intégration ;",
        "ce qui nécessite réellement un développement spécifique ;",
        "et l’amélioration mesurable attendue."
      ] },
      { type: "paragraph", text: "Cette réflexion permet également d’éviter le surdéveloppement." },
      { type: "paragraph", text: "Un problème opérationnel de 5 000 € ne devrait pas automatiquement recevoir une solution technique de 50 000 €." },

      { type: "heading", level: 2, text: "Neuf questions à poser avant de développer une plateforme sur mesure", id: "questions-avant-plateforme-sur-mesure" },
      { type: "paragraph", text: "Avant de choisir une agence, un développeur ou une technologie, il est utile de répondre à ces questions :" },
      { type: "list", ordered: true, items: [
        "Quel processus précis pose problème ?",
        "Quelles personnes interviennent dans ce processus ?",
        "À quelle fréquence est-il exécuté ?",
        "Combien de temps nécessite-t-il aujourd’hui ?",
        "À quel endroit l’information entre-t-elle dans le processus ?",
        "Où les données doivent-elles être recopiées, contrôlées ou réencodées manuellement ?",
        "Quels outils actuels fonctionnent correctement et doivent être conservés ?",
        "Un logiciel existant ou une intégration pourrait-il résoudre suffisamment le problème ?",
        "Quelle amélioration mesurable rendrait l’investissement intéressant ?"
      ] },
      { type: "paragraph", text: "Si ces réponses ne sont pas encore claires, il est probablement trop tôt pour choisir une technologie." },
      { type: "paragraph", text: "Il faut d’abord comprendre l’opération." },

      { type: "heading", level: 2, text: "Le véritable choix n’est pas « standard ou sur mesure »", id: "standard-ou-sur-mesure" },
      { type: "paragraph", text: "Une entreprise moderne n’a pas besoin de choisir entre un environnement entièrement standardisé et une infrastructure entièrement développée sur mesure." },
      { type: "paragraph", text: "Elle peut utiliser des solutions existantes pour sa comptabilité, ses paiements, ses e-mails ou son stockage documentaire, tout en développant une plateforme spécifique pour les processus qui lui sont propres." },
      { type: "paragraph", text: "Cette approche hybride est souvent la plus rationnelle." },
      { type: "paragraph", text: "Standard lorsque le besoin est standard." },
      { type: "paragraph", text: "Sur mesure lorsque le fonctionnement spécifique de l’entreprise crée une véritable valeur opérationnelle." },
      { type: "paragraph", text: "Avant de demander :" },
      { type: "quote", text: "« Combien coûte une plateforme métier sur mesure en Belgique ? »" },
      { type: "paragraph", text: "il existe donc une question plus importante :" },
      { type: "quote", text: "« Quel problème opérationnel essayons-nous de résoudre et combien nous coûte-t-il aujourd’hui ? »" },
      { type: "paragraph", text: "Une fois cette réponse connue, il devient beaucoup plus simple de déterminer la technologie appropriée, le périmètre nécessaire et si un développement doit réellement être envisagé." }
    ],
  },
  {
    locale: "nl",
    slug: customBusinessSoftwareSlugs.nl,
    translationKey: customBusinessSoftwareTranslationKey,
    category: "SOFTWARE OP MAAT",
    title: "Software op maat in België: wanneer heeft uw bedrijf het echt nodig?",
    introduction: "Hoe bepaalt u wanneer standaardsoftware volstaat, wanneer uw processen iets specifiekers nodig hebben en wanneer maatwerksoftware zakelijk echt zinvol wordt?",
    publishedAt: "2026-09-04",
    readingTime: "8 min leestijd",
    metadata: {
      title: "Software op maat België: wanneer heeft uw bedrijf het nodig? | BrandLabel",
      description: "Wanneer is software op maat zinvol? Ontdek de belangrijkste signalen, alternatieven en vragen die een Belgische KMO moet beoordelen vóór ze investeert.",
    },
    content: [
      { type: "paragraph", text: "De meeste bedrijven hebben niet méér software nodig." },
      { type: "paragraph", text: "Ze hebben minder handmatige stappen nodig, informatie die makkelijker terug te vinden is en systemen die beter met elkaar samenwerken." },
      { type: "paragraph", text: "Dat verschil is belangrijk." },
      { type: "paragraph", text: "Wanneer een bedrijf moeilijker te beheren wordt, lijkt een nieuwe CRM, planningstool, projectmanagementsoftware of automatisering vaak de logische oplossing." },
      { type: "paragraph", text: "Soms is dat inderdaad zo." },
      { type: "paragraph", text: "Maar soms wordt die nieuwe tool gewoon het volgende systeem dat medewerkers moeten bijhouden." },
      { type: "paragraph", text: "Software op maat wordt vooral interessant wanneer het probleem niet langer een gebrek aan software is, maar de kloof tussen hoe het bedrijf werkelijk werkt en wat de bestaande software ondersteunt." },
      { type: "paragraph", text: "Wanneer is maatwerksoftware dan gerechtvaardigd? En wanneer is bestaande software eigenlijk de betere investering?" },

      { type: "heading", level: 2, text: "Wat betekent software op maat precies?", id: "wat-betekent-software-op-maat" },
      { type: "paragraph", text: "Maatwerksoftware betekent niet noodzakelijk dat een bedrijf al zijn bestaande toepassingen moet vervangen door één enorm ERP-systeem." },
      { type: "paragraph", text: "De oplossing kan veel gerichter zijn." },
      { type: "paragraph", text: "Afhankelijk van de operationele behoefte kan een systeem bijvoorbeeld verschillende onderdelen samenbrengen:" },
      { type: "list", items: [
        "klanten en aanvragen;",
        "projecten en hun voortgang;",
        "personeelsplanning;",
        "tijdregistratie;",
        "offertes en goedkeuringen;",
        "documenten;",
        "voorraad of materiaal;",
        "bepaalde financiële processen;",
        "interne taken en aanvragen;",
        "rapportering en dashboards;",
        "automatisering tussen verschillende stappen."
      ] },
      { type: "paragraph", text: "Het aantal functies bepaalt niet of iets maatwerksoftware is." },
      { type: "paragraph", text: "Het belangrijkste verschil is dat het systeem rond een specifieke operationele behoefte wordt ontworpen, in plaats van dat het bedrijf zijn werking moet aanpassen aan een vooraf bepaald softwarepakket." },
      { type: "paragraph", text: "Dat betekent ook niet dat alles opnieuw moet worden ontwikkeld." },
      { type: "paragraph", text: "Een bedrijfsplatform op maat kan perfect samenwerken met bestaande oplossingen voor boekhouding, betalingen, e-mail, documentopslag of andere standaardfuncties." },

      { type: "heading", level: 2, text: "Eerste signaal: uw medewerkers verbinden uw software handmatig", id: "medewerkers-verbinden-software" },
      { type: "paragraph", text: "Stel dat een KMO een CRM, Excel, e-mail, een gedeelde agenda, boekhoudsoftware en cloudopslag gebruikt." },
      { type: "paragraph", text: "Geen van die systemen hoeft op zichzelf een probleem te zijn." },
      { type: "paragraph", text: "Het probleem ontstaat wanneer informatie voortdurend handmatig van het ene systeem naar het andere moet worden overgebracht." },
      { type: "paragraph", text: "Een aanvraag komt binnen via e-mail." },
      { type: "paragraph", text: "Iemand zet de gegevens in Excel." },
      { type: "paragraph", text: "Een andere medewerker past de planning aan." },
      { type: "paragraph", text: "Documenten worden ergens anders opgeslagen." },
      { type: "paragraph", text: "Projectinformatie staat in een andere toepassing." },
      { type: "paragraph", text: "Aan het einde van de week verzamelt iemand alles opnieuw om een rapport, factuur, loonberekening of managementoverzicht op te stellen." },
      { type: "paragraph", text: "Het bedrijf is digitaal." },
      { type: "paragraph", text: "Maar de medewerkers functioneren als de integratie tussen de verschillende systemen." },
      { type: "paragraph", text: "Dat veroorzaakt drie belangrijke kosten." },
      { type: "list", items: [
        "Tijd. Dezelfde informatie wordt meerdere keren ingevoerd, gekopieerd, gecontroleerd en opgezocht.",
        "Fouten. Elke handmatige overdracht creëert een extra kans op ontbrekende, foutieve of verouderde informatie.",
        "Gebrek aan overzicht. Geen enkel systeem geeft een volledig en betrouwbaar beeld van wat er op dat moment gebeurt."
      ] },
      { type: "paragraph", text: "In zo’n situatie kan een bedrijfsplatform op maat interessant worden." },
      { type: "paragraph", text: "Maar soms is een integratie tussen bestaande systemen of een kleiner operationeel systeem al voldoende." },

      { type: "heading", level: 2, text: "Tweede signaal: een kleine administratieve taak wordt duur omdat ze voortdurend terugkomt", id: "administratieve-taak-komt-terug" },
      { type: "paragraph", text: "Niet elke repetitieve taak moet worden geautomatiseerd." },
      { type: "paragraph", text: "Als een taak twee keer per jaar tien minuten kost, heeft het weinig zin om software te ontwikkelen om die taak te elimineren." },
      { type: "paragraph", text: "Frequentie verandert de berekening." },
      { type: "paragraph", text: "Stel dat vijf medewerkers elk twintig minuten per werkdag besteden aan het zoeken naar informatie, het kopiëren van gegevens of het bijwerken van verschillende systemen." },
      { type: "paragraph", text: "Dat zijn samen 100 minuten per dag." },
      { type: "paragraph", text: "Meer dan acht uur per week." },
      { type: "paragraph", text: "Over ongeveer 48 werkweken spreken we over bijna 400 werkuren per jaar." },
      { type: "paragraph", text: "De afzonderlijke taak lijkt onbelangrijk." },
      { type: "paragraph", text: "De gecumuleerde operationele kost is dat niet." },
      { type: "paragraph", text: "Daarom is de juiste vraag meestal niet:" },
      { type: "quote", text: "“Kunnen we dit automatiseren?”" },
      { type: "paragraph", text: "Met voldoende tijd en budget kan bijna alles worden geautomatiseerd." },
      { type: "paragraph", text: "Een nuttigere vraag is:" },
      { type: "quote", text: "“Is de kost van dit proces hoog genoeg om een verandering te rechtvaardigen?”" },
      { type: "paragraph", text: "Om dat te bepalen, moet u weten hoe vaak het proces plaatsvindt, hoeveel mensen erbij betrokken zijn, hoeveel tijd het kost en welke arbeidskost ermee gepaard gaat." },

      { type: "heading", level: 2, text: "Derde signaal: tijdelijke workarounds zijn de normale werkwijze geworden", id: "workarounds-normale-werkwijze" },
      { type: "paragraph", text: "Elk bedrijf heeft uitzonderingen." },
      { type: "paragraph", text: "Een Excel-bestand dat af en toe wordt gebruikt voor een bijzondere situatie is geen reden om maatwerksoftware te laten ontwikkelen." },
      { type: "paragraph", text: "Maar sommige uitspraken zijn een duidelijk signaal:" },
      { type: "list", items: [
        "“We gebruiken het CRM, behalve voor dit onderdeel.”",
        "“Dat moeten we nog apart in Excel bijhouden.”",
        "“Het systeem ondersteunt die goedkeuring niet, dus doen we dat via e-mail.”",
        "“Na elke interventie moet iemand dezelfde informatie opnieuw invoeren.”",
        "“Er is maar één persoon die weet hoe dat rapport wordt gemaakt.”",
        "“Elke vrijdag exporteren we alles en bouwen we het overzicht opnieuw op.”"
      ] },
      { type: "paragraph", text: "Wanneer uitzonderingen structureel worden, kan het bedrijf de mogelijkheden van zijn huidige software zijn ontgroeid." },
      { type: "paragraph", text: "Maar dat betekent niet automatisch dat de software het probleem is." },
      { type: "paragraph", text: "Het proces zelf kan eveneens inefficiënt zijn." },
      { type: "paragraph", text: "Een slecht proces automatiseren maakt het niet noodzakelijk beter. Het kan er alleen voor zorgen dat een slecht proces sneller verloopt." },
      { type: "paragraph", text: "Daarom moet eerst de werking worden begrepen en pas daarna de technologie worden gekozen." },

      { type: "heading", level: 2, text: "Vierde signaal: de informatie bestaat, maar een antwoord vinden blijft moeilijk", id: "informatie-antwoord-moeilijk" },
      { type: "paragraph", text: "Een bedrijfsleider wil weten:" },
      { type: "list", items: [
        "welke projecten vertraging hebben;",
        "welke offertes nog op goedkeuring wachten;",
        "welke klanten moeten worden opgevolgd;",
        "hoeveel uren aan een bepaald project zijn besteed;",
        "welke documenten ontbreken;",
        "welke taken geblokkeerd zijn;",
        "wat er enkele maanden geleden met een klant is gebeurd."
      ] },
      { type: "paragraph", text: "Als het antwoord op zulke vragen vereist dat verschillende medewerkers worden aangesproken, meerdere toepassingen worden geopend of handmatig een Excel-overzicht wordt samengesteld, heeft het bedrijf waarschijnlijk geen gebrek aan gegevens." },
      { type: "paragraph", text: "De informatie bestaat al." },
      { type: "paragraph", text: "Ze is alleen niet georganiseerd op een manier die de beslissingen van het bedrijf ondersteunt." },
      { type: "paragraph", text: "Een operationeel bedrijfsplatform kan daarom waarde creëren zonder tientallen processen te automatiseren." },
      { type: "paragraph", text: "Soms is het belangrijkste resultaat simpelweg één betrouwbare en bruikbare bron van operationele informatie." },

      { type: "heading", level: 2, text: "Vijfde signaal: groei zorgt voor onevenredig veel extra administratie", id: "groei-extra-administratie" },
      { type: "paragraph", text: "Groei zou vooral moeten leiden tot meer productieve activiteit." },
      { type: "paragraph", text: "Bij sommige bedrijven zorgt groei vooral voor meer administratie." },
      { type: "paragraph", text: "Vijf projecten zijn eenvoudig op te volgen." },
      { type: "paragraph", text: "Bij twintig projecten wordt een Excel-bestand noodzakelijk." },
      { type: "paragraph", text: "Bij veertig projecten moet iemand dat bestand voortdurend onderhouden." },
      { type: "paragraph", text: "Bij tachtig projecten moet een andere persoon de informatie controleren en rapporten voorbereiden." },
      { type: "paragraph", text: "Hetzelfde kan gebeuren met klanten, medewerkers, interventies, offertes of documenten." },
      { type: "paragraph", text: "Wanneer de administratieve complexiteit sneller groeit dan de activiteit zelf, kan dat betekenen dat de operationele systemen niet meer meegroeien met het bedrijf." },
      { type: "paragraph", text: "Software op maat kan dan interessant worden wanneer ze het bedrijf in staat stelt meer activiteit te verwerken zonder dat de administratieve werklast in hetzelfde tempo toeneemt." },

      { type: "heading", level: 2, text: "Wanneer is maatwerksoftware niet de juiste oplossing?", id: "wanneer-maatwerksoftware-niet-juist" },
      { type: "paragraph", text: "Software op maat is niet automatisch beter dan standaardsoftware." },
      { type: "paragraph", text: "In veel situaties is maatwerk zelfs de verkeerde investering." },
      { type: "paragraph", text: "Wanneer bestaande software een behoefte goed afdekt, zal die oplossing doorgaans sneller, goedkoper en minder risicovol zijn dan dezelfde functionaliteit opnieuw ontwikkelen." },
      { type: "paragraph", text: "Voor de meeste KMO’s heeft het bijvoorbeeld weinig zin om eigen boekhoudsoftware, e-mailinfrastructuur, betalingsverwerking of documentopslag te ontwikkelen wanneer daarvoor volwassen oplossingen bestaan." },
      { type: "paragraph", text: "Maatwerksoftware wordt vooral waardevol wanneer de operationele waarde zit in de specifieke manier waarop verschillende activiteiten binnen het bedrijf moeten samenwerken." },
      { type: "paragraph", text: "Er bestaat bovendien een belangrijke tussenoplossing:" },
      { type: "paragraph", text: "behoud de software die goed werkt en bouw alleen wat ontbreekt." },
      { type: "paragraph", text: "Een bedrijf kan bijvoorbeeld zijn bestaande boekhoudpakket behouden en een operationeel systeem ontwikkelen dat automatisch de informatie voorbereidt die de boekhouding nodig heeft." },
      { type: "paragraph", text: "Of Microsoft 365 blijven gebruiken voor documenten, maar een specifieke workflow bouwen voor de creatie, controle, goedkeuring en opvolging ervan." },
      { type: "paragraph", text: "Het doel is niet om zoveel mogelijk software te vervangen." },
      { type: "paragraph", text: "Het doel is om de wrijving tussen werk, informatie en systemen te verminderen." },

      { type: "heading", level: 2, text: "Een gericht systeem of een volledig bedrijfsplatform?", id: "gericht-systeem-of-bedrijfsplatform" },
      { type: "paragraph", text: "“Software op maat” klinkt soms alsof het automatisch over een groot IT-project gaat." },
      { type: "paragraph", text: "Dat hoeft helemaal niet." },
      { type: "paragraph", text: "Stel dat de algemene werking van een bedrijf goed georganiseerd is, maar dat de wekelijkse loonvoorbereiding meerdere uren vraagt om uurregistraties, planningen en personeelsinformatie samen te brengen." },
      { type: "paragraph", text: "Een gericht operationeel systeem kan voldoende zijn." },
      { type: "paragraph", text: "Het zou weinig zin hebben om daarvoor een volledig ERP-systeem te bouwen." },
      { type: "paragraph", text: "Stel daarentegen dat dezelfde problemen terugkomen in klantenbeheer, planning, projecten, documenten, goedkeuringen en rapportering." },
      { type: "paragraph", text: "Elk probleem afzonderlijk oplossen met een andere toepassing kan gewoon een nieuwe verzameling losstaande tools creëren." },
      { type: "paragraph", text: "In dat geval kan een breder operationeel bedrijfsplatform logischer zijn." },
      { type: "paragraph", text: "Een nuttig principe is:" },
      { type: "quote", text: "De omvang van de oplossing moet de omvang van het operationele probleem volgen. Niet de ambitie van het softwareproject." },

      { type: "heading", level: 2, text: "En voor Belgische KMO’s?", id: "belgische-kmos" },
      { type: "paragraph", text: "Belgische ondernemingen zijn al sterk gedigitaliseerd." },
      {
        type: "linkedParagraph",
        before: "Volgens de ",
        href: "https://economie.fgov.be/nl/themas/ondernemingen/kmos-en-zelfstandigen-cijfers/digitalisering-van-kmos/digitalisering-van-de",
        label: "FOD Economie",
        after: " behoren Belgische KMO’s op verschillende vlakken tot de meer digitaal ontwikkelde ondernemingen binnen Europa. Tegelijk blijven kleinere bedrijven geconfronteerd met obstakels zoals investeringskosten, beperkte interne technische expertise en compatibiliteitsproblemen tussen verschillende systemen.",
        external: true
      },
      { type: "paragraph", text: "Daardoor verandert ook de uitdaging." },
      { type: "paragraph", text: "Voor veel KMO’s zal de volgende efficiëntiewinst niet noodzakelijk komen van nog meer digitaliseren." },
      { type: "paragraph", text: "De winst kan juist komen van beter organiseren, verbinden en vereenvoudigen wat al digitaal is." },
      { type: "paragraph", text: "Voor een KMO is dat onderscheid belangrijk, want maatwerksoftware vraagt niet alleen een financiële investering, maar ook tijd en aandacht van het management." },
      { type: "paragraph", text: "Voor een ontwikkeling wordt overwogen, moet daarom duidelijk zijn:" },
      { type: "list", items: [
        "wat het huidige proces kost;",
        "waar de operationele wrijving precies ontstaat;",
        "welke bestaande systemen moeten blijven;",
        "wat door betere configuratie kan worden opgelost;",
        "wat via een integratie kan worden opgelost;",
        "wat werkelijk maatwerk vereist;",
        "en welke meetbare verbetering de investering moet opleveren."
      ] },
      { type: "paragraph", text: "Zo voorkomt een bedrijf ook dat het te veel bouwt." },
      { type: "paragraph", text: "Een operationeel probleem van €5.000 heeft niet automatisch een technische oplossing van €50.000 nodig." },

      { type: "heading", level: 2, text: "Negen vragen voordat u software op maat laat ontwikkelen", id: "negen-vragen-software-op-maat" },
      { type: "paragraph", text: "Beantwoord deze vragen voordat u een ontwikkelaar, softwarebureau of technologie kiest:" },
      { type: "list", ordered: true, items: [
        "Welk specifiek proces veroorzaakt het probleem?",
        "Wie is bij dat proces betrokken?",
        "Hoe vaak vindt het proces plaats?",
        "Hoeveel tijd kost het vandaag?",
        "Waar komt informatie het proces binnen?",
        "Waar worden gegevens handmatig gekopieerd, gecontroleerd of opnieuw ingevoerd?",
        "Welke bestaande systemen werken goed en moeten behouden blijven?",
        "Kan bestaande software of een integratie het probleem voldoende oplossen?",
        "Welke meetbare verbetering zou de investering de moeite waard maken?"
      ] },
      { type: "paragraph", text: "Als deze antwoorden nog niet duidelijk zijn, is het te vroeg om technologie te kiezen." },
      { type: "paragraph", text: "Eerst moet de werking duidelijk zijn." },

      { type: "heading", level: 2, text: "De echte keuze is zelden “standaard of maatwerk”", id: "standaard-of-maatwerk" },
      { type: "paragraph", text: "Een modern bedrijf hoeft niet te kiezen tussen volledig standaardsoftware en een volledig op maat gebouwde IT-omgeving." },
      { type: "paragraph", text: "Een onderneming kan bestaande oplossingen gebruiken voor boekhouding, betalingen, e-mail en documentopslag en tegelijk maatwerksoftware inzetten voor de processen die specifiek zijn voor haar werking." },
      { type: "paragraph", text: "Die hybride aanpak is vaak de meest rationele." },
      { type: "paragraph", text: "Standaard waar de behoefte standaard is." },
      { type: "paragraph", text: "Maatwerk waar de specifieke werking van het bedrijf operationele waarde creëert." },
      { type: "paragraph", text: "Voordat u vraagt:" },
      { type: "quote", text: "“Wat kost software op maat in België?”" },
      { type: "paragraph", text: "is er daarom een belangrijkere vraag:" },
      { type: "quote", text: "“Welk operationeel probleem proberen we op te lossen en wat kost dat probleem ons vandaag?”" },
      { type: "paragraph", text: "Zodra dat duidelijk is, wordt het veel eenvoudiger om te bepalen welke technologie nodig is, hoe groot de oplossing moet zijn en of er überhaupt iets nieuws gebouwd moet worden." }
    ],
  },
];

export function getInsightArticle(locale: Locale, slug: string) {
  return insightArticles.find(
    (article) => article.locale === locale && article.slug === slug,
  );
}

export function getInsightArticleAlternates(article: InsightArticle) {
  return insightArticles.filter(
    (candidate) => candidate.translationKey === article.translationKey,
  );
}
