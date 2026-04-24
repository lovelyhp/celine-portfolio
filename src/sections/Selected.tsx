import { useLang } from '../context/LangContext';
import './Selected.css';

export function SelectedChapter() {
  const { t } = useLang();

  return (
    <div className="chapter-inner selected-inner">
      <div className="selected-head">
        <div className="section-label">
          <span>{t.selected.number}</span>
          <span>{t.selected.title}</span>
        </div>
        <h2 className="selected-heading font-display">Selected Works</h2>
        <p className="selected-intro">{t.selected.intro}</p>
      </div>

      <div className="selected-grid">
        {t.selected.projects.map((p, i) => (
          <article key={i} className="selected-card">
            <div className="selected-card-head">
              <div className="selected-card-num font-mono-num">0{i + 1}</div>
              <div className="selected-card-year font-italic-serif">{p.year}</div>
            </div>
            <h3 className="selected-card-title font-serif">{p.title}</h3>
            <div className="selected-card-stack">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            <p className="selected-card-body">{p.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
