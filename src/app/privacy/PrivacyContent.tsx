"use client";

import { Container } from "@/components/Container";
import { useLanguage, type Language } from "@/lib/i18n";

type PolicySection = { title: string; paragraphs: string[] };

// The owner supplied this address without a building number.
// Keep that limitation in GA4-PRIVACY-SETUP.md; do not invent an address.
const policyText: Record<Language, PolicySection[]> = {
  en: [
    { title: "1. Scope and legal framework", paragraphs: [
      "This notice explains how BrandLabel Agency processes personal data in connection with brandlabelagency.com, its operational diagnostic, enquiries and client relationships. Processing is governed by Regulation (EU) 2016/679 (GDPR) and applicable Belgian data-protection law. This notice provides information; browsing the website does not constitute consent to optional analytics."
    ] },
    { title: "2. Business identification and controller", paragraphs: [
      "BrandLabel Agency is the trading name of Kizidou Dimitra, operating as a sole trader and acting as the controller for the processing described in this notice. Business address: Rue de la Marjolaine, 1120 Bruxelles, Belgium. Enterprise number: 1040.366.570. VAT: BE1040366570. Privacy contact: contact@brandlabelagency.com.",
      "Where BrandLabel Agency processes data solely on a client's instructions within a client system, that client remains the controller. The relevant service agreement and data-processing arrangements govern that activity."
    ] },
    { title: "3. Data collected and purposes", paragraphs: [
      "We process the name, business name, email address, request type, message and other information you choose to provide to respond to enquiries, prepare reports and quotations, and manage services. Required form fields are identified in the form; without the necessary information we may be unable to respond or provide the requested service.",
      "Hosting and security operations may involve IP addresses, request details, browser information and technical logs necessary to deliver the website, diagnose faults and prevent abuse. Optional audience measurement is described separately below. Please do not include sensitive personal data or unnecessary information about other people in your messages."
    ] },
    { title: "4. Operational diagnostic", paragraphs: [
      "The diagnostic calculates estimates in your browser. A summary of the selected problems, staffing, frequency, time and cost assumptions and results may be retained in the browser's session storage to support a subsequent report request. It is not automatically submitted as an enquiry simply because you calculate an estimate.",
      "If you submit a report or audit request containing that summary, it is sent with your contact details and becomes part of your enquiry. The browser copy is removed when the diagnostic is reset or the related request is successfully submitted; session storage normally ends when the tab is closed, subject to browser session-restoration behaviour. Estimates are indicative and do not constitute a solely automated decision producing legal or similarly significant effects."
    ] },
    { title: "5. Legal bases and communications", paragraphs: [
      "Requested pre-contractual steps and performance of a contract with you rely on Article 6(1)(b) GDPR. Business-contact correspondence, website security and the establishment or defence of legal claims may rely on Article 6(1)(f), subject to the balancing of our legitimate interests against your rights. Statutory accounting and other legal duties rely on Article 6(1)(c). Optional analytics rely on consent under Article 6(1)(a).",
      "Submitting an enquiry does not subscribe you to a newsletter or authorise advertising profiling. We do not currently offer a newsletter. Any future prospecting activity must have an applicable legal basis and comply separately with electronic-marketing rules; you may object to direct marketing at any time."
    ] },
    { title: "6. Cookies, local storage and your choice", paragraphs: [
      "Necessary browser storage supports your requested functions and remembers your analytics choice. The local-storage record brandlabel_cookie_consent contains your choice, its date and the notice version. It is valid for 180 days, with validity checked when the website loads. Browser storage can also be removed through your browser settings.",
      "Google Analytics 4, when activated, and Vercel Web Analytics load only after acceptance of optional analytics. You may refuse and continue using the website. The Cookie settings control in the footer withdraws the saved choice, stops future analytics collection on the reloaded page, removes accessible Google Analytics cookies and reopens the choice. Withdrawal does not affect the lawfulness of earlier processing based on consent."
    ] },
    { title: "7. Google Analytics 4 and Vercel Web Analytics", paragraphs: [
      "With consent, Google Analytics 4 measures page visits and campaign performance. It may process browser identifiers, page addresses and titles, referral and campaign information, visit times, approximate location and device/browser information. Our configuration excludes personalised advertising and Google signals; automatic form-interaction and site-search measurement are disabled. Contact-form contents and diagnostic answers are not intentionally sent as analytics events.",
      "Google Analytics uses the first-party cookies _ga and _ga_NL0WL6TWL0 to distinguish browsers and maintain session information. Our configuration requests a maximum lifetime of 180 days, without renewal on each visit, with path / on the website domain. User and event retention is set to two months, with reset on new activity disabled. This setting does not delete most aggregated reports. Aggregated statistics are retained only while needed to assess website and campaign performance.",
      "Vercel Web Analytics provides aggregate traffic statistics from page addresses, referrals, visit times, approximate location and device/browser information. Vercel describes a request-derived visitor hash with a session lifetime of 24 hours; that is not a 24-hour deletion period for all reports. Our integration removes query strings and fragments from the page address it sends. Both services are optional and are distinct from necessary hosting/security operations."
    ] },
    { title: "8. Recipients and international transfers", paragraphs: [
      "The website uses Vercel for hosting and optional web analytics, Resend for sending form enquiries by email, OVHcloud for the business mailbox infrastructure, and Google for Google Analytics 4 when activated. Access is limited to what is necessary for the relevant service. Professional advisers and competent authorities may receive information where necessary for a lawful purpose. We do not sell your personal data.",
      "Some providers or their subprocessors may process data outside the European Economic Area, including in the United States. Such transfers require an applicable adequacy decision or appropriate safeguards, such as the European Commission's standard contractual clauses and any necessary supplementary measures. An adequacy decision applies only within its scope, including certification requirements where relevant. Google describes its transfer arrangements at policies.google.com/privacy/frameworks. You may request information about relevant safeguards at our privacy contact."
    ] },
    { title: "9. Retention and security", paragraphs: [
      "Enquiries that do not lead to a collaboration are retained for up to 12 months after the last substantive contact. Ordinary client correspondence and operational records are retained during the collaboration and for up to two years after it ends. Records needed for statutory accounting or tax duties, or an existing dispute or legal claim, may be retained longer for that specific purpose.",
      "Technical and security records are retained only as long as necessary for fault diagnosis, abuse prevention and investigation, taking account of applicable provider retention settings. Data no longer required is deleted or anonymised. Backup copies follow their applicable backup lifecycle and are not a blanket exception to your rights. Access controls, encrypted transmission and proportionate organisational measures are used to protect data; no system can guarantee absolute security."
    ] },
    { title: "10. Your rights and complaints", paragraphs: [
      "Subject to the GDPR's conditions, you may request access, rectification, erasure, restriction and data portability, object to processing based on legitimate interests, and withdraw consent. Direct-marketing objections are not subject to a balancing of interests. We may request proportionate information to verify identity where necessary.",
      "Send requests to contact@brandlabelagency.com. We respond without undue delay and in principle within one month of receipt. Where permitted because of complexity or the number of requests, this may be extended by up to two further months; we will inform you of the extension and reasons within the initial month.",
      "You may lodge a complaint with the Belgian Data Protection Authority (Autorité de protection des données / Gegevensbeschermingsautoriteit), or another competent supervisory authority, without first obtaining our agreement. Information is available at www.autoriteprotectiondonnees.be. Statutory administrative and judicial remedies remain unaffected."
    ] },
    { title: "11. External services and changes", paragraphs: [
      "Independent third-party websites linked from this website have their own privacy notices. This website is directed at business users, not children. Please contact us if you believe a child has provided personal data that should not be held.",
      "This notice may be updated to reflect changes in services, processing or legal requirements. Material changes will be communicated as required. An update does not retrospectively create consent or authorise a new purpose requiring separate consent."
    ] }
  ],
  fr: [
    { title: "1. Champ d’application et cadre juridique", paragraphs: [
      "La présente notice explique comment BrandLabel Agency traite les données à caractère personnel dans le cadre de brandlabelagency.com, du diagnostic opérationnel, des demandes et des relations clients. Ces traitements sont régis par le règlement (UE) 2016/679 (RGPD) et le droit belge applicable à la protection des données. Cette notice a une finalité informative : la navigation sur le site ne constitue pas un consentement aux statistiques facultatives."
    ] },
    { title: "2. Identification de l’entreprise et responsable du traitement", paragraphs: [
      "BrandLabel Agency est le nom commercial de Kizidou Dimitra, exerçant en personne physique et agissant comme responsable des traitements décrits dans cette notice. Adresse professionnelle : Rue de la Marjolaine, 1120 Bruxelles, Belgique. Numéro d’entreprise : 1040.366.570. TVA : BE1040366570. Contact relatif à la vie privée : contact@brandlabelagency.com.",
      "Lorsque BrandLabel Agency traite des données exclusivement sur instruction d’un client dans un système de ce dernier, le client demeure responsable du traitement. Le contrat de service et les dispositions relatives à la sous-traitance encadrent cette activité."
    ] },
    { title: "3. Données collectées et finalités", paragraphs: [
      "Nous traitons le nom, le nom de l’entreprise, l’adresse e-mail, le type de demande, le message et les autres informations que vous fournissez afin de répondre aux demandes, préparer des rapports et devis et gérer nos services. Les champs obligatoires sont identifiés dans le formulaire ; sans les informations nécessaires, nous pourrions ne pas pouvoir répondre ou fournir le service demandé.",
      "L’hébergement et la sécurité peuvent impliquer des adresses IP, des informations sur les requêtes et le navigateur et des journaux techniques nécessaires au fonctionnement du site, au diagnostic des incidents et à la prévention des abus. Les statistiques facultatives sont décrites séparément ci-dessous. Veuillez éviter de communiquer des données sensibles ou des informations inutiles concernant d’autres personnes."
    ] },
    { title: "4. Diagnostic opérationnel", paragraphs: [
      "Le diagnostic calcule des estimations dans votre navigateur. Un résumé des problèmes sélectionnés, des effectifs, fréquences, durées, hypothèses de coûts et résultats peut être conservé dans le stockage de session du navigateur afin de permettre une demande de rapport ultérieure. Le simple calcul d’une estimation ne transmet pas automatiquement une demande.",
      "Si vous envoyez une demande de rapport ou d’audit contenant ce résumé, celui-ci est transmis avec vos coordonnées et intégré à votre demande. La copie du navigateur est supprimée lors de la réinitialisation du diagnostic ou de l’envoi réussi de la demande associée ; le stockage de session prend normalement fin à la fermeture de l’onglet, sous réserve des fonctions de restauration du navigateur. Les estimations sont indicatives et ne constituent pas une décision exclusivement automatisée produisant des effets juridiques ou similaires significatifs."
    ] },
    { title: "5. Bases juridiques et communications", paragraphs: [
      "Les mesures précontractuelles demandées et l’exécution d’un contrat avec vous reposent sur l’article 6, paragraphe 1, point b), du RGPD. Les échanges professionnels, la sécurité du site et la constatation ou la défense de droits en justice peuvent reposer sur l’article 6, paragraphe 1, point f), sous réserve de la mise en balance de nos intérêts légitimes et de vos droits. Les obligations comptables et autres obligations légales reposent sur le point c). Les statistiques facultatives reposent sur le consentement, conformément au point a).",
      "L’envoi d’une demande ne vous inscrit pas à une newsletter et n’autorise pas le profilage publicitaire. Nous ne proposons actuellement aucune newsletter. Toute prospection future devra disposer d’une base juridique applicable et respecter séparément les règles relatives au marketing électronique ; vous pouvez vous opposer à tout moment au marketing direct."
    ] },
    { title: "6. Cookies, stockage local et choix", paragraphs: [
      "Le stockage nécessaire permet les fonctions demandées et mémorise votre choix relatif aux statistiques. L’entrée de stockage local brandlabel_cookie_consent contient votre choix, sa date et la version de la notice. Sa validité est de 180 jours et est vérifiée au chargement du site. Vous pouvez également supprimer les données stockées via les paramètres du navigateur.",
      "Google Analytics 4, lorsqu’il est activé, et Vercel Web Analytics ne sont chargés qu’après acceptation des statistiques facultatives. Vous pouvez refuser et continuer à utiliser le site. Le bouton Paramètres des cookies du pied de page retire le choix enregistré, arrête les collectes statistiques futures sur la page rechargée, supprime les cookies Google Analytics accessibles et affiche à nouveau le choix. Le retrait n’affecte pas la licéité du traitement antérieur fondé sur le consentement."
    ] },
    { title: "7. Google Analytics 4 et Vercel Web Analytics", paragraphs: [
      "Avec votre consentement, Google Analytics 4 mesure les visites et les performances des campagnes. Il peut traiter des identifiants de navigateur, adresses et titres de pages, informations de provenance et de campagne, horaires de visite, localisation approximative et informations sur l’appareil et le navigateur. Notre configuration exclut la publicité personnalisée et Google signals ; les mesures automatiques des interactions avec les formulaires et des recherches sur le site sont désactivées. Le contenu des formulaires et les réponses au diagnostic ne sont pas intentionnellement transmis comme événements statistiques.",
      "Google Analytics utilise les cookies internes _ga et _ga_NL0WL6TWL0 pour distinguer les navigateurs et maintenir les informations de session. Notre configuration demande une durée maximale de 180 jours, sans renouvellement à chaque visite, avec le chemin / sur le domaine du site. La conservation des données utilisateur et d’événement est réglée sur deux mois, sans réinitialisation en cas de nouvelle activité. Ce réglage ne supprime pas la plupart des rapports agrégés. Les statistiques agrégées sont conservées uniquement tant qu’elles sont nécessaires pour évaluer le site et les campagnes.",
      "Vercel Web Analytics fournit des statistiques agrégées à partir des adresses de pages, provenances, horaires, localisation approximative et informations sur l’appareil et le navigateur. Vercel décrit un identifiant haché dérivé de la requête, dont la session dure 24 heures ; il ne s’agit pas d’une suppression de tous les rapports après 24 heures. Notre intégration retire les paramètres de requête et fragments de l’adresse de page transmise. Ces deux services sont facultatifs et distincts des opérations nécessaires d’hébergement et de sécurité."
    ] },
    { title: "8. Destinataires et transferts internationaux", paragraphs: [
      "Le site utilise Vercel pour l’hébergement et les statistiques facultatives, Resend pour l’envoi des demandes par e-mail, OVHcloud pour l’infrastructure de messagerie professionnelle et Google pour Google Analytics 4 lorsqu’il est activé. L’accès est limité aux besoins du service concerné. Des conseillers professionnels et autorités compétentes peuvent recevoir des informations lorsqu’une finalité licite le nécessite. Nous ne vendons pas vos données personnelles.",
      "Certains prestataires ou sous-traitants ultérieurs peuvent traiter des données hors de l’Espace économique européen, notamment aux États-Unis. Ces transferts nécessitent une décision d’adéquation applicable ou des garanties appropriées, telles que les clauses contractuelles types de la Commission européenne et les mesures complémentaires nécessaires. Une décision d’adéquation ne s’applique que dans son périmètre, y compris les conditions de certification pertinentes. Google décrit ses mécanismes sur policies.google.com/privacy/frameworks. Vous pouvez demander des informations sur les garanties pertinentes à notre contact relatif à la vie privée."
    ] },
    { title: "9. Conservation et sécurité", paragraphs: [
      "Les demandes ne donnant pas lieu à une collaboration sont conservées jusqu’à 12 mois après le dernier contact substantiel. Les échanges et documents opérationnels ordinaires des clients sont conservés pendant la collaboration et jusqu’à deux ans après sa fin. Les pièces nécessaires à une obligation comptable ou fiscale, à un litige existant ou à des droits en justice peuvent être conservées plus longtemps pour cette finalité précise.",
      "Les données techniques et de sécurité ne sont conservées que le temps nécessaire au diagnostic des incidents, à la prévention des abus et aux investigations, compte tenu des paramètres applicables des prestataires. Les données devenues inutiles sont supprimées ou anonymisées. Les sauvegardes suivent leur cycle applicable et ne constituent pas une exception générale à vos droits. Des contrôles d’accès, une transmission chiffrée et des mesures organisationnelles proportionnées protègent les données ; aucun système ne peut garantir une sécurité absolue."
    ] },
    { title: "10. Droits et réclamations", paragraphs: [
      "Sous les conditions prévues par le RGPD, vous pouvez demander l’accès, la rectification, l’effacement, la limitation et la portabilité de vos données, vous opposer aux traitements fondés sur l’intérêt légitime et retirer votre consentement. L’opposition au marketing direct n’est pas soumise à une mise en balance des intérêts. Nous pouvons demander des informations proportionnées pour vérifier votre identité lorsque cela est nécessaire.",
      "Adressez vos demandes à contact@brandlabelagency.com. Nous répondons sans retard injustifié et, en principe, dans le mois suivant la réception. Lorsque la complexité ou le nombre de demandes le justifie dans les conditions légales, ce délai peut être prolongé de deux mois supplémentaires ; nous vous informons de la prolongation et de ses motifs dans le mois initial.",
      "Vous pouvez introduire une réclamation auprès de l’Autorité de protection des données belge, ou d’une autre autorité de contrôle compétente, sans notre accord préalable. Des informations sont disponibles sur www.autoriteprotectiondonnees.be. Vos recours administratifs et judiciaires légaux demeurent réservés."
    ] },
    { title: "11. Services externes et modifications", paragraphs: [
      "Les sites tiers indépendants accessibles par un lien disposent de leurs propres notices. Ce site s’adresse aux utilisateurs professionnels, et non aux enfants. Contactez-nous si vous pensez qu’un enfant a communiqué des données qui ne devraient pas être conservées.",
      "Cette notice peut être modifiée pour refléter l’évolution des services, traitements ou obligations légales. Les modifications importantes sont communiquées lorsque cela est requis. Une mise à jour ne crée pas rétroactivement un consentement et n’autorise pas une nouvelle finalité nécessitant un consentement distinct."
    ] }
  ],
  nl: [
    { title: "1. Toepassingsgebied en rechtskader", paragraphs: [
      "Deze verklaring beschrijft hoe BrandLabel Agency persoonsgegevens verwerkt in verband met brandlabelagency.com, de operationele diagnose, aanvragen en klantrelaties. De verwerking valt onder Verordening (EU) 2016/679 (AVG/GDPR) en het toepasselijke Belgische gegevensbeschermingsrecht. Deze verklaring verstrekt informatie; verder surfen vormt geen toestemming voor optionele statistieken."
    ] },
    { title: "2. Ondernemingsgegevens en verwerkingsverantwoordelijke", paragraphs: [
      "BrandLabel Agency is de handelsnaam van Kizidou Dimitra, die als zelfstandige natuurlijke persoon handelt en verwerkingsverantwoordelijke is voor de hier beschreven verwerkingen. Bedrijfsadres: Rue de la Marjolaine, 1120 Bruxelles, België. Ondernemingsnummer: 1040.366.570. Btw: BE1040366570. Privacycontact: contact@brandlabelagency.com.",
      "Wanneer BrandLabel Agency uitsluitend in opdracht van een klant gegevens in diens systeem verwerkt, blijft die klant verwerkingsverantwoordelijke. De dienstverleningsovereenkomst en verwerkersafspraken regelen die activiteit."
    ] },
    { title: "3. Gegevens en doeleinden", paragraphs: [
      "Wij verwerken uw naam, bedrijfsnaam, e-mailadres, soort aanvraag, bericht en andere verstrekte informatie om vragen te beantwoorden, rapporten en offertes op te stellen en diensten te beheren. Verplichte velden worden in het formulier aangeduid; zonder noodzakelijke informatie kunnen wij mogelijk niet antwoorden of de gevraagde dienst leveren.",
      "Hosting en beveiliging kunnen IP-adressen, verzoekgegevens, browserinformatie en technische logbestanden omvatten om de website te leveren, fouten te onderzoeken en misbruik te voorkomen. Optionele statistieken worden hieronder afzonderlijk beschreven. Vermeld geen gevoelige persoonsgegevens of onnodige informatie over anderen in uw berichten."
    ] },
    { title: "4. Operationele diagnose", paragraphs: [
      "De diagnose berekent schattingen in uw browser. Een samenvatting van geselecteerde problemen, personeelsinzet, frequenties, tijd- en kostenaannames en resultaten kan in de sessieopslag van de browser worden bewaard voor een latere rapportaanvraag. Een berekening verstuurt op zichzelf niet automatisch een aanvraag.",
      "Als u een rapport- of auditaanvraag met die samenvatting verstuurt, wordt deze samen met uw contactgegevens verzonden en onderdeel van uw aanvraag. De browserkopie wordt verwijderd bij het opnieuw instellen van de diagnose of na succesvolle verzending van de bijbehorende aanvraag. Sessieopslag eindigt normaal bij het sluiten van het tabblad, onder voorbehoud van sessieherstel door de browser. Schattingen zijn indicatief en vormen geen uitsluitend geautomatiseerde beslissing met rechtsgevolgen of vergelijkbare aanzienlijke gevolgen."
    ] },
    { title: "5. Rechtsgronden en communicatie", paragraphs: [
      "Gevraagde precontractuele stappen en uitvoering van een overeenkomst met u steunen op artikel 6, lid 1, onder b), AVG. Zakelijke correspondentie, websitebeveiliging en het instellen of verdedigen van rechtsvorderingen kunnen steunen op artikel 6, lid 1, onder f), na afweging van onze gerechtvaardigde belangen tegenover uw rechten. Wettelijke boekhoudkundige en andere verplichtingen steunen op onderdeel c). Optionele statistieken steunen op toestemming overeenkomstig onderdeel a).",
      "Een aanvraag schrijft u niet in voor een nieuwsbrief en geeft geen toestemming voor advertentieprofilering. Wij bieden momenteel geen nieuwsbrief aan. Eventuele toekomstige prospectie moet een toepasselijke rechtsgrond hebben en afzonderlijk voldoen aan de regels voor elektronische marketing; u kunt altijd bezwaar maken tegen direct marketing."
    ] },
    { title: "6. Cookies, lokale opslag en uw keuze", paragraphs: [
      "Noodzakelijke browseropslag ondersteunt gevraagde functies en onthoudt uw statistiekenkeuze. De lokale opslag brandlabel_cookie_consent bevat uw keuze, datum en versie van de verklaring. De keuze is 180 dagen geldig; dit wordt gecontroleerd bij het laden van de website. U kunt browseropslag ook via uw browserinstellingen verwijderen.",
      "Google Analytics 4, indien geactiveerd, en Vercel Web Analytics laden pas na aanvaarding van optionele statistieken. U kunt weigeren en de website blijven gebruiken. Cookie-instellingen in de footer trekt de opgeslagen keuze in, stopt toekomstige statistiekverzameling op de herladen pagina, verwijdert toegankelijke Google Analytics-cookies en toont de keuze opnieuw. Intrekking doet geen afbreuk aan de rechtmatigheid van eerdere verwerking op basis van toestemming."
    ] },
    { title: "7. Google Analytics 4 en Vercel Web Analytics", paragraphs: [
      "Met uw toestemming meet Google Analytics 4 paginabezoeken en campagneprestaties. Dit kan browseridentificatoren, pagina-adressen en titels, verwijzings- en campagnegegevens, bezoektijden, geschatte locatie en apparaat- en browserinformatie omvatten. Onze configuratie sluit gepersonaliseerde advertenties en Google signals uit; automatische meting van formulierinteracties en zoekopdrachten op de site is uitgeschakeld. Formulierinhoud en diagnoseantwoorden worden niet bewust als statistiekgebeurtenissen verzonden.",
      "Google Analytics gebruikt de first-partycookies _ga en _ga_NL0WL6TWL0 om browsers te onderscheiden en sessiegegevens bij te houden. Onze configuratie vraagt een maximale levensduur van 180 dagen, zonder verlenging bij elk bezoek, met pad / op het websitedomein. Gebruikers- en gebeurtenisgegevens worden twee maanden bewaard, zonder reset bij nieuwe activiteit. Deze instelling verwijdert de meeste geaggregeerde rapporten niet. Geaggregeerde statistieken worden alleen bewaard zolang ze nodig zijn om website- en campagneprestaties te beoordelen.",
      "Vercel Web Analytics levert geaggregeerde verkeersstatistieken op basis van pagina-adressen, verwijzingen, bezoektijden, geschatte locatie en apparaat- en browserinformatie. Vercel beschrijft een hash op basis van het verzoek met een sessieduur van 24 uur; dit betekent niet dat alle rapporten na 24 uur worden verwijderd. Onze integratie verwijdert queryparameters en fragmenten uit het verzonden pagina-adres. Beide diensten zijn optioneel en staan los van noodzakelijke hosting en beveiliging."
    ] },
    { title: "8. Ontvangers en internationale doorgiften", paragraphs: [
      "De website gebruikt Vercel voor hosting en optionele statistieken, Resend voor verzending van formulieraanvragen per e-mail, OVHcloud voor de zakelijke mailboxinfrastructuur en Google voor Google Analytics 4 wanneer geactiveerd. Toegang is beperkt tot wat de betreffende dienst nodig heeft. Professionele adviseurs en bevoegde autoriteiten kunnen informatie ontvangen wanneer een rechtmatig doel dit vereist. Wij verkopen uw persoonsgegevens niet.",
      "Sommige leveranciers of subverwerkers kunnen gegevens buiten de Europese Economische Ruimte verwerken, onder meer in de Verenigde Staten. Dergelijke doorgiften vereisen een toepasselijk adequaatheidsbesluit of passende waarborgen, zoals de standaardcontractbepalingen van de Europese Commissie en noodzakelijke aanvullende maatregelen. Een adequaatheidsbesluit geldt alleen binnen zijn toepassingsgebied, inclusief relevante certificeringsvereisten. Google beschrijft zijn regelingen op policies.google.com/privacy/frameworks. Informatie over relevante waarborgen kan bij ons privacycontact worden opgevraagd."
    ] },
    { title: "9. Bewaring en beveiliging", paragraphs: [
      "Aanvragen die niet tot samenwerking leiden worden tot 12 maanden na het laatste inhoudelijke contact bewaard. Gewone klantcorrespondentie en operationele documenten worden tijdens de samenwerking en tot twee jaar na afloop bewaard. Documenten die nodig zijn voor wettelijke boekhoudkundige of fiscale verplichtingen, een bestaand geschil of rechtsvorderingen kunnen langer voor dat specifieke doel worden bewaard.",
      "Technische en beveiligingsgegevens worden alleen bewaard zolang nodig voor foutdiagnose, misbruikpreventie en onderzoek, rekening houdend met toepasselijke bewaartermijnen van leveranciers. Niet langer noodzakelijke gegevens worden verwijderd of geanonimiseerd. Back-ups volgen hun toepasselijke levenscyclus en vormen geen algemene uitzondering op uw rechten. Toegangscontroles, versleutelde overdracht en evenredige organisatorische maatregelen beschermen gegevens; geen systeem garandeert absolute veiligheid."
    ] },
    { title: "10. Uw rechten en klachten", paragraphs: [
      "Onder de voorwaarden van de AVG kunt u inzage, rectificatie, verwijdering, beperking en overdraagbaarheid vragen, bezwaar maken tegen verwerking op basis van gerechtvaardigde belangen en toestemming intrekken. Bezwaar tegen direct marketing is niet onderworpen aan een belangenafweging. Waar nodig kunnen wij evenredige informatie vragen om uw identiteit te controleren.",
      "Stuur verzoeken naar contact@brandlabelagency.com. Wij antwoorden zonder onredelijke vertraging en in beginsel binnen één maand na ontvangst. Indien de complexiteit of het aantal verzoeken dit wettelijk rechtvaardigt, kan deze termijn met maximaal twee maanden worden verlengd; wij informeren u binnen de eerste maand over de verlenging en de redenen.",
      "U kunt zonder onze voorafgaande toestemming een klacht indienen bij de Belgische Gegevensbeschermingsautoriteit of een andere bevoegde toezichthouder. Informatie staat op www.gegevensbeschermingsautoriteit.be. Wettelijke administratieve en gerechtelijke rechtsmiddelen blijven onverkort gelden."
    ] },
    { title: "11. Externe diensten en wijzigingen", paragraphs: [
      "Onafhankelijke websites van derden waarnaar wordt gelinkt hebben eigen privacyverklaringen. Deze website richt zich op zakelijke gebruikers, niet op kinderen. Neem contact op als u denkt dat een kind gegevens heeft verstrekt die niet bewaard mogen worden.",
      "Deze verklaring kan worden bijgewerkt bij wijzigingen in diensten, verwerking of wettelijke eisen. Belangrijke wijzigingen worden waar vereist meegedeeld. Een wijziging creëert niet met terugwerkende kracht toestemming en staat geen nieuw doel toe waarvoor afzonderlijke toestemming nodig is."
    ] }
  ]
};

