import Section from './Section.tsx'
import { useContent } from './useContent.ts'
import { useReveal } from './useReveal.ts'

export default function About() {
  const { about, education, highlights, headings, profile } = useContent()
  const prose = useReveal<HTMLDivElement>()
  const school = useReveal<HTMLOListElement>()
  const wins = useReveal<HTMLOListElement>()

  return (
    <Section id="about" label={headings.about.label} title={headings.about.title}>
      <div className="about">
        <div className="about-prose reveal from-left" ref={prose}>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}

          <dl className="facts">
            <div>
              <dt>{about.languagesLabel}</dt>
              <dd>{about.languagesValue}</dd>
            </div>
            <div>
              <dt>{about.basedLabel}</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </div>

        <div className="about-side">
          <h3 className="about-sub">{about.educationTitle}</h3>
          {/* The rail draws downward as the list arrives — it is a chronology,
              so the direction carries meaning. */}
          <ol className="timeline stagger" ref={school}>
            {education.map((e, i) => (
              <li key={e.school} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="timeline-year">{e.period}</span>
                <span className="timeline-label">
                  <strong>{e.school}</strong>
                  <span className="timeline-detail">{e.detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <h3 className="about-sub">{about.recognitionTitle}</h3>
          <ol className="timeline stagger" ref={wins}>
            {highlights.map((h, i) => (
              <li key={h.label} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="timeline-year">{h.year}</span>
                <span className="timeline-label">{h.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
