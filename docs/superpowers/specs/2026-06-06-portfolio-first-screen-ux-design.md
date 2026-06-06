# 포트폴리오 첫 화면 UX 재설계 — 설계 문서

- 날짜: 2026-06-06
- 대상: Céline Choi 포트폴리오 (`D:\projects\personal\celine-portfolio\celine-portfolio`)
- 상태: 설계 확정 (구현 계획 대기)

## 1. 문제 정의

채용자는 수많은 포트폴리오를 빠르게 스캔한다. 현재 사이트는 스토리 중심 스크롤 구조가 훌륭하지만, **첫 화면(스크롤 전)에서 경력·적합성을 한눈에 파악하기 어렵다.** 스크롤을 끝까지 내려야 전체 그림이 보인다.

목표: 좋아하는 케이스 스터디 플로우는 보존하면서, **Intro + About 두 화면만으로 "30초 이력서"가 완성되도록** 정보 위계를 재설계한다.

## 2. 핵심 결정

- **첫 화면 앵커**: "한 줄 정체성 + 직무 적합성" + **실제 정량 결과**. 정체성 슬로건이 앵커이되, 그 아래 숫자가 소유권을 증명한다.
- **구조 접근법**: C안 — *About을 한 화면 이그제큐티브 서머리로 재구성*. 섹션 순서/플로우는 변경하지 않는다.
- **히어로 슬로건**: 빌더 정체성 버전 — "도구를 쓰지 않습니다. / 만들어 씁니다."

### 2.1 카피 원칙 (빌더 보이스)

이 프로젝트의 모든 카피는 다음을 따른다.

1. **어순**: "내가 무엇을 설계·구축했다" → 그 다음 "그 과정에서 AI를 도구로 활용했다". "AI로 ~했다"(AI를 행위 주체로 만드는 표현)는 금지. 의존하는 사람은 "AI로 했다", 빌더는 "만들었다"라고 쓴다.
2. **Show, don't tell**: "숫자로 증명한다" 같은 telling 대신, 실제 수치를 직접 노출한다. 정량 결과는 AI가 대신 만들 수 없는 소유권의 증거다.
3. **현재 역량으로 시작**: 과거 정체성("평범한 교직원", "프랑스어 전공")으로 문장을 시작하지 않는다. 프랑스어 전공/비개발자 배경은 약점이 아니라 "비개발자가 운영 현장에서 직접 프로덕션 시스템을 구축했다"는 더 강한 서사의 일부로 재배치한다.
4. **격을 낮추는 단어 제거**: "실험실"(취미·습작 뉘앙스), "더 큰 무대"(모호한 은유) 금지. 시스템은 OIA에서 **운영 중인 프로덕션**이다. 지향점은 은유가 아니라 구체적 직무(**AI 기획자 · 기술 PM**)로 명시한다.
5. **의사결정 디테일 노출**: 무엇을 자동화할지의 선택, 데이터 구조·아키텍처 설계, 출력 검증, 트레이드오프 판단 — AI가 못 하는 그 부분을 한 줄이라도 드러낸다. (예: "15개 에이전트를 14개 부서 폴더에 매핑하고 file-watching으로 상태를 연동")

## 3. 섹션 플로우 (변경 없음)

```
Intro → About → OIA → Univ Finder → Website → Projects → Experience → Contact
```

순서·섹션 구성은 그대로 둔다. 변경은 **Hero**와 **About** 두 섹션 내부에 한정된다.

## 4. Hero (Intro) 변경

영문 serif 라인, 빌딩 비주얼은 **유지**. 슬로건·서브·역할(eyebrow)·**핵심 지표 수치**를 교체.

| 필드 | KO | EN |
|---|---|---|
| `meta.role` (eyebrow 역할) | `AI 기획자 · 기술 PM 지향` | `AI Planner · aspiring Technical PM` |
| `meta.taglineEn` (serif, 양 언어 공통) | `Planner, Builder, Operator.` | `Planner, Builder, Operator.` |
| `meta.tagline` (display 슬로건, `\n` 2줄) | `도구를 쓰지 않습니다.\n만들어 씁니다.` | `I do not use tools.\nI build them.` |
| `meta.subtitle` | `운영 현장의 문제를 가장 잘 아는 사람이, 그 문제를 푸는 프로덕션 시스템을 직접 만듭니다.` | `The person who knows the operational problems best builds the production systems that solve them.` |

