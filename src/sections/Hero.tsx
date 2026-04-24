import { useLang } from '../context/LangContext';
import './Hero.css';

export function HeroChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner hero-inner">
      <div className="hero-eyebrow font-italic-serif">{t.meta.nameRoman}</div>
      <h1 className="hero-headline font-display">{t.meta.tagline}</h1>
      <p className="hero-sub">{t.meta.subtitle}</p>

      <div className="hero-stats">
        {t.hero.stats.map((s, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat-value font-mono-num">{s.value}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="hero-hint font-italic-serif">
        <span>{t.hero.hint}</span>
      </div>
    </div>
  );
}
