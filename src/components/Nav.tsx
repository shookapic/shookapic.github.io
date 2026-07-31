import { useEffect, useState } from 'react'
import LangToggle from './LangToggle.tsx'
import ThemeToggle from './ThemeToggle.tsx'
import { useContent } from './useContent.ts'

export default function Nav() {
  const { profile, nav, ui } = useContent()
  const [active, setActive] = useState('')
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    // Track which section owns the upper third of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [nav])

  return (
    <nav className={`nav${lifted ? ' is-lifted' : ''}`} aria-label={ui.sections}>
      <a className="nav-name" href="#top">
        {profile.name}
      </a>

      <div className="nav-right">
        <ul className="nav-links">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={active === item.id ? 'is-active' : undefined}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-tools">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
