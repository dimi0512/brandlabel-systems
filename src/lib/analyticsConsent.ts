export const CONSENT_KEY = "brandlabel_cookie_consent";
export const CONSENT_VERSION = "2026-09-30";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsConsent = "accepted" | "declined";

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const record = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    if (
      record?.version === CONSENT_VERSION &&
      (record.choice === "accepted" || record.choice === "declined") &&
      Number.isFinite(record.savedAt) &&
      record.savedAt <= Date.now() &&
      Date.now() - record.savedAt < CONSENT_MAX_AGE
    ) return record.choice;
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Missing, legacy or unavailable storage never grants consent.
  }
  return null;
}

export function saveAnalyticsConsent(choice: AnalyticsConsent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      version: CONSENT_VERSION, choice, savedAt: Date.now(),
    }));
  } catch {
    // The current tab may still honour an explicit choice without persistence.
  }
}

export function stopAnalytics() {
  (window as unknown as Record<string, unknown>).__brandlabelAnalyticsStopped = true;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId) {
    (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
  }
  // Remove GA cookies on the current host and parent domains (including www).
  const domains = window.location.hostname.split(".");
  for (const item of document.cookie.split(";")) {
    const name = item.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    document.cookie = `${name}=; Max-Age=0; Path=/`;
    for (let i = 0; i < domains.length - 1; i++) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domains.slice(i).join(".")}`;
    }
  }
}

export function resumeAnalytics() {
  (window as unknown as Record<string, unknown>).__brandlabelAnalyticsStopped = false;
}

export function analyticsStopped() {
  return (window as unknown as Record<string, unknown>).__brandlabelAnalyticsStopped === true;
}
