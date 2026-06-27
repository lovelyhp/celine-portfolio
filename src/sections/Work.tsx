import { useLang } from '../context/LangContext';
import { CaseStudy, CaseSlide } from './CaseStudy';
import { ProjectCard } from './ProjectCard';
import './Work.css';

export function WorkChapter() {
  const { t } = useLang();
  const featured = t.oiaBuilding;
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

      <div className="work-featured">
        <CaseStudy
          index={featured.index}
          year={featured.year}
          title={featured.title}
          subtitle={featured.subtitle}
          stack={featured.stack}
          slides={featured.slides as CaseSlide[]}
          buildingFloorMap={(featured as any).buildingFloorMap}
          collapsible
        />
      </div>

      <ol className="work-list">
        {cards.map((c) => {
          const cover = c.slides[0] as Extract<CaseSlide, { kind: 'cover' }>;
          return (
            <li key={c.id}>
              <ProjectCard
                index={c.index}
                year={c.year}
                title={c.title}
                subtitle={c.subtitle}
                summary={cover.body}
                stack={c.stack}
                link={(c as any).link}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
