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

// Detailed moon: crater canvas texture + soft additive glow halo behind it.
function makeMoonTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d')!
  const grad = ctx.createRadialGradient(96, 90, 10, 128, 128, 150)
  grad.addColorStop(0, '#f4f2ec')
  grad.addColorStop(0.55, '#d9d7ce')
  grad.addColorStop(1, '#aeacab')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)
  const craterRng = () => 20 + Math.random() * 216
  for (let i = 0; i < 34; i++) {
    const x = craterRng()
    const y = craterRng()
    const r = 4 + Math.random() * 16
    const shade = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
    shade.addColorStop(0, 'rgba(120,116,108,0.55)')
    shade.addColorStop(0.7, 'rgba(150,146,138,0.25)')
    shade.addColorStop(1, 'rgba(150,146,138,0)')
    ctx.fillStyle = shade
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d')!
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  grad.addColorStop(0, 'rgba(180,200,255,0.55)')
  grad.addColorStop(0.4, 'rgba(140,170,255,0.22)')
  grad.addColorStop(1, 'rgba(140,170,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

const MOON_POS = new THREE.Vector3(-70, 34, -195)

function Moon() {
  const moonTex = useMemo(makeMoonTexture, [])
  const glowTex = useMemo(makeGlowTexture, [])
  return (
    <group position={MOON_POS}>
      <mesh renderOrder={-2}>
        <planeGeometry args={[70, 70]} />
        <meshBasicMaterial
          map={glowTex}
          transparent
          depthWrite={false}
          toneMapped={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh renderOrder={-1}>
        <sphereGeometry args={[10, 48, 48]} />
        <meshStandardMaterial
          map={moonTex}
          emissive="#dfe3f2"
          emissiveMap={moonTex}
          emissiveIntensity={0.75}
          roughness={1}
          fog={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight intensity={22} distance={160} color="#9fb8ff" />
    </group>
  )
}

// A few glowing rooftop billboards — canvas text, neon colors.
function makeSignTexture(text: string, color: string): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 96
  const ctx = c.getContext('2d')!
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.fillRect(0, 0, 256, 96)
  ctx.font = 'bold 46px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = color
  ctx.shadowBlur = 22
  ctx.fillStyle = color
  ctx.fillText(text, 128, 50)
  ctx.fillText(text, 128, 50)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const SIGN_SPECS: { x: number; y: number; z: number; text: string; color: string; w: number }[] = [
  { x: -22, y: -20, z: -55, text: 'RAMEN', color: '#ff3ea5', w: 6 },
  { x: 24, y: -14, z: -80, text: 'ネオン', color: '#39e8ff', w: 5 },
  { x: -34, y: -8, z: -110, text: 'OPEN 24H', color: '#ffc857', w: 7 },
  { x: 30, y: -22, z: -140, text: 'CLUB VOID', color: '#c65bff', w: 7 },
]

function NeonSigns() {
  const textures = useMemo(() => SIGN_SPECS.map((s) => makeSignTexture(s.text, s.color)), [])
  return (
    <group>
      {SIGN_SPECS.map((s, i) => (
        <mesh key={s.text} position={[s.x, s.y, s.z]} rotation={[0, Math.random() * 0.6 - 0.3, 0]}>
          <planeGeometry args={[s.w, (s.w * 96) / 256]} />
          <meshBasicMaterial
            map={textures[i]}
            transparent
            toneMapped={false}
            color={s.color}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
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
      <RoofDetails groups={groups} />
    </group>
  )
}

// Water tanks + antennas scattered on ~1 in 5 rooftops for skyline silhouette detail.
function RoofDetails({ groups }: { groups: BuildingSpec[][] }) {
  const specs = useMemo(() => groups.flat().filter((_, i) => i % 5 === 0), [groups])
  return (
    <group>
      {specs.map((s, i) =>
        i % 2 === 0 ? (
          <mesh key={i} position={[s.x, GROUND_Y + s.h + 0.8, s.z]}>
            <cylinderGeometry args={[0.6, 0.7, 1.4, 10]} />
            <meshStandardMaterial color="#1c1f30" roughness={0.8} metalness={0.3} />
          </mesh>
        ) : (
          <mesh key={i} position={[s.x, GROUND_Y + s.h + 1.6, s.z]}>
            <cylinderGeometry args={[0.03, 0.03, 3.2, 6]} />
            <meshStandardMaterial color="#2a2d3d" roughness={0.6} metalness={0.5} />
          </mesh>
        ),
      )}
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

const LANES = [30, 2, -26, -54, -82, -110, -138, -166, -194]
const CAR_COLORS = ['#d8dae2', '#b9401f', '#242733', '#8a8f9e', '#c9a227']

// Real car-shaped traffic: body + cabin + head/tail lights, instanced per lane direction.
// `altitude` lets the same rig serve street-level traffic or Blade-Runner-style
// sky lanes that cross right through the camera's flight corridor.
function CarStream({
  dir,
  lanes,
  count,
  altitude = GROUND_Y + 0.35,
  scale = 1,
}: {
  dir: 1 | -1
  lanes: number[]
  count: number
  altitude?: number
  scale?: number
}) {
  const body = useRef<THREE.InstancedMesh>(null!)
  const cabin = useRef<THREE.InstancedMesh>(null!)
  const frontLight = useRef<THREE.InstancedMesh>(null!)
  const rearLight = useRef<THREE.InstancedMesh>(null!)

  const { xs, zs, speeds, colorIdx } = useMemo(() => {
    const xs = new Float32Array(count)
    const zs = new Float32Array(count)
    const speeds = new Float32Array(count)
    const colorIdx = new Uint8Array(count)
    for (let i = 0; i < count; i++) {
      xs[i] = CITY.minX + Math.random() * (CITY.maxX - CITY.minX)
      zs[i] = lanes[Math.floor(Math.random() * lanes.length)] + dir * 1.1
      speeds[i] = (7 + Math.random() * 9) * dir
      colorIdx[i] = Math.floor(Math.random() * CAR_COLORS.length)
    }
    return { xs, zs, speeds, colorIdx }
  }, [dir, lanes, count])

  useLayoutEffect(() => {
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) body.current.setColorAt(i, c.set(CAR_COLORS[colorIdx[i]]))
    if (body.current.instanceColor) body.current.instanceColor.needsUpdate = true
  }, [colorIdx, count])

  const rotY = dir === 1 ? 0 : Math.PI
  const yaw = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotY, 0)), [rotY])
  const scale1 = useMemo(() => new THREE.Vector3(scale, scale, scale), [scale])

  useFrame((_, delta) => {
    const m = new THREE.Matrix4()
    for (let i = 0; i < count; i++) {
      xs[i] += speeds[i] * delta
      if (xs[i] > CITY.maxX) xs[i] = CITY.minX
      if (xs[i] < CITY.minX) xs[i] = CITY.maxX
      const y = altitude
      m.compose(new THREE.Vector3(xs[i], y, zs[i]), yaw, scale1)
      body.current.setMatrixAt(i, m)
      m.compose(new THREE.Vector3(xs[i], y + 0.32, zs[i]), yaw, scale1)
      cabin.current.setMatrixAt(i, m)
      m.compose(new THREE.Vector3(xs[i] + dir * 0.85, y, zs[i]), yaw, scale1)
      frontLight.current.setMatrixAt(i, m)
      m.compose(new THREE.Vector3(xs[i] - dir * 0.85, y, zs[i]), yaw, scale1)
      rearLight.current.setMatrixAt(i, m)
    }
    body.current.instanceMatrix.needsUpdate = true
    cabin.current.instanceMatrix.needsUpdate = true
    frontLight.current.instanceMatrix.needsUpdate = true
    rearLight.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <instancedMesh ref={body} args={[undefined, undefined, count]}>
        <boxGeometry args={[1.7, 0.5, 0.85]} />
        <meshStandardMaterial roughness={0.5} metalness={0.4} />
      </instancedMesh>
      <instancedMesh ref={cabin} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.85, 0.32, 0.72]} />
        <meshStandardMaterial color="#0a0b12" roughness={0.3} metalness={0.6} />
      </instancedMesh>
      <instancedMesh ref={frontLight} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.08, 0.1, 0.78]} />
        <meshStandardMaterial
          color="#fff7e0"
          emissive="#fff7e0"
          emissiveIntensity={dir === 1 ? 3 : 0.15}
          toneMapped={false}
        />
      </instancedMesh>
      <instancedMesh ref={rearLight} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.08, 0.1, 0.78]} />
        <meshStandardMaterial
          color="#ff2d2d"
          emissive="#ff2d2d"
          emissiveIntensity={dir === -1 ? 3 : 0.15}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  )
}

