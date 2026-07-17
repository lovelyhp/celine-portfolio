import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
  /** 내부 케이스 스터디 상세 라우트. 있으면 타이틀·"Case Study" 링크가 이 경로로 간다. */
  to?: string;
}

export function ProjectCard({
  index, year, title, subtitle, summary, stack, link, linkLabel = 'Live ↗', image, to,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      {image && (
        <div className="project-card-media">
          {/* 원본 스크린샷 비율(≈1.9~2.0)에 맞춘 낮은 프레임 + cover — fill 왜곡 방지 */}
          <Shot src={image} alt={title} ratio="16 / 8.4" fit="cover" href={link} />
        </div>
      )}
      <div className="project-card-meta font-num">
        <span className="project-card-index">{index}</span>
        <span aria-hidden="true">·</span>
        <span className="project-card-year">{year}</span>
      </div>
      <h3 className="project-card-title font-serif">
        {to ? <Link to={to}>{title}</Link> : title}
      </h3>
      <p className="project-card-subtitle">{subtitle}</p>
      <p className="project-card-summary">{linkifyOia(summary)}</p>
      <div className="project-card-stack">
        {stack.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
      <div className="project-card-links">
        {to && (
          <Link className="project-card-link" to={to}>
            Case Study →
          </Link>
        )}
        <a className="project-card-link project-card-link--live" href={link} target="_blank" rel="noreferrer">
          {linkLabel}
        </a>
      </div>
    </article>
  );
}
