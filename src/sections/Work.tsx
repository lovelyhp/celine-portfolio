import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { CaseSlide } from './CaseStudy';
import { ProjectCard } from './ProjectCard';
import './Work.css';

export function WorkChapter() {
  const { t } = useLang();
  const featured = t.oiaBuilding;
  const cover = featured.slides[0] as Extract<CaseSlide, { kind: 'cover' }>;
  const cards = [t.univFinder, t.oiaWebsite];

  return (
    <div className="chapter-inner work-inner">
      <div className="work-head">
        <div className="section-label">
          <span>{t.work.number}</span>
          <span className="font-serif-italic">{t.work.title}</span>
        </div>
        <p className="work-intro">{t.work.intro}</p>
      </div>

      {/* Featured band — full-bleed slate strip (portfolio_home mockup) */}
      <div className="work-featured-band">
        <div className="work-featured">
          <div className="work-featured-media">
            {cover.videoSrc && (
              <video src={`/videos/${cover.videoSrc}`} autoPlay muted loop playsInline />
            )}
          </div>
          <div className="work-featured-text">
            <span className="work-featured-label">Case Study · {featured.year}</span>
            <h2 className="work-featured-title font-serif">{featured.title}</h2>
            <p className="work-featured-sub">{featured.subtitle}</p>
            <div className="work-featured-stack">
              {featured.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
            <Link className="work-featured-cta" to={`/work/${featured.id}`}>
              {t.work.more}
            </Link>
          </div>
        </div>
      </div>

      <ol className="work-list">
        {cards.map((c) => {
          const cardCover = c.slides[0] as Extract<CaseSlide, { kind: 'cover' }>;
          return (
            <li key={c.id}>
              <ProjectCard
                index={c.index}
                year={c.year}
                title={c.title}
                subtitle={c.subtitle}
                summary={cardCover.body}
                stack={c.stack}
                link={(c as any).link}
                image={(c as any).image}
                to={`/work/${c.id}`}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
