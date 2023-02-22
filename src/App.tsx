import { Suspense, useCallback, useMemo, useState, lazy } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Buttons from "./components/Buttons";
import { Route, Routes } from "react-router-dom";
import StarLoader from "./components/StarLoader";
import ModelDetail from "./components/ModelDetail";
import StarMetaverse from "./pages/starmetaverse";
const StarStadiumPage = lazy(() => import("./pages/starstadium"));
const StarDomePage = lazy(() => import("./pages/stardome"));
const StarGalleryPage = lazy(() => import("./pages/stargallery"));
const StarOfficePage = lazy(() => import("./pages/staroffice"));
const StarArenaPage = lazy(() => import("./pages/stararena"));
const StarJewelleryPage = lazy(() => import("./pages/starjewellery"));





function App() {
  const [hoveredStar, hoverStar] = useState("DEFAULT");
  const [clickedStar, clickStar] = useState("DEFAULT");

  const [parentVal, setParentVal] = useState(0);

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

        
        <Routes>
          <Route
            path="/"
            element={
              <StarMetaverse />
            }
          />
          <Route
            path="/star-stage"
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
