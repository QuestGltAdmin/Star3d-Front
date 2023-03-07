import { usePlane } from '@react-three/cannon';

const Floor = (props) => {
  const [ref] = usePlane((index) => ({ type: 'Static', mass: 0, ...props }));

  return (
    <mesh receiveShadow rotation={props.rotation} ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={props.color} opacity={0.0} transparent />
    </mesh>
  );
};

export default Floor;