// Sidewalk pedestrians: simple capsule figures pacing short stretches near street level.
function Pedestrians({ count = 26 }: { count?: number }) {
  const bodies = useRef<THREE.InstancedMesh>(null!)
  const heads = useRef<THREE.InstancedMesh>(null!)

  const specs = useMemo(() => {
    return Array.from({ length: count }, () => {
      const lane = LANES[Math.floor(Math.random() * LANES.length)]
      const side = Math.random() < 0.5 ? 1 : -1
      const centerX = -100 + Math.random() * 200
      return {
        z: lane + side * 5.2,
        centerX,
        range: 4 + Math.random() * 5,
        speed: 0.5 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        bobPhase: Math.random() * Math.PI * 2,
      }
    })
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    for (let i = 0; i < count; i++) {
      const s = specs[i]
      const sway = Math.sin(t * s.speed + s.phase)
      const x = s.centerX + sway * s.range
      const facing = Math.cos(t * s.speed + s.phase) < 0 ? Math.PI : 0
      q.setFromEuler(new THREE.Euler(0, facing, 0))
      const bob = Math.abs(Math.sin(t * 6 + s.bobPhase)) * 0.04
      m.compose(new THREE.Vector3(x, GROUND_Y + 0.42 + bob, s.z), q, new THREE.Vector3(1, 1, 1))
      bodies.current.setMatrixAt(i, m)
      m.compose(new THREE.Vector3(x, GROUND_Y + 0.78 + bob, s.z), q, new THREE.Vector3(1, 1, 1))
      heads.current.setMatrixAt(i, m)
    }
    bodies.current.instanceMatrix.needsUpdate = true
    heads.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <instancedMesh ref={bodies} args={[undefined, undefined, count]}>
        <capsuleGeometry args={[0.12, 0.4, 4, 8]} />
        <meshStandardMaterial color="#1c1e2a" roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={heads} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.11, 10, 8]} />
        <meshStandardMaterial color="#2a2c3a" roughness={0.8} />
      </instancedMesh>
    </group>
  )
}

