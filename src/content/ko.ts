/**
 * Content schema is slide-based.
 * Each "project" is a list of slides that the user navigates left/right.
 * Each slide can optionally carry an image placeholder with a caption hint.
 *
 * Image placeholders:
 *   imageSrc: filename in /public/images/  (or null → shows placeholder box)
 *   imageCaption: visible caption under the image
 *   imageHint: hint text shown INSIDE the placeholder box (for you to know what to put)
 */

export const ko = {
  meta: {
    nameRoman: 'Céline Choi',
    tagline: '행정 조직에서 AI로 실제 변화를 만드는 기획자',
    subtitle:
      '비전공자 출신, 연세대학교 국제처 Europe Region Exchange Program Manager. "이건 안 돼요" 대신 "이건 이렇게 하면 됩니다"를 만듭니다.',
  },
  nav: {
    hero: 'Intro',
    about: 'About',
    work: 'Work',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
  },
  hero: {
    stats: [
      { value: '105+', label: '유럽 파트너 대학 운영' },
      { value: '25h → 8h', label: '주간 이메일 처리 시간' },
      { value: '15', label: 'AI 페르소나 오케스트레이션' },
      { value: '200+', label: '학기당 자동화된 ECTS 환산' },
    ],
    hint: '스크롤해서 이어 읽기',
  },
  about: {
    number: 'I',
    title: 'About',
    body: [
      '연세대학교 국제처에서 유럽 지역 105개 파트너 대학과의 교환 프로그램을 담당하고 있습니다. 동시에 연세대학교 인공지능융합대학원에서 AI Computing 석사 과정을 이수 중입니다.',
      '프랑스어·불문학 학사 출신의 비전공자이지만, 지난 1년간 행정 현장의 단순 반복 업무를 AI로 바꾸는 일에 몰두해왔습니다. Flask·GAS·D3.js·React로 직접 도구를 만들었고, 최근에는 Claude Code로 6층 빌딩 구조의 "OIA 자동화 사무실"을 구축해 14명의 AI 비서가 각자 부서 폴더를 지키는 시스템으로 통합했습니다.',
      '기획이 문서에만 남는 걸 견디지 못합니다. 실제 배포되어 동료와 학생이 쓰고, 수치로 효과가 증명되고, 조직의 일하는 방식 자체를 바꾸는 결과물에 집착합니다.',
      '지금은 이 실험을 더 큰 무대에서 증폭시킬 곳을 찾고 있습니다.',
    ],
  },

  featured: {
    number: 'II',
    title: 'Featured Work',
    intro: '주요 작업 두 가지를 서사로 풀어놓았습니다.',
  },

  // ── Project 1 — OIA Building ──────────────────────
  oiaBuilding: {
    id: 'oia-building',
    index: '01',
    year: '2026',
    title: 'OIA 자동화 사무실',
    subtitle: '14명의 AI 비서가 작동하는 가상 6층 빌딩',
    stack: ['Claude Code', 'Flask', 'GAS', 'Claude API', 'D3.js'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA 자동화 사무실',
        sub: '14명의 AI 비서가 작동하는 가상 6층 빌딩',
        body:
          '연세대 국제처의 분산된 14개 부서 폴더를 파일 시스템 이벤트로 연결해, 각 폴더의 AI 페르소나가 자신의 업무를 수행하는 통합 자동화 시스템. 실행자에서 지휘자로 역할을 바꾼 1년간의 기록.',
        imageSrc: null,
        imageCaption: 'OIA 빌딩 전체 시각화',
        imageHint: 'FLOOR_PLAN의 6층 빌딩 렌더 이미지 (캐릭터·엘리베이터·유부까지 보이는 메인 비주얼)',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '하루 60통, 주당 25시간.',
        body: [
          '매일 오전 9시, 받은 메일함엔 최소 60통의 새 이메일이 쌓여 있었습니다. 105개 유럽 파트너 대학의 담당자, 연세 학생, 파트너교 학생, 신규 협정 제안, 갱신 논의 — 한국어·영어·프랑스어가 섞인 메일이 매일 쏟아졌습니다. 하루라도 대응을 미루면 미확인 메일은 150~200통으로 불어났습니다.',
          '한 학기 200건 이상의 ECTS 성적 환산, 매 학기 노미네이션 통보와 어드미션 안내, 비슷하지만 케이스마다 미묘하게 다른 FAQ 응대. 협정교 정보·학생 데이터·과거 케이스는 여러 엑셀·문서·메일에 흩어져, 한 건 처리마다 여러 창을 오갔습니다.',
          '주당 25시간 이상이 단순 반복 업무로 사라졌고, 정작 기획·전략 업무를 할 시간은 남지 않았습니다.',
        ],
        imageSrc: null,
        imageCaption: '받은 메일함 스크린샷 (150+ 미확인 상태)',
        imageHint: '민감정보 가리고 미확인 메일 개수 뱃지가 보이는 Gmail 스크린샷',
      },
      {
        kind: 'section',
        tag: 'APPROACH · I',
        heading: '시작은 단순했다. 퇴근하고 싶었다.',
        body: [
          '처음부터 "조직 자동화 플랫폼"을 만들려던 건 아니었습니다. 가장 아픈 지점부터 도구로 만들었습니다.',
          'Flask + Claude API로 이메일 분류·초안 시스템. GAS + Claude API로 ECTS 환산 자동화. FAQ 챗봇, D3.js 대시보드, 노미네이션 관리 GAS 웹앱, 증명서 자동 발급 시스템. 하나씩 늘어날 때마다 업무 시간이 조금씩 되돌아왔습니다.',
        ],
        imageSrc: null,
        imageCaption: '초기 도구들의 실행 화면 모음',
        imageHint: '이메일 분류기 UI / ECTS 환산 결과 / FAQ 챗봇 대화 중 하나 (단일 또는 콜라주)',
      },
      {
        kind: 'section',
        tag: 'APPROACH · II',
        heading: '도구가 10개를 넘자 새로운 문제가.',
        body: [
          '도구가 많아질수록 "이 일은 어떤 도구를 쓰지?"를 판단하는 것 자체가 인지 부담이 됐습니다. 각 도구는 제각각의 폴더, 제각각의 실행 방식, 제각각의 업데이트 주기를 가졌습니다.',
          '이 시점에 Claude Code를 만났습니다. 그리고 생각했습니다. 도구들을 한 명의 매니저가 조율하게 할 수는 없을까? 그리고 이왕이면, 진짜 사무실처럼 만들어볼까?',
        ],
        imageSrc: null,
        imageCaption: '프로젝트 폴더 구조 다이어그램',
        imageHint: '14개 부서 폴더가 펼쳐진 VS Code 사이드바 스크린샷, 또는 폴더 트리 다이어그램',
      },
      {
        kind: 'section',
        tag: 'APPROACH · III',
        heading: 'OIA 빌딩을 세웠습니다.',
        body: [
          'Claude Code의 서브에이전트와 CLAUDE.md 페르소나 시스템으로 가상의 6층 빌딩을 지었습니다. 14개 부서 폴더를 층과 방으로 매핑하고, 각 폴더에 담당 비서를 배치했습니다. 1F Léa(협정), 2F Mail(이메일), 3F Nomi(노미), 5F Céline(총괄), 6F에는 저와 치즈 고양이 유부(Uboo).',
          '이건 장식이 아니라 설계였습니다. 폴더 = 부서, 파일 변경 이벤트 = 비서의 상태 변화, 전체 활동량 = 유부의 순찰 속도. 파일 시스템의 추상적 이벤트를 조직 행동이라는 구체적 은유로 번역한 것입니다.',
          '유머러스한 네이밍은 일부러 고집했습니다. 유부 회장, 서아 대표, 커피 타임, 낮잠, 야근 — 이 디테일들이 AI를 도구가 아니라 동료로 대하는 태도의 선언입니다.',
        ],
        imageSrc: null,
        imageCaption: 'OIA 빌딩 상단부 (6F 대표 사무실과 유부)',
        imageHint: '6F 대표실 렌더 — 서아 책상, 캣휠, 캣타워, 유부가 보이는 클로즈업',
      },
      {
        kind: 'section',
        tag: 'APPROACH · IV',
        heading: '어느 오후, 마감 D-2.',
        body: [
          '15시. 전 층이 풀가동입니다. 2F Mail이 54통의 이메일을 분류 중, 3F Nomi가 파리정치대학 노미네이션 12건을 처리 중, 4F Solène이 교환 밸런스를 업데이트, 1F Léa가 IP Paris MoU 갱신을 대조. 5F Céline이 전체 상황을 조망합니다. 유부는 `peak` 모드로 층 사이를 순찰합니다.',
          '저는 그저 Céline에게 묻습니다. "오늘 IP Paris 관련해서 내가 지금 개입해야 하는 건 뭐야?"',
          '예전이라면 150통의 메일을 열고, 협정 폴더를 뒤지고, 성적표를 하나씩 환산했을 것입니다. 지금은 비서들이 각자 자기 폴더를 지키고, 저는 무엇을, 누구에게, 어떤 순서로 물을지만 결정합니다.',
        ],
        imageSrc: null,
        imageCaption: '풀가동 상태의 OIA 빌딩 (peak 모드)',
        imageHint: '전 층에 비서들이 working 상태, 유부가 엘리베이터에서 이동 중인 상태의 스크린샷',
      },
      {
        kind: 'section',
        tag: 'APPROACH · V',
        heading: '비전공자로서 AI와 일하는 법.',
        body: [
          '이 전체 시스템을 비전공자인 제가 만들 수 있었던 건, 요구사항 정의 → Claude와 페어 프로그래밍 → 실사용 → 개선이라는 루프에 정착했기 때문입니다. 저는 아키텍처 세부사항을 암기하지 않습니다. 대신 "무엇이 문제인지", "어떻게 작동해야 하는지", "지금 어디가 어색한지"를 정확히 설명합니다.',
          '비전공자라는 사실이 더 이상 장벽이 아니라, 업무 현장의 실제 페인포인트를 가장 잘 아는 기획자가 직접 도구를 만들 수 있다는 무기가 됐습니다.',
        ],
        imageSrc: null,
        imageCaption: 'Claude Code 터미널 작업 중',
        imageHint: 'Claude Code 실행 중인 터미널 + 에디터 분할 화면 스크린샷',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: '숫자로 본 변화',
        table: [
          { label: '주간 이메일 처리 시간', before: '25시간+', after: '약 8시간' },
          { label: 'ECTS 환산 (건당)', before: '8~10분', after: '30초 이내' },
          { label: '학기당 ECTS 환산', before: '약 30시간', after: '약 2시간' },
          { label: '노미네이션 안내 메일 (학생당)', before: '15분', after: '2~3분' },
          { label: '미확인 메일 누적', before: '150~200통', after: '30통 이내' },
        ],
        body: [
          {
            h: '솔직히 말하면, 처음엔 오히려 시간이 두 배 걸렸습니다.',
            p:
              '자동화를 기획하면서 기존 업무도 쳐내야 했기 때문입니다. 그러나 도구가 쌓이고 OIA 빌딩으로 통합된 지금 — 커피 한 잔 마실 시간에 제 비서들이 원고를 검수하고, 메일 초안을 쓰고, 성적표를 환산하고 있습니다. 저는 실행의 짐에서 놓여났을 뿐, 여전히 이 모든 것을 총괄·검토·승인하는 결정권자입니다.',
          },
          {
            h: '시간이 생겼다는 것의 진짜 의미',
            p:
              '업무 시간에 비로소 기획과 전략에 집중할 수 있게 됐습니다. 국제처 홈페이지 개편, 협정교 DB 구축, 유럽 파트너 벤치마킹 출장 기획 — 자동화 사무실이 없었다면 시도조차 못 했을 프로젝트들입니다. 퇴근 후엔 대학원 수업과 AI 학회 스터디에 정상적으로 참여하고 있습니다.',
          },
        ],
        imageSrc: null,
        imageCaption: '주간 업무 시간 변화 그래프',
        imageHint: '이메일 처리 시간 감소 그래프 (Before/After 막대 또는 시계열 차트)',
      },
      {
        kind: 'scenes',
        tag: 'SCENES',
        heading: '세 가지 장면',
        scenes: [
          '마크롱 대통령 방문 당일. 저는 의전 현장에 집중할 수 있었습니다. 그날 아침에도 Mail이 90통 넘는 메일을 분류해두었기 때문입니다.',
          '처음으로 정시 퇴근한 날. 집에 돌아왔을 때, 유부(실제 고양이)가 평소보다 일찍 저를 반겼습니다.',
          '석사 과정 수업에 처음으로 지각 없이 들어간 날. 강의실 맨 앞자리에 앉았습니다.',
        ],
        closing: {
          h: '아직 끝나지 않은 이야기',
          p:
            '이 시스템은 아직 저 혼자 쓰고 있습니다. 우리 조직은 AI에 여전히 보수적이고, 개인이 만든 도구를 조직 전체에 이식하는 건 다른 종류의 문제입니다. 그래서 저는 더 큰 무대를 찾고 있습니다.',
        },
        imageSrc: null,
        imageCaption: '실제 유부 (치즈 고양이) 사진',
        imageHint: '유부 사진 한 장 — 잘 나온 귀여운 포즈 (편안한 톤의 마무리 이미지)',
      },
    ],
  },

  // ── Project 2 — Univ Finder ────────────────────
  univFinder: {
    id: 'univ-finder',
    index: '02',
    year: '2025',
    title: '대학 검색 대시보드',
    subtitle: 'Univ Finder — D3.js 기반 인터랙티브 웹 도구',
    stack: ['React', 'D3.js', 'Tailwind', 'Google Sheets API', 'Netlify'],
    slides: [
      {
        kind: 'cover',
        heading: '대학 검색 대시보드',
        sub: 'Univ Finder — D3.js 기반 인터랙티브 웹 도구',
        body:
          '248개 파트너 대학 정보를 학생이 직관적으로 탐색할 수 있게 만든 대시보드. OIA의 반복 FAQ를 도구로 전환.',
        imageSrc: null,
        imageCaption: 'Univ Finder 메인 화면',
        imageHint: 'oiaunivfinder.netlify.app 메인 뷰 스크린샷 (전체 UI)',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '매년 반복되는 같은 질문들.',
        body: [
          '"제 TOEFL 92점이면 어디 갈 수 있어요?", "유럽에서 영어로 수업 듣는 학교는 어디예요?", "독일 학교 중에 공학 전공 가능한 곳이요." — 학생들은 248페이지 PDF 책자를 뒤지거나 OIA로 전화를 걸었고, 저와 동료들은 하루에도 수십 번씩 같은 답을 반복했습니다.',
        ],
        imageSrc: null,
        imageCaption: '기존 PDF 책자의 모습',
        imageHint: '대학교 목록이 빼곡한 PDF 페이지 샷 — "이게 전부 텍스트였다"는 인상',
      },
      {
        kind: 'section',
        tag: 'APPROACH',
        heading: '학생이 직접 필터링할 수 있는 도구.',
        body: [
          '자기 조건으로 필터링하고, 즐겨찾기하고, CSV로 내려받아 부모님·지도교수와 공유할 수 있는 대시보드를 만들기로 했습니다. D3.js + React. 지역·국가·TOEFL 점수대·배정 인원·QS 랭킹을 다차원 필터로 동시 적용. 248개 대학 데이터를 Google Sheets에서 실시간으로 로드해 업데이트 부담을 제거. 즐겨찾기는 LocalStorage에 저장되고 CSV 내보내기 지원.',
        ],
        imageSrc: null,
        imageCaption: '필터 패널과 결과 리스트',
        imageHint: '필터가 적용된 상태의 스크린샷 — 사이드 필터 + 결과 카드가 모두 보이는 뷰',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: '배포: oiaunivfinder.netlify.app',
        body: [
          {
            h: '',
            p:
              '학생 FAQ 문의 감소. 국제처 홈페이지 개편 시 메인 기능으로 통합 예정. 교환학생 모집 설명회 자료에 공식 소개.',
          },
        ],
        imageSrc: null,
        imageCaption: '즐겨찾기 + CSV 내보내기 화면',
        imageHint: '하트 체크된 대학들이 보이는 상태 + CSV 다운로드 버튼 강조된 스크린샷',
      },
    ],
  },

  selected: {
    number: 'III',
    title: 'Selected Works',
    intro: '그 외 작업들. 카드를 클릭하면 상세 설명이 펼쳐집니다.',
    projects: [
      {
        title: 'ECTS 성적 환산 자동화',
        year: '2025–2026',
        stack: ['GAS', 'Claude API', 'python-docx'],
        body:
          '교환학생이 유럽 파트너교에서 받아온 성적표(ECTS 단위)를 연세대 학점으로 환산하는 작업을 자동화. 학기당 200건 이상의 반복 작업이 건당 8~10분에서 30초 이내로 단축. 대학원 진학 준비생을 위해 환산 공식 근거 영문 Certificate 표준 서식도 함께 제작.',
        imageCaption: 'ECTS 환산 결과 스프레드시트',
        imageHint: 'GAS가 자동 생성한 연세대 학점이 채워진 Google Sheets 스크린샷',
      },
      {
        title: '연세대 국제처 홈페이지 개편',
        year: '2026',
        stack: ['React', 'TypeScript', 'Netlify'],
        body:
          '레거시 중심의 개발 환경에서, 기획자가 직접 React로 목업을 만들어 개발 요건 정의서와 함께 제시. 메인 통계를 "Since 1966 · 80+ Partner Countries · 740+ Partner Universities"로 재구성하고 역사 타임라인을 스크롤 인터랙션으로 풀어냄. 이 목업과 요건 정의서가 실제 개편 프로젝트의 기준선이 됨.',
        imageCaption: 'yonsei-oia.netlify.app 메인 히어로',
        imageHint: '목업 사이트의 Hero + 통계 3개가 보이는 상단부 스크린샷',
      },
      {
        title: '협정교 DB 구축',
        year: '2026',
        stack: ['Excel', 'Google Sheets', 'openpyxl', 'Claude Code'],
        body:
          '740여 개 해외 파트너 대학의 협정 정보를 27개 컬럼 스키마로 표준화. 공개용 8개 컬럼과 내부 관리용 19개 컬럼을 색상으로 구분하고, 주요 필드에 드롭다운 유효성 검사 적용. 향후 홈페이지 임베드와 만료 알림 자동화로 확장 예정.',
        imageCaption: '27컬럼 DB 스키마 (공개/내부 구분)',
        imageHint: '색상으로 구분된 엑셀 헤더 스크린샷 — 공개 컬럼과 내부 컬럼 경계가 보이게',
      },
      {
        title: '마크롱 대통령 특강 운영',
        year: '2026',
        stack: ['French Delegation', 'Protocol', 'Event Ops'],
        body:
          '2026년 4월 3일 마크롱 프랑스 대통령의 연세대 특별강연 실무 총괄. 7주의 준비 기간 동안 엘리제궁·주한프랑스대사관·청와대 경호처·교내 5개 부서를 조율. 총장 환영사·학생 Q&A 기획·리허설·보도자료·PCO 수의계약 사유서까지 전 과정 기획·작성. 국내 언론 169건·프랑스 외신 보도의 성과.',
        imageCaption: '행사 당일 각당헌 현장',
        imageHint: '공개 가능한 현장 사진 1컷 — 행사장 전경 또는 총장 환영사 장면',
      },
    ],
  },

  experience: {
    number: 'IV',
    title: 'Experience & Education',
    roles: [
      {
        org: '연세대학교 국제처',
        position: 'Europe Region Exchange Program Manager',
        period: '2025.11 – 현재',
        bullets: [
          '105개 유럽 파트너 대학과의 Exchange Program 전략·운영 총괄',
          '2026년 4월 마크롱 프랑스 대통령 연세대 특별강연 행사 실무 총괄 (7주 내 완수)',
          '교환 프로그램 운영 자동화 이니셔티브 주도 — Flask·GAS·React·D3.js·Claude Code',
          '유럽 파트너 벤치마킹 출장 프로젝트 기획·지원 선정 (Sciences Po, UCL, LSE)',
        ],
      },
      {
        org: '연세대학교 국제처',
        position: 'YISS/WAY International Program Manager',
        period: '2024.01 – 2025.10',
        bullets: [
          'YISS·WAY 40주년 기념행사 기획·운영 (Suno AI 테마송, 소셜미디어 110K+ 조회)',
          '국제 단기 프로그램 운영 전반 — 인보이스·HTML 이메일·수강신청 검증·학사 일정',
          '2025년 EAIE 스웨덴 컨퍼런스 참가, 노르웨이·프랑스 파트너 대학 방문',
        ],
      },
    ],
    education: [
      {
        school: '연세대학교 인공지능융합대학원',
        degree: 'M.S. in AI Computing',
        period: '2025.09 – 재학 중',
        bullets: [
          'RAG 기반 교환학생 후기 검색 시스템 팀 프로젝트',
          'NLP Study Group — ReAct 논문 발표 (이메일 트리아지 시스템을 현장 구현 사례로 소개)',
        ],
      },
      {
        school: '연세대학교',
        degree: 'B.A. in French Language & Literature',
        period: '졸업 2013.08',
        bullets: [],
      },
    ],
  },

  skills: {
    number: 'V',
    title: 'Skills',
    groups: [
      {
        heading: 'AI & Development',
        items: 'Python · Flask · Google Apps Script · Claude API · Claude Code · React · TypeScript · D3.js · Chart.js · HTML/CSS/JS · Git · Netlify',
      },
      {
        heading: 'Product & Planning',
        items: 'Service Design · User Research · KPI Design · Cross-functional Coordination · Technical Documentation · AI PoC Ideation & Delivery',
      },
      {
        heading: 'Data & Automation',
        items: 'Google Sheets · Excel · Data Visualization (D3.js, Chart.js, Tableau) · Workflow Automation · API Integration',
      },
      {
        heading: 'Domain',
        items: 'International Education · European University Partnerships · Government Liaison · Event Management (VVIP Protocol) · Multilingual Communication',
      },
      {
        heading: 'Languages',
        items: 'Korean (Native) · English (Professional) · French (Intermediate)',
      },
    ],
  },

  contact: {
    number: 'VI',
    title: 'Contact',
    heading: '새로운 대화를 기다리고 있습니다.',
    email: 'sachoi@yonsei.ac.kr',
    linkedin: 'linkedin.com/in/seoah-choi',
    linkedinUrl: 'https://linkedin.com/in/seoah-choi',
  },

  footer: {
    copyright: '© 2026 Céline Choi · 최서아 (Seo-Ah Choi)',
  },
};
