# Stitch 목업 기반 하이브리드 재구성 스펙 (v2)

- 날짜: 20260716
- 선행: `2026-07-16-architect-operator-redesign-design.md` (토큰·다크모드·타이포 기반 위에서 진행)
- 근거: `stitch_portfolio_ui_ux_redesign\` 목업 4종 (portfolio_home / selected_works /
  about_seo_ah_choi / project_detail_oia_village)
- 승인: 대표 확정 — ①하이브리드 구조 ②기존 카피 매핑(새 사실 날조 금지)
  ③About에 Seo-Ah.png 일러스트 ④다크모드 유지·확장

## 1. 구조 (하이브리드)

- `/` — 홈 원페이저 (portfolio_home 목업): Hero → Work(인트로 + 피처드 밴드 +
  카드 2) → About → Lab → Contact. 스크롤 스파이 유지.
- `/work/:id` — 케이스 스터디 상세 (project_detail 목업). id는 콘텐츠의 것:
  `oia-building` · `univ-finder` · `oia-website`. 미지정 id → `/`로 리다이렉트.
- 라우터: react-router-dom v6. netlify.toml SPA 리다이렉트 기존 존재.
- 헤더/푸터는 셸 공유. 상세 페이지에서 내비 클릭 → `/#섹션`으로 이동 후 스크롤.
- selected_works·about 별도 페이지는 만들지 않는다 (필터 UI 포함 스킵).

## 2. 홈 섹션별 변경 (목업 매핑)

- **Hero**: 태그라인 마지막 줄 앰버 강조 복원(`--amber-ink`, 대비 확보).
  스탯 값은 디스플레이 세리프 톤으로 키움. 나머지 유지.
- **Work**: 기존 인라인 collapsible CaseStudy 제거 →
  ① 풀블리드 슬레이트 밴드(피처드): 미디어(cover video) 좌 + 라벨/세리프
  타이틀/서브타이틀/칩/네이비 CTA "자세히 보기 →"(→ /work/oia-building) 우.
  ② 이미지 리드 보더리스 카드 2개(univ-finder, oia-website): Shot 16/10 상단,
  "02 · 2025" 라벨, 세리프 타이틀(hover 앰버), 요약. 카드 클릭 → 상세 라우트,
  Live 외부 링크 별도 유지.
- **About**: 좌 스티키(라벨+About 디스플레이+Seo-Ah 일러스트 오프셋 프레임),
  우측 본문 → 스냅샷 → How I Work → CV 링크 → 하이라이트 카드 →
  Experience 타임라인(닷+수직선, 아코디언 기능 유지) → Education →
  Skills를 벤토 패널 3개(보더 카드, 앰버 라벨 업퍼케이스)로 교체.
- **Lab**: 슬레이트 밴드(chapter--warm). 카드 화이트 유지.
- **Contact**: 중앙 정렬 디스플레이 + 서브 + 앰버 CTA 버튼(mailto) +
  풀폭 링크 행(라벨 좌 / 값 우). 콘텐츠에 `contact.cta` 라벨 추가
  (KO '메일 보내기' / EN 'Get in touch' — UI 라벨, 사실 아님).
- **Footer 분리**: 셸 공통 푸터 — 세리프 네임 + copyright 좌, 링크 우.

## 3. 케이스 상세 페이지 (`/work/:id`)

- 헤더 블록: "CASE STUDY · {year}" 앰버 라벨, 세리프 디스플레이 타이틀,
  좌 인트로(cover sub+body) / 우 메타(칩, Live 링크, oia-building은
  BuildingDiagram 정적 표시).
- 미디어 밴드: cover video/image를 슬레이트 밴드 + 보더 패널로.
- section 슬라이드: 2컬럼 행 — 좌(tag 라벨+세리프 헤딩) / 우(본문+figure).
- result 슬라이드: 다크 네이비 패널(#131B2E 고정) — 세리프 헤딩 화이트,
  항목 h 앰버 / p 슬레이트. 라이트·다크 공통.
- scenes 슬라이드: 리스트 + closing은 앰버 좌보더 인용 카드.
- 하단: "NEXT PROJECT" + 세리프 대형 링크 (oia-building → univ-finder →
  oia-website → 순환).
- 기존 CaseStudy.tsx는 상세 렌더러로 재작성(파일 삭제 없음), collapsible
  모드 폐기.

## 4. 콘텐츠 원칙

- ko.ts/en.ts의 검증된 카피·수치만 사용. 목업의 영문 카피("2,000+ students",
  "600+ partners", Presidential Visit 카드, 스톡사진)는 채택하지 않는다.
- 콘텐츠 파일 변경은 `contact.cta` UI 라벨 추가뿐 (ko/en 구조 정합 유지).
- Seo-Ah.png는 바깥 폴더 → `public/images/seo-ah.png` 복사.

## 5. 검증 기준

1. tsc / vitest(테스트 갱신 포함) / build 통과
2. Playwright 구동: 홈 라이트·다크, 상세 3라우트, 내비 왕복(상세→/#about),
   새로고침 direct-load(/work/univ-finder), 모바일 1종
3. 다크모드에서 네이비 임팩트 패널·밴드 대비 확인
