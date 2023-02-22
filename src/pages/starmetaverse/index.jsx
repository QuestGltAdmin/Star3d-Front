import React, { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useScroll, ScrollControls, Environment, Merged, Text, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, OrthographicCamera, Bounds } from '@react-three/drei'
import StarLoader from '../../components/StarLoader'
import StarDome from '../../components/models/StarDome'
import StarGallery from '../../components/models/StarGallery'
import StarJewellery from '../../components/models/StarJewellery'
import StarOffice from '../../components/models/StarOffice'


function Metaverse() {
  const ref = useRef();
  const scroll = useScroll();
  const [cabin, seat] = useGLTF(['/cabin-transformed.glb', '/seat-transformed.glb'])
  const meshes = useMemo(() => ({ Cabin: cabin.nodes.cabin_1, Seat: seat.nodes.seat }), [cabin, seat])
  useFrame(() => (ref.current.position.y = scroll.offset * 40))
  // Merged creates THREE.InstancedMeshes out of the meshes you feed it
  // All in all we end up with just 5 draw-calls for the entire scene
  return (
    
      <group ref={ref}>
      <Bounds>
        <StarDome position={[0,0,0]} />
        <OrbitControls
      // enabled={false}
      // enableZoom={false}
        minDistance={5}
        maxDistance={20}
        // autoRotate={true}
        enableRotate={true}
        minPolarAngle={Math.PI - Math.PI / 1.6}
        maxPolarAngle={Math.PI - Math.PI / 1.6}
       />
      </Bounds>
        <StarGallery position={[0,-10,0]} />
        <StarJewellery position={[0,-20,0]} />
        <StarOffice position={[0,-30,0]} />
      </group>
    )
    
  
}

function Train() {
  const ref = useRef()
  const scroll = useScroll()
  const [cabin, seat] = useGLTF(['/cabin-transformed.glb', '/seat-transformed.glb'])
  const meshes = useMemo(() => ({ Cabin: cabin.nodes.cabin_1, Seat: seat.nodes.seat }), [cabin, seat])
  useFrame(() => (ref.current.position.y = scroll.offset * 40))
  // Merged creates THREE.InstancedMeshes out of the meshes you feed it
  // All in all we end up with just 5 draw-calls for the entire scene
  return (
    <Merged castShadow receiveShadow meshes={meshes}>
      {(models) => (
        <group ref={ref}>
          <Cabin models={models} color="#252525" seatColor="sandybrown" name="1A" position={[0, 0, -6]} />
          <Cabin models={models} color="#454545" seatColor="gray" name="2B" position={[0, -10, -6]} />
          <Cabin models={models} color="#252525" seatColor="lightskyblue" name="3A" position={[0, -20, -6]} />
          <Cabin models={models} color="#454545" seatColor="gray" name="4B" position={[0, -30, -6]} />
          <Cabin models={models} color="#252525" seatColor="sandybrown" name="5B" position={[0, -40, -6]} />
        </group>
      )}
    </Merged>
  )
}

const Quarter = ({ models, color, ...props }) => (
  <group {...props}>
    <models.Seat color={color} position={[-0.35, 0, 0.7]} />
    <models.Seat color={color} position={[0.35, 0, 0.7]} />
    <models.Seat color={color} position={[-0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
    <models.Seat color={color} position={[0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
  </group>
)

const Row = ({ models, color, ...props }) => (
  <group {...props}>
    <Quarter models={models} color={color} position={[-1.2, -0.45, 9.75]} />
    <Quarter models={models} color={color} position={[1.2, -0.45, 9.75]} />
  </group>
)

const Cabin = ({ models, color = 'white', seatColor = 'white', name, ...props }) => (
  <group {...props}>
    <Text fontSize={4} color="#101020" position={[0, 6, 4]} rotation={[-Math.PI / 2, 0, 0]}>
      {name}
    </Text>
    <models.Cabin color={color} />
    <Row models={models} color={seatColor} />
    <Row models={models} color={seatColor} position={[0, 0, -1.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -6.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -8.5]} />
    <Row models={models} color={seatColor} position={[0, 0, -11]} />
    <Row models={models} color={seatColor} position={[0, 0, -12.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -17.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -19.5]} />
  </group>
)





export default function StarMetaverse() {
  const [ortho, set] = useState(false);
  return (
    <Canvas dpr={[1, 1.5]} gl={{ alpha: false }}>
      <fog attach="fog" args={['#17171b', 30, 40]} />
      <color attach="background" args={['#17171b']} />
      <ambientLight intensity={0.25} />
      <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} makeDefault={ortho} />
        <perspectiveCamera position={[8, 0, 2]} fov={75} makeDefault={!ortho} />
      </directionalLight>
      {/* <PerspectiveCamera position={[8, 0, 2]} fov={75} makeDefault={!ortho} /> */}
      {/* <OrthographicCamera position={[8, 0, 2]} zoom={75} makeDefault={ortho} /> */}
      
      
      <Suspense fallback={<StarLoader/>}>
        <ScrollControls>
          {/* <Train /> */}
          {/* <StarDome /> */}
          <Metaverse/>
        </ScrollControls>
        {/* <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#151515"
            metalness={0.6}
            roughness={1} 
            mirror={0}
          />
        </mesh> */}
        <Environment preset="dawn" />
      </Suspense>
    </Canvas>
  )
}
