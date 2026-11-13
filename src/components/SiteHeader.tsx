import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { translations } from '../i18n/translations';
import { CvButton } from './CvButton';

export function SiteHeader() {
  const { language, setLanguage, theme, toggleTheme } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const t = translations[language];
  const nav = [
    ['home', 'home'], ['about', 'about'], ['skills', 'skills'], ['projects', 'projects'], ['education', 'education'], ['contact', 'contact']
  ] as const;
  const navHref = (id: string) => pathname === '/' ? `#${id}` : `/#${id}`;

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="brand" aria-label="Jean Angelin — accueil"><span className="brand-mark">JA</span><span className="brand-name">Jean Angelin<span>Data Analyst Junior</span></span></Link>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label={language === 'fr' ? 'Navigation principale' : 'Main navigation'}>
          {nav.map(([key, id]) => <a key={id} href={navHref(id)} onClick={() => setMenuOpen(false)}>{t.nav[key]}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button language-button" onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'} title={language === 'fr' ? 'English' : 'Français'}><Languages size={17} /><span>{language.toUpperCase()}</span></button>
          <button className="icon-button" onClick={toggleTheme} aria-label={language === 'fr' ? 'Changer le thème' : 'Toggle theme'} title={language === 'fr' ? 'Thème clair/sombre' : 'Light/dark theme'}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
          <CvButton compact />
          <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
    </header>
  );
}
