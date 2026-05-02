## Purpose
Definir os requisitos canônicos dos schemas de domínio no Sanity para conteúdo de catálogo, garantindo consistência estrutural entre documentos principais e objetos internos reutilizáveis.

## Requirements

### Requirement: Sanity SHALL model domain documents for catalog content
The system SHALL define `application`, `category`, `product` and `catalog` as document schemas in Sanity to represent the current domain entities used by the application.

#### Scenario: Domain documents are available in the schema set
- **WHEN** the Sanity schema set is registered for this project
- **THEN** it includes document schemas named `application`, `category`, `product` and `catalog`

### Requirement: Sanity SHALL provide internal object schemas for assets
The system SHALL define `image` and `pdfFile` as internal object schemas for reuse inside domain documents, and SHALL NOT expose them as independent top-level document types.

#### Scenario: Asset schemas are reused as nested objects
- **WHEN** a domain document needs an image or PDF asset
- **THEN** it uses the internal object schema `image` or `pdfFile` instead of a top-level asset document

### Requirement: Image objects SHALL capture asset and alt text
The `image` object schema SHALL contain an `arquivo` field backed by a Sanity image asset and an `alt` field for editorial alternative text.

#### Scenario: Image object supports accessible rendering data
- **WHEN** an editor fills an `image` object in a document
- **THEN** the object stores both the selected image asset in `arquivo` and the alternative text in `alt`

### Requirement: PDF file objects SHALL capture file asset only
The `pdfFile` object schema SHALL contain an `arquivo` field backed by a Sanity file asset and SHALL NOT require additional metadata in this change.

#### Scenario: PDF object stores a single file asset
- **WHEN** an editor fills a `pdfFile` object in a document
- **THEN** the object stores the selected file asset in `arquivo` without requiring extra fields

### Requirement: Domain image fields SHALL converge to ImageDto-compatible structure
The system SHALL model `category.image`, `product.image` and `catalog.image` through the internal `image` object so they can all map to `ImageDto` with `id`, `url` and `alt`.

#### Scenario: Product and catalog image fields use the same shape as category
- **WHEN** image fields are authored for category, product and catalog documents
- **THEN** all three use the same internal `image` object structure compatible with `ImageDto`

### Requirement: Catalog PDF fields SHALL map to PdfFileDto-compatible structure
The system SHALL model `catalog.pdfFile` through the internal `pdfFile` object so it can map to `PdfFileDto` with `id` and `url`.

#### Scenario: Catalog PDF field uses internal pdf object
- **WHEN** a catalog document stores a downloadable PDF
- **THEN** it does so through the `pdfFile` object structure compatible with `PdfFileDto`

### Requirement: Product application and categories SHALL be modeled as references
The `product` document SHALL store `application` as a reference to an `application` document and `categories` as references to `category` documents rather than inline strings or inline objects.

#### Scenario: Product links to reusable taxonomy documents
- **WHEN** an editor associates an application and one or more categories with a product
- **THEN** the selected values are references to existing `application` and `category` documents

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

### Requirement: Required domain fields SHALL be validated in the schema
The schema set SHALL validate the minimum required fields for domain integrity: `name` on all domain documents, `image` on `category`, `product` and `catalog`, `pdfFile` on `catalog`, `code` on `product`, `application` on `product`, and at least one `category` on `product`.

#### Scenario: Required fields are enforced during content authoring
- **WHEN** an editor attempts to publish a document missing one of the required fields
- **THEN** the schema validation prevents publication until the required field is provided
