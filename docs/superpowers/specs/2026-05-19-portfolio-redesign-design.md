# Céline Choi Portfolio — 전면 재디자인 설계서

**작성일:** 2026-05-19
**상태:** 검토 대기
**목적:** 현재 "Deep Violet Night" 디자인의 톤·임팩트 문제를 해결하고, 채용 담당자를 첫 1분 안에 사로잡는 포트폴리오로 재구축.

---

## 1. 진단 — 현재 디자인의 문제

| 문제 | 진단 |
|---|---|
| 보라색 다크 톤 단일성 | 모든 챕터(Hero·About·Method·Featured·Project·Selected·Experience·Skills·Contact)가 같은 다크 보라 + ambient glow. 스크롤해도 시각적 리듬이 없어 "한 페이지처럼" 느껴짐. |
| 수치가 묻힘 | 265+, 25h→8h, 15, 15,000+ 같은 강력한 임팩트 수치가 라이트 색·작은 폰트로 분위기 속에 녹아 있음. |
| 거짓 타이포 대비 | `font-serif`·`font-italic-serif`·`font-display` 모두 Pretendard variant. Editorial 컨셉인데 실제 serif/sans 대비 없음. |
| 핵심 차별화 자산 부재 | OIA 6층 빌딩, 유부, 15 chibi 캐릭터 자산이 외부 폴더에 있는데도 `imageSrc: null` 천지. 글로만 "6층 빌딩"이 적혀 있음. |
| 풀스크린 챕터 + 휠 hijack | 가로 슬라이드 Project Deck의 휠 가로채기는 빠른 훑기를 방해. 채용 담당자에게 부담. |
| 챕터 과다 | 10개 챕터(Method, Featured Intro 등 작은 챕터 포함)로 분량이 늘어남. |

---

## 2. 의사결정 사항 (브레인스토밍 합의)

| 결정 항목 | 합의 |
|---|---|
| **1순위 타깃** | 전 분야 채용 담당자에게 두루 어필. 캐릭터 자산(유부, 빌딩) 적극 활용 OK. |
| **톤 방향** | "Bold Stat" 베이스(차콜 + 큰 숫자, 프로페셔널) + "Game UI"의 빌딩 비주얼 하이브리드. |
| **컬러 팔레트** | Charcoal × Amber. 다크 베이스 + 골드/앰버 액센트. |
| **Hero 구성** | 균형형 — 좌측: 텍스트+숫자 4개, 우측: OIA 빌딩 단면도. |
| **챕터 흐름** | 7 챕터로 압축. About+Method 통합. Featured Intro 챕터 제거. Project Deck 세로 case study로 풀어냄. Experience+Skills 한 페이지 좌우 분할. |
| **타이포그래피** | 한글: Pretendard Variable. 영문 헤드라인·이탤릭·라벨·숫자: Newsreader(serif). |

---

## 3. 디자인 토큰

### 3.1 컬러

```css
:root {
  /* Base */
  --ink:        #0B1220;  /* charcoal navy, 메인 다크 */
  --ink-soft:   #14171F;  /* 다크 카드·hover 배경 */
  --ink-line:   rgba(250, 250, 248, 0.18);    /* 다크 위 구분선 */
  --ink-line-2: rgba(250, 250, 248, 0.30);    /* 다크 위 강한 구분선 */

  /* Paper */
  --paper:      #FAFAF8;  /* 라이트 섹션 배경, 다크 위 텍스트 */
  --paper-warm: #F4EDE0;  /* 부드러운 페이퍼 (Selected, Experience 권장) */
  --paper-line: rgba(11, 18, 32, 0.10);

  /* Accent */
  --amber:      #FBBF24;  /* 메인 액센트 — 강조 숫자·CTA·hover */
  --amber-deep: #B8870C;  /* 라이트 배경 위 amber 텍스트용 */

  /* Text on dark / on light */
  --text-on-dark:        #FAFAF8;
  --text-on-dark-muted:  rgba(250, 250, 248, 0.72);
  --text-on-dark-faint:  rgba(250, 250, 248, 0.52);
  --text-on-light:       #14171F;
  --text-on-light-muted: rgba(20, 23, 31, 0.72);
  --text-on-light-faint: rgba(20, 23, 31, 0.52);
}
```

