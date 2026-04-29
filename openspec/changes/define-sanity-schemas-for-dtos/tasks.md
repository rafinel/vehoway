## 1. Preparar contratos e estrutura base

- [x] 1.1 Confirmar e alinhar os DTOs de dominio para que `ProductDTO.image` e `CatalogDto.image` usem `ImageDto`
- [x] 1.2 Corrigir a inconsistência de nome/caminho relacionada a `PdfFileDto` e atualizar imports afetados
- [x] 1.3 Definir a estrutura de arquivos de schemas dentro de `src/cms/sanity/schemas/` e o ponto de registro central

## 2. Implementar schemas internos de assets

- [x] 2.1 Criar o object schema `image` com os campos `arquivo` e `alt`
- [x] 2.2 Adicionar validacoes minimas ao schema `image` para garantir asset de imagem e texto alternativo
- [x] 2.3 Criar o object schema `pdfFile` com o campo `arquivo`
- [x] 2.4 Adicionar validacoes minimas ao schema `pdfFile` para garantir asset de arquivo

## 3. Implementar documentos de dominio

- [x] 3.1 Criar o document schema `application` com o campo `name`
- [x] 3.2 Criar o document schema `category` com `name` e `image`
- [x] 3.3 Criar o document schema `product` com `name`, `code`, `image`, `description`, `applications`, `inStock`, `isFeatured` e `tags`
- [x] 3.4 Configurar `product.applications` como array de references para `application`
- [x] 3.5 Criar o document schema `catalog` com `name`, `image` e `pdfFile`
- [x] 3.6 Aplicar validacoes obrigatorias de dominio nos documentos criados

## 4. Registrar e validar a modelagem

- [x] 4.1 Registrar `application`, `category`, `product`, `catalog`, `image` e `pdfFile` no conjunto central de schemas do Sanity
- [x] 4.4 Confirmar que os arquivos de schema foram criados sob `src/cms/sanity/schemas/`
- [x] 4.2 Verificar que `image` e `pdfFile` nao ficam expostos como documentos top-level
- [x] 4.3 Validar que a modelagem final suporta o mapeamento esperado para `ImageDto` e `PdfFileDto`
