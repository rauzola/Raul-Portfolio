import { ProjectsTexts } from "@/types/texts";
import { tags } from "../../tags";
import {
  img_habilidadeshumanas,
  img_marev,
  img_projetomaisvida,
} from "@/assets/images/projects";

export const projects: ProjectsTexts = {
  title: "Projects",
  projects: [
    {
      title: "Habilidades Humanas RH",
      description:
        "Institutional website with Prismic CMS, lead generation and digital positioning for an HR consultancy with 27 years in the market.",
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
        "Institutional website with Prismic CMS, dynamic event calendar and community management for Projeto Mais Vida.",
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
        "Institutional website with Prismic CMS and a transparency area for the Associacao Maringa Apoiando a Recuperacao de Vidas.",
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
