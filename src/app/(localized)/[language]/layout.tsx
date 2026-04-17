import "../../globals.css";
import { notFound } from "next/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { dmSans, jetBrainsMono, syne } from "@/app/fonts";
import { getHtmlLang, getSiteJsonLd, isLocalizedLanguage } from "@/lib/site-metadata";

export default async function LocalizedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}>) {
  const { language } = await params;

  if (!isLocalizedLanguage(language)) {
    notFound();
  }

  const jsonLd = getSiteJsonLd(language);

  return (
    <html lang={getHtmlLang(language)}>
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
