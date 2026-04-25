export const en = {
  meta: {
    nameRoman: 'Céline Choi',
    tagline: 'A planner opening futures, one drop of AI at a time — out of the daily routine.',
    subtitle:
      'A university staff member stepping into AI — trading "we can\'t" for "oh, it actually works."',
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
      { value: '265+', label: 'Universities in Finder Dashboard' },
      { value: '25h → 8h', label: 'Weekly Email Processing Time' },
      { value: '15', label: 'AI Personas Orchestrated' },
      { value: '15,000+', label: 'Exchange Reviews Analyzed' },
    ],
    hint: 'Scroll to continue',
  },
  about: {
    number: 'I',
    title: 'About',
    body: [
      'I run Yonsei University\'s outbound program with overseas partner universities — academic exchange, student selection, and broader cooperation. In parallel, I\'m pursuing a master\'s in AI Computing at the Yonsei Graduate School of AI Convergence.',
      'It was only a year ago that I — an ordinary university staffer who majored in French — began turning the routine work in front of me into AI workflows. I built tools with Flask, Google Apps Script, D3.js, and React. Most recently, using Claude Code, I built the "OIA Automation Office": a six-floor virtual building where 15 AI secretaries and my cat Uboo keep watch.',
      'I can\'t stand ideas that stay in memos. I love designing the thing people said "could this even work?" about, and proving the effect in real numbers. Every day I try another experiment that changes how the organization works.',
      'Now I\'m looking for a bigger stage where my curious little laboratory can run wider.',
    ],
  },

  featured: {
    number: 'II',
    title: 'Featured Work',
    intro: 'Two main works, told as stories.',
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
          'Every morning at 9 AM, at least 100 new emails waited in my inbox. Inquiries from 105+ partner universities and hundreds of students at home and abroad, mixing Korean, English, and French. A single day of delay, and unread mail climbed past 200.',
          'Records of administrative inquiries and operational data of every kind lived scattered across spreadsheets, documents, and emails — every single item made me cycle through dozens of windows. Most of my day vanished into repetition, and the planning and strategy the company needed from me had nowhere to land.',
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
          'I never set out to automate everything. I just wanted a slightly better workspace.',
          'An email classifier and drafter. An automatic ECTS converter. A D3.js dashboard. A nomination-management GAS web app. An automatic certificate system. Every time an experiment worked, the result showed up visibly in the numbers.',
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
          'The more systems I built, the heavier it became just to decide "which tool for which task?" The experiments worked, but each lived in its own folder, with its own execution pattern, its own update cycle.',
          'Then one day, a thought crossed my mind. What if I gathered all of them into one place? And while I\'m at it — why not build it like a simulation game?',
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
          'With Claude Code\'s sub-agents and the CLAUDE.md persona system, I raised a virtual 6-floor building. 15 department folders mapped to floors and rooms, each with a dedicated secretary. Léa on 1F (agreements), Mail on 2F (email), Nomi on 3F (nominations), Céline on 5F (chief-of-staff). On 6F, me and Uboo, my cat.',
          'This isn\'t decoration — it\'s a designed game. Folder = department. File-change event = a secretary\'s state change. Total activity = Uboo\'s patrol speed. I translated abstract events into something you can see, and something cute.',
          'Through these details I wanted to treat AI not as a tool but as a colleague.',
        ],
        imageSrc: null,
        imageCaption: 'Upper floors of OIA Building (6F CEO office with Uboo)',
        imageHint: 'Close-up render of the 6F suite — Seo-Ah\'s desk, cat wheel, cat tower, Uboo',
      },
      {
        kind: 'section',
        tag: 'APPROACH · IV',
        heading: 'One afternoon. D-2 before a deadline.',
        body: [
          '3 PM. Every floor at full capacity. Mail on 2F sorts 54 emails. Nomi on 3F processes 8 Sciences Po nominations. Solène on 4F updates the exchange balance. Léa on 1F reviews an MoU renewal draft just in from IP Paris. Honorary Chairman Uboo declares `peak` mode and runs hard on the cat wheel up top.',
          'I simply ask my chief-of-staff Céline: "What are the negotiation points on IP Paris today?" In the past I would have opened 150 emails, dug through the agreements folder, recomputed the balances by hand. Now my secretaries each tend their own folders, and I only decide `what, to whom, in what order` to ask.',
        ],
        imageSrc: null,
        imageCaption: 'OIA Building at peak activity',
        imageHint: 'Screenshot of the building at full capacity, with all secretaries working and Uboo in the elevator',
      },
      {
        kind: 'section',
        tag: 'APPROACH · V',
        heading: 'How an ordinary university staffer works with AI.',
        body: [
          'I\'m an administrative office worker, yet through pair-play with AI I\'ve acquired a cycle: spot the problem → build the system that solves it → iterate. I don\'t memorize code or skills. What I do have is the eye to name exactly "what the problem is," "how it should work," "what feels off right now."',
          'Being non-CS, a humanities major, is no longer a weakness. It turned into a weapon: proof that the planner who knows the field\'s real pain points can build the tools herself.',
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
              'Because I had to keep clearing the existing workload while designing the new workflow at the same time. But now that the system is complete and the OIA Building stands, my secretaries — right this second — are reviewing drafts, writing emails, analyzing data. I\'ve been pulled out of the inefficiency swamp, and I\'m now the landlord who oversees, reviews, and approves.',
          },
          {
            h: 'What having time really means',
            p:
              'Only once I escaped the repetitive labor could I focus on the company\'s planning and strategy. Office website renewal, the partner-university DB, the European benchmarking trip — and after work, I attend graduate classes and AI study groups. A life impossible without the automation office.',
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
          'The day I left on time, Uboo greeted me earlier than usual when I got home.',
          'The first time I arrived at my graduate class without being late, I took a seat in the front row.',
        ],
        closing: {
          h: 'The story isn\'t over.',
          p:
            'I\'ve seen, firsthand, what a small but meaningful first step can do to a whole organization. Now I\'m looking for a stage where I can design that change directly.',
        },
        imageSrc: null,
        imageCaption: 'Uboo, the real cheese cat',
        imageHint: 'A cute photo of Uboo — warm closing image',
      },
    ],
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
        sub: 'University Search Dashboard',
        body:
          'A dashboard letting students intuitively explore information on 265 overseas partner universities. Turning students\' repetitive FAQ into a tool.',
        imageSrc: null,
        imageCaption: 'Univ Finder main view',
        imageHint: 'Screenshot of oiaunivfinder.netlify.app home page',
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
        heading: 'Deployed at oia.yonsei.ac.kr/univfinder',
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
  },

  selected: {
    number: 'III',
    title: 'Selected Works',
    intro: 'Other projects.',
    projects: [
      {
        title: 'ECTS Credit Conversion Automation',
        year: '2025–2026',
        stack: ['GAS', 'Claude API', 'python-docx'],
        body:
          'Automated the conversion of European (ECTS) transcripts into Yonsei credits. 200+ cases per semester reduced from 8–10 minutes each to under 30 seconds.',
        imageCaption: 'ECTS conversion spreadsheet',
        imageHint: 'Google Sheets screenshot with Yonsei credits auto-populated',
      },
      {
        title: 'OIA Website Renewal',
        year: '2026',
        stack: ['React', 'TypeScript', 'Netlify'],
        body:
          'In a legacy-dominated development environment, I — as a planner — built a React mockup and delivered it alongside a development requirements document. Restructured UX/UI and unfolded the main page into scroll interactions. The work set the baseline for Yonsei University\'s official website renewal project.',
        imageCaption: 'Hero of yonsei-oia.netlify.app',
        imageHint: 'Screenshot of the mockup site\'s Hero + 3-stat section',
      },
      {
        title: 'Partner University Database',
        year: '2026',
        stack: ['Google Sheets', 'openpyxl', 'Claude Code'],
        body:
          'Standardized agreement data for 740+ partner universities into a 27-column schema. 8 public columns vs. 19 internal-management columns, color-coded. Dropdown validation on key fields. Designed to extend to admin-panel embedding and an internal-network dashboard.',
        imageCaption: '27-column DB schema',
        imageHint: 'Color-coded Excel header — public and internal columns distinguishable',
      },
      {
        title: 'President Macron Lecture Operations',
        year: '2026',
        stack: ['French VIP', 'Google Apps Script', 'Protocol'],
        body:
          'Led planning and end-to-end operations for President Emmanuel Macron\'s special lecture at Yonsei University, April 3, 2026. Across 7 weeks, coordinated with the Élysée Palace, the French Embassy, Presidential Security, and multiple offices on and off campus. Handled program design, stage planning, rehearsals, press releases, and the PCO contract. Covered by 169 domestic press hits, an official Élysée Palace YouTube broadcast, and international coverage.',
        imageCaption: 'The event at Gakdang Hall',
        imageHint: 'One public-safe photo from the event — venue overview or welcome speech moment',
      },
    ],
  },

  experience: {
    number: 'IV',
    title: 'Experience & Education',
    roles: [
      {
        org: 'Yonsei University, Office of International Affairs',
        position: 'Exchange Program Manager',
        period: 'Nov 2025 – Present',
        bullets: [
          'Lead end-to-end operations for Yonsei\'s outbound exchange program',
          'Strategy, agreements, and operations across 105 European partner universities',
          'Executed end-to-end operations for the French President\'s special lecture at Yonsei (April 2026)',
          'Drove the outbound program automation initiative — Flask, GAS, React, D3.js, Claude Code',
        ],
      },
      {
        org: 'Yonsei University, Office of International Affairs',
        position: 'YISS/WAY Program Coordinator',
        period: 'Jan 2024 – Oct 2025',
        bullets: [
          'Planned the 40th anniversary of Yonsei International Summer School (Suno AI theme song, AI character social accounts 110K+ views)',
          'Ran short-term international programs — invoicing, email, and registration validation automation',
          '2025 EAIE conference and partner-university visits (Sweden, Norway, France); secured new agreements',
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
    heading: 'Looking for a new stage.',
    email: 'sachoi@yonsei.ac.kr',
    linkedin: 'linkedin.com/in/seoah-choi',
    linkedinUrl: 'https://linkedin.com/in/seoah-choi',
  },

  footer: {
    copyright: '© 2026 Céline Choi · Seo-Ah Choi (최서아)',
  },
};
