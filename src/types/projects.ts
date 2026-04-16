import { StaticImageData } from "next/image";
import { Tag } from "./tag";

export interface LanguageText {
  "pt-br": string;
  "en": string;
}

export interface Project {
  title: string;
  description: string;
  tags: Tag[];
  image: string | StaticImageData;
  url: string;
  height?: number;
  width?: number;
}