import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from '../lib/smoothScroll';
import { HeroChapter } from '../sections/Hero';
import { WorkChapter } from '../sections/Work';
import { AboutChapter } from '../sections/About';
import { LabChapter } from '../sections/Lab';
import { ContactChapter } from '../sections/Contact';

export const SECTION_IDS = ['hero', 'about', 'work', 'lab', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function HomePage() {
  const location = useLocation();

  // /#about 형태로 진입하면 해당 섹션으로, 해시 없으면 맨 위로
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && (SECTION_IDS as readonly string[]).includes(hash)) {
      // 렌더 직후 레이아웃이 잡힌 뒤 스크롤
      requestAnimationFrame(() => {
        scrollToTarget(`#${hash}`);
      });
    } else {
      scrollToTarget(0, { immediate: true });
    }
  }, [location.hash]);

  return (
    <main className="page" role="main">
      <section id="hero" className="chapter">
        <HeroChapter />
      </section>
      {/* 배포판 색감: 웜 베이지 밴드는 About 한 곳만 */}
      <section id="about" className="chapter chapter--warm chapter--flow">
        <AboutChapter />
      </section>
      <section id="work" className="chapter chapter--flow">
        <WorkChapter />
      </section>
      <section id="lab" className="chapter chapter--flow">
        <LabChapter />
      </section>
      <section id="contact" className="chapter">
        <ContactChapter />
      </section>
    </main>
  );
}
