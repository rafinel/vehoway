## ADDED Requirements

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

### Requirement: Product applications SHALL be references to reusable application documents
The `product` document SHALL store `applications` as references to `application` documents rather than inline strings or inline objects.

#### Scenario: Product links to reusable applications
- **WHEN** an editor associates applications with a product
- **THEN** the selected values are references to existing `application` documents

### Requirement: Required domain fields SHALL be validated in the schema
The schema set SHALL validate the minimum required fields for domain integrity: `name` on all domain documents, `image` on `category`, `product` and `catalog`, `pdfFile` on `catalog`, and `code` on `product`.

#### Scenario: Required fields are enforced during content authoring
- **WHEN** an editor attempts to publish a document missing one of the required fields
- **THEN** the schema validation prevents publication until the required field is provided
