import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import { cn } from "../utilities/classname";
import music from "../assets/audio/ambient_inspiration.mp3";
import useStore from "../store";

export default function Buttons(props) {
  switch (props.component) {
    case "MUSIC":
      return <MusicButton {...props} />;
    case "HELP":
      return <HelpButton {...props} />;
    case "LAYER":
      return <LayerButton {...props} />;
    case "SLIDER":
      return <SliderButton {...props} />;
    case "NAVIGATION":
      return <NavigationButton {...props} />;
    default:
      return <></>;
  }
}

const MusicButton = (props) => {
  const [clicked, click] = useState(false);
  const [play, { pause, stop }] = useSound(music);

  useEffect(() => {
    if (clicked) {
      play();
    } else {
      stop();
    }
  }, [clicked]);

  return (
    <button
      className={cn(
        "w-10 z-10 h-10 p-1 border-2 border-orange-100 rounded-full hover:border-orange-200",
        props.className
      )}
      onClick={() => click(!clicked)}
    >
      {clicked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-white "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-white "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      )}
    </button>
  );
};

const HelpButton = (props) => {
  const [clicked, click] = useState(false);

  return (
    <button
      className={cn(
        "w-10 z-10 h-10 border-2 border-orange-100 rounded-full hover:border-orange-200",
        props.className
      )}
      onClick={() => click(!clicked)}
    >
      {!clicked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 9.879 7.519 c 1.171 -1.025 3.071 -1.025 4.242 0 c 1.172 1.025 1.172 2.687 0 3.712 c -0.203 0.179 -0.43 0.326 -0.67 0.442 c -0.745 0.361 -1.45 0.999 -1.45 1.827 v 0.75 M 12 17 z m 0 0 z"
            // d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 9.75 9.75 l 4.5 4.5 m 0 -4.5 l -4.5 4.5 M 12 12 z"
            // d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </button>
  );
};

const LayerButton = (props) => {
  const [clicked, click] = useState(false);

  return (
    <>
      {!clicked ? (
        <button
          className={cn(
            " z-10 border-2 p-2 w-12 h-12 rounded-full border-orange-100  hover:border-orange-200",
            props.className
          )}
          onClick={() => click(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="24"
            // height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </button>
      ) : (
        <div
          className={cn(
            "z-10 border-2 border-orange-100  hover:border-orange-200 rounded-tr-3xl rounded-bl-3xl",
            props.className
          )}
        >
          <div className="flex flex-col justify-between">
            <button
              id="layers_menu_close"
              className="flex self-center justify-center w-5 h-5 py-2 text-white cursor-pointer hover:text-orange-200"
              onClick={() => click(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="24"
                // height="24"
                className="text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <Link to={"/star-arena"}>
              <div className="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m14 5-3 3 2 7 8-8-7-2Z"></path>
                  <path d="m14 5-3 3-3-3 3-3 3 3Z"></path>
                  <path d="M9.5 6.5 4 12l3 6"></path>
                  <path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"></path>
                </svg>
                <h2 className="text-xl font-normal">STAR ARENA</h2>
                {/* <p className="text-xl font-normal">-1</p> */}
              </div>
            </Link>

            <Link to={"/star-stadium"}>
              <div className="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m14 5-3 3 2 7 8-8-7-2Z"></path>
                  <path d="m14 5-3 3-3-3 3-3 3 3Z"></path>
                  <path d="M9.5 6.5 4 12l3 6"></path>
                  <path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"></path>
                </svg>

                <h2 className="text-xl font-normal">STAR STADIUM</h2>
                {/* <p className="text-xl font-normal">0</p> */}
              </div>
            </Link>

            <Link to={"/"}>
              <div className="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m14 5-3 3 2 7 8-8-7-2Z"></path>
                  <path d="m14 5-3 3-3-3 3-3 3 3Z"></path>
                  <path d="M9.5 6.5 4 12l3 6"></path>
                  <path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"></path>
                </svg>

                <h2 className="text-xl font-normal">STAR STAGE</h2>
                {/* <p className="text-xl font-normal">1</p> */}
              </div>
            </Link>

            <Link to={"/star-jewellery"}>
              <div className="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m14 5-3 3 2 7 8-8-7-2Z"></path>
                  <path d="m14 5-3 3-3-3 3-3 3 3Z"></path>
                  <path d="M9.5 6.5 4 12l3 6"></path>
                  <path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"></path>
                </svg>

                <h2 className="text-xl font-normal">STAR JEWELLERY</h2>
                {/* <p className="text-xl font-normal">1</p> */}
              </div>
            </Link>

            <Link to={"/star-office"}>
              <div className="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m14 5-3 3 2 7 8-8-7-2Z"></path>
                  <path d="m14 5-3 3-3-3 3-3 3 3Z"></path>
                  <path d="M9.5 6.5 4 12l3 6"></path>
                  <path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"></path>
                </svg>

                <h2 className="text-xl font-normal">STAR OFFICE</h2>
                {/* <p className="text-xl font-normal">2</p> */}
              </div>
            </Link>

            <Link to={"/star-gallery"}>
              <div className="flex items-center justify-between p-3 text-white cursor-pointer gap-x-3 hover:text-orange-200 hover:underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m14 5-3 3 2 7 8-8-7-2Z"></path>
                  <path d="m14 5-3 3-3-3 3-3 3 3Z"></path>
                  <path d="M9.5 6.5 4 12l3 6"></path>
                  <path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z"></path>
                </svg>

                <h2 className="text-xl font-normal">STAR ART GALLERY</h2>
                {/* <p className="text-xl font-normal">3</p> */}
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const SliderButton = memo(
  ({ className, label, onChange, value, ...sliderProps }) => {
    const actions = useStore((state) => state.actions);
    const [sliderVal, setSliderVal] = useState(value);
    const [mouseState, setMouseState] = useState(null);

    const changeCallback = (e) => {
      setSliderVal(e.target.valueAsNumber);
      // onChange(sliderVal);
    };

    useEffect(() => {
      let t = setTimeout(() => {
        actions.updateSliderValue(sliderVal);
        onChange(sliderVal);
      }, 50);

      return () => {
        clearTimeout(t);
      };
    }, [sliderVal]);

    useEffect(() => {
      actions.updateSliderValue(0);
      onChange(0);
      setSliderVal(0);
      // if (mouseState === "up") {
      //   onChange(50);
      //   setSliderVal(50);
      // }
    }, [mouseState]);

    return (
      <div
        className={cn(
          "z-10 p-3 border-2 border-orange-100 rounded-full hover:border-orange-200",
          className
        )}
      >
        <div className="flex items-center justify-between gap-x-3">
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </span>

          <input
            id="range_slider"
            type="range"
            value={sliderVal}
            onChange={changeCallback}
            onClick={() => setMouseState("click")}
            onMouseUp={() => setMouseState("up")}
            onMouseDown={() => setMouseState("down")}
            // className="bg-orange-100 rounded-lg cursor-pointer  dark:bg-gray-200"
            className="slider w-24 h-[1px] bg-orange-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-200"
            {...sliderProps}
          />

          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
        </div>
      </div>
    );
  }
);

const NavigationButton = ({ className, label, onChange, value }) => {
  const actions = useStore((state) => state.actions);
  const {tl} = useStore((state)=>state.mutation)
  const [sliderVal, setSliderVal] = useState(value);
  const [paused, pause] = useState(true);


  const handlePause = () =>{
    // pause(!paused)
    if(tl.paused()){
      tl.play()
    }else{
      tl.pause();
    }
  }

  const handleFlow = (flow) => {
    if(flow==="BACKWARD"){
      tl.reverse()
    }
    if(flow==="FORWARD"){
      tl.play()
    }
  }

  return (
    <div
      className={cn(
        "z-10 p-3 border-2 border-orange-100 rounded-full hover:border-orange-200",
        className
      )}
    >
      <div className="flex items-center justify-between gap-x-3">
        <span className="" onClick={()=>handleFlow("BACKWARD")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </span>

        {tl.paused() ? (
          <span onClick={()=>tl.play()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </span>
        ) : (
          <span onClick={()=>tl.pause()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </span>
        )}

        <span className="" onClick={()=>handleFlow("FORWARD")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
      </div>
    </div>
  );
};