### 4.1 핵심 지표 (`hero.stats`) — 실제 수치로 교체

소유권을 증명하는 정량 결과를 직접 노출한다. 4개 타일, accent는 2번째 1개만.

| # | value | label (KO) | label (EN) |
|---|---|---|---|
| 1 | `−83%` | ECTS 학점 환산 처리시간 | ECTS conversion time |
| 2 (accent) | `25h → 8h` | 주간 이메일 트리아지 | Weekly email triage |
| 3 | `10,000+` | 740+ 협정교 문서 분석 | Docs analyzed · 740+ partners |
| 4 | `15` | 운영 중인 AI 에이전트 | AI agents in production |

**디자인 디테일**: display 슬로건의 **둘째 줄("만들어 씁니다." / "I build them.")은 앰버 강조.** 구현은 `meta.tagline`을 `\n`으로 분리해 마지막 줄에 액센트 클래스를 적용. (`Hero.tsx` + `Hero.css` 소폭 수정. 기존 `hero-headline-ko`의 줄바꿈 처리 방식 확인 필요.)

## 5. About → 이그제큐티브 서머리

기존: eyebrow + "About" 제목 + 본문 3문단 + How I Work 6단계 카드 목록.
변경: 아래 4블록으로 재구성.

### 5.1 정체성 문단 (3문단 → 2문단, 빌더 보이스)

설계·구축한 것을 앞세우고(2.1 카피 원칙), Claude Code는 기술 디테일로 내린다. "무엇을 설계했는가(6층 멀티에이전트 사무실 시뮬레이션)"가 먼저, 도구는 그 다음.

KO 1문단 (무엇을 구축했나 + 의사결정):
> 프랑스어를 전공한 비개발자가, 국제 업무 운영 현장에서 직접 프로덕션 시스템을 만듭니다. 흩어져 있던 부서 업무를 15개 AI 에이전트가 상주하는 6층 사무실 시뮬레이션으로 설계하고, 15개 에이전트를 14개 부서 폴더에 매핑한 뒤 file-watching으로 각 폴더의 상태를 연동했습니다.

KO 2문단 (AI가 못 하는 부분 + 구체적 지향):
> 무엇을 자동화할지 고르고, 데이터 구조와 아키텍처를 설계하고, 출력을 검증하는 판단을 내립니다. 다음 목표는 운영 현장을 아는 사람이 만드는 AI 프로덕트를 AI 기획자·기술 PM으로서 이어가는 것입니다.

EN 1문단:
> A non-developer who majored in French, building production systems firsthand in the field of international-affairs operations. I designed scattered department work into a six-floor office simulation staffed by 15 AI agents, mapped those 15 agents to 14 department folders, and wired their state together with file-watching.

EN 2문단:
> Choosing what to automate, designing the data structures and architecture, validating the output — that judgment, the part AI cannot do for me, is my work. Next, I want to keep building AI products as the person who knows the operations field, as an AI product planner and technical PM.

### 5.2 Snapshot (신규) — 2열 그리드, 라벨은 영문 고정

| 라벨 | KO 값 | EN 값 |
|---|---|---|
| `Now` | 연세대학교 국제처 · 유럽 교환 담당 (Exchange Program Manager) | Yonsei Office of International Affairs · Europe Exchange — Exchange Program Manager |
| `Study` | AI융합대학원 석사 재학 · RAG · ReAct | M.S. candidate, Graduate School of AI Convergence · RAG · ReAct |
| `Build` | Claude Code · Flask · GAS · React · TypeScript · D3.js | Claude Code · Flask · GAS · React · TypeScript · D3.js |
| `Proof` | ECTS −83% · 이메일 25h→8h · 740+ 협정교 1만 건 분석 · 마크롱 특강 총괄 | ECTS −83% · email 25h→8h · 10K docs across 740+ partners · led Macron lecture |

상단·하단 1px 구분선으로 묶는다. 각 행: 영문 라벨(앰버, 소형 대문자) + 값.

