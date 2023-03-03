import React, { useCallback, useMemo, useState } from "react";
import useStore from "../store";
import Buttons from "./Buttons";
import ModelDetail from "./ModelDetail";

export default function Overlay() {
  const {clicked, hovered} = useStore((state)=>state)


  const sliderProps = useMemo(
    () => ({
      min: -50,
      max: 50,
      value: 0,
      step: 2,
      label: "This is star stage rotate range",
      onChange: (e) => {}, // sliderVal(number) comes here 
    }),
    []
  );

  console.log({clicked, hovered})

  return (
    <>
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
      {/* <Buttons
        {...sliderProps}
        className="absolute right-5 bottom-5"
        component="SLIDER"
      /> */}
      {/* Navigation Button */}
      <Buttons
        {...sliderProps}
        className="absolute right-5 bottom-5"
        component="NAVIGATION"
      />

      {/* Stars Info */}
      <div className="absolute left-0 z-10 w-full p-3 bottom-5">
        {clicked.status && clicked.label === "JEWELLERY" && (
          <ModelDetail
            title={"Star Jewellery"}
            subtitle={"One stop shop for any jewellery!"}
          />
        )}
        {clicked.status && clicked.label === "GALLERY" && (
          <ModelDetail
            title={"Star Art Gallery"}
            subtitle={"One stop shop for any art!"}
          />
        )}
        {clicked.status && clicked.label === "STADIUM" && (
          <ModelDetail
            title={"Star Stadium"}
            subtitle={"One stop place for any game!"}
          />
        )}
        {clicked.status && clicked.label === "OFFICE" && (
          <ModelDetail
            title={"Star Office"}
            subtitle={"One and only quest workplace!"}
          />
        )}
        {clicked.status && clicked.label === "ARENA" && (
          <ModelDetail
            title={"Star Arena"}
            subtitle={"One stop destination for any event!"}
          />
        )}
        {hovered.status && hovered.label === "ARENA" && (
          <ModelDetail
            title={"Star Arena"}
            subtitle={"One stop destination for any event!"}
          />
        )}
      </div>
    </>
  );
}
