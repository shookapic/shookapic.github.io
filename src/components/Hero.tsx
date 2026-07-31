import { useCountUp, useInView, useMagnetic } from './hooks.ts'
import Typewriter from './Typewriter.tsx'
import { useContent, useLocale } from './useContent.ts'

function Stat({ value, label }: { value: string; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4)
  // Only whole numbers count up; "1st" and "3.9" are printed as written.
  const target = /^\d+$/.test(value) ? Number(value) : null
  const counted = useCountUp(target ?? 0, inView)

  return (
    <div className="stat" ref={ref}>
      <dt className="stat-value">{target === null ? value : counted}</dt>
      <dd className="stat-label">{label}</dd>
    </div>
  )
}

export default function Hero() {
  const { profile, stats, cvs, ui } = useContent()
  const locale = useLocale()
  const primary = useMagnetic<HTMLAnchorElement>()
  const secondary = useMagnetic<HTMLAnchorElement>()
  // Hand over the CV in the language being read, not whichever comes first.
  const cv = cvs.find((c) => c.code === locale) ?? cvs[0]

  return (
    <header className="hero" id="top">
      <p className="hero-where">
        {profile.location}
        <span className="hero-where-sep" aria-hidden="true">
          /
        </span>
        {profile.availability}
      </p>

      {/* The wrapper shrinks to the name so the caret rule below can match its
          width. The caret is the signature: the name annotated the way a
          compiler annotates a symbol. Decorative, so hidden from assistive tech. */}
      <div className="hero-mark">
        <h1 className="hero-name">{profile.name}</h1>
        <div className="hero-caret" aria-hidden="true">
          <span className="caret-rule" />
        </div>
      </div>

      <p className="hero-note">
        <span className="note-kw">note:</span>{' '}
        <Typewriter
          key={`${profile.role}-${profile.note}`}
          text={`${profile.role} — ${profile.note}`}
        />
      </p>

      <p className="hero-lede">{profile.lede}</p>

      <div className="hero-actions">
        <a className="btn btn-solid" href="#work" ref={primary}>
          {ui.seeWork}
        </a>
        <a className="btn btn-quiet" href={cv.file} download hrefLang={cv.code} ref={secondary}>
          {ui.downloadCv}
        </a>
      </div>

      <dl className="stats">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} />
        ))}
      </dl>
    </header>
  )
}
