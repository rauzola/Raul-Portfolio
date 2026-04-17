"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { handleMagnetMove, handleMagnetLeave } from "@/lib/magnet";
import type { Copy } from "@/config/copy";

interface Props {
  language: string;
  copy: Copy["nav"];
}

export function PortfolioNav({ language, copy }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash, { passive: true });
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const navLinks = useMemo(() => [
    { label: copy.projects, href: "#projects" },
    { label: copy.about, href: "#about" },
    { label: copy.services, href: "#services" },
    { label: copy.process, href: "#process" },
  ], [copy]);

  const languageOptions = useMemo(() => {
    const ptHref = currentHash ? `/${currentHash}` : "/";
    const enHref = currentHash ? `/en${currentHash}` : "/en";
    return [
      { code: "pt-br", label: "PT", href: ptHref },
      { code: "en", label: "EN", href: enHref },
    ];
  }, [currentHash]);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled
        ? "border-white/10 bg-[rgba(5,8,14,0.95)] backdrop-blur-xl"
        : "border-transparent bg-[rgba(5,8,14,0.72)] backdrop-blur-md"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="#hero" className="flex items-center no-underline">
          <Image
            src="/logo/svg-transparente/sigoli-v2-dark-sem-tagline.svg"
            alt="Logo Raul Sigoli"
            width={900}
            height={320}
            sizes="(max-width: 768px) 108px, 120px"
            priority
            className="h-auto w-[108px] md:w-[120px]"
          />
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-7 text-[13px] text-[#607a93]">
            {navLinks.map((link) => (
              <li key={link.href} className="list-none">
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#dce7f2] will-change-transform"
                  onPointerMove={handleMagnetMove}
                  onPointerLeave={handleMagnetLeave}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center rounded-full border border-white/10 bg-[#0b1220]/80 p-1 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
            {languageOptions.map((option) => {
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
                  onPointerMove={handleMagnetMove}
                  onPointerLeave={handleMagnetLeave}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="#contact"
            className="rounded-lg bg-[#00cfea] px-5 py-2 font-medium text-[#05080e] transition-transform duration-200 hover:brightness-110 will-change-transform"
            onPointerMove={handleMagnetMove}
            onPointerLeave={handleMagnetLeave}
          >
            {copy.contact}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#dce7f2] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-white/5 bg-[rgba(5,8,14,0.98)] p-6 md:hidden"
        >
          <div className="flex flex-col gap-4 text-sm text-[#607a93]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#dce7f2]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div>
              <div className="mb-2 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#243446]">
                {copy.languageLabel}
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-[#0b1220] p-1 font-mono-ui text-[11px] uppercase tracking-[0.14em]">
                {languageOptions.map((option) => {
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
                      onClick={() => setMobileOpen(false)}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link
              href="#contact"
              className="rounded-lg bg-[#00cfea] px-5 py-3 text-center font-medium text-[#05080e]"
              onClick={() => setMobileOpen(false)}
            >
              {copy.contact}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </motion.nav>
  );
}
