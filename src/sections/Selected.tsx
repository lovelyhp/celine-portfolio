import { useLang } from '../context/LangContext';
import './Selected.css';

export function SelectedChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner selected-inner">
      <div className="selected-head">
        <div className="section-label">
          <span>{t.selected.number}</span>
          <span className="font-serif-italic">Projects</span>
        </div>
        <h2 className="selected-heading font-display">{t.selected.title}</h2>
        <p className="selected-intro">{t.selected.intro}</p>
      </div>

      <ol className="selected-grid">
        {t.selected.projects.map((p, i) => (
          <li key={i} className={`selected-card ${i === t.selected.projects.length - 1 ? 'is-wide' : ''}`}>
            <div className="selected-card-meta">
              <span className="selected-card-year font-num">{p.year}</span>
              <div className="selected-card-stack">
                {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
            <h3 className="selected-card-title font-display">{p.title}</h3>
            <p className="selected-card-body">{p.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
