import { Bounds, FirstPersonControls, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState, lazy } from 'react'
import useStore from '../../store'
// import StarOffice from '../../components/models/StarOffice'

const StarOffice = lazy(()=>import("../../components/models/StarOffice"))


export default function StarOfficePage() {
  const sliderVal = useStore((state)=>state.sliderVal);
  const camera = useStore((state)=>state.camera);

  const [rotate, setRotate] = useState({ speed: 0, reverse: false });
  
  useEffect(() => {
    if (sliderVal > 0) {
      console.log("greater", typeof sliderVal, sliderVal / 10, sliderVal / 10);
      setRotate({ speed: sliderVal / 10, reverse: false });
    }
    if (sliderVal === 0) {
      console.log("equal", typeof sliderVal, sliderVal);
      setRotate({ speed: 0.5, reverse: false });
    }
    if (sliderVal < 0) {
      console.log(
        "less",
        typeof sliderVal,
        sliderVal,
        Math.abs(sliderVal / 10)
      );
      setRotate({ speed: Math.abs(sliderVal / 10), reverse: true });
    }
  }, [sliderVal])
  

  useEffect(()=>{
    console.log("oFFICE CAMERA:",camera.position)
  },[camera])

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
    <StarOffice />
   
    <pointLight position={[1, 1, 1]} />
   
   {/* <FirstPersonControls
    object={camera}
   /> */}
    {/* <OrbitControls
      makeDefault
      minDistance={0.5}
      // maxDistance={8}
      autoRotate={true}
      enableRotate={true}
      rotateSpeed={rotate.speed}
      autoRotateSpeed={rotate.speed}
      // enableDamping={true}
      // dampingFactor={0.05}
      reverseOrbit={rotate.reverse}
      // minAzimuthAngle={-Math.PI}
      // maxAzimuthAngle={Math.PI}
      // minPolarAngle={0} maxPolarAngle={Math.PI / 1.6}
      minPolarAngle={Math.PI - Math.PI / 1.6}
      maxPolarAngle={Math.PI - Math.PI / 1.6}
    /> */}
  </>
  )
}
