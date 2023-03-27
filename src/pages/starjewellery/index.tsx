import { Debug, Physics } from '@react-three/cannon';
import { Bounds, PointerLockControls, ScrollControls } from '@react-three/drei'
import { useEffect, useState, lazy } from 'react'
import Floor from '../../components/Floor';
import BaseCharacter from '../../components/ui/BaseCharacter';
import useStore from '../../store';
import Collider from './Collider';
// import StarJewellery from '../../components/models/StarJewelleryStore'

const StarJewellery = lazy(()=>import("../../components/models/StarJewellery"))


export default function StarJewelleryPage() {
  const [rotate, setRotate] = useState({ speed: 0, reverse: false });
  const sliderVal = useStore((state)=>state.sliderVal)
  const [fpc, setFpc] = useState(false)

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
      setFpc(true)
    }, 7000);
  },[])
  
  
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
    {
      fpc ? (
        <>
      <Physics gravity={[0,-36.8,0]}>
        <Debug color="black" scale={1.1}>

        <StarJewellery />
        <Floor position={[10,1.5,11]} rotation={[Math.PI / -2, 0, 0]} color="white" />
        <Collider/>
        <BaseCharacter controls position={[.5,1.5,-1]} args={[0.5]} color="yellow" />
        </Debug>
      </Physics>
    <PointerLockControls/>

        </>
      ) : (<StarJewellery />)
    }
    <pointLight position={[1, 1, 1]} />
    
  </>
  )
}
