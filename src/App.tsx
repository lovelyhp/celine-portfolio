import { useState, useEffect } from 'react';
import { LangProvider, useLang } from './context/LangContext';
import { HeroChapter } from './sections/Hero';
import { AboutChapter } from './sections/About';
import { CaseStudy } from './sections/CaseStudy';
import { SelectedChapter } from './sections/Selected';
import { ExperienceChapter } from './sections/Experience';
import { ContactChapter } from './sections/Contact';
import './components/Deck.css';

const SECTION_IDS = ['hero', 'about', 'oia', 'univ', 'selected', 'experience', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

const CHAPTER_TONE: Record<SectionId, 'dark' | 'light'> = {
  hero: 'dark',
  about: 'light',
  oia: 'dark',
  univ: 'dark',
  selected: 'light',
  experience: 'light',
  contact: 'dark',
};

function Shell() {
  const { t, toggle, lang } = useLang();
  const [activeId, setActiveId] = useState<SectionId>('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const pickActive = () => {
      const probe = window.innerHeight * 0.35;
      let best: SectionId = sections[0]?.id as SectionId ?? 'hero';
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= probe) {
          best = s.id as SectionId; // keep advancing — last matching wins
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

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'hero', label: t.nav.hero },
    { id: 'about', label: t.nav.about },
    { id: 'oia', label: 'OIA' },
    { id: 'univ', label: 'Univ' },
    { id: 'selected', label: 'Selected' },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ];

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navTone = CHAPTER_TONE[activeId];

  return (
    <>
      <header className={`deck-top deck-top--${navTone}`}>
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          className="deck-brand font-serif"
        >
          Céline Choi
        </a>
        <nav className="deck-nav" aria-label="Page navigation">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(n.id); }}
              className={`deck-nav-item ${n.id === activeId ? 'is-active' : ''}`}
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
        <section id="about" className="chapter chapter--warm chapter--flow">
          <AboutChapter />
        </section>
        <section id="oia" className="chapter chapter--flow">
          <CaseStudy
            index={t.oiaBuilding.index}
            year={t.oiaBuilding.year}
            title={t.oiaBuilding.title}
            subtitle={t.oiaBuilding.subtitle}
            stack={t.oiaBuilding.stack}
            slides={t.oiaBuilding.slides as any}
            buildingFloorMap={(t.oiaBuilding as any).buildingFloorMap}
          />
        </section>
        <section id="univ" className="chapter chapter--dark-soft chapter--flow">
          <CaseStudy
            index={t.univFinder.index}
            year={t.univFinder.year}
            title={t.univFinder.title}
            subtitle={t.univFinder.subtitle}
            stack={t.univFinder.stack}
            slides={t.univFinder.slides as any}
            showBuilding={false}
          />
        </section>
        <section id="selected" className="chapter chapter--light chapter--flow">
          <SelectedChapter />
        </section>
        <section id="experience" className="chapter chapter--warm chapter--flow">
          <ExperienceChapter />
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
