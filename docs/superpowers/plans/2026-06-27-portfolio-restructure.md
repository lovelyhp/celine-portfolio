# 포트폴리오 재구성 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 8개 섹션의 포트폴리오를 5개 섹션(Hero / 01 Work / 02 About / 03 Lab / 04 Contact)으로 재구성하고, 라이트 단일 톤으로 통일한다.

**Architecture:** 콘텐츠 데이터(`ko.ts`/`en.ts`)를 `work`/`about`/`lab` 그룹으로 재편하고, 빌드 케이스 3개+Selected를 하나의 `Work` 섹션(대표작 OIA Rush는 펼침형 `CaseStudy`, 나머지는 압축 `ProjectCard`)으로 통합한다. `Experience`/`Skills`/Macron은 `About`로 흡수(경력은 아코디언), 작은 도구들은 신설 `Lab` 섹션으로 모은다. 전역 테마는 다크/라이트 교차를 제거하고 따뜻한 파치먼트 라이트 톤으로 단일화한다.

**Tech Stack:** React 18 · TypeScript · Vite · framer-motion · Vitest + Testing Library

## Global Constraints

- 기본 언어는 한국어(`LangProvider` 초기값 `'ko'`). `ko.ts`와 `en.ts`는 **구조가 완전히 동일**해야 한다(키·배열 길이 동기화). 타입 기준은 `typeof ko`.
- 전체 **라이트 단일 톤**. 챕터별 다크/라이트 교차(`CHAPTER_TONE`, `chapter--dark-soft`) 제거.
- 라이트 배경은 차가운 순백이 아닌 **따뜻한 파치먼트**: 기본 배경 `--paper: #FAFAF8`, 본문 강조 영역 `--paper-warm: #F4EDE0`. (OIA Rush 코티지 아트워크와 조화. 참고: `D:\projects\oia-rush\public\art`.)
- 카피는 빌더 보이스 유지(show-not-tell, 구체 지향). 이모지 금지.
- 폰트: `--font-sans-ko`(Pretendard), `--font-serif-en`(Newsreader). 헬퍼 클래스 `.font-display/.font-serif/.font-serif-italic/.font-num` 사용.
- 작업 디렉터리: `D:\projects\personal\celine-portfolio\celine-portfolio`. 모든 명령은 이 폴더에서 실행.
- 각 Task 종료 시 `npm run test:run`이 통과해야 하며, 최종 Task에서 `npm run build` 통과.

---

## File Structure

- `src/content/ko.ts`, `src/content/en.ts` — 콘텐츠 데이터. `nav`/`work`/`about`/`lab` 그룹으로 재편. `selected` 제거.
- `src/sections/Work.tsx` (신설) — 01 Work 섹션. 대표작 + 카드 리스트 조립.
- `src/sections/Work.css` (신설).
- `src/sections/ProjectCard.tsx` (신설) — 압축 프로젝트 카드(Univ/Website).
- `src/sections/CaseStudy.tsx` (수정) — `collapsible` 모드 추가(cover 항상 노출 + 나머지 슬라이드 펼침).
- `src/sections/About.tsx` (수정) — 경력 아코디언 + Skills + Macron 하이라이트 흡수.
- `src/sections/Lab.tsx` (신설) — 03 Lab 섹션.
- `src/sections/Lab.css` (신설).
- `src/sections/Selected.tsx`, `src/sections/Selected.css` (삭제).
- `src/sections/Experience.tsx`, `src/sections/Experience.css` (삭제).
- `src/App.tsx` (수정) — `SECTION_IDS`, `navItems`, 섹션 렌더, 테마 단일화.
- `src/styles/global.css`, `src/components/Deck.css`, `src/sections/About.css`, `src/sections/CaseStudy.css` (수정) — 라이트 톤.
- `src/setupTests.ts` (수정) — `IntersectionObserver` 모킹 추가.
- 테스트: `Work.test.tsx`, `ProjectCard.test.tsx`, `Lab.test.tsx`, `App.test.tsx` 신설 / `About.test.tsx` 보강.

---

## Task 1: 콘텐츠 스키마 재편 (ko.ts / en.ts)

콘텐츠 데이터를 새 구조로 재편한다. `nav` 4항목화, `work`/`lab` 그룹 신설, `about`에 `careerTitle`/`skillsTitle`/`highlight` 추가, `univFinder`/`oiaWebsite`에 `link` 추가, `selected` 제거(항목은 lab/about으로 이동).

**Files:**
- Modify: `src/content/ko.ts`
- Modify: `src/content/en.ts`
- Create: `src/content/content.test.ts`

**Interfaces:**
- Produces (양 언어 동일 구조):
  - `nav: { work: string; about: string; lab: string; contact: string }`
  - `work: { number: string; title: string; intro: string }`
  - `univFinder.link: string`, `oiaWebsite.link: string`
  - `about.careerTitle: string`, `about.skillsTitle: string`
  - `about.highlight: { label: string; title: string; year: string; body: string }`
  - `lab: { number: string; title: string; intro: string; tools: Array<{ title: string; year: string; stack: string[]; body: string }> }`
  - `oiaBuilding`(대표작), `univFinder`/`oiaWebsite`(카드), `experience`(경력), `skills`(스킬)는 유지.
  - `selected` 키는 **삭제**.