### 5.3 How I Work — 한 줄 흐름 (6단계 카드 → 화살표 한 줄)

`method.steps`의 라벨만 화살표로 연결해 한 줄로 렌더. desc는 표시하지 않음(데이터는 유지).

> 문제 정의 → 구조 설계 → 질문 설계 → 검증 → 반복 개선 → 배포·운영

화살표(`→`)는 앰버. 좁은 화면에서 자동 줄바꿈 허용.

### 5.4 CV / 상세 안내 줄

`Curriculum Vitae →` 링크(`contact.cvUrl` 재사용) + 트레일 문구.

- KO 트레일: `· 아래에서 대표 프로젝트 3건과 상세 경력을 볼 수 있습니다.`
- EN 트레일: `· Three featured projects and detailed experience follow below.`

## 6. 콘텐츠 스키마 변경 (`ko.ts` / `en.ts`)

- `meta.tagline`, `meta.subtitle` 문구 교체 (위 4절)
- `about.body`: 3개 → 1개(정체성 문단)
- `about.snapshot`: 신규. `Array<{ k: string; v: string }>` (4행)
- `about.cvTrail`: 신규 문자열
- `method.steps`: 유지 (라벨만 사용)
- `about.number`, `about.title`: 유지

## 7. 영향 받는 파일

| 파일 | 변경 |
|---|---|
| `src/content/ko.ts` | meta 슬로건/서브, about.body 축약, about.snapshot·cvTrail 추가 |
| `src/content/en.ts` | 위와 동일(영문) |
| `src/sections/Hero.tsx` | display 슬로건 둘째 줄 앰버 강조(라인 분리 렌더) |
| `src/sections/Hero.css` | 슬로건 액센트 라인 스타일, 줄바꿈 처리 확인 |
| `src/sections/About.tsx` | snapshot 블록 + How I Work 한 줄 + CV 줄로 재구성 |
| `src/sections/About.css` | snapshot 그리드·flow 라인·cv 줄 스타일, 기존 method 카드 스타일 정리 |
| `src/content/ko.ts` · `en.ts` (Projects) | ECTS 카드 수치를 −83%와 모순 없게 조정 (정합성 노트 참조) |

## 7.1 정합성 노트 (수치 통일)

- **ECTS**: 전 구간 **−83%** 기준. 기존 Projects ECTS 카드의 "건당 8~10분 → 30초 이내"(≈94% 함의)는 −83%와 모순되므로 "처리시간 83% 단축" 류로 문구 조정한다. (건수 "학기당 200건 이상"은 유지)
- **협정교**: **740+** 로 통일 (Website 케이스의 "740+ Partner Universities"와 일치, 변경 불필요).
- **에이전트/부서**: **15 에이전트 / 14 부서 폴더** 사용(대표 피드백 표현 그대로). 단, 기존 OIA Rush 케이스 본문은 "15 department folders"로 표기 → 14로 통일 권장. 본 작업 범위(Hero/About)에는 15/14를 적용하고, 케이스 본문 정합은 대표 확인 후 별도 처리(현재는 비목표).

## 8. 비목표 (Out of scope)

- 섹션 순서 변경 (플로우 유지)
- 케이스 스터디(OIA/Univ/Website) 내부 변경 — 단, OIA Rush 본문의 "15 department folders" 정합(→14)은 대표 확인 후 별도 처리
- Experience/Contact 내부 변경
- 새 이미지 자산 추가

예외: Projects의 **ECTS 카드 수치 조정**은 정합성을 위해 본 작업에 포함 (7.1 참조).

## 9. 성공 기준

- 데스크톱 첫 화면에서 슬로건 + 역할 + 지표가 한눈에 보인다.
- About 한 섹션에서 현직·학력·기술·대표 성과·작업 방식·CV가 스크롤 없이(또는 1회 스크롤로) 파악된다.
- KO/EN 토글 시 모든 신규 문구가 정상 전환된다.
- `tsc --noEmit` 0 에러, 기존 테스트 통과.
- About 밀도가 높아져도 텍스트가 박스를 넘치지 않고 정렬이 그리드 기준으로 유지된다.
