Sempre responda em PT-BR.

leia os documentos de documentation

### Integrações MCP (Model Context Protocol)

Este projeto utiliza múltiplos servidores MCP para expandir as capacidades do agente. Abaixo estão as diretrizes estritas sobre **quando** usar cada integração configurada:

#### 1. `context7` (Servidor Remoto)
*   **Descrição:** Conexão com a plataforma Context7 para injeção de contexto e recuperação de informações via API.
*   **Quando usar:** Acione este MCP sempre que a solicitação do usuário exigir busca em bases de conhecimento externas, recuperação de contexto específico do projeto, ou consultas a dados corporativos indexados na plataforma Context7.
*   **Atenção:** Funciona remotamente e requer a chave de API `CONTEXT7_API_KEY` para autenticação.

#### 2. `pencil` (Servidor Local)
*   **Descrição:** Integração com o aplicativo desktop local Pencil.
*   **Quando usar:** Acione este MCP quando o usuário solicitar a leitura, geração, ou manipulação de wireframes, protótipos de interface gráfica (GUI), ou diagramas que dependam do software Pencil instalado localmente no ambiente Windows (`mcp-server-windows-x64.exe`).

#### 3. `sanity` (Servidor Remoto)
*   **Descrição:** Conexão direta com o Headless CMS Sanity.io.
*   **Quando usar:** Acione este MCP de forma prioritária quando a tarefa envolver gerenciamento de conteúdo. Isso inclui consultar dados estruturados usando GROQ, verificar schemas do projeto, ou criar/editar documentos e assets de conteúdo que alimentam o frontend da aplicação.

#### 4. `playwright` (Servidor Local)
*   **Descrição:** Ferramenta de automação de navegador via `@playwright/mcp`.
*   **Quando usar:** Acione este MCP para qualquer tarefa que interaja com a web em tempo real. Isso inclui:
    *   Navegar em URLs específicas para fazer web scraping ou extrair dados do DOM.
    *   Automatizar fluxos de usuário (clicar, preencher formulários) no navegador.
    *   Executar ou validar testes de interface e comportamento de páginas web (E2E).