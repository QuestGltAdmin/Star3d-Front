import { Physics } from '@react-three/cannon';
import { Bounds, PointerLockControls, ScrollControls } from '@react-three/drei'
import { useEffect, useState, lazy } from 'react'
import Floor from '../../components/Floor';
import BaseCharacter from '../../components/ui/BaseCharacter';
import useStore from '../../store';
// import StarOffice from '../../components/models/StarOffice'

const StarOffice = lazy(()=>import("../../components/models/StarOffice"))


export default function StarJewelleryPage() {
  const [rotate, setRotate] = useState({ speed: 0, reverse: false });
  const sliderVal = useStore((state)=>state.sliderVal)
  
  {/*useEffect(() => {
    if (sliderVal > 0) {
      console.log("greater", typeof sliderVal, sliderVal / 10, sliderVal / 10);
      setRotate({ speed: sliderVal / 10, reverse: false });
    }
    if (sliderVal === 0) {
      console.log("equal", typeof sliderVal, sliderVal);
      setRotate({ speed: 0.5, reverse: false });
    }
    if (sliderVal < 0) {
      console.log(
        "less",
        typeof sliderVal,
        sliderVal,
        Math.abs(sliderVal / 10)
      );
      setRotate({ speed: Math.abs(sliderVal / 10), reverse: true });
    }
  }, [sliderVal])*/}

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
    {/* <Bounds position={[0, 0, 0]} observe margin={1.2}> */}
    <Physics gravity={[0,-9.8,0]}>

        <StarOffice />
        <Floor position={[0,1.5,0]} rotation={[Math.PI / -2, 0, 0]} color="white" />
    <BaseCharacter controls position={[-45,2.5,10]} args={[0.5]} color="yellow" />
    </Physics>
    {/* </Bounds> */}

    <PointerLockControls/>
    <pointLight position={[1, 1, 1]} />
    
  </>
  )
}
