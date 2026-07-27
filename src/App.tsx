import { useMemo } from 'react'
import Experience from './scene/Experience.tsx'
import Overlay from './ui/Overlay.tsx'
import LoadingScreen from './ui/LoadingScreen.tsx'
import FallbackSite from './ui/FallbackSite.tsx'

function canUse3D(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function App() {
  const enable3D = useMemo(canUse3D, [])

  if (!enable3D) return <FallbackSite />

  return (
    <>
      <Experience />
      <Overlay />
      <LoadingScreen />
    </>
  )
}
