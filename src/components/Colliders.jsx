import { useTrimesh } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from 'three'

export function JewelleryCollider(props) {
  const COLLIDER_URL = `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/jewellery/jewellery_collider.glb`;
  const { nodes, materials } = useGLTF(COLLIDER_URL);
  // console.log({nodes})
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

export function Model(props) {
  const COLLIDER_URL = ``;
  const { nodes, materials } = useGLTF("/collider4.glb");
  const [ref, api] = useTrimesh(
    (index) => ({
      type: "Static",
      mass: 0,
      args: [
        nodes.Cylinder.geometry.attributes.position.array,
        nodes.Cylinder.geometry.index.array,
      ],
      onCollide: (e) => console.log("Collison", e),
      ...props,
    }),
    useRef()
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={{transparent:true,opacity:0.0}}

        // material={nodes.Cylinder.material}
        position={[-374.59, -0.19, 2.84]}
      />
    </group>
  );
}

export function GalleryCollider(props) {
  const COLLIDER_URL = `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/gallery/gallery_collider.glb`;
  const { nodes, materials } = useGLTF(COLLIDER_URL);
  // console.log({nodes})
  const [ref, api] = useTrimesh(
    (index) => ({
      type: "Static",
      mass: 0,
      args: [
        nodes.Plane.geometry.attributes.position.array,
        nodes.Plane.geometry.index.array,
      ],
      onCollide: (e) => console.log("Collison", e),
      ...props,
    }),
    useRef()
  );

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        // material={{transparent:true,opacity:0.0}}
        material={nodes.Plane.material}
        // material={new THREE.MeshBasicMaterial()}
        // position={[-148.2, -0.08, -8.46]}
        
        position={[4.47, -0.08, -8.46]}
      />
    </group>
  );
}

export function OfficeCollider(props) {
  const COLLIDER_URL = `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/office/office_collider.glb`;
  const { nodes, materials } = useGLTF(COLLIDER_URL);
  // console.log({nodes});
  const [ref, api] = useTrimesh(
    (index) => ({
      type: "Static",
      mass: 0,
      args: [
        nodes["Cube001"].geometry.attributes.position.array,
        nodes["Cube001"].geometry.index.array,
      ],
      onCollide: (e) => console.log("Collison", e),
      ...props,
    }),
    useRef()
  );
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes["Cube001"].geometry}
        // material={{transparent:true,opacity:0.0}}

        material={nodes["Cube001"].material}
        // position={[-72.4, 0, 0]}
        scale={[35.26, 1, 12.36]}
      />
    </group>
  );
}

export function DomeCollider(props) {
  const COLLIDER_URL = `../assets/colliders/dome.glb`;
  const { nodes, materials } = useGLTF(COLLIDER_URL);
  const [ref, api] = useTrimesh(
    (index) => ({
      type: "Static",
      mass: 0,
      args: [
        nodes.Cube.geometry.attributes.position.array,
        nodes.Cube.geometry.index.array,
      ],
      onCollide: (e) => console.log("Collison", e),
      ...props,
    }),
    useRef()
  );
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        // material={{transparent:true,opacity:0.0}}

        material={nodes.Cube.material}
        scale={12.85}
      />
    </group>
  );
}

// useGLTF.preload(["/gallery.glb"]);
