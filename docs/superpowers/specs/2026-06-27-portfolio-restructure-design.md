# 포트폴리오 재구성 설계서

- **작성일**: 2026-06-27
- **대상**: Céline Choi (최서아) 개인 포트폴리오 (`celine-portfolio`)
- **레퍼런스**: https://xpfks951.netlify.app/ (이주형 게임 UI/UX 포트폴리오)

---

## 1. 배경과 목표

### 문제

현재 포트폴리오는 **8개 섹션**(`Intro · About · OIA Rush · Univ Finder · Website · Projects · Experience · Contact`)으로 구성되어 장황하고 복잡해 보인다. 근본 원인은 빌드 관련 콘텐츠가 4개 섹션에 흩어져 있다는 점이다.

- 케이스 스터디 3개가 각각 풀챕터: `OIA Rush`(10슬라이드), `Univ Finder`(4슬라이드), `Website`(6슬라이드)
- 거기에 `Projects(Selected)`(3개 더) + `Experience` + `Skills`가 별도 섹션
- 챕터마다 다크/라이트가 번갈아 나와 시각적 리듬의 피로도를 더함

### 목표

레퍼런스 사이트의 구조 원리를 적용해 **8섹션 → 5섹션**으로 압축한다. 콘텐츠의 깊이는 보존하되, 진보적 공개(progressive disclosure)로 *보이는* 밀도를 낮춘다.

### 레퍼런스에서 가져오는 원리

1. **번호 붙은 메인 섹션 4개** + 히어로. 프로젝트를 챕터로 흩지 않고 한 섹션 안에 세로 리스트로 압축.
2. **경력은 '소개' 안의 접힌 아코디언**으로 — 깊이 유지 + 밀도 절감.
3. **라이트 단일 톤 + 넉넉한 여백 + 절제된 타이포.**
4. 각 프로젝트 항목은 약 1화면, 빠르게 스캔 가능.

---

## 2. 목표 구조 (8섹션 → 5섹션)

```
Hero
01 Work    — 주요 작업 (빌드 케이스 스터디 통합)
02 About   — 소개 (바이오 + 경력 아코디언 + 스킬 + Macron 하이라이트)
03 Lab     — 실험실 (작은 빌드/도구 모음)
04 Contact — 연락
```

### 네비게이션

`Céline Choi`(브랜드) · **01 Work** · **02 About** · **03 Lab** · **04 Contact**
- 현재 8개 항목 → 4개 번호 메인으로 축소.
- 스크롤 스파이(active 표시)와 진행 라인은 기존 로직 유지하되 섹션 ID 목록을 새 구조에 맞게 갱신.

### 테마

전체 **라이트 단일 톤**으로 전환. 현재의 챕터별 다크/라이트 교차(`CHAPTER_TONE`)를 제거. 밝은 배경 + 여백 확대.

---

## 3. 섹션별 상세 설계

### Hero (변경 최소)

- 이름 + 태그라인(`I do not use tools. I build them.`) + 4개 지표(`stats`) 유지.
- 라이트 배경으로 전환, 여백 확대. 카피 내용은 거의 그대로.
- 하단 힌트(`Enter the building ↓`)는 새 구조에 맞게 `↓ Work` 류로 조정 가능(선택).

### 01 Work — 주요 작업 *(가장 큰 변화)*

빌드 관련 4개 섹션(`oia` / `univ` / `web` / `selected`)을 **한 섹션**으로 통합.

**대표작: OIA Rush (featured)**
- 상단에 단독 featured 블록.
- **기본 화면(약 1~1.5화면)**: 영상(`oia-rush.webm`) + 빌딩 다이어그램 + 제목/부제 + 3~4문장 요약 + 핵심 지표(ECTS −83% / 메일 25h→8h / 15 agents) + 스택 태그.
- 현재의 10슬라이드 서사(PROBLEM → APPROACH I~V → RESULT → SCENES)는 **"자세히 보기" 인라인 펼침**으로 접어둠. 펼치면 기존 슬라이드 내러티브가 인라인으로 노출.
- 빌딩 다이어그램(`BuildingDiagram`)은 featured 기본 화면에 유지.

**압축 리스트: Univ Finder, OIA Website**
- 각각 **1화면 이하 카드**: 썸네일/대표 이미지 + 제목·연도 + 2문장 요약 + 스택 태그 + 라이브 링크.
- 기존 다중 슬라이드(4·6개)는 카드 요약으로 압축. 필요 시 항목별 "자세히 보기" 펼침 제공(선택).
- 라이브 링크: Univ Finder → `oia.yonsei.ac.kr/univfinder`(또는 netlify), Website → `yonsei-oia.netlify.app`.

### 02 About — 소개 *(3섹션 통합)*

현재 `About` + `Experience` + `Skills`를 하나로 통합.