**규칙:**
- 보라색 계열(`--night`, `--plum`, `--iris`, `--lilac`, `--aurora`, `--cream`)은 **전부 제거**.
- 강조색은 한 챕터당 amber 1곳만 사용. 여러 곳에 쓰면 강조가 사라짐.
- ambient radial-glow (`#root::before`, `#root::after`)는 **제거**. 단조로움의 주범.

### 3.2 타이포그래피

```css
:root {
  --font-sans-ko:  'Pretendard Variable', -apple-system, sans-serif;
  --font-serif-en: 'Newsreader', Georgia, serif;
}
```

**사용 규칙:**
| 용도 | 폰트 |
|---|---|
| 한글 본문·헤드라인 전반 | Pretendard Variable |
| 영문 헤드라인 (영문 한 줄짜리) | Newsreader 500 (regular) |
| 영문 이탤릭 라벨 ("Céline Choi", "Featured Work" 등) | Newsreader Italic 400 |
| 챕터 라벨 (Featured / About / Method) | Newsreader 500 — italic 또는 small-caps |
| 큰 숫자 (Hero stats, Case 결과 수치) | Newsreader 500, `font-variant-numeric: tabular-nums` |
| 본문 한글·영문 sub | Pretendard 400 |

**현재 `font-display`, `font-mono-num`, `font-italic-serif`, `font-serif` 클래스는 새 시스템에 맞춰 의미를 재정의** (이름은 유지하되 실제 폰트만 교체).

### 3.3 사이즈·스페이싱

기존 `--fs-*`, `--max-w`, `--pad-x` 토큰 유지. 변경:
- `--fs-hero`: clamp(2.75rem, 7vw, 6rem) — 살짝 더 크게.
- `--max-w`: 1280px → 1320px (빌딩 sidebar를 위한 여유).
- 챕터 패딩은 기존 유지.

### 3.4 챕터 배경 교차

7개 챕터에 시각 리듬을 주기 위해 다크/라이트 교차:

| 챕터 | 배경 | 톤 |
|---|---|---|
| 00 Hero | `--ink` (다크) | 강력 |
| 01 About + Method | `--paper-warm` (라이트) | 차분 |
| 02 OIA Case | `--ink` (다크) | 작품 무대 |
| 03 Univ Case | `--ink-soft` (다크 살짝 변형) | 작품 무대 |
| 04 Selected | `--paper` (라이트) | 정보 |
| 05 Experience + Skills | `--paper-warm` (라이트) | 이력 |
| 06 Contact | `--ink` (다크) | 강한 마무리 |

---

## 4. 챕터 구조

### 4.1 Hero (`#hero`)

**레이아웃:** 데스크탑 그리드 `1.4fr | 1fr`, 모바일에서는 빌딩이 헤드라인 아래로 내려감.

**좌측:**
- Eyebrow: `<i>Céline Choi</i> · AI 기획자·빌더` (Newsreader Italic)
- Headline (Pretendard 800):
  - 한국어: "평범한 교직원이 AI로 일하는 법, **한 권의 빌딩.**" (액센트 = amber)
  - 영어: "Planner, Builder, Operator." (Newsreader 500)
- Sub: 한 줄 (`t.meta.subtitle`)
- 4-stat grid (2×2): 265+, 25h→8h, 15, 15,000+
  - 숫자는 Newsreader 500, tabular-nums
  - 그 중 가장 강한 1개(25h→8h)만 amber

**우측 — 빌딩 단면도:**
- SVG 또는 inline HTML로 6층 빌딩 단면도
- 각 층에 라벨: 6F 대표실 + 유부 / 5F Léa (MoU) / 4F Mail (154통) / 3F Nomi (8건) / 2F Solène (밸런스) / 1F Reception
- 층마다 amber 도트(불 켜진 상태) 작은 표시
- 호버 시 해당 층 살짝 lift / amber glow

