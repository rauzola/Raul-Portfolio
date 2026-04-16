import { MainPage } from "@/components/main-page";
import { texts } from "@/config/constants";

export default async function Home({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const text = texts[language] || texts["pt-br"];

  return <MainPage texts={text} />;
}
