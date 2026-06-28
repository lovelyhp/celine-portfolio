import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import './Hero.css';

export function HeroChapter() {
  const { t, lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], reduced ? [1, 1] : [1, 0]);

  const rise = reduced
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="chapter-inner hero-inner" ref={heroRef}>
      <div className="hero-meta">
        <span className="hero-name font-serif">{t.meta.nameRoman}</span>
        <span className="hero-eyebrow">{t.meta.role}</span>
      </div>

      <p className="hero-headline-en font-serif">
        {(t.meta as any).taglineEn ?? 'Planner, Builder, Operator.'}
      </p>

      <motion.h1
        className={`hero-headline-ko font-display ${lang === 'en' ? 'is-en' : ''}`}
        {...rise}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {t.meta.tagline.split('\n').map((line, i, arr) => (
          <span key={i} className={i === arr.length - 1 ? 'hero-headline-accent' : undefined}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </motion.h1>

      <p className="hero-sub">{t.meta.subtitle}</p>

      <div className="hero-stats">
        {t.hero.stats.map((s, i) => (
          <div key={i} className={`hero-stat ${i === 1 ? 'is-accent' : ''}`}>
            <div className="hero-stat-value font-num">{s.value}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <motion.div className="hero-hint font-serif-italic" style={{ opacity: hintOpacity }}>
        {t.hero.hint}
      </motion.div>
    </div>
  );
}
