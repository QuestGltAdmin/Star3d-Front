import { useRef, useState } from "react";
import "./styles/index.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useCubeTexture } from "@react-three/drei";
import * as THREE from "three";
import MiniApp, { Lights } from "./components/Lights";
import { Model as StarCube1 } from "./components/StarCube1";
import { Model as StarCube2 } from "./components/StarCube2";
import { Model as StarDom1 } from "./components/StarDom1";
import { Model as StarDom2 } from "./components/StarDom2";
import Buttons from "./components/arena/Buttons";

function Star(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function StarEvent(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function App() {
  let texture_path = "textures/cubemaps/";
  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: texture_path }
  );

  // //shadow
  // const directional_light_shadow = new THREE.LightShadow();
  // directional_light_shadow.mapSize.set(1024, 1024);
  // directional_light_shadow.camera.far = 15;
  // directional_light_shadow.camera.left = -7;
  // directional_light_shadow.camera.top = 7;
  // directional_light_shadow.camera.right = 7;
  // directional_light_shadow.camera.bottom = -7;

  return (
    <div className="flex flex-col overflow-hidden bg-black">
      {/* <MiniApp /> */}
      <div className="fixed z-10 flex justify-center w-full py-3 bg-black">
        <h1 className="z-10 text-3xl font-bold text-center text-white underline">
          Star Arena
        <Buttons name="music class" type="MUSIC"/>
        </h1>
      </div>
      <div className=" h-screen relative max-w-full">
        <button
          id="music_button"
          class="absolute w-10 z-10 h-10 border-2 border-orange-100 rounded-full left-5 top-20 hover:border-orange-200"
        >
          <i
            id="music_volume_icon"
            class="text-white fa-solid fa-volume-high"
          ></i>
        </button>
        <button
          id="help_button"
          class="absolute w-10 z-10 h-10 border-2 border-orange-100 rounded-full right-5 top-20 hover:border-orange-200"
        >
          <i id="help_support_icon" class="text-white fa-solid fa-question"></i>
        </button>

        <button
          id="layers_menu_open"
          class="absolute border-2 z-10 border-orange-100 rounded-full left-5 bottom-5 hover:border-orange-200 w-14 h-14"
        >
          <i class="text-white fa-solid fa-layer-group"></i>
        </button>
        <div
          id="layers_menu"
          class="absolute hidden z-10 border-2 border-orange-100 left-5 bottom-5 hover:border-orange-200 rounded-tr-3xl rounded-bl-3xl"
        >
          <div class="flex flex-col justify-between">
            <div
              id="layers_menu_close"
              class="flex justify-center h-5 py-2 text-white cursor-pointer hover:text-orange-200"
            >
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
              <i class="fa-solid fa-road-barrier"></i>
              <h2 class="text-xl font-normal">THE BAR</h2>
              <p class="text-xl font-normal">1</p>
            </div>

            <div class="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
              <i class="fa-solid fa-road-barrier"></i>
              <h2 class="text-xl font-normal">THE ARENA</h2>
              <p class="text-xl font-normal">0</p>
            </div>

            <div class="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
              <i class="fa-solid fa-road-barrier"></i>
              <h2 class="text-xl font-normal">THE GALLERY</h2>
              <p class="text-xl font-normal">-1</p>
            </div>
          </div>
        </div>

        <div class="absolute z-10 p-3 border-2 border-orange-100 rounded-full right-5 bottom-5 hover:border-orange-200">
          <div class="flex items-center justify-between gap-x-3">
            <span class="">
              <i class="text-white fa-solid fa-chevron-left"></i>
            </span>

            <input
              id="range_slider"
              type="range"
              min="1"
              max="100"
              value="50"
              class="slider w-24 h-[1px] bg-orange-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-200"
            />

            <span class="">
              <i class="text-white fa-solid fa-chevron-right"></i>
            </span>
          </div>
        </div>
        <Canvas
          
          className=""
          camera={{
            position: [6, 1, 1],
            fov: 75,
            near: 0.1,
            far: 100,
          }}
        >
          {/* <perspectiveCamera position={[2,3,4]} /> */}
          <ambientLight intensity={0.5} />
          {/* <directionalLight castShadow={true} /> */}
          <spotLight
            map={envMap}
            position={[1, 10, 1]}
            angle={0.15}
            penumbra={1}
          />
          {/* <Lights/> */}
          <StarCube1 />
          {/* <StarCube2/> */}
          <pointLight position={[1, 1, 1]} />
          {/* <Star position={[4, 1, 0]} /> */}
          {/* <StarEvent position={[-1.2, 0, 0]} /> */}
          {/* <StarEvent position={[1.2, 0, 0]} /> */}
          <OrbitControls
            minDistance={5}
            maxDistance={8}
            // minAzimuthAngle={-Math.PI}
            // maxAzimuthAngle={Math.PI}
            minPolarAngle={Math.PI - Math.PI / 1.5}
            maxPolarAngle={Math.PI - Math.PI / 1.6}
          />
        </Canvas>
      </div>
    </div>
  );
}
