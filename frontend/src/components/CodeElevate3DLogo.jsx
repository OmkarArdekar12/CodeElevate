import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const LogoMeshGold = () => {
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
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2.4}
        reflectivity={1}
        sheen={0.4}
        sheenColor="#ffffff"
        sheenRoughness={0.25}
      />
    </mesh>
  );
};

const LogoMeshSilver = () => {
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
        color="#e6e6e6"
        metalness={1}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.04}
        envMapIntensity={2.1}
        reflectivity={1}
        sheen={0.25}
        sheenColor="#ffffff"
        sheenRoughness={0.18}
      />
      ;
    </mesh>
  );
};

const Logo3DGold = ({ cameraPosition = [0, 0, 39], showGold }) => {
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
          environmentIntensity={1.6}
          background={false}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[20, 20, 10]} angle={0.3} intensity={1} />
        {showGold ? <LogoMeshGold /> : <LogoMeshSilver />}
      </Canvas>
    </div>
  );
};

export default Logo3DGold;
