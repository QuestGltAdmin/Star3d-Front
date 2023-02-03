import React from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { Html } from "@react-three/drei";
import { extend } from "@react-three/fiber";
// import { GLTFLoader } from './three/GLTFLoader'
// import { DRACOLoader } from './three/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { KTX2Loader } from '~/three/KTX2Loader'

extend({});

const MANAGER = new THREE.LoadingManager();
const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
const DRACO_LOADER = new DRACOLoader(MANAGER).setDecoderPath(
  // `${THREE_PATH}/examples/js/libs/draco/gltf/`
  `/draco/gltf/`
);
const KTX2_LOADER = new KTX2Loader(MANAGER).setTranscoderPath(
  // `${THREE_PATH}/examples/js/libs/basis/`
  `/basis/`
);
const loader = new GLTFLoader(MANAGER)
  .setDRACOLoader(DRACO_LOADER)
  .setKTX2Loader(KTX2_LOADER);

export default function Model({ model_path }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    console.log(ref);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");
    const hemiLight = new THREE.HemisphereLight("#fff", "#000", 0.6);
    scene.add(hemiLight);
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(ref?.current?.clientWidth || 430, ref?.current?.clientHeight || 430);
    ref?.current?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 1000;
    controls.autoRotateSpeed = -1;
    controls.autoRotate = true;
    controls.screenSpacePanning = true;

    camera.position.z = 2;
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    loader.load(
      model_path,
      (gltf) => {
        // called when the resource is loaded
        const gltfScene = gltf.scene || gltf.scenes[0];
        scene.add(gltfScene);
      },
      (xhr) => {},
      (error) => {
        console.log("An error happened", error);
      }
    );
    animate();

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      camera.aspect = ref.current.clientWidth / ref.current.clientHeight || 390;
      camera.updateProjectionMatrix();

      renderer.setSize(
        ref.current.clientWidth,
        ref.current.clientHeight || 430
      );
    }

    return () => {
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);

  return (
    <Html>
      <div ref={ref} className="three-canvas"></div>
    </Html>
  );
}
