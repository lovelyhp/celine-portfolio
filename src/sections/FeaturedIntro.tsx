import { useLang } from '../context/LangContext';
import './FeaturedIntro.css';

export function FeaturedIntroChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner featured-intro">
      <div className="section-label">
        <span>{t.featured.number}</span>
        <span>{t.featured.title}</span>
      </div>
      <h2 className="featured-intro-heading font-display">Two stories.</h2>
      <p className="featured-intro-sub">{t.featured.intro}</p>

      <div className="featured-intro-list">
        <div className="featured-intro-item">
          <span className="featured-intro-num font-mono-num">01</span>
          <div>
            <div className="featured-intro-title font-serif">{t.oiaBuilding.title}</div>
            <div className="featured-intro-sub2">{t.oiaBuilding.subtitle}</div>
          </div>
        </div>
        <div className="featured-intro-item">
          <span className="featured-intro-num font-mono-num">02</span>
          <div>
            <div className="featured-intro-title font-serif">{t.univFinder.title}</div>
            <div className="featured-intro-sub2">{t.univFinder.subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
