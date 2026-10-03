"use client";

import { CONSENT_KEY, stopAnalytics } from "@/lib/analyticsConsent";
import { useLanguage } from "@/lib/i18n";

export function CookieSettingsButton() {
  const { translate } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => {
        stopAnalytics();
        try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Storage may be blocked. */ }
        window.location.reload();
      }}
      className="touch-manipulation text-left text-sm leading-6 text-neutral-400 transition hover:text-white active:opacity-70"
    >
      {translate("Cookie settings")}
    </button>
  );
}
