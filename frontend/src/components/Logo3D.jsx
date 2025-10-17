import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

const LogoMesh = () => {
  const meshRef = useRef();
  const geometry = useLoader(STLLoader, "/images/CodeElevate3DLogo.stl");

  geometry.center();
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 15 / maxDim;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[scale, scale, scale]}>
      <meshPhysicalMaterial
        color="#e0e0e0"
        metalness={1}
        roughness={0.09}
        clearcoat={0.9}
        clearcoatRoughness={0.06}
        envMapIntensity={1.8}
      />
      ;
    </mesh>
  );
};

const Logo3D = ({ cameraPosition = [0, 0, 39] }) => {
  return (
    <div className="w-[200px] h-[250px] sm:w-[500px] sm:h-[500px] md:w-[648px] md:h-[700px] flex justify-center items-center">
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.25} />
        <Environment
          preset="city"
          environmentIntensity={1.5}
          background={false}
        />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[20, 20, 10]} angle={0.3} intensity={1} />
        <LogoMesh />
      </Canvas>
    </div>
  );
};

export default Logo3D;
