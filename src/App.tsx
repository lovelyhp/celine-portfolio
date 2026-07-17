import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LangProvider, useLang } from './context/LangContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LightboxProvider } from './components/Lightbox';
import { initSmoothScroll, scrollToTarget } from './lib/smoothScroll';
import { HomePage, SECTION_IDS, SectionId } from './pages/Home';
import { CaseStudyPage } from './pages/CaseStudyPage';
import './components/Deck.css';

function ThemeIcon({ theme }: { theme: 'light' | 'dark' }) {
  return theme === 'light' ? (
    // moon — 클릭하면 다크로
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
  ) : (
    // sun — 클릭하면 라이트로
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function Shell() {
  const { t, toggle, lang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';
  const [activeId, setActiveId] = useState<SectionId>('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    const pickActive = () => {
      if (onHome) {
        const probe = window.innerHeight * 0.35;
        let best: SectionId = 'hero';
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= probe) {
            best = id; // keep advancing — last matching wins
          }
        }
        setActiveId(best);
      }

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
  }, [onHome]);

  // 상세 페이지에서는 Work 탭을 활성으로 표시
  const highlightedId: SectionId = onHome ? activeId : 'work';

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'work', label: t.nav.work },
    { id: 'lab', label: t.nav.lab },
    { id: 'contact', label: t.nav.contact },
  ];

  const goToSection = (id: SectionId) => {
    if (onHome) {
      scrollToTarget(`#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      <header className="deck-top">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onHome) scrollToTarget(0);
            else navigate('/');
          }}
          className="deck-brand font-serif"
        >
          Céline Choi
        </a>
        <nav className="deck-nav" aria-label="Page navigation">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`/#${n.id}`}
              onClick={(e) => { e.preventDefault(); goToSection(n.id); }}
              className={`deck-nav-item ${n.id === highlightedId ? 'is-active' : ''}`}
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
          <button
            onClick={toggleTheme}
            className="deck-theme"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <ThemeIcon theme={theme} />
          </button>
        </div>
        <div className="deck-progress-line" aria-hidden="true">
          <span className="deck-progress-line-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:id" element={<CaseStudyPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-id">
            <Link to="/" className="site-footer-name font-serif">Céline Choi</Link>
            <span className="site-footer-copy">{t.footer.copyright}</span>
          </div>
          <div className="site-footer-links">
            <a href={t.contact.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${t.contact.email}`}>Email</a>
            <a href={t.contact.cvUrl} target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <LightboxProvider>
          <BrowserRouter>
            <Shell />
          </BrowserRouter>
        </LightboxProvider>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
