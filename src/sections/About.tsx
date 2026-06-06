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

        <p className="about-cv">
          <a className="about-cv-link" href={t.contact.cvUrl} target="_blank" rel="noreferrer">
            Curriculum Vitae →
          </a>{' '}
          {t.about.cvTrail}
        </p>
      </div>
    </div>
  );
}
