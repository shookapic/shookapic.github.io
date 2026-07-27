import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import FacingGroup from './FacingGroup.tsx'
import { skills } from '../../data/content.ts'

const FONT = '/fonts/BebasNeue-Regular.ttf'

// Distribute skills on a fibonacci sphere so none overlap.
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius])
  }
  return pts
}

function SkillCloud() {
  const group = useRef<THREE.Group>(null!)
  const positions = fibonacciSphere(skills.length, 3.2)
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.12
  })
  return (
    <group ref={group}>
      {skills.map((skill, i) => (
        <Billboard key={skill} position={positions[i]}>
          <Text
            font={FONT}
            fontSize={0.38}
            letterSpacing={0.08}
            color={i % 3 === 0 ? '#ffc857' : '#e8e6f0'}
          >
            {skill.toUpperCase()}
          </Text>
        </Billboard>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#1a0f2e"
          emissive="#ff6b35"
          emissiveIntensity={0.9}
          wireframe
        />
      </mesh>
    </group>
  )
}

export default function SkillsSection() {
  return (
    <FacingGroup index={3}>
      <Text font={FONT} fontSize={0.9} letterSpacing={0.1} position={[0, 4.4, 0]} color="#f2efe9">
        SKILLS
      </Text>
      <SkillCloud />
    </FacingGroup>
  )
}
