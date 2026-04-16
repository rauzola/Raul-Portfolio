"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  perspective?: number;
}

const Tilt3DCard = ({
  children,
  className = "",
  intensity = 10,
  glare = true,
  perspective = 900,
}: Tilt3DCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * intensity;
      const rotateY = (x - 0.5) * intensity;

      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glare && glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0,207,234,0.18) 0%, rgba(0,207,234,0.04) 50%, transparent 70%)`;
        glareRef.current.style.opacity = "1";
      }

      if (borderRef.current) {
        borderRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0,207,234,0.55) 0%, transparent 55%)`;
        borderRef.current.style.opacity = "1";
      }
    },
    [glare, intensity, perspective]
  );

  const handlePointerLeave = useCallback(() => {
    if (!cardRef.current) return;

    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }

    if (borderRef.current) {
      borderRef.current.style.opacity = "0";
    }
  }, [perspective]);

  return (
    <div
      className={`relative ${className}`}
      style={{ padding: "1px" }}
    >
      {/* Border spotlight layer */}
      <div
        ref={borderRef}
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{ borderRadius: "inherit" }}
      />

      {/* Card with tilt */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d", borderRadius: "inherit" }}
      >
        {children}
        {glare ? (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Tilt3DCard;
