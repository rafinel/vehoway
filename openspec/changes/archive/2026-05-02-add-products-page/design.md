## Context

O projeto já possui homepage pública em Astro, navegação apontando para `/products`, schemas básicos no Sanity e um layout aprovado no Pencil para a página de produtos. O gap atual é que a rota ainda não existe, não há collection de produtos no frontend e o estado interativo da experiência ainda não foi modelado.

A nova página precisa equilibrar três restrições principais:

- manter a casca estática do site no estilo do Astro, sem transformar a página inteira em client bundle;
- sincronizar a experiência de descoberta em query params compartilháveis;
- usar o Sanity apenas do lado do servidor, evitando acoplamento do browser ao CMS.

Também há decisões de UX já fechadas que impactam a arquitetura: filtros single-select, busca com debounce, `pageSize` inicial de 6 itens, `product` persistido na URL, painel lateral persistente no desktop e drawer fechado por padrão no mobile.

## Goals / Non-Goals

**Goals:**

- Entregar a rota `/products` com experiência pública alinhada ao layout aprovado.
- Representar busca, filtros, paginação e produto selecionado como estado canônico na URL.
- Buscar dados de produtos no servidor via Astro Server Actions, mantendo o client focado em estado e renderização.
- Reaproveitar a estrutura institucional existente do site, extraindo header e footer para `src/components/shared`.
- Ajustar o domínio de produtos do Sanity para suportar catálogo opcional e descoberta por tags.

**Non-Goals:**

- Adicionar ordenação na URL nesta change.
- Implementar multi-select em qualquer filtro.
- Mover hero, header ou footer para React sem necessidade.
- Criar fallback especial para produto sem catálogo além de ocultar ações dependentes desse vínculo.

## Decisions

### 1. A página usará shell em Astro e miolo interativo em React

Decisão: `src/pages/products.astro` continuará como página Astro, com hero e componentes institucionais renderizados fora da ilha React. A interatividade ficará concentrada em `src/components/products/products-page.tsx` e seus filhos.

Racional:

- preserva o estilo arquitetural já usado pelo projeto;
- reduz bundle client-side para a parte realmente interativa;
- mantém header, footer e hero simples de reaproveitar.

Alternativas consideradas:

- Página inteira em React: descartada por aumentar bundle e acoplar trechos estáticos ao client sem ganho claro.
- Página inteira em Astro com navegação full reload: descartada porque a experiência exige query-state rico e detalhe responsivo fluido.

### 2. Query params serão a fonte de verdade do estado navegável

Decisão: usar `nuqs` em um hook customizado para controlar `q`, `category`, `application`, `catalog`, `page` e `product` na URL.

Racional:

- permite deep-linking completo da experiência;
- mantém voltar/avançar do navegador consistente;
- evita duplicação entre estado local e estado compartilhável.

Alternativas consideradas:

- Estado local em React sem refletir tudo na URL: descartado porque perderia compartilhamento e reconstrução da tela por link.
- Apenas filtros/paginação na URL e `product` local: descartado porque o comportamento decidido exige que `product` também seja compartilhável.

### 3. A busca de dados será feita via Astro Server Actions

Decisão: a ilha React chamará uma Server Action de produtos em vez de consumir uma rota `/api` dedicada ou o Sanity diretamente no browser.

Racional:

- mantém acesso ao Sanity no servidor;
- centraliza validação de entrada e shape de saída;
- reduz acoplamento do frontend ao CMS.

Alternativas consideradas:

- Rota `/api/products`: descartada por adicionar uma camada própria quando a plataforma já oferece Server Actions.
- Sanity client-side: descartado por expor mais detalhes de query, dificultar evolução do contrato e desnecessariamente acoplar o browser ao CMS.

### 4. O hook customizado será o centro da reconciliação de estado

Decisão: substituir utilitários soltos por um hook customizado responsável por integrar `nuqs`, aplicar defaults e reconciliar seleção/paginação.

Racional:

- concentra regras de negócio da tela em um único ponto;
- reduz duplicação entre grid, paginação e detalhe;
- simplifica a ilha principal.

Regras encapsuladas no hook:

