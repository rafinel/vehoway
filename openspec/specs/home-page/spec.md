## Purpose
Definir os requisitos canônicos da homepage pública da Vehoway, incluindo a experiência institucional inicial, o uso de conteúdo editorial do Sanity no build, o contato comercial fora do CMS, a aderência ao design system da marca, a responsividade e a fundação visual com Tailwind CSS e DaisyUI.

## Requirements

### Requirement: Homepage SHALL render the public brand experience
O sistema SHALL renderizar a rota `/` como homepage pública da Vehoway, substituindo o conteúdo padrão do template Astro por uma experiência com header, hero, linhas de produto, catálogos, ajuda comercial, credibilidade e footer.

#### Scenario: Visitor opens the homepage
- **WHEN** um visitante acessa a rota `/`
- **THEN** o sistema exibe a homepage da Vehoway com estrutura visual completa e sem conteúdo residual do template Astro

#### Scenario: Homepage supports SEO-friendly rendering
- **WHEN** a homepage é gerada no build
- **THEN** o HTML principal da página é renderizado sem depender de JavaScript client-side para o conteúdo inicial

### Requirement: Homepage SHALL use Sanity catalog content at build time
O sistema SHALL buscar categorias e catálogos publicados do Sanity durante o build para renderizar seções editoriais da homepage com limite visual por seção.

#### Scenario: Categories are available in Sanity
- **WHEN** categorias publicadas estão disponíveis no Sanity durante o build
- **THEN** a seção de linhas de produto exibe categorias publicadas respeitando o limite visual definido pela homepage

#### Scenario: Catalogs are available in Sanity
- **WHEN** catálogos publicados estão disponíveis no Sanity durante o build
- **THEN** a seção de catálogos exibe catálogos publicados respeitando o limite visual definido pela homepage

#### Scenario: Editorial content is empty
- **WHEN** categorias ou catálogos não estão disponíveis no Sanity durante desenvolvimento ou build
- **THEN** a homepage continua renderizando sem erro fatal e exibe estado vazio ou conteúdo mínimo seguro para a seção afetada

### Requirement: Homepage SHALL keep commercial contact outside the CMS
O sistema SHALL manter contato comercial fora do CMS nesta versão, usando WhatsApp global configurado no frontend e profissionais hardcoded no frontend quando exibidos.

#### Scenario: Visitor clicks a WhatsApp CTA
- **WHEN** um visitante aciona um CTA de WhatsApp na homepage
- **THEN** o sistema abre uma URL para o WhatsApp global com mensagem pré-preenchida

#### Scenario: Final WhatsApp number is not defined yet
- **WHEN** o número final de WhatsApp ainda não está definido durante implementação
- **THEN** o sistema usa uma configuração local substituível sem depender do CMS

#### Scenario: Professionals are displayed on the homepage
- **WHEN** a homepage exibe profissionais ou especialistas comerciais
- **THEN** esses dados vêm de configuração hardcoded no frontend e não de documentos Sanity

#### Scenario: Product relationships are evaluated
- **WHEN** a implementação monta dados da homepage
- **THEN** o sistema não cria nem exige relação entre `professional` e `product`

### Requirement: Homepage SHALL follow the Vehoway design system
O sistema SHALL aplicar o design system da Vehoway na homepage, incluindo fonte Manrope, amarelo industrial `#F6C21F`, superfícies claras, blocos escuros de contraste, cards com bordas sutis e linguagem visual técnica/comercial.

#### Scenario: Primary calls to action are rendered
- **WHEN** CTAs principais aparecem na homepage
- **THEN** eles usam o amarelo industrial como cor principal, texto escuro e estados visuais consistentes com o design system

#### Scenario: WhatsApp-specific action is rendered
- **WHEN** uma ação específica de WhatsApp aparece na homepage
- **THEN** ela pode usar tratamento verde de sucesso sem substituir o amarelo como cor principal da marca

#### Scenario: Homepage imagery is rendered
- **WHEN** imagens principais da homepage são exibidas
- **THEN** elas vêm de assets locais do projeto e preservam a direção visual de marca

### Requirement: Homepage SHALL be responsive
O sistema SHALL adaptar a homepage para desktop e mobile, preservando legibilidade, hierarquia visual e acesso aos CTAs principais.

#### Scenario: Visitor uses a desktop viewport
- **WHEN** a homepage é visualizada em largura desktop
- **THEN** as seções usam layout amplo com navegação horizontal e grids compatíveis com o design aprovado

#### Scenario: Visitor uses a mobile viewport
- **WHEN** a homepage é visualizada em largura mobile
- **THEN** navegação, cards, catálogos, ajuda comercial e footer se reorganizam em layout touch-friendly sem overflow horizontal

### Requirement: Homepage SHALL use Tailwind CSS and DaisyUI foundations
O sistema SHALL usar Tailwind CSS e DaisyUI como fundação de styling/componentes da homepage quando configurados no projeto, mantendo customização visual pelos tokens da Vehoway.

#### Scenario: UI dependencies are needed
- **WHEN** Tailwind CSS ou DaisyUI ainda não estão configurados no projeto
- **THEN** a implementação adiciona a configuração necessária para usar essas ferramentas na homepage

#### Scenario: DaisyUI components are customized
- **WHEN** componentes DaisyUI são usados na homepage
- **THEN** eles são customizados para não perder a identidade visual técnica e industrial da Vehoway
