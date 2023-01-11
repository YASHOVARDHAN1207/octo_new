import React from "react";
import { Canvas } from "@react-three/fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function HumanAvatar() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight intensity={1} position={[10, 10, 10]} />
      <GLTFLoader
        url="human-avatar.gltf"
        onLoad={(gltf) => {
          gltf.scene.scale.set(0.1, 0.1, 0.1);
          return <primitive object={gltf.scene} />;
        }}
      />
    </Canvas>
  );
}

export default HumanAvatar;
