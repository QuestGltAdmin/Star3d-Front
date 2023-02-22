import { useGLTF } from '@react-three/drei'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import * as THREE from 'three'

const THREE_PATH = `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/basis/`;
const KTX2_LOADER = new KTX2Loader().setTranscoderPath(THREE_PATH)


const MODEL_URLS =[
  `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/dome/star_dome_etc1s.glb`,
  `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/office/star_office_etc1s.glb`,
  `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/jewellery/star_jewellery_etc1s.glb`,
  `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/gallery/star_gallery_etc1s_1.glb`,
  `https://cychat-storage-bucket.s3.us-east-2.amazonaws.com/star/models/arena/star_arena_etc1s.glb`
]
useGLTF.preload(MODEL_URLS, true, true, (loader)=>{
  KTX2_LOADER.detectSupport(new THREE.WebGLRenderer()).dispose();
  loader.setKTX2Loader(KTX2_LOADER)
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
