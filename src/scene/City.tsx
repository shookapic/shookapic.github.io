import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { waypoints } from './waypoints.ts'

const GROUND_Y = -46
const CITY = { minX: -150, maxX: 150, minZ: -230, maxZ: 50 }

// Canvas-generated window grid, so buildings glow without any assets.
function makeWindowTexture(litChance: number, coolRatio: number): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#04050c'
  ctx.fillRect(0, 0, 64, 128)
  for (let y = 4; y < 128; y += 8) {
    for (let x = 4; x < 64; x += 8) {
      if (Math.random() < litChance) {
        ctx.fillStyle =
          Math.random() < coolRatio
            ? 'rgba(125, 232, 255, 0.9)' // cool office glow
            : 'rgba(255, 200, 87, 0.9)' // warm sodium glow
        ctx.fillRect(x, y, 4, 5)
      }
    }
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

type BuildingSpec = { x: number; z: number; w: number; d: number; h: number }

function generateBuildings(): BuildingSpec[] {
  const rng = (a: number, b: number) => a + Math.random() * (b - a)
  const specs: BuildingSpec[] = []
  const block = 14
  for (let x = CITY.minX; x <= CITY.maxX; x += block) {
    for (let z = CITY.minZ; z <= CITY.maxZ; z += block) {
      if (Math.random() < 0.18) continue // empty lots keep the grid loose
      const bx = x + rng(-2, 2)
      const bz = z + rng(-2, 2)
      // Taller towers cluster "downtown", far ahead on the flight path.
      const downtown = Math.max(0, 1 - Math.abs(bz + 150) / 120)
      let h = rng(6, 14) + downtown * rng(6, 22)
      // Keep a clear corridor under each camera waypoint / section anchor.
      for (const wp of waypoints) {
        const d = Math.hypot(bx - wp.target.x, bz - wp.target.z)
        if (d < 20) h = Math.min(h, wp.target.y - 6 - GROUND_Y)
        const dc = Math.hypot(bx - wp.cam.x, bz - wp.cam.z)
        if (dc < 20) h = Math.min(h, wp.cam.y - 6 - GROUND_Y)
      }
      if (h < 4) continue
      specs.push({ x: bx, z: bz, w: rng(6, 10), d: rng(6, 10), h })
    }
  }
  return specs
}

function Buildings() {
  const { groups, textures } = useMemo(() => {
    const specs = generateBuildings()
    const textures = [
      makeWindowTexture(0.32, 0.55),
      makeWindowTexture(0.22, 0.25),
      makeWindowTexture(0.42, 0.75),
    ]
    const groups: BuildingSpec[][] = [[], [], []]
    specs.forEach((s, i) => groups[i % 3].push(s))
    return { groups, textures }
  }, [])

  return (
    <group>
      {groups.map((specs, gi) => (
        <Instanced key={gi} specs={specs} texture={textures[gi]} />
      ))}
    </group>
  )
}

function Instanced({ specs, texture }: { specs: BuildingSpec[]; texture: THREE.CanvasTexture }) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    specs.forEach((s, i) => {
      m.compose(
        new THREE.Vector3(s.x, GROUND_Y + s.h / 2, s.z),
        new THREE.Quaternion(),
        new THREE.Vector3(s.w, s.h, s.d),
      )
      ref.current.setMatrixAt(i, m)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [specs])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, specs.length]}>
      <boxGeometry />
      <meshStandardMaterial
        color="#0b0e1c"
        roughness={0.9}
        emissive="#ffffff"
        emissiveMap={texture}
        emissiveIntensity={1.15}
      />
    </instancedMesh>
  )
}

// Car light streams: white headlights one way, red taillights the other.
function Traffic({ color, dir, lanes }: { color: string; dir: 1 | -1; lanes: number[] }) {
  const ref = useRef<THREE.Points>(null!)
  const COUNT = 130
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = CITY.minX + Math.random() * (CITY.maxX - CITY.minX)
      positions[i * 3 + 1] = GROUND_Y + 0.4
      positions[i * 3 + 2] = lanes[Math.floor(Math.random() * lanes.length)] + dir * 1.2
      speeds[i] = (8 + Math.random() * 14) * dir
    }
    return { positions, speeds }
  }, [dir, lanes])

  useFrame((_, delta) => {
    const pos = ref.current.geometry.attributes.position
    for (let i = 0; i < COUNT; i++) {
      let x = pos.getX(i) + speeds[i] * delta
      if (x > CITY.maxX) x = CITY.minX
      if (x < CITY.minX) x = CITY.maxX
      pos.setX(i, x)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.9} sizeAttenuation toneMapped={false} transparent opacity={0.9} />
    </points>
  )
}

const LANES = [30, 2, -26, -54, -82, -110, -138, -166, -194]

export default function City() {
  return (
    <group>
      {/* streets glow faintly under the fog */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y, -90]}>
        <planeGeometry args={[420, 340]} />
        <meshStandardMaterial color="#05060f" roughness={1} metalness={0} />
      </mesh>
      <Buildings />
      <Traffic color="#f5f8ff" dir={1} lanes={LANES} />
      <Traffic color="#ff5a3c" dir={-1} lanes={LANES} />
      {/* hazy moon over the skyline */}
      <mesh position={[-70, 26, -190]}>
        <circleGeometry args={[9, 48]} />
        <meshBasicMaterial color="#cdd8f5" toneMapped={false} />
      </mesh>
      <pointLight position={[-70, 26, -170]} intensity={30} distance={140} color="#8fb3ff" />
    </group>
  )
}
