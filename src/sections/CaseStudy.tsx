import { BuildingDiagram } from '../components/BuildingDiagram';
import './CaseStudy.css';

export type CaseSlide =
  | { kind: 'cover'; heading: string; sub: string; body: string; videoSrc?: string; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'section'; tag: string; heading: string; body: string[]; videoSrc?: string; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'result'; tag: string; heading: string; body: Array<{ h: string; p: string }>; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'scenes'; tag: string; heading: string; scenes: string[]; closing: { h: string; p: string }; imageSrc?: string | null; imageCaption?: string };

export interface CaseStudyData {
  id: string;
  index: string;
  year: string;
  title: string;
  subtitle: string;
  stack: string[];
  slides: CaseSlide[];
  link?: string;
  showBuilding?: boolean;
}

/** 케이스 스터디 상세 페이지 본문 (project_detail 목업 레이아웃) */
export function CaseStudyDetail({ data }: { data: CaseStudyData }) {
  const cover = data.slides[0] as Extract<CaseSlide, { kind: 'cover' }>;
  const rest = data.slides.slice(1);
  const showBuilding = data.showBuilding !== false;

  return (
    <article className="case-detail">
      {/* Header block */}
      <div className="case-head chapter-inner">
        <span className="case-head-label">Case Study · {data.year}</span>
        <h1 className="case-head-title font-serif">{data.title}</h1>
        <div className="case-head-grid">
          <div className="case-head-intro">
            <p className="case-head-lede">{cover.sub}</p>
            <p className="case-head-body">{cover.body}</p>
          </div>
          <aside className="case-head-meta">
            <div className="case-stack">
              {data.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
            {data.link && (
              <a className="case-live-link" href={data.link} target="_blank" rel="noreferrer">
                Live ↗
              </a>
            )}
            {showBuilding && (
              <div className="case-building">
                <BuildingDiagram size="standard" />
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Cover media band */}
      {(cover.videoSrc || cover.imageSrc) && (
        <div className="case-media-band">
          <div className="case-media-frame">
            {cover.videoSrc ? (
              <video src={`/videos/${cover.videoSrc}`} autoPlay muted loop playsInline />
            ) : (
              <img src={`/images/${cover.imageSrc}`} alt={cover.imageCaption ?? data.title} />
            )}
          </div>
          {cover.imageCaption && <p className="case-media-caption">{cover.imageCaption}</p>}
        </div>
      )}

      {/* Slide rows */}
      <div className="case-rows chapter-inner">
        {rest.map((slide, i) => (
          <CaseSlideRow key={i} slide={slide} />
        ))}
      </div>
    </article>
  );
}

function SlideFigure({ slide }: { slide: Extract<CaseSlide, { kind: 'section' }> }) {
  if (slide.videoSrc) {
    return (
      <figure className="case-figure case-figure--video">
        <video src={`/videos/${slide.videoSrc}`} autoPlay muted loop playsInline />
        {slide.imageCaption && <figcaption>{slide.imageCaption}</figcaption>}
      </figure>
    );
  }
  if (slide.imageSrc) {
    return (
      <figure className="case-figure">
        <img src={`/images/${slide.imageSrc}`} alt={slide.imageCaption ?? ''} />
        {slide.imageCaption && <figcaption>{slide.imageCaption}</figcaption>}
      </figure>
    );
  }
  return null;
}

function CaseSlideRow({ slide }: { slide: CaseSlide }) {
  if (slide.kind === 'section') {
    return (
      <div className="case-row">
        <div className="case-row-side">
          <div className="case-tag">{slide.tag}</div>
          <h2 className="case-heading font-serif">{slide.heading}</h2>
        </div>
        <div className="case-row-main">
          {slide.body.map((p, i) => <p key={i} className="case-body">{p}</p>)}
          <SlideFigure slide={slide} />
        </div>
      </div>
    );
  }

  if (slide.kind === 'result') {
    // Impact panel — 라이트/다크 공통 딥네이비 (mockup: The Impact of Visibility)
    return (
      <div className="case-impact">
        <div className="case-tag case-tag--on-navy">{slide.tag}</div>
        <h2 className="case-impact-heading font-serif">{slide.heading}</h2>
        <div className="case-impact-grid">
          {slide.body.map((item, i) => (
            <div key={i} className="case-impact-item">
              {item.h && <h3 className="case-impact-h">{item.h}</h3>}
              <p>{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.kind === 'scenes') {
    return (
      <div className="case-row">
        <div className="case-row-side">
          <div className="case-tag">{slide.tag}</div>
          <h2 className="case-heading font-serif">{slide.heading}</h2>
        </div>
        <div className="case-row-main">
          <ul className="case-scenes">
            {slide.scenes.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <div className="case-closing">
            <h3>{slide.closing.h}</h3>
            <p>{slide.closing.p}</p>
          </div>
        </div>
      </div>
    );
  }

  // 추가 cover 슬라이드는 상세 본문에서 쓰지 않는다
  return null;
}
