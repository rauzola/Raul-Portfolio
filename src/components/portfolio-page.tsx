"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { texts as textBases } from "@/config/constants";
import type { Project } from "@/types/projects";
import type { Texts } from "@/types/texts";
import { ContactForm } from "./contact-form/contact-form";
import SectionReveal from "./section-reveal";
import Tilt3DCard from "./tilt-3d-card";

const HeroScene3D = dynamic(() => import("./hero-scene-3d"), { ssr: false });
const HeroDiamonds = dynamic(() => import("./hero-diamonds"), { ssr: false });
const FloatingDivider = dynamic(() => import("./floating-divider"), { ssr: false });
const ProjectsShowcase3D = dynamic(() => import("./projects-showcase-3d"), { ssr: false });
const TechOrbit3D = dynamic(() => import("./tech-orbit-3d"), { ssr: false });
const ProcessScene3D = dynamic(() => import("./process-scene-3d"), { ssr: false });
const ContactScene3D = dynamic(() => import("./contact-scene-3d"), { ssr: false });

interface Props {
  texts?: Texts;
  language?: string;
}

interface MetricParts {
  before: string;
  prefix: string;
  number: number;
  suffix: string;
  after: string;
}

interface PointerState {
  x: number;
  y: number;
}

interface FeaturedProject extends Project {
  index: string;
  hostname: string;
  badge: string;
  domain: string;
  results: {
    value: string;
    accent: string;
    label: string;
  }[];
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const links = {
  whatsapp:
    "https://wa.me/5544991658351?text=Ola%20Raul,%20vim%20pelo%20seu%20site%20e%20quero%20entender%20a%20melhor%20solucao%20para%20o%20meu%20negocio.",
  email: "mailto:raulsigoli2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/raul-sigoli-137bb4173/",
  github: "https://github.com/rauzola",
  cv: "/assets/cv.pdf",
};

const profile = {
  avatarUrl: "https://avatars.githubusercontent.com/u/57502280?v=4",
  publicRepos: 92,
};

const parseMetricValue = (value: string): MetricParts | null => {
  const match = value.match(/([#+]?)(\d+)([%+]*)/);

  if (!match || match.index === undefined) return null;

  const [token, prefix, numericValue, suffix] = match;

  return {
    before: value.slice(0, match.index),
    prefix,
    number: Number(numericValue),
    suffix,
    after: value.slice(match.index + token.length),
  };
};

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const AnimatedMetric = ({ value }: { value: string }) => {
  const metric = useMemo(() => parseMetricValue(value), [value]);
  const [displayNumber, setDisplayNumber] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!metric || !isInView) return;

    let frame = 0;
    let start: number | null = null;
    const duration = 900;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayNumber(Math.round(metric.number * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [metric, isInView]);

  if (!metric) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      {metric.before}
      {metric.prefix}
      {displayNumber}
      {metric.suffix}
      {metric.after}
    </span>
  );
};

export const PortfolioPage = ({
  texts = textBases["pt-br"],
  language = "pt-br",
}: Props) => {
  const isEnglish = language === "en";
  const heroPointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);
  const heroSpringX = useSpring(heroPointerX, { stiffness: 110, damping: 22, mass: 0.35 });
  const heroSpringY = useSpring(heroPointerY, { stiffness: 110, damping: 22, mass: 0.35 });
  const heroGlowMainX = useTransform(heroSpringX, (value) => value * 36);
  const heroGlowMainY = useTransform(heroSpringY, (value) => value * 26);
  const heroGlowLeftX = useTransform(heroSpringX, (value) => value * -44);
  const heroGlowLeftY = useTransform(heroSpringY, (value) => value * -18);
  const heroGlowRightX = useTransform(heroSpringX, (value) => value * 52);
  const heroGlowRightY = useTransform(heroSpringY, (value) => value * 22);
  const heroGridX = useTransform(heroSpringX, (value) => value * 30);
  const heroGridY = useTransform(heroSpringY, (value) => value * 18);
  const heroGridRotateY = useTransform(heroSpringX, (value) => value * 8);
  const heroGridRotateX = useTransform(heroSpringY, (value) => 66 - value * 4);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [lastManualClick, setLastManualClick] = useState(0);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const isWordmarkInteractingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowStickyBar(window.scrollY > window.innerHeight * 0.7);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let frame = 0;
    let start = 0;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      if (!isWordmarkInteractingRef.current && wordmarkRef.current) {
        const elapsed = timestamp - start;
        const rotateY = Math.sin(elapsed / 950) * 4;
        const rotateX = Math.cos(elapsed / 1200) * -2;

        wordmarkRef.current.style.transform =
          `perspective(800px) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg)`;
      }

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const copy = useMemo(() => isEnglish ? {
    nav: {
      projects: "Projects",
      about: "About",
      services: "Services",
      process: "Process",
      contact: "Request Quote",
    },
    hero: {
      badge: "Available for new projects",
      badgeDetail: "Open calendar",
      kicker: "Full-Stack Developer · Maringa, PR · ID Brasil + SIGOLI",
      titleTop: "Raul",
      titleBottom: "SIGOLI",
      description:
        "I build websites, technical SEO structures and custom systems for small businesses and professionals that need to show up better online and operate with more clarity.",
      primaryCta: "Request Free Quote",
      secondaryCta: "See Live Projects",
      highlights: [
        "Website + technical SEO",
        "CMS without agency lock-in",
        "Direct contact on WhatsApp",
      ],
      stats: [
        { value: `${profile.publicRepos}+`, label: "public repositories on GitHub" },
        { value: "100%", label: "clients acquired through referrals" },
        { value: "1 year+", label: "live system without critical incidents" },
      ],
    },
    about: {
      section: "01 · About",
      title: "Who will take care of your project",
      paragraphs: [
        "I am Raul Henrique Silva Sigoli, a Full-Stack developer based in Maringa, PR. I currently work at ID Brasil Sistemas and keep parallel freelance projects under the SIGOLI brand.",
        "My real day-to-day stack revolves around React, Next.js, TypeScript, Node.js, Supabase, Prisma and PostgreSQL, building everything from conversion-focused websites to custom internal systems.",
        `On GitHub, the username rauzola gathers ${profile.publicRepos}+ public repositories, and the same technical rigor appears in client projects like Habilidades Humanas, Projeto Mais Vida and MAREV.`,
      ],
      noteTitle: "Available now for new projects",
      noteBody:
        "Open calendar for websites, CMS structures, local SEO and custom systems. Scope, timeline and investment are defined clearly before development starts.",
      cards: [
        { value: `${profile.publicRepos}`, accent: "+", label: "public repositories" },
        { value: "Sep/25", accent: "", label: "ID Brasil Sistemas" },
      ],
    },
    services: {
      section: "02 · Services & Consulting",
      title: "What you can hire",
      description:
        "Each service has a clear outcome. I do not sell hours. I sell deliveries that solve a real business problem.",
      items: [
        {
          icon: "LP",
          title: "Website, Landing Page & SEO",
          description:
            "Institutional website, landing page or digital presence package with strong positioning, technical SEO and a conversion-ready contact flow.",
          features: [
            "Delivery in 1-2 weeks",
            "CMS option for content updates",
            "Google-ready structure included",
          ],
          highlight: false,
        },
        {
          icon: "SYS",
          title: "System & Admin Panel",
          description:
            "Custom system with login, access control, dashboard and integrations designed around your operation.",
          features: [
            "Secure authentication and roles",
            "Reports and management dashboard",
            "API integrations when needed",
          ],
          highlight: true,
          badge: "Most requested",
        },
        {
          icon: "CT",
          title: "Technical Consulting",
          description:
            "An external technical view before you commit to a stack, architecture or product decision.",
          features: [
            "Code and architecture review",
            "Stack recommendation",
            "Clear written guidance",
          ],
          highlight: false,
        },
      ],
      reasonTitle: "You talk directly to the person who will code. No middlemen.",
      reasonBody:
        "Unlike agencies, you work directly with the developer building the project. That means faster communication, less noise and decisions made with full context.",
      reasons: [
        {
          title: "Direct contact, no bureaucracy",
          description: "WhatsApp, email or LinkedIn. You choose the channel.",
        },
        {
          title: "Scope and timeline documented",
          description: "A clear proposal comes before any payment decision.",
        },
        {
          title: "30 days of support after launch",
          description: "The project is not abandoned after deployment.",
        },
        {
          title: "Maintainable code you actually receive",
          description: "TypeScript, organization and no unnecessary lock-in.",
        },
      ],
    },
    projects: {
      section: "03 · Real Projects · All Live",
      title: "Code that is running right now",
      description:
        "These are not mockups or demos. They are real products already serving businesses and users.",
      live: "Live",
      cta: "View live site",
      preview: "Live preview",
    },
    tech: {
      section: "04 · Technologies",
      title: "Complete stack",
      description:
        "Tools chosen with criteria. Each one solves a concrete part of the product.",
      categories: [
        {
          title: "Front-end",
          tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
        },
        {
          title: "Back-end",
          tags: ["Node.js", "REST API", "Next.js API", "Prisma ORM"],
        },
        {
          title: "Data & Auth",
          tags: ["Supabase", "PostgreSQL", "Prisma", "Auth / Roles"],
        },
        {
          title: "CMS & DevOps",
          tags: ["Prismic CMS", "GitHub Actions", "Vercel", "Docker"],
        },
      ],
    },
    testimonial: {
      section: "05 · Social Proof",
      title: "Delivery that people recommend",
      quote:
        "From the start, Raul showed technical care and clarity in understanding what I needed to communicate as a brand and as a business. The final result exceeded my expectations, and I have already recommended him with complete confidence.",
      author: "Silvana Loureiro",
      role: "Founder · Habilidades Humanas RH · Maringa, PR",
      proof: [
        "Brand aligned delivery",
        "Referral with confidence",
        "Second project generated",
      ],
    },
    process: {
      section: "06 · Process",
      title: "How the work happens",
      description: "Transparent decisions, direct communication and clear stages.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          description: "We align on the business, goals and what needs to be built.",
        },
        {
          number: "02",
          title: "Proposal",
          description: "You get a clear scope, timeline and investment before the build starts.",
        },
        {
          number: "03",
          title: "Build",
          description: "I design, code and validate the project with direct updates.",
        },
        {
          number: "04",
          title: "Launch & Support",
          description: "Deployment, handoff and support after the project goes live.",
        },
      ],
    },
    contact: {
      section: "07 · Contact · Free Quote",
      title: "Open calendar. Let us talk?",
      description:
        "Tell me the context, the problem and the deadline. I answer with a practical next step, not with vague promises.",
      cardTitle: "Quick response",
      cardBody:
        "Prefer WhatsApp, email or LinkedIn? That works too. Use the channel that feels easier for you.",
      availability: "Available now",
      formIntro: "Fill the form or use one of the direct channels.",
    },
  }
    : {
      nav: {
        projects: "Projetos",
        about: "Sobre",
        services: "Servicos",
        process: "Processo",
        contact: "Solicitar Orcamento",
      },
      hero: {
        badge: "Disponivel para novos projetos",
        badgeDetail: "Agenda aberta",
        kicker: "Full-Stack Developer · Maringa, PR · ID Brasil + SIGOLI",
        titleTop: "Raul",
        titleBottom: "SIGOLI",
        description:
          "Crio sites, SEO tecnico e sistemas sob medida para pequenas empresas e profissionais que precisam aparecer melhor no Google e operar com mais clareza.",
        primaryCta: "Solicitar Orcamento Gratis",
        secondaryCta: "Ver Projetos em Producao",
        highlights: [
          "Site + SEO tecnico",
          "CMS sem lock-in de agencia",
          "Contato direto no WhatsApp",
        ],
        stats: [
          { value: `${profile.publicRepos}+`, label: "repositorios publicos no GitHub" },
          { value: "100%", label: "clientes vindos por indicacao" },
          { value: "1 ano+", label: "sistema em producao sem incidentes criticos" },
        ],
      },
      about: {
        section: "01 · Sobre",
        title: "Quem vai cuidar do seu projeto",
        paragraphs: [
          "Sou Raul Henrique Silva Sigoli, desenvolvedor Full-Stack em Maringa, PR. Hoje atuo na ID Brasil Sistemas e mantenho projetos paralelos pela marca SIGOLI.",
          "Minha stack real gira em torno de React, Next.js, TypeScript, Node.js, Supabase, Prisma e PostgreSQL, criando desde sites com foco em conversao ate sistemas internos sob medida.",
          `No GitHub, o usuario rauzola reune ${profile.publicRepos}+ repositorios publicos, e a mesma base tecnica aparece em entregas para Habilidades Humanas, Projeto Mais Vida e MAREV.`,
        ],
        noteTitle: "Disponivel agora para novos projetos",
        noteBody:
          "Agenda aberta para sites, CMS, SEO local e sistemas personalizados. Escopo, prazo e investimento ficam claros antes do desenvolvimento comecar.",
        cards: [
          { value: `${profile.publicRepos}`, accent: "+", label: "repositorios publicos" },
          { value: "set/25", accent: "", label: "ID Brasil Sistemas" },
        ],
      },
      services: {
        section: "02 · Servicos & Consultoria",
        title: "O que voce pode contratar",
        description:
          "Cada servico tem um resultado claro. Nao vendo horas. Vendo entregas que resolvem um problema real do negocio.",
        items: [
          {
            icon: "LP",
            title: "Site, Landing Page & SEO",
            description:
              "Site institucional, landing page ou pacote de presenca digital com posicionamento forte, SEO tecnico e fluxo de contato pronto para converter.",
            features: [
              "Entrega em 1-2 semanas",
              "Opcao de CMS para editar conteudo",
              "Estrutura pronta para o Google",
            ],
            highlight: false,
          },
          {
            icon: "SYS",
            title: "Sistema & Painel Admin",
            description:
              "Sistema sob medida com login, controle de acesso, dashboard e integracoes desenhadas para a sua operacao.",
            features: [
              "Autenticacao segura e perfis",
              "Relatorios e painel de gestao",
              "Integracao com APIs quando fizer sentido",
            ],
            highlight: true,
            badge: "Mais contratado",
          },
          {
            icon: "CT",
            title: "Consultoria Tecnica",
            description:
              "Uma segunda opiniao tecnica antes de travar stack, arquitetura ou direcao de produto.",
            features: [
              "Revisao de codigo e arquitetura",
              "Recomendacao de stack",
              "Orientacao clara por escrito",
            ],
            highlight: false,
          },
        ],
        reasonTitle: "Voce fala direto com quem vai codar. Sem intermediarios.",
        reasonBody:
          "Diferente de agencias, voce trabalha direto com o desenvolvedor que vai construir o projeto. Isso reduz ruido, acelera decisoes e melhora a qualidade da comunicacao.",
        reasons: [
          {
            title: "Contato direto, sem burocracia",
            description: "WhatsApp, e-mail ou LinkedIn. Voce escolhe o canal.",
          },
          {
            title: "Escopo e prazo documentados",
            description: "A proposta vem clara antes de qualquer pagamento.",
          },
          {
            title: "30 dias de suporte apos a entrega",
            description: "O projeto nao some depois do deploy.",
          },
          {
            title: "Codigo que voce realmente recebe",
            description: "TypeScript, organizacao e sem lock-in desnecessario.",
          },
        ],
      },
      projects: {
        section: "03 · Projetos Reais · Todos em Producao",
        title: "Codigo que esta rodando agora",
        description:
          "Nao sao mockups nem demos. Sao produtos reais, ja atendendo negocios e usuarios.",
        live: "Ao vivo",
        cta: "Ver site ao vivo",
        preview: "Preview real",
      },
      tech: {
        section: "04 · Tecnologias",
        title: "Stack completa",
        description:
          "Ferramentas escolhidas com criterio. Cada uma resolve uma parte concreta do produto.",
        categories: [
          {
            title: "Front-end",
            tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
          },
          {
            title: "Back-end",
            tags: ["Node.js", "REST API", "Next.js API", "Prisma ORM"],
          },
          {
            title: "Dados & Auth",
            tags: ["Supabase", "PostgreSQL", "Prisma", "Auth / Perfis"],
          },
          {
            title: "CMS & DevOps",
            tags: ["Prismic CMS", "GitHub Actions", "Vercel", "Docker"],
          },
        ],
      },
      testimonial: {
        section: "05 · Prova Social",
        title: "Entrega que gera indicacao",
        quote:
          "Desde o inicio, ficou evidente o cuidado tecnico e a clareza na compreensao do que eu precisava transmitir como marca e negocio. O resultado final superou minhas expectativas, e eu ja recomendei o Raul com total confianca.",
        author: "Silvana Loureiro",
        role: "Fundadora · Habilidades Humanas RH · Maringa, PR",
        proof: [
          "Marca bem traduzida",
          "Indicacao com confianca",
          "Gerou segundo projeto",
        ],
      },
      process: {
        section: "06 · Processo",
        title: "Como funciona trabalhar comigo",
        description: "Decisoes transparentes, contato direto e etapas claras.",
        steps: [
          {
            number: "01",
            title: "Descoberta",
            description: "Alinhamos negocio, objetivo e o que precisa ser construido.",
          },
          {
            number: "02",
            title: "Proposta",
            description: "Voce recebe escopo, prazo e investimento antes do desenvolvimento.",
          },
          {
            number: "03",
            title: "Desenvolvimento",
            description: "Eu desenho, desenvolvo e valido o projeto com updates diretos.",
          },
          {
            number: "04",
            title: "Entrega & Suporte",
            description: "Deploy, handoff e suporte depois que o projeto entra no ar.",
          },
        ],
      },
      contact: {
        section: "07 · Contato · Orcamento Gratis",
        title: "Agenda aberta. Vamos conversar?",
        description:
          "Me conte o contexto, o problema e o prazo. Eu respondo com um proximo passo pratico, nao com promessa vaga.",
        cardTitle: "Resposta rapida",
        cardBody:
          "Prefere WhatsApp, e-mail ou LinkedIn? Tambem funciona. Use o canal que ficar mais facil para voce.",
        availability: "Disponivel agora",
        formIntro: "Preencha o formulario ou fale direto por um dos canais.",
      },
    }
    , [isEnglish]);


