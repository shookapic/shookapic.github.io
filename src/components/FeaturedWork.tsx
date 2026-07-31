import Section from './Section.tsx'
import { useContent } from './useContent.ts'
import { useReveal } from './useReveal.ts'

export default function FeaturedWork() {
  const { featured, headings, statusLabels } = useContent()
  const list = useReveal<HTMLOListElement>()

  return (
    <Section id="work" label={headings.work.label} title={headings.work.title}>
      <ol className="work-list stagger from-left" ref={list}>
        {featured.map((p, i) => (
          <li className="work" key={p.name} style={{ transitionDelay: `${i * 110}ms` }}>
            <div className="work-aside">
              <span className={`status status-${p.status}`}>{statusLabels[p.status]}</span>
            </div>

            <div className="work-body">
              <h3 className="work-name">{p.name}</h3>
              <p className="work-meta">{p.meta}</p>
              <p className="work-desc">{p.description}</p>

              <ul className="tags">
                {p.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <p className="work-links">
                {p.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                    {l.label}
                    <span aria-hidden="true"> →</span>
                  </a>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
