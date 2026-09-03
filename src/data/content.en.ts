import type { Content } from './types.ts'

const en: Content = {
  profile: {
    name: 'Cédric Roulof',
    role: 'Software engineer',
    note: 'fullstack & systems development',
    location: 'Paris, France — from Réunion Island',
    availability: 'Open for work in France or remote',
    email: 'pro@cedricroulof.com',
    github: 'https://github.com/Shookapic',
    githubLabel: 'github.com/shookapic',
    lede: `Fullstack and systems developer with a year of production experience across e-commerce, public sector and enterprise. I ship web applications and REST APIs, and I build developer tooling on LLVM/Clang. Native French, professional English.`,
  },

  ui: {
    seeWork: 'See the work',
    downloadCv: 'Download CV',
    copy: 'Copy',
    copied: 'Copied',
    cvLabel: 'CV',
    restOnGithub: 'The rest is on',
    skipToWork: 'Skip to the work',
    sections: 'Sections',
    themeToLight: 'Switch to the light theme',
    themeToDark: 'Switch to the dark theme',
    language: 'Language',
  },

  statusLabels: {
    flagship: 'flagship',
    shipping: 'shipping',
    live: 'live',
    archived: 'archived',
  },

  stats: [
    { value: '3', label: 'fullstack roles shipped' },
    { value: '24', label: 'repos in the CoreTrace org' },
    { value: '1st', label: 'Innov4Safe hackathon, 2024' },
    { value: '3.9', label: 'GPA on exchange in Korea' },
  ],

  marquee: [
    'LLVM / Clang',
    'Static analysis',
    'SARIF',
    'REST APIs',
    'React',
    'Node.js',
    'Python',
    'C++20',
    'Local LLMs',
    'AWS',
    'Penetration testing',
  ],

  nav: [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'stack', label: 'Stack' },
    { id: 'security', label: 'Security' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  headings: {
    work: { label: 'Selected work', title: 'Four things worth reading about' },
    elsewhere: { label: 'Elsewhere', title: 'Other things I have built' },
    experience: { label: 'Experience', title: 'A year of shipping in production' },
    stack: { label: 'Stack', title: 'What I reach for' },
    security: { label: 'Security', title: 'The offensive-security side' },
    about: { label: 'About', title: 'Where this comes from' },
    contact: { label: 'Contact', title: 'Tell me what you are building.' },
  },

  featured: [
    {
      name: 'CoreTrace',
      status: 'flagship',
      meta: 'Analysis platform · 2025–present · Apache-2.0',
      description: `A free, open-source static analysis tool for C and C++, built on LLVM/Clang 20 with SARIF output so findings drop straight into IDEs and CI policy gates. A CLI orchestrator drives the compiler layer and a set of focused analyzers — stack, concurrency, memory, runtime instrumentation — reasoning across translation units when project-wide context is needed. I co-build it in a four-person team and own the GUI. It has already drawn interest from enterprise contacts in certification-driven industries: embedded, aerospace, defense.`,
      tech: ['C++20', 'LLVM/Clang 20', 'CMake', 'Python', 'SARIF'],
      links: [
        { label: 'The organisation', url: 'https://github.com/CoreTrace' },
        { label: 'Orchestrator', url: 'https://github.com/CoreTrace/coretrace' },
        { label: 'Compiler layer', url: 'https://github.com/CoreTrace/coretrace-compiler' },
      ],
    },
    {
      name: 'Ace',
      status: 'shipping',
      meta: 'Desktop app · v0.1.11',
      description: `A privacy-focused desktop chat overlay for Claude and ChatGPT. Native OAuth signs you in with your own accounts — no API keys, no third-party server — then adds streaming replies, attachments, Whisper voice input, and your real conversation history from both providers. Hides itself from screen capture, lives in the tray behind a global shortcut, and ships signed auto-updates.`,
      tech: ['Rust', 'Tauri v2', 'React', 'TypeScript'],
      links: [
        { label: 'Source', url: 'https://github.com/shookapic/Ace' },
        { label: 'Releases', url: 'https://github.com/shookapic/Ace/releases' },
      ],
    },
    {
      name: 'MyEditor',
      status: 'live',
      meta: 'Web app · live',
      description: `A PDF editor that runs entirely in the browser. Open a document, edit and annotate it, then hand the signature step off to a phone by scanning a QR code — the two devices pair peer-to-peer, so the file never leaves the browser it was opened in.`,
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'pdf-lib', 'PDF.js', 'PeerJS'],
      links: [
        { label: 'Open the app', url: 'https://shookapic.github.io/MyEditor/' },
        { label: 'Source', url: 'https://github.com/shookapic/MyEditor' },
      ],
    },
    {
      name: 'ASCII_Art',
      status: 'archived',
      meta: 'Two C++ renderers',
      description: `Pixels in, characters out. vid2ascii transcodes an mp4 into ASCII frames; irl2ascii does the same live off a webcam, in the terminal, at speed.`,
      tech: ['C++', 'OpenCV', 'CMake'],
      links: [{ label: 'Source', url: 'https://github.com/shookapic/ASCII_Art' }],
    },
  ],

  sideProjects: [
    {
      name: 'StreaMe',
      description: 'Low-latency iPhone screen mirroring to Windows — hardware decode, zero-copy GPU rendering, 1080p60 under 100 ms on a LAN.',
      tech: ['C++20', 'Direct3D 11', 'Media Foundation', 'React'],
      url: 'https://github.com/Shookapic/StreaMe',
    },
    {
      name: 'TinyVM',
      description: 'A 64-bit virtual machine written from scratch — custom instruction set, assembler, and bytecode interpreter.',
      tech: ['C++', 'ISA design', 'Bytecode'],
      url: 'https://github.com/Shookapic/TinyVM',
    },
    {
      name: 'Flowfy',
      description: 'A Zapier alternative: connect services and automate workflows between them.',
      tech: ['Node', 'React'],
      url: 'https://github.com/Shookapic/Flowfy',
    },
    {
      name: 'TheBrickler',
      description: 'A cross-platform idle game that ships to browser, desktop and mobile from one codebase.',
      tech: ['TypeScript', 'React', 'Phaser 3', 'Electron', 'Capacitor'],
      url: 'https://github.com/Shookapic/TheBrickler',
    },
    {
      name: 'Minishell',
      description: 'A UNIX shell written in C — parsing, pipes, redirections, job control, no libraries.',
      tech: ['C', 'POSIX'],
      url: 'https://github.com/Shookapic/Minishell',
    },
    {
      name: 'MyHunter',
      description: 'Duck Hunt rebuilt from scratch in C with CSFML, in a single week.',
      tech: ['C', 'CSFML'],
      url: 'https://github.com/Shookapic/MyHunter',
    },
  ],

  experience: [
    {
      company: 'Groupe Caille',
      title: 'Fullstack Developer',
      stack: 'Python · React · MySQL',
      place: 'Réunion Island, France',
      period: 'Apr — Aug 2025',
      bullets: [
        'Rewrote a business-critical internal application from WinDev to a Python and React stack, improving performance and modernising the interface.',
        'Migrated the production database from Oracle to MySQL, preserving data integrity while cutting licensing overhead.',
        'Interviewed stakeholders across several departments to map requirements and drive the UI/UX decisions.',
      ],
    },
    {
      company: 'Régal Vanille',
      title: 'Fullstack Developer',
      stack: 'Node.js · React · MySQL · AWS',
      place: 'Réunion Island, France',
      period: 'Sep 2024 — Feb 2025',
      bullets: [
        'Built a production e-commerce platform end to end — Node.js backend, React frontend, MySQL data layer.',
        'Re-architected hosting on AWS, increasing site availability and uptime.',
      ],
    },
    {
      company: 'Département de La Réunion (DSID)',
      title: 'Fullstack Developer',
      stack: 'PHP Laravel · Vue.js · C++',
      place: 'Réunion Island, France',
      period: 'Aug — Dec 2023',
      bullets: [
        'Deployed a self-hosted large language model for internal users, including dataset preparation and fine-tuning.',
        'Designed and implemented the REST APIs that exposed the model to internal applications.',
      ],
    },
  ],

  stack: [
    { group: 'Languages', items: ['C', 'C++20', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'Rust', 'SQL', 'HLSL'] },
    { group: 'Frontend', items: ['React', 'Vue.js', 'Next.js', 'HTML', 'CSS', 'Figma'] },
    { group: 'Backend & data', items: ['Node.js', 'Laravel', 'REST API design', 'MySQL', 'Oracle', 'Migrations'] },
    { group: 'Systems', items: ['LLVM', 'Clang', 'Static analysis', 'SARIF', 'CMake', 'Linux'] },
    { group: 'AI / ML', items: ['LLM fine-tuning', 'llama.cpp', 'Local LLM deployment'] },
    { group: 'DevOps & cloud', items: ['Docker', 'AWS', 'DigitalOcean', 'CI/CD', 'GitHub Actions', 'Git', 'SSH'] },
    { group: 'Security', items: ['Penetration testing', 'Burp Suite', 'Hydra', 'CTF', 'Remediation'] },
    { group: 'Games', items: ['Unreal Engine 5', 'Unity', 'Three.js'] },
  ],

  security: {
    lede: `Offensive security is where I started and where I still spend my evenings. I have taught it, competed in it, and I keep score on TryHackMe — which is a public, verifiable record rather than a line on a CV.`,
    profileUrl: 'https://tryhackme.com/p/sh00kapic',
    profileLabel: 'tryhackme.com/p/sh00kapic',
    profileCta: 'The full profile is on',
    stats: [
      { value: '0x9', label: 'TryHackMe rank', note: 'Mage' },
      { value: 'Top 4%', label: 'global standing', note: 'rank #86,794' },
      { value: '103', label: 'rooms completed' },
      { value: '14', label: 'badges earned' },
    ],
    hallTitle: 'Hall of fame',
    hall: [
      {
        title: '0x9 — Mage',
        meta: 'TryHackMe · level 59',
        detail: `Ninth rank tier on the platform, inside the top 4% of its users. 103 rooms cleared across the offensive and defensive tracks, and 14 badges along the way.`,
        url: 'https://tryhackme.com/p/sh00kapic',
      },
      {
        title: 'Chisel — top 10 fastest',
        meta: 'Epitech · 2025',
        detail: `A three-week offensive-security programme: find the vulnerability, exploit it, write the remediation. I finished among the ten fastest of the cohort.`,
      },
      {
        title: 'Cybersecurity, taught',
        meta: 'Epitech · 2024',
        detail: `Built and delivered the introductory cybersecurity module for first-year students — the fastest way to find out how well you actually understand an attack.`,
      },
    ],
  },

  education: [
    {
      school: 'Keimyung University — Seongso Campus',
      detail: 'Exchange semester, video game development · South Korea · GPA 3.9 / 4.0',
      period: 'Aug 2025 — 2026',
    },
    {
      school: 'Epitech',
      detail: 'MSc Computer Science (RNCP Level 7), Software Engineering Expert · 5th year',
      period: 'Sep 2022 — 2027',
    },
  ],

  highlights: [
    {
      year: '2024',
      label: 'Grand prize at the Innov4Safe hackathon, Préfecture de La Réunion — an intelligent system that reports local field data automatically during cyclone events.',
    },
  ],

  about: {
    paragraphs: [
      'I started on games and terminals and ended up on compilers. What holds it together is a preference for tools that tell you the truth about your program — a fast static analyzer, a readable diagnostic, a build that fails for a reason you can act on.',
      'Professionally I have shipped three fullstack products: an internal application rewritten off WinDev, an e-commerce platform on AWS, and a self-hosted LLM with the REST APIs to reach it. The through-line is taking something that already runs a business and making it faster, cheaper, or possible to maintain.',
      'Most of my own time now goes to CoreTrace, where I own the GUI in a four-person team. I am finishing an MSc at Epitech, based in Paris after an exchange semester in South Korea, and open for work in France or fully remote.',
    ],
    educationTitle: 'Education',
    recognitionTitle: 'Recognition',
    languagesLabel: 'Languages',
    languagesValue: 'French (native), English (professional)',
    basedLabel: 'Based',
  },

  contact: { title: 'Tell me what you are building.' },

  cvs: [
    { lang: 'EN', code: 'en', label: 'English', file: '/assets/CV_Cedric_Roulof_EN.pdf' },
    { lang: 'FR', code: 'fr', label: 'Français', file: '/assets/CV_Cedric_Roulof_FR.pdf' },
  ],
}

export default en