**Hero hint:** "Enter the Building ↓" — 다음 챕터로의 스크롤 hint.

### 4.2 About + Method (`#about`)

기존 About 챕터 + Method 챕터 통합.

**레이아웃:** 라이트 배경(`--paper-warm`). 그리드 `1fr | 2fr` (좌: 챕터 인덱스·타이틀, 우: 본문 + Method 6단계).

**우측 본문:**
- About 3문단 그대로 (기존 `t.about.body`)
- 그 아래 Method 6단계를 **inline horizontal list**로 (별도 챕터 아님)
  - "How I Work" 작은 라벨
  - 01·문제 정의 / 02·구조 설계 / 03·질문 설계 / 04·검증 / 05·반복 개선 / 06·배포·운영
  - 한 줄로 가로 배치, 모바일에서는 2×3 그리드

### 4.3 OIA Case Study (`#oia`)

**레이아웃:** 다크 배경(`--ink`). 그리드 `1fr | 2fr` (좌: sticky 빌딩 미니, 우: 세로 long-page case).

**좌측 (sticky sidebar):**
- 빌딩 미니어처 (Hero 빌딩의 축소판, `position: sticky; top: 8rem;`)
- 스크롤 시 현재 슬라이드에 해당하는 층이 amber로 highlight
  - "PROBLEM" 섹션 → 4F Mail이 빨갛게 깜빡이는 시각
  - "APPROACH·III" → 6F 대표실 highlight
  - "RESULT" → 모든 층 amber on
- 모바일에서는 sticky 해제, 상단에 가로 빌딩 progress 바.

**우측 (세로 콘텐츠):**
- 기존 8슬라이드를 세로 섹션으로 펼침
  - Cover: 큰 타이틀 + 메인 비디오(`oia-rush.webm`, autoplay muted loop) + Stack 칩들
  - Problem · Approach I~V · Result · Scenes
- 각 섹션 = 화면 60-80% 높이의 카드
- 섹션 간 큰 여백 + amber 1px 디바이더
- 이미지 placeholder는 **실제 이미지 또는 의도된 캐릭터/스크린샷으로 채움** (캐릭터 자산 정책은 §5 참조)

### 4.4 Univ Finder Case (`#univ`)

**레이아웃:** 다크 살짝 변형(`--ink-soft`). 압축형.

- 헤더: 타이틀 + 라이브 배포 URL + Stack 칩
- 핵심 비주얼 1개: Univ Finder 메인 스크린샷 또는 인터랙티브 미니 데모 임베드
- Problem 1문단 · Approach 1문단 · Result 1문단 (각 ~80자)
- 외부 링크 버튼: `https://oia.yonsei.ac.kr/univfinder` (amber CTA)

### 4.5 Selected Works (`#selected`)

**레이아웃:** 라이트(`--paper`). 4개 작업을 2×2 그리드 카드로.

- 카드 구성: 썸네일(또는 placeholder) / 타이틀(Pretendard 700) / Year & Stack 칩 / 1문단(~120자) body
- ECTS, 홈페이지 개편, 협정교 DB, 마크롱 특강
- 마크롱 특강 카드는 가로 2칸 차지 (가장 강한 케이스라 시각적 weight 줌)

### 4.6 Experience + Education + Skills (`#experience`)

기존 Experience 챕터 + Skills 챕터 통합 (한 페이지에 좌우 분할).

**레이아웃:** 라이트(`--paper-warm`). 그리드 `1.5fr | 1fr`.

**좌측 — Experience & Education:**
- Roles 2건 (OIA Manager / YISS Coordinator) 타임라인 형식
- Education 2건 (인공지능융합대학원 / 불어불문학과)
- 각 항목: 조직·기간·역할·핵심 bullets

