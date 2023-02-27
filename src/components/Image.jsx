import { useLoader } from "@react-three/fiber"
import * as THREE from 'three';

export function Image({url}) {
  const texture = useLoader(THREE.TextureLoader, url)
  return (
    <mesh
      position={[-1.5, 2.9, 2.3]}
      rotation={[Math.PI / 7, -10.3, -0.2]}
      // position={[-0.01, 2.56, 0.28]}
      
          
      // rotation={[]}
    >
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  )
}