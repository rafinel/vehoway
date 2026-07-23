# Pages Structure

This document describes the structure of each page in the Vehoway site. The
project is built with **Astro** (static pages, `.astro` components) plus
**React** islands (`.tsx`) for interactive parts. Content is sourced from
**Sanity CMS** collections, with hardcoded fallbacks so pages render even when
the CMS is unavailable.

There are two pages, both defined under `src/pages/`:

- `index.astro` → Home (`/`)
- `products.astro` → Products (`/produtos`)

Both pages share the same skeleton:

```
BaseLayout
 ├─ SiteHeader   (shared)
 ├─ main
 │   └─ page-specific sections
 └─ SiteFooter   (shared)
```

---

## Shared building blocks

### `BaseLayout` (`src/layouts/base-layout.astro`)
The HTML document shell. Sets `lang="pt-BR"`, imports global styles, preconnects
to Google Fonts and loads the **Manrope** font, configures favicon, viewport and
SEO meta (`title`, `description` via props with institutional defaults), and
renders page content through a `<slot />`.

### `SiteHeader` (`src/components/shared/site-header.astro`)
Sticky top bar with backdrop blur. Contains:
- **Brand**: "V" logo mark + "VEHOWAY / autopecas rodoviarias" wordmark, links home.
- **Primary nav** (desktop): `Home` and `Produtos`. The active route is
  highlighted (bold + yellow underline) based on `Astro.url.pathname`.
- **Products dropdown**: hover/focus mega-menu listing categories pulled from
  Sanity (`sanityCategoriesCollection`), each linking to
  `/produtos?category=<id>`. Hidden when no categories exist.
- **WhatsApp CTA**: "Fale no WhatsApp" button using a prefilled message via
  `buildWhatsAppUrl`.

### `SiteFooter` (`src/components/shared/site-footer.astro`)
Dark footer (`#footer`) with a gradient divider and a four-column grid:
1. Brand + short institutional description.
2. **Páginas**: Home, Produtos.
3. **Categorias**: full category list from Sanity, linking to filtered products.
4. **Contato**: physical address, email (`mailto:`) and WhatsApp conversation link.

Bottom bar holds the copyright and a note that commercial contact is not managed
via CMS in this version.

---

## Home page (`src/pages/index.astro`)

Route `/`. A static institutional landing page composed of five sequential
sections inside `<main>`. All content is Astro-rendered (server/build time); the
only client island is the catalogs download button.

Section order and structure:

