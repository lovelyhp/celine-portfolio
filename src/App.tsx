import { useState, useEffect, useCallback, ReactNode } from 'react';
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

function Shell() {
  const { t, toggle, lang } = useLang();
  const [active, setActive] = useState(0);

  // navChapters = user-facing nav (compact)
  // target points into the full chapter list (which has 3 sub-chapters inside "Work")
  const navChapters = [
    { label: t.nav.hero, target: 0 },
    { label: t.nav.about, target: 1 },
    { label: t.nav.work, target: 2 },
    { label: 'Selected', target: 5 },
    { label: t.nav.experience, target: 6 },
    { label: t.nav.skills, target: 7 },
    { label: t.nav.contact, target: 8 },
  ];

  const chapters: ReactNode[] = [
    <HeroChapter />,
    <AboutChapter />,
    <FeaturedIntroChapter />,
    <ProjectDeck
      index={t.oiaBuilding.index}
      year={t.oiaBuilding.year}
      title={t.oiaBuilding.title}
      subtitle={t.oiaBuilding.subtitle}
      stack={t.oiaBuilding.stack}
      slides={t.oiaBuilding.slides as any}
      isActive={active === 3}
    />,
    <ProjectDeck
      index={t.univFinder.index}
      year={t.univFinder.year}
      title={t.univFinder.title}
      subtitle={t.univFinder.subtitle}
      stack={t.univFinder.stack}
      slides={t.univFinder.slides as any}
      isActive={active === 4}
    />,
    <SelectedChapter />,
    <ExperienceChapter />,
    <SkillsChapter />,
    <ContactChapter />,
  ];

  const total = chapters.length;

  const goto = useCallback(
    (i: number) => {
      if (i < 0 || i >= total) return;
      setActive(i);
      requestAnimationFrame(() => {
        const el = document.querySelectorAll<HTMLElement>('.chapter')[i];
        if (el) el.scrollTop = 0;
      });
    },
    [total]
  );

  const next = useCallback(() => goto(Math.min(active + 1, total - 1)), [active, total, goto]);
  const prev = useCallback(() => goto(Math.max(active - 1, 0)), [active, goto]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      if (e.key === 'Home') { e.preventDefault(); goto(0); }
      if (e.key === 'End') { e.preventDefault(); goto(total - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, goto, total]);

  // Wheel (after reaching bounds)
  useEffect(() => {
    let lock = false;
    const handler = (e: WheelEvent) => {
      if (lock) return;
      const el = document.querySelectorAll<HTMLElement>('.chapter')[active];
      if (!el) return;
      const atTop = el.scrollTop <= 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (e.deltaY > 30 && atBottom && active < total - 1) {
        lock = true; next();
        setTimeout(() => (lock = false), 900);
      } else if (e.deltaY < -30 && atTop && active > 0) {
        lock = true; prev();
        setTimeout(() => (lock = false), 900);
      }
    };
    window.addEventListener('wheel', handler, { passive: true });
    return () => window.removeEventListener('wheel', handler);
  }, [active, total, next, prev]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dy = e.changedTouches[0].clientY - startY;
      const el = document.querySelectorAll<HTMLElement>('.chapter')[active];
      if (!el) return;
      const atTop = el.scrollTop <= 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (dy < -60 && atBottom && active < total - 1) next();
      else if (dy > 60 && atTop && active > 0) prev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [active, total, next, prev]);

  // which nav pill is highlighted
  const activeNavIdx = navChapters.reduce(
    (best, nc, i) => (active >= nc.target ? i : best),
    0
  );

  return (
    <>
      <header className="deck-top">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); goto(0); }}
          className="deck-brand font-serif"
        >
          Céline Choi
        </a>
        <nav className="deck-nav">
          {navChapters.map((c, i) => (
            <button
              key={i}
              onClick={() => goto(c.target)}
              className={`deck-nav-item ${i === activeNavIdx ? 'is-active' : ''}`}
            >
              {c.label}
            </button>
          ))}
        </nav>
        <button onClick={toggle} className="deck-lang" aria-label="Toggle language">
          <span className={lang === 'ko' ? 'active' : ''}>KO</span>
          <span className="sep">·</span>
          <span className={lang === 'en' ? 'active' : ''}>EN</span>
        </button>
      </header>

      <div className="deck" role="main">
        {chapters.map((child, i) => (
          <div
            key={i}
            className={`chapter ${i === active ? 'is-active' : ''}`}
            aria-hidden={i !== active}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="deck-bottom">
        <div className="deck-progress">
          <span className="deck-progress-now font-mono-num">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="deck-progress-bar-track">
            <span
              className="deck-progress-bar-fill"
              style={{ width: `${((active + 1) / total) * 100}%` }}
            />
          </span>
          <span className="deck-progress-total font-mono-num">
            {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="deck-controls">
          <button className="deck-btn" onClick={prev} disabled={active === 0} aria-label="Previous">←</button>
          <button className="deck-btn" onClick={next} disabled={active === total - 1} aria-label="Next">→</button>
        </div>
      </div>
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
