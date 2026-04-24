import { useState, useEffect } from 'react';
import { LangProvider, useLang } from './context/LangContext';
import { HeroChapter } from './sections/Hero';
import { AboutChapter } from './sections/About';
import { FeaturedIntroChapter } from './sections/FeaturedIntro';
import { ProjectDeck } from './sections/ProjectDeck';
import { SelectedChapter } from './sections/Selected';
import { ExperienceChapter } from './sections/Experience';
import { SkillsChapter } from './sections/Skills';
import { ContactChapter } from './sections/Contact';
import './components/Deck.css';

const SECTION_IDS = ['hero', 'about', 'work', 'selected', 'experience', 'skills', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

function Shell() {
  const { t, toggle, lang } = useLang();
  const [activeId, setActiveId] = useState<SectionId>('hero');
  const [progress, setProgress] = useState(0);

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

  // Wheel → one gesture per snap target. The browser keeps native scrollbar
  // drag, keyboard, and touch scrolling; only the mouse wheel / trackpad is
  // intercepted so every flick moves exactly one section or slide.
  useEffect(() => {
    let lock = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const handler = (e: WheelEvent) => {
      // Ignore ctrl+wheel (browser zoom) and horizontal gestures.
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      // Ignore tiny residual wheel events (trackpad inertia tail).
      if (Math.abs(e.deltaY) < 8) return;

      if (lock) {
        e.preventDefault();
        return;
      }

      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('.chapter, .project-slide')
      );
      if (targets.length === 0) return;

      const offset = 64; // top nav height
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

      if (nextIdx === currentIdx) return; // at boundary, let the browser bounce

      e.preventDefault();
      lock = true;
      targets[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Hold the lock long enough to swallow trackpad inertia tails.
      window.setTimeout(() => {
        lock = false;
      }, 750);
    };

    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'hero', label: t.nav.hero },
    { id: 'about', label: t.nav.about },
    { id: 'work', label: t.nav.work },
    { id: 'selected', label: 'Selected' },
    { id: 'experience', label: t.nav.experience },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
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
              className={`deck-nav-item ${activeId === n.id ? 'is-active' : ''}`}
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
        <section id="work" className="chapter chapter--flow">
          <FeaturedIntroChapter />
          <ProjectDeck
            index={t.oiaBuilding.index}
            year={t.oiaBuilding.year}
            title={t.oiaBuilding.title}
            subtitle={t.oiaBuilding.subtitle}
            stack={t.oiaBuilding.stack}
            slides={t.oiaBuilding.slides as any}
          />
          <ProjectDeck
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
