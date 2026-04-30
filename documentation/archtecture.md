# Arquitetura do Sistema

---

## 1. Visão Geral do Sistema

**Propósito:** Site vitrine para distribuidora de autopeças. Resolve a ausência de presença digital qualificada: organiza linhas de produto em hubs por categoria, oferece consulta de peças com card expandido, prévia interativa de catálogos (PDF) e geração de leads via WhatsApp.

**Escopo — dentro:**
- Site público (home, produtos, catálogos)
- CMS headless para gestão de conteúdo (Sanity Studio)
- Download público de catálogos (PDFs hospedados no Sanity CDN)
- Integração WhatsApp com mensagem pré-preenchida

**Escopo — fora:**
- E-commerce / checkout
- Área logada de clientes
- Integração com ERP
- Chatbot / atendimento automatizado

**Drivers Arquiteturais:**

| ID | Requisito |
|---|---|
| FR-01 | Home com cards de categorias e catálogos |
| FR-02 | Página `/products` com filtros por categoria, aplicação e catálogo via query params |
| FR-03 | Card de peça com card expandido (drawer) com ações: prévia, download, contato |
| FR-04 | Modal de prévia de catálogo antes do download |
| FR-05 | WhatsApp com mensagem pré-preenchida por categoria/peça |
| FR-06 | Admin (Sanity Studio) com CRUD + publish/unpublish |
| FR-07 | Paginação client-side na listagem de produtos |
| NFR-01 | Performance: home estática na CDN, products com cache stale-while-revalidate |
| NFR-02 | Manutenibilidade: conteúdo atualizável sem deploy de código |
| NFR-03 | SEO: páginas indexáveis pelo Google |

**Restrições:**
- Frontend obrigatório: Astro JS
- CMS obrigatório: Sanity
- Renderização: SSG híbrido (`output: 'hybrid'`) — home SSG, products SSR
- Hosting: Netlify

---

## 2. Padrão Arquitetural

**Padrão Selecionado:** JAMstack híbrido — SSG + SSR com CMS Headless

**Justificativa:** Home é conteúdo estático — SSG é ideal. Products precisa de filtros e paginação server-side com dados frescos do Sanity — SSR com cache resolve sem overhead de client-side pesado.

```
┌─────────────────────────────────────────────────┐
│              BROWSER (Visitante)                 │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────┐
│              Netlify CDN Edge                    │
│     (SSG cache / SSR stale-while-revalidate)     │
└──────────┬───────────────────────┬──────────────┘
           │                       │
┌──────────▼──────────┐ ┌──────────▼──────────────┐
│   / (SSG)           │ │   /products (SSR)        │
│   gerado em build   │ │   renderizado por request│
│   servido da CDN    │ │   cache + revalidação    │
└──────────┬──────────┘ └──────────┬───────────────┘
           │                       │ GROQ (runtime)
           │ GROQ (build time)     │
┌──────────▼───────────────────────▼───────────────┐
│               Sanity Content Lake                 │
│      dados + Asset CDN (PDFs, imagens)            │
└───────────────────────┬───────────────────────────┘
                        │ webhook
┌───────────────────────▼─────────────────────────┐
│              Sanity Studio (Admin)               │
└─────────────────────────────────────────────────┘
```

**Alternativas Consideradas:**

| Padrão | Por que foi descartado |
|---|---|
| SSG puro | Filtros e paginação exigiriam payload completo no client — não escala |
| SSR total | Home não precisa de servidor — SSG é mais performático e barato |

---

## 3. Design de Componentes

**Pages:**

| Página | Rota | Rendering | Responsabilidade |
|---|---|---|---|
| Home | `/` | SSG | Hero, cards de categorias e catálogos |
| Products | `/products` | SSR (`prerender = false`) | Filtros server-side via query params, paginação, listagem |

**Configuração Astro:**
```ts
// astro.config.mjs
output: 'hybrid'

// src/pages/products.astro
export const prerender = false
```

**Ilhas Interativas (Astro Islands — React):**

#### `<ProductsFilter />`
- **Responsabilidade:** dropdowns de filtro (Categoria, Aplicação, Catálogo) + chips de filtros ativos + paginação. Atualiza query params na URL e trigga novo request SSR
- **Interface:** recebe `categories`, `applications`, `catalogs` como props; sincroniza estado com URL
- **NFRs cobertos:** UX mobile, URLs compartilháveis e bookmarkáveis

