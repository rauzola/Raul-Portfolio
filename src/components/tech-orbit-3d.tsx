"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { MutableRefObject, PointerEvent as ReactPointerEvent } from "react";
import { normalizePointer } from "@/lib/physics";
import type { PointerState } from "@/types/pointer";
import * as THREE from "three";
import SceneCanvas from "./scene-canvas";

const techNodes = [
  { color: "#61DAFB", pos: [2.5, 0.8, 0] as [number, number, number] },
  { color: "#ffffff", pos: [-2, 1.5, 0.5] as [number, number, number] },
  { color: "#3178C6", pos: [1.5, -1.2, 0.8] as [number, number, number] },
  { color: "#06B6D4", pos: [-1.8, -0.8, -0.5] as [number, number, number] },
  { color: "#0AEEB5", pos: [0, 2, -0.5] as [number, number, number] },
  { color: "#336791", pos: [-2.8, 0, 0.3] as [number, number, number] },
  { color: "#3ECF8E", pos: [2.8, -0.5, -0.3] as [number, number, number] },
  { color: "#5A67D8", pos: [0, -2, 0] as [number, number, number] },
  { color: "#ffffff", pos: [-0.5, 0.3, 1.5] as [number, number, number] },
];

function TechNode({
  color,
  position,
  index,
}: {
  color: string;
  position: [number, number, number];
  index: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const initialPosition = position;

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y =
      initialPosition[1] + Math.sin(state.clock.elapsedTime * 0.6 + index * 0.8) * 0.2;
    ref.current.position.x =
      initialPosition[0] + Math.cos(state.clock.elapsedTime * 0.4 + index * 0.5) * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 + index;
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh>
          <boxGeometry args={[0.8, 0.35, 0.06]} />
          <meshStandardMaterial color="#0B1220" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[0.84, 0.39, 0.02]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[-0.3, 0.08, 0.04]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitRing({ radius, speed, index }: { radius: number; speed: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.3;
    ref.current.rotation.z = state.clock.elapsedTime * speed * (index % 2 ? -1 : 1);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 8, 64]} />
      <meshBasicMaterial color="#00CFEA" transparent opacity={0.15} />
    </mesh>
  );
}

function CenterOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#00CFEA"
          wireframe
          transparent
          opacity={0.3}
          emissive="#00CFEA"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#05080E" metalness={0.8} roughness={0.2} />
      </mesh>
      {[1.2, 1.8, 2.5].map((radius, index) => (
        <OrbitRing key={radius} radius={radius} speed={0.3 + index * 0.15} index={index} />
      ))}
    </group>
  );
}

function ConnectingLines() {
  const ref = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return techNodes.map((node) => {
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.pos)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: "#00CFEA",
        transparent: true,
        opacity: 0.06,
      });

      return new THREE.Line(geometry, material);
    });
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.children.forEach((child, index) => {
      if (!(child as THREE.Line).isLine) return;

      ((child as THREE.Line).material as THREE.LineBasicMaterial).opacity =
        0.05 + Math.sin(state.clock.elapsedTime + index * 0.5) * 0.04;
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

function OrbitField({ pointerRef }: { pointerRef: MutableRefObject<PointerState> }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || !pointerRef.current) return;

    const targetX = pointerRef.current.x;
    const targetY = pointerRef.current.y;

    ref.current.rotation.y += (targetX * 0.28 - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (-targetY * 0.18 - ref.current.rotation.x) * 0.04;
    ref.current.position.x += (targetX * 0.22 - ref.current.position.x) * 0.04;
    ref.current.position.y += (targetY * 0.16 - ref.current.position.y) * 0.04;

    state.camera.position.x += (targetX * 0.18 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-targetY * 0.12 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref}>
      <CenterOrb />
      {techNodes.map((node, index) => (
        <TechNode key={index} color={node.color} position={node.pos} index={index} />
      ))}
      <ConnectingLines />
    </group>
  );
}

const TechOrbit3D = () => {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    pointerRef.current = normalizePointer(event, rect);
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div className="h-[400px] w-full" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 5.5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#00CFEA" />
        <pointLight position={[-3, -2, 2]} intensity={0.4} color="#0AEEB5" />
        <Suspense fallback={null}>
          <OrbitField pointerRef={pointerRef} />
        </Suspense>
      </SceneCanvas>
    </div>
  );
};

export default TechOrbit3D;
