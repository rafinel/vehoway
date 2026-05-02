## Why

A rota `/products` já faz parte da navegação pública da Vehoway, mas a página ainda não existe no produto. Ao mesmo tempo, o projeto já definiu um fluxo comercial de descoberta de peças com filtros, paginação, detalhe persistente no desktop e suporte consultivo via WhatsApp, então a lacuna entre navegação, dados e experiência precisa ser fechada agora.

## What Changes

- Criar a página pública `/products` com shell em Astro e miolo interativo em React, aderente ao layout aprovado no Pencil.
- Sincronizar busca, filtros, paginação e produto selecionado na URL com `nuqs`, usando os parâmetros `q`, `category`, `application`, `catalog`, `page` e `product`.
- Implementar listagem paginada de produtos com busca por nome, código e tags, filtros single-select e seleção automática do primeiro item válido quando a página ou os filtros mudarem.
- Exibir detalhe do produto em painel lateral persistente no desktop e drawer no mobile, mantendo `product` na URL mesmo quando o drawer estiver fechado.
- Usar Astro Server Actions para buscar os dados da página no servidor em vez de criar uma rota `/api` específica.
- Extrair header e footer compartilhados para `src/components/shared` para reutilização entre homepage e página de produtos.
- Expandir o suporte de domínio do Sanity para a página de produtos, incluindo referência opcional de catálogo no produto e shape de consulta compatível com a nova experiência.

## Non-goals

- Implementar ordenação por relevância, nome ou data na URL nesta change.
- Transformar a página inteira em React ou migrar seções estáticas como hero, header e footer para client-side sem necessidade.
- Adicionar multi-select nos filtros de categoria, aplicação ou catálogo.
- Implementar fallback de catálogo ausente com experiências alternativas além de simplesmente omitir as ações de catálogo quando o produto não tiver associação.

## Capabilities

### New Capabilities
- `products-page`: define a experiência pública da rota `/products`, incluindo busca, filtros, paginação, estado em query params, grid de produtos e detalhe responsivo.

### Modified Capabilities
- `sanity-domain-schemas`: ampliar os requisitos do schema `product` e dos contratos de consulta para suportar referência opcional a `catalog` e descoberta de produtos orientada pela nova página.

## Impact

- Arquivos de página e componentes em `src/pages`, `src/components/products` e `src/components/shared`.
- Nova Astro Server Action para listagem de produtos retornando um DTO tipado e novo hook customizado para estado da página.
- Nova collection/query do Sanity para produtos paginados com filtros e busca textual.
- Ajustes nos DTOs e no schema `product` do Sanity para alinhar domínio e experiência pública.
- Nova dependência client-side para sincronização de query params com `nuqs`.
