import { profile, timeline, projects, cvs } from '../data/content.ts'

// DOM layer rendered inside drei's <Scroll html>: one full-viewport page per
// section, scrolling in sync with the camera flight. Pages 0 (hero) and 3
// (skills) are pure 3D, so their slots stay empty.
export default function DomSections() {
  return (
    <>
      <section className="dom-page" style={{ top: '100vh' }}>
        <div className="panel about-panel">
          <p className="bio">{profile.bio}</p>
          <ul className="timeline">
            {timeline.map((t) => (
              <li key={t.label}>
                <span className="year">{t.year}</span>
                <span>{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dom-page" style={{ top: '200vh' }}>
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

      <section className="dom-page" style={{ top: '400vh' }}>
        <div className="panel contact-panel">
          <p className="contact-lead">Want the full story? Grab the CV in your language.</p>
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
        </div>
      </section>
    </>
  )
}
