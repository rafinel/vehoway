## ADDED Requirements

### Requirement: Product catalog relation SHALL support optional product-to-catalog linking
O sistema SHALL permitir que o documento `product` referencie um documento `catalog` de forma opcional, sem tornar essa associação obrigatória para publicação.

#### Scenario: Editor associates a catalog to a product
- **WHEN** um editor seleciona um catálogo para um produto no Studio
- **THEN** o documento `product` armazena uma referência válida para `catalog`

#### Scenario: Editor publishes a product without catalog
- **WHEN** um editor publica um produto sem catálogo associado
- **THEN** a validação do schema permite a publicação desde que os demais campos obrigatórios estejam corretos

### Requirement: Product tags SHALL support textual discovery inputs
O sistema SHALL modelar `product.tags` como uma lista opcional de strings reutilizável por consultas textuais da página pública de produtos.

#### Scenario: Editor stores searchable product tags
- **WHEN** um editor adiciona tags a um produto
- **THEN** o documento armazena uma lista de strings compatível com consultas textuais por tags

#### Scenario: Editor publishes a product without tags
- **WHEN** um editor publica um produto sem tags
- **THEN** a ausência de tags não bloqueia a publicação do produto
