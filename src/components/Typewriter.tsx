import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './hooks.ts'

type Props = {
  text: string
  speed?: number
  startDelay?: number
}

/**
 * Types `text` out one character at a time. The animated copy is hidden from
 * assistive tech and the full string is exposed alongside it, so screen readers
 * get the sentence at once instead of a stream of partial words.
 */
export default function Typewriter({ text, speed = 24, startDelay = 900 }: Props) {
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduced) {
      setCount(text.length)
      return
    }
    setCount(0)
    let step = 0
    let timer = 0
    const tick = () => {
      step += 1
      setCount(step)
      if (step < text.length) timer = window.setTimeout(tick, speed)
    }
    const first = window.setTimeout(tick, startDelay)
    return () => {
      window.clearTimeout(first)
      window.clearTimeout(timer)
    }
  }, [text, speed, startDelay, reduced])

  const done = count >= text.length

  return (
    <>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!done && <span className="type-caret" aria-hidden="true" />}
      <span className="sr-only">{text}</span>
    </>
  )
}
