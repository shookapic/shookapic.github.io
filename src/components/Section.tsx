import type { ReactNode } from 'react'
import SplitWords from './SplitWords.tsx'
import { useReveal } from './useReveal.ts'

type Props = {
  id: string
  label: string
  title: string
  children: ReactNode
}

export default function Section({ id, label, title, children }: Props) {
  const head = useReveal<HTMLElement>()

  return (
    <section id={id} className="section">
      <header className="section-head" ref={head}>
        <span className="section-label reveal from-left">{label}</span>
        <h2 className="section-title">
          {/* Keyed on the text so switching language replays the reveal
              instead of leaving stale per-word transition state behind. */}
          <SplitWords key={title} text={title} />
        </h2>
        <span className="section-rule reveal" aria-hidden="true" />
      </header>
      {children}
    </section>
  )
}