  const featuredProjects = useMemo<FeaturedProject[]>(() => {
    const order = [
      "habilidadeshumanasrh.com.br",
      "projetomaisvida.com.br",
      "marev.com.br",
    ];

    const meta = {
      "habilidadeshumanasrh.com.br": {
        badge: isEnglish ? "Institutional Website" : "Site Institucional",
        theme: {
          primary: "rgba(0,207,234,0.22)",
          secondary: "rgba(109,88,255,0.16)",
          accent: "#00cfea",
        },
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
        theme: {
          primary: "rgba(62,118,255,0.2)",
          secondary: "rgba(10,238,181,0.12)",
          accent: "#2e76ff",
        },
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
        theme: {
          primary: "rgba(10,238,181,0.16)",
          secondary: "rgba(0,207,234,0.12)",
          accent: "#0aeeb5",
        },
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

    return texts.projects.projects
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
          results: projectMeta.results,
        };
      });
  }, [isEnglish, texts.projects.projects]);

  useEffect(() => {
    if (featuredProjects.length === 0) return;

    setActiveProjectIndex((current) => Math.min(current, featuredProjects.length - 1));
  }, [featuredProjects.length]);

  useEffect(() => {
    if (featuredProjects.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveProjectIndex((current) => (current + 1) % featuredProjects.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [featuredProjects.length, lastManualClick]);

  const activeProject = featuredProjects[activeProjectIndex] ?? null;
  const showcaseProjects = featuredProjects.map((project) => ({
    color: project.theme.accent,
  }));

  const navLinks = useMemo(() => [
    { label: copy.nav.projects, href: "#projects" },
    { label: copy.nav.about, href: "#about" },
    { label: copy.nav.services, href: "#services" },
    { label: copy.nav.process, href: "#process" },
  ], [copy.nav]);

  const contactItems = useMemo(() => [
    {
      label: "WhatsApp",
      value: "+55 44 99165-8351",
      href: links.whatsapp,
      icon: "WA",
    },
    {
      label: "E-mail",
      value: "raulsigoli2000@gmail.com",
      href: links.email,
      icon: "@",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/raul-sigoli-137bb4173",
      href: links.linkedin,
      icon: "in",
    },
    {
      label: "GitHub",
      value: "github.com/rauzola",
      href: links.github,
      icon: "GH",
    },
  ], []);

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = 0.5 - (event.clientY - rect.top) / rect.height;

    heroPointerRef.current = { x, y };
    heroPointerX.set(x);
    heroPointerY.set(y);
  };

  const handleHeroPointerLeave = () => {
    heroPointerRef.current = { x: 0, y: 0 };
    heroPointerX.set(0);
    heroPointerY.set(0);
  };

  const handleMagnetMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height;

    event.currentTarget.style.transform = `translate3d(${(offsetX * 18).toFixed(2)}px, ${(offsetY * 16).toFixed(2)}px, 0)`;
  };

  const handleMagnetLeave = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.transform = "translate3d(0px, 0px, 0px)";
  };

  const handleWordmarkMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!wordmarkRef.current) return;

    isWordmarkInteractingRef.current = true;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    wordmarkRef.current.style.transform =
      `perspective(800px) rotateY(${(x * 16).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) scale(1.015)`;
  };

  const handleWordmarkEnter = () => {
    isWordmarkInteractingRef.current = true;
    if (wordmarkRef.current) {
      wordmarkRef.current.style.transform =
        "perspective(800px) rotateY(6deg) rotateX(-3deg) scale(1.015)";
    }
  };

  const handleWordmarkLeave = () => {
    isWordmarkInteractingRef.current = false;
    if (wordmarkRef.current) {
      wordmarkRef.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05080e] text-[#dce7f2]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top,rgba(0,207,234,0.14),transparent_58%)]" />

      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled
          ? "border-white/10 bg-[rgba(5,8,14,0.95)] backdrop-blur-xl"
          : "border-transparent bg-[rgba(5,8,14,0.72)] backdrop-blur-md"
          }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
          <Link href="#hero" className="flex flex-col gap-[1px] leading-none no-underline">
            <span className="font-display block text-[7.5px] font-light uppercase tracking-[0.48em] text-[#607a93]">
              Raul
            </span>
            <span className="font-display relative inline-block text-[16px] font-extrabold tracking-[-0.035em] text-[#dce7f2] after:absolute after:bottom-[-1px] after:right-0 after:h-[1.5px] after:w-[18%] after:rounded-[1px] after:bg-[#00cfea] after:content-['']">
              SIGOLI
            </span>
          </Link>

          <ul className="hidden items-center gap-7 text-[13px] text-[#607a93] md:flex">
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
            <li className="list-none">
              <Link
                href="#contact"
                className="rounded-lg bg-[#00cfea] px-5 py-2 font-medium text-[#05080e] transition-transform duration-200 hover:brightness-110 will-change-transform"
                onPointerMove={handleMagnetMove}
                onPointerLeave={handleMagnetLeave}
              >
                {copy.nav.contact}
              </Link>
            </li>
          </ul>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#dce7f2] md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
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
              <Link
                href="#contact"
                className="rounded-lg bg-[#00cfea] px-5 py-3 text-center font-medium text-[#05080e]"
                onClick={() => setMobileOpen(false)}
              >
                {copy.nav.contact}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </motion.nav>

      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28 md:px-10 md:pt-32"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={handleHeroPointerLeave}
      >
        <HeroScene3D pointerRef={heroPointerRef} />
        <HeroDiamonds />
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute left-1/2 top-16 -translate-x-1/2">
            <motion.div
              className="h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,207,234,0.18),transparent_68%)] blur-2xl"
              style={{ x: heroGlowMainX, y: heroGlowMainY }}
            />
          </div>
          <motion.div
            className="absolute -left-20 top-24 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(10,238,181,0.08),transparent_72%)] blur-3xl"
            style={{ x: heroGlowLeftX, y: heroGlowLeftY }}
          />
          <motion.div
            className="absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(109,88,255,0.08),transparent_70%)] blur-3xl"
            style={{ x: heroGlowRightX, y: heroGlowRightY }}
          />
          <motion.div
            className="absolute bottom-[-56px] left-[-10%] right-[-10%] h-[58%]"
            style={{
              x: heroGridX,
              y: heroGridY,
              rotateY: heroGridRotateY,
              rotateX: heroGridRotateX,
              transformPerspective: 650,
            }}
          >
            <div
              className="h-full w-full animate-grid-drift"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,207,234,0.08) 59px, rgba(0,207,234,0.08) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,207,234,0.08) 59px, rgba(0,207,234,0.08) 60px)",
              }}
            />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-9 inline-flex items-center gap-2 rounded-full border border-[rgba(0,207,234,0.22)] bg-[rgba(0,207,234,0.08)] px-4 py-1.5 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[#00cfea]"
          >
            <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
            {copy.hero.badge} · {copy.hero.badgeDetail}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-5 cursor-default [perspective:800px]"
            onPointerEnter={handleWordmarkEnter}
            onPointerMove={handleWordmarkMove}
            onPointerLeave={handleWordmarkLeave}
          >
            <div
              ref={wordmarkRef}
              className="inline-block transform-gpu transition-transform duration-150 ease-out [transform-style:preserve-3d]"
            >
              {/* margin-right: -0.55em cancels the extra letter-spacing after the last char,
                  keeping "Raul" visually centred below "SIGOLI" — mirrors .wm-r in the HTML */}
              <span className="font-display -mr-[0.55em] block text-[13px] font-light uppercase tracking-[0.55em] text-[#607a93]">
                {copy.hero.titleTop}
              </span>
              <h1 className="font-display relative inline-block text-[clamp(4.5rem,12vw,8.125rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#dce7f2] [text-shadow:0_2px_0_rgba(0,207,234,0.2),0_4px_0_rgba(0,207,234,0.1),0_6px_0_rgba(0,207,234,0.05),0_0_26px_rgba(0,207,234,0.12)] after:absolute after:bottom-1 after:right-0 after:h-1 after:w-[11%] after:rounded-[2px] after:bg-[#00cfea] after:shadow-[0_0_12px_rgba(0,207,234,0.5)] after:content-['']">
                {copy.hero.titleBottom}
              </h1>
              <span className="font-mono-ui mt-[18px] block text-[11px] uppercase tracking-[0.2em] text-[#243446]">
                {copy.hero.kicker}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mb-6 max-w-[640px] text-balance text-base leading-8 text-[#8aa2b8] md:text-lg"
          >
            {copy.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="mb-10 flex flex-wrap justify-center gap-2.5"
          >
            {copy.hero.highlights.map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-[#0b1220]/80 px-4 py-2 text-xs text-[#8aa2b8] backdrop-blur-md"
              >
                {item}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.84 }}
            className="mb-14 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-[10px] bg-[#00cfea] px-7 py-3.5 text-[15px] font-medium text-[#05080e] shadow-[0_0_36px_rgba(0,207,234,0.22)] transition-transform duration-200 hover:brightness-110 will-change-transform"
              onPointerMove={handleMagnetMove}
              onPointerLeave={handleMagnetLeave}
            >
              {copy.hero.primaryCta}
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-[10px] border border-white/10 px-7 py-3.5 text-[15px] text-[#dce7f2] transition-transform duration-200 hover:border-[rgba(0,207,234,0.35)] hover:text-[#00cfea] will-change-transform"
              onPointerMove={handleMagnetMove}
              onPointerLeave={handleMagnetLeave}
            >
              {copy.hero.secondaryCta}
            </Link>
            <Link
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-[10px] border border-[rgba(0,207,234,0.2)] bg-[rgba(0,207,234,0.08)] px-7 py-3.5 text-[15px] text-[#dce7f2] transition-transform duration-200 hover:border-[rgba(0,207,234,0.35)] hover:text-[#00cfea] will-change-transform"
              onPointerMove={handleMagnetMove}
              onPointerLeave={handleMagnetLeave}
            >
              WhatsApp
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.96 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {copy.hero.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -4 }}
                className="animate-float-gentle rounded-full border border-white/5 bg-[#0b1220] px-5 py-3 text-left"
                style={{ animationDelay: `${index * 0.8}s` }}
              >
                <div className="font-display text-lg font-extrabold tracking-[-0.03em] text-[#dce7f2]">
                  <AnimatedMetric value={stat.value} />
                </div>
                <div className="text-xs text-[#607a93]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 opacity-40 md:flex">
          <div className="h-10 w-px animate-scroll-line bg-gradient-to-b from-[#00cfea] to-transparent" />
          <span className="font-mono-ui text-[9px] uppercase tracking-[0.2em] text-[#607a93]">
            Scroll
          </span>
        </div>
      </section>

      <FloatingDivider variant="cyan" />

      <section id="about">
        <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
            {copy.about.section}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
            {copy.about.title}
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
                      src={profile.avatarUrl}
                      alt="Raul Sigoli"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="font-display mb-1 text-[9px] font-light uppercase tracking-[0.4em] text-[#607a93]">
                    Raul
                  </div>
                  <div className="font-display relative inline-block text-[42px] font-extrabold tracking-[-0.04em] text-[#dce7f2] after:absolute after:bottom-0 after:right-0 after:h-[3px] after:w-[18%] after:rounded-full after:bg-[#00cfea] after:content-['']">
                    SIGOLI
                  </div>
                  <div className="font-mono-ui mt-4 text-[10px] uppercase tracking-[0.18em] text-[#243446]">
                    Full-Stack · ID Brasil + SIGOLI
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
                {copy.about.cards.map((item) => (
                  <Tilt3DCard key={item.label} intensity={14}>
                    <div className="rounded-2xl border border-white/5 bg-[#0b1220] p-5 text-center shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                      <div className="font-display text-2xl font-extrabold text-[#dce7f2]">
                        {item.value}
                        <span className="text-sm text-[#00cfea]">{item.accent}</span>
                      </div>
                      <div className="text-xs text-[#607a93]">{item.label}</div>
                    </div>
                  </Tilt3DCard>
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
                {copy.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <Tilt3DCard intensity={8} className="mt-8">
                <div className="flex items-start gap-4 rounded-[18px] border border-[rgba(0,207,234,0.18)] bg-[#0b1220] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                  <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#0aeeb5] animate-live-pulse" />
                  <div>
                    <div className="font-display mb-1 text-lg font-bold text-[#dce7f2]">
                      {copy.about.noteTitle}
                    </div>
                    <div className="text-sm leading-7 text-[#607a93]">{copy.about.noteBody}</div>
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>
          </div>
        </SectionReveal>
      </section>

      <FloatingDivider variant="green" />

      <section id="services" className="border-y border-white/5 bg-[#080c16]">
        <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
            {copy.services.section}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
            {copy.services.title}
          </h2>
          <p className="mt-3 max-w-[560px] text-base leading-8 text-[#8aa2b8]">
            {copy.services.description}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {copy.services.items.map((service, index) => (
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
                      {copy.nav.contact} →
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
                  {copy.services.reasonTitle}
                </h3>
                <p className="text-sm leading-7 text-[#607a93]">{copy.services.reasonBody}</p>
              </div>
              <div className="space-y-4">
                {copy.services.reasons.map((reason, index) => (
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

      <FloatingDivider variant="cyan" />

      <section id="projects">
        <SectionReveal className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
          <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
            {copy.projects.section}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
            {copy.projects.title}
          </h2>
          <p className="mt-3 max-w-[560px] text-base leading-8 text-[#8aa2b8]">
            {copy.projects.description}
          </p>

          {activeProject ? (
            <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:min-h-[600px]">
              <motion.div
                key={activeProject.url}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="relative"
              >
                <ProjectsShowcase3D activeIndex={activeProjectIndex} projects={showcaseProjects} />

                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                  {featuredProjects.map((project, index) => (
                    <button
                      key={project.url}
                      type="button"
                      onClick={() => { setActiveProjectIndex(index); setLastManualClick(Date.now()); }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono-ui text-[10px] transition-all ${activeProjectIndex === index
                        ? "border-[rgba(0,207,234,0.3)] bg-[rgba(0,207,234,0.12)] text-[#00cfea] shadow-[0_0_22px_rgba(0,207,234,0.18)]"
                        : "border-white/10 bg-[#0b1220] text-[#607a93] hover:border-[rgba(0,207,234,0.22)]"
                        }`}
                    >
                      {project.index.slice(-2)}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                key={`${activeProject.url}-info`}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Tilt3DCard intensity={6}>
                  <div className="rounded-[28px] border border-white/5 bg-[#0b1220] p-8 shadow-[0_22px_70px_rgba(0,0,0,0.22)] lg:p-10">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="font-mono-ui text-[11px] text-[#243446]">{activeProject.index}</span>
                      <span
                        className="font-mono-ui rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.1em]"
                        style={{
                          color: activeProject.theme.accent,
                          borderColor: `${activeProject.theme.accent}33`,
                          backgroundColor: `${activeProject.theme.accent}14`,
                        }}
                      >
                        {activeProject.badge}
                      </span>
                      <span className="font-mono-ui flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#0aeeb5]">
                        <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
                        {copy.projects.live}
                      </span>
                    </div>

                    <h3 className="font-display text-[30px] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
                      {activeProject.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-8 text-[#607a93]">{activeProject.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="font-mono-ui rounded-md border border-white/10 px-2.5 py-1 text-[11px]"
                          style={{
                            color: tag.color,
                            backgroundColor: `${tag.color}14`,
                            borderColor: `${tag.color}33`,
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {activeProject.results.map((result) => (
                        <div
                          key={`${result.value}-${result.label}`}
                          className="rounded-2xl border border-white/5 bg-[#111827] p-4 text-center"
                        >
                          <div className="font-display text-2xl font-extrabold tracking-[-0.04em] text-[#dce7f2]">
                            {result.value}
                            <span className="text-[#00cfea]">{result.accent}</span>
                          </div>
                          <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#607a93]">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={activeProject.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[rgba(0,207,234,0.24)] bg-[rgba(0,207,234,0.08)] px-4 py-2.5 text-sm font-medium text-[#00cfea] transition-transform duration-200 hover:bg-[rgba(0,207,234,0.12)] will-change-transform"
                        onPointerMove={handleMagnetMove}
                        onPointerLeave={handleMagnetLeave}
                      >
                        {copy.projects.cta}
                        <span aria-hidden="true">↗</span>
                      </Link>
                      <Link
                        href="#contact"
                        className="inline-flex items-center rounded-lg border border-white/10 px-4 py-2.5 text-sm text-[#dce7f2] transition-transform duration-200 hover:border-[rgba(0,207,234,0.22)] hover:text-[#00cfea] will-change-transform"
                        onPointerMove={handleMagnetMove}
                        onPointerLeave={handleMagnetLeave}
                      >
                        {copy.nav.contact}
                      </Link>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            </div>
          ) : null}
        </SectionReveal>
      </section>

      <FloatingDivider variant="green" />

      <section id="tech" className="border-y border-white/5 bg-[#080c16]">
        <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
                {copy.tech.section}
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
                {copy.tech.title}
              </h2>
              <p className="mt-3 max-w-[520px] text-base leading-8 text-[#8aa2b8]">
                {copy.tech.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {copy.tech.categories.map((category, index) => (
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
                          <span
                            key={tag}
                            className="font-mono-ui rounded-md border border-[rgba(0,207,234,0.12)] bg-[rgba(0,207,234,0.06)] px-2.5 py-1 text-[11px] text-[#8fc8d6]"
                          >
                            {tag}
                          </span>
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

      <FloatingDivider variant="cyan" />

      <section id="testimonial">
        <SectionReveal className="mx-auto max-w-5xl px-6 py-24 md:px-10">
          <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
            {copy.testimonial.section}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
            {copy.testimonial.title}
          </h2>

          <div className="mt-12 max-w-4xl">
            <Tilt3DCard intensity={7}>
              <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-[#0b1220] p-8 shadow-[0_26px_80px_rgba(0,0,0,0.22)] md:p-12">
                <div className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(0,207,234,0.1),transparent_72%)]" />
                <div className="pointer-events-none absolute left-8 top-6 font-display text-[120px] leading-none text-[#00cfea]/8">
                  &quot;
                </div>
                <p className="relative z-10 text-lg italic leading-9 text-[#dce7f2]">
                  {copy.testimonial.quote}
                </p>
                <div className="relative z-10 mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[rgba(0,207,234,0.2)] bg-[#05080e] font-display text-lg font-extrabold text-[#00cfea]">
                    SL
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-[#dce7f2]">
                      {copy.testimonial.author}
                    </div>
                    <div className="text-sm text-[#607a93]">{copy.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.testimonial.proof.map((item, index) => (
              <motion.div
                key={item}
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
            ))}
          </div>
        </SectionReveal>
      </section>

      <FloatingDivider variant="green" />

      <section id="process" className="border-t border-white/5 bg-[#080c16]">
        <SectionReveal className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
            {copy.process.section}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
            {copy.process.title}
          </h2>
          <p className="mt-3 max-w-[520px] text-base leading-8 text-[#8aa2b8]">
            {copy.process.description}
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
            {copy.process.steps.map((step, index) => (
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

      <FloatingDivider variant="cyan" />

      <section id="contact" className="relative border-y border-white/5 bg-[#080c16]">
        <ContactScene3D />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
          <div className="absolute left-[10%] top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,207,234,0.08),transparent_70%)] blur-2xl" />
          <div className="absolute right-[10%] top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,238,181,0.06),transparent_72%)] blur-3xl" />
        </div>

        <SectionReveal className="relative mx-auto max-w-6xl px-6 py-24 md:px-10">
          <span className="font-mono-ui mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#243446]">
            {copy.contact.section}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#dce7f2]">
            {copy.contact.title}
          </h2>
          <p className="mt-3 max-w-[560px] text-base leading-8 text-[#8aa2b8]">
            {copy.contact.description}
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
                      {copy.contact.availability}
                    </h3>
                  </div>
                  <p className="mb-5 text-sm leading-7 text-[#607a93]">{copy.contact.cardBody}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={links.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-[#00cfea] px-5 py-3 text-sm font-medium text-[#05080e] transition-transform duration-200 hover:brightness-110 will-change-transform"
                      onPointerMove={handleMagnetMove}
                      onPointerLeave={handleMagnetLeave}
                    >
                      WhatsApp
                    </Link>
                    <Link
                      href={links.linkedin}
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
                    {texts.contact.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#607a93]">{copy.contact.formIntro}</p>
                </div>
                <ContactForm texts={texts.contact} />
              </div>
            </Tilt3DCard>
          </div>
        </SectionReveal>
      </section>

      <footer className="px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-[7px] font-light uppercase tracking-[0.45em] text-[#243446]">
              Raul
            </div>
            <div className="font-display relative inline-block text-[20px] font-extrabold tracking-[-0.04em] text-[#dce7f2] after:absolute after:bottom-[-1px] after:right-0 after:h-[1.5px] after:w-[18%] after:rounded-[1px] after:bg-[#00cfea] after:content-['']">
              SIGOLI
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-[13px] text-[#607a93]">
            {[
              { href: "#projects", label: copy.nav.projects },
              { href: "#tech", label: copy.tech.title },
              { href: links.linkedin, label: "LinkedIn", external: true },
              { href: links.github, label: "GitHub", external: true },
              { href: links.cv, label: "CV", external: true },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="transition-colors duration-200 hover:text-[#00cfea] will-change-transform"
                onPointerMove={handleMagnetMove}
                onPointerLeave={handleMagnetLeave}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[#243446]">
            (c) 2026 Raul Sigoli · Maringa, PR
          </div>
        </div>
      </footer>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(0,207,234,0.18)] bg-[rgba(5,8,14,0.96)] px-6 py-3 backdrop-blur-xl transition-transform duration-300 md:px-10 ${showStickyBar ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[#0aeeb5]">
            <span className="h-2 w-2 rounded-full bg-[#0aeeb5] animate-live-pulse" />
            {copy.contact.availability}
          </div>
          <div className="text-sm text-[#607a93] md:flex-1 md:px-6">
            <strong className="text-[#dce7f2]">Raul Sigoli</strong>
            {" · Freelancer Full-Stack"}
          </div>
          <Link
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#00cfea] px-5 py-3 text-sm font-medium text-[#05080e] transition-transform duration-200 hover:brightness-110 will-change-transform md:w-auto"
            onPointerMove={handleMagnetMove}
            onPointerLeave={handleMagnetLeave}
          >
            {copy.nav.contact}
          </Link>
        </div>
      </div>
    </main>
  );
};
