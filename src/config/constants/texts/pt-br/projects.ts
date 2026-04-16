import { ProjectsTexts } from "@/types/texts";
import { tags } from "../../tags";
import {
  img_habilidadeshumanas,
  img_marev,
  img_projetomaisvida,
} from "@/assets/images/projects";

export const projects: ProjectsTexts = {
  title: "Projetos",
  projects: [
    {
      title: "Habilidades Humanas RH",
      description:
        "Site institucional com CMS Prismic, geracao de leads e posicionamento digital para uma consultoria de RH com 27 anos de mercado.",
      tags: [
        tags["Next.js"],
        tags["Typescript"],
        tags["Tailwind CSS"],
        tags["Prismic CMS"],
        tags["Vercel"],
      ],
      image: img_habilidadeshumanas,
      url: "https://www.habilidadeshumanasrh.com.br/",
      width: 1280,
      height: 720,
    },
    {
      title: "Projeto Mais Vida",
      description:
        "Site institucional com CMS Prismic, calendario de eventos dinamico e gestao de comunidades para o Projeto Mais Vida.",
      tags: [
        tags["Next.js"],
        tags["Typescript"],
        tags["Prismic CMS"],
        tags["Tailwind CSS"],
        tags["Vercel"],
      ],
      image: img_projetomaisvida,
      url: "https://www.projetomaisvida.com.br/",
      width: 1280,
      height: 720,
    },
    {
      title: "MAREV",
      description:
        "Site institucional com CMS Prismic e area de transparencia para a Associacao Maringa Apoiando a Recuperacao de Vidas.",
      tags: [
        tags["Next.js"],
        tags["Typescript"],
        tags["Prismic CMS"],
        tags["Vercel"],
      ],
      image: img_marev,
      url: "https://www.marev.com.br/",
      width: 1280,
      height: 720,
    },
  ],
};
