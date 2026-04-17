"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { img_avatar } from "@/assets/images";
import type { Copy } from "@/config/copy";
import SectionReveal from "@/components/section-reveal";
import Tilt3DCard from "@/components/tilt-3d-card";
import { FleeElement } from "@/components/flee-element";

interface Props {
  copy: Copy["about"];
}

export function AboutSection({ copy }: Props) {
  return (
    <section id="about">
      <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
          {copy.section}
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
          {copy.title}
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.45fr] lg:gap-[72px]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Tilt3DCard intensity={12} className="mb-3.5">
              <div className="rounded-[24px] border border-white/5 bg-[#0b1220] p-9 text-center shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
                <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-2 border-[rgba(0,207,234,0.22)] bg-[#05080e] shadow-[0_0_28px_rgba(0,207,234,0.14)]">
                  <Image
                    src={img_avatar}
                    alt="Raul Sigoli"
                    width={96}
                    height={96}
                    sizes="96px"
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <Image
                  src="/logo/svg-transparente/sigoli-v2-dark-sem-tagline.svg"
                  alt="Logo Raul Sigoli"
                  width={900}
                  height={320}
                  sizes="158px"
                  className="mx-auto h-auto w-[158px]"
                />
                <div className="font-mono-ui mt-4 text-[10px] uppercase tracking-[0.18em] text-[#243446]">
                  Full-Stack . SIGOLI
                </div>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["Next.js", "Supabase", "Prisma"].map((item) => (
                    <span
                      key={item}
                      className="font-mono-ui rounded-md border border-[rgba(0,207,234,0.2)] bg-[rgba(0,207,234,0.08)] px-3 py-1 text-[10px] text-[#00cfea]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt3DCard>

            <div className="grid grid-cols-2 gap-3">
              {copy.cards.map((item) => (
                <FleeElement key={item.label} radius={80} strength={28}>
                  <Tilt3DCard intensity={14}>
                    <div className="rounded-2xl border border-white/5 bg-[#0b1220] p-5 text-center shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                      <div className="font-display text-2xl font-extrabold text-[#dce7f2]">
                        {item.value}
                        <span className="text-sm text-[#00cfea]">{item.accent}</span>
                      </div>
                      <div className="text-xs text-[#607a93]">{item.label}</div>
                    </div>
                  </Tilt3DCard>
                </FleeElement>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="self-center"
          >
            <div className="space-y-5 text-base leading-8 text-[#8aa2b8]">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Tilt3DCard intensity={8} className="mt-8">
              <div className="flex items-start gap-4 rounded-[18px] border border-[rgba(0,207,234,0.18)] bg-[#0b1220] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#0aeeb5] animate-live-pulse" />
                <div>
                  <div className="font-display mb-1 text-lg font-bold text-[#dce7f2]">
                    {copy.noteTitle}
                  </div>
                  <div className="text-sm leading-7 text-[#607a93]">{copy.noteBody}</div>
                </div>
              </div>
            </Tilt3DCard>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
}
