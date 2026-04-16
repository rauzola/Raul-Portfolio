# Contexto - Redesign do Raul Portfolio

## Objetivo

Atualizar o portfolio existente em `D:\www\Raul-Portfolio` usando a identidade e a direcao visual do arquivo:

`C:\Users\Raul\Desktop\Raul Sigoli\sigoli-portfolio-v3.html`

Nao criar outro projeto do zero.
A ideia e reutilizar o projeto atual e transformar a home em algo mais premium, comercial e focado em captacao de clientes.

## Direcao Principal

- Manter `Next.js + TypeScript + Tailwind`
- Reduzir complexidade desnecessaria
- Tirar cara de portfolio antigo de dev
- Colocar cara de marca premium que vende servico
- Focar em conversao, autoridade e clareza

## Problemas identificados no projeto atual

### 1. Hero muito pesado

Arquivo: `src/components/sections/hero.tsx`

- Uso de `Spline`
- Uso de canvas/3D
- Muitos efeitos ao mesmo tempo
- Muito foco em efeito e pouco foco em mensagem comercial

### 2. Estrutura da homepage pouco estrategica

Arquivo: `src/components/main-page.tsx`

- Tem `ParticlesBG`
- Tem `LanguageSwitch`
- Tem `Experiences` e `Tecnologies` com muito destaque
- A estrutura atual mostra mais "perfil tecnico" do que "oferta premium"

### 3. Regras globais ruins para site comercial

Arquivo: `src/app/globals.css`

- `scroll-snap-type: y mandatory`
- `section { height: 100dvh; overflow: hidden; }`
- `body { background-color: lightblue; }`

Essas decisoes limitam o layout e passam cara de projeto experimental.

### 4. Dependencias demais

Arquivo: `package.json`

Hoje o projeto tem varias libs que provavelmente nao ajudam a vender mais:

- `@react-three/drei`
- `@react-three/fiber`
- `@splinetool/react-spline`
- `@tsparticles/react`
- `@tsparticles/slim`
- `swiper`
- timeline e outros efeitos secundarios

## Estrutura recomendada para a nova homepage

### 1. Hero

- Headline forte
- Subheadline clara
- CTA principal
- CTA secundario
- Provas curtas e visuais

### 2. Projetos em producao

- Cards premium
- Prints reais
- Sem slider escondendo informacao
- Mostrar 3 a 5 cases fortes

### 3. Servicos

- Explicacao simples e comercial
- Clareza do que o Raul entrega

### 4. Prova social

- Depoimento da Silvana em destaque

### 5. Processo

- Simples
- Visual
- Transparente

### 6. Contato

- Direto
- Sem friccao

## O que remover ou reduzir

- `Spline`
- `Three.js`/canvas pesado no hero
- `ParticlesBG`
- slider de projetos
- excesso de secoes tecnicas
- efeitos que nao ajudam conversao

## Referencia visual

Usar como direcao visual principal:

`C:\Users\Raul\Desktop\Raul Sigoli\sigoli-portfolio-v3.html`

Mas como referencia visual, nao copiar como codigo final monolitico.

## Abordagem ideal de implementacao

1. Simplificar a base atual
2. Reestruturar a homepage
3. Recriar layout no estilo do `v3`
4. Manter so o que ajuda a vender
5. Melhorar performance, SEO e manutencao

## Meta final

Deixar o portfolio com cara de:

- premium
- confiavel
- moderno
- comercial
- forte em branding

E nao com cara de:

- experimento visual
- portfolio de dev generico
- site pesado cheio de efeitos