**우측 — Skills:**
- 3그룹 (Technical / Operations & Product / International Affairs)
- 각 항목은 칩 형태로 wrap

### 4.7 Contact (`#contact`)

**레이아웃:** 다크(`--ink`). 풀스크린, 중앙 정렬.

- 큰 헤드라인: "새로운 무대를 찾습니다." (Pretendard 800, 액센트 amber)
- 영문 sub: "Looking for a stage to do this on a larger scale." (Newsreader)
- 이메일 / LinkedIn 큰 링크 버튼 (amber)
- 푸터: copyright

---

## 5. 캐릭터·빌딩 비주얼 자산 정책

### 5.1 외부 폴더 자산 활용

현재 `D:\projects\personal\celine-portfolio\` (코드 폴더 상위)에 다음 PNG가 있음:
- `cat-uboo.png`, `catwheel.png`, `catwheel_rotate.png`, `desk.png`
- `Seo-Ah.png`
- 15개 chibi character PNG (Cheerful office worker 시리즈, Friendly chibi 시리즈 등)
- `student1.png` ~ `student4.png`
- `thumbnail.png`

이 자산들을 `celine-portfolio/public/images/` 하위로 복사·정리하고 사용한다.

### 5.2 권장 매핑

| 위치 | 자산 |
|---|---|
| Hero 빌딩 단면도 | SVG로 새로 제작 (PNG 캐릭터를 각 층 우측에 작게 배치 가능) |
| OIA Case Cover | 메인 비디오(`oia-rush.webm`)가 있다면 그대로. 없으면 빌딩 전체 일러스트 |
| OIA Case "APPROACH III" (빌딩 세움) | 6F 대표실 클로즈업 — `Seo-Ah.png` + `cat-uboo.png` + `desk.png` 콜라주 |
| OIA Case "APPROACH IV" (풀가동) | 15 chibi character 5-6명을 각 층에 배치한 시각 |
| OIA Case "SCENES" 마무리 | 유부 사진 한 장 (`cat-uboo.png`) |
| About 우측 보조 일러스트 | `Seo-Ah.png` 작게 |

**정책:** 캐릭터 PNG는 항상 amber 또는 paper 위에. 다크 배경 위에 직접 올리면 가독성 떨어짐 → 둥근 모서리 카드(`--paper-warm` 또는 `--paper`) 위에 얹는다.

### 5.3 빌딩 SVG 컴포넌트

`src/components/BuildingDiagram.tsx` 신규.

- Props: `highlight?: number` (0-5 층 인덱스), `size?: 'mini' | 'standard' | 'large'`
- 6층 박스 단면도, 각 층에 라벨 + amber 도트
- `highlight` prop으로 특정 층 amber glow
- Hero (large), OIA Case sidebar (standard), 푸터 등 작은 곳(mini)에서 재사용

---

## 6. 인터랙션·동작

### 6.1 제거할 것

- `App.tsx`의 **휠 hijack useEffect 전체 제거**. 모든 스크롤은 일반 vertical scroll.
- `ProjectDeck` 가로 슬라이드 컴포넌트 제거 (또는 deprecated 상태로 남기되 미사용).
- `#root::before`·`#root::after` ambient glow 제거.
- `scroll-snap-type` 제거 (자연스러운 스크롤).

### 6.2 추가할 것

- OIA Case 좌측 빌딩 sidebar의 IntersectionObserver — 우측 섹션이 viewport 진입할 때마다 해당 층 highlight.
- Hero 빌딩의 각 층 hover 효과 (amber glow + 살짝 scale).
- 챕터 헤더 진입 시 작은 fade-in (framer-motion 유지).

### 6.3 네비게이션

