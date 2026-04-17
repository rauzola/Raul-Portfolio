"use client";

import Image from "next/image";
import Link from "next/link";
import { handleMagnetMove, handleMagnetLeave } from "@/lib/magnet";
interface Props {
  show: boolean;
  availability: string;
  contactLabel: string;
  shortRoleLabel: string;
}

export function StickyBar({ show, availability, contactLabel, shortRoleLabel }: Props) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(0,207,234,0.18)] bg-[rgba(5,8,14,0.96)] px-6 py-3 backdrop-blur-xl transition-transform duration-300 md:px-10 ${show ? "translate-y-0" : "translate-y-full"
        }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[#0aeeb5]">
          <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
          {availability}
        </div>
        <div className="flex items-center gap-3 text-sm text-[#607a93] md:flex-1 md:px-6">
          <Image
            src="/logo/svg-transparente/sigoli-v2-dark-sem-tagline.svg"
            alt="Logo Raul Sigoli"
            width={900}
            height={320}
            sizes="92px"
            className="h-auto w-[92px] shrink-0"
          />
          <span>{shortRoleLabel}</span>
        </div>
        <Link
          href="#contact"
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#00cfea] px-5 py-3 text-sm font-medium text-[#05080e] transition-transform duration-200 hover:brightness-110 will-change-transform md:w-auto"
          onPointerMove={handleMagnetMove}
          onPointerLeave={handleMagnetLeave}
        >
          {contactLabel}
        </Link>
      </div>
    </div>
  );
}
