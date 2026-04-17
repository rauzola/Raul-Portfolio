"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { deterministicRange } from "@/lib/deterministic-random";
import * as THREE from "three";
import SceneCanvas from "./scene-canvas";

interface ProjectShowcase3DProps {
  activeIndex: number;
  projects: Array<{
    color: string;
  }>;
}

function FloatingScreen({
  position,
  rotation,
  color,
  delay,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={ref} position={position} rotation={rotation}>
        <RoundedBox args={[2.4, 1.5, 0.08]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </RoundedBox>
        <RoundedBox position={[0, 0, 0.05]} args={[2.2, 1.3, 0.02]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#0A0F1A" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, -0.05]}>
          <ringGeometry args={[1.5, 1.7, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

function ParticlePoint({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const point = useMemo(() => {
    const seed = index * 10;

    return {
      x: deterministicRange(seed + 1, -6, 6),
      y: deterministicRange(seed + 2, -4, 4),
      z: deterministicRange(seed + 3, -6, 6),
      speed: deterministicRange(seed + 4, 0.2, 0.7),
    };
  }, [index]);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y = point.y + Math.sin(state.clock.elapsedTime * point.speed + index) * 0.5;
  });

  return (
    <mesh ref={ref} position={[point.x, point.y, point.z]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#00CFEA" transparent opacity={0.4} />
    </mesh>
  );
}

function Scene3D({ activeIndex, projects }: ProjectShowcase3DProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const targetRotation = -activeIndex * ((Math.PI * 2) / projects.length);
    ref.current.rotation.y += (targetRotation - ref.current.rotation.y) * 0.03;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00CFEA" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#0AEEB5" />
      <spotLight position={[0, 8, 0]} angle={0.4} penumbra={1} intensity={0.6} color="#00CFEA" />

      <group ref={ref}>
        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2;
          const radius = 3.5;

          return (
            <FloatingScreen
              key={`${project.color}-${index}`}
              position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
              rotation={[0, -angle + Math.PI, 0]}
              color={project.color}
              delay={index * 1.5}
            />
          );
        })}
      </group>

      {Array.from({ length: 24 }).map((_, index) => (
        <ParticlePoint key={index} index={index} />
      ))}
    </>
  );
}

const ProjectsShowcase3D = ({ activeIndex, projects }: ProjectShowcase3DProps) => (
  <div className="relative h-[420px] overflow-hidden rounded-[28px] border border-white/5 bg-[#0b1220] lg:h-[600px]">
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 7], fov: 50 }}>
      <Suspense fallback={null}>
        <Scene3D activeIndex={activeIndex} projects={projects} />
      </Suspense>
    </SceneCanvas>
  </div>
);

export default ProjectsShowcase3D;
