export const LINKS = {
  email: "mailto:raulsigoli2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/raul-sigoli-137bb4173/",
  github: "https://github.com/rauzola",
  whatsapp: "https://wa.me/5544991658351",
} as const;

export function getWhatsAppLink(message: string): string {
  return `${LINKS.whatsapp}?text=${encodeURIComponent(message)}`;
}
