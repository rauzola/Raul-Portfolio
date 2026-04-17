"use client";

import { useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { deterministicRange } from "@/lib/deterministic-random";
import * as THREE from "three";
import SceneCanvas from "./scene-canvas";

function ContactRing({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x = (Math.PI / 3) * index + state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * (0.1 + index * 0.05);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.8 + index * 0.3, 0.003, 8, 64]} />
      <meshBasicMaterial color="#00CFEA" transparent opacity={0.12 - index * 0.03} />
    </mesh>
  );
}

function OrbitDot({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = 0.3 + index * 0.08;
  const radius = 1.8 + (index % 3) * 0.3;
  const offset = (index / 6) * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(time) * radius;
    ref.current.position.y = Math.sin(time) * radius * 0.5;
    ref.current.position.z = Math.sin(time) * radius * 0.8;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={index % 2 ? "#0AEEB5" : "#00CFEA"} transparent opacity={0.7} />
    </mesh>
  );
}

function ContactOrb() {
  const ref = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
      wireRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#05080E" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#00CFEA"
          wireframe
          transparent
          opacity={0.15}
          emissive="#00CFEA"
          emissiveIntensity={0.2}
        />
      </mesh>
      {[0, 1, 2].map((index) => (
        <ContactRing key={index} index={index} />
      ))}
      {Array.from({ length: 6 }).map((_, index) => (
        <OrbitDot key={index} index={index} />
      ))}
    </group>
  );
}

function ContactParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(36 * 3);

    for (let index = 0; index < 36; index += 1) {
      const seed = index * 3;

      values[index * 3] = deterministicRange(seed + 1, -5, 5);
      values[index * 3 + 1] = deterministicRange(seed + 2, -4, 4);
      values[index * 3 + 2] = deterministicRange(seed + 3, -3, 3);
    }

    return values;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#00CFEA" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

const ContactScene3D = () => (
  <SceneCanvas className="absolute inset-0 pointer-events-none opacity-40" camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={0.2} />
    <pointLight position={[3, 3, 3]} intensity={0.6} color="#00CFEA" />
    <pointLight position={[-2, -2, 2]} intensity={0.3} color="#0AEEB5" />
    <Suspense fallback={null}>
      <ContactOrb />
      <ContactParticles />
    </Suspense>
  </SceneCanvas>
);

export default ContactScene3D;
