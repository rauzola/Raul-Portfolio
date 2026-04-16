"use client";

import { useEffect, useRef } from "react";

// ── Physics constants ──────────────────────────────────────────────────────────
const REPEL_RADIUS  = 190;   // px — zone where diamonds start fleeing
const REPEL_STRENGTH = 6.2;  // push force multiplier
const SPRING_K      = 0.038; // pull-back stiffness
const DAMPING       = 0.74;  // velocity damping per frame

// ── Diamond definitions (hxPct / hyPct = % of container width / height) ───────
const DEFS = [
  // Corner / edge anchors — large & subtle
  { hxPct:  4, hyPct: 16, size: 34, opacity: 0.18, color: "#00CFEA", baseRot:  0, driftAmp: 14, driftSpeed: 0.65, driftPhase: 0.0, hollow: true  },
  { hxPct: 94, hyPct: 10, size: 22, opacity: 0.16, color: "#0AEEB5", baseRot: 12, driftAmp:  9, driftSpeed: 1.05, driftPhase: 1.2, hollow: false },
  { hxPct: 88, hyPct: 78, size: 42, opacity: 0.09, color: "#00CFEA", baseRot: -8, driftAmp: 18, driftSpeed: 0.50, driftPhase: 0.7, hollow: true  },
  { hxPct: 13, hyPct: 82, size: 18, opacity: 0.22, color: "#0AEEB5", baseRot: 20, driftAmp: 11, driftSpeed: 1.25, driftPhase: 2.0, hollow: false },
  { hxPct:  1, hyPct: 52, size: 52, opacity: 0.06, color: "#0AEEB5", baseRot:  5, driftAmp: 24, driftSpeed: 0.38, driftPhase: 1.8, hollow: true  },
  { hxPct: 98, hyPct: 49, size: 26, opacity: 0.17, color: "#00CFEA", baseRot:-22, driftAmp: 13, driftSpeed: 0.95, driftPhase: 4.2, hollow: false },

  // Mid-field — scattered
  { hxPct: 47, hyPct:  3, size: 15, opacity: 0.20, color: "#00CFEA", baseRot:-14, driftAmp:  6, driftSpeed: 0.90, driftPhase: 3.5, hollow: false },
  { hxPct: 62, hyPct:  6, size: 22, opacity: 0.18, color: "#0AEEB5", baseRot: 14, driftAmp:  8, driftSpeed: 1.10, driftPhase: 5.1, hollow: true  },
  { hxPct: 24, hyPct:  9, size: 28, opacity: 0.14, color: "#00CFEA", baseRot: 18, driftAmp: 11, driftSpeed: 0.78, driftPhase: 3.8, hollow: false },
  { hxPct: 32, hyPct: 95, size: 19, opacity: 0.17, color: "#0AEEB5", baseRot: 30, driftAmp:  9, driftSpeed: 1.35, driftPhase: 2.8, hollow: false },
  { hxPct: 71, hyPct: 91, size: 30, opacity: 0.12, color: "#00CFEA", baseRot:-18, driftAmp: 15, driftSpeed: 0.62, driftPhase: 0.4, hollow: true  },
  { hxPct: 44, hyPct: 97, size: 24, opacity: 0.15, color: "#00CFEA", baseRot:-10, driftAmp: 10, driftSpeed: 1.05, driftPhase: 0.9, hollow: false },

  // Interior accent — small & bright
  { hxPct: 21, hyPct: 33, size: 11, opacity: 0.26, color: "#00CFEA", baseRot:-35, driftAmp:  4, driftSpeed: 1.65, driftPhase: 3.2, hollow: false },
  { hxPct: 78, hyPct: 26, size: 14, opacity: 0.19, color: "#0AEEB5", baseRot: 25, driftAmp:  6, driftSpeed: 0.92, driftPhase: 1.5, hollow: true  },
  { hxPct: 55, hyPct: 47, size:  9, opacity: 0.28, color: "#0AEEB5", baseRot:  0, driftAmp:  3, driftSpeed: 2.00, driftPhase: 1.0, hollow: false },
  { hxPct: 76, hyPct: 56, size: 13, opacity: 0.22, color: "#0AEEB5", baseRot:-28, driftAmp:  5, driftSpeed: 1.70, driftPhase: 0.6, hollow: true  },
  { hxPct: 91, hyPct: 62, size: 16, opacity: 0.20, color: "#00CFEA", baseRot: 40, driftAmp:  7, driftSpeed: 1.30, driftPhase: 2.5, hollow: false },
  { hxPct: 11, hyPct: 63, size: 44, opacity: 0.07, color: "#00CFEA", baseRot: -5, driftAmp: 22, driftSpeed: 0.36, driftPhase: 4.0, hollow: true  },
] as const;

