export const profile = {
  name: 'CÉDRIC ROULOF',
  title: 'Fullstack Developer',
  tagline: 'Building for the web, the terminal and the game engine — from Réunion Island.',
  location: 'Saint-André, Réunion Island',
  email: 'cedric.roulof@epitech.eu',
  github: 'https://github.com/Shookapic',
  bio: `Third-year master's student in software engineering at Epitech, fullstack developer and game dev enthusiast. Winner of the first Inov4Safe hackathon (AI track) and of an offensive-defense cybersecurity competition. I like fast terminals, real-time 3D and shipping things that work.`,
}

export const timeline = [
  { year: '2025', label: 'Built a website for an agrifood company' },
  { year: '2024', label: 'Won the 1st Inov4Safe hackathon (AI) — Préfecture de La Réunion' },
  { year: '2024', label: 'Taught intro to cybersecurity to first-year students' },
  { year: '2023', label: 'Intern at Département de La Réunion — DSID user support' },
  { year: '2022–2027', label: "Epitech Technology — Master's in software engineering" },
]

export type Project = {
  name: string
  description: string
  tech: string[]
  url: string
}

export const projects: Project[] = [
  {
    name: 'Nen',
    description: 'Open-source 3D web battle royale — real-time multiplayer networking and fluid movement, in the browser.',
    tech: ['TypeScript', 'Three.js', 'WebSockets'],
    url: 'https://github.com/Shookapic/Nen',
  },
  {
    name: 'Immune-Defense',
    description: 'Tower defense game based on the human immune system.',
    tech: ['C#', 'Unity'],
    url: 'https://github.com/Shookapic/Immune-Defense',
  },
  {
    name: 'Fractal-Lock',
    description: 'A lock screen that renders fractals while you are away.',
    tech: ['Rust'],
    url: 'https://github.com/Shookapic/Fractal-Lock',
  },
  {
    name: 'GPTerminal',
    description: 'ChatGPT in your terminal.',
    tech: ['C++'],
    url: 'https://github.com/Shookapic/GPTerminal',
  },
  {
    name: 'Flowfy',
    description: 'A Zapier alternative — connect services and automate workflows.',
    tech: ['Node', 'React'],
    url: 'https://github.com/Shookapic/Flowfy',
  },
  {
    name: 'Arcade',
    description: 'A modular arcade machine in C++ with three classic games and hot-swappable graphics libraries.',
    tech: ['C++'],
    url: 'https://github.com/Shookapic',
  },
]

export const skills = [
  'C', 'C++', 'Rust', 'Python', 'JavaScript', 'TypeScript',
  'React', 'Vue', 'Node', 'Express', 'Three.js',
  'Docker', 'Kubernetes', 'Bash', 'Git', 'Unity', 'Unreal Engine',
]

export const cvs = [
  { lang: 'EN', label: 'English', file: '/assets/EN-Cedric_Roulof_CV.pdf' },
  { lang: 'FR', label: 'Français', file: '/assets/FR-Cedric_Roulof_CV.pdf' },
  { lang: 'CN', label: '中文', file: '/assets/CN-Cedric_Roulof_CV.pdf' },
  { lang: 'KR', label: '한국어', file: '/assets/KR-Cedric_Roulof_CV.pdf' },
]

export const sections = ['Home', 'About', 'Projects', 'Skills', 'Contact']
