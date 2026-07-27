import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const GROUND_Y = -46
const ROOF_Y = -3 // rooftop surface height, just below the hero title

const GLYPHS = '01{}<>/$#@;=+*&%!?abcdefx'

// Laptop screen: a canvas texture that keeps "typing" scrolling code.
function useCodeTexture() {
  const { texture, ctx, canvas } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 160
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#020604'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return { texture, ctx, canvas }
  }, [])
  const line = useRef(0)
  const acc = useRef(0)

  useFrame((_, delta) => {
    acc.current += delta
    if (acc.current < 0.09) return
    acc.current = 0
    const lh = 10
    const maxLines = Math.floor(canvas.height / lh)
    if (line.current >= maxLines) {
      // scroll up one line
      ctx.drawImage(canvas, 0, -lh)
      ctx.fillStyle = '#020604'
      ctx.fillRect(0, canvas.height - lh, canvas.width, lh)
      line.current = maxLines - 1
    }
    const y = 10 + line.current * lh
    ctx.fillStyle = '#020604'
    ctx.fillRect(0, y - 8, canvas.width, lh)
    ctx.font = '8px monospace'
    const indent = 8 + Math.floor(Math.random() * 4) * 12
    let x = indent
    const n = 4 + Math.floor(Math.random() * 18)
    for (let i = 0; i < n; i++) {
      const word = Array.from(
        { length: 2 + Math.floor(Math.random() * 6) },
        () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      ).join('')
      ctx.fillStyle = Math.random() < 0.15 ? '#ffc857' : Math.random() < 0.3 ? '#7de8ff' : '#39ff88'
      ctx.fillText(word, x, y)
      x += ctx.measureText(word).width + 5
      if (x > canvas.width - 20) break
    }
    line.current += 1
    texture.needsUpdate = true
  })

  return texture
}

function Laptop({ position }: { position: [number, number, number] }) {
  const screenTex = useCodeTexture()
  const glow = useRef<THREE.PointLight>(null!)
  useFrame((state) => {
    // screen light flickers like real display refresh
    glow.current.intensity = 4.2 + Math.sin(state.clock.elapsedTime * 17) * 0.5 + Math.random() * 0.6
  })
  return (
    <group position={position} rotation={[0, -0.5, 0]}>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.62, 0.03, 0.42]} />
        <meshStandardMaterial color="#1a1d2b" roughness={0.6} metalness={0.4} />
      </mesh>
      <group position={[0, 0.03, -0.21]} rotation={[-1.15, 0, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.62, 0.4, 0.02]} />
          <meshStandardMaterial color="#1a1d2b" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.2, 0.012]}>
          <planeGeometry args={[0.56, 0.34]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
      </group>
      <pointLight ref={glow} position={[0, 0.45, 0.35]} color="#5cff9d" distance={4.5} intensity={4.5} />
    </group>
  )
}

// Timeline the hacker follows on a loop: types for a while, gets up, walks to
// the parapet to look out over the city, then walks back and sits again.
// Each keyframe: [time, offsetX, offsetZ, rotY, pose]
type Pose = 'sit' | 'stand'
const KEYFRAMES: [number, number, number, number, Pose][] = [
  [0, 0, 0, 0.35, 'sit'],
  [9, 0, 0, 0.35, 'sit'],
  [11.2, 2.3, 1.85, -2.4, 'stand'],
  [15.5, 2.3, 1.85, -2.4, 'stand'],
  [17.7, 0, 0, 0.35, 'stand'],
  [19, 0, 0, 0.35, 'sit'],
  [24, 0, 0, 0.35, 'sit'],
]
const CYCLE = KEYFRAMES[KEYFRAMES.length - 1][0]

function sampleTimeline(t: number) {
  const time = t % CYCLE
  let i = 0
  while (i < KEYFRAMES.length - 2 && time > KEYFRAMES[i + 1][0]) i++
  const [t0, x0, z0, r0, poseA] = KEYFRAMES[i]
  const [t1, x1, z1, r1, poseB] = KEYFRAMES[i + 1]
  const span = Math.max(t1 - t0, 0.0001)
  const raw = THREE.MathUtils.clamp((time - t0) / span, 0, 1)
  const f = raw * raw * (3 - 2 * raw)
  const moving = poseA !== poseB || x0 !== x1 || z0 !== z1
  return {
    x: THREE.MathUtils.lerp(x0, x1, f),
    z: THREE.MathUtils.lerp(z0, z1, f),
    rotY: THREE.MathUtils.lerp(r0, r1, f),
    pose: f < 0.5 ? poseA : poseB,
    moving,
  }
}

