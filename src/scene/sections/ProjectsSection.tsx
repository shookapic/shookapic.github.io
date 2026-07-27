import { Text } from '@react-three/drei'
import FacingGroup from './FacingGroup.tsx'

const FONT = '/fonts/BebasNeue-Regular.ttf'

export default function ProjectsSection() {
  return (
    <FacingGroup index={2}>
      <Text font={FONT} fontSize={0.9} letterSpacing={0.1} position={[0, 3.1, 0]} color="#f2efe9">
        PROJECTS
      </Text>
    </FacingGroup>
  )
}
