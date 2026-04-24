import { useLang } from '../context/LangContext';
import './About.css';

export function AboutChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner about-inner">
      <div>
        <div className="section-label">
          <span>{t.about.number}</span>
          <span>{t.about.title}</span>
        </div>
        <h2 className="about-heading font-display">About</h2>
      </div>

      <div className="about-body">
        {t.about.body.map((p, i) => (
          <p key={i} className={i === t.about.body.length - 1 ? 'about-last' : ''}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
