import { useState, useEffect, useRef } from 'react';
import { LangProvider, useLang } from './context/LangContext';
import { HeroChapter } from './sections/Hero';
import { AboutChapter } from './sections/About';
import { FeaturedIntroChapter } from './sections/FeaturedIntro';
import { ProjectDeck, ProjectDeckHandle } from './sections/ProjectDeck';
import { SelectedChapter } from './sections/Selected';
import { ExperienceChapter } from './sections/Experience';
import { SkillsChapter } from './sections/Skills';
import { ContactChapter } from './sections/Contact';
import './components/Deck.css';

const SECTION_IDS = [
  'hero',
  'about',
  'work-intro',
  'oia',
  'univ',
  'selected',
  'experience',
  'skills',
  'contact',
] as const;
type SectionId = (typeof SECTION_IDS)[number];

const WORK_IDS: SectionId[] = ['work-intro', 'oia', 'univ'];

function Shell() {
  const { t, toggle, lang } = useLang();
  const [activeId, setActiveId] = useState<SectionId>('hero');
  const [progress, setProgress] = useState(0);
  const oiaRef = useRef<ProjectDeckHandle>(null);
  const univRef = useRef<ProjectDeckHandle>(null);

  // Track which top-level section is currently in the middle of the viewport.
  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const pickActive = () => {
      const probe = window.innerHeight * 0.35;
      let best: SectionId = 'hero';
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          best = s.id as SectionId;
          break;
        }
      }
      setActiveId(best);

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };

    pickActive();
    window.addEventListener('scroll', pickActive, { passive: true });
    window.addEventListener('resize', pickActive);
    return () => {
      window.removeEventListener('scroll', pickActive);
      window.removeEventListener('resize', pickActive);
    };
  }, []);

  // Wheel: inside a ProjectDeck chapter, the wheel advances its inner slides
  // first. When the inner deck hits a boundary, it falls through to vertical
  // section navigation. Keyboard, scrollbar drag, and touch are unaffected.
  useEffect(() => {
    let lock = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const handler = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (Math.abs(e.deltaY) < 8) return;

      if (lock) {
        e.preventDefault();
        return;
      }

      // 1) If we're currently on a ProjectDeck chapter, let it consume the
      //    wheel gesture first — one flick moves one inner slide.
      const deckRef =
        activeId === 'oia' ? oiaRef.current : activeId === 'univ' ? univRef.current : null;
      if (deckRef) {
        const atEdge = e.deltaY > 0 ? deckRef.isAtEnd() : deckRef.isAtStart();
        if (!atEdge) {
          const moved = e.deltaY > 0 ? deckRef.next() : deckRef.prev();
          if (moved) {
            e.preventDefault();
            lock = true;
            window.setTimeout(() => {
              lock = false;
            }, 600);
            return;
          }
        }
        // At inner boundary — fall through to cross chapters, and reset the
        // deck so returning later starts at the first slide.
        if (e.deltaY < 0) deckRef.reset();
      }

      // 2) Section-level wheel navigation.
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('.chapter')
      );
      if (targets.length === 0) return;

      const offset = 64;
      const probe = window.scrollY + offset + 4;
      const tops = targets.map(
        (el) => el.getBoundingClientRect().top + window.scrollY
      );

      let currentIdx = 0;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= probe) currentIdx = i;
        else break;
      }

      const nextIdx =
        e.deltaY > 0
          ? Math.min(currentIdx + 1, targets.length - 1)
          : Math.max(currentIdx - 1, 0);

      if (nextIdx === currentIdx) return;

      e.preventDefault();
      lock = true;
      targets[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });

      // If we're landing on a project chapter from above, start its deck at
      // slide 0; if we're landing from below, show its last slide.
      const landingId = targets[nextIdx].id as SectionId;
      const landingDeck =
        landingId === 'oia' ? oiaRef.current : landingId === 'univ' ? univRef.current : null;
      if (landingDeck) {
        if (e.deltaY > 0) landingDeck.reset();
      }

      window.setTimeout(() => {
        lock = false;
      }, 750);
    };

    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [activeId]);

  const navItems: { id: SectionId; label: string; matches: SectionId[] }[] = [
    { id: 'hero', label: t.nav.hero, matches: ['hero'] },
    { id: 'about', label: t.nav.about, matches: ['about'] },
    { id: 'work-intro', label: t.nav.work, matches: WORK_IDS },
    { id: 'selected', label: 'Selected', matches: ['selected'] },
    { id: 'experience', label: t.nav.experience, matches: ['experience'] },
    { id: 'skills', label: t.nav.skills, matches: ['skills'] },
    { id: 'contact', label: t.nav.contact, matches: ['contact'] },
  ];

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className="deck-top">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          className="deck-brand font-serif"
        >
          Céline Choi
        </a>
        <nav className="deck-nav">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(n.id); }}
              className={`deck-nav-item ${n.matches.includes(activeId) ? 'is-active' : ''}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button onClick={toggle} className="deck-lang" aria-label="Toggle language">
          <span className={lang === 'ko' ? 'active' : ''}>KO</span>
          <span className="sep">·</span>
          <span className={lang === 'en' ? 'active' : ''}>EN</span>
        </button>
        <div className="deck-progress-line" aria-hidden="true">
          <span className="deck-progress-line-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <main className="page" role="main">
        <section id="hero" className="chapter">
          <HeroChapter />
        </section>
        <section id="about" className="chapter">
          <AboutChapter />
        </section>
        <section id="work-intro" className="chapter">
          <FeaturedIntroChapter />
        </section>
        <section id="oia" className="chapter chapter--project">
          <ProjectDeck
            ref={oiaRef}
            index={t.oiaBuilding.index}
            year={t.oiaBuilding.year}
            title={t.oiaBuilding.title}
            subtitle={t.oiaBuilding.subtitle}
            stack={t.oiaBuilding.stack}
            slides={t.oiaBuilding.slides as any}
          />
        </section>
        <section id="univ" className="chapter chapter--project">
          <ProjectDeck
            ref={univRef}
            index={t.univFinder.index}
            year={t.univFinder.year}
            title={t.univFinder.title}
            subtitle={t.univFinder.subtitle}
            stack={t.univFinder.stack}
            slides={t.univFinder.slides as any}
          />
        </section>
        <section id="selected" className="chapter chapter--flow">
          <SelectedChapter />
        </section>
        <section id="experience" className="chapter chapter--flow">
          <ExperienceChapter />
        </section>
        <section id="skills" className="chapter chapter--flow">
          <SkillsChapter />
        </section>
        <section id="contact" className="chapter">
          <ContactChapter />
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}

export default App;
