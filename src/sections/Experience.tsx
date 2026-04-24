import { useLang } from '../context/LangContext';
import './Experience.css';

export function ExperienceChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner exp-inner">
      <div className="exp-head">
        <div className="section-label">
          <span>{t.experience.number}</span>
          <span>{t.experience.title}</span>
        </div>
        <h2 className="exp-heading font-display">Experience &amp; Education</h2>
      </div>

      <div className="exp-body">
        <div className="exp-block">
          <h3 className="exp-block-heading font-italic-serif">— Work</h3>
          {t.experience.roles.map((r, i) => (
            <div key={i} className="exp-item">
              <div className="exp-period">{r.period}</div>
              <div className="exp-content">
                <div className="exp-org">{r.org}</div>
                <div className="exp-position font-serif">{r.position}</div>
                <ul className="exp-bullets">
                  {r.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="exp-block">
          <h3 className="exp-block-heading font-italic-serif">— Education</h3>
          {t.experience.education.map((e, i) => (
            <div key={i} className="exp-item">
              <div className="exp-period">{e.period}</div>
              <div className="exp-content">
                <div className="exp-org">{e.school}</div>
                <div className="exp-position font-serif">{e.degree}</div>
                {e.bullets.length > 0 && (
                  <ul className="exp-bullets">
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
