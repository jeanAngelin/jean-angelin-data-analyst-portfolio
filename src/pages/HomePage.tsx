import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, BarChart3, Database, Github, GraduationCap, Mail, MapPin, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { useSite } from '../context/SiteContext';
import { translations } from '../i18n/translations';
import { CvButton } from '../components/CvButton';

export function HomePage() {
  const { content, language } = useSite();
  const t = translations[language];
  const [mailPrepared, setMailPrepared] = useState(false);
  const p = content.project;

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = String(form.get('subject') || 'Portfolio contact');
    const body = `${language === 'fr' ? 'Nom' : 'Name'}: ${form.get('name')}\n${language === 'fr' ? 'Email' : 'Email'}: ${form.get('email')}\n\n${form.get('message')}`;
    window.location.href = `mailto:${content.identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailPrepared(true);
  }

  return (
    <main>
      <section className="hero-section" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="status-dot" />{t.hero.hello}</p>
            <h1>{content.identity.name}</h1>
            <p className="hero-role">{content.identity.role[language]} <span>·</span> Python <span>·</span> SQL <span>·</span> Power BI</p>
            <p className="hero-title">{t.hero.title}</p>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{t.hero.projects}<ArrowRight size={17} /></a>
              <a className="button button-secondary" href="#contact">{t.hero.contact}<ArrowUpRight size={16} /></a>
              <CvButton />
            </div>
            <div className="hero-socials">
              <a href={content.identity.github} target="_blank" rel="noreferrer"><Github size={17} />GitHub <ArrowUpRight size={13} /></a>
              <a href={`mailto:${content.identity.email}`}><Mail size={17} />Email</a>
              <span><MapPin size={16} />{content.identity.location[language]}</span>
            </div>
          </div>
          <div className="hero-visual" aria-label={language === 'fr' ? 'Capture du dashboard MadaStore' : 'MadaStore dashboard screenshot'}>
            <div className="visual-topline"><span /><span /><span /><small>MadaStore · Sales Analytics</small></div>
            <img src="/images/madastore-dashboard-overview.png" alt={language === 'fr' ? 'Capture réelle de la vue exécutive du dashboard MadaStore ; données synthétiques.' : 'Real screenshot of the MadaStore executive dashboard; synthetic data.'} />
            <div className="visual-caption"><span className="visual-icon"><TrendingUp size={17} /></span><span><strong>Projet d’analyse de données</strong><small>{language === 'fr' ? 'Jeu de démonstration synthétique' : 'Synthetic demonstration dataset'}</small></span></div>
          </div>
        </div>
        <div className="hero-bottom-line"><div className="container"><span>01</span><span>{language === 'fr' ? 'Portfolio Data Analytics' : 'Data Analytics Portfolio'}</span><span>Python / SQL / BI</span></div></div>
      </section>

      <section className="section about-section" id="about">
        <div className="container section-grid">
          <Reveal className="section-heading"><p className="eyebrow">{t.about.eyebrow}</p><h2>{t.about.title}</h2><p className="section-intro">{t.about.learning}</p></Reveal>
          <Reveal className="about-card"><div className="avatar-monogram" aria-label="Jean Angelin, initiales JA">JA</div><div><h3>{content.identity.role[language]}</h3><p>{content.profile[language]}</p><div className="inline-meta"><span><GraduationCap size={16} />{content.identity.degree[language]}</span><span><MapPin size={16} />{t.about.location}</span></div></div></Reveal>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="container">
          <Reveal className="section-heading section-heading-center"><p className="eyebrow">{t.skills.eyebrow}</p><h2>{t.skills.title}</h2><p className="section-intro">{t.skills.note}</p></Reveal>
          <div className="skills-grid">
            {content.skills.map((group, index) => <Reveal key={group.category.fr} className="skill-card"><div className="skill-card-top"><span className="skill-icon">{index === 0 ? <BarChart3 /> : index === 1 ? <Database /> : index === 2 ? <TrendingUp /> : index === 3 ? <ArrowUpRight /> : <GraduationCap />}</span><span className="skill-status">{content.skillsStatus[language]}</span></div><h3>{group.category[language]}</h3><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="container">
          <Reveal className="section-heading"><p className="eyebrow">{t.projects.eyebrow}</p><h2>{t.projects.title}</h2></Reveal>
          <Reveal className="featured-project">
            <div className="project-image-wrap"><img src="/images/madastore-dashboard-overview.png" alt={language === 'fr' ? 'Capture du dashboard MadaStore avec indicateurs issus des données synthétiques.' : 'MadaStore dashboard screenshot with KPIs based on synthetic data.'} /><span className="synthetic-chip">{language === 'fr' ? 'Données synthétiques' : 'Synthetic data'}</span></div>
            <div className="project-details"><div className="project-overline"><span className="project-index">01 / DATA ANALYTICS</span><span className="project-status">{p.status[language]}</span></div><h3>{p.title}</h3><p>{p.summary[language]}</p><div className="project-tools">{p.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="project-actions"><Link className="button button-primary" to="/projects/madastore">{t.projects.view}<ArrowRight size={17} /></Link><a className="button button-secondary" href={p.githubRepo || content.identity.github} target="_blank" rel="noreferrer">{p.githubRepo ? (language === 'fr' ? 'Code source' : 'Source code') : t.projects.github}<ArrowUpRight size={16} /></a></div><p className="project-links-note">{t.projects.noDeployment}</p></div>
          </Reveal>
          <Reveal className="future-projects"><div><p className="eyebrow">{t.projects.coming}</p><h3>{t.projects.comingTitle}</h3></div>{content.futureProjects.map((item, i) => <div className="future-card" key={item.fr}><span>0{i + 2}</span><strong>{item[language]}</strong><small>{t.projects.coming}</small></div>)}</Reveal>
        </div>
      </section>

      <section className="section education-section" id="education">
        <div className="container section-grid education-grid">
          <Reveal className="section-heading"><p className="eyebrow">{t.education.eyebrow}</p><h2>{t.education.title}</h2><p className="section-intro">{content.education.description[language]}</p></Reveal>
          <Reveal className="education-card"><span className="education-icon"><GraduationCap size={24} /></span><div className="education-main"><p className="education-year">{t.education.year} · {content.education.year}</p><h3>{content.education.degree[language]}</h3><p>{content.education.school[language]}</p><span className="education-note">{language === 'fr' ? 'Diplôme obtenu en 2025' : 'Degree completed in 2025'}</span></div></Reveal>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <Reveal className="contact-copy"><p className="eyebrow">{t.contact.eyebrow}</p><h2>{t.contact.title}</h2><p className="section-intro">{t.contact.description}</p><div className="contact-direct"><a href={`mailto:${content.identity.email}`}><Mail size={19} /><span><small>Email</small><strong>{content.identity.email}</strong></span><ArrowUpRight size={16} /></a><a href={content.identity.github} target="_blank" rel="noreferrer"><Github size={19} /><span><small>{t.contact.github}</small><strong>github.com/jeanAngelin</strong></span><ArrowUpRight size={16} /></a><div><MapPin size={19} /><span><small>{t.contact.location}</small><strong>{content.identity.location[language]}</strong></span></div></div><p className="contact-muted">{t.contact.linkedinMissing}</p></Reveal>
          <Reveal><form className="contact-form" onSubmit={prepareEmail}><label>{t.contact.name}<input name="name" required autoComplete="name" /></label><label>{t.contact.email}<input name="email" type="email" required autoComplete="email" /></label><label>{t.contact.subject}<input name="subject" required /></label><label>{t.contact.message}<textarea name="message" rows={4} required /></label><button type="submit" className="button button-primary">{t.contact.send}<ArrowUpRight size={16} /></button><p className="form-note">{mailPrepared ? t.contact.emailNote : t.contact.emailNote}</p></form></Reveal>
        </div>
      </section>
    </main>
  );
}
