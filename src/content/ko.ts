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
    tagline: '반복되는 일상 속,\n인공지능 한 방울로 미래를 여는 기획자',
    subtitle:
      '대학 교직원의 새로운 도전, "이건 안 돼요" 대신 "이게 되네"를 외치는 사람',
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
      { value: '265+', label: '대학 검색 대시보드' },
      { value: '25h → 8h', label: '주간 이메일 처리 시간' },
      { value: '15', label: 'AI 페르소나 오케스트레이션' },
      { value: '15,000+', label: '교환학생 경험보고서 후기 분석' },
    ],
    hint: 'Scroll to continue',
  },
  about: {
    number: 'I',
    title: 'About',
    body: [
      '연세대학교 국제처에서 유럽 지역 105개 파트너 대학과의 교환 프로그램을 담당하고 있습니다. 동시에 연세대학교 인공지능융합대학원에서 AI Computing 석사 과정을 이수 중입니다.',
      '프랑스어를 전공한 인문학도가 행정 현장의 단순 반복 업무를 AI로 바꾸기 시작한 것은 불과 1년 전이었습니다. Flask·GAS·D3.js·React로 직접 도구를 만들었고, 최근에는 Claude Code로 6층 빌딩 구조의 "OIA 자동화 사무실"을 구축해 15명의 AI 비서와 고양이 유부가 각자의 사무실을 지키고 있습니다.',
      '수많은 아이디어가 메모장에만 남는 걸 견디지 못합니다. "이게 될까?" 싶던 것을 설계하고, 실제로 배포해 숫자로 효과를 증명해 내는 것을 좋아합니다. 조직의 일하는 방식 자체를 바꾸는 실험을 매일 시도합니다.',
      '호기심 넘치는 저의 실험실을 더 큰 무대에서 펼칠 수 있는 곳을 찾고 있습니다.',
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
    title: 'OIA Rush',
    subtitle: '15명의 AI 비서가 근무하는 가상의 6층 빌딩',
    stack: ['Claude Code', 'Flask', 'GAS', 'Claude API', 'D3.js'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA 자동화 사무실',
        sub: '15명의 AI 비서가 근무하는 가상의 6층 빌딩',
        body:
          '현 근무지의 분산된 15개 업무 폴더를 파일 시스템 이벤트로 연결해, 각 폴더에 심어둔 15명의 AI 페르소나들이 자신의 업무를 수행하는 통합 자동화 시스템. 실무자에서 지휘자로 역할을 바꾼 지난 1년간의 기록.',
        imageSrc: null,
        imageCaption: 'OIA 빌딩 전체 시각화',
        imageHint: 'FLOOR_PLAN의 6층 빌딩 렌더 이미지 (캐릭터·엘리베이터·유부까지 보이는 메인 비주얼)',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '하루 100통, 무한 반복 메일 지옥.',
        body: [
          '매일 오전 9시, 받은 메일함엔 최소 100통의 새 이메일이 쌓였습니다. 105곳이 넘는 해외 파트너 대학들과 국내외 수백 명의 학생들의 문의가 넘쳐났고, 한국어·영어·프랑스어가 섞인 메일들 속에서 하루라도 대응이 늦어지면 미확인 메일은 200통이 넘어갔습니다.',
          '비슷하지만 케이스마다 미묘하게 다른 행정 민원 응대. 협정교 정보·학생 데이터·과거 케이스는 여러 엑셀·문서·메일에 흩어져, 한 건을 처리할 때마다 수십 개의 창을 오갔습니다.',
          '하루 일과의 대부분이 단순 반복 업무로 사라졌고, 정작 회사의 기획·전략 업무를 할 시간은 남지 않았습니다.',
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
          '처음부터 모든 걸 자동화할 생각은 없었어요. 그저 좀 더 나은 환경을 만들고 싶었습니다.',
          '이메일 분류·초안 작성 시스템, ECTS 성적 자동 환산 시스템, D3.js 대시보드, 노미네이션 관리 GAS 웹앱, 증명서 자동 발급 시스템... 저의 실험이 성공할 때마다 성과는 눈에 띄게 늘어났습니다.',
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
          '구축한 시스템이 많아질수록, "이 일에는 어떤 툴을 써야 하지?"를 판단하는 것 자체가 부담이 되기 시작했습니다. 실험은 성공했지만 제각각의 폴더, 각자의 실행 방식, 서로 다른 업데이트 주기를 가졌습니다.',
          '그러던 어느 날 하나의 생각이 스쳤습니다. 업무들을 한 곳에 모아볼까?',
          '그리고 이왕이면 "게임처럼" 만들어볼까?',
        ],
        imageSrc: null,
        imageCaption: '프로젝트 폴더 구조 다이어그램',
        imageHint: '15개 부서 폴더가 펼쳐진 VS Code 사이드바 스크린샷, 또는 폴더 트리 다이어그램',
      },
      {
        kind: 'section',
        tag: 'APPROACH · III',
        heading: '시켜줘요, OIA 명예 건물주.',
        body: [
          'Claude Code의 서브에이전트와 CLAUDE.md 페르소나 시스템을 이용해 가상의 6층 빌딩을 세웠습니다. 15개 부서 폴더를 층과 방으로 매핑하고, 각 폴더에 담당 비서를 배치했습니다. 1F Léa(협정 검토), 2F Mail(이메일 관리), 3F Nomi(노미네이션), 5F Céline(총괄 비서), 6F에는 저와 제가 키우는 고양이 유부.',
          '이건 장식이 아니라 설계된 게임입니다. 폴더 = 부서, 파일 변경 이벤트 = 비서 상태 변화, 전체 활동량 = 유부의 순찰 속도. 추상적 이벤트를 눈에 보이는 귀여움으로 탄생시켰습니다.',
          '이런 디테일을 통해 AI를 도구가 아니라 동료로 대하고 싶었습니다.',
        ],
        imageSrc: null,
        imageCaption: 'OIA 빌딩 상단부 (6F 대표 사무실과 유부)',
        imageHint: '6F 대표실 렌더 — 서아 책상, 캣휠, 캣타워, 유부가 보이는 클로즈업',
      },
      {
        kind: 'section',
        tag: 'APPROACH · IV',
        heading: '어느 날 오후, 서류마감 D-2.',
        body: [
          '15시. 전체 층이 풀가동입니다. 2층의 Mail이 54통의 이메일을 분류 중이고, 3층의 Nomi가 파리정치대학 노미네이션 8건을 처리하고, 4층 Solène는 교환 밸런스를 업데이트, 1층의 Léa는 IP Paris에서 날아온 MoU 갱신 초안을 검토하고 있습니다. 명예회장 유부는 `peak` 모드를 선언하고 꼭대기 층에서 열심히 캣휠을 탑니다.',
          '저는 그저 저의 총괄 비서 Céline에게 묻습니다. "오늘 IP Paris 관련해서 협상 포인트는 뭐야?" 예전이라면 150통의 메일을 열고, 협정 폴더를 뒤지고, 밸런스를 일일이 계산해보았을 것입니다. 지금은 제 비서들이 각자 자기 폴더를 지키고, 저는 `무엇을, 누구에게, 어떤 순서로` 물어볼지만 결정합니다.',
        ],
        imageSrc: null,
        imageCaption: '풀가동 상태의 OIA 빌딩 (peak 모드)',
        imageHint: '전 층에 비서들이 working 상태, 유부가 엘리베이터에서 이동 중인 상태의 스크린샷',
      },
      {
        kind: 'section',
        tag: 'APPROACH · V',
        heading: '평범한 교직원이 AI와 일하는 법.',
        body: [
          '저는 사무행정직군이지만, AI와의 페어 플레이를 통해 주어진 상황에서 문제를 발견하고 → 문제를 해결할 시스템을 만들어 → 문제를 개선하는 능력을 갖추고 있습니다. 저는 코드나 스킬을 암기하지 않습니다. 대신 "무엇이 문제인지", "어떻게 작동해야 하는지", "지금 어디가 어색한지"를 정확히 짚어내는 안목이 있을 뿐입니다.',
          '비전공자, 인문학도라는 배경은 더 이상 저의 약점이 아닙니다. 업무 현장의 실제 페인포인트를 가장 잘 아는 기획자가 직접 도구를 만들 수 있다는 것을 입증하는 무기가 됐습니다.',
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
          { label: '주간 이메일 처리 시간', before: '25시간+', after: '5시간 이내' },
          { label: 'ECTS 환산 (건당)', before: '8~10분', after: '30초 이내' },
          { label: '노미네이션 안내 메일 (학생당)', before: '15분', after: '2~3분' },
          { label: '미확인 메일 누적', before: '150-200통', after: '20통 이내' },
        ],
        body: [
          {
            h: '솔직히 말하면, 처음엔 오히려 시간이 두 배 걸렸습니다.',
            p:
              '워크플로우를 기획하면서 기존 업무도 쳐내야 했기 때문입니다. 그러나 시스템이 완성되고 OIA 빌딩을 세운 현재, 지금 이 순간도 제 비서들은 원고를 검수하고, 메일 초안을 쓰고, 데이터를 분석하고 있습니다. 저는 비효율의 늪에서 벗어나, 이 모든 것을 총괄·검토·승인하는 건물주가 되었습니다.',
          },
          {
            h: '시간이 생겼다는 것의 진짜 의미',
            p:
              '단순 반복적인 업무 노동에서 벗어나니 비로소 회사의 기획과 전략에 집중할 수 있게 되었습니다. 국제처 홈페이지 개편, 협정교 DB 구축, 유럽 파트너 벤치마킹 출장 기획 - 퇴근 후엔 대학원 수업과 AI 학회 스터디에도 참여하고 있습니다. 자동화 사무실이 없었다면 시도조차 못 했을 일상입니다.',
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
          '마크롱 대통령 방문 당일. 저는 의전 현장에 집중할 수 있었습니다. 제 AI 비서가 90통 넘는 메일을 저 대신 분류해두었기 때문입니다.',
          '정시 퇴근한 날. 집에 돌아왔을 때, 유부가 평소보다 일찍 저를 반겼습니다.',
          '대학원 수업에 처음으로 지각 없이 들어간 날. 강의실 맨 앞자리에 앉았습니다.',
        ],
        closing: {
          h: '아직 끝나지 않은 이야기',
          p:
            '작지만 의미있는 첫 걸음이 조직 전체에 어떤 변화를 가져오는지, 저는 몸소 경험하였습니다. 이제 저는 변화를 직접 설계할 무대를 찾고 있습니다.',
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
    title: 'OIA University Finder',
    subtitle: 'D3.js 기반 인터랙티브 웹 도구',
    stack: ['React', 'D3.js', 'Tailwind', 'Google Sheets API', 'Netlify'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA University Finder',
        sub: '대학 검색 대시보드',
        body:
          '265개 해외대학 정보를 직관적으로 탐색할 수 있게 만든 대시보드. 학생들의 반복 FAQ를 도구로 전환하다.',
        imageSrc: null,
        imageCaption: 'Univ Finder 메인 화면',
        imageHint: 'oiaunivfinder.netlify.app 메인 뷰 스크린샷 (전체 UI)',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '매년 반복되는 같은 질문들.',
        body: [
          '"제 TOEFL 92점이면 어디 갈 수 있어요?", "유럽에서 영어로 수업 듣는 학교는 어디예요?", "독일 학교 중에 장학금 주는 곳 있어요?" — 학생들은 엑셀파일, 홈페이지를 뒤적이다 사무실로 전화를 걸었고, 저희 팀은 하루에도 수십 번씩 같은 답을 반복했습니다.',
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
          '자기 조건으로 필터링하고, 즐겨찾기하고, CSV로 내려받아 부모님·지도교수와 공유할 대시보드를 만들었습니다. D3.js + React로 지역·국가·TOEFL 점수·선발 인원을 다차원 필터로 동시 적용, 265개 대학 데이터를 Google Sheets에서 실시간으로 로드해 업데이트 부담을 없애고 즐겨찾기 및 CSV 내보내기 기능을 지원합니다.',
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
  },

  selected: {
    number: 'III',
    title: 'Selected Works',
    intro: '그 외 작업들.',
    projects: [
      {
        title: 'ECTS 성적 환산 자동화',
        year: '2025–2026',
        stack: ['GAS', 'Claude API', 'python-docx'],
        body:
          '교환학생이 유럽 파트너교에서 받아온 성적표(ECTS 단위)를 연세대 학점으로 환산하는 작업을 자동화. 학기당 200건 이상의 반복 작업이 건당 8~10분에서 30초 이내로 단축.',
        imageCaption: 'ECTS 환산 결과 스프레드시트',
        imageHint: 'GAS가 자동 생성한 연세대 학점이 채워진 Google Sheets 스크린샷',
      },
      {
        title: '연세대 국제처 홈페이지 개편',
        year: '2026',
        stack: ['React', 'TypeScript', 'Netlify'],
        body:
          '레거시 중심의 개발 환경에서 직접 React로 목업을 만들고 개발 요건 정의서와 함께 기획 추진. UX/UI를 재구성하고 메인화면을 스크롤 인터랙션으로 풀어냄. 연세대학교 공식 웹사이트 개편 프로젝트의 기준을 제시함.',
        imageCaption: 'yonsei-oia.netlify.app 메인 히어로',
        imageHint: '목업 사이트의 Hero + 통계 3개가 보이는 상단부 스크린샷',
      },
      {
        title: '협정교 DB 구축',
        year: '2026',
        stack: ['Google Sheets', 'openpyxl', 'Claude Code'],
        body:
          '740여 개 해외 파트너 대학의 협정 정보를 27개 컬럼 스키마로 표준화. 공개용 8개 컬럼과 내부 관리용 19개 컬럼을 색상으로 구분하고, 주요 필드에 드롭다운 유효성 검사 적용. 향후 어드민 임베드와 내부망 대시보드로 확장 예정.',
        imageCaption: '27컬럼 DB 스키마 (공개/내부 구분)',
        imageHint: '색상으로 구분된 엑셀 헤더 스크린샷 — 공개 컬럼과 내부 컬럼 경계가 보이게',
      },
      {
        title: '마크롱 대통령 특강 운영',
        year: '2026',
        stack: ['French VIP', 'Google Apps Script', 'Protocol'],
        body:
          '2026년 4월 3일 에마뉘엘 마크롱 프랑스 대통령의 연세대학교 특별강연 기획 및 실무 총괄 진행. 7주의 준비 기간 동안 엘리제궁·주한프랑스대사관·청와대 경호처·교내외 부서와 업무 협의. 식순·무대기획·리허설·보도자료·PCO계약까지 전 과정 기획·운영. 국내 언론 169건은 물론 엘리제궁 공식 유튜브 방영, 프랑스 외신 보도의 성과 기록.',
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
        position: 'Exchange Program Manager',
        period: '2025.11 – 현재',
        bullets: [
          '연세대학교 교환학생 해외파견 프로그램 운영 총괄',
          '105개 유럽 파트너 대학과의 Exchange Program 전략·협정·운영 총괄',
          '2026년 4월 프랑스 대통령 연세대 특별강연 행사 실무 총괄',
          '해외파견 프로그램 운영 자동화 이니셔티브 주도 — Flask·GAS·React·D3.js·Claude Code',
        ],
      },
      {
        org: '연세대학교 국제처',
        position: 'YISS/WAY Program Coordinator',
        period: '2024.01 – 2025.10',
        bullets: [
          '연세대 국제하계대학 40주년 기념행사 기획 (Suno AI 테마송, AI 캐릭터 SNS 110K+뷰)',
          '국제화 단기 프로그램 실무 총괄 — 인보이스·이메일·수강신청 검증 자동화',
          '2025년 EAIE 컨퍼런스 및 유럽 파트너 대학 방문(스웨덴, 노르웨이, 프랑스), 신규 협정 체결',
        ],
      },
    ],
    education: [
      {
        school: '연세대학교 인공지능융합대학원',
        degree: 'Master\'s program in AI computing',
        period: '2025.09 – 현재',
        bullets: [
          'RAG 기반 교환학생 후기 검색 시스템 팀 프로젝트',
          '인공지능융합학회 — ReAct 논문 발제 (이메일 트리아지 시스템 사례 발표)',
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
        items: 'International Education · European University Partnerships · Government Liaison · Event Management · Multilingual Communication',
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
    heading: '새로운 무대를 찾습니다.',
    email: 'sachoi@yonsei.ac.kr',
    linkedin: 'linkedin.com/in/seoah-choi',
    linkedinUrl: 'https://linkedin.com/in/seoah-choi',
  },

  footer: {
    copyright: '© 2026 Céline Choi · 최서아 (Seo-Ah Choi)',
  },
};
