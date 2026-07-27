import { useEffect, useState } from 'react'
import { sections } from '../data/content.ts'
import { scrollToSection, SECTION_EVENT } from '../scene/scrollBus.ts'

export default function Overlay() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onSection = (e: Event) => setActive((e as CustomEvent<number>).detail)
    window.addEventListener(SECTION_EVENT, onSection)
    return () => window.removeEventListener(SECTION_EVENT, onSection)
  }, [])

  return (
    <>
      <nav className="nav-dots" aria-label="Sections">
        {sections.map((label, i) => (
          <button
            key={label}
            className={i === active ? 'dot active' : 'dot'}
            aria-label={label}
            aria-current={i === active}
            onClick={() => scrollToSection(i, sections.length)}
          >
            <span className="dot-label">{label}</span>
          </button>
        ))}
      </nav>
      {active === 0 && (
        <div className="scroll-hint" aria-hidden="true">
          scroll to fly
          <span className="chevron">▾</span>
        </div>
      )}
    </>
  )
}
