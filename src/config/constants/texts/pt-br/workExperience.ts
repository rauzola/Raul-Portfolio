import { WorkExperienceTexts } from "@/types/texts";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { tags } from "../../tags";

export const workExperience: WorkExperienceTexts = {
  title: "Experiência Profissional",
  experiences: [
    {
      name: "Estudante de Análise e Desenvolvimento de Sistemas (ADS)",
      companyName: "UNICV",
      description:
        "Atualmente cursando Análise e Desenvolvimento de Sistemas, aprofundando conhecimentos em desenvolvimento de software, análise de sistemas e tecnologias web, buscando sempre aplicar os aprendizados em projetos práticos.",
      from: "2023-01",
      to: "2025-12-01",
      tags: [tags["Typescript"], tags["React.js"], tags["Next.js"]], // pode ajustar as tags se quiser
      icon: "React.js",
    },
    {
      name: "Desenvolvedor Frontend",
      companyName: "Mestres da Web",
      description:
        "Como Desenvolvedor Frontend na Mestres da Web, utilizo React, Next.js e TypeScript para desenvolver aplicações web de alta qualidade. Minhas responsabilidades incluem criar interfaces de usuário rápidas, interativas e acessíveis. Colaboro com a equipe de backend para integrar o frontend com os serviços de backend e garantir funcionalidade perfeita. Além disso, lido com a implantação de aplicações. Trabalhando em um ambiente ágil, contribuo ativamente para os esforços da equipe em entregar software de primeira linha.",
      from: "2023-01-01",
      to: "2024-06-01",
      tags: [tags["React.js"], tags["Next.js"], tags["Typescript"]],
      icon: "Next.js",
    },
    {
      name: "Estagiário de Programação Front-End",
      companyName: "Datlo",
      description:
        "Fui responsável pelo desenvolvimento do front-end da plataforma inteligente de localização. A plataforma fornecia soluções que auxiliavam empresas a encontrar novos clientes, parceiros estratégicos, monitorar o mercado e os concorrentes, e abrir novas lojas em pontos estratégicos. Durante o projeto, utilizei ferramentas como React/Next.js, Typescript, ANT-Design, Leaflet, Styled-components e GraphQL.",
      from: "2022-10",
      to: "2023-07",
      tags: [
        tags["React.js"],
        tags["Next.js"],
        tags["Typescript"],
        tags["GraphQL"],
      ],
      icon: "React.js",
    },
    {
      name: "Estagiário de T.I",
      companyName: "Anpad",
      description:
        "Atuava como Desenvolvedor Front-end, responsável pela criação de sites e desenvolvimento de rotas para eventos realizados. Possuo experiência na edição de vídeos utilizando o Adobe Premiere e habilidades de edição gráfica no Adobe Photoshop.",
      from: "2020-08",
      to: "2022-08",
      tags: [tags["HTML"], tags["CSS"], tags["JavaScript"]],
      icon: "React.js",
    },
    {
      name: "Estagiário de Infraestrutura",
      companyName: "Pressure Compressores",
      description:
        "Atuava na parte de Infraestrutura da fábrica, reparando e arrumando computadores, impressoras e sistemas (quando necessário).",
      from: "2019-01",
      to: "2019-11",
      tags: [tags["Infraestrutura"], tags["Hardware"]],
      icon: "React.js",
    },
    {
      name: "Editor de Vídeo",
      companyName: "Band Maringá",
      description:
        "Editava vídeos e matérias do Programa da Mirna Lavecc, que ia ao ar todos os sábados.",
      from: "2017",
      to: "2018",
      tags: [tags["Edição de Vídeo"], tags["Adobe Premiere"]],
      icon: "React.js",
    },
  ],
};

