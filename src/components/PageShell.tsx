import { Footer } from "./Footer";
import { Header } from "./Header";
import { LanguageProvider, LocalizedContent, type Language } from "@/lib/i18n";
import { defaultLocale } from "@/lib/seo";

export function PageShell({
  children,
  language = defaultLocale,
}: {
  children: React.ReactNode;
  language?: Language;
}) {
  return (
    <LanguageProvider language={language}>
      <Header />
      <LocalizedContent><main>{children}</main></LocalizedContent>
      <Footer />
    </LanguageProvider>
  );
}
