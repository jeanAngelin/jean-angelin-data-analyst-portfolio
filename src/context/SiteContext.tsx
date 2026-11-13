import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import initialContent from '../data/content.json';
import type { Language } from '../i18n/translations';

type SiteContextValue = {
  content: typeof initialContent;
  language: Language;
  setLanguage: (language: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const content = initialContent;
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('ja-portfolio-language') === 'en' ? 'en' : 'fr');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('ja-portfolio-theme') === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language;
    localStorage.setItem('ja-portfolio-language', language);
    localStorage.setItem('ja-portfolio-theme', theme);
  }, [language, theme]);

  const value = useMemo<SiteContextValue>(() => ({
    content,
    language,
    setLanguage,
    theme,
    toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light')
  }), [content, language, theme]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used inside SiteProvider');
  return context;
}
