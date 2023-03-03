import { Bounds, OrbitControls, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState, lazy } from 'react'
import useStore from '../../store'
// import StarArena from '../../components/models/StarArena'

const StarArena = lazy(()=> import('../../components/models/StarArena'))

export default function StarArenaPage() {
  const sliderVal = useStore((state)=>state.sliderVal);
  const [rotate, setRotate] = useState({ speed: 0, reverse: false });
  const [lockControls, setLockControls] = useState(false)
  
  useEffect(() => {
    // console.log(sliderVal)
  }, [sliderVal])

  useEffect(() => {
    setTimeout(() => {
      setLockControls(true)
    }, 3000);
  },[])
  
  return (
    <>
    {/* <perspectiveCamera position={[2,3,4]} /> */}
    <ambientLight intensity={0.5} />
    {/* <directionalLight castShadow={true} /> */}
    <spotLight
      // map={envMap}
      position={[1, 10, 1]}
      angle={0.15}
      penumbra={1}
    />
    {/* <Lights/> */}
    <Bounds position={[0, 0, 0]} observe margin={1.2}>
  
      <StarArena/>
    </Bounds>
    <pointLight position={[1, 1, 1]} />
    {/* <Star position={[4, 1, 0]} /> */}
    {/* <StarEvent position={[-1.2, 0, 0]} /> */}
    {/* <StarEvent position={[1.2, 0, 0]} /> */}
    {lockControls && <PointerLockControls />}
  </>
  )
}
