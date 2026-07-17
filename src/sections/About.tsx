import { useLang } from '../context/LangContext';
import { Shot } from '../components/Shot';
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
        <div className="about-portrait">
          <img src="/images/seo-ah-portrait.png" alt="Seo-Ah (Céline) Choi portrait" loading="lazy" />
        </div>
      </div>

      <div className="about-body">
        {t.about.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <dl className="about-snapshot">
          {t.about.snapshot.map((s) => (
            <div key={s.k} className="about-snap-row">
              <dt className="about-snap-k">{s.k}</dt>
              <dd className="about-snap-v">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="about-method">
          <div className="about-method-label font-serif-italic">How I Work</div>
          <p className="about-flow">
            {t.method.steps.map((s, i, arr) => (
              <span key={s.id} className="about-flow-seg">
                <span className="about-flow-step">{s.label}</span>
                {i < arr.length - 1 && <span className="about-flow-arr"> → </span>}
              </span>
            ))}
          </p>
        </div>

        <div className="about-highlight">
          {(t.about.highlight as any).image && (
            <div className="about-highlight-media">
              <Shot src={(t.about.highlight as any).image} alt={t.about.highlight.title} ratio="16 / 9" />
            </div>
          )}
          <div className="about-highlight-text">
            <div className="about-highlight-label font-serif-italic">{t.about.highlight.label}</div>
            <h3 className="about-highlight-title font-display">
              {t.about.highlight.title}
              <span className="about-highlight-year font-num"> · {t.about.highlight.year}</span>
            </h3>
            <p className="about-highlight-body">{t.about.highlight.body}</p>
          </div>
        </div>

        <div className="about-career">
          <h3 className="about-block-h font-serif-italic">{t.about.careerTitle}</h3>

          <div className="about-affiliation">
            <span className="about-affiliation-org font-display">{t.experience.affiliation.org}</span>
            <span className="about-affiliation-period font-num">{t.experience.affiliation.period}</span>
          </div>

          {t.experience.affiliation.divisions.map((d, di) => (
            <div key={`d${di}`} className="about-division">
              <div className="about-division-head">
                <span className="about-division-name">{d.name}</span>
                {d.period && <span className="about-division-period font-num">{d.period}</span>}
              </div>
              {d.roles.map((r, ri) => (
                <details key={`d${di}r${ri}`} className="about-career-item" open>
                  <summary>
                    <span className="about-career-org">{r.position}</span>
                    {r.period && <span className="about-career-period font-num">{r.period}</span>}
                  </summary>
                  <ul className="about-career-bullets">
                    {r.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </details>
              ))}
            </div>
          ))}

        </div>

        <div className="about-skills">
          <h3 className="about-block-h font-serif-italic">{t.about.eduTitle}</h3>
          {t.experience.education.map((e, i) => (
            <details key={`e${i}`} className="about-career-item" open>
              <summary>
                <span className="about-career-org">{e.school}</span>
                <span className="about-career-period font-num">{e.period}</span>
              </summary>
              <div className="about-career-role">{e.degree}</div>
              {e.bullets.length > 0 && (
                <ul className="about-career-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </details>
          ))}
        </div>

        <blockquote className="about-philosophy">
          <span className="about-philosophy-label">{t.about.philosophy.label}</span>
          <p className="about-philosophy-quote font-serif-italic">
            &ldquo;{t.about.philosophy.quote}&rdquo;
          </p>
        </blockquote>

        <div className="about-skills">
          <h3 className="about-block-h font-serif-italic">{t.about.skillsTitle}</h3>
          <div className="about-bento">
            {t.skills.groups.map((g, i) => (
              <div key={i} className="about-bento-panel">
                <span className="about-bento-label">{g.heading}</span>
                <p className="about-bento-items">{g.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
