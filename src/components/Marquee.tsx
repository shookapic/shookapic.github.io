import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './hooks.ts'
import { useContent } from './useContent.ts'

/**
 * A full-bleed band that runs continuously left to right, and gets nudged along
 * by how far the reader has scrolled. Decorative repetition, so it is hidden
 * from assistive tech.
 */
export default function Marquee() {
  const { marquee } = useContent()
  const shiftRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = shiftRef.current
    if (!el || reduced) return

    let raf = 0
    const update = () => {
      // Written straight to the node — re-rendering React on every scroll
      // frame for a decorative offset would be wasteful.
      el.style.setProperty('--scroll-shift', `${window.scrollY * -0.08}px`)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  // Two identical runs so the loop can wrap without a visible seam.
  const run = (key: string) => (
    <ul className="marquee-run" key={key}>
      {marquee.map((item) => (
        <li key={item}>
          {item}
          <span className="marquee-sep" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-shift" ref={shiftRef}>
        <div className="marquee-track">
          {run('a')}
          {run('b')}
        </div>
      </div>
    </div>
  )
}
