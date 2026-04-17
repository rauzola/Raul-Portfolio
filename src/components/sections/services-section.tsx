"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Copy } from "@/config/copy";
import SectionReveal from "@/components/section-reveal";
import Tilt3DCard from "@/components/tilt-3d-card";

interface Props {
  copy: Copy["services"];
  contactLabel: string;
  isEnglish: boolean;
}

export function ServicesSection({ copy, contactLabel, isEnglish }: Props) {
  return (
    <section id="services" className="border-y border-white/5 bg-[#080c16]">
      <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
          {copy.section}
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-[560px] text-base leading-8 text-[#8aa2b8]">
          {copy.description}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.items.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
            >
              <Tilt3DCard intensity={12}>
                <article
                  className={`h-full rounded-[24px] border bg-[#0b1220] p-7 transition-colors ${service.highlight
                    ? "border-[rgba(0,207,234,0.22)]"
                    : "border-white/5 hover:border-[rgba(0,207,234,0.16)]"
                    }`}
                >
                  {service.badge ? (
                    <div className="font-mono-ui mb-2 text-[9px] uppercase tracking-[0.18em] text-[#00cfea]">
                      {service.badge}
                    </div>
                  ) : null}
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[rgba(0,207,234,0.2)] bg-[rgba(0,207,234,0.08)] font-mono-ui text-[11px] text-[#00cfea]">
                    {service.icon}
                  </div>
                  <h3 className="font-display mb-3 text-xl font-bold text-[#dce7f2]">
                    {service.title}
                  </h3>
                  <p className="mb-5 text-sm leading-7 text-[#607a93]">{service.description}</p>
                  <div className="space-y-2.5">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-sm text-[#8aa2b8]">
                        <span className="mt-1 text-[#0aeeb5]">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="#contact"
                    className="font-mono-ui mt-6 inline-block text-[12px] uppercase tracking-[0.14em] text-[#00cfea]"
                  >
                    {contactLabel} →
                  </Link>
                </article>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>

        <Tilt3DCard intensity={7} className="mt-12">
          <div className="grid gap-10 rounded-[26px] border border-white/5 bg-[#0b1220] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)] lg:grid-cols-2 lg:items-center">
            <div>
              <div className="font-mono-ui mb-3 text-[10px] uppercase tracking-[0.16em] text-[#243446]">
                {isEnglish ? "Why work with me" : "Por que me contratar"}
              </div>
              <h3 className="font-display mb-4 text-2xl font-bold text-[#dce7f2]">
                {copy.reasonTitle}
              </h3>
              <p className="text-sm leading-7 text-[#607a93]">{copy.reasonBody}</p>
            </div>
            <div className="space-y-4">
              {copy.reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-[rgba(0,207,234,0.2)] bg-[rgba(0,207,234,0.08)] text-xs text-[#00cfea]">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#dce7f2]">{reason.title}</div>
                    <div className="text-xs leading-6 text-[#607a93]">{reason.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Tilt3DCard>
      </SectionReveal>
    </section>
  );
}
