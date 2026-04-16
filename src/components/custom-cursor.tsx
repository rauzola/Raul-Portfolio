"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DOT = 5;
const RING = 28;
const RING_HOVER = 46;
const SPOT = 560;

export function CustomCursor() {
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);

  // Dot: very snappy
  const fastX = useSpring(rawX, { stiffness: 900, damping: 38, mass: 0.2 });
  const fastY = useSpring(rawY, { stiffness: 900, damping: 38, mass: 0.2 });

  // Ring: lags behind
  const slowX = useSpring(rawX, { stiffness: 160, damping: 22, mass: 0.5 });
  const slowY = useSpring(rawY, { stiffness: 160, damping: 22, mass: 0.5 });

  // Pre-center each element
  const dotX = useTransform(fastX, (v) => v - DOT / 2);
  const dotY = useTransform(fastY, (v) => v - DOT / 2);
  const ringX = useTransform(slowX, (v) => v - RING / 2);
  const ringY = useTransform(slowY, (v) => v - RING / 2);
  const spotX = useTransform(rawX, (v) => v - SPOT / 2);
  const spotY = useTransform(rawY, (v) => v - SPOT / 2);

  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHoverRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const next = !!target.closest(
        "a, button, input, textarea, select, label, [role='button']"
      );
      if (next !== isHoverRef.current) {
        isHoverRef.current = next;
        setIsHover(next);
      }
    };

    const onLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
    >
      {/* Spotlight */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: spotX,
          y: spotY,
          width: SPOT,
          height: SPOT,
          background:
            "radial-gradient(circle, rgba(0,207,234,0.06) 0%, rgba(0,207,234,0.02) 40%, transparent 70%)",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: isHover ? RING_HOVER : RING,
          height: isHover ? RING_HOVER : RING,
          borderColor: isHover
            ? "rgba(0,207,234,0.70)"
            : "rgba(0,207,234,0.40)",
          opacity: isVisible ? 1 : 0,
          scale: isHover ? 1.2 : 1,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {/* Dot */}
      <motion.div
        className="absolute rounded-full bg-[#00cfea]"
        style={{ x: dotX, y: dotY }}
        animate={{
          width: isHover ? 3 : DOT,
          height: isHover ? 3 : DOT,
          opacity: isVisible ? (isHover ? 0.55 : 1) : 0,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
