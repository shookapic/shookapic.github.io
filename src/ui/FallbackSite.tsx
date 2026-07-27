import { profile, timeline, projects, skills, cvs } from '../data/content.ts'

// Plain-HTML version of the portfolio for reduced-motion users
// and devices without WebGL. Same content, no 3D.
export default function FallbackSite() {
  return (
    <main className="fallback">
      <header className="fb-hero">
        <h1>{profile.name}</h1>
        <p className="fb-title">{profile.title}</p>
        <p className="fb-loc">{profile.location}</p>
      </header>

      <section>
        <h2>About</h2>
        <p>{profile.bio}</p>
        <ul className="timeline">
          {timeline.map((t) => (
            <li key={t.label}>
              <span className="year">{t.year}</span>
              <span>{t.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <a key={p.name} className="project-card" href={p.url} target="_blank" rel="noreferrer">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2>Skills</h2>
        <div className="tags fb-skills">
          {skills.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section>
        <h2>Contact</h2>
        <div className="cv-row">
          {cvs.map((cv) => (
            <a key={cv.lang} className="cv-btn" href={cv.file} download>
              <strong>{cv.lang}</strong>
              <span>{cv.label}</span>
            </a>
          ))}
        </div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/Shookapic
          </a>
        </div>
      </section>
    </main>
  )
}
