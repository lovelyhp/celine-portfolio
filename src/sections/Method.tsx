import { useLang } from '../context/LangContext';
import './Method.css';

export function MethodChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner method-inner">
      <div className="method-head">
        <div className="section-label">
          <span>{t.method.number}</span>
          <span>{t.method.title}</span>
        </div>
        <h2 className="method-headline font-display">{t.method.headline}</h2>
      </div>

      <ol className="method-steps">
        {t.method.steps.map((s) => (
          <li key={s.id} className="method-step">
            <span className="method-step-num font-mono-num">{s.id}</span>
            <div className="method-step-text">
              <div className="method-step-label">{s.label}</div>
              <div className="method-step-desc">{s.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
