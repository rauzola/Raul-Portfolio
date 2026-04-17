"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Copy } from "@/config/copy";
import { handleMagnetMove, handleMagnetLeave } from "@/lib/magnet";
import { LINKS } from "@/config/links";

const LANGUAGE_OPTIONS = [
  { code: "pt-br", label: "PT", href: "/" },
  { code: "en", label: "EN", href: "/en" },
];

interface Props {
  nav: Copy["nav"];
  techTitle: string;
  availability: string;
  footer: Copy["footer"];
  language: string;
  whatsappLink: string;
}

export function FooterSection({ nav, techTitle, availability, footer, language, whatsappLink }: Props) {
  const footerLinks = useMemo(() => [
    { href: "#projects", label: nav.projects },
    { href: "#about", label: nav.about },
    { href: "#services", label: nav.services },
    { href: "#tech", label: techTitle },
    { href: "#contact", label: nav.contact },
  ], [nav, techTitle]);

  const socialLinks = useMemo(() => [
    { href: whatsappLink, label: "WhatsApp" },
    { href: LINKS.linkedin, label: "LinkedIn" },
    { href: LINKS.github, label: "GitHub" },
  ], [whatsappLink]);

  return (
    <footer className="px-6 pb-28 pt-12 md:px-10 md:pb-24">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/5 bg-[#0b1220] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
          <div>
            <Link href="#hero" className="inline-flex items-center no-underline">
              <Image
                src="/logo/svg-transparente/sigoli-v2-dark-sem-tagline.svg"
                alt="Logo Raul Sigoli"
                width={900}
                height={320}
                sizes="132px"
                className="h-auto w-[132px]"
              />
            </Link>
            <p className="mt-5 max-w-[360px] text-sm leading-7 text-[#607a93]">
              {footer.description}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(0,207,234,0.18)] bg-[rgba(0,207,234,0.08)] px-4 py-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[#00cfea]">
              <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
              {availability}
            </div>
          </div>

          <div>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#243446]">
              {footer.navLabel}
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#607a93]">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors duration-200 hover:text-[#00cfea] will-change-transform"
                  onPointerMove={handleMagnetMove}
                  onPointerLeave={handleMagnetLeave}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#243446]">
              {footer.connectLabel}
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#607a93]">
              {socialLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-[#00cfea] will-change-transform"
                  onPointerMove={handleMagnetMove}
                  onPointerLeave={handleMagnetLeave}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <div className="mb-2 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#243446]">
                {nav.languageLabel}
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-[#05080e] p-1 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
                {LANGUAGE_OPTIONS.map((option) => {
                  const active = option.code === language;
                  return (
                    <Link
                      key={option.code}
                      href={option.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-3 py-2 transition-colors ${active
                        ? "bg-[rgba(0,207,234,0.14)] text-[#00cfea]"
                        : "text-[#607a93] hover:text-[#dce7f2]"
                        }`}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-[#607a93]">
            <span className="font-semibold text-[#dce7f2]">Raul Sigoli</span>
            {` · ${footer.longRole}`}
          </div>
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[#243446]">
            (c) 2026 Raul Sigoli · Maringa, PR
          </div>
        </div>
      </div>
    </footer>
  );
}
