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

export interface FeaturedProject extends Project {
  index: string;
  hostname: string;
  badge: string;
  domain: string;
  results: {
    value: string;
    accent: string;
    label: string;
  }[];
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}