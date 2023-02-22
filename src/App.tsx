import { Suspense, useCallback, useMemo, useState, lazy } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Buttons from "./components/Buttons";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { useTransition } from "@react-spring/core";
import { a } from "@react-spring/three";


const StarStadiumPage = lazy(() => import("./pages/starstadium"));
const StarDomePage = lazy(() => import("./pages/stardome"));
const StarGalleryPage = lazy(() => import("./pages/stargallery"));
const StarOfficePage = lazy(() => import("./pages/staroffice"));
const StarArenaPage = lazy(() => import("./pages/stararena"));
const StarJewelleryPage = lazy(() => import("./pages/starjewellery"));

function Metaverse({ transition, parentVal, ...metaverseProps }: any) {
  return transition(({ opacity, ...props }: any) => (
    <a.group {...props}>
      <Routes>
        <Route
          path="/"
          element={
            <StarDomePage
              sliderVal={parentVal}
              // checked={isChecked}
              // onStarClicked={(e) => metaverseProps.clickStar(e)}
              // onStarHovered={(e) => metaverseProps.hoverStar(e)}
            />
          }
        />
        <Route
          path="/star-jewellery"
          element={<StarJewelleryPage sliderVal={parentVal} />}
        />
        <Route
          path="/star-office"
          element={<StarOfficePage sliderVal={parentVal} />}
        />
        <Route
          path="/star-gallery"
          element={<StarGalleryPage sliderVal={parentVal} />}
        />
      </Routes>
    </a.group>
  ));
}

function App() {
  const [hoveredStar, hoverStar] = useState("DEFAULT");
  const [clickedStar, clickStar] = useState("DEFAULT");

  const [parentVal, setParentVal] = useState(0);

  // Current route
  const location = useLocation();
  const [ortho, setOrtho] = useState(false);
  // Animated shape props
  const transition = useTransition(location.pathname, {
    from: {
      position: [0, 0, -20],
      rotation: [0, Math.PI, 0],
      scale: [0, 0, 0],
      opacity: 0,
    },
    enter: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      opacity: 1,
    },
    leave: {
      position: [0, 0, -10],
      rotation: [0, -Math.PI, 0],
      scale: [0, 0, 0],
      opacity: 0,
    },
    config: () => (n) => n === "opacity" && { friction: 60 },
  });

  const sliderValueChanged = useCallback((val: number) => {
    // console.log("NEW VALUE", val);
    setParentVal(val);
  }, []);

  const sliderProps = useMemo(
    () => ({
      min: -50,
      max: 50,
      value: parentVal,
      step: 2,
      label: "This is star stage rotate range",
      onChange: (e: number) => sliderValueChanged(e),
    }),
    [parentVal]
  );

  return (
    <div className="flex flex-col overflow-hidden bg-black">
      {/* <MiniApp /> */}
      {/* <div className="fixed z-10 flex justify-center w-full py-3 bg-black">
        <Link to={"/"}>
          <h1 className="z-10 text-3xl font-bold text-center text-white underline">
            Star Stage
          </h1>
        </Link>
      </div> */}
      <div className="relative h-screen max-w-full ">
        {/* Music Button */}
        <Buttons className="absolute left-5 top-5" component="MUSIC" />

        {/* Switch Button */}

        {/* <Switch
          {...SwitchProps}
          className="absolute z-10 w-20 h-10 border-orange-100 right-20 top-5 hover:border-orange-200"
        /> */}

        {/* Help Button */}
        <Buttons className="absolute right-5 top-5" component="HELP" />

        {/* Layer Button */}
        <Buttons className="absolute left-5 bottom-5" component="LAYER" />

        {/* Slider Button */}
        <Buttons
          {...sliderProps}
          className="absolute right-5 bottom-5"
          component="SLIDER"
        />

        {/* Stars Info */}
        <div className="absolute left-0 z-10 w-full p-3 bottom-5">
          {clickedStar === "JEWELLERY" && (
            <ModelDetail
              title={"Star Jewellery"}
              subtitle={"One stop shop for any jewellery!"}
            />
          )}
          {clickedStar === "GALLERY" && (
            <ModelDetail
              title={"Star Art Gallery"}
              subtitle={"One stop shop for any art!"}
            />
          )}
          {clickedStar === "STADIUM" && (
            <ModelDetail
              title={"Star Stadium"}
              subtitle={"One stop place for any game!"}
            />
          )}
          {clickedStar === "OFFICE" && (
            <ModelDetail
              title={"Star Office"}
              subtitle={"One and only quest workplace!"}
            />
          )}
          {clickedStar === "ARENA" && (
            <ModelDetail
              title={"Star Arena"}
              subtitle={"One stop destination for any event!"}
            />
          )}
        </div>
        {/* <StarStage sliderVal={parentVal} /> */}
        <Canvas dpr={[1, 2]}>
          <fog attach="fog" args={["#17171b", 30, 40]} />
          <color attach="background" args={["#17171b"]} />
          <ambientLight intensity={0.25} />
          <directionalLight
            castShadow
            intensity={2}
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
            <perspectiveCamera position={[8, 0, 2]} fov={75} />
          </directionalLight>
          <PerspectiveCamera
            position={[8, 0, 2]}
            fov={75}
            makeDefault={!ortho}
          />
          <OrthographicCamera
            position={[8, 0, 2]}
            zoom={75}
            makeDefault={ortho}
          />

          <Suspense fallback={null}>
            {/* <ScrollControls pages={3}>
              <Train />
            </ScrollControls> */}
            <Metaverse transition={transition} parentVal={parentVal} />
            <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
            </mesh>
            <Environment preset="dawn" />
          </Suspense>
        </Canvas>

        {/* <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<StarLoader />}>
                <StarDomePage
                  sliderVal={parentVal}
                  // checked={isChecked}
                  onStarClicked={(e) => clickStar(e)}
                  onStarHovered={(e) => hoverStar(e)}
                />
              </Suspense>
            }
          />
          <Route
            path="/star-gallery"
            element={
              <Suspense fallback={<StarLoader />}>
                <StarGalleryPage sliderVal={parentVal} />
              </Suspense>
            }
          />
          <Route
            path="/star-office"
            element={
              <Suspense fallback={<StarLoader />}>
                <StarOfficePage sliderVal={parentVal} />
              </Suspense>
            }
          />
          <Route
            path="/star-arena"
            element={
              <Suspense fallback={<StarLoader />}>
                <StarArenaPage sliderVal={parentVal} />
              </Suspense>
            }
          />
          <Route
            path="/star-jewellery"
            element={
              <Suspense fallback={<StarLoader />}>
                <StarJewelleryPage sliderVal={parentVal} />
              </Suspense>
            }
          />
          <Route
            path="/star-stadium"
            element={
              <Suspense fallback={<StarLoader />}>
                <StarStadiumPage sliderVal={parentVal} />
              </Suspense>
            }
          />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
