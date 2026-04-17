"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, CSSProperties } from "react";
import { normalizePointer } from "@/lib/physics";
import { SPRING_HERO_GLOW } from "@/lib/spring-configs";
import { handleMagnetMove, handleMagnetLeave } from "@/lib/magnet";
import type { Copy } from "@/config/copy";
import type { PointerState } from "@/types/pointer";
import { FleeElement } from "@/components/flee-element";

const HeroScene3D = dynamic(() => import("@/components/hero-scene-3d"), { ssr: false });
const HeroDiamonds = dynamic(() => import("@/components/hero-diamonds"), { ssr: false });

interface MetricParts {
  before: string;
  prefix: string;
  number: number;
  suffix: string;
  after: string;
}

function parseMetricValue(value: string): MetricParts | null {
  const match = value.match(/([#+]?)(\d+)([%+]*)/);
  if (!match || match.index === undefined) return null;
  const [token, prefix, numericValue, suffix] = match;
  return {
    before: value.slice(0, match.index),
    prefix,
    number: Number(numericValue),
    suffix,
    after: value.slice(match.index + token.length),
  };
}

function AnimatedMetric({ value }: { value: string }) {
  const metric = useMemo(() => parseMetricValue(value), [value]);
  const [displayNumber, setDisplayNumber] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!metric || !isInView) return;
    let frame = 0;
    let start: number | null = null;
    const duration = 900;
    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNumber(Math.round(metric.number * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [metric, isInView]);

  if (!metric) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {metric.before}{metric.prefix}{displayNumber}{metric.suffix}{metric.after}
    </span>
  );
}

interface Props {
  copy: Copy["hero"];
  whatsappLink: string;
}

export function HeroSection({ copy, whatsappLink }: Props) {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, SPRING_HERO_GLOW);
  const springY = useSpring(pointerY, SPRING_HERO_GLOW);
  const glowMainX = useTransform(springX, (v) => v * 36);
  const glowMainY = useTransform(springY, (v) => v * 26);
  const glowLeftX = useTransform(springX, (v) => v * -44);
  const glowLeftY = useTransform(springY, (v) => v * -18);
  const glowRightX = useTransform(springX, (v) => v * 52);
  const glowRightY = useTransform(springY, (v) => v * 22);
  const gridX = useTransform(springX, (v) => v * 30);
  const gridY = useTransform(springY, (v) => v * 18);
  const gridRotateY = useTransform(springX, (v) => v * 8);
  const gridRotateX = useTransform(springY, (v) => 66 - v * 4);

  const wordmarkRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let start = 0;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      if (!isInteractingRef.current && wordmarkRef.current) {
        const elapsed = timestamp - start;
        const rotateY = Math.sin(elapsed / 950) * 4;
        const rotateX = Math.cos(elapsed / 1200) * -2;
        wordmarkRef.current.style.transform =
          `perspective(800px) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg)`;
      }
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const { x, y } = normalizePointer(event, rect);
    pointerRef.current = { x, y };
    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleWordmarkMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!wordmarkRef.current) return;
    isInteractingRef.current = true;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    wordmarkRef.current.style.transform =
      `perspective(800px) rotateY(${(x * 16).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) scale(1.015)`;
  };

  const handleWordmarkEnter = () => {
    isInteractingRef.current = true;
    if (wordmarkRef.current)
      wordmarkRef.current.style.transform = "perspective(800px) rotateY(6deg) rotateX(-3deg) scale(1.015)";
  };

  const handleWordmarkLeave = () => {
    isInteractingRef.current = false;
    if (wordmarkRef.current)
      wordmarkRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28 md:px-10 md:pt-32"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <HeroScene3D pointerRef={pointerRef} />
      <HeroDiamonds />

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-1/2 top-16 -translate-x-1/2">
          <motion.div
            className="h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,207,234,0.18),transparent_68%)] blur-2xl"
            style={{ x: glowMainX, y: glowMainY }}
          />
        </div>
        <motion.div
          className="absolute -left-20 top-24 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(10,238,181,0.08),transparent_72%)] blur-3xl"
          style={{ x: glowLeftX, y: glowLeftY }}
        />
        <motion.div
          className="absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(109,88,255,0.08),transparent_70%)] blur-3xl"
          style={{ x: glowRightX, y: glowRightY }}
        />
        <motion.div
          className="absolute bottom-[-56px] left-[-10%] right-[-10%] h-[58%]"
          style={{ x: gridX, y: gridY, rotateY: gridRotateY, rotateX: gridRotateX, transformPerspective: 650 }}
        >
          <div
            className="h-full w-full animate-grid-drift"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,207,234,0.08) 59px, rgba(0,207,234,0.08) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,207,234,0.08) 59px, rgba(0,207,234,0.08) 60px)",
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-9 inline-flex items-center gap-2 rounded-full border border-[rgba(0,207,234,0.22)] bg-[rgba(0,207,234,0.08)] px-4 py-1.5 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[#00cfea]"
        >
          <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
          {copy.badge} · {copy.badgeDetail}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-5 cursor-default [perspective:800px]"
          onPointerEnter={handleWordmarkEnter}
          onPointerMove={handleWordmarkMove}
          onPointerLeave={handleWordmarkLeave}
        >
          <div
            ref={wordmarkRef}
            className="inline-block transform-gpu transition-transform duration-150 ease-out [transform-style:preserve-3d]"
          >
            <h1 className="mx-auto w-[min(80vw,560px)] drop-shadow-[0_0_26px_rgba(0,207,234,0.12)] md:w-[min(72vw,620px)]">
              <span className="sr-only">{`${copy.titleTop} ${copy.titleBottom}`}</span>
              <Image
                src="/logo/svg-transparente/sigoli-v2-dark-sem-tagline.svg"
                alt=""
                width={900}
                height={320}
                priority
                aria-hidden="true"
                className="h-auto w-full"
              />
              <span className="mt-6 block max-w-[18ch] text-balance text-center font-display text-[clamp(1.45rem,3vw,2.35rem)] font-bold leading-[1.02] tracking-[-0.035em] text-[#dce7f2] md:max-w-[20ch]">
                {copy.visibleHeading}
              </span>
            </h1>
            <span className="font-mono-ui mt-[18px] block text-[11px] uppercase tracking-[0.2em] text-[#243446]">
              {copy.kicker}
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mb-6 max-w-[640px] text-balance text-base leading-8 text-[#8aa2b8] md:text-lg"
        >
          {copy.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72 }}
          className="mb-10 flex flex-wrap justify-center gap-2.5"
        >
          {copy.highlights.map((item) => (
            <FleeElement
              key={item}
              className="rounded-full border border-white/10 bg-[#0b1220]/80 px-4 py-2 text-xs text-[#8aa2b8] backdrop-blur-md"
              radius={96}
              strength={38}
            >
              {item}
            </FleeElement>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.84 }}
          className="mb-14 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#00cfea] px-7 py-3.5 text-[15px] font-medium text-[#05080e] shadow-[0_0_36px_rgba(0,207,234,0.22)] transition-transform duration-200 hover:brightness-110 will-change-transform"
            onPointerMove={handleMagnetMove}
            onPointerLeave={handleMagnetLeave}
          >
            {copy.primaryCta}
          </Link>
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-[10px] border border-white/10 px-7 py-3.5 text-[15px] text-[#dce7f2] transition-transform duration-200 hover:border-[rgba(0,207,234,0.35)] hover:text-[#00cfea] will-change-transform"
            onPointerMove={handleMagnetMove}
            onPointerLeave={handleMagnetLeave}
          >
            {copy.secondaryCta}
          </Link>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-[10px] border border-[rgba(0,207,234,0.2)] bg-[rgba(0,207,234,0.08)] px-7 py-3.5 text-[15px] text-[#dce7f2] transition-transform duration-200 hover:border-[rgba(0,207,234,0.35)] hover:text-[#00cfea] will-change-transform"
            onPointerMove={handleMagnetMove}
            onPointerLeave={handleMagnetLeave}
          >
            WhatsApp
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.96 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {copy.stats.map((stat, index) => (
            <FleeElement
              key={stat.label}
              className="animate-float-gentle rounded-full border border-white/5 bg-[#0b1220] px-5 py-3 text-left"
              style={{ animationDelay: `${index * 0.8}s` } as CSSProperties}
              radius={100}
              strength={42}
            >
              <div className="font-display text-lg font-extrabold tracking-[-0.03em] text-[#dce7f2]">
                <AnimatedMetric value={stat.value} />
              </div>
              <div className="text-xs text-[#607a93]">{stat.label}</div>
            </FleeElement>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 opacity-40 md:flex">
        <div className="h-10 w-px animate-scroll-line bg-gradient-to-b from-[#00cfea] to-transparent" />
        <span className="font-mono-ui text-[9px] uppercase tracking-[0.2em] text-[#607a93]">Scroll</span>
      </div>
    </section>
  );
}
