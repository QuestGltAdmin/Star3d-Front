import { Debug, Physics } from "@react-three/cannon";
import { Bounds, Html, PointerLockControls, ScrollControls } from "@react-three/drei";
import { useEffect, useState, lazy } from "react";
import Floor from "../../components/Floor";
import BaseCharacter from "../../components/ui/BaseCharacter";
import useStore from "../../store";
import Collider, { Monkey } from "./Collider";
import { JewelleryCollider } from "../../components/Colliders";
import FemaleAvatar from "../../components/ui/FemaleAvatar";
// import StarJewellery from '../../components/models/StarJewelleryStore'

const StarJewellery = lazy(
  () => import("../../components/models/StarJewellery")
);

export default function StarJewelleryPage() {
  const [rotate, setRotate] = useState({ speed: 0, reverse: false });
  const players = useStore((state) => state.players);
  const [fpc, setFpc] = useState(false);

  // useEffect(() => {
  //   if (sliderVal > 0) {
  //     console.log("greater", typeof sliderVal, sliderVal / 10, sliderVal / 10);
  //     setRotate({ speed: sliderVal / 10, reverse: false });
  //   }
  //   if (sliderVal === 0) {
  //     console.log("equal", typeof sliderVal, sliderVal);
  //     setRotate({ speed: 0.5, reverse: false });
  //   }
  //   if (sliderVal < 0) {
  //     console.log(
  //       "less",
  //       typeof sliderVal,
  //       sliderVal,
  //       Math.abs(sliderVal / 10)
  //     );
  //     setRotate({ speed: Math.abs(sliderVal / 10), reverse: true });
  //   }
  // }, [sliderVal])

  useEffect(() => {
    setTimeout(() => {
      setFpc(true);
    }, 7000);
  }, []);

  console.log({ players });

  return (
    <>
      {/* <perspectiveCamera position={[2,3,4]} /> */}
      <ambientLight intensity={0.5} />
      {/* <directionalLight castShadow={true} /> */}
      <spotLight
        // map={envMap}
        position={[1, 10, 1]}
        angle={0.15}
        penumbra={1}
      />
      {/* <Lights/> */}

      <Physics gravity={[0, -36.8, 0]}>
        {/* <Debug color="black" scale={1.1}> */}

        <StarJewellery />
        <Floor
          position={[10, 1.5, 11]}
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
        />
          <BaseCharacter
            controls
            position={[3.5, 1.5, -1]}
            args={[0.5]}
            color="yellow"
          />
        {players.map(({name,socket_id,position, rotation}: any) => (
          <group key={socket_id}>
          <Html position={[position.x,position.y+1,position.z]}>
            <div>{socket_id}</div>
          </Html>
          <mesh  castShadow rotation={[rotation._x,rotation._y,rotation._z]} position={[position.x,position.y,position.z]}>
            
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
          </group>
          ))}
        {/* <FemaleAvatar position={[0.5, 1.5, -1]} /> */}
        <JewelleryCollider />
        {/* <OfficeCollider/> */}
        {/* </Debug> */}
      </Physics>

      {fpc ? <PointerLockControls /> : <></>}
      <pointLight position={[1, 1, 1]} />
    </>
  );
}
