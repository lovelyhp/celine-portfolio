import { useState, useEffect } from 'react';
import { LangProvider, useLang } from './context/LangContext';
import { HeroChapter } from './sections/Hero';
import { WorkChapter } from './sections/Work';
import { AboutChapter } from './sections/About';
import { LabChapter } from './sections/Lab';
import { ContactChapter } from './sections/Contact';
import { LightboxProvider } from './components/Lightbox';
import './components/Deck.css';

const SECTION_IDS = ['hero', 'work', 'about', 'lab', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

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
    { id: 'work', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'lab', label: t.nav.lab },
    { id: 'contact', label: t.nav.contact },
  ];

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className="deck-top deck-top--light">
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
        <div className="deck-actions">
          <a
            className="deck-cv"
            href={t.contact.cvUrl}
            target="_blank"
            rel="noreferrer"
          >
            CV
          </a>
          <button onClick={toggle} className="deck-lang" aria-label="Toggle language">
            <span className={lang === 'ko' ? 'active' : ''}>KO</span>
            <span className="sep">·</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>
        </div>
        <div className="deck-progress-line" aria-hidden="true">
          <span className="deck-progress-line-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <main className="page" role="main">
        <section id="hero" className="chapter">
          <HeroChapter />
        </section>
        <section id="work" className="chapter chapter--flow">
          <WorkChapter />
        </section>
        <section id="about" className="chapter chapter--warm chapter--flow">
          <AboutChapter />
        </section>
        <section id="lab" className="chapter chapter--flow">
          <LabChapter />
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
      <LightboxProvider>
        <Shell />
      </LightboxProvider>
    </LangProvider>
  );
}

export default App;
