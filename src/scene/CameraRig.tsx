import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { waypoints } from './waypoints.ts'
import { announceSection } from './scrollBus.ts'

const smoothstep = (x: number) => x * x * (3 - 2 * x)

export default function CameraRig() {
  const scroll = useScroll()
  const lookAt = useRef(waypoints[0].target.clone())
  const desiredPos = useRef(new THREE.Vector3())
  const desiredLook = useRef(new THREE.Vector3())
  const lastSection = useRef(-1)

  useFrame((state, delta) => {
    const n = waypoints.length
    const t = scroll.offset * (n - 1)
    const i = Math.min(Math.floor(t), n - 2)
    const local = smoothstep(THREE.MathUtils.clamp(t - i, 0, 1))

    desiredPos.current.lerpVectors(waypoints[i].cam, waypoints[i + 1].cam, local)
    desiredLook.current.lerpVectors(waypoints[i].target, waypoints[i + 1].target, local)

    // Gentle parallax from the pointer so the scene feels alive even when idle.
    desiredPos.current.x += state.pointer.x * 0.4
    desiredPos.current.y += state.pointer.y * 0.25

    const k = 1 - Math.pow(0.0001, delta)
    state.camera.position.lerp(desiredPos.current, k)
    lookAt.current.lerp(desiredLook.current, k)
    state.camera.lookAt(lookAt.current)

    const section = Math.round(t)
    if (section !== lastSection.current) {
      lastSection.current = section
      announceSection(section)
    }
  })

  return null
}
