import { useLang } from '../context/LangContext';
import { BuildingDiagram } from '../components/BuildingDiagram';
import './Hero.css';

export function HeroChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner hero-inner">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="font-serif-italic">{t.meta.nameRoman}</span>
          <span className="hero-eyebrow-sep">·</span>
          <span>{(t.meta as any).role ?? 'AI 기획자 · 빌더'}</span>
        </div>

        <h1 className="hero-headline-en font-serif">
          {(t.meta as any).taglineEn ?? 'Planner, Builder, Operator.'}
        </h1>
        <h2 className="hero-headline-ko font-display">{t.meta.tagline}</h2>
        <p className="hero-sub">{t.meta.subtitle}</p>

        <div className="hero-stats">
          {t.hero.stats.map((s, i) => (
            <div key={i} className={`hero-stat ${i === 1 ? 'is-accent' : ''}`}>
              <div className="hero-stat-value font-num">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-hint font-serif-italic">{t.hero.hint}</div>
      </div>

      <div className="hero-right">
        <BuildingDiagram size="large" />
      </div>
    </div>
  );
}
