import SplitWords from './SplitWords.tsx'
import { useContent } from './useContent.ts'
import { useReveal } from './useReveal.ts'

export default function ProjectGrid() {
  const { profile, sideProjects, headings, ui } = useContent()
  const head = useReveal<HTMLElement>()
  const grid = useReveal<HTMLUListElement>()

  return (
    <section className="section section-tight" aria-labelledby="more-heading">
      <header className="section-head" ref={head}>
        <span className="section-label reveal from-left">{headings.elsewhere.label}</span>
        <h2 className="section-title" id="more-heading">
          <SplitWords key={headings.elsewhere.title} text={headings.elsewhere.title} />
        </h2>
        <span className="section-rule reveal" aria-hidden="true" />
      </header>

      <ul className="side-grid stagger from-left" ref={grid}>
        {sideProjects.map((p, i) => (
          <li key={p.name} style={{ transitionDelay: `${i * 80}ms` }}>
            <a className="side" href={p.url} target="_blank" rel="noreferrer">
              <h3 className="side-name">{p.name}</h3>
              <p className="side-desc">{p.description}</p>
              <p className="side-tech">{p.tech.join(' · ')}</p>
            </a>
          </li>
        ))}
      </ul>

      <p className="side-more">
        <a href={profile.github} target="_blank" rel="noreferrer">
          {ui.restOnGithub} {profile.githubLabel}
          <span aria-hidden="true"> →</span>
        </a>
      </p>
    </section>
  )
}