- [ ] **Step 1: 콘텐츠 형태 검증 테스트 작성**

`src/content/content.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { ko } from './ko';
import { en } from './en';

describe('content schema', () => {
  it('exposes the new 4-item nav', () => {
    for (const c of [ko, en]) {
      expect(Object.keys(c.nav)).toEqual(['work', 'about', 'lab', 'contact']);
    }
  });

  it('groups work with section number 01 and two card links', () => {
    for (const c of [ko, en]) {
      expect(c.work.number).toBe('01');
      expect(c.univFinder.link).toMatch(/^https?:\/\//);
      expect(c.oiaWebsite.link).toMatch(/^https?:\/\//);
    }
  });

  it('moves macron into about.highlight and small tools into lab', () => {
    for (const c of [ko, en]) {
      expect(c.about.highlight.title.length).toBeGreaterThan(0);
      expect(c.lab.tools.length).toBeGreaterThanOrEqual(4);
      expect('selected' in c).toBe(false);
    }
  });

  it('keeps ko and en structurally aligned for lab tools', () => {
    expect(ko.lab.tools.length).toBe(en.lab.tools.length);
    expect(ko.about.snapshot.length).toBe(en.about.snapshot.length);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test:run -- content.test`
Expected: FAIL (`nav` 키 불일치, `work`/`lab`/`highlight`/`link` 미정의)

- [ ] **Step 3: ko.ts 수정**

`nav`를 교체:

```ts
  nav: {
    work: 'Work',
    about: 'About',
    lab: 'Lab',
    contact: 'Contact',
  },
```

`hero.hint`를 새 구조에 맞게 교체:

```ts
    hint: '↓ Selected Work',
```

`about` 객체에 다음 키를 추가(기존 `body`/`snapshot`/`cvTrail` 유지, `number`는 `'02'`로 변경):

```ts
  about: {
    number: '02',
    title: 'About',
    body: [ /* 기존 2문단 유지 */ ],
    snapshot: [ /* 기존 4행 유지 */ ],
    careerTitle: '경력 · 학력',
    skillsTitle: 'Skills',
    highlight: {
      label: '운영 하이라이트',
      title: '마크롱 대통령 특강 총괄',
      year: '2026',
      body:
        '2026년 4월 3일 에마뉘엘 마크롱 프랑스 대통령의 연세대학교 특별강연 기획·실무를 총괄했습니다. 엘리제궁·주한프랑스대사관·경호처·교내외 부서와 협의했고, 국내 언론 169건과 엘리제궁 공식 유튜브 방영, 프랑스 외신 보도로 이어졌습니다.',
    },
    cvTrail: '· 아래에서 대표 작업과 상세 경력을 볼 수 있습니다.',
  },
```

`oiaBuilding` 바로 앞에 `work` 그룹 헤더를 추가:

```ts
  work: {
    number: '01',
    title: '주요 작업',
    intro: '운영 현장의 문제를 직접 만든 프로덕션 시스템으로 풀어낸 대표 작업들.',
  },
```

`univFinder`에 `link` 추가(`showBuilding: false` 옆):

```ts
    link: 'https://oia.yonsei.ac.kr/univfinder',
```

`oiaWebsite`에 `link` 추가:

```ts
    link: 'https://yonsei-oia.netlify.app',
```

`selected` 객체 전체를 **삭제**하고, 그 자리에 `lab` 객체를 추가:

```ts
  lab: {
    number: '03',
    title: '실험실',
    intro: '대표 작업으로 자라기 전, 현장에서 만든 작은 도구들.',
    tools: [
      {
        title: 'ECTS 성적 환산 자동화',
        year: '2025–2026',
        stack: ['GAS', 'Claude API', 'python-docx'],
        body:
          '유럽 파트너교 성적표(ECTS)를 연세대 학점으로 환산. 학기당 200건 이상 반복 작업에서 처리시간 83% 단축.',
      },
      {
        title: '협정교 DB 구축',
        year: '2026',
        stack: ['Google Sheets', 'openpyxl', 'Claude Code'],
        body:
          '전 세계 협정 정보를 27개 컬럼 스키마로 표준화하고 주요 필드에 드롭다운 유효성 검사 적용. 어드민 임베드·내부망 대시보드로 확장 예정.',
      },
      {
        title: '이메일 트리아지 시스템',
        year: '2025',
        stack: ['GAS', 'Claude API'],
        body:
          '하루 100통 넘게 쏟아지는 한·영·불 혼합 메일을 자동 분류·요약. 주간 이메일 처리 시간을 25시간에서 8시간으로 줄였습니다.',
      },
      {
        title: 'FAQ 챗봇',
        year: '2025',
        stack: ['Claude API'],
        body:
          '학생들이 매년 반복하던 파견 관련 FAQ를 셀프서비스로 전환. 같은 질문에 반복 응대하던 업무를 도구로 흡수했습니다.',
      },
      {
        title: '노미네이션 통합 GAS 대시보드',
        year: '2025',
        stack: ['GAS', 'Google Sheets'],
        body:
          '여러 시트·메일에 흩어진 노미네이션 처리 상태를 한 화면으로 통합. 건별 상태 추적과 누락 방지를 자동화했습니다.',
      },
    ],
  },
```

