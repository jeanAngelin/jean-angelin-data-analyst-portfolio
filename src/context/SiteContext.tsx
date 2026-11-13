import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import initialContent from '../data/content.json';
import type { Language } from '../i18n/translations';

export type SiteContent = typeof initialContent;
type SiteContextValue = {
  content: SiteContent;
  updateContent: (next: SiteContent) => void;
  resetContent: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const STORAGE_KEY = 'ja-portfolio-content-v1';
const SiteContext = createContext<SiteContextValue | null>(null);

function readStoredContent(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) as SiteContent : initialContent;
  } catch {
    return initialContent;
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(readStoredContent);
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
    updateContent: (next) => { setContent(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); },
    resetContent: () => { setContent(initialContent); localStorage.removeItem(STORAGE_KEY); },
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
