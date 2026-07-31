import { useEffect, useRef, useState } from 'react'
import { useMagnetic } from './hooks.ts'
import SplitWords from './SplitWords.tsx'
import { useContent } from './useContent.ts'
import { useReveal } from './useReveal.ts'

function CopyEmail() {
  const { profile, ui } = useContent()
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked by permissions; the address is on screen anyway.
    }
  }

  return (
    <button type="button" className={`copy${copied ? ' is-copied' : ''}`} onClick={copy}>
      {copied ? ui.copied : ui.copy}
    </button>
  )
}

export default function Footer() {
  const { profile, cvs, ui, headings, contact } = useContent()
  const ref = useReveal<HTMLElement>()
  const email = useMagnetic<HTMLAnchorElement>(0.12)

  return (
    <footer className="section contact reveal" id="contact" ref={ref}>
      <span className="section-label">{headings.contact.label}</span>

      <p className="availability">
        <span className="live-dot" aria-hidden="true" />
        {profile.availability}
      </p>

      <h2 className="contact-title">
        <SplitWords key={contact.title} text={contact.title} step={70} />
      </h2>

      <div className="contact-email-row">
        <a className="contact-email" href={`mailto:${profile.email}`} ref={email}>
          {profile.email}
        </a>
        <CopyEmail />
      </div>

      <div className="contact-cvs">
        <span className="contact-cvs-label">{ui.cvLabel}</span>
        <ul>
          {cvs.map((cv) => (
            <li key={cv.lang}>
              <a href={cv.file} download hrefLang={cv.code}>
                {cv.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="contact-foot">
        <a href={profile.github} target="_blank" rel="noreferrer">
          {profile.githubLabel}
        </a>
        <span>{profile.location}</span>
        <span>© {new Date().getFullYear()} Cédric Roulof</span>
      </div>
    </footer>
  )
}
