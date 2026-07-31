import Section from './Section.tsx'
import { useContent } from './useContent.ts'
import { useReveal } from './useReveal.ts'

export default function Experience() {
  const { experience, headings } = useContent()
  const list = useReveal<HTMLOListElement>()

  return (
    <Section id="experience" label={headings.experience.label} title={headings.experience.title}>
      <ol className="roles stagger from-left" ref={list}>
        {experience.map((role, i) => (
          <li className="role" key={role.company} style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="role-when">
              <span className="role-period">{role.period}</span>
              <span className="role-place">{role.place}</span>
            </div>

            <div className="role-body">
              <h3 className="role-company">{role.company}</h3>
              <p className="role-title">
                {role.title} <span className="role-stack">{role.stack}</span>
              </p>
              <ul className="role-points">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
