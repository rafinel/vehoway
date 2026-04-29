## Context

O repositorio ainda esta em fase inicial de integracao com CMS: existe um ponto reservado em `src/cms/sanity/sanity.ts` e uma pasta dedicada `src/cms/sanity/schemas/`, enquanto os DTOs de dominio ja descrevem categorias, produtos, catalogos, imagens e arquivos PDF. A modelagem precisa partir desses contratos para evitar que o schema editorial do Sanity nasca desalinhado do dominio da aplicacao.

As decisoes ja exploradas para esta mudanca sao:

- `application`, `category`, `product` e `catalog` serao documentos do Sanity.
- `image` e `pdfFile` serao object schemas internos, nao documentos independentes.
- `image` deve representar um asset de imagem com `arquivo` e `alt`.
- `pdfFile` deve representar um asset de arquivo com `arquivo` somente.
- Todo campo `image` exposto pelo dominio deve convergir para `ImageDto`, em vez de `string`.

Tambem existe uma inconsistencia atual de caminho/nome para `PdfFileDto`, que deve ser tratada durante a implementacao sem mudar o escopo desta proposta.

## Goals / Non-Goals

**Goals:**

- Definir uma modelagem de schemas do Sanity coerente com os DTOs de dominio atuais.
- Separar claramente documentos editoriais de objetos internos reutilizaveis para assets.
- Formalizar relacoes, obrigatoriedades e validacoes minimas para os schemas.
- Preservar um caminho claro de mapeamento entre assets nativos do Sanity e `ImageDto`/`PdfFileDto`.

**Non-Goals:**

- Implementar cliente Sanity, queries GROQ ou mapeadores de DTO.
- Resolver preview, Studio structure, Presentation Tool ou TypeGen.
- Introduzir documentos separados para imagem ou PDF.
- Modelar metadados extras de asset alem dos campos ja definidos para esta fase.

## Decisions

### 1. Modelar quatro documentos editoriais principais

Os tipos `application`, `category`, `product` e `catalog` serao documentos de primeira classe.

Rationale:

- Eles representam entidades editoriais com ciclo de vida proprio.
- `application` precisa ser reutilizavel entre produtos, o que favorece references em vez de strings duplicadas.
- O conjunto cobre os DTOs de dominio ja existentes sem introduzir documentos artificiais.

Alternativas consideradas:

- Embutir `applications` como strings em `product`: rejeitado por reduzir reutilizacao e consistencia editorial.
- Transformar `image` e `pdfFile` em documentos: rejeitado por aumentar a carga editorial sem ganho proporcional.

### 2. Tratar `image` e `pdfFile` como object schemas internos

`image` e `pdfFile` serao schemas internos reutilizaveis usados dentro dos documentos, sem exposicao como documentos independentes.

Rationale:

- O dominio precisa de contratos estruturados para assets, mas nao de entidades editoriais separadas para esses assets.
- O Sanity ja oferece tipos nativos de asset que podem ser encapsulados nesses objetos.
- Isso preserva consistencia de shape nos documentos sem forcar o editor a gerenciar imagens e PDFs como registros soltos.

Alternativas consideradas:

- Espelhar os DTOs literalmente com campos manuais `url`, `id`, `name` e `size`: rejeitado por duplicar metadados derivados e aumentar risco de inconsistencias.
- Usar diretamente o tipo nativo `image` em cada documento sem objeto interno: rejeitado porque `alt` precisa fazer parte do contrato editorial reutilizavel.

### 3. Definir o shape interno minimo para assets

O objeto `image` tera `arquivo` e `alt`. O objeto `pdfFile` tera apenas `arquivo`.

Rationale:

- `alt` e parte essencial do uso editorial e de acessibilidade da imagem.
- `PdfFileDto` atual so exige identidade e URL, entao um campo de arquivo e suficiente neste momento.
- O shape minimo reduz ambiguidade e evita metadados editoriais prematuros.

Alternativas consideradas:

- Adicionar `caption`, `credit`, `title` ou `language` agora: rejeitado por falta de necessidade confirmada.

### 4. Convergir todos os campos de imagem do dominio para `ImageDto`

Os documentos e schemas devem ser pensados para que `category.image`, `product.image` e `catalog.image` tenham o mesmo destino de mapeamento: `ImageDto`.

Rationale:

- O modelo atual estava inconsistente ao misturar `ImageDto` e `string` para imagens.
- A convergencia simplifica consumo na UI e evita logica condicional por tipo de imagem.

Alternativas consideradas:

- Manter `product.image` e `catalog.image` como `string`: rejeitado por perpetuar um contrato irregular.

### 5. Validacoes minimas e relacoes devem nascer no schema

Os schemas devem registrar obrigatoriedade de nome nas entidades, obrigatoriedade de `image` onde aplicavel, obrigatoriedade de `pdfFile` em catalogo e relacao de `product.applications` por references.

Rationale:

- Essas regras expressam o contrato minimo esperado pelo dominio.
- Validacoes no schema reduzem estados invalidos ainda na autoria do conteudo.

Alternativas consideradas:

- Deixar validacoes apenas para a camada de leitura: rejeitado por empurrar erros para mais tarde e enfraquecer a modelagem editorial.

## Risks / Trade-offs

- [Mudanca futura no contrato dos DTOs] -> Manter os objetos internos pequenos e desacoplados de metadados derivados facilita adaptacoes futuras.
- [Conflito mental entre schema interno `image` e tipo nativo `image` do Sanity] -> Documentar claramente que `image` e um object schema contendo um campo `arquivo` do tipo nativo de imagem.
- [Inconsistencia atual em imports/caminhos de `PdfFileDto`] -> Tratar esse ajuste explicitamente nas tarefas de implementacao.
- [Escopo crescer para queries, Studio e mapeadores] -> Manter esses itens fora desta mudanca e registrar como nao objetivos.

## Migration Plan

1. Introduzir os schemas internos `image` e `pdfFile`.
2. Introduzir os documentos `application`, `category`, `product` e `catalog` usando esses objetos internos.
3. Criar esses arquivos em `src/cms/sanity/schemas/` e ajustar exportacao/registro no ponto de entrada do Sanity.
4. Alinhar os DTOs e imports relacionados para refletir o contrato final esperado.
5. Validar que a estrutura resultante suporta o mapeamento futuro para `ImageDto` e `PdfFileDto`.

Rollback:

- Como a mudanca se concentra em modelagem ainda nao integrada ao runtime, o rollback consiste em remover os novos schemas e o registro correspondente.

## Open Questions

Nenhuma no momento.

Decisoes confirmadas durante a exploracao:

- `description` de `product` permanece texto simples nesta fase.
- `inStock` e um campo editorial.
