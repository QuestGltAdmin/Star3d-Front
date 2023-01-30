import { useCallback, useMemo, useRef, useState } from "react";
import "./styles/index.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useCubeTexture } from "@react-three/drei";
import * as THREE from "three";
import MiniApp, { Lights } from "./components/Lights";
import { Model as StarCube } from "./components/StarCube";
import Buttons from "./components/star_stage/Buttons";
import StarJewelleryDetail from "./components/star_jewellery/StarJewelleryDetail";
import StarArtGalleryDetail from "./components/star_art_gallery/StarArtGalleryDetail";
import StarStadiumDetail from "./components/star_stadium/StarStadiumDetail";
import StarOfficeDetail from "./components/star_office/StarOfficeDetail";
import StarArenaDetail from "./components/star_arena/StarArenaDetail";
import StarStage from "./components/star_stage";
import { Link, Route, Routes } from "react-router-dom";
import StarStadium from "./components/star_stadium";
import StarArtGallery from "./components/star_art_gallery";
import StarOffice from "./components/star_office";
import StarArena from "./components/star_arena";
import StarJewellery from "./components/star_jewellery";

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
  const [hoveredStar, hoverStar] = useState("DEFAULT");
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

  const [parentVal, setParentVal] = useState(50);

  const sliderValueChanged = useCallback(val => {
    // console.log("NEW VALUE", val);
    setParentVal(val);
  });

  const sliderProps = useMemo(
    () => ({
      min: 0,
      max: 100,
      value: parentVal,
      step: 2,
      label: "This is star stage rotate range",
      onChange: e => sliderValueChanged(e)
    }),
    [parentVal]
  );

  return (
    <div className="flex flex-col overflow-hidden bg-black">
      {/* <MiniApp /> */}
      <div className="fixed z-10 flex justify-center w-full py-3 bg-black">
      <Link to={"/"}>

        <h1 className="z-10 text-3xl font-bold text-center text-white underline">
          Star Arena
        </h1>
      </Link>
      </div>
      <div className="relative h-screen max-w-full ">
        {/* Music Button */}
        <Buttons className="absolute left-5 top-20" component="MUSIC"/>
      
        {/* Help Button */}
        <Buttons className="absolute right-5 top-20" component="HELP"/>
      
        {/* Layer Button */}
        <Buttons className="absolute left-5 bottom-5" component="LAYER"/>
      
        {/* Slider Button */}
        <Buttons {...sliderProps} className="absolute right-5 bottom-5" component="SLIDER"/>

        
        {/* Stars Info */}
        <div className="absolute z-10 p-3 right-28 top-48">
          {hoveredStar==="JEWELLERY"&&<StarJewelleryDetail/>}
          {hoveredStar==="GALLERY"&&<StarArtGalleryDetail/>}
          {hoveredStar==="STADIUM"&&<StarStadiumDetail/>}
          {hoveredStar==="OFFICE"&&<StarOfficeDetail/>}
          {hoveredStar==="ARENA"&&<StarArenaDetail/>}
        </div>
        {/* <StarStage sliderVal={parentVal} /> */}
        <Routes>
          <Route path="/" element={<StarStage sliderVal={parentVal} />}/>
          <Route path="/star-stadium" element={<StarStadium/>} />
          <Route path="/star-art-gallery" element={<StarArtGallery/>}/>
          <Route path="/star-office" element={<StarOffice/>}/>
          <Route path="/star-arena" element={<StarArena/>}/>
          <Route path="/star-jewellery" element={<StarJewellery/>}/>
        </Routes>

      </div>
    </div>
  );
}
