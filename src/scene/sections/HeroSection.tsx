import { Text } from '@react-three/drei'
import FacingGroup from './FacingGroup.tsx'
import { profile } from '../../data/content.ts'

const FONT = '/fonts/BebasNeue-Regular.ttf'

export default function HeroSection() {
  return (
    <FacingGroup index={0}>
      <Text
        font={FONT}
        fontSize={1.5}
        letterSpacing={0.06}
        position={[0, 1.2, 0]}
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
        position={[0, 0.1, 0]}
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
        position={[0, -0.6, 0]}
        color="#8a86a3"
        anchorX="center"
        anchorY="middle"
      >
        SAINT-ANDRÉ · RÉUNION ISLAND
      </Text>
    </FacingGroup>
  )
}
