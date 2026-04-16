"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import SceneCanvas from "./scene-canvas";

interface PointerState {
  x: number;
  y: number;
}

// ── Physics constants (world units) ───────────────────────────────────────────
const REPEL_DIST     = 3.2;   // world-unit radius where shapes start fleeing
const REPEL_STRENGTH = 0.16;  // push force
const SPRING_K       = 0.032; // pull-back stiffness
const DAMPING        = 0.80;  // velocity damping per frame

// ── Particles ─────────────────────────────────────────────────────────────────
function Particles({ count = 130 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      values[i * 3]     = (Math.random() - 0.5) * 22;
      values[i * 3 + 1] = (Math.random() - 0.5) * 15;
      values[i * 3 + 2] = (Math.random() - 0.5) * 11;
    }
    return values;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.009) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#00CFEA" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// ── Single floating shape with flee physics ────────────────────────────────────
type ShapeKind = "icosahedron" | "octahedron" | "tetrahedron" | "dodecahedron";

function FloatingShape({
  position,
  shape,
  color,
  scale,
  speed,
  pointerRef,
}: {
  position: readonly [number, number, number];
  shape: ShapeKind;
  color: string;
  scale: number;
  speed: number;
  pointerRef: MutableRefObject<PointerState>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  // Physics state — stored in refs to avoid re-renders
  const pxRef = useRef(position[0]);
  const pyRef = useRef(position[1]);
  const vxRef = useRef(0);
  const vyRef = useRef(0);

  useFrame((state) => {
    if (!ref.current) return;

    // Convert normalised pointer (-0.5…0.5) → world units at z = 0
    const cursorX = pointerRef.current.x * state.viewport.width;
    const cursorY = pointerRef.current.y * state.viewport.height;

    const dx   = pxRef.current - cursorX;
    const dy   = pyRef.current - cursorY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Repulsion when cursor is close
    if (dist < REPEL_DIST && dist > 0.001) {
      const t     = (REPEL_DIST - dist) / REPEL_DIST;
      const force = t * t * REPEL_STRENGTH;
      vxRef.current += (dx / dist) * force;
      vyRef.current += (dy / dist) * force;
    }

    // Spring back toward home position
    vxRef.current += (position[0] - pxRef.current) * SPRING_K;
    vyRef.current += (position[1] - pyRef.current) * SPRING_K;

    // Velocity damping
    vxRef.current *= DAMPING;
    vyRef.current *= DAMPING;

    pxRef.current += vxRef.current;
    pyRef.current += vyRef.current;

    // Vertical bob — fades when shape is moving fast (fleeing)
    const spd2      = vxRef.current * vxRef.current + vyRef.current * vyRef.current;
    const calmFactor = 1 / (1 + spd2 * 6);
    const bob        = Math.sin(state.clock.elapsedTime * speed) * 0.4 * calmFactor;

    ref.current.position.x = pxRef.current;
    ref.current.position.y = pyRef.current + bob;
    // z is intentionally unchanged

    // Spin — slightly faster while fleeing
    const spinBoost = 1 + Math.sqrt(spd2) * 0.8;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5 * spinBoost;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.3 * spinBoost;
  });

  return (
    <mesh ref={ref} position={[...position] as [number, number, number]} scale={scale}>
      {shape === "octahedron"   && <octahedronGeometry   args={[1, 0]} />}
      {shape === "tetrahedron"  && <tetrahedronGeometry  args={[1, 0]} />}
      {shape === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
      {shape === "icosahedron"  && <icosahedronGeometry  args={[1, 0]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
        emissive={color}
        emissiveIntensity={0.22}
      />
    </mesh>
  );
}

// ── Shape roster — original 6 + 7 new ─────────────────────────────────────────
const SHAPES: {
  position: readonly [number, number, number];
  shape: ShapeKind;
  color: string;
  scale: number;
  speed: number;
}[] = [
  // Original
  { position: [-4,  2, -3], shape: "icosahedron",  color: "#00CFEA", scale: 0.30, speed: 0.80 },
  { position: [ 5, -1, -4], shape: "octahedron",   color: "#0AEEB5", scale: 0.25, speed: 1.20 },
  { position: [-3, -2, -2], shape: "tetrahedron",  color: "#00CFEA", scale: 0.20, speed: 0.60 },
  { position: [ 4,  3, -5], shape: "dodecahedron", color: "#0AEEB5", scale: 0.15, speed: 1.00 },
  { position: [ 0, -3, -3], shape: "octahedron",   color: "#00CFEA", scale: 0.18, speed: 0.90 },
  { position: [-5,  0, -6], shape: "icosahedron",  color: "#F5A623", scale: 0.12, speed: 0.70 },
  // New
  { position: [ 2,  4, -4], shape: "tetrahedron",  color: "#00CFEA", scale: 0.14, speed: 1.10 },
  { position: [-2,  3.5,-5], shape: "dodecahedron",color: "#0AEEB5", scale: 0.16, speed: 0.85 },
  { position: [ 6,  1, -6], shape: "icosahedron",  color: "#00CFEA", scale: 0.10, speed: 1.30 },
  { position: [-6, -2, -5], shape: "octahedron",   color: "#0AEEB5", scale: 0.13, speed: 0.75 },
  { position: [ 3, -4, -4], shape: "tetrahedron",  color: "#F5A623", scale: 0.11, speed: 1.05 },
  { position: [-1, -4, -2], shape: "icosahedron",  color: "#00CFEA", scale: 0.22, speed: 0.65 },
  { position: [ 1,  5, -5], shape: "octahedron",   color: "#0AEEB5", scale: 0.12, speed: 0.95 },
];

function FloatingGeometries({ pointerRef }: { pointerRef: MutableRefObject<PointerState> }) {
  const ref = useRef<THREE.Group>(null);

  // Restore the original slow ambient rotation of the whole group
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={ref}>
      {SHAPES.map((s, i) => (
        <FloatingShape key={i} {...s} pointerRef={pointerRef} />
      ))}
    </group>
  );
}

// ── Connection lines ───────────────────────────────────────────────────────────
function ConnectionLines() {
  const ref = useRef<THREE.Group>(null);

  const lineObjects = useMemo(() => {
    return Array.from({ length: 14 }).map(() => {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 9,
      );
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 7,
        start.y + (Math.random() - 0.5) * 5,
        start.z + (Math.random() - 0.5) * 4,
      );
      const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const mat = new THREE.LineBasicMaterial({ color: "#00CFEA", transparent: true, opacity: 0.07 });
      return new THREE.Line(geo, mat);
    });
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      if (child instanceof THREE.Line) {
        (child.material as THREE.LineBasicMaterial).opacity =
          0.07 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.04;
      }
    });
  });

  return (
    <group ref={ref}>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

// ── Camera + ambient parallax rig ─────────────────────────────────────────────
function HeroRig({ pointerRef }: { pointerRef: MutableRefObject<PointerState> }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const tx = pointerRef.current.x;
    const ty = pointerRef.current.y;

    ref.current.rotation.y += (tx *  0.22 - ref.current.rotation.y) * 0.035;
    ref.current.rotation.x += (-ty * 0.14 - ref.current.rotation.x) * 0.035;
    ref.current.position.x += (tx *  0.45 - ref.current.position.x) * 0.035;
    ref.current.position.y += (ty *  0.28 - ref.current.position.y) * 0.035;

    state.camera.position.x += (tx *  0.35 - state.camera.position.x) * 0.028;
    state.camera.position.y += (-ty * 0.24 - state.camera.position.y) * 0.028;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref}>
      <Particles />
      <FloatingGeometries pointerRef={pointerRef} />
      <ConnectionLines />
    </group>
  );
}

// ── Scene root ─────────────────────────────────────────────────────────────────
const HeroScene3D = ({ pointerRef }: { pointerRef: MutableRefObject<PointerState> }) => (
  <SceneCanvas
    className="absolute inset-0 pointer-events-none opacity-90"
    camera={{ position: [0, 0, 6], fov: 60 }}
    eager
  >
    <ambientLight intensity={0.2} />
    <pointLight position={[5,  5, 5]} intensity={0.5} color="#00CFEA" />
    <pointLight position={[-5,-3, 3]} intensity={0.3} color="#0AEEB5" />
    <HeroRig pointerRef={pointerRef} />
  </SceneCanvas>
);

export default HeroScene3D;
