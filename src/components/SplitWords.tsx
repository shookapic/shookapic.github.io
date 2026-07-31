import { Fragment } from 'react'
import { useReveal } from './useReveal.ts'

type Props = {
  text: string
  step?: number
  className?: string
}

/**
 * Reveals a heading word by word, each one rising out of its own clipping box.
 * The whole string stays in the DOM as one text run, so it still wraps and
 * still reads correctly to assistive tech.
 */
export default function SplitWords({ text, step = 55, className }: Props) {
  const ref = useReveal<HTMLSpanElement>()
  const words = text.split(' ')

  return (
    <span className={['words', className].filter(Boolean).join(' ')} ref={ref}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="word">
            <span className="word-in" style={{ transitionDelay: `${i * step}ms` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}
