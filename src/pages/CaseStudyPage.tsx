import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { scrollToTarget } from '../lib/smoothScroll';
import { CaseStudyDetail, CaseStudyData } from '../sections/CaseStudy';

const CASE_ORDER = ['oia-building', 'univ-finder', 'oia-website'] as const;

export function CaseStudyPage() {
  const { t } = useLang();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, [id]);

  const byId: Record<string, CaseStudyData> = {
    'oia-building': t.oiaBuilding as unknown as CaseStudyData,
    'univ-finder': t.univFinder as unknown as CaseStudyData,
    'oia-website': t.oiaWebsite as unknown as CaseStudyData,
  };

  const data = id ? byId[id] : undefined;
  if (!data) return <Navigate to="/" replace />;

  const nextId = CASE_ORDER[(CASE_ORDER.indexOf(id as (typeof CASE_ORDER)[number]) + 1) % CASE_ORDER.length];
  const next = byId[nextId];

  return (
    <main className="page case-page" role="main">
      <div className="case-page-top chapter-inner">
        <Link className="case-back" to="/#work">← {t.nav.work}</Link>
      </div>

      <CaseStudyDetail data={data} />

      <div className="case-next chapter-inner">
        <span className="case-next-label">Next Project</span>
        <Link className="case-next-link font-serif" to={`/work/${nextId}`}>
          {next.title}
          <span className="case-next-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
