# 포트폴리오 첫 화면 UX 재설계 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 채용자가 첫 두 화면(Intro + About)만으로 정체성·직무 적합성·정량 성과를 파악하도록 Hero 슬로건/지표와 About을 빌더 보이스 이그제큐티브 서머리로 재구성한다.

**Architecture:** 콘텐츠 단일 소스(`ko.ts`/`en.ts`)를 먼저 바꾸고, Hero/About 컴포넌트와 CSS를 맞춘다. 섹션 플로우는 불변. 변경은 Hero·About 두 섹션 + 콘텐츠(Projects ECTS 카드 정합 포함)에 한정.

**Tech Stack:** React 18 · TypeScript · Vite · Vitest + @testing-library/react

스펙: `docs/superpowers/specs/2026-06-06-portfolio-first-screen-ux-design.md`

참고: 수치는 ECTS `-83%`(ASCII 하이픈), 협정교 `740+`, 에이전트/부서 `15 / 14`. Hero 지표 accent는 2번째 타일(`Hero.tsx`의 `i === 1`).

---

## File Structure

| 파일 | 책임 | 변경 |
|---|---|---|
| `src/content/ko.ts` | KO 콘텐츠 | meta(role/tagline/subtitle), hero.stats, about.body/snapshot/cvTrail, Projects[0] ECTS |
| `src/content/en.ts` | EN 콘텐츠 | 위 항목 영문 |
| `src/sections/Hero.tsx` | 히어로 렌더 | 슬로건 마지막 줄 accent span |
| `src/sections/Hero.css` | 히어로 스타일 | `.hero-headline-accent` 추가 |
| `src/sections/Hero.test.tsx` | 히어로 테스트 | 신규 |
| `src/sections/About.tsx` | About 렌더 | snapshot + How I Work 한 줄 + CV 줄 |
| `src/sections/About.css` | About 스타일 | snapshot/flow/cv 스타일, method 카드 그리드 제거 |
| `src/sections/About.test.tsx` | About 테스트 | 신규 |

---

## Task 1: 콘텐츠 교체 (KO/EN + Projects ECTS 정합)

**Files:**
- Modify: `src/content/ko.ts`
- Modify: `src/content/en.ts`

- [ ] **Step 1: `ko.ts`의 `meta` 블록 교체**

`meta: { ... }` 전체를 아래로 교체:

```ts
  meta: {
    nameRoman: 'Céline Choi',
    role: 'AI 기획자 · 기술 PM 지향',
    taglineEn: 'Planner, Builder, Operator.',
    tagline: '도구를 쓰지 않습니다.\n만들어 씁니다.',
    subtitle:
      '운영 현장의 문제를 가장 잘 아는 사람이, 그 문제를 푸는 프로덕션 시스템을 직접 만듭니다.',
  },
```

- [ ] **Step 2: `ko.ts`의 `hero.stats` 교체**

`hero: { stats: [...], hint: ... }`의 `stats` 배열을 아래로 교체 (hint 유지):

```ts
    stats: [
      { value: '-83%', label: 'ECTS 학점 환산 처리시간' },
      { value: '25h → 8h', label: '주간 이메일 트리아지' },
      { value: '10,000+', label: '740+ 협정교 문서 분석' },
      { value: '15', label: '운영 중인 AI 에이전트' },
    ],
```

- [ ] **Step 3: `ko.ts`의 `about` 블록 교체**

`about: { number, title, body }` 를 아래로 교체 (`body` 2문단 + `snapshot` + `cvTrail` 추가):