`contact.number`를 `'04'`로 변경.

- [ ] **Step 4: en.ts를 동일 구조로 수정**

`nav`:

```ts
  nav: { work: 'Work', about: 'About', lab: 'Lab', contact: 'Contact' },
```

`hero.hint`: `'↓ Selected Work'`

`about`(number `'I'`→`'02'`, 키 추가):

```ts
    careerTitle: 'Experience & Education',
    skillsTitle: 'Skills',
    highlight: {
      label: 'Operations Highlight',
      title: 'President Macron Special Lecture',
      year: '2026',
      body:
        'I led planning and end-to-end operations for President Emmanuel Macron\'s special lecture at Yonsei on April 3, 2026. I coordinated with the Élysée Palace, the French Embassy, Presidential Security, and multiple offices — covered by 169 domestic press hits, an official Élysée YouTube broadcast, and international coverage.',
    },
    cvTrail: '· Selected work and detailed experience follow below.',
```

`work`:

```ts
  work: {
    number: '01',
    title: 'Selected Work',
    intro: 'Production systems I built firsthand to solve problems I knew from the field.',
  },
```

`univFinder.link`: `'https://oia.yonsei.ac.kr/univfinder'`, `oiaWebsite.link`: `'https://yonsei-oia.netlify.app'`.

`selected` 삭제 후 `lab` 추가(영문 동일 구조, 5개 tools):

```ts
  lab: {
    number: '03',
    title: 'Lab',
    intro: 'The small tools I built in the field before any of them grew into featured work.',
    tools: [
      { title: 'ECTS Credit Conversion Automation', year: '2025–2026', stack: ['GAS', 'Claude API', 'python-docx'],
        body: 'Automated converting European (ECTS) transcripts into Yonsei credits. Cut processing time by 83% across 200+ cases per semester.' },
      { title: 'Partner University Database', year: '2026', stack: ['Google Sheets', 'openpyxl', 'Claude Code'],
        body: 'Standardized worldwide agreement data into a 27-column schema with dropdown validation. Designed to extend to admin embedding and an internal dashboard.' },
      { title: 'Email Triage System', year: '2025', stack: ['GAS', 'Claude API'],
        body: 'Auto-classifies and summarizes 100+ daily emails mixed in Korean, English, and French. Cut weekly email handling from 25 hours to 8.' },
      { title: 'FAQ Chatbot', year: '2025', stack: ['Claude API'],
        body: 'Turned recurring exchange-program FAQs into self-service, absorbing repetitive student inquiries into a tool.' },
      { title: 'Nomination GAS Dashboard', year: '2025', stack: ['GAS', 'Google Sheets'],
        body: 'Unified nomination status scattered across sheets and email into one view, automating per-case tracking and gap prevention.' },
    ],
  },
```

`contact.number`: `'04'`.

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm run test:run -- content.test`
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add src/content/ko.ts src/content/en.ts src/content/content.test.ts
git commit -m "content: regroup into work/about/lab, drop selected"
```

---

## Task 2: CaseStudy 펼침형(collapsible) 모드

대표작(OIA Rush)을 위해 cover 슬라이드는 항상 노출하고 나머지 슬라이드는 "자세히 보기" 토글 뒤로 접는 모드를 추가한다.

**Files:**
- Modify: `src/sections/CaseStudy.tsx`
- Modify: `src/setupTests.ts`
- Create: `src/sections/CaseStudy.test.tsx`

**Interfaces:**
- Consumes: `CaseStudyProps`(Task 0 기존), `slides: CaseSlide[]`.
- Produces: `CaseStudyProps`에 옵션 `collapsible?: boolean` 추가. `collapsible`이 true면 첫 슬라이드(cover)만 보이고, 토글 버튼(`.case-expand-btn`) 클릭 시 나머지 슬라이드(`.case-content`)가 노출된다. 펼침 상태는 `aria-expanded`로 노출.

- [ ] **Step 1: setupTests에 IntersectionObserver 모킹 추가**

`src/setupTests.ts`:

```ts
import '@testing-library/jest-dom/vitest';

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
// jsdom에는 IntersectionObserver가 없어 CaseStudy 렌더 시 필요
(globalThis as any).IntersectionObserver = IO;
```

- [ ] **Step 2: 실패 테스트 작성**

`src/sections/CaseStudy.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CaseStudy, CaseSlide } from './CaseStudy';

const slides: CaseSlide[] = [
  { kind: 'cover', heading: 'Cover Head', sub: 'sub', body: 'body' },
  { kind: 'section', tag: 'PROBLEM', heading: 'Hidden Head', body: ['p1'] },
];

const base = { index: '01', year: '2026', title: 'T', subtitle: 's', stack: ['X'], slides };

describe('CaseStudy collapsible', () => {
  it('hides non-cover slides until expanded', async () => {
    render(<CaseStudy {...base} collapsible showBuilding={false} />);
    expect(screen.getByText('Cover Head')).toBeInTheDocument();
    expect(screen.queryByText('Hidden Head')).toBeNull();

    const btn = screen.getByRole('button', { name: /자세히|detail|more/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(btn);
    expect(screen.getByText('Hidden Head')).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows all slides when not collapsible', () => {
    render(<CaseStudy {...base} showBuilding={false} />);
    expect(screen.getByText('Hidden Head')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: 테스트 실패 확인**

Run: `npm run test:run -- CaseStudy.test`
Expected: FAIL (`collapsible` 미지원 — Hidden Head가 항상 보임, 버튼 없음)

- [ ] **Step 4: CaseStudy.tsx 수정**

`CaseStudyProps`에 추가:

```ts
  /** true이면 cover 외 슬라이드를 토글 뒤로 접는다(대표작용). */
  collapsible?: boolean;
