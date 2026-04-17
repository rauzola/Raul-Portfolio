"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Copy } from "@/config/copy";
import type { FeaturedProject } from "@/types/projects";
import { handleMagnetMove, handleMagnetLeave } from "@/lib/magnet";
import SectionReveal from "@/components/section-reveal";
import Tilt3DCard from "@/components/tilt-3d-card";
import { FleeElement } from "@/components/flee-element";

const ProjectsShowcase3D = dynamic(() => import("@/components/projects-showcase-3d"), { ssr: false });

interface Props {
  copy: Copy["projects"];
  contactLabel: string;
  featuredProjects: FeaturedProject[];
}

export function ProjectsSection({ copy, contactLabel, featuredProjects }: Props) {
  const [projectState, setProjectState] = useState({ index: 0, direction: 1 });
  const [lastManualClick, setLastManualClick] = useState(0);

  useEffect(() => {
    if (featuredProjects.length < 2) return;

    const interval = window.setInterval(() => {
      setProjectState((current) => ({
        index: (current.index + 1) % featuredProjects.length,
        direction: 1,
      }));
    }, 5200);

    return () => window.clearInterval(interval);
  }, [featuredProjects.length, lastManualClick]);

  const activeProjectIndex = featuredProjects.length === 0
    ? 0
    : Math.min(projectState.index, featuredProjects.length - 1);
  const activeProject = featuredProjects[activeProjectIndex] ?? null;
  const showcaseProjects = featuredProjects.map((p) => ({ color: p.theme.accent }));

  return (
    <section id="projects">
      <SectionReveal className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
          {copy.section}
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-[560px] text-base leading-8 text-[#8aa2b8]">
          {copy.description}
        </p>

        {activeProject ? (
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <ProjectsShowcase3D activeIndex={activeProjectIndex} projects={showcaseProjects} />

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                {featuredProjects.map((project, index) => (
                  <button
                    key={project.url}
                    type="button"
                    onClick={() => {
                      setProjectState({ index, direction: index >= activeProjectIndex ? 1 : -1 });
                      setLastManualClick(Date.now());
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono-ui text-[10px] transition-all ${activeProjectIndex === index
                      ? "border-[rgba(0,207,234,0.3)] bg-[rgba(0,207,234,0.12)] text-[#00cfea] shadow-[0_0_22px_rgba(0,207,234,0.18)]"
                      : "border-white/10 bg-[#0b1220] text-[#607a93] hover:border-[rgba(0,207,234,0.22)]"
                      }`}
                  >
                    {project.index.slice(-2)}
                  </button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait" custom={projectState.direction}>
              <motion.div
                key={activeProject.url}
                custom={projectState.direction}
                variants={{
                  enter: (dir: number) => ({ opacity: 0, x: dir * 48, filter: "blur(6px)" }),
                  visible: {
                    opacity: 1, x: 0, filter: "blur(0px)",
                    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                  },
                  exit: (dir: number) => ({
                    opacity: 0, x: dir * -36, filter: "blur(6px)",
                    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
                  }),
                }}
                initial="enter"
                animate="visible"
                exit="exit"
              >
                <Tilt3DCard intensity={6}>
                  <div className="rounded-[28px] border border-white/5 bg-[#0b1220] p-8 shadow-[0_22px_70px_rgba(0,0,0,0.22)] lg:p-10">
                    <motion.div
                      className="mb-5 flex flex-wrap items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.3 }}
                    >
                      <span className="font-mono-ui text-[11px] text-[#243446]">{activeProject.index}</span>
                      <span
                        className="font-mono-ui rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.1em]"
                        style={{
                          color: activeProject.theme.accent,
                          borderColor: `${activeProject.theme.accent}33`,
                          backgroundColor: `${activeProject.theme.accent}14`,
                        }}
                      >
                        {activeProject.badge}
                      </span>
                      <span className="font-mono-ui flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#0aeeb5]">
                        <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
                        {copy.live}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14, duration: 0.32 }}
                    >
                      <h3 className="font-display text-[30px] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
                        {activeProject.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-8 text-[#607a93]">{activeProject.description}</p>
                    </motion.div>

                    <motion.div
                      className="mt-6 flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.28 }}
                    >
                      {activeProject.tags.map((tag) => (
                        <FleeElement
                          key={tag.name}
                          className="font-mono-ui rounded-md border border-white/10 px-2.5 py-1 text-[11px]"
                          style={{
                            color: tag.color,
                            backgroundColor: `${tag.color}14`,
                            borderColor: `${tag.color}33`,
                          }}
                          radius={68}
                          strength={24}
                        >
                          {tag.name}
                        </FleeElement>
                      ))}
                    </motion.div>

                    <motion.div
                      className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.09, delayChildren: 0.26 } },
                      }}
                    >
                      {activeProject.results.map((result) => (
                        <motion.div
                          key={`${result.value}-${result.label}`}
                          variants={{
                            hidden: { opacity: 0, y: 18, scale: 0.92 },
                            visible: {
                              opacity: 1, y: 0, scale: 1,
                              transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                            },
                          }}
                          className="rounded-2xl border border-white/5 bg-[#111827] p-4 text-center"
                        >
                          <div className="font-display text-2xl font-extrabold tracking-[-0.04em] text-[#dce7f2]">
                            {result.value}
                            <span className="text-[#00cfea]">{result.accent}</span>
                          </div>
                          <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#607a93]">
                            {result.label}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="mt-8 flex flex-wrap gap-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.44, duration: 0.28 }}
                    >
                      <Link
                        href={activeProject.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[rgba(0,207,234,0.24)] bg-[rgba(0,207,234,0.08)] px-4 py-2.5 text-sm font-medium text-[#00cfea] transition-transform duration-200 hover:bg-[rgba(0,207,234,0.12)] will-change-transform"
                        onPointerMove={handleMagnetMove}
                        onPointerLeave={handleMagnetLeave}
                      >
                        {copy.cta}
                        <span aria-hidden="true">↗</span>
                      </Link>
                      <Link
                        href="#contact"
                        className="inline-flex items-center rounded-lg border border-white/10 px-4 py-2.5 text-sm text-[#dce7f2] transition-transform duration-200 hover:border-[rgba(0,207,234,0.22)] hover:text-[#00cfea] will-change-transform"
                        onPointerMove={handleMagnetMove}
                        onPointerLeave={handleMagnetLeave}
                      >
                        {contactLabel}
                      </Link>
                    </motion.div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null}
      </SectionReveal>
    </section>
  );
}
