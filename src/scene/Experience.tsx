import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Stars, Sparkles } from '@react-three/drei'
import DomSections from '../ui/DomSections.tsx'
import CameraRig from './CameraRig.tsx'
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
      <color attach="background" args={['#0b0a1a']} />
      <fog attach="fog" args={['#0b0a1a', 30, 90]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 12, 6]} intensity={1.1} color="#ffe6d0" />
      <pointLight position={[0, 0, 2]} intensity={12} color="#ff6b35" distance={20} />

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

        <Stars radius={120} depth={60} count={4000} factor={4} saturation={0.4} fade speed={0.6} />
        <Sparkles count={160} scale={[40, 60, 90]} position={[0, -13, -35]} size={2.5} speed={0.3} color="#ffc857" />
        <Effects />
      </Suspense>
    </Canvas>
  )
}
