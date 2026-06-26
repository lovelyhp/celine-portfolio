export interface ProjectCardProps {
  index: string;
  year: string;
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  link: string;
  linkLabel?: string;
}

export function ProjectCard({
  index, year, title, subtitle, summary, stack, link, linkLabel = 'Live ↗',
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-meta">
        <span className="project-card-index font-num">{index}</span>
        <span className="project-card-year font-num">{year}</span>
      </div>
      <h3 className="project-card-title font-display">{title}</h3>
      <p className="project-card-subtitle font-serif-italic">{subtitle}</p>
      <p className="project-card-summary">{summary}</p>
      <div className="project-card-stack">
        {stack.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
      <a className="project-card-link" href={link} target="_blank" rel="noreferrer">
        {linkLabel}
      </a>
    </article>
  );
}
