import { useEffect, useRef, useState } from 'react';
import { BuildingDiagram } from '../components/BuildingDiagram';
import './CaseStudy.css';

export type CaseSlide =
  | { kind: 'cover'; heading: string; sub: string; body: string; videoSrc?: string; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'section'; tag: string; heading: string; body: string[]; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'result'; tag: string; heading: string; body: Array<{ h: string; p: string }>; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'scenes'; tag: string; heading: string; scenes: string[]; closing: { h: string; p: string }; imageSrc?: string | null; imageCaption?: string };

export interface CaseStudyProps {
  index: string;
  year: string;
  title: string;
  subtitle: string;
  stack: string[];
  slides: CaseSlide[];
  /** 0~5 사이의 층 인덱스 배열. 각 슬라이드와 1:1로 매핑되어 sticky 빌딩에서 highlight됨. */
  buildingFloorMap?: Array<0 | 1 | 2 | 3 | 4 | 5 | null>;
  /** true이면 좌측 sticky sidebar에 BuildingDiagram을 표시. false면 메타 정보만. */
  showBuilding?: boolean;
}

export function CaseStudy({
  index, year, title, subtitle, stack, slides,
  buildingFloorMap, showBuilding = true,
}: CaseStudyProps) {
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const targets = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.filter((e) => e.isIntersecting);
        if (inView.length === 0) return;
        const best = inView.reduce((acc, cur) =>
          cur.intersectionRatio > acc.intersectionRatio ? cur : acc
        );
        const idx = targets.indexOf(best.target as HTMLDivElement);
        if (idx >= 0) setActiveIdx(idx);
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [slides.length]);

  const activeFloor = buildingFloorMap?.[activeIdx] ?? undefined;

  return (
    <div className="chapter-inner case-inner">
      <aside className="case-aside">
        <div className="case-meta">
          <div className="section-label">
            <span>{index}</span>
            <span className="font-serif-italic">Case Study · {year}</span>
          </div>
          <h2 className="case-title font-display">{title}</h2>
          <p className="case-subtitle">{subtitle}</p>
          <div className="case-stack">
            {stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
        {showBuilding && (
          <div className="case-building">
            <BuildingDiagram size="standard" highlight={activeFloor as any} />
          </div>
        )}
      </aside>

      <div className="case-content">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className={`case-slide case-slide--${slide.kind}`}
          >
            <CaseSlideRender slide={slide} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseSlideRender({ slide }: { slide: CaseSlide }) {
  if (slide.kind === 'cover') {
    return (
      <>
        {slide.videoSrc && (
          <div className="case-media">
            <video src={`/${slide.videoSrc}`} autoPlay muted loop playsInline />
          </div>
        )}
        <h3 className="case-heading font-display">{slide.heading}</h3>
        <p className="case-lede font-serif-italic">{slide.sub}</p>
        <p className="case-body">{slide.body}</p>
      </>
    );
  }
  if (slide.kind === 'section') {
    return (
      <>
        <div className="case-tag font-serif-italic">{slide.tag}</div>
        <h3 className="case-heading font-display">{slide.heading}</h3>
        {slide.body.map((p, i) => <p key={i} className="case-body">{p}</p>)}
        {slide.imageSrc && (
          <figure className="case-figure">
            <img src={`/images/${slide.imageSrc}`} alt={slide.imageCaption ?? ''} />
            {slide.imageCaption && <figcaption>{slide.imageCaption}</figcaption>}
          </figure>
        )}
      </>
    );
  }
  if (slide.kind === 'result') {
    return (
      <>
        <div className="case-tag font-serif-italic">{slide.tag}</div>
        <h3 className="case-heading font-display">{slide.heading}</h3>
        <div className="case-result-grid">
          {slide.body.map((item, i) => (
            <div key={i} className="case-result-item">
              {item.h && <h4 className="case-result-h">{item.h}</h4>}
              <p>{item.p}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
  // scenes
  return (
    <>
      <div className="case-tag font-serif-italic">{slide.tag}</div>
      <h3 className="case-heading font-display">{slide.heading}</h3>
      <ul className="case-scenes">
        {slide.scenes.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <div className="case-closing">
        <h4>{slide.closing.h}</h4>
        <p>{slide.closing.p}</p>
      </div>
    </>
  );
}
