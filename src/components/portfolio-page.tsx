"use client";

import { useEffect, useMemo, useState } from "react";
import { getCopy } from "@/config/copy";
import { LINKS, getWhatsAppLink } from "@/config/links";
import { texts as textBases } from "@/config/constants";
import { getHostname } from "@/lib/utils";
import type { Texts } from "@/types/texts";
import type { FeaturedProject, Project } from "@/types/projects";
import { PortfolioNav } from "./sections/portfolio-nav";
import { HeroSection } from "./sections/hero-section";
import { AboutSection } from "./sections/about-section";
import { ServicesSection } from "./sections/services-section";
import { ProjectsSection } from "./sections/projects-section";
import { TechSection } from "./sections/tech-section";
import { TestimonialSection } from "./sections/testimonial-section";
import { ProcessSection } from "./sections/process-section";
import { ContactSection } from "./sections/contact-section";
import { FooterSection } from "./sections/footer-section";
import { StickyBar } from "./sections/sticky-bar";
import FloatingDivider from "./floating-divider";

interface Props {
  texts?: Texts;
  language?: string;
}

const WHATSAPP_MESSAGES = {
  "pt-br": "Ola Raul, vim pelo seu site e quero entender a melhor solucao para o meu negocio.",
  en: "Hi Raul, I found your website and would like to understand the best solution for my business.",
} as const;

function buildFeaturedProjects(
  projects: Project[],
  isEnglish: boolean,
): FeaturedProject[] {
  const order = [
    "habilidadeshumanasrh.com.br",
    "projetomaisvida.com.br",
    "marev.com.br",
  ];

  const meta = {
    "habilidadeshumanasrh.com.br": {
      badge: isEnglish ? "Institutional Website" : "Site Institucional",
      theme: { primary: "rgba(0,207,234,0.22)", secondary: "rgba(109,88,255,0.16)", accent: "#00cfea" },
      results: isEnglish
        ? [
          { value: "+27", accent: " years", label: "in the market" },
          { value: "+200", accent: "", label: "companies served" },
          { value: "2", accent: "nd", label: "project generated" },
        ]
        : [
          { value: "+27", accent: " anos", label: "de mercado" },
          { value: "+200", accent: "", label: "empresas atendidas" },
          { value: "2", accent: "o", label: "projeto gerado" },
        ],
    },
    "projetomaisvida.com.br": {
      badge: isEnglish ? "Website + CMS" : "Site + CMS",
      theme: { primary: "rgba(62,118,255,0.2)", secondary: "rgba(10,238,181,0.12)", accent: "#2e76ff" },
      results: isEnglish
        ? [
          { value: "1", accent: " year+", label: "in production" },
          { value: "CMS", accent: "", label: "editable with Prismic" },
          { value: "Events", accent: "", label: "dynamic calendar" },
        ]
        : [
          { value: "1", accent: " ano+", label: "em producao" },
          { value: "CMS", accent: "", label: "editavel com Prismic" },
          { value: "Eventos", accent: "", label: "calendario dinamico" },
        ],
    },
    "marev.com.br": {
      badge: isEnglish ? "NGO Website" : "ONG · Site Institucional",
      theme: { primary: "rgba(10,238,181,0.16)", secondary: "rgba(0,207,234,0.12)", accent: "#0aeeb5" },
      results: isEnglish
        ? [
          { value: "NGO", accent: "", label: "social impact project" },
          { value: "CMS", accent: "", label: "managed with Prismic" },
          { value: "Area", accent: "", label: "institutional transparency" },
        ]
        : [
          { value: "ONG", accent: "", label: "projeto de impacto social" },
          { value: "CMS", accent: "", label: "gerenciado com Prismic" },
          { value: "Area", accent: "", label: "de transparencia" },
        ],
    },
  } as const;

  return projects
    .map((project) => ({ project, hostname: getHostname(project.url) }))
    .filter((item) => order.includes(item.hostname))
    .sort((a, b) => order.indexOf(a.hostname) - order.indexOf(b.hostname))
    .map(({ project, hostname }, index) => {
      const projectMeta = meta[hostname as keyof typeof meta];
      return {
        ...project,
        index: `${index + 1}`.padStart(3, "0"),
        hostname,
        domain: hostname,
        badge: projectMeta.badge,
        theme: projectMeta.theme,
        results: [...projectMeta.results],
      };
    });
}

export const PortfolioPage = ({
  texts = textBases["pt-br"],
  language = "pt-br",
}: Props) => {
  const isEnglish = language === "en";
  const copy = useMemo(() => getCopy(isEnglish), [isEnglish]);

  const whatsappLink = useMemo(
    () => getWhatsAppLink(WHATSAPP_MESSAGES[isEnglish ? "en" : "pt-br"]),
    [isEnglish],
  );

  const featuredProjects = useMemo(
    () => buildFeaturedProjects(texts.projects.projects, isEnglish),
    [isEnglish, texts.projects.projects],
  );

  const contactItems = useMemo(() => [
    { label: "WhatsApp", value: "+55 44 99165-8351", href: whatsappLink, icon: "WA" },
    { label: "E-mail", value: "raulsigoli2000@gmail.com", href: LINKS.email, icon: "@" },
    { label: "LinkedIn", value: "linkedin.com/in/raul-sigoli-137bb4173", href: LINKS.linkedin, icon: "in" },
    { label: "GitHub", value: "github.com/rauzola", href: LINKS.github, icon: "GH" },
  ], [whatsappLink]);

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.7;
      setShowStickyBar((prev) => (prev === next ? prev : next));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05080e] text-[#dce7f2]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top,rgba(0,207,234,0.14),transparent_58%)]" />

      <PortfolioNav language={language} copy={copy.nav} />

      <HeroSection copy={copy.hero} whatsappLink={whatsappLink} />
      <FloatingDivider variant="cyan" />

      <AboutSection copy={copy.about} />
      <FloatingDivider variant="green" />

      <ServicesSection copy={copy.services} contactLabel={copy.nav.contact} isEnglish={isEnglish} />
      <FloatingDivider variant="cyan" />

      <ProjectsSection
        copy={copy.projects}
        contactLabel={copy.nav.contact}
        featuredProjects={featuredProjects}
      />
      <FloatingDivider variant="green" />

      <TechSection copy={copy.tech} />
      <FloatingDivider variant="cyan" />

      <TestimonialSection copy={copy.testimonial} />
      <FloatingDivider variant="green" />

      <ProcessSection copy={copy.process} />
      <FloatingDivider variant="cyan" />

      <ContactSection
        copy={copy.contact}
        contactItems={contactItems}
        whatsappLink={whatsappLink}
        texts={texts.contact}
        language={language}
      />

      <FooterSection
        nav={copy.nav}
        techTitle={copy.tech.title}
        availability={copy.contact.availability}
        footer={copy.footer}
        language={language}
        whatsappLink={whatsappLink}
      />

      <StickyBar
        show={showStickyBar}
        availability={copy.contact.availability}
        contactLabel={copy.nav.contact}
        shortRoleLabel={copy.footer.shortRole}
      />
    </main>
  );
};