```

함수 시그니처/본문 수정 — `collapsible = false`를 받고 펼침 상태를 관리:

```tsx
export function CaseStudy({
  index, year, title, subtitle, stack, slides,
  buildingFloorMap, showBuilding = true, collapsible = false,
}: CaseStudyProps) {
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(!collapsible);
```

`useEffect`의 IntersectionObserver 의존성 배열을 `[slides.length, expanded]`로 변경(펼친 뒤 관찰 대상 재바인딩):

```tsx
  }, [slides.length, expanded]);
```

렌더에서 cover와 나머지를 분리. `case-content` 블록을 다음으로 교체:

```tsx
      <div className="case-content">
        {(collapsible ? slides.slice(0, 1) : slides).map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className={`case-slide case-slide--${slide.kind}`}
          >
            <CaseSlideRender slide={slide} />
          </div>
        ))}

        {collapsible && (
          <button
            className="case-expand-btn font-serif-italic"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? '접기' : '자세히 보기 →'}
          </button>
        )}

        {collapsible && expanded && slides.slice(1).map((slide, i) => (
          <div
            key={i + 1}
            ref={(el) => { slideRefs.current[i + 1] = el; }}
            className={`case-slide case-slide--${slide.kind}`}
          >
            <CaseSlideRender slide={slide} />
          </div>
        ))}
      </div>
```

- [ ] **Step 5: CaseStudy.css에 버튼 스타일 추가**

`src/sections/CaseStudy.css` 끝에 추가:

```css
.case-expand-btn {
  align-self: flex-start;
  margin: 1.5rem 0;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--paper-line);
  border-radius: 999px;
  color: var(--text-on-light-muted);
  background: rgba(0, 0, 0, 0.02);
  font-size: var(--fs-small);
  transition: opacity 0.2s ease, border-color 0.2s ease;
  opacity: 0.8;
}
.case-expand-btn:hover { opacity: 1; border-color: var(--amber-deep); }
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `npm run test:run -- CaseStudy.test`
Expected: PASS (2 tests)

- [ ] **Step 7: Commit**

```bash
git add src/sections/CaseStudy.tsx src/sections/CaseStudy.css src/sections/CaseStudy.test.tsx src/setupTests.ts
git commit -m "feat(case-study): add collapsible mode for featured project"
```

---

## Task 3: ProjectCard 압축 카드 컴포넌트

Univ Finder / OIA Website를 1화면 이하 카드로 보여주는 컴포넌트. cover 슬라이드 데이터 + 라이브 링크를 받는다.

**Files:**
- Create: `src/sections/ProjectCard.tsx`
- Create: `src/sections/ProjectCard.test.tsx`

**Interfaces:**
- Produces: `ProjectCard(props: ProjectCardProps)` where
  ```ts
  interface ProjectCardProps {
    index: string;   // '02'
    year: string;
    title: string;
    subtitle: string;
    summary: string; // cover.body
    stack: string[];
    link: string;    // 라이브 URL
    linkLabel?: string;
  }
  ```
  렌더 루트는 `<article className="project-card">`, 링크는 `.project-card-link`(href=link, target=_blank).

- [ ] **Step 1: 실패 테스트 작성**

`src/sections/ProjectCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard', () => {
  it('renders title, summary, stack chips and external link', () => {
    render(
      <ProjectCard
        index="02" year="2025" title="Univ Finder" subtitle="D3 tool"
        summary="A dashboard." stack={['React', 'D3.js']}
        link="https://example.com"
      />
    );
    expect(screen.getByText('Univ Finder')).toBeInTheDocument();
    expect(screen.getByText('A dashboard.')).toBeInTheDocument();
    expect(screen.getByText('D3.js')).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test:run -- ProjectCard.test`
Expected: FAIL (`ProjectCard` 모듈 없음)

- [ ] **Step 3: ProjectCard.tsx 구현**

```tsx
export interface ProjectCardProps {
  index: string;
  year: string;
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  link: string;
  linkLabel?: string;
}

export function ProjectCard({
  index, year, title, subtitle, summary, stack, link, linkLabel = 'Live ↗',
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-meta">
        <span className="project-card-index font-num">{index}</span>
        <span className="project-card-year font-num">{year}</span>
      </div>
      <h3 className="project-card-title font-display">{title}</h3>
      <p className="project-card-subtitle font-serif-italic">{subtitle}</p>
      <p className="project-card-summary">{summary}</p>
      <div className="project-card-stack">
        {stack.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
      <a className="project-card-link" href={link} target="_blank" rel="noreferrer">
        {linkLabel}
      </a>
    </article>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm run test:run -- ProjectCard.test`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/sections/ProjectCard.tsx src/sections/ProjectCard.test.tsx
