export const en = {
  meta: {
    nameRoman: 'Seo-Ah (Céline) Choi',
    role: 'AI Planner · aspiring Technical PM',
    taglineEn: 'Planner, Builder, Operator.',
    tagline: 'I do not use tools.\nI build them.',
    subtitle:
      'The person who knows the operational problems best builds the production systems that solve them.',
  },
  nav: {
    work: 'Work',
    about: 'About',
    lab: 'Lab',
    contact: 'Contact',
  },
  hero: {
    stats: [
      { value: '-83%', label: 'ECTS conversion time' },
      { value: '25h → 8h', label: 'Weekly email triage' },
      { value: '10,000+', label: 'Docs analyzed · 740+ partners' },
      { value: '15', label: 'AI agents in production' },
    ],
    hint: '↓ Selected Work',
  },
  about: {
    number: '02',
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
  },

  method: {
    steps: [
      { id: '01', label: 'Problem framing', desc: 'Start by asking what tool is worth building.' },
      { id: '02', label: 'Data structure', desc: 'Sketch how the data should be shaped first.' },
      { id: '03', label: 'Question design', desc: 'Decide what to ask Claude, and how.' },
      { id: '04', label: 'Validation', desc: 'Use it in real work to see if it holds up.' },
      { id: '05', label: 'Iteration', desc: 'Refine through feedback from self and colleagues.' },
      { id: '06', label: 'Deployment', desc: 'Take it all the way into actual use.' },
    ],
  },

  work: {
    number: '01',
    title: 'Selected Work',
    intro: 'Production systems I built firsthand to solve problems I knew from the field.',
    more: 'Read more →',
    less: 'Show less',
  },

  oiaBuilding: {
    id: 'oia-building',
    index: '01',
    year: '2026',
    title: 'OIA Rush',
    subtitle: 'A virtual 6-floor building with 15 AI secretaries',
    stack: ['Claude Code', 'Flask', 'GAS', 'Claude API', 'D3.js'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA Automation Office',
        sub: 'A virtual 6-floor building with 15 AI secretaries',
        body:
          'An integrated automation system that links 15 scattered work folders via file-system events, where 15 AI personas — one planted in each folder — carry out their own work. A one-year record of moving from executor to conductor.',
        imageSrc: null,
        imageCaption: 'OIA Rush — 6-floor building simulation',
        imageHint: 'Render of the 6-floor building (characters, elevator, Uboo visible)',
        videoSrc: 'oia-rush.webm',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '100 emails a day. An infinite mail loop.',
        body: [
          'Every morning at 9 AM, hundreds of emails poured in from overseas partner universities and students, mixed in Korean, English, and French. Reading them one by one, the planning and strategy work always took a back seat.',
          'Operational data lived scattered across spreadsheets, documents, and emails — every single item made me cycle through dozens of windows. Most of my day vanished into repetition, and the planning and strategy the company needed from me had nowhere to land.',
        ],
        imageSrc: null,
        imageCaption: 'Gmail inbox (150+ unread)',
        imageHint: 'Gmail screenshot with unread badge visible, private info redacted',
      },
      {
        kind: 'section',
        tag: 'APPROACH · I',
        heading: 'It began with plain curiosity.',
        body: [
          'I never set out to automate everything — I just wanted a slightly better workspace.',
          'Email triage. An automatic ECTS converter. A unified GAS dashboard for nominations. An automatic certificate system. Every time an experiment worked, the result showed up visibly in the numbers.',
        ],
        imageSrc: null,
        imageCaption: 'First tools — initial interfaces',
        imageHint: 'Screenshot of email classifier / ECTS converter / FAQ chatbot (single or collage)',
      },
      {
        kind: 'section',
        tag: 'APPROACH · II',
        heading: 'Human appetite has no end, and AI is a delightful game.',
        body: [
          'The more systems I built, the heavier it became just to decide "which tool for which task?" Each lived in its own folder with its own update cycle, until one day a thought crossed my mind: what if I gathered them all into one place?',
          'And while I\'m at it — why not build it like a simulation game?',
        ],
        imageSrc: null,
        imageCaption: 'Project folder structure',
        imageHint: 'VS Code sidebar showing 15 department folders, or a folder tree diagram',
      },
      {
        kind: 'section',
        tag: 'APPROACH · III',
        heading: 'Crown me Honorary Landlord of OIA.',
        body: [
          'Using Claude Code\'s sub-agents and a structured CLAUDE.md persona system, I raised a virtual 6-floor building. 15 department folders mapped to their own floors, each staffed by a dedicated secretary.',
          'I translated abstract events into something you can see, and something cute — wanting to treat AI not as a tool but as a "teammate."',
        ],
        videoSrc: 'oia-rush.webm#t=10,19',
        imageSrc: null,
        imageCaption: '',
        imageHint: 'Close-up render of the 6F suite — Seo-Ah\'s desk, cat wheel, cat tower, Uboo',
      },
      {
        kind: 'section',
        tag: 'APPROACH · IV',
        heading: 'One afternoon. D-2 before a deadline.',
        body: [
          '3 PM. Léa reviews an MoU draft, Mail sorts 154 emails, Nomi handles 8 nominations, and Solène updates the exchange balance. Uboo runs on the cat wheel up top.',
          'I just ask Céline: "What are today\'s negotiation points with our partners?" Where I once opened every email and dug through folders, now I only decide `what, to whom, in what order` to ask.',
        ],
        imageSrc: null,
        imageCaption: '',
        imageHint: 'Screenshot of the building at full capacity, with all secretaries working and Uboo in the elevator',
      },
      {
        kind: 'section',
        tag: 'APPROACH · V',
        heading: 'I build with judgment, not code.',
        body: [
          'I define what the problem is, design the architecture to solve it, validate the output, and find where else it applies. These are the judgments a tool cannot make for me, and they decide the quality of the system.',
          'The person who knows the field\'s pain points best builds the production tools directly. A non-CS, humanities background is not a weakness but the starting point of that strength.',
        ],
        imageSrc: null,
        imageCaption: 'Claude Code session in progress',
        imageHint: 'Terminal running Claude Code with editor view, split-screen',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: 'A different structure, a different everyday.',
        body: [
          {
            h: 'Honestly — at first, it actually took twice as long.',
            p:
              'Because I had to design the MCP while juggling work and graduate school. But once the OIA Building stood, I was pulled out of the inefficiency swamp and now reign over it all as the landlord.',
          },
          {
            h: 'What having time really means',
            p:
              'Away from the repetitive labor, I can focus on the company\'s planning and strategy. After work, I attend graduate classes and AI society meetups.',
          },
        ],
        imageSrc: null,
        imageCaption: 'Weekly hours before vs after',
        imageHint: 'Bar or time-series chart showing email processing hours decline',
      },
      {
        kind: 'scenes',
        tag: 'SCENES',
        heading: 'A new everyday.',
        scenes: [
          'On the day President Macron visited Yonsei, my secretaries gave me the room to focus on the on-site work.',
          'When I came home from leaving the office on time, Uboo greeted me earlier than usual.',
          'Arriving at my graduate class on time, I took a seat in the front row.',
        ],
        closing: {
          h: 'The story isn\'t over.',
          p:
            'Now I\'m looking for a stage where I can design that change directly.',
        },
        imageSrc: null,
        imageCaption: '',
        imageHint: 'A cute photo of Uboo — warm closing image',
      },
    ],
    buildingFloorMap: [null, 2, null, null, 5, 5, null, 5, 0] as const,
  },

  univFinder: {
    id: 'univ-finder',
    index: '02',
    year: '2025',
    title: 'OIA University Finder',
    subtitle: 'A D3.js interactive web tool',
    stack: ['React', 'D3.js', 'Tailwind', 'Google Sheets API', 'Netlify'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA University Finder',
        sub: '265 partner universities, navigable in seconds — a D3.js interactive dashboard.',
        body:
          'A tool I built to convert students\' repetitive FAQs into self-service: filter by criteria, favorite universities, export CSV.',
        imageSrc: null,
        imageCaption: 'Univ Finder main screen',
        imageHint: 'oiaunivfinder.netlify.app main view screenshot',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: 'The same questions, every year.',
        body: [
          '"With my TOEFL 92, where can I go?" "Which European schools teach in English?" "Any German universities with scholarships?" — Students dug through spreadsheets and websites before calling the office, and our team answered the same questions dozens of times a day.',
        ],
        imageSrc: null,
        imageCaption: 'The legacy spreadsheet',
        imageHint: 'A page from the dense, text-heavy list — "this was all text"',
      },
      {
        kind: 'section',
        tag: 'APPROACH',
        heading: 'A tool where students filter for themselves.',
        body: [
          'I built a dashboard where students filter by their own criteria, save favorites, and download a CSV to share with parents or advisors. With D3.js + React, multi-dimensional filters — region, country, TOEFL tier, quota — apply simultaneously. 265 universities of data stream live from Google Sheets, removing the update burden. Favorites persist in LocalStorage; CSV export is built in.',
        ],
        imageSrc: null,
        imageCaption: 'Filter panel and results list',
        imageHint: 'Screenshot with filters applied — side panel + result cards visible',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: 'Deployed at https://oia.yonsei.ac.kr/univfinder',
        body: [
          {
            h: '',
            p:
              'Student inquiries dropped. Student experience sharpened. Officially deployed on the Office of International Affairs website domain.',
          },
        ],
        imageSrc: null,
        imageCaption: 'Favorites + CSV export',
        imageHint: 'Screenshot with starred universities and CSV download button highlighted',
      },
    ],
    buildingFloorMap: [null, null, null, null] as const,
    showBuilding: false,
    link: 'https://oia.yonsei.ac.kr/univfinder',
  },

  oiaWebsite: {
    id: 'oia-website',
    index: '03',
    year: '2026',
    title: 'OIA Website Redesign',
    subtitle: 'Replacing a legacy ASP site, with a working React prototype as the baseline',
    stack: ['React', 'TypeScript', 'SEO', 'Bilingual Copy', 'Netlify'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA Website Redesign',
        sub: 'Not a planning deck — a deployed prototype as the baseline.',
        body:
          'To modernize the legacy (ASP) official site oia.yonsei.ac.kr, I — as the planner — built a fully working React mockup and presented it alongside a development requirements document. Deliverable: yonsei-oia.netlify.app',
        imageSrc: null,
        imageCaption: 'Hero of yonsei-oia.netlify.app',
        imageHint: 'Screenshot of the mockup site\'s Hero + main statistics section',
      },
      {
        kind: 'section',
        tag: 'PHASE · I',
        heading: 'Start with a working prototype.',
        body: [
          'I structured the full sitemap into five top-level sections (Introduction · Partnerships · Inbound · Outbound · News & Events) and built 38 pages with dummy data.',
          'Applied a 2-depth accordion menu, underline hover animation, responsive breakpoints (1024 / 768px), and a design grounded in the official Yonsei navy (#003876). Modularized for scalability and maintainability first, then upgraded from plain HTML/CSS/JS to a React/TypeScript SPA.',
        ],
        imageSrc: null,
        imageCaption: 'Five-section sitemap / accordion navigation',
        imageHint: 'Sitemap diagram or screenshot of the 2-depth accordion menu expanded',
      },
      {
        kind: 'section',
        tag: 'PHASE · II',
        heading: 'A document a vendor can build from on day one.',
        body: [
          'Produced an AS-IS / TO-BE document (PPT) comparing the React mockup with the existing ASP site.',
          'Classified pages into four development types (static text / board / data-managed / SSO-protected) to make complexity explicit, and defined the SSO authentication scope (Outbound only) and admin CMS requirements.',
        ],
        imageSrc: null,
        imageCaption: 'AS-IS / TO-BE requirements document',
        imageHint: 'AS-IS/TO-BE comparison slide or the page-type classification table',
      },
      {
        kind: 'section',
        tag: 'PHASE · III',
        heading: 'Content and SEO that will not age.',
        body: [
          'Optimized per-page title · description · keywords with a route-based metadata map (length discipline, de-duplicated keywords, unified brand naming).',
          'Replaced yearly-changing ranking numbers with "Since 1966 · 80+ Partner Countries · 740+ Partner Universities" for the main statistics, preventing content decay. Unfolded Yonsei\'s internationalization timeline as a scroll interaction, and added a new "Degree Seeking" landing page to fill a gap that previously redirected straight to Admissions.',
        ],
        imageSrc: null,
        imageCaption: 'Main statistics / internationalization timeline',
        imageHint: 'The Since-1966 statistics block or the scroll-timeline interaction',
      },
      {
        kind: 'section',
        tag: 'PHASE · IV',
        heading: '"From a site you read notices on, to a site you explore the world with."',
        body: [
          'Reworked bureaucratic institutional phrasing into a natural, human voice (hero, office-relocation notice, program and event intros).',
          'Wrote an HTML launch-announcement email plain enough for non-specialists, closing the loop on internal rollout.',
        ],
        imageSrc: null,
        imageCaption: 'Before / after copy',
        imageHint: 'Side-by-side of the old phrasing and the revised copy',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: 'It became the baseline for the redesign project.',
        body: [
          {
            h: 'Moving a vendor inside a conservative organization',
            p:
              'In an organization wary of AI and new tech, where moving a vendor through a legacy environment is hard, I set the baseline for the actual redesign project by presenting a working prototype and a requirements document myself.',
          },
          {
            h: 'Full-stack, solo — from design to copy',
            p:
              'I carried design, information architecture, SEO, and bilingual copy single-handedly, and proposed the direction of turning repetitive student inquiries into tools through University Finder integration.',
          },
        ],
        imageSrc: null,
        imageCaption: '',
        imageHint: '',
      },
    ],
    showBuilding: false,
    link: 'https://yonsei-oia.netlify.app',
  },

  lab: {
    number: '03',
    title: 'Lab',
    intro: 'The small tools I built in the field before any of them grew into featured work.',
    tools: [
      {
        title: 'ECTS Credit Conversion Automation',
        year: '2025–2026',
        stack: ['GAS', 'Claude API', 'python-docx'],
        body: 'Automated converting European (ECTS) transcripts into Yonsei credits. Cut processing time by 83% across 200+ cases per semester.',
      },
      {
        title: 'Partner University Database',
        year: '2026',
        stack: ['Google Sheets', 'openpyxl', 'Claude Code'],
        body: 'Standardized worldwide agreement data into a 27-column schema with dropdown validation. Designed to extend to admin embedding and an internal dashboard.',
      },
      {
        title: 'Email Triage System',
        year: '2025',
        stack: ['GAS', 'Claude API'],
        body: 'Auto-classifies and summarizes 100+ daily emails mixed in Korean, English, and French. Cut weekly email handling from 25 hours to 8.',
      },
      {
        title: 'FAQ Chatbot',
        year: '2025',
        stack: ['Claude API'],
        body: 'Turned recurring exchange-program FAQs into self-service, absorbing repetitive student inquiries into a tool.',
      },
      {
        title: 'Nomination GAS Dashboard',
        year: '2025',
        stack: ['GAS', 'Google Sheets'],
        body: 'Unified nomination status scattered across sheets and email into one view, automating per-case tracking and gap prevention.',
      },
    ],
  },

  experience: {
    roles: [
      {
        org: 'Yonsei University, Office of International Affairs',
        position: 'Exchange Program Manager',
        period: 'Nov 2025 – Present',
        bullets: [
          'Lead end-to-end operations for Yonsei\'s outbound exchange program',
          'Led overall planning of the French President\'s special lecture at Yonsei',
          'Outbound program automation initiative: Flask · GAS · React · D3.js · Claude Code',
          '2025 EAIE conference and partner-university visits (Sweden, Norway, France) — secured new agreements',
        ],
      },
      {
        org: 'Yonsei University, Office of International Affairs',
        position: 'YISS/WAY Program Coordinator',
        period: 'Jan 2024 – Oct 2025',
        bullets: [
          'Planned the 40th anniversary of Yonsei International Summer School (Suno AI theme song, social accounts 110K+ views)',
          'Ran short-term international programs — invoicing, email, and registration validation automation',
        ],
      },
    ],
    education: [
      {
        school: 'Yonsei Graduate School of AI Convergence',
        degree: 'Master\'s program in AI Computing',
        period: 'Sep 2025 – Present',
        bullets: [
          'Team project: RAG-based exchange-review retrieval system',
          'AI Convergence Society — presented the ReAct paper, with my email triage system as the field case',
        ],
      },
      {
        school: 'Yonsei University, College of Liberal Arts',
        degree: 'B.A. in French Language & Literature',
        period: 'Graduated Aug 2013',
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
    heading: 'Looking for a new stage.',
    sub: 'A place to run my small laboratory at a far larger scale.',
    email: 'sachoi.pro@gmail.com',
    linkedin: 'linkedin.com/in/seoah-choi',
    linkedinUrl: 'https://linkedin.com/in/seoah-choi',
    cvUrl: '/CV_SeoAh_Choi_EN.pdf',
    cvValue: 'Curriculum Vitae',
  },

  footer: {
    copyright: '© 2026 Céline Choi · Seo-Ah Choi (최서아)',
  },
};
