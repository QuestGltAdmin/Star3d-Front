import { Bounds, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import Model from "../../libs/gltfRenderer";
import StarLoader from "../loaders/StarLoader";
import { Model as StarCube } from "../models/StarCube";
import { Model as StarCube1 } from "../models/StarCube1";

export default function StarStage({
  onStarHovered,
  onStarClicked,
  sliderVal,
  checked=false,
  ...starStageProps
}) {
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState("DEFAULT");
  const [clicked, click] = useState(false);
  const [rotate, setRotate] = useState({ speed: 0, reverse: false });

  useEffect(() => {
    if (onStarHovered) {
      onStarHovered(hovered);
    }
  }, [hovered]);

  useEffect(() => {
    if (onStarClicked) {
      onStarClicked(clicked);
    }
  }, [clicked]);

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
  }, [sliderVal]);
  // console.log("model");
  return (
    <Canvas
      className=""
      // camera={{ position: [0, -10, 80], fov: 50 }}
      camera={{
        position: [8, 0, 2],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
    >
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
        {/* <Model model_path={"/models/Star_Web_7_etc1s.glb"} /> */}
        {checked?<StarCube1/>
        :<StarCube
          star_art_gallery={{
            onClick: () => hover("GALLERY"),
            onDoubleClick: () => hover("DEFAULT"),
          }}
          star_office={{
            onClick: () => hover("OFFICE"),
            onDoubleClick: () => hover("DEFAULT"),
          }}
          star_arena={{
            onClick: () => hover("ARENA"),
            onDoubleClick: () => hover("DEFAULT"),
          }}
          star_stadium={{
            onClick: () => hover("STADIUM"),
            onDoubleClick: () => hover("DEFAULT"),
          }}
          star_jewellery={{
            onClick: () => hover("JEWELLERY"),
            onDoubleClick: () => hover("DEFAULT"),
            // onPointerOver: () => hover("JEWELLERY"),
            // onPointerOut: () => hover("DEFAULT"),
          }}
        />}
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
    </Canvas>
  );
}
