import "../globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { dmSans, jetBrainsMono, syne } from "@/app/fonts";
import { getSiteJsonLd } from "@/lib/site-metadata";

const jsonLd = getSiteJsonLd("pt-br");

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
