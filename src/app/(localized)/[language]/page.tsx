import { notFound } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio-page";
import { texts } from "@/config/constants";
import { getSiteMetadata, isLocalizedLanguage } from "@/lib/site-metadata";

export function generateStaticParams() {
  return [{ language: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  if (!isLocalizedLanguage(language)) {
    notFound();
  }

  return getSiteMetadata(language);
}

export default async function Home({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  if (!isLocalizedLanguage(language)) {
    notFound();
  }

  return <PortfolioPage texts={texts[language]} language={language} />;
}
