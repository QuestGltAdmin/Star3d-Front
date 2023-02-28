import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useMemo } from 'react'
import { BufferAttribute } from 'three'

export default function Stars({ count = 2000 }) {
  // const star = useTexture("star.jpg")
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 7.5)
    return new BufferAttribute(new Float32Array(p), 3)
  }, [count])

  const positions = useMemo(() => {
    let p = []
    for (let i = 0; i < count; i++) {
      const r = 4000
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const y = r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000)
      p.push(x)
      p.push(y)
      p.push(z)
    }
    return new BufferAttribute(new Float32Array(p), 3)
  }, [count])

  

  useFrame((state) => {
    const { camera, mouse, scene } = state
    // camera.position.x += (mouse.x - camera.position.x) * 0.005
    // camera.position.y += (-mouse.y - camera.position.y) * 0.005
    // camera.position.z += (-camera.position.z) * 0.005

    // camera.lookAt(scene.position)
    // camera.position.lerp(scene.position)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={'attributes-position'} {...positions} />
      </bufferGeometry>
      <pointsMaterial size={35} color={0xffffff} sizeAttenuation={true} />
      {/* <bufferGeometry>
        <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions} itemSize={5} />
      </bufferGeometry>
      <pointsMaterial size={15} sizeAttenuation color="white" fog={false} /> */}
    </points>
  )
}
