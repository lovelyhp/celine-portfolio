import { useLang } from '../context/LangContext';
import { Shot } from '../components/Shot';
import './Lab.css';

export function LabChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner lab-inner">
      <div className="lab-head">
        <div className="section-label">
          <span>{t.lab.number}</span>
          <span className="font-serif-italic">{t.lab.title}</span>
        </div>
        {t.lab.intro && <p className="lab-intro">{t.lab.intro}</p>}
      </div>

      <ul className="lab-grid">
        {t.lab.tools.map((tool, i) => (
          <li key={i} className="lab-card">
            {(tool as any).image && (
              <div className="lab-card-media">
                <Shot src={(tool as any).image} alt={tool.title} ratio="16 / 9" fit="fill" />
              </div>
            )}
            <div className="lab-card-meta">
              <span className="lab-card-year font-num">{tool.year}</span>
            </div>
            <h3 className="lab-card-title font-display">{tool.title}</h3>
            <p className="lab-card-body">{tool.body}</p>
            <div className="lab-card-stack">
              {tool.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
