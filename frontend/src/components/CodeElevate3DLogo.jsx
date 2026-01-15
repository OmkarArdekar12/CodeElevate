import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const CameraController = ({ targetPosition }) => {
  const { camera } = useThree();
  const target = new THREE.Vector3(...targetPosition);

  useFrame(() => {
    camera.position.lerp(target, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const VisibilityFix = () => {
  const { invalidate } = useThree();

  useEffect(() => {
    const onChange = () => {
      if (document.visibilityState === "visible") {
        invalidate();
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [invalidate]);

  return null;
};

const ResizeFix = () => {
  const { gl, camera } = useThree();

  useEffect(() => {
    const resize = () => {
      gl.setSize(gl.domElement.clientWidth, gl.domElement.clientHeight);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, [gl, camera]);

  return null;
};

const useLogoTiltControls = (groupRef, meshRef) => {
  const isInteracting = useRef(false);
  const tilt = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const autoRotation = useRef(0);
  const last = useRef({ x: null, y: null });

  const MAX_TILT = Math.PI / 2 - 0.01;

  useFrame(() => {
    if (!groupRef.current || !meshRef.current) {
      return;
    }

    if (!isInteracting.current) {
      autoRotation.current += 0.003;
    }
    groupRef.current.rotation.y = autoRotation.current;

    tilt.current.x += velocity.current.x;
    tilt.current.y += velocity.current.y;

    velocity.current.x *= 0.9;
    velocity.current.y *= 0.9;

    if (!isInteracting.current) {
      tilt.current.x = THREE.MathUtils.lerp(tilt.current.x, 0, 0.06);
      tilt.current.y = THREE.MathUtils.lerp(tilt.current.y, 0, 0.06);
    }

    meshRef.current.rotation.x = THREE.MathUtils.clamp(
      tilt.current.x,
      -MAX_TILT,
      MAX_TILT
    );
    meshRef.current.rotation.y = THREE.MathUtils.clamp(
      tilt.current.y,
      -MAX_TILT,
      MAX_TILT
    );
  });

  return {
    onPointerDown: () => (isInteracting.current = true),
    onPointerUp: () => (isInteracting.current = false),
    onPointerLeave: () => (isInteracting.current = false),

    onPointerMove: (e) => {
      if (!isInteracting.current) {
        return;
      }

      const dx = e.movementX ?? e.touches?.[0]?.clientX - (last.current.x ?? 0);
      const dy = e.movementY ?? e.touches?.[0]?.clientY - (last.current.y ?? 0);

      last.current = {
        x: e.touches?.[0]?.clientX ?? null,
        y: e.touches?.[0]?.clientY ?? null,
      };

      velocity.current.y += THREE.MathUtils.clamp(dx * 0.004, -0.2, 0.2);
      velocity.current.x += THREE.MathUtils.clamp(dy * 0.004, -0.2, 0.2);
    },
  };
};

const Logo = ({ color, materialProps }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const geometry = useLoader(STLLoader, "/images/CodeElevate3DLogo.stl");

  geometry.center();
  geometry.computeBoundingBox();

  const size = new THREE.Vector3();
  geometry.boundingBox.getSize(size);
  const scale = 15 / Math.max(size.x, size.y, size.z);

  const handlers = useLogoTiltControls(groupRef, meshRef);

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        scale={[scale, scale, scale]}
        {...handlers}
      >
        <meshPhysicalMaterial color={color} {...materialProps} />
      </mesh>
    </group>
  );
};

const CodeElevate3DLogo = ({ cameraPosition = [0, 0, 39], showGold }) => {
  return (
    <div
      className="w-[200px] h-[250px] sm:w-[500px] sm:h-[500px] md:w-[648px] md:h-[700px] flex justify-center items-center cursor-grab active:cursor-grabbing"
      style={{ minHeight: "250px" }}
    >
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 39], fov: 45 }}
      >
        <VisibilityFix />
        <ResizeFix />
        <CameraController targetPosition={cameraPosition} />

        <ambientLight intensity={0.25} />
        <spotLight
          position={[0, 30, 0]}
          angle={0.35}
          penumbra={1}
          intensity={2.2}
        />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />
        <Environment preset="warehouse" />

        {showGold ? (
          <Logo
            color="#d4af37"
            materialProps={{
              metalness: 1,
              roughness: 0.12,
              clearcoat: 1,
              envMapIntensity: 2.4,
              sheen: 0.4,
            }}
          />
        ) : (
          <Logo
            color="#e6e6e6"
            materialProps={{
              metalness: 1,
              roughness: 0.08,
              clearcoat: 1,
              envMapIntensity: 2.1,
              sheen: 0.25,
            }}
          />
        )}
      </Canvas>
    </div>
  );
};

export default CodeElevate3DLogo;

// import React, { useRef, useEffect } from "react";
// import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
// import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// import { Environment } from "@react-three/drei";
// import * as THREE from "three";

// const CameraController = ({ targetPosition }) => {
//   const { camera } = useThree();
//   const target = new THREE.Vector3(...targetPosition);

//   useFrame(() => {
//     camera.position.lerp(target, 0.05);
//     camera.lookAt(0, 0, 0);
//   });

//   return null;
// };

// const VisibilityFix = () => {
//   const { invalidate } = useThree();

//   useEffect(() => {
//     const onChange = () => {
//       if (document.visibilityState === "visible") {
//         invalidate();
//       }
//     };
//     document.addEventListener("visibilitychange", onChange);
//     return () => document.removeEventListener("visibilitychange", onChange);
//   }, [invalidate]);

//   return null;
// };

// const ResizeFix = () => {
//   const { gl, camera } = useThree();

//   useEffect(() => {
//     const resize = () => {
//       gl.setSize(gl.domElement.clientWidth, gl.domElement.clientHeight);
//       camera.updateProjectionMatrix();
//     };
//     window.addEventListener("resize", resize);
//     window.addEventListener("orientationchange", resize);
//     return () => {
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("orientationchange", resize);
//     };
//   }, [gl, camera]);

//   return null;
// };

// const useLogoTiltControls = (groupRef, meshRef) => {
//   const isInteracting = useRef(false);
//   const tilt = useRef({ x: 0, y: 0 });
//   const velocity = useRef({ x: 0, y: 0 });
//   const autoRotation = useRef(0);

//   useFrame(() => {
//     if (!groupRef.current || !meshRef.current) return;

//     if (!isInteracting.current) {
//       autoRotation.current += 0.003;
//     }
//     groupRef.current.rotation.y = autoRotation.current;

//     tilt.current.x += velocity.current.x;
//     tilt.current.y += velocity.current.y;

//     velocity.current.x *= 0.92;
//     velocity.current.y *= 0.92;

//     if (!isInteracting.current) {
//       tilt.current.x = THREE.MathUtils.lerp(tilt.current.x, 0, 0.06);
//       tilt.current.y = THREE.MathUtils.lerp(tilt.current.y, 0, 0.06);
//     }

//     meshRef.current.rotation.x = tilt.current.x;
//     meshRef.current.rotation.y = tilt.current.y;
//   });

//   return {
//     onPointerDown: () => {
//       isInteracting.current = true;
//     },

//     onPointerUp: () => {
//       isInteracting.current = false;
//     },

//     onPointerLeave: () => {
//       isInteracting.current = false;
//     },

//     onPointerMove: (e) => {
//       if (!isInteracting.current) return;

//       velocity.current.y += THREE.MathUtils.clamp(
//         e.movementX * 0.002,
//         -0.14,
//         0.14
//       );

//       velocity.current.x += THREE.MathUtils.clamp(
//         e.movementY * 0.002,
//         -0.14,
//         0.14
//       );

//       tilt.current.y = THREE.MathUtils.clamp(tilt.current.y, -1.22, 1.22);
//       tilt.current.x = THREE.MathUtils.clamp(tilt.current.x, -1.22, 1.22);
//     },
//   };
// };

// const LogoMeshGold = () => {
//   const groupRef = useRef();
//   const meshRef = useRef();
//   const geometry = useLoader(STLLoader, "/images/CodeElevate3DLogo.stl");

//   geometry.center();
//   geometry.computeBoundingBox();

//   const box = geometry.boundingBox;
//   const size = new THREE.Vector3();
//   box.getSize(size);
//   const scale = 15 / Math.max(size.x, size.y, size.z);

//   const tiltHandlers = useLogoTiltControls(groupRef, meshRef);

//   return (
//     <group ref={groupRef}>
//       <mesh
//         ref={meshRef}
//         geometry={geometry}
//         scale={[scale, scale, scale]}
//         {...tiltHandlers}
//       >
//         <meshPhysicalMaterial
//           color="#d4af37"
//           metalness={1}
//           roughness={0.12}
//           clearcoat={1}
//           clearcoatRoughness={0.05}
//           envMapIntensity={2.4}
//           reflectivity={1}
//           sheen={0.4}
//           sheenColor="#ffffff"
//           sheenRoughness={0.25}
//         />
//       </mesh>
//     </group>
//   );
// };

// const LogoMeshSilver = () => {
//   const groupRef = useRef();
//   const meshRef = useRef();
//   const geometry = useLoader(STLLoader, "/images/CodeElevate3DLogo.stl");

//   geometry.center();
//   geometry.computeBoundingBox();

//   const box = geometry.boundingBox;
//   const size = new THREE.Vector3();
//   box.getSize(size);
//   const scale = 15 / Math.max(size.x, size.y, size.z);

//   const tiltHandlers = useLogoTiltControls(groupRef, meshRef);

//   return (
//     <group ref={groupRef}>
//       <mesh
//         ref={meshRef}
//         geometry={geometry}
//         scale={[scale, scale, scale]}
//         {...tiltHandlers}
//       >
//         <meshPhysicalMaterial
//           color="#e6e6e6"
//           metalness={1}
//           roughness={0.08}
//           clearcoat={1}
//           clearcoatRoughness={0.04}
//           envMapIntensity={2.1}
//           reflectivity={1}
//           sheen={0.25}
//           sheenColor="#ffffff"
//           sheenRoughness={0.18}
//         />
//       </mesh>
//     </group>
//   );
// };

// const CodeElevate3DLogo = ({ cameraPosition = [0, 0, 39], showGold }) => {
//   return (
//     <div
//       className="w-[200px] h-[250px] sm:w-[500px] sm:h-[500px] md:w-[648px] md:h-[700px] flex justify-center items-center cursor-grab active:cursor-grabbing"
//       style={{ minHeight: "250px" }}
//     >
//       <VisibilityFix />
//       <ResizeFix />
//       <Canvas
//         gl={{
//           preserveDrawingBuffer: true,
//           powerPreference: "high-performance",
//         }}
//         dpr={[1, 1.5]}
//         frameloop="always"
//         camera={{ position: [0, 0, 39], fov: 45 }}
//       >
//         <CameraController targetPosition={cameraPosition} />
//         <ambientLight intensity={0.25} />
//         <spotLight
//           position={[0, 30, 0]}
//           angle={0.35}
//           penumbra={1}
//           intensity={2.2}
//           castShadow
//         />
//         <directionalLight position={[10, 15, 10]} intensity={1.2} />
//         <pointLight position={[-10, -10, -10]} intensity={0.6} />
//         <Environment preset="warehouse" />
//         {showGold ? <LogoMeshGold /> : <LogoMeshSilver />}
//       </Canvas>
//     </div>
//   );
// };

// export default CodeElevate3DLogo;
