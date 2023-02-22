import { Bounds, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState, lazy } from 'react'
// import StarOffice from '../../components/models/StarOffice'

const StarOffice = lazy(()=>import("../../components/models/StarOffice"))

type StarOfficePageProps = {
  sliderVal:number
}

export default function StarOfficePage({sliderVal}:StarOfficePageProps) {
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
  
      <StarOffice />
    </Bounds>
    <pointLight position={[1, 1, 1]} />
    {/* <Star position={[4, 1, 0]} /> */}
    {/* <StarEvent position={[-1.2, 0, 0]} /> */}
    {/* <StarEvent position={[1.2, 0, 0]} /> */}
    <OrbitControls
      makeDefault
      minDistance={0.5}
      maxDistance={8}
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
    />
  </>
  )
}
