import { Bounds, OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import React, { useEffect, useState, useRef, lazy } from "react";
import Stars from "../../components/Stars";
import useStore from "../../store";
// import StarDome from "../../components/models/StarDome"

const StarDome = lazy(() => import("../../components/models/StarDome"));

// type StarDomePageProps = {
//   onStarHovered?:(type:string)=>void,
//   onStarClicked?:(type:string)=>void,
//   sliderVal:number
// }

export default function StarDomePage({
  ...props
}: any) {
  const sliderVal = useStore<any>((state: any) => state.sliderVal) as number;
  const meshRef = useRef();
  const [rotate, setRotate] = useState({ speed: 0, reverse: false });

  useEffect(() => {
    if (sliderVal > 0) {
      // console.log("greater", typeof sliderVal, sliderVal / 10, sliderVal / 10);
      setRotate({ speed: sliderVal / 10, reverse: false });
    }
    if (sliderVal === 0) {
      // console.log("equal", typeof sliderVal, sliderVal);
      setRotate({ speed: 0.5, reverse: false });
    }
    if (sliderVal < 0) {
      // console.log("less",typeof sliderVal,sliderVal,Math.abs(sliderVal / 10));
      setRotate({ speed: Math.abs(sliderVal / 10), reverse: true });
    }
  }, [sliderVal]);
  // console.log("model", sliderVal);
  return (
    <>
     
      <fog attach="fog" args={["#17171b", 30, 40]} />
      <color attach="background" args={["#17171b"]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        intensity={0.8}
        position={[10, 6, 6]}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-20}
          right={20}
          top={20}
          bottom={-20}
        />
      </directionalLight>
      {/* <spotLight
        // map={envMap}
        position={[1, 10, 1]}
        angle={0.15}
        penumbra={1}
      /> */}
      <pointLight position={[1, 1, 1]} />
      <ScrollControls pages={4}>

      {/* <Bounds position={[0, 0, 0]} observe margin={1.2}> */}
        <StarDome />
      {/* </Bounds> */}
      </ScrollControls>
      {/* <OrbitControls
        makeDefault
        enableZoom={false}
        // minDistance={2}
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
  );
}
