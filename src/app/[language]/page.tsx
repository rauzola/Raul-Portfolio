import { PortfolioPage } from "@/components/portfolio-page";
import { texts } from "@/config/constants";

export function generateStaticParams() {
  return [{ language: "en" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const text = texts[language] || texts["pt-br"];

  return <PortfolioPage texts={text} language={language} />;
}
