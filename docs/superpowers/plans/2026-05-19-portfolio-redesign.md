# Céline Choi Portfolio 전면 재디자인 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 Deep Violet Night 포트폴리오를 Charcoal × Amber + Pretendard/Newsreader 베이스로 재구축, 7 챕터 구조로 압축, OIA 빌딩 단면도를 시그니처 비주얼로 도입.

**Architecture:**
1. 디자인 토큰을 먼저 교체하고 bridge aliases(`--iris: var(--amber)` 등)로 기존 컴포넌트 호환 유지 → 한 단계씩 진행 중에도 화면이 깨지지 않음
2. `BuildingDiagram` 공용 컴포넌트 신규 (Hero·OIA Case·필요시 푸터에서 재사용)
3. 각 챕터를 차례로 재작성 (Hero → About+Method → CaseStudy → OIA Case → Univ Case → Selected → Experience+Skills → Contact)
4. `App.tsx`에서 7 챕터로 재구성, 휠 hijack 제거, IntersectionObserver로 nav 톤 자동 반전
5. 미사용 컴포넌트(Method, FeaturedIntro, Skills 단독, ProjectDeck) 정리 + bridge aliases 제거

**Tech Stack:** React 18, TypeScript, Vite, framer-motion 11 (유지), Pretendard Variable + Newsreader (Google Fonts), Vitest + @testing-library/react (테스트), 인라인 SVG (BuildingDiagram).

**Self-test 인프라:** 현재 프로젝트에 테스트 도구가 없음. Task 0에서 Vitest 도입.

---

## Task 0: 테스트 인프라 도입 (Vitest)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/setupTests.ts`

- [ ] **Step 1: 의존성 설치**

Run:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Expected: `package.json`의 devDependencies에 5개 패키지 추가됨, lockfile 갱신.

- [ ] **Step 2: vitest.config.ts 생성**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
  },
});
```

- [ ] **Step 3: setupTests.ts 생성**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: package.json scripts에 test 추가**

`package.json`의 `scripts`를 다음과 같이 수정:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:run": "vitest run"
}
```

- [ ] **Step 5: 정상 동작 확인용 sanity test**

Create `src/setupTests.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
describe('test infra', () => {
  it('works', () => expect(1 + 1).toBe(2));
});
```

Run: `npm run test:run`
Expected: `1 test passed` 출력.

- [ ] **Step 6: sanity test 삭제 후 commit**

```bash
rm src/setupTests.test.ts
git add package.json package-lock.json vitest.config.ts src/setupTests.ts
git commit -m "chore: add Vitest + React Testing Library"
```

---

## Task 1: 디자인 토큰 교체 — 컬러·타이포·폰트 로딩

**Files:**
- Modify: `index.html`
- Modify: `src/styles/global.css` (전체 재작성)

**의도:** 새 토큰을 추가하면서 기존 토큰(`--iris`, `--cream` 등)을 새 토큰의 alias로 매핑. 그러면 기존 컴포넌트들이 다음 태스크들에서 하나씩 교체될 때까지도 화면이 깨지지 않음.

- [ ] **Step 1: index.html에 Newsreader 로딩 추가**

`<head>` 안의 기존 Pretendard `<link>` 바로 아래에 추가:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap"
/>
```

- [ ] **Step 2: global.css 전체 재작성**

기존 `src/styles/global.css`의 내용을 다음으로 **완전 교체**:

```css
/* ─────────────────────────────────────────────────────
 * Design Tokens — Charcoal × Amber Editorial (v2)
 * ──────────────────────────────────────────────────── */