```ts
  about: {
    number: 'I',
    title: 'About',
    body: [
      '프랑스어를 전공한 비개발자가, 국제 업무 운영 현장에서 직접 프로덕션 시스템을 만듭니다. 흩어져 있던 부서 업무를 15개 AI 에이전트가 상주하는 6층 사무실 시뮬레이션으로 설계하고, 15개 에이전트를 14개 부서 폴더에 매핑한 뒤 file-watching으로 각 폴더의 상태를 연동했습니다.',
      '무엇을 자동화할지 고르고, 데이터 구조와 아키텍처를 설계하고, 출력을 검증하는 판단을 내립니다. 다음 목표는 운영 현장을 아는 사람이 만드는 AI 프로덕트를 AI 기획자·기술 PM으로서 이어가는 것입니다.',
    ],
    snapshot: [
      { k: 'Now', v: '연세대학교 국제처 · 유럽 교환 담당 (Exchange Program Manager)' },
      { k: 'Study', v: 'AI융합대학원 석사 재학 · RAG · ReAct' },
      { k: 'Build', v: 'Claude Code · Flask · GAS · React · TypeScript · D3.js' },
      { k: 'Proof', v: 'ECTS -83% · 이메일 25h→8h · 740+ 협정교 1만 건 분석 · 마크롱 특강 총괄' },
    ],
    cvTrail: '· 아래에서 대표 프로젝트 3건과 상세 경력을 볼 수 있습니다.',
  },
```

- [ ] **Step 4: `ko.ts`의 Projects ECTS 카드 본문 정합**

`selected.projects` 첫 항목(ECTS)의 `body`를 교체:

```ts
        body:
          '교환학생이 유럽 파트너교에서 받아온 성적표(ECTS 단위)를 연세대 학점으로 환산하는 작업을 자동화. 학기당 200건 이상의 반복 작업에서 처리시간을 83% 단축.',
```

- [ ] **Step 5: `en.ts`의 `meta` 블록 교체**

```ts
  meta: {
    nameRoman: 'Céline Choi',
    role: 'AI Planner · aspiring Technical PM',
    taglineEn: 'Planner, Builder, Operator.',
    tagline: 'I do not use tools.\nI build them.',
    subtitle:
      'The person who knows the operational problems best builds the production systems that solve them.',
  },
```

- [ ] **Step 6: `en.ts`의 `hero.stats` 교체**

```ts
    stats: [
      { value: '-83%', label: 'ECTS conversion time' },
      { value: '25h → 8h', label: 'Weekly email triage' },
      { value: '10,000+', label: 'Docs analyzed · 740+ partners' },
      { value: '15', label: 'AI agents in production' },
    ],
```

- [ ] **Step 7: `en.ts`의 `about` 블록 교체**

```ts
  about: {
    number: 'I',
    title: 'About',
    body: [
      'A non-developer who majored in French, building production systems firsthand in the field of international-affairs operations. I designed scattered department work into a six-floor office simulation staffed by 15 AI agents, mapped those 15 agents to 14 department folders, and wired their state together with file-watching.',
      'I choose what to automate, design the data structures and architecture, and validate the output. Next, I want to keep building AI products as the person who knows the operations field, as an AI product planner and technical PM.',
    ],
    snapshot: [
      { k: 'Now', v: 'Yonsei Office of International Affairs · Europe Exchange — Exchange Program Manager' },
      { k: 'Study', v: 'M.S. candidate, Graduate School of AI Convergence · RAG · ReAct' },
      { k: 'Build', v: 'Claude Code · Flask · GAS · React · TypeScript · D3.js' },
      { k: 'Proof', v: 'ECTS -83% · email 25h→8h · 10K docs across 740+ partners · led Macron lecture' },
    ],
    cvTrail: '· Three featured projects and detailed experience follow below.',
  },
```

- [ ] **Step 8: `en.ts`의 Projects ECTS 카드 본문 정합**

```ts
        body:
          'Automated the conversion of European (ECTS) transcripts into Yonsei credits. Cut processing time by 83% across 200+ cases per semester.',
```

- [ ] **Step 9: 타입체크**

Run: `npx tsc --noEmit`
Expected: 종료코드 0, 출력 없음. (`t`는 `typeof ko`라 ko의 새 필드 `about.snapshot`/`cvTrail`이 타입에 반영됨)

