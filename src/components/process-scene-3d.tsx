"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { deterministicRange } from "@/lib/deterministic-random";
import * as THREE from "three";
import SceneCanvas from "./scene-canvas";

function ProcessNode({
  position,
  index,
  active,
}: {
  position: [number, number, number];
  index: number;
  active: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const color = active ? "#00CFEA" : "#243446";

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.5 + index;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.6 + index * 1.5) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={ref} position={position}>
        <mesh>
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={active ? 0.6 : 0.25}
            emissive={active ? "#00CFEA" : "#000000"}
            emissiveIntensity={active ? 0.4 : 0}
          />
        </mesh>
        {active ? (
          <mesh>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshBasicMaterial color="#00CFEA" transparent opacity={0.5} />
          </mesh>
        ) : null}
      </group>
    </Float>
  );
}

const NODE_POSITIONS: [number, number, number][] = [
  [-3, 0, 0],
  [-1, 0, 0],
  [1, 0, 0],
  [3, 0, 0],
];

function ProcessConnections() {
  const ref = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return NODE_POSITIONS.slice(0, -1).map((position, index) => {
      const next = NODE_POSITIONS[index + 1];
      const points = [new THREE.Vector3(...position), new THREE.Vector3(...next)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: "#00CFEA",
        transparent: true,
        opacity: 0.1,
      });

      return new THREE.Line(geometry, material);
    });
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.children.forEach((child, index) => {
      if (!(child as THREE.Line).isLine) return;

      ((child as THREE.Line).material as THREE.LineBasicMaterial).opacity =
        0.1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.08;
    });
  });

  return (
    <group ref={ref}>
      {lines.map((line, index) => (
        <primitive key={index} object={line} />
      ))}
    </group>
  );
}

function ProcessParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(22 * 3);

    for (let index = 0; index < 22; index += 1) {
      const seed = index * 3;

      values[index * 3] = deterministicRange(seed + 1, -5, 5);
      values[index * 3 + 1] = deterministicRange(seed + 2, -2, 2);
      values[index * 3 + 2] = deterministicRange(seed + 3, -2, 2);
    }

    return values;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00CFEA" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

const ProcessScene3D = () => (
  <div className="mb-8 h-[200px] w-full">
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#00CFEA" />
      <Suspense fallback={null}>
        {NODE_POSITIONS.map((position, index) => (
          <ProcessNode
            key={index}
            position={position}
            index={index}
            active={index === 0}
          />
        ))}
        <ProcessConnections />
        <ProcessParticles />
      </Suspense>
    </SceneCanvas>
  </div>
);

export default ProcessScene3D;
