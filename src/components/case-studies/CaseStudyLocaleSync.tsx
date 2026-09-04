"use client";

import { useEffect } from "react";
import { useLanguage, type Language } from "@/lib/i18n";

export function CaseStudyLocaleSync({ language }: { language: Language }) {
  const { language: activeLanguage, setLanguage } = useLanguage();

  useEffect(() => {
    if (activeLanguage !== language) setLanguage(language);
  }, [activeLanguage, language, setLanguage]);

  return null;
}
