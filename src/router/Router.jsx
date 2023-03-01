import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { a } from "@react-spring/three";
// import { TransitionProvider } from '../context/TransitionContext';
// import TransitionComponent from '../components/Transition';
import StarDomePage from "../pages/stardome";
import StarGalleryPage from "../pages/stargallery";
import StarJewelleryPage from "../pages/starjewellery";
import StarOfficePage from "../pages/staroffice";
import Stars from "../components/Stars";
import Model from "../components/models/StarDome";
import {
  ArcballControls,
  MeshReflectorMaterial,
  OrbitControls,
  ScrollControls,
  TrackballControls,
} from "@react-three/drei";
import { Star, StarGroup } from "../components/Star";
import StarStadiumPage from "../pages/starstadium";
import StarArenaPage from "../pages/stararena";

export default function Router({ transition, ...routerProps }) {
  return transition(({ opacity, ...props }) => (
    <a.group {...props}>
      <Routes>
        <Route
          path="/test"
          element={
            <>
              <Stars />
              <fog attach="fog" args={["#17171b", 30, 40]} />
              <color attach="background" args={["#17171b"]} />
              <ambientLight intensity={0.25} />
              {/* <PerspectiveCamera shadows camera={{ position: [-15, 15, 18], fov: 35 }} /> */}
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
              <ScrollControls pages={4}>
                <StarGroup />
              </ScrollControls>
              <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                  blur={[400, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={15}
                  depthScale={16}
                  minDepthThreshold={0.85}
                  color="#151515"
                  metalness={0.6}
                  roughness={1}
                />
              </mesh>
            </>
          }
        />
        <Route path="/" element={<StarDomePage />} />
        <Route path="/star-jewellery" element={<StarJewelleryPage />} />
        <Route path="/star-office" element={<StarOfficePage />} />
        <Route path="/star-gallery" element={<StarGalleryPage />} />
        <Route path="/star-stadium" element={<StarStadiumPage/>} />
        <Route path="/star-arena" element={<StarArenaPage/>} />
      </Routes>
    </a.group>
  ));
}
