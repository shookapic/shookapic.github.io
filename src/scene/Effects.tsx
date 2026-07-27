import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.55} luminanceThreshold={0.9} luminanceSmoothing={0.25} mipmapBlur />
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  )
}