- **바이오**: 현재 2문단 요약 유지(`about.body`).
- **Snapshot**: `Now / Study / Build / Proof` 4행 유지(스캔성 우수).
- **경력·학력 아코디언**: `experience.roles` + `experience.education`를 접힌 아코디언으로. 기본은 org·직함·기간만 노출, 펼치면 bullet 표시.
- **Skills**: 3그룹(`Technical / Operations & Product / International Affairs`) 압축 표기.
- **Macron 하이라이트**: President Macron 특강 운영을 신뢰 하이라이트(콜아웃)로 About에 배치. (빌드가 아닌 운영 성과이므로 Work/Lab이 아닌 About에 위치.)

### 03 Lab — 실험실

작은 빌드/도구를 한 섹션에 그리드/리스트로 모음. 각 항목 = 이름 + 1줄 설명 + 작은 스택 태그.

**포함 후보** (현 콘텐츠에서 추출):
- ECTS Credit Conversion Automation (현 `selected`에서 이동)
- Partner University Database (현 `selected`에서 이동)
- 이메일 트리아지 시스템 (OIA Rush 서사에서 추출)
- FAQ 챗봇 (OIA Rush 서사에서 추출)
- Nomination 통합 GAS 대시보드 (OIA Rush 서사에서 추출)
- 자동 증명서 발급 시스템 (선택)

> 최종 항목 선정은 구현 단계에서 확정. 4~6개 권장(레퍼런스 실험실은 6항목 그리드).

### 04 Contact — 연락

- `heading` + `email`(sachoi.pro@gmail.com) + LinkedIn + CV(`/CV_SeoAh_Choi_EN.pdf`).
- 라이트 톤 유지. 닫는 한 문장.

---

## 4. 콘텐츠 작업 원칙

- **요약**: OIA Rush 10슬라이드 → featured 요약 + 펼침. Univ/Website 다중 슬라이드 → 압축 카드.
- **이동**: `selected`의 ECTS·Partner DB → Lab. Macron → About 하이라이트.
- **추가**: Lab 항목 중 OIA Rush 서사 안에만 있던 작은 도구(이메일 트리아지·FAQ 챗봇·GAS 대시보드)를 독립 항목으로 표면화.
- **빌더 보이스 유지**: show-not-tell, 구체 지향, 의사결정 디테일(기존 카피 원칙 준수).
- **한/영 이중언어**: `content/ko.ts`, `content/en.ts` 양쪽 모두 새 구조에 맞춰 갱신.

---

## 5. 구현에 영향받는 파일 (예상)

- `src/App.tsx` — 섹션 목록·ID·`CHAPTER_TONE` 갱신, 새 구조 렌더링.
- `src/content/en.ts`, `src/content/ko.ts` — 콘텐츠 재배치(Work 통합, About 통합, Lab 신설).
- `src/sections/*` — `Selected`/`Experience` 통폐합, `Lab` 신설, `CaseStudy` featured/compact 변형 지원.
- `src/sections/*.css`, `src/styles/global.css`, `src/components/Deck.css` — 라이트 단일 톤 적용, 여백 조정.
- 테스트(`*.test.tsx`) — 섹션 변경에 맞춰 갱신.

---

## 5-1. 참고: OIA Rush 아트 톤 (구현 시 반영, 미확정)

OIA Rush 게임 컨셉이 '6층 빌딩'에서 **언덕 위 동화풍 코티지 마을**로 발전 중. 에셋 위치: `D:\projects\oia-rush\public\art`.

- `hill_day/dusk/night.png` — 따뜻한 파스텔 목가적 언덕 배경(낮/노을/밤).
- `cottage_*.png`, `lodge_seoah.png` — 테라코타 지붕의 동화풍 집(캐릭터별).
- `char_*.png` — 크림·자주·브라운 팔레트의 스토리북/아니메 캐릭터 일러스트(léa, margaux, nomi, solène, pierre 등).

**디자인 시사점**: 라이트 테마를 차가운 순백(`#FFFFFF`)이 아닌 **따뜻한 크림/파치먼트 톤**으로 잡아 이 아트워크와 조화시킨다. OIA Rush featured 블록은 이 코티지/언덕 무드를 시각 앵커로 활용 가능. (단, 이번 재구성의 핵심 산출물은 구조 정리이며, 아트 적용은 후속/병행 가능. 현재는 참고 수준.)

## 6. 비목표 (YAGNI)

- 신규 케이스 스터디 콘텐츠 작성(기존 콘텐츠 재배치·요약·표면화만).
- 빌딩 다이어그램 시각 자체의 재설계(위치만 유지/이동).
- 다국어 추가(한/영 유지).
- 백엔드·CMS 등 신규 인프라.

---

## 7. 성공 기준

- 메인 섹션이 5개(Hero 포함)로 축소되고 네비게이션이 4개 번호 항목으로 정리됨.
- 빌드 콘텐츠가 `Work` + `Lab` 2곳으로 정리되어 흩어짐이 해소됨.
- 전체 라이트 단일 톤으로 시각적 교차 피로가 제거됨.
- OIA Rush의 서사 깊이가 펼침으로 보존됨(정보 손실 없음).
- 한/영 양쪽 콘텐츠가 동일 구조로 동기화됨.
- 기존 테스트가 새 구조에 맞게 통과함.
