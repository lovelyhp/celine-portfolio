# Architect & Operator 리디자인 스펙

- 날짜: 20260716
- 대상: celine-portfolio (sachoi.netlify.app)
- 근거 문서: 대표 제공 DESIGN.md ("Architect & Operator" 디자인 시스템)
- 승인: 대표 승인 완료 (다크모드 토글 O / Manrope+Pretendard 병용 / 구조 유지 리스킨 / 콘텐츠 유지)

## 1. 목표

기존 "Charcoal × Amber Editorial" 스킨을 DESIGN.md의 Minimalist-Professional
("technical editorial") 시스템으로 전면 교체한다. React 컴포넌트 구조, 섹션 구성
(Hero → Work → About → Lab → Contact), KO/EN 콘텐츠는 그대로 유지한다.

## 2. 범위

### 포함
- `src/styles/global.css` — 디자인 토큰 전면 교체 (라이트/다크 2세트)
- `index.html` — Manrope 폰트 로딩 추가
- `src/context/ThemeContext.tsx` — 신규 (라이트/다크 토글)
- `src/App.tsx` — ThemeProvider 연결, 헤더에 테마 토글 버튼
- 섹션/컴포넌트 CSS 10개 파일 리스킨: Hero, Work, About, CaseStudy, Lab,
  Contact, Deck, Shot, Lightbox, BuildingDiagram

### 제외
- 카피·이미지·콘텐츠 변경 (ko.ts / en.ts 무수정)
- IA·섹션 구성 변경
- 커밋·배포 (대표가 GitHub Desktop으로 직접)

## 3. 디자인 토큰

### 3.1 컬러 (시맨틱 토큰)

| 토큰 | 라이트 | 다크 |
|---|---|---|
| `--surface` (캔버스) | `#F7F9FB` | `#0F172A` |
| `--surface-card` (카드) | `#FFFFFF` | `#1E293B` |
| `--surface-alt` (섹션 밴드·연한 컨테이너) | `#F1F5F9` | `#16213B` |
| `--text` | `#191C1E` | `#E2E8F0` |
| `--text-muted` | `#64748B` | `#94A3B8` |
| `--text-faint` | `#94A3B8` | `#64748B` |
| `--outline` (1px 보더) | `#E2E8F0` | `#334155` |
| `--primary` (네이비 잉크/버튼) | `#0F172A` | `#E2E8F0` |
| `--on-primary` | `#FFFFFF` | `#0F172A` |
| `--amber` (기능적 강조) | `#F59E0B` | `#FBBF24` |

앰버 사용 규율: Contact CTA·활성 상태(내비 활성, 진행바, 빌딩 하이라이트)·
핵심 수치 1곳(Hero 강조 스탯)에만. 그 외 강조는 네이비/굵기로.

### 3.2 타이포그래피

- `--font-serif`: `'Newsreader', 'Pretendard Variable', Georgia, serif`
- `--font-sans`: `'Manrope', 'Pretendard Variable', -apple-system, sans-serif`
- 한글 글리프는 두 스택 모두 Pretendard가 폴백으로 받는다 (병용 방침).
- 디스플레이/헤딩 = Newsreader(라틴) 500–600, 본문/라벨 = Manrope(라틴) 400–700.
- 스케일 (DESIGN.md 토큰): display 48px/600/-0.02em/1.1, headline 32px(모바일 28)/500/1.2,
  body-lg 18px/1.6, body 16px/1.5, label 14px/600/0.05em, caption 12px/500.
- `.font-display` 헬퍼를 serif 600으로 재정의 → 마크업 무수정으로 헤딩 전환.

### 3.3 레이아웃·셰이프·엘리베이션

- 컨테이너 max-width 1200px, 거터 24px, 모바일 마진 16px / 데스크톱 48px.
- 8px 배수 스페이싱, 섹션 간 80px+ 갭.
- 라운드: 버튼·인풋 4px, 카드 8px, 칩 full pill.
- 카드: `--surface-card` + 1px `--outline` + 32px 패딩(모바일 20px),
  hover 시 translateY(-4px) + 보더 `--primary` + 그림자 `0 4px 20px rgba(0,0,0,0.04)`.
- 칩: `--surface-alt` 배경, 보더 없음, 12px semibold.
- 헤더 CV 버튼 = primary(네이비/화이트), 나머지 헤더 컨트롤 = 1px 아웃라인.

## 4. 다크모드 아키텍처

- `ThemeContext` (LangContext 패턴 복제): 초기값 = localStorage `theme` →
  없으면 `prefers-color-scheme` → 토글 시 localStorage 저장.
- `document.documentElement`에 `data-theme="light|dark"` 스탬프,
  CSS는 `[data-theme="dark"]`에서 토큰만 재정의.
- 토글 버튼은 헤더 KO/EN 옆, 인라인 SVG 해/달 아이콘 (이모지 금지 준수).

## 5. 섹션별 처리 요점

- **Hero**: 라이트 캔버스 + Newsreader 디스플레이(48px). 영문 세리프 리드 유지,
  스탯 그리드는 상단 1px 보더 유지, 강조 스탯 1곳만 앰버.
- **Work/Lab 카드**: 카드 스펙(3.3) 적용, 스택 칩 통일, 링크는 네이비 밑줄 →
  hover 앰버 금지(네이비 유지).
- **About**: `chapter--warm`(베이지) → `--surface-alt` 밴드로 교체.
  스냅샷 dt 라벨 = label 토큰(업퍼케이스 Manrope), 앰버 → muted slate.
- **CaseStudy**: 결과 카드 좌측 보더 앰버 → 네이비, closing 박스는
  `--surface-alt` + 앰버 2px 좌보더(핵심 하이라이트 1곳).
- **Contact**: 헤딩 밑 앰버 룰 유지(전환 섹션 = 앰버 허용 구역), 링크 hover 앰버.
- **BuildingDiagram**: 층 하이라이트 앰버 유지(활성 상태), 나머지 톤은 토큰화.
- **Header(Deck)**: `deck-top--light` 하드코딩 제거, 토큰 기반 단일 클래스.
  활성 내비 = 네이비 텍스트 + 2px 앰버 언더라인, 진행바 앰버.

## 6. 검증 기준

1. `npx tsc --noEmit` 통과
2. `npx vitest run` 전체 통과
3. `npm run build` 성공
4. dev 서버에서 라이트/다크 × KO/EN 4개 조합 육안 확인
5. 다크모드에서 본문 텍스트 대비 4.5:1 이상 (E2E8F0 on 0F172A ≈ 12:1)
