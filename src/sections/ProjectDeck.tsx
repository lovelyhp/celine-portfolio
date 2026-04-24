import { ImageSlot } from '../components/ImageSlot';
import './ProjectDeck.css';

type Slide =
  | {
      kind: 'cover';
      heading: string;
      sub: string;
      body: string;
      imageSrc: string | null;
      imageCaption: string;
      imageHint: string;
    }
  | {
      kind: 'section';
      tag: string;
      heading: string;
      body: string[];
      imageSrc: string | null;
      imageCaption: string;
      imageHint: string;
    }
  | {
      kind: 'result';
      tag: string;
      heading: string;
      table?: Array<{ label: string; before: string; after: string }>;
      body: Array<{ h: string; p: string }>;
      imageSrc: string | null;
      imageCaption: string;
      imageHint: string;
    }
  | {
      kind: 'scenes';
      tag: string;
      heading: string;
      scenes: string[];
      closing: { h: string; p: string } | null;
      imageSrc: string | null;
      imageCaption: string;
      imageHint: string;
    };

interface ProjectDeckProps {
  index: string;
  year: string;
  title: string;
  subtitle: string;
  stack: string[];
  slides: Slide[];
}

export function ProjectDeck({ index, year, title, stack, slides }: ProjectDeckProps) {
  return (
    <div className="chapter-inner project-inner">
      {/* Meta header */}
      <header className="project-head">
        <div className="project-head-left">
          <span className="project-index font-mono-num">№{index}</span>
          <span className="project-year font-italic-serif">{year}</span>
        </div>
        <h2 className="project-title font-display">{title}</h2>
        <div className="project-stack">
          {stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </header>

      {/* Slides stacked vertically */}
      {slides.map((slide, i) => {
        const hasImage = slide.imageSrc !== null;
        return (
          <article
            key={i}
            className={`project-slide ${hasImage ? '' : 'project-slide--textonly'}`}
          >
            <div className="project-slide-text">
              {'tag' in slide && slide.tag && (
                <div className="slide-tag font-mono-num">{slide.tag}</div>
              )}
              <h3 className="slide-heading font-display">
                {slide.kind === 'cover' ? (
                  <>
                    {slide.heading}
                    <span className="slide-subheading font-italic-serif"> — {slide.sub}</span>
                  </>
                ) : (
                  slide.heading
                )}
              </h3>

              {slide.kind === 'cover' && <p className="slide-body">{slide.body}</p>}

              {slide.kind === 'section' && (
                <div className="slide-paras">
                  {slide.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              )}

              {slide.kind === 'result' && (
                <div className="slide-result">
                  {slide.table && (
                    <div className="result-table-wrap">
                      <table className="result-table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Before</th>
                            <th>After</th>
                          </tr>
                        </thead>
                        <tbody>
                          {slide.table.map((row, j) => (
                            <tr key={j}>
                              <td>{row.label}</td>
                              <td className="td-before">{row.before}</td>
                              <td className="td-after">{row.after}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {slide.body.map((b, j) => (
                    <div key={j} className="slide-sub">
                      {b.h && <h4 className="slide-subhead font-italic-serif">{b.h}</h4>}
                      <p>{b.p}</p>
                    </div>
                  ))}
                </div>
              )}

              {slide.kind === 'scenes' && (
                <div className="slide-scenes-wrap">
                  <ul className="slide-scenes">
                    {slide.scenes.map((s, j) => (
                      <li key={j}>
                        <span className="scene-bullet">◆</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  {slide.closing && (
                    <div className="slide-closing">
                      <h4 className="slide-subhead font-italic-serif">{slide.closing.h}</h4>
                      <p>{slide.closing.p}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {hasImage && (
              <div className="project-slide-image">
                <ImageSlot
                  src={slide.imageSrc}
                  caption={slide.imageCaption}
                  hint={slide.imageHint}
                  variant="portrait"
                />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
