"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Copy } from "@/config/copy";
import type { Texts } from "@/types/texts";
import { handleMagnetMove, handleMagnetLeave } from "@/lib/magnet";
import { LINKS } from "@/config/links";
import SectionReveal from "@/components/section-reveal";
import Tilt3DCard from "@/components/tilt-3d-card";
import { ContactForm } from "@/components/contact-form/contact-form";

const ContactScene3D = dynamic(() => import("@/components/contact-scene-3d"), { ssr: false });

interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: string;
}

interface Props {
  copy: Copy["contact"];
  contactItems: ContactItem[];
  whatsappLink: string;
  texts: Texts["contact"];
  language: string;
}

export function ContactSection({ copy, contactItems, whatsappLink, texts, language }: Props) {
  return (
    <section id="contact" className="relative border-y border-white/5 bg-[#080c16]">
      <ContactScene3D />
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
        <div className="absolute left-[10%] top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,207,234,0.08),transparent_70%)] blur-2xl" />
        <div className="absolute right-[10%] top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,238,181,0.06),transparent_72%)] blur-3xl" />
      </div>

      <SectionReveal className="relative mx-auto max-w-6xl px-6 py-24 md:px-10">
        <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
          {copy.section}
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-[560px] text-base leading-8 text-[#8aa2b8]">
          {copy.description}
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            {contactItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="mb-4"
              >
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-[20px] border border-white/5 bg-[#0b1220] p-4 transition-all duration-200 hover:border-[rgba(0,207,234,0.18)] hover:-translate-y-0.5 will-change-transform"
                  onPointerMove={handleMagnetMove}
                  onPointerLeave={handleMagnetLeave}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-white/10 bg-[#111827] font-mono-ui text-[12px] text-[#00cfea]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[11px] text-[#243446]">{item.label}</div>
                    <div className="font-mono-ui text-[13px] text-[#dce7f2]">{item.value}</div>
                  </div>
                </Link>
              </motion.div>
            ))}

            <Tilt3DCard intensity={7} className="mt-7">
              <div className="rounded-[24px] border border-white/5 bg-[#0b1220] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
                  <h3 className="font-display text-lg font-bold text-[#dce7f2]">
                    {copy.availability}
                  </h3>
                </div>
                <p className="mb-5 text-sm leading-7 text-[#607a93]">{copy.cardBody}</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#00cfea] px-5 py-3 text-sm font-medium text-[#05080e] transition-transform duration-200 hover:brightness-110 will-change-transform"
                    onPointerMove={handleMagnetMove}
                    onPointerLeave={handleMagnetLeave}
                  >
                    WhatsApp
                  </Link>
                  <Link
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/10 px-5 py-3 text-sm text-[#dce7f2] transition-transform duration-200 hover:border-[rgba(0,207,234,0.22)] hover:text-[#00cfea] will-change-transform"
                    onPointerMove={handleMagnetMove}
                    onPointerLeave={handleMagnetLeave}
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          <Tilt3DCard intensity={6}>
            <div className="rounded-[28px] border border-white/5 bg-[#0b1220] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-8">
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-[#dce7f2]">
                  {texts.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#607a93]">{copy.formIntro}</p>
              </div>
              <ContactForm texts={texts} language={language} />
            </div>
          </Tilt3DCard>
        </div>
      </SectionReveal>
    </section>
  );
}
