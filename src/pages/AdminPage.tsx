import { useMemo, useState, type FormEvent } from 'react';
import { Download, RotateCcw, Save } from 'lucide-react';
import { useSite, type SiteContent } from '../context/SiteContext';
import { translations } from '../i18n/translations';

export function AdminPage() {
  const { content, updateContent, resetContent, language } = useSite();
  const t = translations[language].admin;
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);
  const skillsText = useMemo(() => draft.skills.map((group) => group.items.join(', ')).join('\n'), [draft.skills]);

  function setIdentity(key: keyof SiteContent['identity'], value: string) {
    setDraft((current) => ({ ...current, identity: { ...current.identity, [key]: value } }));
  }
  function setLocalizedIdentity(key: 'role' | 'location' | 'degree' | 'school', locale: 'fr' | 'en', value: string) {
    setDraft((current) => ({ ...current, identity: { ...current.identity, [key]: { ...current.identity[key], [locale]: value } } }));
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateContent(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3500);
  }

  function exportContent() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function reset() {
    resetContent();
    window.location.reload();
  }

  return (
    <main className="admin-page"><div className="container admin-container"><p className="eyebrow">JA / {language === 'fr' ? 'ADMINISTRATION' : 'ADMIN'}</p><h1>{t.title}</h1><p className="section-intro">{t.subtitle}</p>
      <div className="admin-warning"><strong>{language === 'fr' ? 'Mode local, sans serveur' : 'Local-only, no server'}</strong><p>{t.warning}</p><p>{language === 'fr' ? 'Pour publier les changements, exportez le JSON, remplacez `src/data/content.json` dans le dépôt du site puis redéployez.' : 'To publish changes, export the JSON, replace `src/data/content.json` in the site repository, then redeploy.'}</p></div>
      <form className="admin-form" onSubmit={save}>
        <fieldset><legend>{language === 'fr' ? 'Identité publique' : 'Public identity'}</legend>
          <label>{t.name}<input value={draft.identity.name} onChange={(e) => setIdentity('name', e.target.value)} required /></label>
          <label>{t.email}<input type="email" value={draft.identity.email} onChange={(e) => setIdentity('email', e.target.value)} required /></label>
          <label>{t.github}<input type="url" value={draft.identity.github} onChange={(e) => setIdentity('github', e.target.value)} /></label>
          <label>{t.linkedin}<input type="url" value={draft.identity.linkedin} onChange={(e) => setIdentity('linkedin', e.target.value)} placeholder="https://www.linkedin.com/in/…" /></label>
          <label>{t.location} (FR)<input value={draft.identity.location.fr} onChange={(e) => setLocalizedIdentity('location', 'fr', e.target.value)} /></label>
          <label>{t.location} (EN)<input value={draft.identity.location.en} onChange={(e) => setLocalizedIdentity('location', 'en', e.target.value)} /></label>
          <label>{t.graduation}<input value={draft.identity.graduationYear} onChange={(e) => setIdentity('graduationYear', e.target.value)} /></label>
        </fieldset>
        <fieldset><legend>{language === 'fr' ? 'Présentation bilingue' : 'Bilingual introduction'}</legend>
          <label>{t.bioFr}<textarea rows={4} value={draft.profile.fr} onChange={(e) => setDraft((current) => ({ ...current, profile: { ...current.profile, fr: e.target.value } }))} /></label>
          <label>{t.bioEn}<textarea rows={4} value={draft.profile.en} onChange={(e) => setDraft((current) => ({ ...current, profile: { ...current.profile, en: e.target.value } }))} /></label>
        </fieldset>
        <fieldset><legend>{language === 'fr' ? 'Compétences' : 'Skills'}</legend><label>{language === 'fr' ? 'Outils par catégorie, une catégorie par ligne, séparés par des virgules' : 'Tools by category, one category per line, comma separated'}<textarea rows={6} value={skillsText} onChange={(e) => setDraft((current) => ({ ...current, skills: current.skills.map((group, i) => ({ ...group, items: (e.target.value.split('\n')[i] || '').split(',').map((s) => s.trim()).filter(Boolean) })) }))} /></label><p className="form-note">{language === 'fr' ? `Niveau affiché : ${draft.skillsStatus.fr}. Modifiez ce statut dans content.json si votre niveau évolue.` : `Displayed status: ${draft.skillsStatus.en}. Update it in content.json as your level changes.`}</p></fieldset>
        <fieldset><legend>{language === 'fr' ? 'Étude de cas MadaStore' : 'MadaStore case study'}</legend><label>{language === 'fr' ? 'Description (FR)' : 'Description (FR)'}<textarea rows={4} value={draft.project.summary.fr} onChange={(e) => setDraft((current) => ({ ...current, project: { ...current.project, summary: { ...current.project.summary, fr: e.target.value } } }))} /></label><label>{language === 'fr' ? 'Description (EN)' : 'Description (EN)'}<textarea rows={4} value={draft.project.summary.en} onChange={(e) => setDraft((current) => ({ ...current, project: { ...current.project, summary: { ...current.project.summary, en: e.target.value } } }))} /></label></fieldset>
        <div className="admin-actions"><button className="button button-primary" type="submit"><Save size={17} />{t.save}</button><button className="button button-secondary" type="button" onClick={exportContent}><Download size={17} />{t.export}</button><button className="button button-quiet" type="button" onClick={reset}><RotateCcw size={16} />{t.reset}</button></div>
        {saved && <p className="admin-saved" role="status">{t.saved}</p>}
      </form>
      <p className="admin-cv-note">{language === 'fr' ? 'CV : ajoutez votre PDF à `public/documents/CV_Jean_Angelin_ANDRIAMANANTENA.pdf` quand vous aurez terminé sa mise à jour. Le portfolio n’en fabrique aucun.' : 'CV: add your PDF at `public/documents/CV_Jean_Angelin_ANDRIAMANANTENA.pdf` when it is ready. The portfolio does not create a fake CV.'}</p>
    </div></main>
  );
}
