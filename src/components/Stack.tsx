import Section from './Section.tsx'
import { useContent } from './useContent.ts'
import { useReveal } from './useReveal.ts'

export default function Stack() {
  const { stack, headings } = useContent()
  const list = useReveal<HTMLDListElement>()

  return (
    <Section id="stack" label={headings.stack.label} title={headings.stack.title}>
      <dl className="stack stagger from-left" ref={list}>
        {stack.map((row, i) => (
          <div className="stack-row" key={row.group} style={{ transitionDelay: `${i * 90}ms` }}>
            <dt className="stack-group">{row.group}</dt>
            <dd>
              <ul className="tags">
                {row.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
