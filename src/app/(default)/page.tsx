import { PortfolioPage } from "@/components/portfolio-page";
import { getSiteMetadata } from "@/lib/site-metadata";

export const metadata = getSiteMetadata("pt-br");

export default function Home() {
  return <PortfolioPage language="pt-br" />;
}
