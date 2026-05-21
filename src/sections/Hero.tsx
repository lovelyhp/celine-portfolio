import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { BuildingDiagram } from '../components/BuildingDiagram';
import './Hero.css';

export function HeroChapter() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const buildingScale   = useTransform(scrollYProgress, [0, 1],        reduced ? [1, 1]    : [1, 1.85]);
  const buildingY       = useTransform(scrollYProgress, [0, 1],        reduced ? ['0%', '0%'] : ['0%', '-22%']);
  const buildingOpacity = useTransform(scrollYProgress, [0, 0.55, 1],  reduced ? [1, 1, 1] : [1, 0.7, 0]);
  const hintOpacity     = useTransform(scrollYProgress, [0, 0.25],     reduced ? [1, 1]    : [1, 0]);

  return (
    <div className="chapter-inner hero-inner" ref={heroRef}>
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="font-serif-italic">{t.meta.nameRoman}</span>
          <span className="hero-eyebrow-sep">·</span>
          <span>{(t.meta as any).role ?? 'AI 기획자 · 빌더'}</span>
        </div>

        <h1 className="hero-headline-en font-serif">
          {(t.meta as any).taglineEn ?? 'Planner, Builder, Operator.'}
        </h1>
        <h2 className="hero-headline-ko font-display">{t.meta.tagline}</h2>
        <p className="hero-sub">{t.meta.subtitle}</p>

        <div className="hero-stats">
          {t.hero.stats.map((s, i) => (
            <div key={i} className={`hero-stat ${i === 1 ? 'is-accent' : ''}`}>
              <div className="hero-stat-value font-num">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <motion.div
          className="hero-hint font-serif-italic"
          style={{ opacity: hintOpacity }}
        >
          {t.hero.hint}
        </motion.div>
      </div>

      <motion.div
        className="hero-right"
        style={{
          scale: buildingScale,
          y: buildingY,
          opacity: buildingOpacity,
          transformOrigin: 'center center',
        }}
      >
        <BuildingDiagram size="large" />
      </motion.div>
    </div>
  );
}