#### `<ProductCard />`
- **Responsabilidade:** card do produto na listagem com nome, código, aplicações, tags e ações
- **Interface:** recebe `product` como prop, abre `<ProductDrawer />`
- **NFRs cobertos:** UX mobile, paginação visual

#### `<ProductDrawer />`
- **Responsabilidade:** painel lateral com detalhes completos da peça — imagem, aplicações, catálogo associado e CTA de contato/download
- **Interface:** recebe `product` como prop
- **NFRs cobertos:** UX mobile (drawer touch-friendly)

#### `<CatalogModal />`
- **Responsabilidade:** modal com imagem de capa, nome do catálogo e botão de download do PDF
- **Interface:** recebe `catalog` como prop
- **NFRs cobertos:** experiência antes do download, fallback de erro

#### `<ContactWhatsApp />`
- **Responsabilidade:** monta URL do WhatsApp com mensagem pré-preenchida (categoria + código da peça)
- **Interface:** recebe `category`, `product?`
- **NFRs cobertos:** geração de leads, mobile-first

**Data Layer:**

| Contexto | Estratégia |
|---|---|
| Home (`/`) | GROQ em build time |
| Products (`/products`) | GROQ em runtime via `Astro.request` + query params — filtros e paginação resolvidos no servidor |

**Observação:** contato comercial não é gerido pelo Sanity nesta versão. O WhatsApp é global e configurado no frontend; profissionais exibidos na home são hardcoded no frontend.

---

## 4. Modelo de Dados

**Estratégia de Armazenamento:** Sanity Content Lake (document store + Asset CDN). Sem banco relacional externo. Arquivamento via publish/unpublish nativo do Sanity.

### `category`

| Campo | Tipo Sanity | Descrição |
|---|---|---|
| `_id` | string | Gerado pelo Sanity |
| `name` | string | Nome da categoria |
| `image` | image | Imagem de capa da categoria |

### `product`

| Campo | Tipo Sanity | Descrição |
|---|---|---|
| `_id` | string | Gerado pelo Sanity |
| `name` | string | Nome da peça |
| `code` | string | Código da peça (ex: "PR-1127") |
| `image` | image | Foto do produto |
| `applications` | array → string | Aplicações (ex: "Carreta Baú") |
| `inStock` | boolean | Exibe badge "Em estoque" |
| `isFeatured` | boolean | Destaque na listagem |
| `category` | reference → `category` | Categoria à qual pertence |
| `catalog` | reference → `catalog` | Catálogo vinculado (opcional) |
| `tags` | array → string | Atributos livres extras |

### `catalog`

| Campo | Tipo Sanity | Descrição |
|---|---|---|
| `_id` | string | Gerado pelo Sanity |
| `name` | string | Nome do catálogo |
| `image` | image | Imagem de capa |
| `pdfFile` | file | Arquivo PDF (Sanity Asset CDN) |

**Contato comercial fora do CMS:**
- WhatsApp global configurado no frontend
- Profissionais exibidos na home mantidos como configuração hardcoded no frontend
- Nenhuma relação entre `professional` e `product`

**Relacionamentos:**

```
category  1:N  product
category  1:N  catalog  (via product.catalog)
product   N:1  catalog
```

---

## 5. Mapeamento de NFRs

| NFR | Requisito | Decisão Arquitetural |
|---|---|---|
| Performance | Carregamento rápido | SSG para home + cache CDN/SSR na Netlify para `/products` |
| SEO | Páginas indexáveis | HTML renderizado no servidor (SSR) — Google indexa sem JS |
| Manutenibilidade | Conteúdo atualizável sem deploy de código | Sanity Studio com publish/unpublish + dados frescos em runtime no SSR |
| Escalabilidade | Suportar picos de acesso | Netlify Edge/CDN + cache absorvem picos sem escalar servidor |
| Disponibilidade | Site resiliente | Home SSG na CDN não depende do Sanity em runtime |
| Manutenibilidade de código | Código legível e expansível | Componentes React em inglês, queries centralizadas, schemas tipados |
| UX Mobile | Experiência equivalente ao desktop | DaisyUI mobile-first + React islands com suporte a touch |

---

