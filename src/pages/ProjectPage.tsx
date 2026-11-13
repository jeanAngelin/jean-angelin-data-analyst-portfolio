import { useState } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { useSite } from '../context/SiteContext';
import { translations } from '../i18n/translations';

const gallery = [
  ['madastore-dashboard-overview.png', 'Executive overview'],
  ['madastore-product-analysis.png', 'Product analysis'],
  ['madastore-regional-analysis.png', 'Regional analysis'],
  ['madastore-time-analysis.png', 'Time analysis'],
  ['madastore-profit-analysis.png', 'Profitability analysis'],
  ['madastore-data-quality.png', 'Data quality'],
  ['madastore-recommendations.png', 'Recommendations']
];

export function ProjectPage() {
  const { content, language } = useSite();
  const t = translations[language];
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const p = content.project;
  const money = (amount: number) => new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'MGA', maximumFractionDigits: 0 }).format(amount);

  return (
    <main className="case-page">
      <section className="case-hero"><div className="container"><Link to="/#projects" className="back-link"><ArrowLeft size={16} />{t.case.back}</Link><p className="eyebrow">{t.case.eyebrow} · DATA ANALYTICS</p><h1>{p.title}</h1><p className="case-hero-summary">{p.summary[language]}</p><div className="case-tags">{p.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="synthetic-banner">{t.case.syntheticNotice}</div></div></section>

      <section className="container case-body">
        <div className="case-status"><span className="status-dot" /><strong>{p.status[language]}</strong><span>{p.period}</span></div>
        <Reveal className="case-overview"><div><p className="eyebrow">01 / {t.case.context}</p><h2>{language === 'fr' ? 'Une vue claire des performances commerciales' : 'A clearer view of sales performance'}</h2></div><p>{language === 'fr' ? 'MadaStore est une entreprise fictive malgache de vente de produits électroniques et informatiques. L’objectif de la démonstration est de transformer des lignes de commandes en indicateurs que la direction peut explorer.' : 'MadaStore is a fictional Malagasy electronics retailer. This demonstration turns order records into indicators that management can explore.'}</p></Reveal>

        <div className="case-two-col">
          <Reveal className="case-info-card"><p className="eyebrow">02 / {t.case.problem}</p><h3>{language === 'fr' ? 'Quelles ventes créent réellement de la valeur ?' : 'Which sales are actually creating value?'}</h3><p>{language === 'fr' ? 'Comparer le chiffre d’affaires, les bénéfices, les produits, les régions, les périodes, les modes de paiement et les canaux.' : 'Compare revenue, profit, products, regions, time periods, payment methods, and channels.'}</p></Reveal>
          <Reveal className="case-info-card"><p className="eyebrow">03 / {t.case.objectives}</p><ul className="check-list"><li>{language === 'fr' ? 'Calculer ventes nettes, coûts, bénéfices et marges.' : 'Calculate net sales, costs, profit, and margins.'}</li><li>{language === 'fr' ? 'Nettoyer les anomalies sans modifier les fichiers sources.' : 'Clean anomalies without changing source files.'}</li><li>{language === 'fr' ? 'Rendre les résultats explorables avec plusieurs outils.' : 'Make findings explorable across several tools.'}</li></ul></Reveal>
        </div>

        <Reveal className="case-data-panel"><div><p className="eyebrow">04 / {t.case.data}</p><h2>{language === 'fr' ? 'Un jeu synthétique, reproductible et documenté' : 'A reproducible, documented synthetic dataset'}</h2><p>{language === 'fr' ? '6 002 lignes sources issues de 6 000 commandes générées, avec des anomalies de test intentionnelles. La période va de janvier 2024 à décembre 2025. Les données ne proviennent pas d’une vraie entreprise.' : '6,002 raw rows from 6,000 generated orders, including intentional test anomalies. The study covers January 2024 to December 2025. The data do not come from a real company.'}</p></div><div className="data-facts"><div><strong>6 002</strong><span>{language === 'fr' ? 'lignes brutes' : 'raw rows'}</span></div><div><strong>5 993</strong><span>{language === 'fr' ? 'commandes propres' : 'clean orders'}</span></div><div><strong>14</strong><span>{language === 'fr' ? 'produits' : 'products'}</span></div><div><strong>8</strong><span>{language === 'fr' ? 'régions' : 'regions'}</span></div></div></Reveal>

        <Reveal className="case-cleaning"><p className="eyebrow">05 / {t.case.cleaning}</p><h2>{language === 'fr' ? 'Nettoyer en gardant une trace' : 'Clean while keeping an audit trail'}</h2><div className="cleaning-grid"><div><strong>−2</strong><span>{language === 'fr' ? 'doublons de commandes' : 'duplicate orders'}</span></div><div><strong>−5</strong><span>{language === 'fr' ? 'quantités manquantes' : 'missing quantities'}</span></div><div><strong>−1</strong><span>{language === 'fr' ? 'date invalide' : 'invalid date'}</span></div><div><strong>−1</strong><span>{language === 'fr' ? 'remise hors plage' : 'out-of-range discount'}</span></div></div><p>{language === 'fr' ? 'Les règles sont consignées dans le document de qualité des données. Les fichiers sources bruts restent préservés ; les données nettoyées sont écrites séparément.' : 'The rules are recorded in the data quality note. Raw source files remain preserved; cleaned data are written separately.'} <a className="text-link" href="/documents/MadaStore_Anomalies.md" download>{language === 'fr' ? 'Lire les règles de nettoyage' : 'Read the cleaning rules'}<ArrowUpRight size={14} /></a></p></Reveal>

        <Reveal className="case-method"><p className="eyebrow">06 / {t.case.methodology}</p><h2>{language === 'fr' ? 'Du nettoyage aux décisions' : 'From cleaning to decisions'}</h2><div className="method-steps">{content.project.methodology[language].map((step, i) => <div key={step}><span>0{i + 1}</span><p>{step}</p></div>)}</div></Reveal>

        <Reveal className="results-section"><p className="eyebrow">07 / {t.case.results}</p><h2>{language === 'fr' ? 'Indicateurs issus des données traitées' : 'Metrics from the cleaned data'}</h2><div className="results-grid"><article><span>{t.case.revenue}</span><strong>{money(p.metrics.revenueMGA)}</strong><small>MGA</small></article><article><span>{t.case.profit}</span><strong>{money(p.metrics.profitMGA)}</strong><small>MGA</small></article><article><span>{t.case.margin}</span><strong>{p.metrics.marginPercent.toFixed(2)}%</strong><small>{language === 'fr' ? 'marge globale' : 'overall margin'}</small></article><article><span>{t.case.orders}</span><strong>{p.metrics.orders.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}</strong><small>{language === 'fr' ? 'sur 2024–2025' : 'across 2024–2025'}</small></article></div><div className="annual-results"><span>{language === 'fr' ? 'Ventes nettes 2024' : '2024 net revenue'} <strong>{money(p.metrics.annualRevenue['2024'])}</strong></span><span>{language === 'fr' ? 'Ventes nettes 2025' : '2025 net revenue'} <strong>{money(p.metrics.annualRevenue['2025'])}</strong></span></div><p className="result-caveat">{t.case.syntheticNotice}</p></Reveal>

        <div className="case-two-col tools-panels">
          <Reveal className="case-tool-card"><p className="eyebrow">08 / {t.case.python}</p><h3>Python · Pandas · Plotly</h3><p>{language === 'fr' ? 'Génération reproductible, nettoyage, validation des clés, mesures financières et analyses par produit, région et période.' : 'Reproducible generation, cleaning, key validation, financial metrics, and product, region, and time analyses.'}</p></Reveal>
          <Reveal className="case-tool-card"><p className="eyebrow">09 / {t.case.sql}</p><h3>SQLite · 15 requêtes</h3><p>{language === 'fr' ? 'Jointures, GROUP BY, HAVING, CASE, CTE et fonctions fenêtre ; totaux SQL vérifiés contre Python.' : 'Joins, GROUP BY, HAVING, CASE, CTEs, and window functions; SQL totals checked against Python.'}</p></Reveal>
          <Reveal className="case-tool-card"><p className="eyebrow">10 / {t.case.excel}</p><h3>Excel · OpenPyXL</h3><p>{language === 'fr' ? 'Classeur de huit feuilles avec données brutes et propres, synthèse, produits, régions, mois et bénéfices.' : 'An eight-sheet workbook with raw and clean data, overview, products, regions, monthly trends, and profit.'}</p><a className="text-link" href={p.reportFile} download>{t.projects.excel}<ArrowDownToLine size={16} /></a></Reveal>
          <Reveal className="case-tool-card"><p className="eyebrow">11 / {t.case.powerbi}</p><h3>Power BI · rapport en construction</h3><p>{language === 'fr' ? 'Power BI Desktop est installé et les données nettoyées sont chargées. La mise en page et le fichier PBIX restent à finaliser.' : 'Power BI Desktop is installed and the cleaned data are loaded. The report layout and PBIX file still need to be completed.'}</p></Reveal>
          <Reveal className="case-tool-card"><p className="eyebrow">12 / {t.case.streamlit}</p><h3>Streamlit · Plotly</h3><p>{language === 'fr' ? 'Dashboard interactif avec filtres, KPI, analyses, recommandations et export CSV. Les captures locales ci-dessous sont authentiques.' : 'Interactive dashboard with filters, KPIs, analyses, recommendations, and CSV export. Local screenshots below are authentic.'}</p></Reveal>
        </div>

        <Reveal className="case-facts"><p className="eyebrow">13 / {t.case.results}</p><h2>{language === 'fr' ? 'Quelques résultats et recommandations' : 'Selected findings and recommendations'}</h2><ul className="fact-list">{p.facts[language].map((fact) => <li key={fact}>{fact}</li>)}</ul><p>{language === 'fr' ? 'Les recommandations consistent à vérifier les stocks des ordinateurs à forte contribution, étudier les marges, comparer les canaux et valider les écarts régionaux avec les coûts logistiques réels.' : 'Recommendations include checking stock for high-contribution computers, reviewing margins, comparing channels, and validating regional differences with real logistics costs.'}</p></Reveal>

        <Reveal className="gallery-section"><p className="eyebrow">14 / {t.case.gallery}</p><h2>{language === 'fr' ? 'Le dashboard en images' : 'Dashboard screenshots'}</h2><div className="gallery-grid">{gallery.map(([src, label]) => <button className="gallery-item" key={src} onClick={() => setActiveImage(src)} aria-label={`${language === 'fr' ? 'Agrandir' : 'Enlarge'} ${label}`}><img src={`/images/${src}`} alt={`${label} — ${t.case.syntheticNotice}`} /><span>{label}<ExternalLink size={14} /></span></button>)}</div></Reveal>

        <Reveal className="limitations-panel"><p className="eyebrow">15 / {t.case.limits}</p><h2>{language === 'fr' ? 'Ce que les données ne permettent pas d’affirmer' : 'What these data cannot establish'}</h2><p>{p.limitations[language]}</p></Reveal>

        <div className="case-bottom-actions"><a className="button button-primary" href={p.reportFile} download>{t.projects.excel}<ArrowDownToLine size={17} /></a><a className="button button-secondary" href={content.identity.github} target="_blank" rel="noreferrer">{t.projects.github}<ArrowUpRight size={16} /></a><Link className="button button-quiet" to="/#contact">{t.hero.contact}<ArrowUpRight size={16} /></Link></div>
      </section>

      {activeImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Dashboard screenshot" onClick={() => setActiveImage(null)}><button aria-label="Close image" onClick={() => setActiveImage(null)}><X size={24} /></button><img src={`/images/${activeImage}`} alt={activeImage} onClick={(event) => event.stopPropagation()} /></div>}
    </main>
  );
}
