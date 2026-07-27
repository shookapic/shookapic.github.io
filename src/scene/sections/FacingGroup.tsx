import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { waypoints } from '../waypoints.ts'

// Places children at a section's world position, rotated to face its camera
// waypoint. Content only mounts while the camera is near this section so
// far-away Html panels don't clutter the view.
export default function FacingGroup({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!)
  const scroll = useScroll()
  const [near, setNear] = useState(index === 0)

  useLayoutEffect(() => {
    ref.current.lookAt(waypoints[index].cam)
  }, [index])

  useFrame(() => {
    const t = scroll.offset * (waypoints.length - 1)
    const isNear = Math.abs(t - index) < 0.85
    if (isNear !== near) setNear(isNear)
  })

  return (
    <group ref={ref} position={waypoints[index].target} visible={near}>
      {near && children}
    </group>
  )
}
