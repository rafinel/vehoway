# Design System

## Overview
Um sistema visual comercial e técnico para distribuição de autopeças e componentes rodoviários. A estética combina base neutra, superfícies claras, blocos escuros de alto contraste e acentos quentes em amarelo industrial. O tom geral é objetivo, confiável e especializado: interface de catálogo com linguagem de vendedor técnico, forte legibilidade e apelo visual voltado a implementos, peças e atendimento consultivo.

## Colors
- **Primary** (#F6C21F): CTAs principais, linhas ativas de navegação, marcadores visuais, chips de destaque e acentos da marca.
- **Primary Hover** (#E5AE12): Hover, bordas reforçadas e sombras tingidas dos elementos primários.
- **Secondary** (#8A6300): Links de apoio, textos de ação secundária e contraste tipográfico sobre superfícies claras amareladas.
- **Neutral** (#6B7280): Texto secundário, metadados, placeholders, códigos, apoio descritivo.
- **Background** (#F7F7F4): Fundo geral das páginas e áreas de catálogo.
- **Surface** (#FFFFFF): Cards, painéis, barras de busca, filtros e modais.
- **Text Primary** (#050505): Títulos, headings principais e conteúdo de maior prioridade.
- **Text Secondary** (#111827): Navegação, labels e corpo com maior contraste em superfícies claras.
- **Border** (#E5E7EB): Bordas padrão de cards, inputs, painéis e divisórias sutis.
- **Success** (#16A34A): Estado associado a contato via WhatsApp e confirmações positivas.
- **Warning** (#F6C21F): Chamadas de atenção, badges de destaque e prova visual de prioridade.
- **Error** (#A62911): Estado destrutivo ou erro, previsto nos tokens, mas pouco explorado nas telas-base.

## Typography
- **Display Font**: Manrope
- **Body Font**: Manrope
- **Code Font**: Não há uma família monoespaçada explícita nas telas-base; referências técnicas aparecem também em Manrope.

O sistema usa Manrope em toda a interface, com pesos altos para títulos e pesos médios/semibold para texto funcional. A tipografia é compacta, firme e comercial, sem ornamentação editorial. Títulos grandes usam peso 800-900; navegação e corpo usam 500-700; labels e códigos usam 700-900 com tamanhos reduzidos.

Type scale: Hero display 74px, Hero display secondary 66px, Section heading 32px, Card heading 26px, Panel title 22px, Body 18px, UI body 16px, Label 14px, Small 13px, Caption 12px, Micro 11px.

## Elevation
O sistema usa sombras suaves, mas constantes em elementos de conversão e cards de produto. Superfícies comuns repousam sobre fundo claro com borda de 1px. Cards e CTAs recebem sombra externa leve a média, normalmente com deslocamento vertical perceptível e blur amplo. Blocos hero escuros dependem mais de contraste e glow radial quente do que de sombra. A hierarquia vem da combinação de borda, cor, imagem e contraste, não de elevação exagerada.

## Components
- **Buttons**: O botão primário usa preenchimento amarelo `#F6C21F`, texto quase preto, raio entre 8px e 10px, peso 700 e, em alguns casos, ícone Lucide. O CTA de WhatsApp também aparece em verde de sucesso quando contextualizado dentro de cards de detalhe. Botões de apoio em superfícies claras usam fundo branco, borda sutil e texto escuro ou marrom.
- **Cards**: Cards de produto e cards de linha usam superfície branca, borda de 1px e raio de 10px a 12px. Muitos cards usam imagem no topo, corpo com padding de 18px a 22px, título forte, metadado/código e ação no rodapé. Cards de destaque podem usar borda dourada clara `#E6D39A` para indicar prioridade comercial.
- **Inputs**: Busca e selects usam fundo branco, borda `#E5E7EB`, raio 8px, altura entre 54px e 56px, padding horizontal de 14px a 18px e placeholder em cinza neutro. Ícones Lucide aparecem sempre em cinza médio.
- **Chips**: Chips informativos usam formato pill (`999px`), fundo escuro translúcido em áreas hero ou fundo claro neutro/amarelado em áreas de catálogo. Padding recorrente: 8x12 para chips escuros e 5x8 para mini-tags. Tags de aplicação usam fundo `#F7F7F4` e texto `#6B7280`; o estado de destaque pode usar `#FFF9E8` com texto marrom `#8A6300`.
- **Lists**: Seções de suporte e blocos comparáveis usam empilhamento vertical com espaçamentos regulares de 6px a 14px. A organização tende a priorizar grupos em frames com `gap`, em vez de listas com divisores pesados.
- **Checkboxes**: Nas telas-base aparecem como quadrados de 16px com raio 4px, usando amarelo no estado selecionado e branco com borda cinza no estado padrão.
- **Tooltips**: Não há tooltip customizado explícito no sistema observado.
- **Navigation**: O header é horizontal, branco, com altura de 92px, borda inferior de 1px e padding lateral de 64px. A navegação usa texto 14px, com item ativo reforçado por peso maior e uma linha amarela curta abaixo.
- **Search**: A busca principal da página de produtos é um campo largo e horizontal com ícone à esquerda, 54px de altura, fundo branco, borda sutil e placeholder funcional. Ela convive com filtros segmentados e painéis laterais.

## Spacing
- Base unit: 4px
- Scale: 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 40, 56, 64, 92px
- Component padding: small 5×8, medium 10×12, default 14×24, large 18×22
- Section spacing: 24px a 28px em blocos internos, 40px a 64px em seções principais
- Container max width: largura de tela desktop em torno de 1496px com padding lateral recorrente de 64px
- Card grid gap: 18-22px

## Border Radius
- 4px: Checkboxes e pequenos detalhes geométricos
- 8px: Botões secundários, busca, selects, segmented controls
- 10px: CTAs principais, cards de grid e símbolo principal da marca
- 12px: Cards de destaque, painéis de detalhe, imagens hero destacadas
- 999px: Chips, pills, badges e tags de aplicação

## Do's and Don'ts
- Do use `#F6C21F` como cor de ação principal e marcação de estado ativo.
- Do manter superfícies claras com borda sutil para filtros, cards e campos de entrada.
- Do usar Manrope em toda a interface para preservar a consistência visual observada nas telas.
- Do combinar blocos escuros com acentos amarelos para áreas hero, banners e destaques institucionais.
- Do usar verde apenas para WhatsApp, disponibilidade e feedbacks positivos específicos.
- Don't usar azul, roxo ou gradientes decorativos fora dos assets fotográficos e glows pontuais já presentes no hero.
- Don't trocar o amarelo principal por verde nos CTAs genéricos; verde deve continuar reservado ao contexto de contato/WhatsApp e sucesso.
- Don't usar sombras pesadas em todos os elementos; reserve maior profundidade para cards-chave, imagens hero e botões de conversão.
- Don't misturar muitos raios diferentes no mesmo bloco; 8px, 10px, 12px e pill já cobrem praticamente todo o sistema.
- Don't tratar o produto como UI genérica SaaS; a linguagem visual precisa continuar técnica, industrial e comercial.
