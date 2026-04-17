const PUBLIC_REPOS = 92;

export function getCopy(isEnglish: boolean) {
  if (isEnglish) {
    return {
      nav: {
        projects: "Projects",
        about: "About",
        services: "Services",
        process: "Process",
        contact: "Request Quote",
        languageLabel: "Language",
      },
      hero: {
        badge: "Available for new projects",
        badgeDetail: "Open calendar",
        kicker: "Full-Stack Developer · Maringa, PR · ID Brasil + SIGOLI",
        titleTop: "Raul",
        titleBottom: "SIGOLI",
        visibleHeading: "Full-Stack Developer for websites, SEO and custom systems",
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
          { value: `${PUBLIC_REPOS}+`, label: "public repositories on GitHub" },
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
          `On GitHub, the username rauzola gathers ${PUBLIC_REPOS}+ public repositories, and the same technical rigor appears in client projects like Habilidades Humanas, Projeto Mais Vida and MAREV.`,
        ],
        noteTitle: "Available now for new projects",
        noteBody:
          "Open calendar for websites, CMS structures, local SEO and custom systems. Scope, timeline and investment are defined clearly before development starts.",
        cards: [
          { value: `${PUBLIC_REPOS}`, accent: "+", label: "public repositories" },
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
      footer: {
        description: "Websites, technical SEO and custom systems built with direct communication and clear delivery goals.",
        navLabel: "Navigate",
        connectLabel: "Connect",
        shortRole: "Full-Stack Freelancer",
        longRole: "Full-Stack freelancer based in Maringa, PR",
      },
    };
  }

  return {
    nav: {
      projects: "Projetos",
      about: "Sobre",
      services: "Servicos",
      process: "Processo",
      contact: "Solicitar Orcamento",
      languageLabel: "Idioma",
    },
    hero: {
      badge: "Disponivel para novos projetos",
      badgeDetail: "Agenda aberta",
      kicker: "Full-Stack Developer · Maringa, PR · SIGOLI",
      titleTop: "Raul",
      titleBottom: "SIGOLI",
      visibleHeading: "Desenvolvedor Full-Stack para sites, SEO e sistemas sob medida",
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
        { value: `${PUBLIC_REPOS}+`, label: "repositorios publicos no GitHub" },
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
        `No GitHub, o usuario rauzola reune ${PUBLIC_REPOS}+ repositorios publicos, e a mesma base tecnica aparece em entregas para Habilidades Humanas, Projeto Mais Vida e MAREV.`,
      ],
      noteTitle: "Disponivel agora para novos projetos",
      noteBody:
        "Agenda aberta para sites, CMS, SEO local e sistemas personalizados. Escopo, prazo e investimento ficam claros antes do desenvolvimento comecar.",
      cards: [
        { value: `${PUBLIC_REPOS}`, accent: "+", label: "repositorios publicos" },
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
    footer: {
      description: "Sites, SEO tecnico e sistemas sob medida com contato direto e entregas pensadas para gerar clareza no negocio.",
      navLabel: "Navegacao",
      connectLabel: "Conecte-se",
      shortRole: "Freelancer Full-Stack",
      longRole: "Freelancer Full-Stack em Maringa, PR",
    },
  };
}

export type Copy = ReturnType<typeof getCopy>;
