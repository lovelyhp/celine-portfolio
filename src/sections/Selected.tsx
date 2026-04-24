import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { ImageSlot } from '../components/ImageSlot';
import './Selected.css';

export function SelectedChapter() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

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
          <button
            key={i}
            className={`selected-card ${open === i ? 'is-open' : ''}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
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
            {open === i && (
              <div className="selected-card-expand">
                <p className="selected-card-body">{p.body}</p>
                <div className="selected-card-image">
                  <ImageSlot
                    src={null}
                    caption={p.imageCaption}
                    hint={p.imageHint}
                    variant="landscape"
                  />
                </div>
              </div>
            )}
            <div className="selected-card-hint font-italic-serif">
              {open === i ? '— 닫기' : '— 더 보기'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
