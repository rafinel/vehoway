## Why

O projeto ja tem DTOs de dominio para categorias, produtos, catalogos, imagens e arquivos PDF, mas a integracao com Sanity ainda nao foi modelada. Precisamos definir schemas consistentes agora para evitar um modelo editorial divergente, especialmente na normalizacao de `image` como `ImageDto` e no uso de objetos internos para assets.

## What Changes

- Criar a capacidade de modelagem de schemas do Sanity para os DTOs atuais do dominio.
- Definir `application`, `category`, `product` e `catalog` como tipos de documento do Sanity.
- Definir `image` e `pdfFile` como object schemas internos reutilizaveis, sem exposicao como documentos independentes.
- Padronizar o contrato esperado para que todo campo `image` do dominio seja tratado como `ImageDto`, inclusive em `ProductDto` e `CatalogDto`.
- Registrar as validacoes e relacoes essenciais entre documentos e objetos internos.

## Non-goals

- Implementar queries GROQ, cliente Sanity ou mapeadores de leitura.
- Configurar Studio, preview, estrutura de navegacao ou TypeGen.
- Implementar renderizacao no Astro ou qualquer integracao de runtime.
- Resolver nesta mudanca a refatoracao de imports e consumidores existentes fora do escopo dos schemas.

## Capabilities

### New Capabilities
- `sanity-domain-schemas`: Define os schemas do Sanity para categorias, produtos, catalogos, applications, imagens e arquivos PDF alinhados aos DTOs do dominio.

### Modified Capabilities

Nenhuma.

## Impact

- Afeta principalmente `src/cms/sanity/schemas/`, onde os schemas do Sanity devem ser criados, alem do ponto de registro em `src/cms/sanity/`.
- Afeta o alinhamento esperado dos DTOs em `src/core/dtos/`, principalmente `ImageDto`, `PdfFileDto`, `ProductDto` e `CatalogDto`.
- Introduz dependencia conceitual do modelo editorial do Sanity sobre os contratos de dominio ja existentes.
- Explicita uma inconsistência atual de nomes/caminhos relacionada a `PdfFileDto`, que devera ser considerada na implementacao.
