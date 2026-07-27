import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Stars, Sparkles } from '@react-three/drei'
import DomSections from '../ui/DomSections.tsx'
import CameraRig from './CameraRig.tsx'
import City from './City.tsx'
import HackerScene from './HackerScene.tsx'
import Effects from './Effects.tsx'
import HeroSection from './sections/HeroSection.tsx'
import AboutSection from './sections/AboutSection.tsx'
import ProjectsSection from './sections/ProjectsSection.tsx'
import SkillsSection from './sections/SkillsSection.tsx'
import ContactSection from './sections/ContactSection.tsx'
import { PAGES } from './waypoints.ts'
import { setScrollEl } from './scrollBus.ts'

function ScrollBridge() {
  const scroll = useScroll()
  useEffect(() => {
    setScrollEl(scroll.el)
  }, [scroll.el])
  return null
}

export default function Experience() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true }}
      style={{ position: 'fixed', inset: 0 }}
    >
      <color attach="background" args={['#05060f']} />
      <fog attach="fog" args={['#070812', 25, 130]} />

      <ambientLight intensity={0.22} color="#4a5a8a" />
      <directionalLight position={[-40, 30, -20]} intensity={0.55} color="#8fb3ff" />

      <Suspense fallback={null}>
        <ScrollControls pages={PAGES} damping={0.25}>
          <ScrollBridge />
          <CameraRig />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
          <Scroll html style={{ width: '100%' }}>
            <DomSections />
          </Scroll>
        </ScrollControls>

        <City />
        <HackerScene />
        <Stars radius={160} depth={60} count={2500} factor={3} saturation={0.3} fade speed={0.4} />
        <Sparkles count={120} scale={[60, 40, 120]} position={[0, -20, -60]} size={2} speed={0.25} color="#ffc857" />
        <Effects />
      </Suspense>
    </Canvas>
  )
}
