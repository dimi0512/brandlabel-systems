"use client";

const CONSENT_KEY = "brandlabel_cookie_consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem(CONSENT_KEY);
        window.location.reload();
      }}
      className="touch-manipulation text-left text-sm leading-6 text-neutral-400 transition hover:text-white active:opacity-70"
    >
      Cookie settings
    </button>
  );
}
