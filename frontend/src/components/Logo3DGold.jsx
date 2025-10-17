import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

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
        color="#d4af37"
        metalness={1}
        roughness={0.12}
        clearcoat={0.9}
        clearcoatRoughness={0.08}
        envMapIntensity={1.9}
      />
    </mesh>
  );
};

const Logo3DGold = ({ width = 200, height = 250 }) => {
  return (
    <div
      className="logo-container"
      style={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 40], fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.25} />
        <Environment
          preset="city"
          environmentIntensity={1.6}
          background={false}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[20, 20, 10]} angle={0.3} intensity={1} />
        <LogoMesh />
      </Canvas>
    </div>
  );
};

export default Logo3DGold;
