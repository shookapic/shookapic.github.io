export type StatusKey = 'flagship' | 'shipping' | 'live' | 'archived'

export type ProjectLink = { label: string; url: string }

export type Project = {
  name: string
  status: StatusKey
  meta: string
  description: string
  tech: string[]
  links: ProjectLink[]
}

export type SideProject = {
  name: string
  description: string
  tech: string[]
  url: string
}

export type Role = {
  company: string
  title: string
  stack: string
  place: string
  period: string
  bullets: string[]
}

export type Content = {
  profile: {
    name: string
    role: string
    note: string
    location: string
    availability: string
    email: string
    github: string
    githubLabel: string
    lede: string
  }
  ui: {
    seeWork: string
    downloadCv: string
    copy: string
    copied: string
    cvLabel: string
    restOnGithub: string
    skipToWork: string
    sections: string
    themeToLight: string
    themeToDark: string
    language: string
  }
  statusLabels: Record<StatusKey, string>
  stats: { value: string; label: string }[]
  marquee: string[]
  nav: { id: string; label: string }[]
  headings: Record<'work' | 'elsewhere' | 'experience' | 'stack' | 'about' | 'contact', { label: string; title: string }>
  featured: Project[]
  sideProjects: SideProject[]
  experience: Role[]
  stack: { group: string; items: string[] }[]
  education: { school: string; detail: string; period: string }[]
  highlights: { year: string; label: string }[]
  about: { paragraphs: string[]; educationTitle: string; recognitionTitle: string; languagesLabel: string; languagesValue: string; basedLabel: string }
  contact: { title: string }
  cvs: { lang: string; code: string; label: string; file: string }[]
}
