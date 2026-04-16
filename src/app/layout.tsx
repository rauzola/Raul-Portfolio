import type { Metadata } from "next";
import "./globals.css";
import { dmSans, jetBrainsMono, syne } from "./fonts";
import { CustomCursor } from "@/components/custom-cursor";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://raulsigolidev.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Raul Sigoli | Desenvolvedor Full-Stack",
    template: "%s | Raul Sigoli",
  },
  description:
    "Desenvolvedor Full-Stack em Maringá, PR. Crio sites, SEO técnico e sistemas sob medida para empresas que querem crescer no digital.",
  keywords: [
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
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Raul Sigoli",
    title: "Raul Sigoli | Desenvolvedor Full-Stack",
    description:
      "Sites, sistemas e SEO técnico para negócios que querem crescer no digital. Baseado em Maringá, PR.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raul Sigoli | Desenvolvedor Full-Stack",
    description:
      "Sites, sistemas e SEO técnico para negócios que querem crescer no digital.",
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
    canonical: siteUrl,
    languages: {
      "pt-BR": siteUrl,
      "en-US": `${siteUrl}/en`,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

const jsonLd = {
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
      jobTitle: "Desenvolvedor Full-Stack",
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
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Raul Sigoli",
      description: "Portfolio e serviços de desenvolvimento Full-Stack",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Service",
      provider: { "@id": `${siteUrl}/#person` },
      name: "Desenvolvimento de Sites e Sistemas",
      description:
        "Criação de sites institucionais, landing pages, sistemas sob medida e SEO técnico para pequenas empresas e profissionais.",
      areaServed: { "@type": "Country", name: "Brasil" },
      serviceType: "Desenvolvimento Web",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${syne.variable} ${jetBrainsMono.variable} min-h-screen bg-[#05080e] text-[#dce7f2] antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
