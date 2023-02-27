import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { a } from "@react-spring/three";
// import { TransitionProvider } from '../context/TransitionContext';
// import TransitionComponent from '../components/Transition';
import StarDomePage from '../pages/stardome';
import StarGalleryPage from '../pages/stargallery';
import StarJewelleryPage from '../pages/starjewellery';
import StarOfficePage from '../pages/staroffice';

export default function Router({transition, ...routerProps}) {
  // const transition = useTransition(location.pathname, {
  //   // ref: transRef,
  //   // keys: null,
  //   from: {
  //     position: [0, -30, 0],
  //     rotation: [0, 0, 0],
  //     scale: [0, 0, 0],
  //     opacity: 0,
  //     // transform: "translate3d(100%,0,0)"
  //   },
  //   enter: {
  //     position: [0, 0, 0],
  //     rotation: [0, 0, 0],
  //     scale: [1, 1, 1],
  //     opacity: 0,
  //     // transform: "translate3d(0,0,0)"
  //   },
  //   leave: {
  //     position: [0, 30, 0],
  //     rotation: [0, 0, 0],
  //     scale: [0, 0, 0],
  //     opacity: 0,
  //     // transform: "translate3d(-50%,0,0)"
  //   },
  //   // exitBeforeEnter:true,
  //   // config:{
  //   //   duration:500,
  //   // }
  //   config: () => (n) =>
  //     n === "opacity" ? { friction: 60 } : { duration: 500, friction: 60 },
  // });


  return transition(({ opacity, ...props }) => (
    <a.group {...props}>
      <Routes>
        <Route
          path="/"
          element={
            <StarDomePage
              // sliderVal={parentVal}
              // checked={isChecked}
              // onStarClicked={(e) => metaverseProps.clickStar(e)}
              // onStarHovered={(e) => metaverseProps.hoverStar(e)}
            />
          }
        />
        <Route
          path="/star-jewellery"
          element={<StarJewelleryPage />}
        />
        <Route
          path="/star-office"
          element={<StarOfficePage />}
        />
        <Route
          path="/star-gallery"
          element={<StarGalleryPage />}
        />
      </Routes>
    </a.group>
  ));
};

