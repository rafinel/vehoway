## Why

O projeto ainda usa a página inicial mínima do template Astro, enquanto o produto precisa de uma home pública que apresente a marca, as linhas de produto, catálogos e caminhos claros para conversão via WhatsApp. Esta mudança transforma o design aprovado da homepage em uma rota `/` funcional, alinhada ao PRD, ao design system e à arquitetura Astro + Sanity.

## What Changes

- Implementar a homepage pública na rota `/` com hero, navegação, linhas de produto, catálogos, bloco de ajuda comercial, credibilidade e footer.
- Consumir categorias e catálogos do Sanity em build time para manter conteúdo editorial atualizável sem deploy manual.
- Manter contato comercial fora do CMS nesta versão: WhatsApp global configurado no frontend e profissionais hardcoded no frontend quando exibidos.
- Aplicar o design system técnico/comercial da Vehoway com Manrope, amarelo industrial, superfícies claras, blocos escuros e CTAs consistentes.
- Adicionar responsividade mobile-first para navegação, grids, CTAs e footer.
- Adicionar dependências e configuração de UI necessárias para Tailwind CSS e DaisyUI, caso ainda não estejam presentes no projeto.

## Non-goals

- Não implementar e-commerce, checkout, área logada ou integração com ERP.
- Não implementar a página `/products`, filtros server-side, drawer de produto ou paginação de listagem nesta mudança.
- Não criar schema Sanity para `professional` nem gerir contato comercial pelo CMS.
- Não criar relação entre `professional` e `product`.
- Não implementar prévia interativa completa de PDF com `pdfjs`; a home deve apenas apontar para catálogos e ações previstas.

## Capabilities

### New Capabilities
- `home-page`: cobre a experiência pública da homepage, incluindo conteúdo de marca, categorias, catálogos, CTA de WhatsApp global, profissionais hardcoded no frontend e responsividade.

### Modified Capabilities
- Nenhuma.

## Impact

- `src/pages/index.astro` será substituída pela homepage real.
- Novos componentes Astro e/ou React podem ser criados em `src/components/` para organizar seções reutilizáveis da home.
- Novos estilos globais ou específicos da homepage podem ser adicionados para Tailwind CSS, DaisyUI e tokens visuais do design system.
- Consultas GROQ e helpers de Sanity podem ser adicionados ou reutilizados para buscar categorias e catálogos em build time.
- Assets estáticos ou imagens vindas do Sanity serão usados para hero, categorias, catálogos e blocos visuais.
- `package.json`, configuração Astro e arquivos de estilo podem receber dependências/configuração de Tailwind CSS e DaisyUI, se necessário.
