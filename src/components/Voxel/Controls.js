import React, { useRef } from "react";
import { useFrame, useThree } from '@react-three/fiber'
const Controls = () => {
  const { camera } = useThree();
  const orbitRef = useRef()
  useFrame(() => {
    // @ts-ignore
    orbitRef.current.update()
  })

  return (
    <orbitControls
      args={[camera]}
      ref={orbitRef}
      enableZoom={false}
      enableKeys={false}
      minPolarAngle={Math.PI / 2.5}
      maxPolarAngle={Math.PI / 1.7}
      minAzimuthAngle={-Math.PI / 16}
      maxAzimuthAngle={Math.PI / 16}
      enableDamping
      dampingFactor={0.07}
    />
  );
};

export default Controls
