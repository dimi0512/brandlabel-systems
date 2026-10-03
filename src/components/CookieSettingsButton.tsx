"use client";

import { CONSENT_KEY, stopAnalytics } from "@/lib/analyticsConsent";

export function CookieSettingsButton() {
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
      Cookie settings
    </button>
  );
}
