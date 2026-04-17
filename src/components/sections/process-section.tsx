"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Copy } from "@/config/copy";
import SectionReveal from "@/components/section-reveal";
import Tilt3DCard from "@/components/tilt-3d-card";

const ProcessScene3D = dynamic(() => import("@/components/process-scene-3d"), { ssr: false });

interface Props {
  copy: Copy["process"];
}

export function ProcessSection({ copy }: Props) {
  return (
    <section id="process" className="border-t border-white/5 bg-[#080c16]">
      <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
          {copy.section}
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-[520px] text-base leading-8 text-[#8aa2b8]">
          {copy.description}
        </p>

        <ProcessScene3D />

        <div className="relative mt-10 hidden h-20 lg:block">
          <div className="absolute left-[8%] right-[8%] top-8 h-px bg-gradient-to-r from-transparent via-[#243446] to-transparent" />
          <div className="absolute left-[10%] top-5 h-6 w-6 rounded-full border border-[rgba(0,207,234,0.2)] bg-[rgba(0,207,234,0.08)] shadow-[0_0_18px_rgba(0,207,234,0.18)]" />
          <div className="absolute left-[37%] top-5 h-5 w-5 rounded-full border border-white/10 bg-[#111827]" />
          <div className="absolute left-[63%] top-5 h-5 w-5 rounded-full border border-white/10 bg-[#111827]" />
          <div className="absolute right-[10%] top-5 h-5 w-5 rounded-full border border-white/10 bg-[#111827]" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
            >
              <Tilt3DCard intensity={12}>
                <article className="h-full rounded-[22px] border border-white/5 bg-[#0b1220] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition hover:border-[rgba(0,207,234,0.18)]">
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full border ${index === 0
                      ? "border-[rgba(0,207,234,0.24)] bg-[rgba(0,207,234,0.08)] text-[#00cfea] shadow-[0_0_20px_rgba(0,207,234,0.12)]"
                      : "border-white/10 bg-[#111827] text-[#607a93]"
                      }`}
                  >
                    <span className="font-mono-ui text-xs">{step.number}</span>
                  </div>
                  <h3 className="font-display mb-3 text-lg font-bold text-[#dce7f2]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#607a93]">{step.description}</p>
                </article>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
