"use client";

import { motion } from "framer-motion";
import type { Copy } from "@/config/copy";
import SectionReveal from "@/components/section-reveal";
import Tilt3DCard from "@/components/tilt-3d-card";
import { FleeElement } from "@/components/flee-element";

interface Props {
  copy: Copy["testimonial"];
}

export function TestimonialSection({ copy }: Props) {
  return (
    <section id="testimonial">
      <SectionReveal className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
          {copy.section}
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
          {copy.title}
        </h2>

        <div className="mt-12 max-w-4xl">
          <Tilt3DCard intensity={7}>
            <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-[#0b1220] p-8 shadow-[0_26px_80px_rgba(0,0,0,0.22)] md:p-12">
              <div className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(0,207,234,0.1),transparent_72%)]" />
              <div className="pointer-events-none absolute left-8 top-6 font-display text-[120px] leading-none text-[#00cfea]/8">
                &quot;
              </div>
              <p className="relative z-10 text-lg italic leading-9 text-[#dce7f2]">
                {copy.quote}
              </p>
              <div className="relative z-10 mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[rgba(0,207,234,0.2)] bg-[#05080e] font-display text-lg font-extrabold text-[#00cfea]">
                  SL
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-[#dce7f2]">
                    {copy.author}
                  </div>
                  <div className="text-sm text-[#607a93]">{copy.role}</div>
                </div>
              </div>
            </div>
          </Tilt3DCard>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {copy.proof.map((item, index) => (
            <FleeElement key={item} radius={90} strength={30}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[20px] border border-white/5 bg-[#0b1220] p-5"
              >
                <div className="font-mono-ui mb-2 text-[10px] uppercase tracking-[0.14em] text-[#00cfea]">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <div className="text-sm leading-7 text-[#8aa2b8]">{item}</div>
              </motion.div>
            </FleeElement>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
