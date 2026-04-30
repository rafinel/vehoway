## 1. Setup de UI e Configuração

- [x] 1.1 Verificar a configuração atual do Astro, TypeScript e estilos globais do projeto.
- [x] 1.2 Instalar e configurar Tailwind CSS se ainda não estiver disponível.
- [x] 1.3 Instalar e configurar DaisyUI sobre Tailwind CSS se ainda não estiver disponível.
- [x] 1.4 Criar ou ajustar estilos/tokens globais para Manrope, `#F6C21F`, superfícies, texto, bordas e estados de CTA da Vehoway.

## 2. Dados e Configuração da Homepage

- [x] 2.1 Implementar `SanityCategoriesCollection` em `src/cms/sanity/collections` para buscar categorias publicadas usadas na seção de linhas de produto com limite visual.
- [x] 2.2 Implementar a coleção de catálogos em `src/cms/sanity/collections` para buscar catálogos publicados usados na seção de catálogos com limite visual.
- [x] 2.3 Criar fallbacks seguros para seções sem categorias ou catálogos disponíveis no dataset.
- [x] 2.4 Reutilizar `src/constants/env.ts` para ler as configurações de ambiente do Sanity usadas pelas coleções da homepage.
- [x] 2.5 Criar configuração local substituível do WhatsApp global e função para gerar mensagem pré-preenchida.
- [x] 2.6 Criar configuração hardcoded dos profissionais/especialistas exibidos no frontend, sem dependência do Sanity.
- [x] 2.7 Organizar assets locais definitivos usados nas imagens principais da homepage.

## 3. Componentes da Homepage

- [x] 3.1 Criar componente de header com logo, navegação, estado ativo e CTA principal.
- [x] 3.2 Criar componente de hero alinhado ao design `VEHOWAY Homepage`, com título, descrição, CTA e prova visual.
- [x] 3.3 Criar componente de linhas de produto com cards vindos das categorias do Sanity.
- [x] 3.4 Criar componente de catálogos com cards/preview visual e ação para acesso/download quando houver PDF.
- [x] 3.5 Criar componente de ajuda comercial com profissionais hardcoded e CTA de WhatsApp global.
- [x] 3.6 Criar componente de credibilidade com benefícios e marcas/linhas institucionais.
- [x] 3.7 Criar componente de footer com navegação, categorias, contato institucional e informações legais.

## 4. Integração da Rota `/`

- [x] 4.1 Substituir o conteúdo padrão de `src/pages/index.astro` pela composição da homepage.
- [x] 4.2 Buscar dados de categorias e catálogos no frontmatter Astro em build time.
- [x] 4.3 Definir metadados básicos da página, incluindo idioma `pt-BR`, título, descrição e viewport.
- [x] 4.4 Garantir que a homepage renderize conteúdo principal sem depender de JavaScript client-side.

## 5. Responsividade e Acessibilidade

- [x] 5.1 Ajustar layout desktop para preservar a hierarquia visual do design aprovado.
- [x] 5.2 Ajustar layout mobile para header, hero, grids, catálogos, ajuda comercial e footer sem overflow horizontal.
- [x] 5.3 Garantir estados de foco, textos alternativos de imagens e labels acessíveis em CTAs e navegação.
- [x] 5.4 Garantir que ações de WhatsApp abram URL válida com mensagem codificada corretamente.

## 6. Documentação e Consistência

- [x] 6.1 Atualizar documentação relevante para registrar que contato comercial não é gerido via CMS nesta versão.
- [x] 6.2 Garantir que a documentação mencione WhatsApp global e profissionais hardcoded no frontend quando aplicável.
- [x] 6.3 Garantir que nenhuma documentação ou implementação crie relação entre `professional` e `product`.

## 7. Verificação

- [x] 7.1 Executar `npm run typecheck` e corrigir erros relacionados à mudança.
- [x] 7.2 Executar `npm run build` e corrigir falhas de build.
- [x] 7.3 Revisar visualmente a homepage em desktop e mobile.
- [x] 7.4 Verificar que a home mantém renderização segura quando categorias ou catálogos estão vazios.
