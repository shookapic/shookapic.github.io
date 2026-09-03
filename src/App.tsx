import About from './components/About.tsx'
import Experience from './components/Experience.tsx'
import FeaturedWork from './components/FeaturedWork.tsx'
import Footer from './components/Footer.tsx'
import Hero from './components/Hero.tsx'
import Marquee from './components/Marquee.tsx'
import Nav from './components/Nav.tsx'
import ProjectGrid from './components/ProjectGrid.tsx'
import ScrollProgress from './components/ScrollProgress.tsx'
import Security from './components/Security.tsx'
import Stack from './components/Stack.tsx'
import { useContent } from './components/useContent.ts'

export default function App() {
  const { ui } = useContent()

  return (
    <>
      <a className="skip-link" href="#work">
        {ui.skipToWork}
      </a>
      <ScrollProgress />
      <Nav />
      <main>
        <div className="shell">
          <Hero />
        </div>
        <Marquee />
        <div className="shell">
          <FeaturedWork />
          <ProjectGrid />
          <Experience />
          <Stack />
          <Security />
          <About />
          <Footer />
        </div>
      </main>
    </>
  )
}
