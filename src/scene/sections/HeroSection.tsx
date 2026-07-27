import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial } from '@react-three/drei'
import FacingGroup from './FacingGroup.tsx'
import { profile } from '../../data/content.ts'

const FONT = '/fonts/BebasNeue-Regular.ttf'

function MoltenCore() {
  const mat = useRef<any>(null)
  useFrame((state) => {
    if (mat.current) {
      mat.current.emissiveIntensity = 1.6 + Math.sin(state.clock.elapsedTime * 1.3) * 0.35
    }
  })
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh position={[0, 0.2, -4]} scale={2.6}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          ref={mat}
          color="#2a1207"
          emissive="#ff6b35"
          emissiveIntensity={1.6}
          roughness={0.3}
          metalness={0.1}
          distort={0.45}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

export default function HeroSection() {
  return (
    <FacingGroup index={0}>
      <MoltenCore />
      <Text
        font={FONT}
        fontSize={1.5}
        letterSpacing={0.06}
        position={[0, 0.4, 0]}
        color="#f2efe9"
        anchorX="center"
        anchorY="middle"
      >
        {profile.name}
      </Text>
      <Text
        font={FONT}
        fontSize={0.42}
        letterSpacing={0.35}
        position={[0, -0.75, 0]}
        color="#ffc857"
        anchorX="center"
        anchorY="middle"
      >
        {profile.title.toUpperCase()}
      </Text>
      <Text
        font={FONT}
        fontSize={0.2}
        letterSpacing={0.2}
        position={[0, -1.5, 0]}
        color="#8a86a3"
        anchorX="center"
        anchorY="middle"
      >
        SAINT-ANDRÉ · RÉUNION ISLAND
      </Text>
    </FacingGroup>
  )
}
