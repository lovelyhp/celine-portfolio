import { Fragment, ReactNode } from 'react';
import { Shot } from '../components/Shot';

const OIA_DOMAIN = 'oia.yonsei.ac.kr';

/** Turn any `oia.yonsei.ac.kr` mention in the summary into a new-tab link. */
function linkifyOia(text: string): ReactNode {
  if (!text.includes(OIA_DOMAIN)) return text;
  return text.split(OIA_DOMAIN).map((seg, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <a className="inline-link" href="https://oia.yonsei.ac.kr" target="_blank" rel="noreferrer">
          {OIA_DOMAIN}
        </a>
      )}
      {seg}
    </Fragment>
  ));
}

export interface ProjectCardProps {
  index: string;
  year: string;
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  link: string;
  linkLabel?: string;
  image?: string;
}

export function ProjectCard({
  index, year, title, subtitle, summary, stack, link, linkLabel = 'Live ↗', image,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      {image && (
        <div className="project-card-media">
          <Shot src={image} alt={title} ratio="16 / 8.45" fit="fill" href={link} />
        </div>
      )}
      <div className="project-card-meta">
        <span className="project-card-index font-num">{index}</span>
        <span className="project-card-year font-num">{year}</span>
      </div>
      <h3 className="project-card-title font-display">{title}</h3>
      <p className="project-card-subtitle font-serif-italic">{subtitle}</p>
      <p className="project-card-summary">{linkifyOia(summary)}</p>
      <div className="project-card-stack">
        {stack.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
      <a className="project-card-link" href={link} target="_blank" rel="noreferrer">
        {linkLabel}
      </a>
    </article>
  );
}
