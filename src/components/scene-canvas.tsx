"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const isInView = useInView(containerRef, {
    margin: "220px 0px",
    amount: 0.05,
  });
  const [hasRendered, setHasRendered] = useState(eager);

  useEffect(() => {
    if (isInView) {
      setHasRendered(true);
    }
  }, [isInView]);

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