## 6. Tech Stack

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | Astro JS | SSG + SSR híbrido nativo, islands architecture |
| Styling | Tailwind CSS | Base utilitária para layout, responsividade e tokens de interface |
| UI | DaisyUI | Componentes prontos (modal, card, drawer, badge) sobre Tailwind, sem runtime overhead |
| Islands | React | Ecossistema maduro, DX superior para filtros e estado de UI |
| CMS | Sanity | Headless, GROQ flexível, Asset CDN integrado |
| Linguagem | TypeScript | Tipagem dos schemas e queries garante segurança |
| Hosting | Netlify | Suporte a Astro SSR, CDN global, functions e preview deploys |
| Adapter | `@astrojs/netlify` | Habilita SSR no Astro com output otimizado para Netlify |
| CI/CD | Netlify + webhook Sanity | Deploy automático no push + rebuild da home ao publicar no Studio |
| Assets | Sanity Asset CDN | PDFs e imagens servidos pelo Sanity — zero infraestrutura extra |

---

## 7. Análise de Trade-offs

#### SSG híbrido vs SSG puro
- **Escolha feita:** SSG para home + SSR para products
- **Alternativa:** SSG puro com filtro client-side
- **Trade-off:** SSR adiciona latência por request no `/products`; mitigado com cache `stale-while-revalidate`
- **Por que aceitável:** filtros e paginação server-side escalam sem limite de payload

#### Cache `stale-while-revalidate` vs dados sempre frescos
- **Escolha feita:** `s-maxage=60, stale-while-revalidate=300`
- **Alternativa:** sem cache — request direto ao Sanity em todo acesso
- **Trade-off:** conteúdo pode ter até 5 min de defasagem
- **Por que aceitável:** catálogo de peças industriais não muda em tempo real

#### React vs Vanilla JS para ilhas
- **Escolha feita:** React
- **Alternativa:** Vanilla JS ou Preact
- **Trade-off:** bundle ligeiramente maior
- **Por que aceitável:** filtros com múltiplos estados, chips ativos e paginação justificam o ecossistema React

#### Sanity Asset CDN para PDFs vs storage externo
- **Escolha feita:** PDFs no Sanity Asset CDN
- **Alternativa:** bucket S3 / Cloudflare R2
- **Trade-off:** menos controle sobre banda e URLs
- **Por que aceitável:** volume de downloads baixo; elimina um serviço externo da stack

---

## 8. Arquitetura de Deploy

**Plataforma:** Netlify com `@astrojs/netlify` adapter.

```
┌─────────────────────────────────────┐
│         Sanity Studio               │
│   (publish / unpublish conteúdo)    │
└──────────────────┬──────────────────┘
                   │ webhook POST
┌──────────────────▼──────────────────┐
│              Netlify                │
│  1. recebe webhook / push main      │
│  2. roda astro build                │
│  3. gera / (SSG estático)           │
│  4. deploy serverless /products     │
└──────────────────┬──────────────────┘
                   │
       ┌───────────┴────────────┐
       │                        │
┌──────▼──────┐        ┌────────▼────────┐
│  CDN Edge   │        │ Serverless Fn   │
│  / (SSG)    │        │ /products (SSR) │
│             │        │ GROQ → Sanity   │
└──────┬──────┘        └────────┬────────┘
       └───────────┬────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────┐
│            Browser                  │
│         (Visitante)                 │
└─────────────────────────────────────┘
```

**Ambientes:**

| Ambiente | Descrição |
|---|---|
| Development | Local (`astro dev`) consumindo Sanity dataset `development` |
| Preview | Branch feature → Netlify preview deploy automático por branch/PR |
| Production | Push na `main` → build e deploy automático na Netlify |

**Cache headers em `/products`:**
```
Cache-Control: s-maxage=60, stale-while-revalidate=300
```

**Rollback:** histórico completo de deploys na Netlify com opção de restaurar deploy anterior.

---

## 9. Considerações Futuras

| Ponto | Gatilho | Caminho |
|---|---|---|
| Busca full-text avançada | Volume alto de peças com busca por texto livre | Integrar Algolia ou Sanity Search API |
| Catálogos com prévia interativa | Demanda por visualização antes do download | Integrar `pdfjs` como nova ilha React |
| Analytics de peças mais buscadas | Estratégia de marketing mais madura | Integrar Plausible ou GA4 com eventos de filtro e clique |
| Multi-categoria por peça | Peças que pertencem a mais de uma linha | Mudar `category` de `reference` para `array of references` no schema |

**Pontos de atenção:**
- 🚧 Cache TTL de 5 min pode ser ajustado conforme frequência de atualização do catálogo
- 🚧 Limite de banda do plano Sanity para PDFs — monitorar se os downloads crescerem
- 💡 Assunção: Sanity free tier cobre o volume de requests SSR em runtime

**Dívidas técnicas conhecidas:**
- Sem monitoramento formal de erros — adicionar Sentry no futuro para rastrear falhas no SSR