function HackerFigure({ basePosition }: { basePosition: [number, number, number] }) {
  const root = useRef<THREE.Group>(null!)
  const head = useRef<THREE.Group>(null!)
  const sitParts = useRef<THREE.Group>(null!)
  const standParts = useRef<THREE.Group>(null!)
  const legL = useRef<THREE.Group>(null!)
  const legR = useRef<THREE.Group>(null!)
  const armL = useRef<THREE.Group>(null!)
  const armR = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const s = sampleTimeline(state.clock.elapsedTime)
    root.current.position.set(basePosition[0] + s.x, basePosition[1], basePosition[2] + s.z)
    root.current.rotation.y = s.rotY

    const sitting = s.pose === 'sit'
    sitParts.current.visible = sitting
    standParts.current.visible = !sitting

    if (sitting) {
      head.current.rotation.x = 0.28 + Math.sin(state.clock.elapsedTime * 2.1) * 0.03
    } else {
      // idle glance while standing, walk-cycle swing while moving
      head.current.rotation.x = 0
      head.current.rotation.y = s.moving ? 0 : Math.sin(state.clock.elapsedTime * 0.8) * 0.25
      const swing = s.moving ? Math.sin(state.clock.elapsedTime * 9) * 0.55 : 0
      legL.current.rotation.x = swing
      legR.current.rotation.x = -swing
      armL.current.rotation.x = -swing * 0.7
      armR.current.rotation.x = swing * 0.7
    }
  })

  const cloth = <meshStandardMaterial color="#0e1018" roughness={0.95} />

  return (
    <group ref={root} position={basePosition}>
      {/* hood + head, shared by both poses */}
      <group ref={head} position={[0, 0.86, 0.08]}>
        <mesh scale={[1, 1.1, 1.15]}>
          <sphereGeometry args={[0.17, 24, 16]} />
          {cloth}
        </mesh>
        <mesh position={[0, -0.01, 0.13]} scale={[0.8, 0.9, 0.5]}>
          <sphereGeometry args={[0.12, 16, 12]} />
          <meshStandardMaterial color="#233b33" roughness={0.4} emissive="#39ff88" emissiveIntensity={0.25} />
        </mesh>
      </group>

      {/* seated pose: crossed legs, hunched torso, arms reaching the keyboard */}
      <group ref={sitParts}>
        <mesh position={[0, 0.12, 0]} scale={[1, 0.55, 0.8]}>
          <sphereGeometry args={[0.34, 24, 16]} />
          {cloth}
        </mesh>
        <mesh position={[0, 0.5, -0.02]} rotation={[0.35, 0, 0]} scale={[1, 1.25, 0.75]}>
          <sphereGeometry args={[0.26, 24, 16]} />
          {cloth}
        </mesh>
        <mesh position={[-0.2, 0.42, 0.24]} rotation={[0.9, 0.15, 0.35]}>
          <capsuleGeometry args={[0.06, 0.34, 6, 12]} />
          {cloth}
        </mesh>
        <mesh position={[0.2, 0.42, 0.24]} rotation={[0.9, -0.15, -0.35]}>
          <capsuleGeometry args={[0.06, 0.34, 6, 12]} />
          {cloth}
        </mesh>
      </group>

      {/* standing pose: upright torso, walking legs and swinging arms */}
      <group ref={standParts}>
        <mesh position={[0, 0.62, 0]} scale={[0.85, 1.05, 0.7]}>
          <sphereGeometry args={[0.26, 24, 16]} />
          {cloth}
        </mesh>
        <group ref={legL} position={[-0.1, 0.3, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.075, 0.3, 6, 10]} />
            {cloth}
          </mesh>
        </group>
        <group ref={legR} position={[0.1, 0.3, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.075, 0.3, 6, 10]} />
            {cloth}
          </mesh>
        </group>
        <group ref={armL} position={[-0.24, 0.62, 0]}>
          <mesh position={[0, -0.18, 0]}>
            <capsuleGeometry args={[0.055, 0.32, 6, 10]} />
            {cloth}
          </mesh>
        </group>
        <group ref={armR} position={[0.24, 0.62, 0]}>
          <mesh position={[0, -0.18, 0]}>
            <capsuleGeometry args={[0.055, 0.32, 6, 10]} />
            {cloth}
          </mesh>
        </group>
      </group>
    </group>
  )
}

// The hero tower: hacker hacking on its rooftop, city sprawling below.
export default function HackerScene() {
  return (
    <group>
      {/* tower body from street to roof */}
      <mesh position={[0, (GROUND_Y + ROOF_Y) / 2, -0.5]}>
        <boxGeometry args={[9, ROOF_Y - GROUND_Y, 7]} />
        <meshStandardMaterial color="#0b0e1c" roughness={0.9} />
      </mesh>
      {/* roof slab + parapet */}
      <mesh position={[0, ROOF_Y + 0.1, -0.5]}>
        <boxGeometry args={[9.4, 0.2, 7.4]} />
        <meshStandardMaterial color="#12152a" roughness={0.85} />
      </mesh>
      {[
        [0, -3.85, [9.4, 0.3, 0.25]],
        [0, 2.85, [9.4, 0.3, 0.25]],
        [-4.6, -0.5, [0.25, 0.3, 6.9]],
        [4.6, -0.5, [0.25, 0.3, 6.9]],
      ].map(([x, z, s], i) => (
        <mesh key={i} position={[x as number, ROOF_Y + 0.3, z as number]}>
          <boxGeometry args={s as [number, number, number]} />
          <meshStandardMaterial color="#171b33" roughness={0.85} />
        </mesh>
      ))}
      {/* AC unit + red aviation beacon */}
      <mesh position={[-2.6, ROOF_Y + 0.55, -2.2]}>
        <boxGeometry args={[1.4, 0.7, 0.9]} />
        <meshStandardMaterial color="#1a1e36" roughness={0.8} metalness={0.3} />
      </mesh>
      <Beacon position={[-4.3, ROOF_Y + 0.75, 2.5]} />

      <HackerFigure basePosition={[0.35, ROOF_Y + 0.2, 0.75]} />
      <Laptop position={[0.28, ROOF_Y + 0.2, 1.55]} />
    </group>
  )
}

function Beacon({ position }: { position: [number, number, number] }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null!)
  useFrame((state) => {
    const on = (Math.sin(state.clock.elapsedTime * 2.5) + 1) / 2
    mat.current.emissiveIntensity = 0.2 + on * 3
  })
  return (
    <group position={position}>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        <meshStandardMaterial color="#171b33" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 12, 8]} />
        <meshStandardMaterial ref={mat} color="#3a0a0a" emissive="#ff2d2d" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}
