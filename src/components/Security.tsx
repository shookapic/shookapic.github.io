import Section from './Section.tsx'
import { useContent } from './useContent.ts'
import { useReveal } from './useReveal.ts'

export default function Security() {
  const { security, headings } = useContent()
  const lede = useReveal<HTMLParagraphElement>()
  const stats = useReveal<HTMLUListElement>()
  const hall = useReveal<HTMLUListElement>()

  return (
    <Section id="security" label={headings.security.label} title={headings.security.title}>
      <p className="sec-lede reveal from-left" ref={lede}>
        {security.lede}
      </p>

      {/* Scoreboard first: the numbers are the claim, the cards below are the
          evidence. Read as a definition list because each figure is labelled. */}
      <ul className="sec-stats stagger" ref={stats}>
        {security.stats.map((s, i) => (
          <li className="sec-stat" key={s.label} style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="sec-stat-value">{s.value}</span>
            <span className="sec-stat-label">{s.label}</span>
            {s.note ? <span className="sec-stat-note">{s.note}</span> : null}
          </li>
        ))}
      </ul>

      <h3 className="sec-hall-title">{security.hallTitle}</h3>

      <ul className="sec-hall stagger from-left" ref={hall}>
        {security.hall.map((t, i) => {
          const body = (
            <>
              <span className="sec-trophy-meta">{t.meta}</span>
              <h4 className="sec-trophy-title">{t.title}</h4>
              <p className="sec-trophy-detail">{t.detail}</p>
            </>
          )

          return (
            <li key={t.title} style={{ transitionDelay: `${i * 90}ms` }}>
              {t.url ? (
                <a className="sec-trophy is-link" href={t.url} target="_blank" rel="noreferrer">
                  {body}
                </a>
              ) : (
                <div className="sec-trophy">{body}</div>
              )}
            </li>
          )
        })}
      </ul>

      <p className="side-more">
        <a href={security.profileUrl} target="_blank" rel="noreferrer">
          {security.profileCta} {security.profileLabel}
          <span aria-hidden="true"> →</span>
        </a>
      </p>
    </Section>
  )
}