:root {
  /* Base */
  --ink:        #0B1220;
  --ink-soft:   #14171F;
  --ink-line:   rgba(250, 250, 248, 0.18);
  --ink-line-2: rgba(250, 250, 248, 0.30);

  /* Paper */
  --paper:      #FAFAF8;
  --paper-warm: #F4EDE0;
  --paper-line: rgba(11, 18, 32, 0.10);

  /* Accent */
  --amber:      #FBBF24;
  --amber-deep: #B8870C;

  /* Text on dark / light */
  --text-on-dark:        #FAFAF8;
  --text-on-dark-muted:  rgba(250, 250, 248, 0.72);
  --text-on-dark-faint:  rgba(250, 250, 248, 0.52);
  --text-on-light:       #14171F;
  --text-on-light-muted: rgba(20, 23, 31, 0.72);
  --text-on-light-faint: rgba(20, 23, 31, 0.52);

  /* Bridge aliases — 기존 컴포넌트 호환용. Task 13 cleanup에서 제거 */
  --night: var(--ink);
  --plum: var(--ink-soft);
  --plum-lift: var(--ink-soft);
  --iris: var(--amber);
  --lilac: var(--amber);
  --aurora: var(--amber);
  --cream: var(--text-on-dark);
  --cream-muted: var(--text-on-dark-muted);
  --cream-faint: var(--text-on-dark-faint);
  --cream-whisper: rgba(250, 250, 248, 0.15);
  --line: var(--ink-line);
  --line-strong: var(--ink-line-2);

  /* Fonts */
  --font-sans-ko:  'Pretendard Variable', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif-en: 'Newsreader', Georgia, 'Times New Roman', serif;

  /* Sizes (기존 유지, hero만 약간 키움) */
  --fs-hero:    clamp(2.75rem, 7vw, 6rem);
  --fs-display: clamp(2rem, 4.75vw, 3.75rem);
  --fs-h1:      clamp(1.5rem, 3vw, 2.375rem);
  --fs-h2:      clamp(1.25rem, 2.25vw, 1.75rem);
  --fs-h3:      clamp(1rem, 1.6vw, 1.3rem);
  --fs-body:    1rem;
  --fs-body-lg: 1.0625rem;
  --fs-small:   0.85rem;
  --fs-xs:      0.72rem;

  --max-w: 1320px;
  --pad-x: clamp(1.25rem, 4vw, 3rem);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
  scroll-padding-top: 3.75rem;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
body {
  font-family: var(--font-sans-ko);
  font-size: var(--fs-body);
  font-weight: 400;
  line-height: 1.65;
  color: var(--text-on-dark);
  background: var(--ink);
  font-feature-settings: 'kern' 1, 'liga' 1, 'ss03' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img, svg { display: block; max-width: 100%; }
button { font: inherit; cursor: pointer; border: none; background: transparent; color: inherit; }
a { color: inherit; text-decoration: none; }

/* Font helper classes — Task 2에서 컴포넌트들이 사용 */
.font-display {
  font-family: var(--font-sans-ko);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.05;
}
.font-serif {
  font-family: var(--font-serif-en);
  font-weight: 500;
  letter-spacing: -0.01em;
}
.font-serif-italic {
  font-family: var(--font-serif-en);
  font-style: italic;
  font-weight: 400;
}
.font-num {
  font-family: var(--font-serif-en);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.015em;
}
/* Bridge alias for legacy classes */
.font-italic-serif { font-family: var(--font-serif-en); font-style: italic; font-weight: 400; }
.font-mono-num { font-family: var(--font-serif-en); font-weight: 500; font-variant-numeric: tabular-nums; letter-spacing: -0.015em; }

#root {
  position: relative;
  background: var(--ink);
  overflow-x: clip;
}
/* ambient glow는 v2에서 제거됨 (단일 다크 톤의 주범) */

.page {
  position: relative;
  z-index: 1;
}

.chapter {
  position: relative;
  padding: clamp(4.5rem, 8vw, 6rem) var(--pad-x);
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chapter--flow {
  min-height: auto;
  justify-content: flex-start;
  padding-top: clamp(3rem, 6vw, 5rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
}
.chapter--light {
  background: var(--paper);
  color: var(--text-on-light);
}
.chapter--warm {
  background: var(--paper-warm);
  color: var(--text-on-light);
}
.chapter--dark-soft {
  background: var(--ink-soft);
}

.chapter-inner {
  max-width: var(--max-w);
  margin-inline: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-serif-en);
  font-style: italic;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--amber);
  margin-bottom: 1.25rem;
}
.chapter--light .section-label,
.chapter--warm .section-label { color: var(--amber-deep); }
.section-label::before {
  content: '';
  width: 2.5rem;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.chip {
  display: inline-block;
  padding: 0.28rem 0.7rem;
  border: 1px solid var(--ink-line-2);
  border-radius: 999px;
  font-size: var(--fs-xs);
  color: var(--text-on-dark-muted);
  letter-spacing: 0.02em;
  background: rgba(255, 255, 255, 0.03);
}
.chapter--light .chip,
.chapter--warm .chip {
  border-color: var(--paper-line);
  color: var(--text-on-light-muted);
  background: rgba(0, 0, 0, 0.02);
}

::selection {
  background: var(--amber);
  color: var(--ink);
}

*::-webkit-scrollbar { width: 8px; height: 8px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: rgba(250, 250, 248, 0.1); border-radius: 4px; }
*::-webkit-scrollbar-thumb:hover { background: rgba(250, 250, 248, 0.2); }

@media (max-width: 640px) {
  :root { --pad-x: 1.25rem; }
}
```

- [ ] **Step 3: 브라우저 확인**

Run: `npm run dev` (이미 떠 있다면 그대로)
Open: `http://localhost:5173`

Expected: 페이지가 깨지지 않고 뜸. 보라 톤 → 차콜+앰버로 전반적 색감 전환됨 (각 챕터는 아직 재작성 전이라 어색하지만 텍스트는 모두 읽힘). Newsreader가 italic 라벨 등에 적용된 게 보임. Ambient glow가 사라져 배경이 단순 다크.

- [ ] **Step 4: Commit**

```bash
git add index.html src/styles/global.css
git commit -m "feat(design): replace tokens with Charcoal x Amber + Newsreader, add bridge aliases"
```

---

## Task 2: 외부 폴더 자산을 public/images/로 정리

**Files:**
- Create: `public/images/` 디렉터리
- Copy: 외부 PNG 자산들

**의도:** 현재 `D:\projects\personal\celine-portfolio\` (코드 폴더 한 단계 위)에 흩어져 있는 캐릭터·고양이·인물 PNG 자산을 `celine-portfolio/public/images/` 하위로 옮겨, 코드에서 `/images/...`로 참조 가능하게 함.

- [ ] **Step 1: public/images/ 디렉터리 생성**

Run:
```bash
mkdir -p "D:/projects/personal/celine-portfolio/celine-portfolio/public/images"
```

- [ ] **Step 2: 캐릭터·고양이·인물 자산 복사**

Run (PowerShell이면 `Copy-Item`, bash이면 `cp`):
```bash
cd "D:/projects/personal/celine-portfolio"
cp cat-uboo.png catwheel.png catwheel_rotate.png desk.png Seo-Ah.png celine-portfolio/public/images/
cp student1.png student2.png student3.png student4.png celine-portfolio/public/images/
cp "Cheerful business mascot in chibi style.png" celine-portfolio/public/images/chibi-mascot.png
cp "Cheerful businessman in chibi style.png" celine-portfolio/public/images/chibi-businessman.png
cp "Cheerful chibi greeting with coffee cup.png" celine-portfolio/public/images/chibi-greeting.png
cp "Cheerful chibi office worker with pink accessories.png" celine-portfolio/public/images/chibi-pink.png
cp "Cheerful office mascot in chibi style.png" celine-portfolio/public/images/chibi-office-mascot.png
cp "Cheerful office worker in action.png" celine-portfolio/public/images/chibi-action.png
cp "Cheerful office worker in chibi style.png" celine-portfolio/public/images/chibi-worker.png
cp "Cheerful office worker with a thumbs-up.png" celine-portfolio/public/images/chibi-thumbsup.png
cp "Chibi businesswoman with tablet.png" celine-portfolio/public/images/chibi-tablet.png
cp "Chibi office worker with coffee.png" celine-portfolio/public/images/chibi-coffee.png
cp "Chibi woman in business attire with coffee.png" celine-portfolio/public/images/chibi-attire.png
cp "Energetic chibi with laptop charm.png" celine-portfolio/public/images/chibi-laptop.png
cp "Friendly chibi in business attire.png" celine-portfolio/public/images/chibi-friendly.png
cp "Friendly office mascot in chibi style.png" celine-portfolio/public/images/chibi-friendly-mascot.png
```

- [ ] **Step 3: 자산 확인**

Run:
```bash
ls "D:/projects/personal/celine-portfolio/celine-portfolio/public/images" | wc -l
```

Expected: 24개 (cat-uboo, catwheel ×2, desk, Seo-Ah, student ×4, chibi ×15).

- [ ] **Step 4: Commit**

```bash
cd "D:/projects/personal/celine-portfolio/celine-portfolio"
git add public/images
git commit -m "chore(assets): import character and cat photo assets to public/images"
```

---

## Task 3: BuildingDiagram 컴포넌트 (단위 테스트 포함)

**Files:**
- Create: `src/components/BuildingDiagram.tsx`
- Create: `src/components/BuildingDiagram.css`
- Create: `src/components/BuildingDiagram.test.tsx`

**의도:** Hero(large) + OIA Case sticky sidebar(standard) + 푸터 등(mini) 세 사이즈로 재사용 가능한 6층 빌딩 단면도 컴포넌트. `highlight` prop으로 특정 층 amber로 강조.

- [ ] **Step 1: 실패하는 테스트 작성**

`src/components/BuildingDiagram.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BuildingDiagram } from './BuildingDiagram';

describe('BuildingDiagram', () => {
  it('renders 6 floors with labels', () => {
    render(<BuildingDiagram />);
    expect(screen.getByText(/6F · 대표실 \+ 유부/)).toBeInTheDocument();
    expect(screen.getByText(/5F · Léa/)).toBeInTheDocument();
    expect(screen.getByText(/4F · Mail/)).toBeInTheDocument();
    expect(screen.getByText(/3F · Nomi/)).toBeInTheDocument();
    expect(screen.getByText(/2F · Solène/)).toBeInTheDocument();
    expect(screen.getByText(/1F · Reception/)).toBeInTheDocument();
  });

  it('marks the highlighted floor with a data attribute', () => {
    const { container } = render(<BuildingDiagram highlight={3} />);
    const highlighted = container.querySelector('[data-highlighted="true"]');
    expect(highlighted).not.toBeNull();
    expect(highlighted?.getAttribute('data-floor')).toBe('3');
  });

  it('applies size variant class', () => {
    const { container } = render(<BuildingDiagram size="mini" />);
    expect(container.querySelector('.building-diagram--mini')).not.toBeNull();
  });
});
```

- [ ] **Step 2: 테스트 실행하여 실패 확인**

Run: `npm run test:run -- BuildingDiagram`
Expected: 3개 테스트 모두 실패 ("Cannot find module './BuildingDiagram'").

- [ ] **Step 3: 컴포넌트 구현**

`src/components/BuildingDiagram.tsx`:
```tsx
import './BuildingDiagram.css';

type FloorIndex = 0 | 1 | 2 | 3 | 4 | 5;

export type BuildingSize = 'mini' | 'standard' | 'large';

export interface BuildingDiagramProps {
  /** 0 = ground floor (1F), 5 = top floor (6F). Highlights the given floor with amber. */
  highlight?: FloorIndex;
  size?: BuildingSize;
  /** If true, show full floor labels. False = only the floor number. */
  showLabels?: boolean;
}

const FLOORS = [
  { num: '6F', label: '대표실 + 유부' },
  { num: '5F', label: 'Léa (MoU)' },
  { num: '4F', label: 'Mail (154통)' },
  { num: '3F', label: 'Nomi (8건)' },
  { num: '2F', label: 'Solène (밸런스)' },
  { num: '1F', label: 'Reception' },
];

export function BuildingDiagram({
  highlight,
  size = 'standard',
  showLabels = true,
}: BuildingDiagramProps) {
  return (
    <div className={`building-diagram building-diagram--${size}`}>
      <div className="building-diagram__roof">OIA · EST. 2026</div>
      <div className="building-diagram__body">
        {FLOORS.map((f, i) => {
          // FLOORS는 6F → 1F 순서이므로 highlight index와 매칭 시 5 - i
          const floorIndex = 5 - i;
          const isHighlighted = highlight === floorIndex;
          return (
            <div
              key={f.num}
              className="building-diagram__floor"
              data-floor={floorIndex}
              data-highlighted={isHighlighted}
            >
              <span className="building-diagram__floor-num">{f.num}</span>
              {showLabels && (
                <span className="building-diagram__floor-label">· {f.label}</span>
              )}
              <span className="building-diagram__lights">
                <span className={isHighlighted ? 'on' : 'off'} />
                <span className={isHighlighted ? 'on' : ''} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

`src/components/BuildingDiagram.css`:
```css
.building-diagram {
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans-ko);
  color: var(--text-on-dark);
}
.building-diagram__roof {
  font-family: var(--font-serif-en);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--amber);
  text-align: center;
  letter-spacing: 0.08em;
  padding: 0.4rem 0;
}
.building-diagram__body {
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--text-on-dark);
  border-radius: 6px 6px 0 0;
  background: rgba(250, 250, 248, 0.02);
  flex: 1;
}
.building-diagram__floor {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid var(--ink-line);
  font-size: 0.72rem;
  color: var(--text-on-dark-muted);
  transition: background 0.25s ease, color 0.25s ease;
  min-height: 2.2rem;
}
.building-diagram__floor:last-child { border-bottom: none; }
.building-diagram__floor[data-highlighted="true"] {
  background: rgba(251, 191, 36, 0.10);
  color: var(--amber);
  box-shadow: inset 3px 0 0 var(--amber);
}
.building-diagram__floor-num {
  font-weight: 700;
  letter-spacing: 0.04em;
  font-family: var(--font-serif-en);
}
.building-diagram__floor-label {
  font-size: 0.7rem;
  opacity: 0.85;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
.building-diagram__lights {
  display: flex;
  gap: 3px;
  margin-left: auto;
}
.building-diagram__lights span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(250, 250, 248, 0.20);
  display: inline-block;
}
.building-diagram__lights span.on { background: var(--amber); }
.building-diagram__lights span.off { background: rgba(250, 250, 248, 0.18); }

/* Sizes */
.building-diagram--mini { width: 80px; }
.building-diagram--mini .building-diagram__roof { font-size: 0.55rem; padding: 2px 0; }
.building-diagram--mini .building-diagram__floor { min-height: 1.1rem; padding: 0 0.3rem; font-size: 0; }
.building-diagram--mini .building-diagram__floor-num,
.building-diagram--mini .building-diagram__floor-label { display: none; }
.building-diagram--mini .building-diagram__lights span { width: 3px; height: 3px; }

.building-diagram--standard { width: 100%; max-width: 200px; }
.building-diagram--standard .building-diagram__floor { min-height: 2rem; }

.building-diagram--large { width: 100%; max-width: 320px; }
.building-diagram--large .building-diagram__roof { font-size: 0.95rem; padding: 0.55rem 0; }
.building-diagram--large .building-diagram__floor { min-height: 2.8rem; font-size: 0.82rem; }
.building-diagram--large .building-diagram__floor-label { font-size: 0.78rem; }

/* Light background variant (used in About+Method 등) */
.chapter--light .building-diagram,
.chapter--warm .building-diagram { color: var(--text-on-light); }
.chapter--light .building-diagram__body,
.chapter--warm .building-diagram__body { border-color: var(--text-on-light); }
.chapter--light .building-diagram__floor,
.chapter--warm .building-diagram__floor { color: var(--text-on-light-muted); border-bottom-color: var(--paper-line); }
.chapter--light .building-diagram__roof,
.chapter--warm .building-diagram__roof { color: var(--amber-deep); }
.chapter--light .building-diagram__floor[data-highlighted="true"],
.chapter--warm .building-diagram__floor[data-highlighted="true"] {
  background: rgba(251, 191, 36, 0.15);
  color: var(--amber-deep);
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm run test:run -- BuildingDiagram`
Expected: 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/BuildingDiagram.tsx src/components/BuildingDiagram.css src/components/BuildingDiagram.test.tsx
git commit -m "feat(components): add BuildingDiagram component (3 sizes, highlight prop, tested)"
```

---

## Task 4: Hero 챕터 재작성 (그리드 + 빌딩)

**Files:**
- Modify: `src/sections/Hero.tsx` (재작성)
- Modify: `src/sections/Hero.css` (재작성)
- Modify: `src/content/ko.ts` + `src/content/en.ts` (헤드라인 영문판 추가, hero.hint 변경)

- [ ] **Step 1: 콘텐츠 텍스트 보강**

`src/content/ko.ts`의 `meta` 객체를 다음으로 교체:
```ts
meta: {
  nameRoman: 'Céline Choi',
  role: 'AI 기획자 · 빌더',
  taglineEn: 'Planner, Builder, Operator.',
  tagline: '평범한 교직원이\nAI로 일하는 법, 한 권의 빌딩.',
  subtitle:
    '이메일·번역·통계·검증을 15명의 AI 비서에게 위임하고, 저는 기획·협상에 집중합니다.',
},
```

`src/content/ko.ts`의 `hero.hint`를:
```ts
hint: 'Enter the building ↓',
```

`src/content/en.ts`의 `meta`도 동일 구조로 (영어 번역 텍스트):
```ts
meta: {
  nameRoman: 'Céline Choi',
  role: 'AI Planner & Builder',
  taglineEn: 'Planner, Builder, Operator.',
  tagline: 'A university administrator\nwho rebuilt her workplace, one floor at a time.',
  subtitle:
    'I delegate email, translation, statistics, and verification to fifteen AI assistants, and focus on strategy and negotiation.',
},
```
`hero.hint` (영문):
```ts
hint: 'Enter the building ↓',
```

- [ ] **Step 2: Hero.tsx 재작성**

```tsx
import { useLang } from '../context/LangContext';
import { BuildingDiagram } from '../components/BuildingDiagram';
import './Hero.css';

export function HeroChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner hero-inner">
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

        <div className="hero-hint font-serif-italic">{t.hero.hint}</div>
      </div>

      <div className="hero-right">
        <BuildingDiagram size="large" />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Hero.css 재작성**

```css
.hero-inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
  min-height: 100%;
}
.hero-left { display: flex; flex-direction: column; }
.hero-right { display: flex; justify-content: center; align-items: center; }

.hero-eyebrow {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-on-dark-muted);
  margin-bottom: 1.25rem;
}
.hero-eyebrow .font-serif-italic { color: var(--amber); font-size: 1.05rem; }
.hero-eyebrow-sep { opacity: 0.5; }

.hero-headline-en {
  font-size: clamp(1.5rem, 2.4vw, 2.1rem);
  color: var(--text-on-dark-muted);
  font-weight: 500;
  letter-spacing: -0.015em;
  margin-bottom: 0.4rem;
}
.hero-headline-ko {
  font-size: var(--fs-hero);
  color: var(--text-on-dark);
  white-space: pre-line;
  word-break: keep-all;
  letter-spacing: -0.03em;
  max-width: 18ch;
  margin-bottom: 1.25rem;
}
.hero-headline-ko::after {
  content: '';
  display: block;
  width: 3rem;
  height: 3px;
  background: var(--amber);
  margin-top: 1.1rem;
}
.hero-sub {
  font-size: clamp(1rem, 1.3vw, 1.1rem);
  color: var(--text-on-dark-muted);
  max-width: 52ch;
  line-height: 1.6;
  margin-bottom: 2.25rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ink-line);
  max-width: 720px;
}
.hero-stat-value {
  font-size: clamp(1.4rem, 2.2vw, 1.85rem);
  color: var(--text-on-dark);
  white-space: nowrap;
}
.hero-stat.is-accent .hero-stat-value { color: var(--amber); }
.hero-stat-label {
  font-size: 0.78rem;
  color: var(--text-on-dark-faint);
  margin-top: 0.35rem;
  letter-spacing: 0.02em;
  line-height: 1.35;
}

.hero-hint {
  margin-top: 2.5rem;
  font-size: 0.95rem;
  color: var(--text-on-dark-faint);
}

@media (max-width: 880px) {
  .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .hero-right { order: -1; max-width: 220px; margin: 0 auto; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
}
```

- [ ] **Step 4: 브라우저에서 Hero 확인**

Run: `npm run dev` (떠 있으면 자동 reload)
Open: `http://localhost:5173`

Expected: 다크 차콜 배경 위에 좌측 영문(Newsreader) + 한글 헤드라인(Pretendard 800) + amber 밑줄 + 4개 stats(2번째가 amber), 우측에 BuildingDiagram large. 모바일 폭(~640px)에서 빌딩이 위로 올라가고 stats가 2×2로 정렬되는지 확인.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Hero.tsx src/sections/Hero.css src/content/ko.ts src/content/en.ts
git commit -m "feat(hero): rebuild Hero with split grid layout + BuildingDiagram"
```

---

## Task 5: About + Method 통합

**Files:**
- Modify: `src/sections/About.tsx` (Method 흡수)
- Modify: `src/sections/About.css` (재작성, 라이트 배경 가정)

**의도:** 별도 Method 챕터는 폐지하고, About 본문 아래에 6단계 method를 inline horizontal list로 표시. 챕터 자체는 `chapter--warm`(라이트 배경)으로 전환.

- [ ] **Step 1: About.tsx 재작성**

```tsx
import { useLang } from '../context/LangContext';
import './About.css';

export function AboutChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner about-inner">
      <div className="about-head">
        <div className="section-label">
          <span>{t.about.number}</span>
          <span className="font-serif-italic">{t.about.title}</span>
        </div>
        <h2 className="about-heading font-display">{t.about.title}</h2>
      </div>

      <div className="about-body">
        {t.about.body.map((p, i) => (
          <p key={i} className={i === t.about.body.length - 1 ? 'about-last' : ''}>{p}</p>
        ))}

        <div className="about-method">
          <div className="about-method-label font-serif-italic">How I Work</div>
          <ol className="about-method-list">
            {t.method.steps.map((s) => (
              <li key={s.id} className="about-method-item">
                <span className="about-method-id font-num">{s.id}</span>
                <span className="about-method-name">{s.label}</span>
                <span className="about-method-desc">{s.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: About.css 재작성**

```css
.about-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-content: start;
}
.about-head { position: sticky; top: 6rem; align-self: start; }
.about-heading {
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--text-on-light);
  letter-spacing: -0.025em;
  font-family: var(--font-sans-ko);
  font-weight: 800;
}
.about-body p {
  font-size: var(--fs-body-lg);
  line-height: 1.85;
  color: var(--text-on-light-muted);
  margin-bottom: 1.25rem;
  max-width: 62ch;
}
.about-body p.about-last {
  color: var(--amber-deep);
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: -0.015em;
  margin-top: 1rem;
  margin-bottom: 0;
}

.about-method {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--paper-line);
}
.about-method-label {
  color: var(--amber-deep);
  font-size: 1.05rem;
  margin-bottom: 1.25rem;
}
.about-method-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem 1.75rem;
}
.about-method-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 0.85rem;
}
.about-method-id {
  grid-row: 1 / 3;
  font-size: 1.6rem;
  color: var(--amber-deep);
  align-self: start;
  line-height: 1;
}
.about-method-name {
  font-weight: 700;
  color: var(--text-on-light);
  font-size: 1rem;
  margin-bottom: 0.2rem;
}
.about-method-desc {
  font-size: 0.85rem;
  color: var(--text-on-light-muted);
  line-height: 1.5;
}

@media (max-width: 880px) {
  .about-inner { grid-template-columns: 1fr; }
  .about-head { position: static; }
  .about-method-list { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .about-method-list { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: 브라우저 확인**

Open Hero 다음 챕터(About)로 스크롤.

Expected: 라이트 페이퍼 톤 배경. 좌측에 "I" 라벨 + About 큰 헤드라인. 우측에 본문 3문단 + 그 아래 "How I Work" inline 6단계 그리드. 마지막 문단이 amber 강조색. 모바일에서는 1열로 무너지고 method가 2열로.

- [ ] **Step 4: Commit**

```bash
git add src/sections/About.tsx src/sections/About.css
git commit -m "feat(about): integrate Method 6-step into About chapter"
```

---

## Task 6: CaseStudy 공용 컴포넌트

**Files:**
- Create: `src/sections/CaseStudy.tsx`
- Create: `src/sections/CaseStudy.css`

**의도:** OIA·Univ 두 케이스가 공유할 세로 case study 컴포넌트. 좌측 sticky 메타+빌딩, 우측 long-page 콘텐츠. 슬라이드 배열을 그대로 받아 세로 섹션으로 펼침.

- [ ] **Step 1: CaseStudy.tsx 작성**

```tsx
import { useEffect, useRef, useState } from 'react';
import { BuildingDiagram } from '../components/BuildingDiagram';
import './CaseStudy.css';

// ko.ts/en.ts의 슬라이드 타입을 직접 가져오지 않고 narrow한 타입만 정의 (각 슬라이드는 'kind' 필드로 분기)
export type CaseSlide =
  | { kind: 'cover'; heading: string; sub: string; body: string; videoSrc?: string; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'section'; tag: string; heading: string; body: string[]; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'result'; tag: string; heading: string; body: Array<{ h: string; p: string }>; imageSrc?: string | null; imageCaption?: string; imageHint?: string }
  | { kind: 'scenes'; tag: string; heading: string; scenes: string[]; closing: { h: string; p: string }; imageSrc?: string | null; imageCaption?: string };

export interface CaseStudyProps {
  index: string;
  year: string;
  title: string;
  subtitle: string;
  stack: string[];
  slides: CaseSlide[];
  /** 0~5 사이의 층 인덱스 배열. 각 슬라이드와 1:1로 매핑되어 sticky 빌딩에서 highlight됨. */
  buildingFloorMap?: Array<0 | 1 | 2 | 3 | 4 | 5 | null>;
  /** true이면 좌측 sticky sidebar에 BuildingDiagram을 표시. false면 메타 정보만. */
  showBuilding?: boolean;
}

export function CaseStudy({
  index, year, title, subtitle, stack, slides,
  buildingFloorMap, showBuilding = true,
}: CaseStudyProps) {
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const targets = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // viewport 중앙에 가장 가까운 슬라이드 인덱스 추출
        const inView = entries.filter((e) => e.isIntersecting);
        if (inView.length === 0) return;
        const best = inView.reduce((acc, cur) =>
          cur.intersectionRatio > acc.intersectionRatio ? cur : acc
        );
        const idx = targets.indexOf(best.target as HTMLDivElement);
        if (idx >= 0) setActiveIdx(idx);
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [slides.length]);

  const activeFloor = buildingFloorMap?.[activeIdx] ?? undefined;

  return (
    <div className="chapter-inner case-inner">
      <aside className="case-aside">
        <div className="case-meta">
          <div className="section-label">
            <span>{index}</span>
            <span className="font-serif-italic">Case Study · {year}</span>
          </div>
          <h2 className="case-title font-display">{title}</h2>
          <p className="case-subtitle">{subtitle}</p>
          <div className="case-stack">
            {stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
        {showBuilding && (
          <div className="case-building">
            <BuildingDiagram size="standard" highlight={activeFloor as any} />
          </div>
        )}
      </aside>

      <div className="case-content">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className={`case-slide case-slide--${slide.kind}`}
          >
            <CaseSlideRender slide={slide} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseSlideRender({ slide }: { slide: CaseSlide }) {
  if (slide.kind === 'cover') {
    return (
      <>
        {slide.videoSrc && (
          <div className="case-media">
            <video src={`/${slide.videoSrc}`} autoPlay muted loop playsInline />
          </div>
        )}
        <h3 className="case-heading font-display">{slide.heading}</h3>
        <p className="case-lede font-serif-italic">{slide.sub}</p>
        <p className="case-body">{slide.body}</p>
      </>
    );
  }
  if (slide.kind === 'section') {
    return (
      <>
        <div className="case-tag font-serif-italic">{slide.tag}</div>
        <h3 className="case-heading font-display">{slide.heading}</h3>
        {slide.body.map((p, i) => <p key={i} className="case-body">{p}</p>)}
        {slide.imageSrc && (
          <figure className="case-figure">
            <img src={`/images/${slide.imageSrc}`} alt={slide.imageCaption ?? ''} />
            {slide.imageCaption && <figcaption>{slide.imageCaption}</figcaption>}
          </figure>
        )}
      </>
    );
  }
  if (slide.kind === 'result') {
    return (
      <>
        <div className="case-tag font-serif-italic">{slide.tag}</div>
        <h3 className="case-heading font-display">{slide.heading}</h3>
        <div className="case-result-grid">
          {slide.body.map((item, i) => (
            <div key={i} className="case-result-item">
              {item.h && <h4 className="case-result-h">{item.h}</h4>}
              <p>{item.p}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
  // scenes
  return (
    <>
      <div className="case-tag font-serif-italic">{slide.tag}</div>
      <h3 className="case-heading font-display">{slide.heading}</h3>
      <ul className="case-scenes">
        {slide.scenes.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <div className="case-closing">
        <h4>{slide.closing.h}</h4>
        <p>{slide.closing.p}</p>
      </div>
    </>
  );
}
```

- [ ] **Step 2: CaseStudy.css 작성**

```css
.case-inner {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(0, 2.4fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}
.case-aside {
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.case-title {
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  color: var(--text-on-dark);
  margin-bottom: 0.6rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}
.case-subtitle {
  font-size: 1rem;
  color: var(--text-on-dark-muted);
  margin-bottom: 1.1rem;
}
.case-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}
.case-building { max-width: 220px; }

.case-content { display: flex; flex-direction: column; gap: 5rem; }

.case-slide {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--ink-line);
}
.case-slide:last-child { border-bottom: none; }

.case-tag {
  color: var(--amber);
  font-size: 1rem;
  letter-spacing: 0.04em;
}
.case-heading {
  font-size: clamp(1.4rem, 2.4vw, 2rem);
  color: var(--text-on-dark);
  letter-spacing: -0.02em;
}
.case-lede {
  color: var(--amber);
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
}
.case-body {
  font-size: var(--fs-body-lg);
  line-height: 1.8;
  color: var(--text-on-dark-muted);
  max-width: 70ch;
}
.case-media {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 10px;
  overflow: hidden;
  background: var(--ink-soft);
  margin-bottom: 1rem;
}
.case-media video { width: 100%; height: 100%; object-fit: cover; }
.case-figure { margin-top: 1rem; }
.case-figure img {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--ink-line);
}
.case-figure figcaption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-on-dark-faint);
  font-style: italic;
}

.case-result-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.4rem;
  margin-top: 0.8rem;
}
.case-result-item {
  padding: 1.3rem 1.5rem;
  background: var(--ink-soft);
  border-left: 3px solid var(--amber);
  border-radius: 6px;
}
.case-result-h {
  font-size: 1.1rem;
  color: var(--text-on-dark);
  margin-bottom: 0.6rem;
  font-weight: 700;
}
.case-result-item p {
  color: var(--text-on-dark-muted);
  line-height: 1.75;
}

.case-scenes {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-left: 0;
  margin-top: 0.4rem;
}
.case-scenes li {
  position: relative;
  padding-left: 1.5rem;
  color: var(--text-on-dark-muted);
  line-height: 1.75;
  font-size: var(--fs-body-lg);
}
.case-scenes li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.85rem;
  width: 0.8rem;
  height: 1px;
  background: var(--amber);
}
.case-closing {
  margin-top: 1.5rem;
  padding: 1.4rem 1.6rem;
  background: rgba(251, 191, 36, 0.08);
  border-radius: 8px;
}
.case-closing h4 {
  font-size: 1.05rem;
  color: var(--amber);
  margin-bottom: 0.5rem;
  font-weight: 700;
}
.case-closing p { color: var(--text-on-dark-muted); line-height: 1.75; }

@media (max-width: 880px) {
  .case-inner { grid-template-columns: 1fr; }
  .case-aside {
    position: relative;
    top: auto;
    flex-direction: row;
    align-items: flex-start;
    gap: 1.25rem;
  }
  .case-building { max-width: 100px; }
}
@media (max-width: 560px) {
  .case-aside { flex-direction: column; }
  .case-building { display: none; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/CaseStudy.tsx src/sections/CaseStudy.css
git commit -m "feat(case): add reusable CaseStudy component with sticky aside + building highlight"
```

---

## Task 7: OIA Case Study 적용

**Files:**
- App.tsx에서 OIA 섹션이 CaseStudy를 사용하도록 변경(Task 12에서 전체 App.tsx 재구성). 본 태스크에서는 콘텐츠 측 보강만.
- Modify: `src/content/ko.ts`·`en.ts` (각 슬라이드 `imageSrc`를 실제 파일명으로 채우거나 의도된 placeholder로 정리)

**의도:** CaseStudy 컴포넌트의 입력값(슬라이드 배열)을 검증·정리하고, OIA의 빌딩 층 매핑(`buildingFloorMap`)을 정의.

- [ ] **Step 1: ko.ts OIA 슬라이드 imageSrc 보강**

`src/content/ko.ts`의 `oiaBuilding.slides` 각 항목에서 `imageSrc: null`을 다음으로 교체:

| 슬라이드 인덱스 | imageSrc 값 |
|---|---|
| 0 (cover) | 그대로 `null` 유지 (videoSrc로 처리됨) |
| 1 (PROBLEM) | `null` 유지 (아직 스크린샷 없음 — 추후 보강) |
| 2 (APPROACH I) | `null` 유지 |
| 3 (APPROACH II) | `null` 유지 |
| 4 (APPROACH III) | `'Seo-Ah.png'` (대표실 클로즈업 대용) |
| 5 (APPROACH IV) | `'chibi-friendly-mascot.png'` (풀가동 비서 대표 이미지) |
| 6 (APPROACH V) | `null` 유지 |
| 7 (RESULT) | `null` 유지 |
| 8 (SCENES) | `'cat-uboo.png'` (유부 사진) |

`en.ts`도 동일하게.

- [ ] **Step 2: 빌딩 층 매핑 상수 정의**

`src/content/ko.ts`와 `en.ts`의 `oiaBuilding` 객체 마지막에 추가:
```ts
buildingFloorMap: [null, 2, null, null, 5, null, 5, 5, 0] as const,
```

매핑 의미:
- 0 (cover): 매핑 없음
- 1 (PROBLEM): 4F Mail = floor index 2 (0=1F, 5=6F → 4F=2)
- 4 (APPROACH III): 6F 대표실 = floor 5
- 6 (APPROACH IV / peak): 6F = 5 (모든 층이지만 대표 highlight는 6F)
- 7 (RESULT) / 8 (SCENES): 마무리 — 1F·6F (선택). 8 SCENES은 1F로 매핑.

- [ ] **Step 3: Univ Case도 동일하게 (간단)**

`src/content/ko.ts`·`en.ts`의 `univFinder` 객체 마지막에 추가:
```ts
buildingFloorMap: [null, null, null, null] as const,
showBuilding: false,
```

(Univ Case는 빌딩이 시각 메타포에 안 맞으므로 sidebar에 빌딩 표시 안 함.)

- [ ] **Step 4: Commit**

```bash
git add src/content/ko.ts src/content/en.ts
git commit -m "content: add imageSrc and buildingFloorMap for OIA/Univ case studies"
```

---

## Task 8: Univ Finder Case 적용

**Files:**
- 콘텐츠 정리 (Task 7에서 처리됨).
- 본 태스크는 추가 작업 없이 CaseStudy 컴포넌트가 Univ 콘텐츠도 잘 렌더하는지 확인하는 단계.

**의도:** Univ Case는 슬라이드가 4개(cover/PROBLEM/APPROACH/RESULT)뿐이라 CaseStudy 컴포넌트가 그대로 처리 가능. `showBuilding={false}` props로 차별화.

- [ ] **Step 1: 빈 placeholder 슬라이드의 시각 보강**

`src/content/ko.ts`의 `univFinder.slides[0]`(cover) 본문 살짝 다듬기:
```ts
{
  kind: 'cover',
  heading: 'OIA University Finder',
  sub: '265개 해외대학을 직관적으로 — D3.js 기반 인터랙티브 대시보드',
  body:
    '학생들의 반복 FAQ를 도구로 전환했습니다. 자기 조건으로 필터링·즐겨찾기·CSV 내보내기가 가능한 대시보드.',
  imageSrc: null,
  imageCaption: 'Univ Finder 메인 화면',
  imageHint: 'oiaunivfinder.netlify.app 메인 뷰 스크린샷',
},
```

- [ ] **Step 2: 빌드 검증**

Run: `npm run build`
Expected: 빌드 성공 (TS 에러 없음).

- [ ] **Step 3: Commit (변경 있을 경우만)**

```bash
git add src/content/ko.ts
git commit -m "content(univ): polish cover slide copy"
```

---

## Task 9: Selected Works — 카드 그리드 재작성

**Files:**
- Modify: `src/sections/Selected.tsx`
- Modify: `src/sections/Selected.css` (재작성)

- [ ] **Step 1: Selected.tsx 재작성**

```tsx
import { useLang } from '../context/LangContext';
import './Selected.css';

export function SelectedChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner selected-inner">
      <div className="selected-head">
        <div className="section-label">
          <span>{t.selected.number}</span>
          <span className="font-serif-italic">Selected Works</span>
        </div>
        <h2 className="selected-heading font-display">{t.selected.title}</h2>
        <p className="selected-intro">{t.selected.intro}</p>
      </div>

      <ol className="selected-grid">
        {t.selected.projects.map((p, i) => (
          <li key={i} className={`selected-card ${i === t.selected.projects.length - 1 ? 'is-wide' : ''}`}>
            <div className="selected-card-meta">
              <span className="selected-card-year font-num">{p.year}</span>
              <div className="selected-card-stack">
                {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
            <h3 className="selected-card-title font-display">{p.title}</h3>
            <p className="selected-card-body">{p.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 2: Selected.css 재작성**

```css
.selected-inner { color: var(--text-on-light); }
.selected-head { margin-bottom: 2.5rem; max-width: 60ch; }
.selected-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text-on-light);
  letter-spacing: -0.025em;
  font-weight: 800;
}
.selected-intro {
  font-size: 1.05rem;
  color: var(--text-on-light-muted);
  margin-top: 0.75rem;
}

.selected-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.selected-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.75rem 1.85rem;
  background: var(--paper);
  border: 1px solid var(--paper-line);
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.selected-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(20, 23, 31, 0.06);
}
.selected-card.is-wide { grid-column: 1 / -1; }

.selected-card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.selected-card-year {
  font-size: 0.9rem;
  color: var(--amber-deep);
}
.selected-card-stack { display: flex; gap: 0.4rem; flex-wrap: wrap; }

.selected-card-title {
  font-size: 1.4rem;
  color: var(--text-on-light);
  letter-spacing: -0.02em;
  font-weight: 800;
}
.selected-card-body {
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--text-on-light-muted);
}

@media (max-width: 720px) {
  .selected-grid { grid-template-columns: 1fr; }
  .selected-card.is-wide { grid-column: auto; }
}
```

- [ ] **Step 3: 브라우저 확인**

스크롤하여 Selected 챕터 확인.
Expected: 라이트 페이퍼 배경 위 2×2 카드 + 마지막 카드(마크롱 특강)가 가로 2칸을 차지.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Selected.tsx src/sections/Selected.css
git commit -m "feat(selected): rebuild Selected Works as 2x2 grid with featured wide card"
```

---

## Task 10: Experience + Skills 통합

**Files:**
- Modify: `src/sections/Experience.tsx` (Skills 흡수)
- Modify: `src/sections/Experience.css` (재작성)

- [ ] **Step 1: Experience.tsx 재작성**

```tsx
import { useLang } from '../context/LangContext';
import './Experience.css';

export function ExperienceChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner experience-inner">
      <div className="exp-head">
        <div className="section-label">
          <span>{t.experience.number}</span>
          <span className="font-serif-italic">Experience & Skills</span>
        </div>
        <h2 className="exp-heading font-display">Experience & Education</h2>
      </div>

      <div className="exp-grid">
        <div className="exp-main">
          <section className="exp-block">
            <h3 className="exp-block-h font-serif-italic">Roles</h3>
            <ul className="exp-list">
              {t.experience.roles.map((r, i) => (
                <li key={i} className="exp-item">
                  <div className="exp-item-head">
                    <span className="exp-item-org">{r.org}</span>
                    <span className="exp-item-period font-num">{r.period}</span>
                  </div>
                  <div className="exp-item-role">{r.position}</div>
                  <ul className="exp-bullets">
                    {r.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="exp-block">
            <h3 className="exp-block-h font-serif-italic">Education</h3>
            <ul className="exp-list">
              {t.experience.education.map((e, i) => (
                <li key={i} className="exp-item">
                  <div className="exp-item-head">
                    <span className="exp-item-org">{e.school}</span>
                    <span className="exp-item-period font-num">{e.period}</span>
                  </div>
                  <div className="exp-item-role">{e.degree}</div>
                  {e.bullets.length > 0 && (
                    <ul className="exp-bullets">
                      {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="exp-skills">
          <h3 className="exp-block-h font-serif-italic">Skills</h3>
          {t.skills.groups.map((g, i) => (
            <div key={i} className="exp-skill-group">
              <h4 className="exp-skill-head">{g.heading}</h4>
              <p className="exp-skill-items">{g.items}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Experience.css 재작성**

```css
.experience-inner { color: var(--text-on-light); }
.exp-head { margin-bottom: 2.5rem; }
.exp-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text-on-light);
  letter-spacing: -0.025em;
  font-weight: 800;
}

.exp-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: start;
}
.exp-main { display: flex; flex-direction: column; gap: 3rem; }
.exp-block-h {
  color: var(--amber-deep);
  font-size: 1.15rem;
  margin-bottom: 1.25rem;
}

.exp-list { list-style: none; display: flex; flex-direction: column; gap: 1.75rem; }
.exp-item { padding-bottom: 1.5rem; border-bottom: 1px solid var(--paper-line); }
.exp-item:last-child { border-bottom: none; padding-bottom: 0; }
.exp-item-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}
.exp-item-org {
  font-weight: 700;
  color: var(--text-on-light);
  font-size: 1.05rem;
}
.exp-item-period {
  font-size: 0.85rem;
  color: var(--amber-deep);
  white-space: nowrap;
}
.exp-item-role {
  font-size: 0.95rem;
  color: var(--text-on-light-muted);
  margin: 0.3rem 0 0.65rem;
}
.exp-bullets {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.exp-bullets li {
  position: relative;
  padding-left: 1.2rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-on-light-muted);
}
.exp-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75rem;
  width: 0.7rem;
  height: 1px;
  background: var(--amber-deep);
}

.exp-skills {
  position: sticky;
  top: 6rem;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.75rem 1.85rem;
  background: var(--paper);
  border: 1px solid var(--paper-line);
  border-radius: 10px;
}
.exp-skill-head {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-on-light);
  margin-bottom: 0.5rem;
}
.exp-skill-items {
  font-size: 0.92rem;
  color: var(--text-on-light-muted);
  line-height: 1.75;
}

@media (max-width: 880px) {
  .exp-grid { grid-template-columns: 1fr; }
  .exp-skills { position: static; }
}
```

- [ ] **Step 3: 브라우저 확인**

Expected: 좌측에 Roles(2건) + Education(2건) 타임라인. 우측에 Skills 카드 (sticky, 스크롤 시 따라옴).

- [ ] **Step 4: Commit**

```bash
git add src/sections/Experience.tsx src/sections/Experience.css
git commit -m "feat(experience): integrate Skills into Experience chapter with sticky aside"
```

---

## Task 11: Contact 챕터 재작성

**Files:**
- Modify: `src/sections/Contact.tsx`
- Modify: `src/sections/Contact.css` (재작성)

- [ ] **Step 1: Contact.tsx 재작성**

```tsx
import { useLang } from '../context/LangContext';
import './Contact.css';

export function ContactChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner contact-inner">
      <div className="section-label">
        <span>{t.contact.number}</span>
        <span className="font-serif-italic">Contact</span>
      </div>
      <h2 className="contact-heading font-display">
        {t.contact.heading}
      </h2>
      <p className="contact-sub font-serif-italic">
        Looking for a stage to do this on a larger scale.
      </p>

      <div className="contact-links">
        <a className="contact-link" href={`mailto:${t.contact.email}`}>
          <span className="contact-link-label">Email</span>
          <span className="contact-link-value font-num">{t.contact.email}</span>
        </a>
        <a className="contact-link" href={t.contact.linkedinUrl} target="_blank" rel="noreferrer">
          <span className="contact-link-label">LinkedIn</span>
          <span className="contact-link-value font-num">{t.contact.linkedin}</span>
        </a>
      </div>

      <footer className="contact-footer">{t.footer.copyright}</footer>
    </div>
  );
}
```

- [ ] **Step 2: Contact.css 재작성**

```css
.contact-inner {
  text-align: left;
  max-width: 920px;
  margin-inline: auto;
}
.contact-heading {
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: var(--text-on-dark);
  letter-spacing: -0.03em;
  margin: 1.5rem 0 0.5rem;
  font-weight: 800;
  max-width: 18ch;
}
.contact-heading::after {
  content: '';
  display: block;
  width: 3rem;
  height: 3px;
  background: var(--amber);
  margin-top: 1.2rem;
}
.contact-sub {
  color: var(--text-on-dark-muted);
  font-size: 1.15rem;
  margin-bottom: 3rem;
}
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 4rem;
}
.contact-link {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--ink-line);
  transition: border-color 0.2s ease, color 0.2s ease;
}
.contact-link:hover {
  border-bottom-color: var(--amber);
  color: var(--amber);
}
.contact-link-label {
  font-family: var(--font-serif-en);
  font-style: italic;
  width: 7rem;
  color: var(--text-on-dark-faint);
  font-size: 1rem;
}
.contact-link-value {
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  color: var(--text-on-dark);
}
.contact-link:hover .contact-link-value { color: var(--amber); }
.contact-footer {
  font-size: 0.85rem;
  color: var(--text-on-dark-faint);
  margin-top: auto;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Contact.tsx src/sections/Contact.css
git commit -m "feat(contact): rebuild Contact with amber underline and link list"
```

---

## Task 12: App.tsx 재구성 — 7 챕터 + 휠 hijack 제거 + Nav 톤 자동 반전

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Deck.css` (nav 톤 자동 반전 추가)

**의도:** 챕터 7개로 압축, 가로 슬라이드 ProjectDeck 호출을 CaseStudy로 교체, wheel hijack useEffect 전면 제거, IntersectionObserver로 nav bar가 라이트/다크 챕터에 따라 자동 반전.

- [ ] **Step 1: App.tsx 재작성**

```tsx
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

// 각 챕터의 시각 톤. nav bar 색상을 자동 반전하는 데 사용.
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
        <nav className="deck-nav">
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
```

- [ ] **Step 2: Deck.css에 nav 톤 자동 반전 규칙 추가**

`src/components/Deck.css`를 다음으로 **완전 교체**:
```css
.deck-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem var(--pad-x);
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.deck-top--dark {
  background: rgba(11, 18, 32, 0.88);
  color: var(--text-on-dark);
  border-bottom: 1px solid var(--ink-line);
}
.deck-top--light {
  background: rgba(250, 250, 248, 0.88);
  color: var(--text-on-light);
  border-bottom: 1px solid var(--paper-line);
}

.deck-brand {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  flex-shrink: 0;
}

.deck-nav {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 1.8vw, 1.75rem);
  font-size: var(--fs-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.deck-nav-item {
  padding: 0.35rem 0;
  transition: color 0.2s ease;
  border-bottom: 1px solid transparent;
  font-weight: 500;
  opacity: 0.62;
}
.deck-nav-item:hover { opacity: 1; }
.deck-nav-item.is-active {
  color: var(--amber);
  border-bottom-color: var(--amber);
  opacity: 1;
}
.deck-top--light .deck-nav-item.is-active { color: var(--amber-deep); border-bottom-color: var(--amber-deep); }

.deck-lang {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity 0.2s ease, border-color 0.2s ease;
}
.deck-lang:hover { opacity: 1; }
.deck-lang .active { color: var(--amber); font-weight: 700; opacity: 1; }
.deck-top--light .deck-lang .active { color: var(--amber-deep); }
.deck-lang .sep { opacity: 0.55; }

.deck-progress-line {
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 2px;
  background: transparent;
  overflow: hidden;
  pointer-events: none;
}
.deck-progress-line-fill {
  display: block;
  height: 100%;
  background: var(--amber);
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 0.15s linear;
}
.deck-top--light .deck-progress-line-fill { background: var(--amber-deep); }

@media (max-width: 720px) {
  .deck-nav { display: none; }
}
```

- [ ] **Step 3: 빌드 + 브라우저 검증**

Run: `npm run build`
Expected: TS 에러 없이 빌드 성공.

Then `npm run dev` 새로고침. 다음을 확인:
1. 챕터가 7개 (Hero / About / OIA / Univ / Selected / Experience / Contact).
2. 마우스 휠로 스크롤 시 어떤 가로채기·snap도 없음. 자연스러운 vertical scroll.
3. About·Selected·Experience 챕터에 진입하면 nav bar가 라이트 톤(흰 배경 + 검은 글자)으로 자연스럽게 바뀜.
4. OIA Case에 진입하면 좌측에 sticky 빌딩이 따라오고, 우측 슬라이드가 scroll됨에 따라 빌딩의 층이 amber로 highlight 전환.
5. Univ Case는 빌딩 없이 본문만.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/components/Deck.css
git commit -m "feat(app): restructure to 7 chapters, remove wheel hijack, add auto-toned nav"
```

---

## Task 13: 미사용 컴포넌트 제거 + Bridge alias 제거 (Cleanup)

**Files:**
- Delete: `src/sections/Method.tsx`, `src/sections/Method.css`
- Delete: `src/sections/FeaturedIntro.tsx`, `src/sections/FeaturedIntro.css`
- Delete: `src/sections/Skills.tsx`, `src/sections/Skills.css`
- Delete: `src/sections/ProjectDeck.tsx`, `src/sections/ProjectDeck.css`
- Modify: `src/components/ImageSlot.tsx`/`.css` (ProjectDeck이 유일 사용처였다면 삭제, 아니면 보존)
- Modify: `src/styles/global.css` (bridge aliases 블록 삭제)

- [ ] **Step 1: ImageSlot 사용처 확인**

Run:
```bash
grep -r "ImageSlot" src/
```

만약 ProjectDeck 외 사용처가 없으면 삭제, 아니면 보존.

- [ ] **Step 2: 미사용 파일 삭제**

Run:
```bash
rm src/sections/Method.tsx src/sections/Method.css
rm src/sections/FeaturedIntro.tsx src/sections/FeaturedIntro.css
rm src/sections/Skills.tsx src/sections/Skills.css
rm src/sections/ProjectDeck.tsx src/sections/ProjectDeck.css
# Step 1 결과에 따라:
# rm src/components/ImageSlot.tsx src/components/ImageSlot.css
```

- [ ] **Step 3: global.css의 bridge aliases 블록 제거**

`src/styles/global.css`의 `:root {}` 안의 다음 블록(Task 1에서 추가했던 것)을 삭제:
```css
/* Bridge aliases — 기존 컴포넌트 호환용. Task 13 cleanup에서 제거 */
--night: var(--ink);
--plum: var(--ink-soft);
--plum-lift: var(--ink-soft);
--iris: var(--amber);
--lilac: var(--amber);
--aurora: var(--amber);
--cream: var(--text-on-dark);
--cream-muted: var(--text-on-dark-muted);
--cream-faint: var(--text-on-dark-faint);
--cream-whisper: rgba(250, 250, 248, 0.15);
--line: var(--ink-line);
--line-strong: var(--ink-line-2);
```

또한 다음의 legacy 폰트 클래스도 제거:
```css
.font-italic-serif { ... }
.font-mono-num { ... }
```

- [ ] **Step 4: 잔존 참조 grep**

Run:
```bash
grep -rE "var\(--(iris|lilac|aurora|cream|night|plum|line|line-strong)\b" src/
grep -rE "font-italic-serif|font-mono-num" src/
```

Expected: 출력 없음(=잔존 참조 없음). 있으면 새 토큰·클래스로 교체.

- [ ] **Step 5: 최종 빌드·테스트**

Run:
```bash
npm run build
npm run test:run
```

Expected: 빌드 성공, BuildingDiagram 3 tests passed.

- [ ] **Step 6: 브라우저 최종 확인**

Open `http://localhost:5173`. 모든 챕터를 한 번씩 스크롤하며 확인:
1. Hero: 좌 텍스트+숫자, 우 빌딩 large. amber 강조 1곳(25h→8h).
2. About: 라이트 페이퍼, 본문 3문단 + "How I Work" 6단계.
3. OIA Case: 다크 + sticky 빌딩 sidebar, 슬라이드 스크롤 시 층 highlight 전환.
4. Univ Case: 다크 살짝 변형, 빌딩 없음.
5. Selected: 라이트, 2×2 카드 + wide 카드.
6. Experience: warm 페이퍼, 좌 타임라인 + 우 sticky Skills.
7. Contact: 다크 풀스크린, amber underline + 큰 헤드라인.
8. nav bar가 챕터 톤 따라 자동 반전.
9. 모바일 폭(~400px)에서 모든 챕터 무너지지 않음.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore(cleanup): remove deprecated components and bridge aliases"
```

---

## Self-Review (이미 완료됨)

- **Spec coverage:** §2의 6개 합의 항목, §3의 디자인 토큰, §4의 7개 챕터, §5의 자산 정책, §6의 인터랙션 변경, §7의 모바일 — 각각 Task 1·1·4-11·2-7·12·전 챕터에 매핑됨. ✓
- **Placeholder scan:** "TBD"·"TODO"·"실제 코드는 비슷하게" 패턴 없음. ✓
- **Type consistency:** `BuildingDiagram` props(`highlight?: FloorIndex`, `size?: BuildingSize`)가 모든 호출처에서 일관. `CaseStudyProps`의 `buildingFloorMap` 타입이 ko.ts·en.ts의 `as const` 매핑과 호환. ✓

---

## 다음 단계 — 실행 방식 선택

설계서·계획서 모두 완성됐습니다. 실행 방식을 골라주세요.

**1. Subagent-Driven (참모 추천)**
- 각 태스크마다 새 subagent를 dispatch
- 두 단계 검토(작업 직후·통합 직전)
- 메인 컨텍스트가 깔끔하게 유지됨, 토큰 효율적
- 작업이 13개라 이 방식이 적합

**2. Inline 실행**
- 본 세션에서 한 태스크씩 차례로 실행
- 체크포인트마다 사용자 검토
- 한 자리에서 이어 보기 좋음
- 컨텍스트가 빠르게 채워짐