interface State {
  x: number;  y: number;
  vx: number; vy: number;
  homeX: number; homeY: number;
  size: number;
  driftAmp: number;
  driftSpeed: number;
  driftPhase: number;
  baseRot: number;
}

export default function HeroDiamonds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statesRef   = useRef<State[]>([]);
  const domRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef   = useRef({ x: -9999, y: -9999 });
  const rafRef      = useRef(0);
  const t0Ref       = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Init physics state ─────────────────────────────────────────────────────
    const initStates = () => {
      const { width, height } = container.getBoundingClientRect();
      statesRef.current = DEFS.map((d) => {
        const homeX = (d.hxPct / 100) * width;
        const homeY = (d.hyPct / 100) * height;
        return { x: homeX, y: homeY, vx: 0, vy: 0, homeX, homeY,
          size: d.size, driftAmp: d.driftAmp, driftSpeed: d.driftSpeed,
          driftPhase: d.driftPhase, baseRot: d.baseRot };
      });
    };
    initStates();

    // ── Event listeners ────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      cursorRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { cursorRef.current = { x: -9999, y: -9999 }; };
    const onResize = () => initStates();

    window.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    // ── Animation loop ─────────────────────────────────────────────────────────
    const tick = (ts: number) => {
      if (!t0Ref.current) t0Ref.current = ts;
      const elapsed = (ts - t0Ref.current) * 0.001;

      const cx = cursorRef.current.x;
      const cy = cursorRef.current.y;

      statesRef.current.forEach((s, i) => {
        const el = domRefs.current[i];
        if (!el) return;

        // Repulsion
        const dx = s.x - cx;
        const dy = s.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0.01) {
          const t = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          const force = t * t * REPEL_STRENGTH;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }

        // Spring back to home
        s.vx += (s.homeX - s.x) * SPRING_K;
        s.vy += (s.homeY - s.y) * SPRING_K;

        // Damping
        s.vx *= DAMPING;
        s.vy *= DAMPING;

        s.x += s.vx;
        s.y += s.vy;

        // Gentle vertical drift — fades out when fleeing fast
        const speed  = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const calm   = 1 / (1 + speed * 0.35);
        const drift  = Math.sin(elapsed * s.driftSpeed + s.driftPhase) * s.driftAmp * calm;

        // Tilt based on velocity direction
        const tilt = Math.min(speed * 5.5, 30) * (s.vx >= 0 ? 1 : -1);

        const px  = (s.x - s.size / 2).toFixed(2);
        const py  = (s.y + drift - s.size / 2).toFixed(2);
        const rot = (45 + s.baseRot + tilt).toFixed(2);

        el.style.transform = `translate(${px}px,${py}px) rotate(${rot}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // Hidden on mobile — pointer-events-none so it never blocks clicks
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      {DEFS.map((def, i) => (
        <div
          key={i}
          ref={(el) => { domRefs.current[i] = el; }}
          className="absolute left-0 top-0"
          style={{
            width:  def.size,
            height: def.size,
            backgroundColor: def.hollow ? "transparent" : `${def.color}12`,
            border: `1.5px solid ${def.color}`,
            opacity: def.opacity,
            willChange: "transform",
            /* Start off-screen so the initial render has no flash near the nav */
            transform: "translate(-9999px, -9999px)",
            boxShadow: `0 0 ${Math.round(def.size * 0.65)}px ${def.color}28, inset 0 0 ${Math.round(def.size * 0.3)}px ${def.color}10`,
          }}
        />
      ))}
    </div>
  );
}