const authority = {
  en: { label: "Belgian Data Protection Authority", url: "https://www.autoriteprotectiondonnees.be" },
  fr: { label: "Autorité de protection des données", url: "https://www.autoriteprotectiondonnees.be" },
  nl: { label: "Gegevensbeschermingsautoriteit", url: "https://www.gegevensbeschermingsautoriteit.be" },
};

export function PrivacyContent() {
  const { language } = useLanguage();
  return (
    <section className="bg-[#fbfaf7] py-16 sm:py-24">
      <Container>
        <article className="premium-card rounded-md p-6 sm:p-8 lg:p-10">
          <div className="space-y-8 text-base leading-7 text-slate-700 lg:text-lg lg:leading-8">
            {policyText[language].map((section, index) => (
              <section key={section.title} aria-labelledby={`privacy-section-${index + 1}`}>
                <h2 id={`privacy-section-${index + 1}`} className="mb-3 text-xl font-semibold text-[#0B1F3A] lg:text-2xl">{section.title}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
              <a href="mailto:contact@brandlabelagency.com" className="underline underline-offset-4">contact@brandlabelagency.com</a>
              <a href={authority[language].url} className="underline underline-offset-4">{authority[language].label}</a>
              <a href="https://policies.google.com/privacy/frameworks" className="underline underline-offset-4">Google</a>
              <a href="https://vercel.com/docs/analytics/privacy-policy" className="underline underline-offset-4">Vercel Web Analytics</a>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
