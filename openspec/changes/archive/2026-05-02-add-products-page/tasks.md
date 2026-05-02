## 1. Shared layout e fundação da rota

- [x] 1.1 Extrair header e footer reutilizáveis para `src/components/shared` preservando o comportamento atual da homepage.
- [x] 1.2 Atualizar a homepage para consumir os componentes compartilhados sem regressão visual ou funcional.
- [x] 1.3 Criar `src/pages/products.astro` com `BaseLayout`, componentes shared e hero estático da página de produtos.

## 2. Domínio e acesso a dados

- [x] 2.1 Ajustar o schema `product` para suportar `catalog` opcional e manter `tags` compatíveis com busca textual.
- [x] 2.2 Atualizar DTOs e interfaces de domínio para cobrir filtros, paginação e o DTO retornado pela Server Action para card + detalhe.
- [x] 2.3 Criar a collection de produtos no Sanity com busca por `name`, `code` e `tags`, filtros single-select e paginação estável de 6 itens.

## 3. Estado da página e integração servidor-cliente

- [x] 3.1 Adicionar `nuqs` ao projeto e criar o hook customizado da página para controlar `q`, `category`, `application`, `catalog`, `page` e `product`.
- [x] 3.2 Implementar a Astro Server Action de produtos com validação de entrada e retorno paginado em DTO tipado para grid + detalhe.
- [x] 3.3 Implementar as regras de reconciliação no hook: reset de `page`, seleção automática do primeiro item válido e limpeza de `product` quando não houver resultados.

## 4. UI interativa da página de produtos

- [x] 4.1 Criar a ilha React principal da página e integrar busca com debounce, filtros e paginação via query params.
- [x] 4.2 Implementar grid e cards de produto com seleção sincronizada em `product`.
- [x] 4.3 Implementar painel lateral persistente no desktop e drawer mobile fechado por padrão, mantendo `product` na URL.
- [x] 4.4 Omitir ações dependentes de catálogo quando o produto selecionado não tiver catálogo associado.

## 5. Validação final

- [x] 5.1 Validar os cenários principais da rota `/products` em desktop e mobile, incluindo URL compartilhável, paginação e reconciliação de `product`.
- [x] 5.2 Executar verificação de qualidade do projeto e corrigir eventuais quebras introduzidas pela change.
