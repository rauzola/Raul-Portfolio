# raulsigoli.com.br — Portfolio v3

Site comercial de Raul Sigoli, desenvolvedor Full-Stack freelancer em Maringá, PR.  
Foco em captação de clientes: clareza, autoridade e conversão — não showcase técnico.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS |
| Animações | Framer Motion 11 |
| 3D / WebGL | @react-three/fiber 9, Three.js 0.182 |
| Email | Nodemailer + Gmail OAuth |
| Deploy | Vercel |

## Rotas

```
/          →  página principal (pt-BR) — estática
/en        →  página em inglês — SSG via generateStaticParams
/api/contato  →  POST — envio de email via Nodemailer
```

## Variáveis de ambiente

Crie `.env.local` na raiz:

```env
GMAIL_USER=seu@gmail.com
GMAIL_PASS=sua_app_password
NEXT_PUBLIC_SITE_URL=https://raulsigoli.com.br
```

## Como rodar localmente

```bash
git clone https://github.com/rauzola/raul-portfolio
cd raul-portfolio
npm install
cp .env.local.example .env.local   # preencha as variáveis
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto

```
src/
├── app/
│   ├── (default)/          # rota / — pt-BR
│   ├── (localized)/[language]/  # rota /en
│   ├── fonts.ts            # Syne, DM Sans, JetBrains Mono
│   ├── layout.tsx
│   └── sitemap.ts
│
├── components/
│   ├── sections/           # 11 seções da página
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── services-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── tech-section.tsx
│   │   ├── testimonial-section.tsx
│   │   ├── process-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── footer-section.tsx
│   │   ├── portfolio-nav.tsx
│   │   └── sticky-bar.tsx
│   ├── portfolio-page.tsx  # orquestrador principal (~200 linhas)
│   ├── scene-canvas.tsx    # wrapper WebGL com viewport gating
│   ├── hero-scene-3d.tsx   # cena 3D do hero
│   ├── tech-orbit-3d.tsx   # órbita de tecnologias
│   ├── projects-showcase-3d.tsx
│   ├── process-scene-3d.tsx
│   ├── contact-scene-3d.tsx
│   ├── custom-cursor.tsx   # cursor animado (desktop only)
│   ├── flee-element.tsx    # wrapper com física de fuga do cursor
│   ├── floating-divider.tsx
│   ├── hero-diamonds.tsx
│   ├── section-reveal.tsx  # fade-in via IntersectionObserver
│   └── tilt-3d-card.tsx
│
├── config/
│   ├── copy.ts             # getCopy(isEnglish) — todo copy bilíngue
│   ├── links.ts            # LINKS + getWhatsAppLink()
│   └── constants/          # dados dos projetos, textos base
│
├── lib/
│   ├── magnet.ts           # handleMagnetMove / handleMagnetLeave
│   ├── physics.ts          # calcDist, normalizePointer
│   ├── spring-configs.ts   # configs de spring Framer Motion
│   ├── site-metadata.ts    # siteUrl, metadata base
│   └── utils.ts            # cn(), getHostname()
│
└── types/
    ├── pointer.ts          # PointerState { x, y }
    ├── projects.ts         # Project, FeaturedProject
    └── texts.ts
```

## Arquitetura de componentes

`portfolio-page.tsx` é o único ponto de orquestração — computa `copy`, `whatsappLink`, `featuredProjects` e `contactItems` via `useMemo`, depois renderiza as seções em sequência. Cada seção recebe apenas um slice tipado do copy (`copy: Copy["hero"]`, `copy: Copy["about"]`, etc.) em vez do objeto completo.

## Copy bilíngue

Todo texto da UI vive em `src/config/copy.ts`:

```ts
import { getCopy } from "@/config/copy";

const copy = getCopy(isEnglish); // retorna objeto tipado
// copy.nav, copy.hero, copy.about, copy.services,
// copy.projects, copy.tech, copy.testimonial,
// copy.process, copy.contact, copy.footer
```

## WebGL / 3D — viewport gating

Todos os componentes 3D são carregados com `dynamic({ ssr: false })` e montados via `scene-canvas.tsx`, que:

- Só monta o `<Canvas>` após o elemento entrar no viewport (220px de margem)
- Pausa o loop de render com `frameloop="never"` quando fora da tela
- Usa `antialias: false` e `powerPreference: "high-performance"`

## Cursor animado

`CustomCursor` só ativa listeners e springs em dispositivos com mouse (`pointer: fine`). Em touch, o `useEffect` retorna antes de qualquer setup.

## SEO

- Schema.org JSON-LD `@graph` (Person + WebSite)
- `hreflang` pt-BR / en via `alternates`
- OG images geradas por rota (`opengraph-image.tsx`)
- Sitemap estático em `/sitemap.xml`
