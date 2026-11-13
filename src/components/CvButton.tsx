import { useEffect, useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { translations } from '../i18n/translations';

const CV_URL = '/documents/CV_Jean_Angelin_ANDRIAMANANTENA.pdf';

export function CvButton({ compact = false }: { compact?: boolean }) {
  const { language } = useSite();
  const t = translations[language].hero;
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(CV_URL, { method: 'HEAD' }).then((response) => {
      const isPdf = response.ok && response.headers.get('content-type')?.toLowerCase().includes('application/pdf');
      if (active) setAvailable(Boolean(isPdf));
    }).catch(() => { if (active) setAvailable(false); });
    return () => { active = false; };
  }, []);

  const label = available ? (language === 'fr' ? 'Télécharger mon CV' : 'Download my CV') : t.cvMissing;
  return available
    ? <a className={`button ${compact ? 'button-small cv-button' : 'button-quiet'}`} href={CV_URL} download><ArrowDownToLine size={16} />{label}</a>
    : <button className={`button ${compact ? 'button-small cv-button' : 'button-quiet'}`} type="button" disabled title={t.cvMissing}><ArrowDownToLine size={16} />{label}</button>;
}
