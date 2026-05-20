import { useLang } from '../context/LangContext';
import './About.css';

export function AboutChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner about-inner">
      <div className="about-head">
        <div className="section-label">
          <span>{t.about.number}</span>
          <span className="font-serif-italic">{t.about.title}</span>
        </div>
        <h2 className="about-heading font-display">{t.about.title}</h2>
      </div>

      <div className="about-body">
        {t.about.body.map((p, i) => (
          <p key={i} className={i === t.about.body.length - 1 ? 'about-last' : ''}>{p}</p>
        ))}

        <div className="about-method">
          <div className="about-method-label font-serif-italic">How I Work</div>
          <ol className="about-method-list">
            {t.method.steps.map((s) => (
              <li key={s.id} className="about-method-item">
                <span className="about-method-id font-num">{s.id}</span>
                <span className="about-method-name">{s.label}</span>
                <span className="about-method-desc">{s.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