// Streetlights along the two avenues nearest the flight path.
function Streetlights() {
  const positions = useMemo(() => {
    const pts: [number, number][] = []
    for (const z of [LANES[0] + 4.5, LANES[2] - 4.5]) {
      for (let x = CITY.minX; x <= CITY.maxX; x += 16) pts.push([x, z])
    }
    return pts
  }, [])
  return (
    <group>
      {positions.map(([x, z], i) => (
        <group key={i} position={[x, GROUND_Y, z]}>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 3.2, 6]} />
            <meshStandardMaterial color="#0d0f1a" roughness={0.7} metalness={0.4} />
          </mesh>
          <mesh position={[0, 3.2, 0]}>
            <sphereGeometry args={[0.14, 10, 8]} />
            <meshStandardMaterial color="#ffdca0" emissive="#ffc857" emissiveIntensity={2.2} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function City() {
  return (
    <group>
      {/* streets glow faintly under the fog */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y, -90]}>
        <planeGeometry args={[420, 340]} />
        <meshStandardMaterial color="#05060f" roughness={1} metalness={0} />
      </mesh>
      <Buildings />
      <Streetlights />
      <NeonSigns />
      <Pedestrians />
      <CarStream dir={1} lanes={LANES} count={40} />
      <CarStream dir={-1} lanes={LANES} count={40} />
      {/* elevated sky lanes cross right through the flight path so traffic reads while flying, not just from the rooftop */}
      <CarStream dir={1} lanes={[-10, -50, -90, -130, -170]} count={22} altitude={-14} scale={1.3} />
      <CarStream dir={-1} lanes={[-10, -50, -90, -130, -170]} count={22} altitude={-14} scale={1.3} />
      <CarStream dir={1} lanes={[10, -70, -150]} count={16} altitude={-24} scale={1.15} />
      <CarStream dir={-1} lanes={[10, -70, -150]} count={16} altitude={-24} scale={1.15} />
      <Moon />
    </group>
  )
}