- [ ] **Step 10: Commit**

```bash
git add src/content/ko.ts src/content/en.ts
git commit -m "content: builder-voice hero slogan/stats, About snapshot, ECTS metric alignment"
```

---

## Task 2: Hero 슬로건 마지막 줄 accent

**Files:**
- Modify: `src/sections/Hero.tsx`
- Modify: `src/sections/Hero.css`
- Test: `src/sections/Hero.test.tsx`

- [ ] **Step 1: 실패하는 테스트 작성** — `src/sections/Hero.test.tsx` 생성

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { HeroChapter } from './Hero';

describe('HeroChapter', () => {
  it('accents the last line of the slogan', () => {
    const { container } = render(
      <LangProvider>
        <HeroChapter />
      </LangProvider>
    );
    const accent = container.querySelector('.hero-headline-accent');
    expect(accent).not.toBeNull();
    expect(accent?.textContent).toBe('만들어 씁니다.');
  });

  it('renders four stat values including the ECTS metric', () => {
    const { container } = render(
      <LangProvider>
        <HeroChapter />
      </LangProvider>
    );
    const values = Array.from(container.querySelectorAll('.hero-stat-value')).map(
      (v) => v.textContent
    );
    expect(values.length).toBe(4);
    expect(values).toContain('-83%');
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/sections/Hero.test.tsx`
Expected: FAIL — `.hero-headline-accent` 가 없어 첫 테스트 실패 (accent is null).

- [ ] **Step 3: `Hero.tsx`의 슬로건 렌더 교체**

`Hero.tsx`에서 아래 한 줄:

```tsx
        <h2 className="hero-headline-ko font-display">{t.meta.tagline}</h2>
```

를 다음으로 교체:

```tsx
        <h2 className="hero-headline-ko font-display">
          {t.meta.tagline.split('\n').map((line, i, arr) => (
            <span key={i} className={i === arr.length - 1 ? 'hero-headline-accent' : undefined}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h2>
```

- [ ] **Step 4: `Hero.css`에 accent 스타일 추가**

`.hero-headline-ko { ... }` 규칙 블록 바로 아래에 추가:

```css
.hero-headline-accent { color: var(--amber); }
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npx vitest run src/sections/Hero.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/sections/Hero.tsx src/sections/Hero.css src/sections/Hero.test.tsx
git commit -m "feat(hero): accent the second slogan line"
```

---

## Task 3: About 이그제큐티브 서머리 재구성

**Files:**
- Modify: `src/sections/About.tsx`
- Modify: `src/sections/About.css`
- Test: `src/sections/About.test.tsx`

- [ ] **Step 1: 실패하는 테스트 작성** — `src/sections/About.test.tsx` 생성

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { AboutChapter } from './About';

const renderAbout = () =>
  render(
    <LangProvider>
      <AboutChapter />
    </LangProvider>
  );

describe('AboutChapter', () => {
  it('renders the four snapshot rows with English labels', () => {
    const { container } = renderAbout();
    const rows = container.querySelectorAll('.about-snap-row');
    expect(rows.length).toBe(4);
    const keys = Array.from(container.querySelectorAll('.about-snap-k')).map((k) => k.textContent);
    expect(keys).toEqual(['Now', 'Study', 'Build', 'Proof']);
  });

  it('renders How I Work as one flow line covering all six steps', () => {
    const { container } = renderAbout();
    const flow = container.querySelector('.about-flow');
    expect(flow).not.toBeNull();
    expect(flow?.textContent).toContain('문제 정의');
    expect(flow?.textContent).toContain('배포·운영');
  });

  it('links to the CV pdf', () => {
    const { container } = renderAbout();
    const link = container.querySelector('a.about-cv-link');
    expect(link?.getAttribute('href')).toBe('/CV_SeoAh_Choi_EN.pdf');
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/sections/About.test.tsx`
Expected: FAIL — `.about-snap-row` 등이 없어 실패.

- [ ] **Step 3: `About.tsx` 전체 교체**

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
          <p key={i}>{p}</p>
        ))}

        <dl className="about-snapshot">
          {t.about.snapshot.map((s) => (
            <div key={s.k} className="about-snap-row">
              <dt className="about-snap-k">{s.k}</dt>
              <dd className="about-snap-v">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="about-method">
          <div className="about-method-label font-serif-italic">How I Work</div>
          <p className="about-flow">
            {t.method.steps.map((s, i, arr) => (
              <span key={s.id} className="about-flow-seg">
                <span className="about-flow-step">{s.label}</span>
                {i < arr.length - 1 && <span className="about-flow-arr"> → </span>}
              </span>
            ))}
          </p>
        </div>

        <p className="about-cv">
          <a className="about-cv-link" href={t.contact.cvUrl} target="_blank" rel="noreferrer">
            Curriculum Vitae →
          </a>{' '}
          {t.about.cvTrail}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: `About.css`의 method 블록 이후를 교체**

`About.css`에서 `.about-body p.about-last { ... }` 블록부터 파일 끝까지(미디어쿼리 포함)를 아래로 교체. (`.about-inner`, `.about-head`, `.about-heading`, `.about-body p` 기본 규칙은 유지)

```css
.about-snapshot {
  margin-top: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--paper-line);
  border-bottom: 1px solid var(--paper-line);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2.25rem;
}
.about-snap-row { display: flex; flex-direction: column; gap: 0.25rem; }
.about-snap-k {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: var(--amber-deep);
}
.about-snap-v {
  font-size: 0.95rem;
  color: var(--text-on-light);
  line-height: 1.5;
  margin: 0;
}

.about-method {
  margin-top: 2rem;
}
.about-method-label {
  color: var(--amber-deep);
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
}
.about-flow {
  font-size: 1rem;
  line-height: 1.9;
  color: var(--text-on-light);
}
.about-flow-step { font-weight: 700; }
.about-flow-arr { color: var(--amber-deep); }

.about-cv {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-on-light-muted);
}
.about-cv-link { color: var(--amber-deep); font-weight: 700; }
.about-cv-link:hover { text-decoration: underline; }

@media (max-width: 880px) {
  .about-inner { grid-template-columns: 1fr; }
  .about-head { position: static; }
  .about-snapshot { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npx vitest run src/sections/About.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/sections/About.tsx src/sections/About.css src/sections/About.test.tsx
git commit -m "feat(about): executive-summary layout — snapshot, one-line process, CV"
```

---

## Task 4: 전체 검증

**Files:** 없음 (검증 전용)

- [ ] **Step 1: 타입체크**

Run: `npx tsc --noEmit`
Expected: 종료코드 0.

- [ ] **Step 2: 전체 테스트**

Run: `npx vitest run`
Expected: 모든 테스트 PASS (BuildingDiagram 4 + Hero 2 + About 3 = 9).

- [ ] **Step 3: 프로덕션 빌드**

Run: `npm run build`
Expected: 종료코드 0, `dist/` 생성, 에러 없음.

- [ ] **Step 4: 육안 확인 (dev 서버)**

Run: `npm run dev` (이미 떠 있으면 새로고침)
확인: ① 히어로 둘째 줄("만들어 씁니다.")이 앰버 ② 지표 4개가 -83% / 25h→8h(앰버) / 10,000+ / 15 ③ About에 Now/Study/Build/Proof 4행 + How I Work 한 줄 흐름 + Curriculum Vitae 링크 ④ KO/EN 토글 시 전부 전환.

---

## 비목표 (이 계획에 미포함)

- 섹션 순서/플로우 변경
- OIA Rush 케이스 본문 "15 department folders" → 14 정합 (대표 확인 후 별도)
- 새 이미지 자산 추가
- Hero `.hero-headline-ko::after` 앰버 바 변경 (기존 디자인 유지)