상단 fixed bar 유지. 단:
- 보라색 배경(`rgba(20, 16, 42, 0.82)`) → `rgba(11, 18, 32, 0.88)` (charcoal).
- nav 항목 수 축소 (Method, Featured Intro, Skills 단독 항목 제거): **Hero · About · OIA · Univ · Selected · Experience · Contact** 7개.
- active 표시는 amber underline.
- progress line은 amber.
- 라이트 챕터 위에서는 nav bar 배경이 자동 `rgba(250, 250, 248, 0.88)`로 반전, 텍스트 색도 ink로 반전 (IntersectionObserver로 현재 챕터 톤 감지).
- 모든 `var(--iris)`·`var(--lilac)`·`var(--aurora)`·`var(--cream*)` 참조는 새 토큰으로 일괄 치환 (이건 글로벌 정리 작업으로 분리).

---

## 7. 모바일 처리

- Hero: 빌딩이 헤드라인 아래로 내려감(`grid-template-columns: 1fr`).
- OIA Case sticky sidebar: 모바일은 sticky 해제, 상단 가로 progress 바 (6칸 중 현재 층 amber).
- Selected 4 카드: 1 column.
- Experience + Skills 좌우 분할: 모바일은 위/아래.
- 모든 텍스트 사이즈는 기존 clamp() 토큰 유지.

---

## 8. 영향받는 파일 (개략)

### 신규
- `src/components/BuildingDiagram.tsx` + CSS
- `src/sections/CaseStudy.tsx` + CSS (OIA·Univ 공용 세로 case study 컴포넌트)
- `public/images/` (외부 폴더 PNG 자산 정리·복사)

### 대폭 수정
- `src/styles/global.css` — 컬러·타이포 토큰 전면 교체
- `src/App.tsx` — 휠 hijack 제거, 챕터 7개로 재구성, ProjectDeck 호출 → CaseStudy 호출
- `src/sections/Hero.tsx` + CSS — 그리드 레이아웃 + 빌딩 추가
- `src/sections/About.tsx` + CSS — Method 통합
- `src/sections/Selected.tsx` + CSS — 카드 그리드
- `src/sections/Experience.tsx` + CSS — Skills 통합
- `src/sections/Contact.tsx` + CSS — 다크 풀스크린 강조

### 삭제 / 미사용
- `src/sections/Method.tsx` + CSS (About에 흡수)
- `src/sections/FeaturedIntro.tsx` + CSS (제거)
- `src/sections/Skills.tsx` + CSS (Experience에 흡수)
- `src/sections/ProjectDeck.tsx` + CSS (CaseStudy로 대체, 일단 보존하되 미사용)
- `index.html`의 Pretendard만 로딩하는 link → Newsreader도 추가

### 콘텐츠 변경 없음
- `src/content/ko.ts`·`en.ts` 텍스트는 그대로 사용. 단 OIA Case의 슬라이드 배열은 세로 섹션 배열로 그대로 매핑됨(슬라이드 1개 = 세로 섹션 1개).

---

## 9. 비목표 (Out of Scope)

- 콘텐츠(`ko.ts`·`en.ts`) 본문 수정 — 별도 작업.
- 다국어 추가 (영어 외 다른 언어).
- 다크/라이트 모드 토글 — 챕터별 자동 교차로 충분.
- CMS 도입.
- 새 비디오 제작 — 기존 `oia-rush.webm`만 사용.

---

## 10. 성공 기준

| 항목 | 측정 |
|---|---|
| 첫 1초 임팩트 | Hero에서 "이름 · 정체성 · 빌딩 비주얼 · 수치 4개"가 동시에 보임. |
| 빠른 훑기 | 휠 hijack 제거 → 마우스 휠 한 번에 챕터 하나씩 자연스럽게 이동. |
| 시각적 리듬 | 챕터마다 다크/라이트 교차로 "스크롤 중"임을 인지할 수 있음. |
| 차별화 | OIA 빌딩 단면도(Hero + sticky sidebar)가 다른 포트폴리오와 명확히 구분되는 시그니처. |
| 채용 적합성 | 채용 담당자가 "이 사람 뭐 하는 사람인지 + 무엇을 만들었는지 + 어떻게 만드는지"를 3분 안에 결론 낼 수 있음. |
