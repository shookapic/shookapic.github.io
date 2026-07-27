import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const [gone, setGone] = useState(false)

  // `active` only flips on while tracked assets load; when nothing is
  // pending anymore (or nothing was tracked at all), fade out.
  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => setGone(true), 900)
      return () => clearTimeout(t)
    }
  }, [active])

  if (gone) return null

  return (
    <div className={`loading ${!active ? 'loading-done' : ''}`}>
      <div className="loading-core" />
      <p>{Math.round(progress)}%</p>
    </div>
  )
}
