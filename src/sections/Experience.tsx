// @ts-nocheck — dead code awaiting Task 8 deletion; content schema no longer has t.experience
import { useLang } from '../context/LangContext';
import './Experience.css';

export function ExperienceChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner experience-inner">
      <div className="exp-head">
        <div className="section-label">
          <span>{t.experience.number}</span>
          <span className="font-serif-italic">Experience & Skills</span>
        </div>
        <h2 className="exp-heading font-display">Experience & Education</h2>
      </div>

      <div className="exp-grid">
        <div className="exp-main">
          <section className="exp-block">
            <h3 className="exp-block-h font-serif-italic">Roles</h3>
            <ul className="exp-list">
              {t.experience.roles.map((r, i) => (
                <li key={i} className="exp-item">
                  <div className="exp-item-head">
                    <span className="exp-item-org">{r.org}</span>
                    <span className="exp-item-period font-num">{r.period}</span>
                  </div>
                  <div className="exp-item-role">{r.position}</div>
                  <ul className="exp-bullets">
                    {r.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="exp-block">
            <h3 className="exp-block-h font-serif-italic">Education</h3>
            <ul className="exp-list">
              {t.experience.education.map((e, i) => (
                <li key={i} className="exp-item">
                  <div className="exp-item-head">
                    <span className="exp-item-org">{e.school}</span>
                    <span className="exp-item-period font-num">{e.period}</span>
                  </div>
                  <div className="exp-item-role">{e.degree}</div>
                  {e.bullets.length > 0 && (
                    <ul className="exp-bullets">
                      {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="exp-skills">
          <h3 className="exp-block-h font-serif-italic">Skills</h3>
          {t.skills.groups.map((g, i) => (
            <div key={i} className="exp-skill-group">
              <h4 className="exp-skill-head">{g.heading}</h4>
              <p className="exp-skill-items">{g.items}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
