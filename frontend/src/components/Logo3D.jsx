import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const LogoMesh = () => {
  const meshRef = useRef();
  const geometry = useLoader(STLLoader, "/images/logo.stl");

  // Center geometry
  geometry.center();

  // Optional: compute bounding box to auto-scale
  const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 20 / maxDim; // scale to fit

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      scale={[scale, scale, scale]}
      // rotation={[Math.PI / 2, 0, 0]} // rotate flat models
    >
      <meshStandardMaterial color="#f80000" metalness={0.6} roughness={0.3} />
    </mesh>
  );
};

const Logo3D = () => {
  return (
    <Canvas
      className="logo"
      style={{ width: "200px", height: "300px" }}
      // camera={{ position: [0, 0, 50], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <LogoMesh />
    </Canvas>
  );
};

export default Logo3D;
