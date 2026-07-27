import { Text } from '@react-three/drei'
import FacingGroup from './FacingGroup.tsx'

const FONT = '/fonts/BebasNeue-Regular.ttf'

export default function AboutSection() {
  return (
    <FacingGroup index={1}>
      <Text font={FONT} fontSize={0.9} letterSpacing={0.1} position={[0, 2.6, 0]} color="#f2efe9">
        ABOUT
      </Text>
    </FacingGroup>
  )
}