1. **`HomeHero`** (`home/home-hero.astro`) — `#topo`
   Full-bleed hero over a truck background image with dark gradient overlays.
   Holds an eyebrow label, large display headline ("Soluções completas em
   implementos rodoviarios"), supporting paragraph and two CTAs ("Conheca nossas
   categorias" → `#categorias`, "Falar com especialista" → `#especialistas`).
   A side column shows three trust "proof" pills (quality, fast response,
   national coverage).

2. **`CategoriesSection`** (`home/categories-section.astro`) — `#categorias`
   Section header + "Ver todas as categorias" link. A responsive grid (up to 5
   columns) of category cards, each with image, name and a "ver produtos" link
   to `/produtos?category=<id>`. Categories come from Sanity (limited by
   `HOME_PAGE_LIMITS.categories`); if none are returned it falls back to a
   hardcoded list of five lines (carroceria, baú frigorífico, caminhões,
   implementos, pneumática) using local images from `src/assets/images`.

3. **`CatalogsSection`** (`home/catalogs-section.astro`) — `#catalogos`
   Dark band promoting downloadable catalogs. Left column: badge, heading,
   description, a "Ver catalogos" WhatsApp CTA, the **`CatalogsDownloadButton`**
   React island (`client:load`), and a list of secondary catalog links. Right
   column: a layered visual featuring the first (featured) catalog with a
   download/contact action. Catalogs are loaded from Sanity (limited by
   `HOME_PAGE_LIMITS.catalogs`); the section degrades gracefully when none exist.

4. **`HelpSection`** (`home/help-section.astro`) — `#especialistas`
   Commercial-help block. Left: eyebrow, heading "Precisa de ajuda para
   escolher?" and explanatory copy. Right: an "Atendimento Comercial" card with a
   full-width "Chamar no WhatsApp" CTA (uses `CONTACT.whatsappNumber`). Content
   is hardcoded in the frontend.

5. **`CredibilitySection`** (`home/credibility-section.astro`)
   Trust strip bounded by top/bottom borders. A grid of four benefit chips
   (specialized service, road implement parts, technical catalogs, multi-segment
   solutions) followed by a partner logos/names row sourced from
   `HOME_PAGE_PARTNERS`.

---

## Products page (`src/pages/products.astro`)

Route `/produtos`. Sets its own SEO title/description. At build/request time it
fetches four Sanity collections in parallel (applications, catalogs, categories,
products), each with an empty-array fallback on error, and passes them into the
interactive React island.

Structure inside `<main>`:

1. **`ProductsHero`** (`products/products-hero.astro`)
   Static dark hero mirroring the home hero: accent bar, "Home / Produtos"
   breadcrumb-style eyebrow, headline "Pecas e componentes", descriptive copy
   about searching by name/code/tags and filtering, plus three proof pills.

2. **`ProductsPage`** (`products/products-page.tsx`, `client:only="react"`)
   The interactive catalog. Wrapped in `NuqsAdapter`; URL query state is managed
   via `use-products-page-state` (search `q`, `category`, `application`,
   `catalog`, `page`, selected `product`). Filtering and pagination are done
   client-side over the products array (`PAGE_SIZE = 6`). Layout is a three-column
   grid on large screens (`280px | 1fr | 340px`):

   - **`ProductsSearchBar`** (full width, above the grid) — text input that
     searches across name, code, description and tags.
   - **`ProductsFilters`** (left column) — "Filtros" panel with a "Limpar
     filtros" action and three dependent `<select>` dropdowns: Categoria,
     Aplicação, Catálogo.
   - **Center column** — heading "Pecas em destaque" with a results count, then
     either an empty-state message or the **`ProductsGrid`** (responsive grid of
     **`ProductCard`**s: image, code, name, truncated description, up to two
     category tags; clicking selects the product). Below it,
     **`ProductsPagination`** (Anterior / "Pagina X de Y" / Proxima; hidden when
     there's a single page).
   - **`ProductDetailPanel`** (right column, desktop only) — shows the selected
     product's code, name, image, description, category checklist, optional "Ver
     catalogo" link and a prefilled "Falar no WhatsApp" CTA; shows a placeholder
     prompt when nothing is selected.
   - **`ProductDrawer`** (mobile only) — a modal overlay opened on selection for
     screens `< 1024px`, presenting the same product detail (image, code,
     description, categories, catalog link, WhatsApp CTA) with a close button.

   Two helper states exist for the products UI:
   - **`EmptyProductsState`** (`products/empty-products-state.astro`)
   - **`LoadingProductsState`** (`products/loading-products-state.astro`)

---

## Data & utilities referenced

- **CMS collections**: `src/cms/sanity/collections/*` (applications, catalogs,
  categories, products) returning DTOs from `src/core/dtos/*`.
- **Constants**: `src/constants/` — `routes.ts`, `contact.ts`,
  `home-page-limits.ts`, `home-page-partners.ts`, `home-page-specialists.ts`.
- **Utilities**: `src/utils/build-whatsapp-url.ts` builds prefilled WhatsApp
  deep links used across hero, help, catalogs, header, footer and product CTAs.
- **Styling**: Tailwind utility classes plus project tokens (`vh-*`, e.g.
  `vh-shell`, `vh-button-primary`, `vh-panel`, `bg-vh-ink`, `text-vh-yellow`)
  defined in `src/styles/global.css`. Icons come from `@hugeicons/react`.
