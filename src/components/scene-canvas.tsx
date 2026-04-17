"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SceneCanvasProps extends Omit<CanvasProps, "children" | "gl"> {
  children: ReactNode;
  className?: string;
  eager?: boolean;
}

const SceneCanvas = ({
  children,
  className,
  eager = false,
  dpr = [1, 1.15],
  ...props
}: SceneCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewOptions = {
    margin: "220px 0px",
    amount: 0.05,
  } as const;
  const isInView = useInView(containerRef, {
    ...inViewOptions,
  });
  const hasEnteredView = useInView(containerRef, {
    ...inViewOptions,
    once: true,
  });
  const hasRendered = eager || hasEnteredView;

  return (
    <div ref={containerRef} className={className}>
      {hasRendered ? (
        <Canvas
          {...props}
          dpr={dpr}
          frameloop={isInView ? "always" : "never"}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          performance={{ min: 0.5 }}
        >
          {children}
        </Canvas>
      ) : null}
    </div>
  );
};

export default SceneCanvas;