git commit -m "feat: add compact ProjectCard component"
```

---

## Task 4: Work 섹션 조립

대표작(OIA Rush, 펼침형 CaseStudy) + 압축 카드 2개(Univ/Website)를 하나의 섹션으로 조립.

**Files:**
- Create: `src/sections/Work.tsx`
- Create: `src/sections/Work.css`
- Create: `src/sections/Work.test.tsx`

**Interfaces:**
- Consumes: `useLang()` → `t.work`, `t.oiaBuilding`, `t.univFinder`, `t.oiaWebsite`. `CaseStudy`(collapsible), `ProjectCard`.
- Produces: `WorkChapter()` 컴포넌트. 루트 `.chapter-inner.work-inner`. 대표작 영역 `.work-featured`, 카드 리스트 `.work-list`.

- [ ] **Step 1: 실패 테스트 작성**

`src/sections/Work.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { WorkChapter } from './Work';

const renderWork = () =>
  render(<LangProvider><WorkChapter /></LangProvider>);

describe('WorkChapter', () => {
  it('shows the featured project title and section number', () => {
    renderWork();
    expect(screen.getByText('OIA Rush')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders the two compact project cards with live links', () => {
    const { container } = renderWork();
    const cards = container.querySelectorAll('.project-card');
    expect(cards.length).toBe(2);
    const links = Array.from(container.querySelectorAll('.project-card-link'))
      .map((a) => a.getAttribute('href'));
    expect(links).toContain('https://oia.yonsei.ac.kr/univfinder');
    expect(links).toContain('https://yonsei-oia.netlify.app');
  });

  it('collapses the featured deep-dive by default', () => {
    renderWork();
    // OIA Rush PROBLEM 슬라이드 heading은 펼치기 전 숨겨져 있다
    expect(screen.queryByText('하루 100통, 무한 반복 메일 지옥.')).toBeNull();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test:run -- Work.test`
Expected: FAIL (`Work` 모듈 없음)

- [ ] **Step 3: Work.tsx 구현**

```tsx
import { useLang } from '../context/LangContext';
import { CaseStudy, CaseSlide } from './CaseStudy';
import { ProjectCard } from './ProjectCard';
import './Work.css';

export function WorkChapter() {
  const { t } = useLang();
  const featured = t.oiaBuilding;
  const cards = [t.univFinder, t.oiaWebsite];

  return (
    <div className="chapter-inner work-inner">
      <div className="work-head">
        <div className="section-label">
          <span>{t.work.number}</span>
          <span className="font-serif-italic">{t.work.title}</span>
        </div>
        <p className="work-intro">{t.work.intro}</p>
      </div>

      <div className="work-featured">
        <CaseStudy
          index={featured.index}
          year={featured.year}
          title={featured.title}
          subtitle={featured.subtitle}
          stack={featured.stack}
          slides={featured.slides as CaseSlide[]}
          buildingFloorMap={(featured as any).buildingFloorMap}
          collapsible
        />
      </div>

      <ol className="work-list">
        {cards.map((c) => {
          const cover = c.slides[0] as Extract<CaseSlide, { kind: 'cover' }>;
          return (
            <li key={c.id}>
              <ProjectCard
                index={c.index}
                year={c.year}
                title={c.title}
                subtitle={c.subtitle}
                summary={cover.body}
                stack={c.stack}
                link={(c as any).link}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
```

- [ ] **Step 4: Work.css 구현**

```css
.work-inner { gap: clamp(2.5rem, 5vw, 4rem); }
.work-head { max-width: 48rem; }
.work-intro {
  font-size: var(--fs-body-lg);
  color: var(--text-on-light-muted);
  margin-top: 0.5rem;
}
.work-featured { margin-top: 0.5rem; }
.work-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.25rem, 2.5vw, 2rem);
  margin-top: clamp(2rem, 4vw, 3rem);
}
@media (max-width: 720px) {
  .work-list { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm run test:run -- Work.test`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add src/sections/Work.tsx src/sections/Work.css src/sections/Work.test.tsx
git commit -m "feat: assemble unified Work section (featured + cards)"
```

---

## Task 5: About 섹션 확장 (경력 아코디언 + Skills + Macron)

기존 About에 Macron 하이라이트, 경력·학력 아코디언, Skills를 흡수한다. 기존 snapshot/method flow/cv는 유지.

**Files:**
- Modify: `src/sections/About.tsx`
- Modify: `src/sections/About.css`
- Modify: `src/sections/About.test.tsx`

**Interfaces:**
- Consumes: `t.about`(`highlight`, `careerTitle`, `skillsTitle` 포함), `t.experience.roles/education`, `t.skills.groups`.
- Produces: About 렌더에 `.about-highlight`, `.about-career`(아코디언, `<details>` 사용), `.about-skills` 추가.

- [ ] **Step 1: About.test.tsx에 실패 테스트 추가**

`src/sections/About.test.tsx`의 `describe` 안에 추가:

```tsx
  it('renders the Macron operations highlight', () => {
    const { container } = renderAbout();
    const hl = container.querySelector('.about-highlight');
    expect(hl).not.toBeNull();
    expect(hl?.textContent).toContain('마크롱');
  });

  it('renders career as collapsible details with role and education entries', () => {
    const { container } = renderAbout();
    const details = container.querySelectorAll('.about-career details');
    expect(details.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the three skill groups', () => {
    const { container } = renderAbout();
    expect(container.querySelectorAll('.about-skill-group').length).toBe(3);
  });
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test:run -- About.test`
Expected: FAIL (`.about-highlight` / `.about-career details` / `.about-skill-group` 없음)

- [ ] **Step 3: About.tsx 수정**

`about-cv` 단락 뒤(닫는 `</div>` 직전)에 하이라이트·경력·스킬 블록을 추가:

```tsx
        <div className="about-highlight">
          <div className="about-highlight-label font-serif-italic">{t.about.highlight.label}</div>
          <h3 className="about-highlight-title font-display">
            {t.about.highlight.title}
            <span className="about-highlight-year font-num"> · {t.about.highlight.year}</span>
          </h3>
          <p className="about-highlight-body">{t.about.highlight.body}</p>
        </div>

        <div className="about-career">
          <h3 className="about-block-h font-serif-italic">{t.about.careerTitle}</h3>
          {t.experience.roles.map((r, i) => (
            <details key={`r${i}`} className="about-career-item">
              <summary>
                <span className="about-career-org">{r.org}</span>
                <span className="about-career-period font-num">{r.period}</span>
              </summary>
              <div className="about-career-role">{r.position}</div>
              <ul className="about-career-bullets">
                {r.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </details>
          ))}
          {t.experience.education.map((e, i) => (
            <details key={`e${i}`} className="about-career-item">
              <summary>
                <span className="about-career-org">{e.school}</span>
                <span className="about-career-period font-num">{e.period}</span>
              </summary>
              <div className="about-career-role">{e.degree}</div>
              {e.bullets.length > 0 && (
                <ul className="about-career-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </details>
          ))}
        </div>

        <div className="about-skills">
          <h3 className="about-block-h font-serif-italic">{t.about.skillsTitle}</h3>
          {t.skills.groups.map((g, i) => (
            <div key={i} className="about-skill-group">
              <h4 className="about-skill-head">{g.heading}</h4>
              <p className="about-skill-items">{g.items}</p>
            </div>
          ))}
        </div>
```

- [ ] **Step 4: About.css에 스타일 추가**

`src/sections/About.css` 끝에 추가:

```css
.about-highlight {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border: 1px solid var(--paper-line);
  border-radius: 0.75rem;
  background: var(--paper-warm);
}
.about-highlight-label { color: var(--amber-deep); font-size: 0.95rem; }
.about-highlight-title { font-size: var(--fs-h2); margin-top: 0.35rem; }
.about-highlight-year { color: var(--text-on-light-faint); font-weight: 400; }
.about-highlight-body { margin-top: 0.6rem; color: var(--text-on-light-muted); }

.about-career, .about-skills { margin-top: 2.5rem; }
.about-block-h { color: var(--amber-deep); margin-bottom: 1rem; }
.about-career-item { border-bottom: 1px solid var(--paper-line); padding: 0.85rem 0; }
.about-career-item summary {
  display: flex; justify-content: space-between; gap: 1rem;
  cursor: pointer; list-style: none; font-weight: 600;
}
.about-career-item summary::-webkit-details-marker { display: none; }
.about-career-period { color: var(--text-on-light-faint); font-weight: 400; }
.about-career-role { color: var(--text-on-light-muted); margin-top: 0.35rem; }
.about-career-bullets { margin: 0.6rem 0 0 1rem; color: var(--text-on-light-muted); }
.about-career-bullets li { margin-bottom: 0.3rem; }
.about-skill-group { margin-bottom: 1rem; }
.about-skill-head { font-weight: 600; margin-bottom: 0.2rem; }
.about-skill-items { color: var(--text-on-light-muted); font-size: var(--fs-small); }
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm run test:run -- About.test`
Expected: PASS (기존 3 + 신규 3 = 6 tests)

- [ ] **Step 6: Commit**

```bash
git add src/sections/About.tsx src/sections/About.css src/sections/About.test.tsx
git commit -m "feat(about): absorb experience, skills, and macron highlight"
```

---

## Task 6: Lab 섹션

작은 도구들을 그리드 카드로 보여주는 신설 섹션.

**Files:**
- Create: `src/sections/Lab.tsx`
- Create: `src/sections/Lab.css`
- Create: `src/sections/Lab.test.tsx`

**Interfaces:**
- Consumes: `t.lab`(`number`, `title`, `intro`, `tools`).
- Produces: `LabChapter()`. 루트 `.chapter-inner.lab-inner`, 카드 그리드 `.lab-grid`, 카드 `.lab-card`.

- [ ] **Step 1: 실패 테스트 작성**

`src/sections/Lab.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { LabChapter } from './Lab';

describe('LabChapter', () => {
  it('renders every lab tool as a card', () => {
    const { container } = render(<LangProvider><LabChapter /></LangProvider>);
    expect(container.querySelectorAll('.lab-card').length).toBe(5);
    expect(screen.getByText('ECTS 성적 환산 자동화')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test:run -- Lab.test`
Expected: FAIL (`Lab` 모듈 없음)

- [ ] **Step 3: Lab.tsx 구현**

```tsx
import { useLang } from '../context/LangContext';
import './Lab.css';

export function LabChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner lab-inner">
      <div className="lab-head">
        <div className="section-label">
          <span>{t.lab.number}</span>
          <span className="font-serif-italic">{t.lab.title}</span>
        </div>
        <p className="lab-intro">{t.lab.intro}</p>
      </div>

      <ul className="lab-grid">
        {t.lab.tools.map((tool, i) => (
          <li key={i} className="lab-card">
            <div className="lab-card-meta">
              <span className="lab-card-year font-num">{tool.year}</span>
            </div>
            <h3 className="lab-card-title font-display">{tool.title}</h3>
            <p className="lab-card-body">{tool.body}</p>
            <div className="lab-card-stack">
              {tool.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: Lab.css 구현**

```css
.lab-head { max-width: 48rem; }
.lab-intro { font-size: var(--fs-body-lg); color: var(--text-on-light-muted); margin-top: 0.5rem; }
.lab-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-top: clamp(2rem, 4vw, 3rem);
}
.lab-card {
  padding: 1.4rem;
  border: 1px solid var(--paper-line);
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.015);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.lab-card-year { color: var(--text-on-light-faint); font-size: var(--fs-small); }
.lab-card-title { font-size: var(--fs-h3); }
.lab-card-body { color: var(--text-on-light-muted); font-size: var(--fs-small); flex: 1; }
.lab-card-stack { display: flex; flex-wrap: wrap; gap: 0.35rem; }
@media (max-width: 980px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 620px) { .lab-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm run test:run -- Lab.test`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add src/sections/Lab.tsx src/sections/Lab.css src/sections/Lab.test.tsx
git commit -m "feat: add Lab section for small tools"
```

---

## Task 7: App 재배선 + 라이트 단일 톤

`App.tsx`를 새 5섹션 구조로 재배선하고, 다크/라이트 교차를 제거해 라이트 단일 톤으로 만든다. `Selected`/`Experience` 사용 제거.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/components/Deck.css`
- Create: `src/App.test.tsx`

**Interfaces:**
- Consumes: `WorkChapter`, `AboutChapter`, `LabChapter`, `ContactChapter`, `HeroChapter`.
- Produces: `SECTION_IDS = ['hero', 'work', 'about', 'lab', 'contact']`. 네비 항목 4개. 헤더는 항상 `deck-top--light`.

- [ ] **Step 1: 실패 테스트 작성**

`src/App.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App structure', () => {
  it('renders exactly the five top-level sections', () => {
    const { container } = render(<App />);
    const ids = Array.from(container.querySelectorAll('main > section'))
      .map((s) => s.id);
    expect(ids).toEqual(['hero', 'work', 'about', 'lab', 'contact']);
  });

  it('uses a single light header tone (no dark)', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.deck-top--dark')).toBeNull();
    expect(container.querySelector('.deck-top--light')).not.toBeNull();
  });

  it('renders four nav items', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('.deck-nav-item').length).toBe(4);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run test:run -- App.test`
Expected: FAIL (현재 8섹션, 다크 톤 존재, 네비 8항목)

- [ ] **Step 3: App.tsx 재작성**

import 교체:

```tsx
import { useState, useEffect } from 'react';
import { LangProvider, useLang } from './context/LangContext';
import { HeroChapter } from './sections/Hero';
import { WorkChapter } from './sections/Work';
import { AboutChapter } from './sections/About';
import { LabChapter } from './sections/Lab';
import { ContactChapter } from './sections/Contact';
import './components/Deck.css';

const SECTION_IDS = ['hero', 'work', 'about', 'lab', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];
```

`CHAPTER_TONE` 상수와 `navTone` 사용을 **삭제**한다. 헤더 className을 고정:

```tsx
      <header className="deck-top deck-top--light">
```

`navItems`를 교체:

```tsx
  const navItems: { id: SectionId; label: string }[] = [
    { id: 'work', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'lab', label: t.nav.lab },
    { id: 'contact', label: t.nav.contact },
  ];
```

`<main>` 내부 섹션들을 교체:

```tsx
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
```

(주의: `activeId` 스크롤 스파이 로직과 `progress`는 그대로 두되, `setActiveId` 기본값 등 `SectionId` 타입은 새 목록으로 자동 정합된다.)

- [ ] **Step 4: global.css 라이트 단일 톤 적용**

`body`의 색/배경을 라이트로 변경:

```css
body {
  font-family: var(--font-sans-ko);
  font-size: var(--fs-body);
  font-weight: 400;
  line-height: 1.65;
  color: var(--text-on-light);
  background: var(--paper);
  font-feature-settings: 'kern' 1, 'liga' 1, 'ss03' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

`#root` 배경도 라이트로:

```css
#root {
  position: relative;
  background: var(--paper);
  overflow-x: clip;
}
```

`.chapter`가 기본 라이트가 되도록, 기본 배경/색을 명시(다크 가정 제거):

```css
.chapter {
  position: relative;
  padding: clamp(4.5rem, 8vw, 6rem) var(--pad-x);
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--paper);
  color: var(--text-on-light);
}
```

`.chapter--dark-soft` 규칙을 **삭제**한다. `.section-label`/`.chip` 기본을 라이트 기준으로 변경(다크 분기는 더 이상 안 쓰임):

```css
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-serif-en);
  font-style: italic;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--amber-deep);
  margin-bottom: 1.25rem;
}
```

```css
.chip {
  display: inline-block;
  padding: 0.28rem 0.7rem;
  border: 1px solid var(--paper-line);
  border-radius: 999px;
  font-size: var(--fs-xs);
  color: var(--text-on-light-muted);
  letter-spacing: 0.02em;
  background: rgba(0, 0, 0, 0.02);
}
```

스크롤바 thumb을 라이트 배경에 맞게:

```css
*::-webkit-scrollbar-thumb { background: rgba(20, 23, 31, 0.18); border-radius: 4px; }
*::-webkit-scrollbar-thumb:hover { background: rgba(20, 23, 31, 0.3); }
```

> 참고: Hero가 다크 배경 전제로 디자인돼 있으면(`Hero.css`) 텍스트가 안 보일 수 있다. Hero.css에서 `.hero-*` 색을 `var(--text-on-light*)` 기준으로 맞추되, 본 Task의 테스트(구조/톤)와 무관하므로 시각 점검은 Step 7에서 수행한다.

- [ ] **Step 5: Deck.css 정리**

`.deck-top--dark` 규칙은 남겨두어도 무방하나 사용되지 않는다. `.deck-brand` 등은 그대로. 변경 불필요(헤더가 항상 `--light`). 이 단계는 no-op 확인만:

Run: `npm run test:run -- App.test`
Expected: PASS (3 tests)

- [ ] **Step 6: 전체 테스트 실행**

Run: `npm run test:run`
Expected: PASS (모든 스펙). 실패 시 해당 스펙 수정.

- [ ] **Step 7: 시각 점검(빌드 + 수동)**

```bash
npm run build
```
Expected: 타입체크/번들 성공. 이후 `npm run dev`로 라이트 톤에서 Hero/Work/About/Lab/Contact가 읽히는지 육안 점검. Hero 텍스트 대비가 부족하면 `Hero.css`의 색만 `--text-on-light` 계열로 조정(별도 커밋).

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/styles/global.css src/App.test.tsx
git commit -m "feat: rewire to 5-section light-themed layout"
```

---

## Task 8: 데드코드 정리 (Selected / Experience 제거)

더 이상 렌더되지 않는 파일을 제거하고 잔존 참조를 정리한다.

**Files:**
- Delete: `src/sections/Selected.tsx`, `src/sections/Selected.css`
- Delete: `src/sections/Experience.tsx`, `src/sections/Experience.css`

**Interfaces:**
- Consumes: 없음(제거 작업).
- Produces: 없음.

- [ ] **Step 1: 잔존 참조 확인**

Run: `grep -rn "Selected\|Experience" src --include=*.tsx --include=*.ts`
Expected: `App.tsx`/`Work` 등에서 import가 없어야 함(`experience`/`skills` *콘텐츠* 참조는 About에서 사용되므로 정상). 컴포넌트 `SelectedChapter`/`ExperienceChapter` import가 남아 있으면 제거.

- [ ] **Step 2: 파일 삭제**

```bash
git rm src/sections/Selected.tsx src/sections/Selected.css src/sections/Experience.tsx src/sections/Experience.css
```

- [ ] **Step 3: 전체 테스트 + 빌드**

Run: `npm run test:run && npm run build`
Expected: PASS (삭제로 인한 깨짐 없음)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dead Selected/Experience sections"
```

---

## Self-Review (작성자 점검 결과)

**1. Spec coverage**
- 8→5 섹션, 4항목 네비: Task 1(nav), Task 7(App). ✓
- Work 통합(대표작+압축): Task 2(collapsible), Task 3(card), Task 4(조립). ✓
- About 통합(바이오+경력 아코디언+스킬+Macron): Task 5. ✓
- Lab 신설(작은 도구): Task 1(content), Task 6(섹션). ✓
- 라이트 단일 톤 + 따뜻한 파치먼트: Task 7. ✓
- OIA Rush 깊이 보존(펼침): Task 2, Task 4. ✓
- 한/영 동기화: Task 1(content.test가 구조 정합 검증). ✓
- 기존 테스트 정합: Task 5(About), Task 7(전체 실행). Hero.test는 hero 불변이라 유지. ✓
- 비목표(신규 케이스 콘텐츠/빌딩 재설계/다국어 추가/백엔드): 계획에 미포함. ✓

**2. Placeholder scan**: "TBD/TODO/적절히" 등 없음. 모든 코드 단계에 실제 코드 포함. ✓

**3. Type consistency**: `WorkChapter`/`AboutChapter`/`LabChapter`/`ContactChapter`/`HeroChapter` 명칭, `ProjectCardProps`, `CaseStudyProps.collapsible`, 콘텐츠 키(`work`/`lab`/`about.highlight`/`*.link`)가 태스크 간 일치. `CaseSlide` cover의 `body` 사용(존재 필드). ✓

비고: Hero가 다크 전제 디자인일 경우 Task 7 Step 7에서 `Hero.css` 색 조정이 필요할 수 있음(시각 점검 항목으로 명시).