- mudança em `q`, `category`, `application` ou `catalog` redefine `page=1`;
- mudança em `page` força a seleção do primeiro item da nova página;
- `product` inválido para os resultados atuais é substituído pelo primeiro item válido;
- ausência total de resultados limpa `product`;
- no mobile, `isDrawerOpen` é visual e local, sem alterar `product`.

Alternativas consideradas:

- Distribuir reconciliação em vários componentes: descartado por elevar acoplamento e risco de estados divergentes.
- Utilitários em `lib/`: descartado pela decisão de encapsular a semântica em hook customizado.

### 5. A Server Action retornará um DTO tipado com dados suficientes para card e detalhe na V1

Decisão: a consulta de listagem paginada retornará um DTO tipado e estável, suficiente para compor tanto os cards quanto o painel/drawer de detalhe.

Racional:

- evita uma segunda chamada de detalhe a cada mudança de `product`;
- simplifica a V1 e reduz latência percebida na seleção.
- explicita o contrato entre Server Action, hook e componentes React, reduzindo acoplamento a shapes ad hoc.

Alternativas consideradas:

- Endpoint/action separada para detalhe: descartada na V1 por aumentar complexidade sem necessidade funcional imediata.
- Retorno sem DTO formal: descartado por fragilizar a evolução do contrato entre servidor e cliente.

### 6. O domínio `product` será ampliado com catálogo opcional e tags pesquisáveis

Decisão: manter `application` como referência única, `categories` como lista de referências, `tags` como lista de strings e adicionar `catalog` opcional como referência a `catalog`.

Racional:

- atende o comportamento de busca e filtros já decidido;
- permite que alguns produtos não tenham catálogo associado, sem bloquear publicação;
- alinha o schema ao fluxo público da nova página.

Alternativas consideradas:

- Tornar `catalog` obrigatório: descartado pela decisão de produto e pelo risco de bloquear publicação de peças válidas sem material editorial.
- Modelar múltiplas aplicações por produto: descartado porque a regra funcional definida é 1:1.

### 7. Header e footer serão promovidos a shared no começo da implementação

Decisão: extrair os componentes institucionais reutilizados para `src/components/shared` antes de montar a nova página.

Racional:

- evita duplicação logo na criação de `/products`;
- torna explícito o reaproveitamento entre homepage e página de produtos.

Alternativas consideradas:

- Duplicar temporariamente e extrair depois: descartado por criar retrabalho imediato em uma área simples de estabilizar.

## Risks / Trade-offs

- [Reconciliação dupla de URL] → Mudanças de filtro/página podem exigir atualizar `product` após a resposta da action. Mitigação: centralizar a reconciliação no hook e tratar a atualização como fluxo esperado da tela.
- [Payload mais pesado por item] → Retornar dados para card e detalhe aumenta o payload da listagem. Mitigação: limitar a página a 6 itens e retornar apenas campos realmente usados pela UI.
- [Drawer mobile divergente da URL] → `product` pode estar na URL enquanto o drawer permanece fechado. Mitigação: tratar isso como separação intencional entre estado navegável e estado visual, documentada no spec.
- [Busca textual em tags] → Consultas por `tags` podem exigir cuidado na GROQ para manter resultados intuitivos. Mitigação: definir uma estratégia textual simples e estável na collection, sem avançar para ranking complexo nesta change.
- [Extração de shared introduzir regressão na home] → mover header/footer pode quebrar a homepage se a extração não preservar APIs e estilos. Mitigação: extrair sem alterar markup/props além do necessário.

## Migration Plan

1. Extrair header e footer para `src/components/shared` mantendo a homepage funcional.
2. Ajustar `product-schema`, DTOs e collection de produtos.
3. Adicionar a dependência `nuqs` e criar o hook customizado da página.
4. Criar a Astro Server Action de produtos.
5. Montar `/products.astro`, hero e ilha React principal.
6. Implementar grid, filtros, paginação, painel desktop e drawer mobile.
7. Validar os cenários de reconciliação de URL e responsividade.

Rollback:

- remover a rota `/products` e a ilha associada;
- reverter a extração de shared caso ela introduza regressão visual;
- manter o schema `product` com `catalog` opcional não é destrutivo, então não exige migração de conteúdo para rollback funcional.

## Open Questions

- Nenhuma em aberto no momento; as decisões funcionais críticas para implementação já foram fechadas nesta proposal.
