import {
  Suspense,
  useCallback,
  useMemo,
  useState,
  lazy,
  useEffect,
} from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Buttons from "./components/Buttons";
import { Route, Routes, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import * as THREE from "three";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Router from "./router/Router";
import Header from "./components/Header";

import StarLoader from "./components/StarLoader";
import ModelDetail from "./components/ModelDetail";
import {
  Bounds,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  ScrollControls,
} from "@react-three/drei";
import { useSpringRef, useTransition } from "@react-spring/core";
import { a } from "@react-spring/three";
import StarJewellery from "./components/models/StarJewellery";
import Overlay from "./components/Overlay";
import Effects from "./components/Effects";
import Stars from "./components/Stars";
import useStore from "./store";

const StarStadiumPage = lazy(() => import("./pages/starstadium"));
const StarDomePage = lazy(() => import("./pages/stardome"));
const StarGalleryPage = lazy(() => import("./pages/stargallery"));
const StarOfficePage = lazy(() => import("./pages/staroffice"));
const StarArenaPage = lazy(() => import("./pages/stararena"));
const StarJewelleryPage = lazy(() => import("./pages/starjewellery"));

function App() {
  const { fov } = useStore((state) => state.mutation);
  const actions = useStore((state) => state.actions);
  // Current route
  const location = useLocation();
  // Animated shape props

  const transition = useTransition(location.pathname, {
    // ref: transRef,
    // keys: null,
    from: {
      position: [0, -30, 0],
      rotation: [0, 0, 0],
      scale: [0, 0, 0],
      opacity: 0,
      // transform: "translate3d(100%,0,0)"
    },
    enter: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      opacity: 0,
      // transform: "translate3d(0,0,0)"
    },
    leave: {
      position: [0, 30, 0],
      rotation: [0, 0, 0],
      scale: [0, 0, 0],
      opacity: 0,
      // transform: "translate3d(-50%,0,0)"
    },
    // exitBeforeEnter:true,
    // config:{
    //   duration:500,
    // }
    config: () => (n) =>
      n === "opacity" ? { friction: 60 } : { duration: 500, friction: 60 },
  });

  return (
    <div
      onPointerMove={actions.updateMouse}
      onClick={actions.shoot}
      className="overflow-hidden bg-black relative h-screen max-w-full"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [10, 0, 10], near: 0.01, far: 10000, fov }}
        onCreated={({ gl, camera }) => {
          actions.init(camera);
          // gl.toneMapping = THREE.Uncharted2ToneMapping;
          // gl.setClearColor(new THREE.Color("#020209"));
        }}
      >
       <Stars />
      {/* <Stars/> */}
        {/* <PerspectiveCamera
            position={[8, 0, 2]}
            fov={75}
            makeDefault={!ortho}
          /> */}
        {/* <OrthographicCamera
            position={[8, 0, 2]}
            zoom={75}
            makeDefault={ortho}
          /> */}

        <Suspense
          fallback={null}
          // fallback={
          //   <>
          //     <fog attach="fog" args={["#17171b", 30, 40]} />
          //     <color attach="background" args={["#17171b"]} />
          //     <ambientLight intensity={0.25} />
          //     <PerspectiveCamera shadows camera={{ position: [-15, 15, 18], fov: 35 }} />
          //     <directionalLight
          //       castShadow
          //       intensity={2}
          //       position={[10, 6, 6]}
          //       shadow-mapSize={[1024, 1024]}
          //     >
          //       <orthographicCamera
          //         attach="shadow-camera"
          //         left={-20}
          //         right={20}
          //         top={20}
          //         bottom={-20}
          //       />
          //     </directionalLight>
          //     <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          //       <planeGeometry args={[50, 50]} />
          //       <MeshReflectorMaterial
          //         blur={[400, 100]}
          //         resolution={1024}
          //         mixBlur={1}
          //         mixStrength={15}
          //         depthScale={1}
          //         minDepthThreshold={0.85}
          //         color="#151515"
          //         metalness={0.6}
          //         roughness={1}
          //       />
          //     </mesh>
          //     <Environment preset="dawn" />
          //   </>
          // }
        >
          <Router transition={transition} />
        </Suspense>
        {/* <Stars/> */}
        {/* <Effects/> */}
      </Canvas>
      <Overlay />
    </div>
  );
}

export default App;
