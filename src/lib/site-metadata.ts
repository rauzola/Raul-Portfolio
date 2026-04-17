import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://raulsigoli.com.br";

export type SiteLanguage = "pt-br" | "en";
export type LocalizedLanguage = "en";

const localizedLanguages: readonly LocalizedLanguage[] = ["en"];

export function isLocalizedLanguage(value: string): value is LocalizedLanguage {
  return localizedLanguages.includes(value as LocalizedLanguage);
}

export function getHtmlLang(language: SiteLanguage) {
  return language === "en" ? "en" : "pt-BR";
}

function getLocaleUrl(language: SiteLanguage) {
  return language === "en" ? `${siteUrl}/en` : siteUrl;
}

export function getSiteMetadata(language: SiteLanguage): Metadata {
  const isEnglish = language === "en";
  const localeUrl = getLocaleUrl(language);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isEnglish
        ? "Raul Sigoli | Full-Stack Developer"
        : "Raul Sigoli | Desenvolvedor Full-Stack",
      template: "%s | Raul Sigoli",
    },
    description: isEnglish
      ? "Full-Stack developer in Maringa, PR. I build websites, technical SEO structures and custom systems for companies that want to grow online."
      : "Desenvolvedor Full-Stack em Maringá, PR. Crio sites, SEO técnico e sistemas sob medida para empresas que querem crescer no digital.",
    keywords: isEnglish
      ? [
        "full-stack developer",
        "website development",
        "landing page",
        "technical SEO",
        "Next.js",
        "React",
        "TypeScript",
        "Maringa",
        "Parana",
        "freelancer",
        "web system",
        "Raul Sigoli",
      ]
      : [
        "desenvolvedor full-stack",
        "criação de sites",
        "landing page",
        "SEO técnico",
        "Next.js",
        "React",
        "TypeScript",
        "Maringá",
        "Paraná",
        "freelancer",
        "sistema web",
        "Raul Sigoli",
      ],
    authors: [{ name: "Raul Sigoli", url: siteUrl }],
    creator: "Raul Sigoli",
    openGraph: {
      type: "website",
      locale: isEnglish ? "en_US" : "pt_BR",
      url: localeUrl,
      siteName: "Raul Sigoli",
      title: isEnglish
        ? "Raul Sigoli | Full-Stack Developer"
        : "Raul Sigoli | Desenvolvedor Full-Stack",
      description: isEnglish
        ? "Websites, systems and technical SEO for businesses that want to grow online. Based in Maringa, PR."
        : "Sites, sistemas e SEO técnico para negócios que querem crescer no digital. Baseado em Maringá, PR.",
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish
        ? "Raul Sigoli | Full-Stack Developer"
        : "Raul Sigoli | Desenvolvedor Full-Stack",
      description: isEnglish
        ? "Websites, systems and technical SEO for businesses that want to grow online."
        : "Sites, sistemas e SEO técnico para negócios que querem crescer no digital.",
      creator: "@rauzola",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: localeUrl,
      languages: {
        "pt-BR": siteUrl,
        en: `${siteUrl}/en`,
        "x-default": siteUrl,
      },
    },
    icons: {
      icon: [{ url: "/logo/svg-transparente/sigoli-v6a-sg-texto-claro.svg", type: "image/svg+xml" }],
      shortcut: "/logo/svg-transparente/sigoli-v6a-sg-texto-claro.svg",
    },
  };
}

export function getSiteJsonLd(language: SiteLanguage) {
  const isEnglish = language === "en";
  const localeUrl = getLocaleUrl(language);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Raul Henrique Silva Sigoli",
        givenName: "Raul",
        familyName: "Sigoli",
        url: siteUrl,
        email: "raulsigoli2000@gmail.com",
        telephone: "+5544991658351",
        jobTitle: isEnglish ? "Full-Stack Developer" : "Desenvolvedor Full-Stack",
        worksFor: {
          "@type": "Organization",
          name: "ID Brasil Sistemas",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Maringá",
          addressRegion: "PR",
          addressCountry: "BR",
        },
        sameAs: [
          "https://github.com/rauzola",
          "https://www.linkedin.com/in/raul-sigoli-137bb4173/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${localeUrl}/#website`,
        url: localeUrl,
        name: "Raul Sigoli",
        inLanguage: getHtmlLang(language),
        description: isEnglish
          ? "Portfolio and Full-Stack development services"
          : "Portfolio e serviços de desenvolvimento Full-Stack",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${localeUrl}/#webpage`,
        url: localeUrl,
        name: isEnglish
          ? "Raul Sigoli | Full-Stack Developer"
          : "Raul Sigoli | Desenvolvedor Full-Stack",
        inLanguage: getHtmlLang(language),
        isPartOf: { "@id": `${localeUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        description: isEnglish
          ? "Homepage for Raul Sigoli's portfolio and development services."
          : "Pagina inicial do portfolio e servicos de desenvolvimento de Raul Sigoli.",
      },
      {
        "@type": "Service",
        provider: { "@id": `${siteUrl}/#person` },
        name: isEnglish
          ? "Website and Systems Development"
          : "Desenvolvimento de Sites e Sistemas",
        description: isEnglish
          ? "Creation of business websites, landing pages, custom systems and technical SEO for small businesses and independent professionals."
          : "Criação de sites institucionais, landing pages, sistemas sob medida e SEO técnico para pequenas empresas e profissionais.",
        areaServed: { "@type": "Country", name: isEnglish ? "Brazil" : "Brasil" },
        serviceType: isEnglish ? "Web Development" : "Desenvolvimento Web",
      },
    ],
  };
}
