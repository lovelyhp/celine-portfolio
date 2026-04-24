export const en = {
  meta: {
    nameRoman: 'Céline Choi',
    tagline: 'A planner building real change inside an administrative organization — with AI.',
    subtitle:
      'Non-CS background. Europe Region Exchange Program Manager at Yonsei University. I replace "we can\'t do that" with "here\'s how we can."',
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
      { value: '105+', label: 'European Partners Managed' },
      { value: '25h → 8h', label: 'Weekly Email Processing Time' },
      { value: '15', label: 'AI Personas Orchestrated' },
      { value: '200+', label: 'ECTS Conversions / Semester, Automated' },
    ],
    hint: 'Use ← → arrows or scroll to explore',
  },
  about: {
    number: 'I',
    title: 'About',
    body: [
      'I manage the exchange program with 105 European partner universities as Europe Region Exchange Program Manager at Yonsei University\'s Office of International Affairs. In parallel, I\'m a master\'s student in AI Computing at the Yonsei Graduate School of AI Convergence.',
      'I came from a French Literature background — not CS. For the past year, I\'ve been obsessed with transforming administrative routine into AI-powered workflows. I\'ve built tools with Flask, Google Apps Script, D3.js, and React. Most recently, using Claude Code, I built the "OIA Automation Office": a six-floor virtual building where 14 AI secretaries each tend their own department folders.',
      'I can\'t stand planning that stays on paper. I\'m obsessed with work that actually ships, that colleagues and students actually use, whose effect is proven in numbers, and that changes how an organization works.',
      'Now I\'m looking for a larger stage to scale this experiment.',
    ],
  },

  featured: {
    number: 'II',
    title: 'Featured Work',
    intro: 'Two main works, told as stories. Use ← → to advance through each chapter.',
  },

  oiaBuilding: {
    id: 'oia-building',
    index: '01',
    year: '2026',
    title: 'OIA Automation Office',
    subtitle: 'A virtual 6-floor building with 14 AI secretaries',
    stack: ['Claude Code', 'Flask', 'GAS', 'Claude API', 'D3.js'],
    slides: [
      {
        kind: 'cover',
        heading: 'OIA Automation Office',
        sub: 'A virtual 6-floor building with 14 AI secretaries',
        body:
          'An integrated automation system that connects 14 department folders via file-system events, where each folder\'s AI persona performs its own work. A one-year record of moving from executor to conductor.',
        imageSrc: null,
        imageCaption: 'OIA Building — full visualization',
        imageHint: 'Render of the 6-floor building (characters, elevator, Uboo visible)',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: '60 emails a day. 25+ hours a week.',
        body: [
          'Every morning at 9 AM, at least 60 new emails waited in my inbox. European partner coordinators, Yonsei students heading abroad, inbound students, new partnership proposals, renewals — a flood of Korean, English, and French emails. Any delay, and unread count grew to 150–200.',
          '200+ ECTS conversions per semester. Per-student admission emails. FAQ responses similar but never identical. Partner data, student data, past cases were scattered across spreadsheets, documents, and emails.',
          'Over 25 hours per week evaporated into routine work. The time to do what actually mattered — strategy and planning — never came.',
        ],
        imageSrc: null,
        imageCaption: 'Gmail inbox (150+ unread)',
        imageHint: 'Gmail screenshot with unread badge visible, private info redacted',
      },
      {
        kind: 'section',
        tag: 'APPROACH · I',
        heading: 'It started simply. I wanted to go home.',
        body: [
          'I never set out to build an "organizational automation platform." I just fixed the most painful thing first.',
          'Flask + Claude API for email classification and drafting. GAS + Claude API for ECTS conversion. A FAQ chatbot, a D3.js dashboard, a nomination management GAS web app, an automatic certificate system. Each tool returned a little more of my time.',
        ],
        imageSrc: null,
        imageCaption: 'First tools — initial interfaces',
        imageHint: 'Screenshot of email classifier / ECTS converter / FAQ chatbot (single or collage)',
      },
      {
        kind: 'section',
        tag: 'APPROACH · II',
        heading: 'Past ten tools, a new problem.',
        body: [
          'The more tools I had, the heavier it became just to decide "which tool for which task?" Each lived in its own folder, with its own execution pattern, its own update cycle.',
          'That was when I met Claude Code. And I thought: what if one manager orchestrated all these tools? And while we\'re at it, why not build it like a real office?',
        ],
        imageSrc: null,
        imageCaption: 'Project folder structure',
        imageHint: 'VS Code sidebar showing 14 department folders, or a folder tree diagram',
      },
      {
        kind: 'section',
        tag: 'APPROACH · III',
        heading: 'I built the OIA Building.',
        body: [
          'Using Claude Code\'s sub-agents and CLAUDE.md personas, I constructed a virtual 6-floor building. 14 department folders mapped to floors and rooms, each with a dedicated secretary. Léa on 1F (agreements), Mail on 2F (email), Nomi on 3F (nominations), Céline on 5F (chief). On 6F, me and Uboo, my cheese cat.',
          'This wasn\'t decoration. It was design. Folder = department; file-change event = secretary state; total activity = Uboo\'s patrol speed. I translated abstract filesystem events into a concrete metaphor of organizational behavior.',
          'I insisted on the playful naming. President Uboo, CEO Seo-Ah, coffee time, naps, overtime — a statement that AI should be treated as a colleague, not a tool.',
        ],
        imageSrc: null,
        imageCaption: 'Upper floors of OIA Building (6F CEO office with Uboo)',
        imageHint: 'Close-up render of the 6F suite — Seo-Ah\'s desk, cat wheel, cat tower, Uboo',
      },
      {
        kind: 'section',
        tag: 'APPROACH · IV',
        heading: 'One afternoon, D-2.',
        body: [
          '3 PM. Every floor at full capacity. Mail on 2F sorts 54 emails. Nomi on 3F processes 12 Sciences Po nominations. Solène on 4F updates the balance sheet. Léa on 1F cross-checks an IP Paris MoU. Céline on 5F surveys the whole situation. Uboo patrols in peak mode.',
          'I simply ask Céline: "What do I need to personally handle about IP Paris today?"',
          'In the past, I would have opened 150 emails, dug through the agreement folder, converted transcripts one by one. Now the secretaries tend their folders, and I only decide what, to whom, in what order to ask.',
        ],
        imageSrc: null,
        imageCaption: 'OIA Building at peak activity',
        imageHint: 'Screenshot of the building at full capacity, with all secretaries working and Uboo in the elevator',
      },
      {
        kind: 'section',
        tag: 'APPROACH · V',
        heading: 'How a non-CS person works with AI.',
        body: [
          'The reason I — without a CS degree — could build this entire system is that I settled into a loop: requirement definition → pair-programming with Claude → real use → iteration. I don\'t memorize architecture details. I precisely describe "what the problem is," "how it should work," "what feels off right now."',
          'Not having a CS degree stopped being a barrier. It became a weapon: the planner who knows the field\'s real pain points can build the tools directly.',
        ],
        imageSrc: null,
        imageCaption: 'Claude Code session in progress',
        imageHint: 'Terminal running Claude Code with editor view, split-screen',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: 'Change in Numbers',
        table: [
          { label: 'Weekly Email Processing Time', before: '25h+', after: '~8h' },
          { label: 'ECTS Conversion (per case)', before: '8–10 min', after: 'under 30 sec' },
          { label: 'ECTS Conversion (per semester)', before: '~30h', after: '~2h' },
          { label: 'Nomination Admission Email (per student)', before: '15 min', after: '2–3 min' },
          { label: 'Unread Email Backlog', before: '150–200', after: 'under 30' },
        ],
        body: [
          {
            h: 'Honestly — at first it took twice as long.',
            p:
              'I was building automation alongside the existing work. But now — in the time it takes me to drink a coffee, my secretaries are reviewing drafts, writing emails, converting transcripts. I\'ve been relieved of execution, but remain the decision-maker who oversees, reviews, approves.',
          },
          {
            h: 'What having time really means',
            p:
              'During work hours, I can finally focus on planning and strategy. Website renewal, partner DB, European benchmarking trip — projects impossible without the automation office. After-hours, I attend graduate classes and AI study groups regularly.',
          },
        ],
        imageSrc: null,
        imageCaption: 'Weekly hours before vs after',
        imageHint: 'Bar or time-series chart showing email processing hours decline',
      },
      {
        kind: 'scenes',
        tag: 'SCENES',
        heading: 'Three scenes',
        scenes: [
          'On the day of President Macron\'s visit, I could focus on the protocol floor. That morning, Mail had already sorted over 90 emails.',
          'The first evening I left at the proper time, Uboo (my actual cat) greeted me earlier than usual when I got home.',
          'The first time I arrived at my master\'s class on time, I took a seat in the front row.',
        ],
        closing: {
          h: 'The story isn\'t over.',
          p:
            'I\'m still the only one using this system. My organization remains conservative about AI. That\'s why I\'m looking for a larger stage.',
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
    title: 'University Finder Dashboard',
    subtitle: 'A D3.js interactive web tool',
    stack: ['React', 'D3.js', 'Tailwind', 'Google Sheets API', 'Netlify'],
    slides: [
      {
        kind: 'cover',
        heading: 'University Finder Dashboard',
        sub: 'D3.js interactive web tool',
        body:
          'A dashboard letting students intuitively explore 248 partner universities. Converts OIA\'s repetitive FAQ into a tool.',
        imageSrc: null,
        imageCaption: 'Univ Finder main view',
        imageHint: 'Screenshot of oiaunivfinder.netlify.app home page',
      },
      {
        kind: 'section',
        tag: 'PROBLEM',
        heading: 'The same questions, every year.',
        body: [
          '"With my TOEFL 92, where can I apply?" "Which European schools teach in English?" "Engineering in Germany?" — Students leafed through a 248-page PDF or called the OIA office, while my colleagues and I answered the same questions dozens of times a day.',
        ],
        imageSrc: null,
        imageCaption: 'The legacy PDF booklet',
        imageHint: 'A page from the dense, text-heavy PDF — "this was all text"',
      },
      {
        kind: 'section',
        tag: 'APPROACH',
        heading: 'A tool where students filter for themselves.',
        body: [
          'A dashboard where students filter by their own criteria, save favorites, and download a CSV. Built with D3.js + React. Multi-dimensional filters — region, country, TOEFL tier, quota, QS ranking — apply simultaneously. Data pulled live from Google Sheets. Favorites saved to LocalStorage with CSV export.',
        ],
        imageSrc: null,
        imageCaption: 'Filter panel and results list',
        imageHint: 'Screenshot with filters applied — side panel + result cards visible',
      },
      {
        kind: 'result',
        tag: 'RESULT',
        heading: 'Deployed at oiaunivfinder.netlify.app',
        body: [
          {
            h: '',
            p:
              'Reduced student FAQ inquiries. To be integrated as a main feature in the OIA website renewal. Officially introduced in exchange recruitment orientation materials.',
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
    intro: 'Other projects. Click a card to expand.',
    projects: [
      {
        title: 'ECTS Credit Conversion Automation',
        year: '2025–2026',
        stack: ['GAS', 'Claude API', 'python-docx'],
        body:
          'Automated the conversion of European (ECTS) transcripts to Yonsei credits. 200+ repetitive cases per semester reduced from 8–10 minutes each to under 30 seconds. Also produced a standard English Certificate template for graduate-school-bound exchange alumni.',
        imageCaption: 'ECTS conversion spreadsheet',
        imageHint: 'Google Sheets screenshot with Yonsei credits auto-populated',
      },
      {
        title: 'OIA Website Renewal',
        year: '2026',
        stack: ['React', 'TypeScript', 'Netlify'],
        body:
          'In a development environment dominated by legacy constraints, I, as a planner, directly built a React mockup and delivered it alongside a development requirements document. Restructured main stats to "Since 1966 · 80+ Partner Countries · 740+ Partner Universities" and unfolded the history timeline as scroll interaction. Mockup and requirements doc became the baseline for the actual renewal project.',
        imageCaption: 'Hero of yonsei-oia.netlify.app',
        imageHint: 'Screenshot of the mockup site\'s Hero + 3-stat section',
      },
      {
        title: 'Partner University Database',
        year: '2026',
        stack: ['Excel', 'Google Sheets', 'openpyxl', 'Claude Code'],
        body:
          'Standardized agreement data for 740+ partner universities into a 27-column schema. 8 public columns vs 19 internal-management columns, color-coded. Dropdown validation on key fields. Designed to extend to website embedding and expiry notification automation.',
        imageCaption: '27-column DB schema',
        imageHint: 'Color-coded Excel header — public and internal columns distinguishable',
      },
      {
        title: 'President Macron Lecture Operations',
        year: '2026',
        stack: ['French Delegation', 'Protocol', 'Event Ops'],
        body:
          'Led operations for President Macron\'s special lecture at Yonsei, April 3, 2026. Within 7 weeks, coordinated Élysée Palace, French Embassy, Presidential Security, and 5 internal offices. Personally handled welcome speech, student Q&A design, rehearsals, press releases, PCO private-contract justification. 169 domestic press hits, extensive French coverage.',
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
        position: 'Europe Region Exchange Program Manager',
        period: 'Nov 2025 – Present',
        bullets: [
          'Lead exchange program strategy and operations across 105 European partner universities',
          'Executed end-to-end operations for President Macron\'s special lecture at Yonsei (April 2026) within 7 weeks',
          'Drove automation initiative — Flask, GAS, React, D3.js, Claude Code',
          'Planned and secured funding for European benchmarking trip (Sciences Po, UCL, LSE)',
        ],
      },
      {
        org: 'Yonsei University, Office of International Affairs',
        position: 'YISS/WAY International Program Manager',
        period: 'Jan 2024 – Oct 2025',
        bullets: [
          'Ran YISS/WAY 40th anniversary program (Suno AI theme song, 110K+ social media views)',
          'Full short-program operations — invoicing, HTML email, registration validation, academic calendar',
          'EAIE Sweden 2025, partner visits in Norway and France',
        ],
      },
    ],
    education: [
      {
        school: 'Yonsei Graduate School of AI Convergence',
        degree: 'M.S. in AI Computing',
        period: 'Sep 2025 – Present',
        bullets: [
          'Team project: RAG-based exchange review retrieval system',
          'NLP Study Group — presented ReAct paper, positioning my email triage system as field implementation',
        ],
      },
      {
        school: 'Yonsei University',
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
    heading: 'Open to new conversations.',
    email: 'sachoi@yonsei.ac.kr',
    linkedin: 'linkedin.com/in/seoah-choi',
    linkedinUrl: 'https://linkedin.com/in/seoah-choi',
  },

  footer: {
    copyright: '© 2026 Céline Choi · Seo-Ah Choi (최서아)',
  },
};
