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
    nameRoman: 'Seo-Ah (Céline) Choi',
    role: 'AI 기획자 · 기술 PM 지향',
    taglineEn: 'Planner, Builder, Operator.',
    tagline: '현장을 아는 사람이\n도구를 만듭니다.',
    subtitle:
      '운영 현장의 문제를 가장 잘 아는 사람이, 그 문제를 푸는 프로덕션 시스템을 직접 만듭니다.',
  },
  nav: {
    work: 'Work',
    about: 'About',
    lab: 'Lab',
    contact: 'Contact',
  },
  hero: {
    stats: [
      { value: '-83%', label: 'ECTS 학점 환산 처리시간' },
      { value: '25h → 8h', label: '주간 이메일 트리아지' },
      { value: '10,000+', label: '740+ 협정교 문서 분석' },
      { value: '15', label: '운영 중인 AI 에이전트' },
    ],
    hint: '↓ Selected Work',
  },
  about: {
    number: '02',
    title: 'About',
    body: [
      '프랑스어를 전공한 비개발자가, 공기업과 대학의 운영 현장에서 12년간 일하며 직접 프로덕션 시스템을 만듭니다. 시작은 2024년, 입학 급증으로 한 번에 2,200건의 서류를 처리해야 했던 날이었습니다. Python을 독학해 80초 만에 끝내는 도구를 만든 뒤로, 흩어져 있던 부서 업무를 15개 AI 에이전트가 상주하는 사무실 시뮬레이션(OIA Rush)으로 묶고 file-watching으로 각 폴더의 상태를 연동했습니다.',
      '무엇을 자동화할지 고르고, 데이터 구조와 아키텍처를 설계하고, 출력을 검증하는 판단을 내립니다. 도구가 대신 못 하는 이 판단이 시스템의 품질을 결정합니다. 다음 목표는 운영 현장을 아는 사람이 만드는 AI 프로덕트를 AI 기획자·기술 PM으로서 이어가는 것입니다.',
    ],
    snapshot: [
      { k: 'Now', v: '연세대학교 국제처 유럽 교환 담당 · 동기 중 최단기 과장 승진(2025.09)' },
      { k: 'Study', v: 'AI융합대학원 석사 재학(HCI) · RAG · ReAct · 학회 감사위원' },
      { k: 'Build', v: 'Claude Code · Flask · GAS · React · TypeScript · D3.js' },
      { k: 'Proof', v: 'ECTS -83% · 이메일 25h→8h · 마크롱 특강 총괄 · 교육부 장관 표창' },
    ],
    careerTitle: 'Experience',
    eduTitle: 'Education',
    skillsTitle: 'Skills',
    highlight: {
      label: '운영 하이라이트',
      title: '마크롱 대통령 특강 총괄',
      year: '2026',
      body:
        '2026년 4월 마크롱 프랑스 대통령의 연세대 특별강연 기획·운영을 총괄. 다자 이해관계자를 조율해 국내 언론 169건과 엘리제궁 공식 유튜브 방영으로 이어졌습니다.',
      image: 'shot-macron.png',
    },
    cvTrail: '· 아래에서 대표 작업과 상세 경력을 볼 수 있습니다.',
  },

  method: {
    steps: [
      { id: '01', label: '문제 정의', desc: '어떤 도구를 만들어야 하는지부터 묻는다.' },
      { id: '02', label: '구조 설계', desc: '데이터를 어떤 형태로 담을지 먼저 그린다.' },
      { id: '03', label: '질문 설계', desc: 'Claude에게 무엇을, 어떻게 물을지 정한다.' },
      { id: '04', label: '검증', desc: '결과물이 실제 업무에 쓸 만한지 직접 써본다.' },
      { id: '05', label: '반복 개선', desc: '본인과 동료의 피드백을 받아 다시 만진다.' },
      { id: '06', label: '배포·운영', desc: '실제로 쓰이는 곳까지 가져간다.' },
    ],
  },

  work: {
    number: '01',
    title: 'Work',
    intro: '운영 현장의 문제를 직접 만든 프로덕션 시스템으로 풀어낸 대표 작업들.',
    more: '자세히 보기 →',
    less: '접기',
  },

  // ── Project 1 — OIA Building ──────────────────────
  oiaBuilding: {
    id: 'oia-building',
    index: '01',
    year: '2026',
    title: 'OIA Village',
    subtitle: '실제 Claude 에이전트가 일하는 모습이 실시간으로 비치는 언덕 위 공방 마을',
    stack: ['Claude Code', 'TypeScript', 'Canvas 2D', 'Vite', 'SSE'],
    slides: [
      {
        kind: 'cover',
        heading: '살아있는 에이전트 마을',
        sub: '실제 Claude 에이전트가 일하는 모습이 실시간으로 비치는 언덕 위 공방 마을',
        body:
          '분산된 업무 폴더에 15명의 AI 페르소나를 심고, Claude Code 에이전트가 실제로 일할 때(Edit·Read·세션 시작/종료)의 활동이 언덕 위 마을에 실시간으로 비치게 만든 리빙심. 코인도 상점도 없이, 일하는 에이전트들을 들여다보는 것 자체가 경험입니다. 실무자에서 지휘자로 역할을 바꾼 지난 1년의 기록.',
        imageSrc: null,
        imageCaption: 'OIA Village — 언덕 위 공방 마을',
        imageHint: '언덕 위 공방 마을 데모 영상 (오두막·장인·길고양이 유부가 보이는 메인 비주얼)',
        videoSrc: 'oia-village-demo.webm',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '하루 100통, 무한 반복 메일 지옥.',
        body: [
          '매일 오전 9시, 수 백개의 해외대학 파트너들과 학생들의 이메일이 넘쳐났고, 한국어·영어·프랑스어가 섞인 메일을 일일이 읽느라 기획과 전략 업무는 언제나 뒷전이었습니다.',
          '업무 데이터들이 제각기 여러 개의 엑셀·문서·메일에 흩어져, 한 건을 처리할 때마다 수십 개의 창을 오가야 했습니다. 하루 일과의 대부분이 단순 반복 업무로 사라졌고, 정작 회사의 기획·전략 업무를 할 시간은 남지 않았습니다.',
        ],
        imageSrc: null,
        imageCaption: '받은 메일함 스크린샷 (150+ 미확인 상태)',
        imageHint: '민감정보 가리고 미확인 메일 개수 뱃지가 보이는 Gmail 스크린샷',
      },
      {
        kind: 'section',
        tag: 'APPROACH · I',
        heading: '시작은 단순한 호기심에서부터였다.',
        body: [
          '처음부터 모든 걸 자동화할 생각은 없었고, 그저 좀 더 나은 환경을 만들고 싶었습니다.',
          '이메일 분류 트리아지, ECTS 자동 환산 시스템, 노미네이션 통합 GAS 대시보드, 증명서 자동 발급 시스템... 저의 실험이 성공할 때마다 성과는 눈에 띄게 늘어났습니다.',
        ],
        imageSrc: null,
        imageCaption: '초기 도구들의 실행 화면 모음',
        imageHint: '이메일 분류기 UI / ECTS 환산 결과 / FAQ 챗봇 대화 중 하나 (단일 또는 콜라주)',
      },
      {
        kind: 'section',
        tag: 'APPROACH · II',
        heading: '인간의 욕심은 끝이 없고, AI는 재미있는 게임이다.',
        body: [
          '구축한 시스템이 많아질수록 "이 일에는 어떤 툴을 써야 하지?"를 판단하기가 부담이 되기 시작했습니다. 제각각의 폴더, 서로 다른 업데이트 주기가 고민이었던 어느 날, 하나의 생각이 스쳤습니다. 업무들을 한 곳에 모아볼까?',
          '그리고 이왕이면 "게임처럼" 만들어볼까?',
        ],
        imageSrc: null,
        imageCaption: '프로젝트 폴더 구조 다이어그램',
        imageHint: '15개 부서 폴더가 펼쳐진 VS Code 사이드바 스크린샷, 또는 폴더 트리 다이어그램',
      },
      {
        kind: 'section',
        tag: 'APPROACH · III',
        heading: '시켜줘요, OIA 명예 촌장.',
        body: [
          'Claude Code의 서브에이전트와 CLAUDE.md 페르소나로 언덕 위 공방 마을을 세웠습니다. 15개 부서 폴더를 마을의 오두막에 하나씩 매핑하고, 각 오두막에 담당 장인을 배치했습니다.',
          'Edit을 쓰면 타이핑하고, Read를 쓰면 바인더를 뒤적이고, 세션이 끝나면 불을 끄고 퇴근합니다. 추상적인 에이전트 활동을, 시간대(새벽·낮·황혼·밤)까지 흐르는 마을 풍경으로 옮겼습니다.',
        ],
        imageSrc: null,
        imageCaption: '',
        imageHint: '서아의 오두막 클로즈업 — 길고양이 유부가 보이는 회화풍 렌더',
      },
      {
        kind: 'section',
        tag: 'APPROACH · IV',
        heading: '어느 날 오후, 서류마감 D-2.',
        body: [
          '오후 3시. Léa는 오두막에서 MoU 초안을, Mail은 154통의 메일을, Nomi는 노미네이션 8건을, Solène는 교환 밸런스를 처리합니다. 길고양이 유부는 황혼이 지는 마을을 어슬렁거립니다.',
          '저는 Céline에게 묻기만 하면 됩니다. "오늘 파트너 협상 포인트는 뭐야?" 예전이라면 모든 메일과 폴더를 뒤졌을 일을, 지금은 `무엇을, 누구에게, 어떤 순서로` 물을지만 결정합니다.',
        ],
        imageSrc: null,
        imageCaption: '',
        imageHint: '마을 전체의 장인들이 working 상태, 유부가 언덕을 가로지르는 스크린샷',
      },
      {
        kind: 'section',
        tag: 'APPROACH · V',
        heading: '코드가 아니라 판단으로 만듭니다.',
        body: [
          '무엇이 문제인지 정의하고, 어떻게 풀지 아키텍처를 설계하고, 출력을 검증하고, 다른 영역에 응용할 지점을 찾습니다. 도구가 대신 못 하는 이 판단들이 시스템의 품질을 결정합니다.',
          '업무 현장의 페인포인트를 가장 잘 아는 사람이 직접 프로덕션 도구를 만듭니다. 비개발자·인문학 배경은 약점이 아니라 그 강점의 출발점입니다.',
        ],
        imageSrc: null,
        imageCaption: 'Claude Code 터미널 작업 중',
        imageHint: 'Claude Code 실행 중인 터미널 + 에디터 분할 화면 스크린샷',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: '구조를 바꾸니 변화한 일상',
        body: [
          {
            h: '솔직히 말하면, 처음엔 오히려 시간이 두 배 걸렸습니다.',
            p:
              'MCP를 설계하면서 업무와 대학원을 병행해야 했기 때문입니다. 그러나 OIA 마을이 세워지자, 저는 비효율의 늪에서 벗어나 이 마을을 내려다보는 촌장이 되었습니다.',
          },
          {
            h: '시간이 생겼다는 것의 진짜 의미',
            p:
              '단순 반복적인 업무에서 벗어나니 회사의 기획과 전략에 집중할 수 있게 되었고, 퇴근 후 대학원 수업과 AI 학회에도 참여하고 있습니다.',
          },
        ],
        imageSrc: null,
        imageCaption: '주간 업무 시간 변화 그래프',
        imageHint: '이메일 처리 시간 감소 그래프 (Before/After 막대 또는 시계열 차트)',
      },
      {
        kind: 'scenes',
        tag: 'SCENES',
        heading: '모든 것이 달라진 일상',
        scenes: [
          '마크롱 대통령이 연세대학교를 찾은 날에도 저는 제 비서들 덕분에 현장 기획에 집중할 수 있었습니다.',
          '정시 퇴근을 하고 집에 돌아오면, 유부가 평소보다 일찍 저를 반겼습니다.',
          '대학원 수업에 지각 없이 도착해, 강의실 맨 앞자리에 앉았습니다.',
        ],
        closing: {
          h: '아직 끝나지 않은 이야기',
          p:
            '이제 저는 변화를 직접 설계할 무대를 찾고 있습니다.',
        },
        imageSrc: null,
        imageCaption: '',
        imageHint: '유부 사진 한 장 — 잘 나온 귀여운 포즈 (편안한 톤의 마무리 이미지)',
      },
    ],
    buildingFloorMap: [null, 2, null, null, 5, 5, null, 5, 0] as const,
  },

  // ── Project 2 — Univ Finder ────────────────────
  univFinder: {
    id: 'univ-finder',
    index: '02',
    year: '2025',
    title: 'OIA University Finder',
    subtitle: 'D3.js 기반 인터랙티브 웹 도구',
    stack: ['React', 'D3.js', 'Tailwind', 'Google Sheets API', 'Netlify'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA University Finder',
        sub: '262개 해외대학을 직관적으로 — D3.js 기반 인터랙티브 대시보드',
        body:
          '학생들의 반복 FAQ를 도구로 전환했습니다. 자기 조건으로 필터링·즐겨찾기·CSV 내보내기가 가능한 대시보드.',
        imageSrc: null,
        imageCaption: 'Univ Finder 메인 화면',
        imageHint: 'oiaunivfinder.netlify.app 메인 뷰 스크린샷',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '매년 반복되는 같은 질문들.',
        body: [
          '"제 TOEFL 92점이면 어디 갈 수 있어요?", "유럽에서 영어로 수업 듣는 학교는 어디예요?", "독일 학교 중에 장학금 주는 곳 있어요?" - 학생들은 엑셀파일, 홈페이지를 뒤적이다 사무실로 전화를 걸었고, 저희 팀은 하루에도 수십 번씩 같은 답을 반복했습니다.',
        ],
        imageSrc: null,
        imageCaption: '기존 엑셀 파일의 모습',
        imageHint: '대학교 목록이 빼곡한 페이지 샷 — "이게 전부 텍스트였다"는 인상',
      },
      {
        kind: 'section',
        tag: 'APPROACH',
        heading: '학생이 직접 필터링할 수 있는 도구.',
        body: [
          '자기 조건으로 필터링하고, 즐겨찾기하고, CSV로 내려받아 부모님·지도교수와 공유할 대시보드를 만들었습니다. D3.js + React로 지역·국가·TOEFL 점수·선발 인원을 다차원 필터로 동시 적용, 262개 대학 데이터를 Google Sheets에서 실시간으로 로드해 업데이트 부담을 없애고 즐겨찾기 및 CSV 내보내기 기능을 지원합니다.',
          '같은 협정교 데이터는 내부적으로 학생 후기 점수·만족도와 계약 갱신(3·5년) 판단을 잇는 운영 대시보드로도 확장해, 학생용 탐색과 부서 의사결정을 하나의 데이터로 연결했습니다.',
        ],
        imageSrc: null,
        imageCaption: '필터 패널과 결과 리스트',
        imageHint: '필터가 적용된 상태의 스크린샷 — 사이드 필터 + 결과 카드가 모두 보이는 뷰',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: '배포: https://oia.yonsei.ac.kr/univfinder',
        body: [
          {
            h: '',
            p:
              '성과: 학생 민원 감소, 학생 사용자 경험 극대화, 국제처 웹사이트 도메인 공식 배포.',
          },
        ],
        imageSrc: null,
        imageCaption: '즐겨찾기 + CSV 내보내기 화면',
        imageHint: '하트 체크된 대학들이 보이는 상태 + CSV 다운로드 버튼 강조된 스크린샷',
      },
    ],
    buildingFloorMap: [null, null, null, null] as const,
    showBuilding: false,
    link: 'https://oia.yonsei.ac.kr/univfinder',
    image: 'shot-univfinder.png',
  },

  // ── Project 3 — OIA Website Redesign ───────────────
  oiaWebsite: {
    id: 'oia-website',
    index: '03',
    year: '2026',
    title: 'OIA Website Redesign',
    subtitle: '레거시 ASP 공식 사이트를, 작동하는 React 프로토타입을 기준선으로 개편',
    stack: ['React', 'TypeScript', 'SEO', 'Bilingual Copy', 'Netlify'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA Website Redesign',
        sub: '기획서가 아니라, 실제 배포된 프로토타입을 기준선으로.',
        body:
          '레거시(ASP) 공식 사이트 oia.yonsei.ac.kr를 현대적 구조로 개편하기 위해, 기획자가 직접 작동하는 React 목업을 만들고 개발 요건 정의서와 함께 제시한 프로젝트.',
        imageSrc: null,
        imageCaption: 'yonsei-oia.netlify.app 메인 히어로',
        imageHint: '목업 사이트의 Hero + 메인 통계 영역 스크린샷',
      },
      {
        kind: 'section',
        tag: 'PHASE · I',
        heading: '작동하는 프로토타입부터.',
        body: [
          '전체 사이트맵을 5개 대분류(Introduction · Partnerships · Inbound · Outbound · News & Events)로 구조화하고, 38개 페이지를 더미 데이터로 구현했습니다.',
          '2-depth 아코디언 메뉴, 언더바 호버 애니메이션, 반응형(1024/768px 기준점), 연세 공식 네이비(#003876) 기반 디자인을 적용. 확장성과 유지보수성을 최우선으로 모듈화하고, 순수 HTML/CSS/JS에서 React/TypeScript SPA로 고도화했습니다.',
        ],
        imageSrc: null,
        imageCaption: '5개 대분류 사이트맵 / 아코디언 내비게이션',
        imageHint: '사이트맵 다이어그램 또는 2-depth 아코디언 메뉴가 펼쳐진 스크린샷',
      },
      {
        kind: 'section',
        tag: 'PHASE · II',
        heading: '개발사가 바로 착수할 수 있는 문서.',
        body: [
          'React 목업과 기존 ASP 사이트를 비교하는 AS-IS / TO-BE 문서(PPT)를 제작했습니다.',
          '페이지를 4가지 개발 유형(정적 텍스트형 · 게시판형 · 데이터 관리형 · SSO 보호형)으로 분류해 개발 복잡도를 명확히 하고, SSO 인증 범위(Outbound 전용)와 관리자 CMS 요건을 정의했습니다.',
        ],
        imageSrc: null,
        imageCaption: 'AS-IS / TO-BE 요건 정의서',
        imageHint: 'AS-IS/TO-BE 비교 슬라이드 또는 페이지 유형 분류표 스크린샷',
      },
      {
        kind: 'section',
        tag: 'PHASE · III',
        heading: '노후화되지 않는 콘텐츠와 SEO.',
        body: [
          'route-based metadata map 방식으로 페이지별 title · description · keywords를 최적화했습니다(길이 기준 정리, 키워드 중복 제거, 브랜드 표기 통일).',
          '매년 바뀌는 랭킹 숫자 대신 "Since 1966 · 80+ Partner Countries · 740+ Partner Universities"로 메인 통계를 재구성해 콘텐츠 노후화를 방지. 연세 국제화 타임라인을 스크롤 인터랙션으로 풀고, 기존엔 입학처로 바로 리다이렉트되던 공백을 메우는 "Degree Seeking" 안내 랜딩 페이지를 신설했습니다.',
        ],
        imageSrc: null,
        imageCaption: '메인 통계 영역 / 국제화 타임라인',
        imageHint: 'Since 1966 통계 블록 또는 스크롤 타임라인 인터랙션 스크린샷',
      },
      {
        kind: 'section',
        tag: 'PHASE · IV',
        heading: '"안내문을 읽는 홈페이지에서, 세계를 탐색하는 홈페이지로."',
        body: [
          '관료적인 기관 문체를 자연스럽고 사람다운 톤으로 다듬었습니다(히어로, 사무실 이전 안내, 프로그램·이벤트 소개).',
          '비전문가도 이해할 수 있는 HTML 런칭 안내 이메일을 제작해 내부 공유까지 마무리했습니다.',
        ],
        imageSrc: null,
        imageCaption: 'Before / After 카피 비교',
        imageHint: '기존 문체와 개선된 카피를 나란히 둔 비교 이미지',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: '개편 프로젝트의 기준선이 되다.',
        body: [
          {
            h: '보수적 조직에서 외주를 움직인 방법',
            p:
              '조직이 AI·신기술에 보수적이고 레거시 개발 환경에서 외주를 움직이기 어려운 상황에서, 기획자가 직접 작동하는 프로토타입과 요건 정의서를 제시해 실제 개편 프로젝트의 기준선을 마련했습니다.',
          },
          {
            h: '디자인부터 카피까지 풀스택 단독 수행',
            p:
              '디자인·정보구조·SEO·이중언어 카피까지 단독으로 수행했고, University Finder 연동으로 학생 반복 문의를 도구로 전환하는 방향성도 함께 제시했습니다.',
          },
        ],
        imageSrc: null,
        imageCaption: '',
        imageHint: '',
      },
    ],
    showBuilding: false,
    link: 'https://yonsei-oia.netlify.app',
    image: 'shot-oia-website.png',
  },

  lab: {
    number: '03',
    title: 'LAB',
    intro: '',
    tools: [
      {
        title: 'ECTS 성적 환산 자동화',
        image: 'shot-lab-ects.png',
        year: '2025–2026',
        stack: ['GAS', 'Claude API', 'python-docx'],
        body:
          '유럽 파트너교 성적표(ECTS)를 연세대 학점으로 환산. 학기당 200건 이상 반복 작업에서 처리시간 83% 단축.',
      },
      {
        title: '협정교 DB 구축',
        image: 'shot-lab-partner-db.png',
        year: '2026',
        stack: ['Google Sheets', 'openpyxl', 'Claude Code'],
        body:
          '전 세계 협정 정보를 27개 컬럼 스키마로 표준화하고 주요 필드에 드롭다운 유효성 검사 적용. 어드민 임베드·내부망 대시보드로 확장 예정.',
      },
      {
        title: '이메일 트리아지 시스템',
        image: 'shot-lab-email-triage.png',
        year: '2025',
        stack: ['GAS', 'Claude API'],
        body:
          '하루 100통 넘게 쏟아지는 한·영·불 혼합 메일을 자동 분류·요약. 주간 이메일 처리 시간을 25시간에서 8시간으로 줄였습니다.',
      },
      {
        title: 'RAG 기반 경험보고서 후기 분석 시스템',
        image: 'shot-lab-e-report.png',
        year: '2025',
        stack: ['RAG', 'Embeddings', 'Python'],
        body:
          '교환학생 경험보고서 약 1만 3천 건을 검색 가능한 RAG 시스템으로 구축. 사전 사용자 설문으로 기숙사·물가 등 검색 우선순위를 정해 비정형 후기를 전처리·분석했습니다.',
      },
      {
        title: '노미네이션 통합 GAS 대시보드',
        image: 'shot-lab-nomination.png',
        year: '2025',
        stack: ['GAS', 'Google Sheets'],
        body:
          '여러 시트·메일에 흩어진 노미네이션 처리 상태를 한 화면으로 통합. 건별 상태 추적과 누락 방지를 자동화했습니다.',
      },
      {
        title: '행정서류 자동 추출·검증 시스템',
        image: 'shot-lab-doc-extract.png',
        year: '2026',
        stack: ['Python', 'Claude API'],
        body:
          '단순 반복적인 행정 서류를 LLM으로 파싱해 핵심 항목을 자동 추출하고, 불확실한 건은 사람 검토로 넘기는 로컬 도구.',
      },
      {
        title: '학생 서류 일괄 자동화',
        image: 'shot-lab-doc-batch.png',
        year: '2024',
        stack: ['Python'],
        body:
          '인증서·문서 템플릿의 이름 등 항목을 일괄 치환해 학생별 파일로 저장. 한 번에 2,200건을 80초 안에 처리했습니다.',
      },
      {
        title: '증명서 발급 시스템',
        image: 'shot-lab-certificate.png',
        year: '2025',
        stack: ['Python', 'Cloudflare Tunnel'],
        body:
          '증명서 생성·발급을 자동화하고 Cloudflare Tunnel로 라이브 배포했습니다.',
      },
      {
        title: 'OIA 브로슈어 멀티에이전트 파이프라인',
        image: 'shot-lab-brochure.png',
        year: '2026',
        stack: ['Claude API', 'Python'],
        body:
          '여러 AI 에이전트가 협업해 OIA 홍보 브로슈어를 제작하는 파이프라인.',
      },
    ],
  },

  experience: {
    affiliation: {
      org: '연세대학교',
      period: '2016.03 – 현재',
      divisions: [
        {
          name: '국제처 국제팀',
          period: '2024.01 – 현재',
          roles: [
            {
              position: 'Exchange Program Manager',
              period: '2025.09 – 현재',
              bullets: [
                '연세대학교 교환학생 해외파견 프로그램 운영 총괄',
                '프랑스 대통령 연세대 특별강연 행사 총괄 기획',
                '해외파견 프로그램 자동화 이니셔티브: Flask·GAS·React·D3.js·Claude Code',
                '2025년 EAIE 컨퍼런스 및 유럽 파트너 대학 방문(스웨덴, 노르웨이, 프랑스) - 신규 협정 체결',
              ],
            },
            {
              position: 'YISS/WAY Program Coordinator',
              period: '2024.01 – 2025.10',
              bullets: [
                '국제하계대학 40주년 기념행사 기획 (Suno AI 테마송, SNS 110K+뷰)',
                '국제화 단기 프로그램 실무 총괄 - 인보이스·이메일·수강신청 검증 자동화',
              ],
            },
          ],
        },
        {
          name: '연합신학대학원(GIT) · 언더우드국제대학',
          period: '2016.03 – 2023.12',
          roles: [
            {
              position: 'Administrative Office Coordinator — 외국인 유학생 유치',
              period: '',
              bullets: [
                'GIT 외국인 영어트랙 석·박사 모집·유치 운영 — 공식 Facebook 채널 누적 약 98만 뷰, 정원외 외국인전형 지원 2018→2023 약 267% 증가 (교육부 장관 표창, 2023.12)',
              ],
            },
          ],
        },
      ],
    },
    education: [
      {
        school: '연세대학교 인공지능융합대학원 석사과정 재학중',
        degree: 'Master\'s program in AI computing',
        period: '2025.09 – 현재',
        bullets: [
          'RAG 기반 교환학생 경험보고서 검색 시스템 팀 프로젝트',
          '인공지능융합학회 - ReAct 논문 발제 (이메일 트리아지 시스템 사례 발표)',
        ],
      },
      {
        school: '연세대학교 문과대학 불어불문학과 졸업',
        degree: 'B.A. in French Language & Literature',
        period: '2013.08 졸업',
        bullets: [],
      },
    ],
  },

  skills: {
    groups: [
      {
        heading: 'Technical',
        items: 'Python · Flask · React · TypeScript · Google Apps Script · Claude API · D3.js · Chart.js · HTML/CSS/JS · Git · Netlify',
      },
      {
        heading: 'Operations & Product',
        items: 'Service Design · User Research · KPI Design · Workflow Automation · API Integration · Data Visualization · Cross-functional Coordination · Technical Documentation · AI PoC Ideation & Delivery',
      },
      {
        heading: 'International Affairs',
        items: 'International Education · European University Partnerships · Event Management · Multilingual Communication · Korean (Native) · English (Professional) · French (Intermediate)',
      },
    ],
  },

  contact: {
    number: '04',
    title: 'Contact',
    heading: '새로운 무대를 찾습니다.',
    sub: '제 작은 실험실을 더 큰 무대에서 펼치고 싶습니다.',
    email: 'sachoi.pro@gmail.com',
    linkedin: 'linkedin.com/in/seoah-choi',
    linkedinUrl: 'https://linkedin.com/in/seoah-choi',
    cvUrl: '/CV_SeoAh_Choi_EN.pdf',
    cvValue: 'Curriculum Vitae',
  },

  footer: {
    copyright: '© 2026 Céline Choi · 최서아 (Seo-Ah Choi)',
  },
};
