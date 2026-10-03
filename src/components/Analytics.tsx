"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getLanguageFromPathname, localizedPathname } from "@/lib/i18n";
import { defaultLocale } from "@/lib/seo";
import { CONSENT_KEY, analyticsStopped, readAnalyticsConsent, resumeAnalytics, saveAnalyticsConsent, stopAnalytics } from "@/lib/analyticsConsent";

const messages = {
  en: {
    title: "Optional analytics",
    body: "We use optional analytics to understand how the website is used and improve its performance. You can accept them or continue without them, and change your choice at any time in Cookie settings in the footer.",
    policy: "Privacy Policy",
    accept: "Accept analytics",
    decline: "Decline analytics",
  },
  fr: {
    title: "Statistiques facultatives",
    body: "Nous utilisons des statistiques facultatives pour comprendre comment le site est utilisé et améliorer ses performances. Vous pouvez les accepter ou continuer sans elles, puis modifier votre choix à tout moment dans les Paramètres des cookies en bas de page.",
    policy: "Politique de confidentialité",
    accept: "Accepter les statistiques",
    decline: "Refuser les statistiques",
  },
  nl: {
    title: "Optionele statistieken",
    body: "We gebruiken optionele statistieken om te begrijpen hoe de website wordt gebruikt en de prestaties ervan te verbeteren. U kunt ze accepteren of zonder statistieken doorgaan en uw keuze op elk moment wijzigen via Cookie-instellingen onderaan de pagina.",
    policy: "Privacybeleid",
    accept: "Statistieken accepteren",
    decline: "Statistieken weigeren",
  },
};

export function Analytics() {
  const configuredId = process.env.NEXT_PUBLIC_GA_ID ?? "";
  const gaId = /^G-[A-Z0-9]+$/.test(configuredId) && configuredId !== "G-XXXXXXXXXX" ? configuredId : "";
  const pathname = usePathname();
  const language = getLanguageFromPathname(pathname) ?? defaultLocale;
  const copy = messages[language];
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedConsent = readAnalyticsConsent();
      if (savedConsent !== "accepted") stopAnalytics();
      else resumeAnalytics();
      setConsent(savedConsent);
    });
    const syncConsent = () => {
      const saved = readAnalyticsConsent();
      if (saved !== "accepted") {
        stopAnalytics();
        // A loaded third-party script cannot be unloaded by unmounting React.
        window.location.reload();
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) syncConsent();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const saveConsent = (value: "accepted" | "declined") => {
    saveAnalyticsConsent(value);
    if (value === "declined") stopAnalytics();
    else resumeAnalytics();
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" ? <VercelAnalytics beforeSend={(event) => {
        if (analyticsStopped()) return null;
        const url = new URL(event.url);
        url.search = "";
        url.hash = "";
        return { ...event, url: url.toString() };
      }} /> : null}

      {gaId && consent === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window['ga-disable-${gaId}'] = false;
              gtag('consent', 'default', {
                analytics_storage: 'denied', ad_storage: 'denied',
                ad_user_data: 'denied', ad_personalization: 'denied'
              });
              gtag('consent', 'update', {analytics_storage: 'granted'});
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                cookie_expires: 15552000,
                cookie_update: false
              });
            `}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-4xl rounded-xl border border-[#0B1F3A]/12 bg-[#fffdf8]/95 p-4 text-[#0B1F3A] shadow-[0_24px_70px_rgba(11,31,58,0.22)] backdrop-blur md:bottom-6 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6 md:p-5">
          <div>
            <p className="text-lg font-semibold leading-tight md:text-xl">
              {copy.title}
            </p>
            <p className="mt-2 text-base leading-6 text-slate-700 md:text-lg md:leading-7">
              {copy.body}{" "}
              <Link href={localizedPathname("/privacy", language)} className="font-semibold text-[#0B1F3A] underline decoration-[#C8A96A]/60 underline-offset-4">
                {copy.policy}
              </Link>
              .
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 md:mt-0 md:flex md:items-center">
            <button
              type="button"
              onClick={() => saveConsent("declined")}
              className="min-h-12 rounded-sm border border-[#0B1F3A]/15 bg-white px-5 text-base font-semibold text-[#0B1F3A] transition hover:border-[#C8A96A]/60 hover:bg-[#f7f3ea] md:text-lg"
            >
              {copy.decline}
            </button>
            <button
              type="button"
              onClick={() => saveConsent("accepted")}
              className="min-h-12 rounded-sm border border-[#0B1F3A]/15 bg-white px-5 text-base font-semibold text-[#0B1F3A] transition hover:border-[#C8A96A]/60 hover:bg-[#f7f3ea] md:text-lg"
            >
              {copy.accept}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
