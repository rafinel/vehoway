## ADDED Requirements

### Requirement: Products page SHALL render the public product discovery experience
O sistema SHALL renderizar a rota `/products` como página pública de descoberta de produtos da Vehoway, com header, hero, busca, filtros, grade paginada, detalhe do produto e footer.

#### Scenario: Visitor opens the products page on desktop
- **WHEN** um visitante acessa a rota `/products` em viewport desktop
- **THEN** o sistema exibe a página pública com hero institucional, controles de descoberta, grade de produtos e painel lateral persistente de detalhe

#### Scenario: Visitor opens the products page on mobile
- **WHEN** um visitante acessa a rota `/products` em viewport mobile
- **THEN** o sistema exibe a página pública com hero institucional, controles touch-friendly, lista de produtos e detalhe acessível por drawer

### Requirement: Products page SHALL keep navigable discovery state in query params
O sistema SHALL representar o estado navegável da página de produtos nos query params `q`, `category`, `application`, `catalog`, `page` e `product`.

#### Scenario: Visitor lands on a shareable URL
- **WHEN** um visitante acessa `/products` com qualquer combinação válida de `q`, `category`, `application`, `catalog`, `page` e `product`
- **THEN** o sistema reconstrói a tela com base nesses parâmetros e usa esse estado como fonte de verdade navegável

#### Scenario: Visitor changes a filter or search term
- **WHEN** um visitante altera `q`, `category`, `application` ou `catalog`
- **THEN** o sistema atualiza a URL com o novo estado navegável sem depender de query params implícitos fora desse conjunto

### Requirement: Products page SHALL support text search and single-select filters
O sistema SHALL permitir busca textual por nome, código e tags do produto, além de filtros single-select por categoria, aplicação e catálogo.

#### Scenario: Text query matches a product field
- **WHEN** o valor de `q` corresponde ao nome, código ou tags de um produto publicado
- **THEN** o sistema inclui esse produto nos resultados elegíveis da página atual

#### Scenario: Visitor applies structured filters
- **WHEN** um visitante seleciona uma categoria, aplicação ou catálogo
- **THEN** o sistema restringe os resultados aos produtos que satisfazem o filtro selecionado naquele grupo

#### Scenario: Visitor clears a filter group
- **WHEN** um visitante remove um filtro single-select ativo
- **THEN** o sistema volta a considerar todos os valores elegíveis daquele grupo nos resultados

### Requirement: Products page SHALL paginate results in groups of six and reconcile selected product
O sistema SHALL paginar a listagem pública de produtos em grupos de 6 itens e SHALL reconciliar `product` para sempre apontar para um item válido quando houver resultados.

#### Scenario: Visitor changes page
- **WHEN** o visitante muda `page` para outra página com resultados
- **THEN** o sistema exibe os 6 itens correspondentes à nova página e atualiza `product` para o primeiro item dessa página

#### Scenario: Current product becomes invalid after filtering
- **WHEN** filtros ou busca removem o item atual de `product` do conjunto de resultados elegíveis
- **THEN** o sistema substitui `product` pelo primeiro item válido restante

#### Scenario: No products match the current state
- **WHEN** a combinação atual de `q`, `category`, `application` e `catalog` não retorna produtos
- **THEN** o sistema exibe estado vazio e remove `product` do estado navegável

### Requirement: Products page SHALL render product detail responsively
O sistema SHALL exibir o detalhe do produto selecionado em painel lateral persistente no desktop e em drawer no mobile, mantendo `product` na URL em ambos os casos.

#### Scenario: Desktop visitor has a selected product
- **WHEN** a página é exibida em desktop e `product` aponta para um item válido
- **THEN** o sistema mostra o detalhe desse item em um painel lateral persistente

#### Scenario: Mobile visitor loads a selected product
- **WHEN** a página é exibida em mobile e `product` aponta para um item válido
- **THEN** o sistema mantém o drawer fechado por padrão e preserva a seleção do produto na URL

#### Scenario: Mobile visitor opens and closes the drawer
- **WHEN** um visitante mobile toca em um card para abrir o drawer e depois fecha o drawer
- **THEN** o sistema preserva `product` na URL e altera apenas o estado visual do drawer

### Requirement: Products page SHALL hide catalog-dependent actions for products without catalog
O sistema SHALL omitir ações dependentes de catálogo quando o produto selecionado não possuir catálogo associado.

#### Scenario: Selected product has an associated catalog
- **WHEN** o produto selecionado possui um catálogo associado
- **THEN** o sistema exibe as ações e informações relacionadas a esse catálogo no detalhe

#### Scenario: Selected product has no associated catalog
- **WHEN** o produto selecionado não possui catálogo associado
- **THEN** o sistema não exibe ações dependentes de catálogo e mantém disponíveis apenas as ações compatíveis com esse produto
