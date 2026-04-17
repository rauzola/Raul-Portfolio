"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { calcDist } from "@/lib/physics";
import { SPRING_FLEE } from "@/lib/spring-configs";

interface FleeElementProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Raio (px) a partir do qual o elemento começa a fugir */
  radius?: number;
  /** Deslocamento máximo em px */
  strength?: number;
}

export const FleeElement = ({
  children,
  className = "",
  style,
  radius = 88,
  strength = 34,
}: FleeElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_FLEE);
  const springY = useSpring(y, SPRING_FLEE);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = calcDist(dx, dy);

      if (dist < radius && dist > 0.5) {
        const t = (radius - dist) / radius;
        const force = t * t * strength;
        x.set(-(dx / dist) * force);
        y.set(-(dy / dist) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [radius, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
