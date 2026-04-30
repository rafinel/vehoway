## Context

O projeto é um site vitrine Astro para a Vehoway, com Sanity como CMS para conteúdo de catálogo. A rota `/` ainda está no estado inicial do template Astro, enquanto o design aprovado em `design/vehoway.pen` contém uma homepage completa com header, hero, linhas de produto, catálogos, bloco de ajuda, credibilidade e footer.

A arquitetura define home SSG, `/products` SSR, Sanity para categorias/produtos/catálogos e UI baseada em Tailwind CSS + DaisyUI. A decisão de produto mais recente é que contato comercial não será gerido pelo CMS nesta versão: o WhatsApp será global e os profissionais, quando exibidos, serão hardcoded no frontend, sem relação com produtos.

## Goals / Non-Goals

**Goals:**

- Entregar a rota `/` como homepage pública responsiva e alinhada ao design system da Vehoway.
- Buscar categorias e catálogos do Sanity em build time para renderização SSG.
- Usar Tailwind CSS e DaisyUI como base de styling/componentes, preservando os tokens visuais documentados.
- Exibir CTA de WhatsApp global com mensagem pré-preenchida a partir do contexto disponível.
- Exibir bloco de ajuda comercial com profissionais hardcoded no frontend, sem depender do Sanity.
- Manter a home resiliente e indexável, com HTML renderizado no build.

**Non-Goals:**

- Não implementar `/products`, filtros, paginação, drawer de produto ou busca nesta mudança.
- Não modelar `professional` no Sanity.
- Não criar relação entre `professional` e `product`.
- Não implementar múltiplos canais de contato; o canal oficial desta mudança é WhatsApp global.
- Não implementar preview interativo completo de PDF.

## Decisions

### Decision: Homepage SSG com dados de Sanity em build time

A rota `/` será renderizada como SSG, buscando categorias e catálogos durante o build. Isso preserva performance, SEO e disponibilidade mesmo quando o Sanity não estiver disponível em runtime.

As integrações de dados da home devem reutilizar a organização do projeto em `src/cms/sanity/collections`, centralizando ali as coleções concretas de acesso ao Sanity. Configurações sensíveis e identificadores de ambiente devem ser lidos via `src/constants/env.ts`, evitando espalhar acesso direto a `import.meta.env` pela implementação.

Alternativa considerada: renderizar a home via SSR. Foi descartada porque o conteúdo da home não exige dados frescos por request e a arquitetura já define SSG para essa rota.

### Decision: Contato comercial fora do CMS

O número de WhatsApp será uma constante/configuração local do frontend, e os profissionais exibidos na home serão uma lista hardcoded. O CMS continuará focado em categorias, produtos e catálogos.

Alternativa considerada: criar schema `professional` no Sanity. Foi descartada porque não há necessidade atual de gestão editorial de profissionais nem relação com produtos, e isso aumentaria a complexidade do modelo de dados.

### Decision: Componentização por seções da home

A implementação deve separar a home em componentes de seção, como header, hero, linhas de produto, catálogos, ajuda comercial, credibilidade e footer. Isso mantém a página legível sem transformar a home em uma única árvore extensa.

Alternativa considerada: implementar tudo diretamente em `src/pages/index.astro`. Foi descartada para reduzir acoplamento visual e facilitar manutenção de seções.

### Decision: Tailwind CSS + DaisyUI com customização visual da Vehoway

DaisyUI será usado para acelerar componentes base como botões, cards e elementos responsivos, mas a aparência final deve seguir o design system documentado: Manrope, `#F6C21F`, preto técnico, superfícies claras, blocos escuros e bordas sutis.

Alternativa considerada: CSS puro sem Tailwind/DaisyUI. Foi descartada porque a arquitetura já escolheu Tailwind CSS + DaisyUI e a home se beneficia de utilitários responsivos e componentes base sem runtime extra.

### Decision: Fallbacks para conteúdo editorial

Se categorias ou catálogos não estiverem disponíveis no Sanity durante desenvolvimento, a home deve manter estrutura visual funcional com estados vazios ou conteúdo mínimo seguro. Categorias e catálogos publicados no Sanity devem ser renderizados com limite visual definido pela homepage, evitando que a seção cresça sem controle.

Alternativa considerada: assumir que o Sanity sempre terá conteúdo. Foi descartada porque o projeto ainda está em fase inicial e a homepage precisa ser desenvolvível em ambientes locais ou datasets vazios.

### Decision: Assets visuais locais para a homepage

As imagens definitivas da homepage serão assets locais do projeto, em vez de virem do Sanity. O Sanity continuará fornecendo dados editoriais de categorias e catálogos, mas a composição visual principal da home usará imagens versionadas junto ao frontend.

Alternativa considerada: buscar todas as imagens principais do Sanity. Foi descartada porque a home tem direção visual de marca mais controlada e não precisa que esses assets sejam editáveis pelo CMS nesta versão.

## Risks / Trade-offs

- Sanity sem dados suficientes no build -> usar estados vazios ou placeholders controlados para categorias/catálogos.
- DaisyUI pode impor aparência genérica -> customizar tokens/classes para manter a linguagem industrial/comercial da Vehoway.
- Profissionais hardcoded exigem deploy para alteração -> aceitar nesta versão porque contato comercial não é gerido via CMS.
- WhatsApp global ainda não definido durante implementação -> usar placeholder/configuração local substituível sem alterar a arquitetura.
- WhatsApp global reduz roteamento comercial por categoria -> mitigar com mensagem pré-preenchida contendo categoria e/ou intenção do usuário.
- Assets locais exigem deploy para troca de imagem -> aceitar nesta versão porque as imagens principais da home são parte da direção visual de marca.

## Migration Plan

1. Instalar/configurar Tailwind CSS e DaisyUI se ainda não estiverem presentes.
2. Criar tokens/estilos globais compatíveis com o design system da Vehoway.
3. Implementar coleções concretas em `src/cms/sanity/collections` para categorias e catálogos publicados da home, com limite visual por seção.
4. Substituir `src/pages/index.astro` pela composição da homepage.
5. Reutilizar `src/constants/env.ts` para configurações de ambiente relacionadas ao Sanity e criar componentes de seção, assets locais e configuração local de contato/profissionais.
6. Validar responsividade, build Astro e typecheck.

Rollback: restaurar a versão anterior de `src/pages/index.astro` e remover componentes/configurações adicionadas nesta mudança caso a implementação precise ser revertida antes do deploy.

## Resolved Decisions

- O número global de WhatsApp será definido depois; a implementação deve usar configuração local substituível.
- As imagens definitivas da homepage virão de assets locais do projeto.
- A homepage deve renderizar categorias publicadas no Sanity com limite visual por seção, não uma lista fixa de cinco categorias.
