import { usePlane, useTrimesh } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import { MeshNormalMaterial } from "three";

const COLLIDER_URL = `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/jewellery/jewellery_collider.glb`;

export default function Collider(props) {
  const { nodes, materials } = useGLTF(COLLIDER_URL);
  const [ref, api] = useTrimesh(
    (index) => ({
      type: "Static",
      mass: 0,
      args: [
        nodes.Collider.geometry.attributes.position.array,
        nodes.Collider.geometry.index.array,
      ],
      onCollide: (e) => console.log("Collison", e),
      ...props,
    }),
    useRef()
  );

  //we can use useFrame here for action part

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Collider.geometry}
        // material={materials.Collider_mat}
      material={{transparent:true,opacity:0.0}}
        scale={[1.01, 1, 1.01]}
      />
    </group>
  );
}

export function Monkey(props) {
  const { nodes } = useGLTF(
    "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@cannon/public/models/monkey.glb"
  );
  const [ref, api] = useTrimesh(
    () => ({
      args: [
        nodes.Suzanne.geometry.attributes.position.array,
        nodes.Suzanne.geometry.index.array,
      ],
      mass: 1,
      ...props,
    }),
    useRef()
  );
  //   <group {...props} dispose={null}>
  //   <mesh
  //     castShadow
  //     receiveShadow
  //     geometry={nodes.Suzanne.geometry}
  //     material={nodes.Suzanne.material}
  //   />
  // </group>
  return (
    <group
      ref={ref}
      {...props}
      dispose={null}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <mesh
        castShadow
        geometry={nodes.Suzanne.geometry}
        material={useMemo(() => new MeshNormalMaterial(), [])}
      />
    </group>
  );
}
