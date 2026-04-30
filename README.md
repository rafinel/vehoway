# Vehoway

Site institucional da Vehoway em Astro com Sanity Studio embutido em `/admin` e deploy preparado para Netlify.

## Stack

- Astro 6
- `@astrojs/netlify`
- Sanity (`@sanity/astro` + Studio em `/admin`)
- Tailwind CSS

## Scripts

- `npm run dev`: sobe o ambiente local
- `npm run typecheck`: valida tipos e arquivos Astro
- `npm run build`: gera a build de produção
- `npm run preview`: preview local da build

## Variáveis de ambiente

Configure estas variáveis na Netlify:

- `SANITY_PROJECT_ID`: project id do Sanity
- `SANITY_DATASET`: dataset usado pelo site e pelo Studio

Variável opcional:

- `SANITY_API_TOKEN`: só necessária se algum fluxo futuro exigir acesso autenticado ao Sanity

## Deploy na Netlify

1. Importe o repositório na Netlify.
2. Configure o comando de build como `npm run build`.
3. Configure o publish directory como `dist`.
4. Configure as variáveis `SANITY_PROJECT_ID` e `SANITY_DATASET`.

O projeto já está configurado com `@astrojs/netlify` e `netlify.toml`, então SSR, API routes e o Studio em `/admin` já ficam compatíveis com a plataforma.

## Rotas principais

- `/`: homepage
- `/admin`: Sanity Studio embutido
- `/api/catalogs/download-all`: baixa um `.zip` com todos os catálogos publicados

## Checklist antes de publicar

1. Rode `npm run typecheck`
2. Rode `npm run build`
3. Confirme que existem categorias e catálogos publicados no Sanity
4. Confirme as variáveis de ambiente no painel da Netlify
