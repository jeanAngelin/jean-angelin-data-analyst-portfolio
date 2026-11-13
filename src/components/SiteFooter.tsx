import { ArrowUpRight, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { translations } from '../i18n/translations';

export function SiteFooter() {
  const { content, language } = useSite();
  const t = translations[language];
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div><Link to="/" className="brand footer-brand"><span className="brand-mark">JA</span><span className="brand-name">Jean Angelin<span>{t.footer.specialty}</span></span></Link><p>{content.identity.location[language]}</p></div>
        <div className="footer-links"><a href={`mailto:${content.identity.email}`}><Mail size={16} />{content.identity.email}</a><a href={content.identity.github} target="_blank" rel="noreferrer"><Github size={16} />GitHub<ArrowUpRight size={14} /></a><Link to="/admin">{t.footer.admin}</Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {content.identity.name}. {t.footer.rights}</span><span>Fait avec soin à Fianarantsoa.</span></div>
    </footer>
  );
}
