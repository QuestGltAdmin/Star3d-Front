import { usePlane } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import React from "react";

const COLLIDER_URL = `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/jewellery/jewellery_collider.glb`;

export default function Collider(props) {
  const { nodes, materials } = useGLTF(COLLIDER_URL);
  const [ref] = usePlane((index) => ({ type: "Static", mass:0, onCollide:(e)=>console.log("Collison",e), ...props }));

  // const boundaryRef = useRef();

  // console.log(ref)

  //we can use useFrame here for action part

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      geometry={nodes.Collider.geometry}
      // material={materials.Carpet} 
      material={{transparent:true,opacity:0.0}}
      // material={c_materials.Collider_mat}
      scale={[1.01, 1, 1.01]}
    />
  );
}
