"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Copy } from "@/config/copy";
import SectionReveal from "@/components/section-reveal";
import { FleeElement } from "@/components/flee-element";

const TechOrbit3D = dynamic(() => import("@/components/tech-orbit-3d"), { ssr: false });

interface Props {
  copy: Copy["tech"];
}

export function TechSection({ copy }: Props) {
  return (
    <section id="tech" className="border-y border-white/5 bg-[#080c16]">
      <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
              {copy.section}
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
              {copy.title}
            </h2>
            <p className="mt-3 max-w-[520px] text-base leading-8 text-[#8aa2b8]">
              {copy.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 18, rotateY: -4 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="rounded-[18px] border border-white/5 bg-[#0b1220] p-5 transition hover:border-[rgba(0,207,234,0.18)]">
                    <div className="font-mono-ui mb-3 text-[10px] uppercase tracking-[0.14em] text-[#243446]">
                      {category.title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag) => (
                        <FleeElement
                          key={tag}
                          className="font-mono-ui rounded-md border border-[rgba(0,207,234,0.12)] bg-[rgba(0,207,234,0.06)] px-2.5 py-1 text-[11px] text-[#8fc8d6]"
                          radius={72}
                          strength={26}
                        >
                          {tag}
                        </FleeElement>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <TechOrbit3D />
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
