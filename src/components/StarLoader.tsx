import { Html } from "@react-three/drei";
import React from "react";
import loader from "../assets/load.gif";
export default function StarLoader() {
  return (
    <Html>
      <div
        id="whrooler-loader"
        className="flex items-center justify-center w-screen h-screen bg-brandColor-500"
      >
        <img src={loader} alt="img" id="love" />
        {/* <div className='text-4xl font-extrabold text-white'>Star Loader</div> */}
      </div>
    </Html>
  );
}
