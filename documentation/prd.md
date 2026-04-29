# PRD — Veho Way Busines | Site moderno para Distribuidora de Autopeças

## 1. Visão Geral

A proposta é criar um novo site vitrine moderno para uma distribuidora de autopeças, com foco em:

- Dar vida à marca: credibilidade, presença digital e base para marketing;
- Facilitar contato com profissionais: geração de leads;
- Oferecer uma experiência superior ao site de 2023, com catálogos baixáveis e prévia interativa antes do download.

### Problemas que resolve

- O site atual, de 2023, é simples e não sustenta uma estratégia de marketing nem transmite o posicionamento desejado.
- Falta uma experiência rica para catálogos, com prévia, contexto, organização e consulta de peças.

### Objetivo principal e valor entregue

Entregar um site moderno, inspirado em referências do setor, que:

- Organize linhas/categorias de peças em formato de hub por categoria;
- Permita explorar peças com código e descrição curta via card expandido;
- Conecte peças a catálogos, com prévia, download e similares/relacionadas;
- Viabilize contato rápido com profissionais via WhatsApp, e-mail e telefone.

### Páginas/categorias confirmadas

- Peças Carroceria de Bebidas
- Peças Inox Baú Frigorífico
- Peças e Acessórios Caminhões
- Peças Implementos Rodoviários
- Automação Industrial – Pneumática

---

## 2. Requisitos

### Hub por categoria

- [ ] Hub por categoria com visão completa

**Descrição:**  
Cada categoria do site funciona como um hub, reunindo peças, catálogos e contatos de responsáveis.

#### Regras de Negócio

- Categorias fixas nesta versão:
  - Peças Carroceria de Bebidas
  - Peças Inox Baú Frigorífico
  - Peças e Acessórios Caminhões
  - Peças Implementos Rodoviários
  - Automação Industrial – Pneumática
- Cada categoria deve permitir associação com:
  - Peças;
  - Catálogos;
  - Profissionais responsáveis.
- O conteúdo das categorias deve ser mantido via painel/admin.

#### Regras de UI/UX

- O hub deve ter entradas claras para:
  - Peças;
  - Catálogos;
  - Falar com um profissional.
- Os hubs devem seguir o mesmo padrão de funcionamento entre categorias.

---

### Busca e filtros dentro da categoria

- [ ] Busca e filtros para encontrar peças por nome/código

**Descrição:**  
Dentro do hub de cada categoria, o usuário deve conseguir buscar e filtrar peças para localizar rapidamente por código ou nome.

#### Regras de Negócio

- A busca por texto deve aceitar consulta por nome e por código.
- Por padrão, a busca deve ser aplicada apenas às peças da categoria atual.
- Quando não houver resultados, deve ser exibido um estado informativo com opção de limpar filtros.

#### Regras de UI/UX

- O campo de busca deve ser visível, com placeholder:  
  `Buscar por nome ou código`
- A lista deve atualizar conforme a busca.
- Deve haver estado vazio quando necessário.
- Deve ser possível limpar busca/filtros com 1 clique ou toque.

---

### Peças na própria página com card expandido

- [ ] Listagem de peças com card expandido, sem página individual por peça

**Descrição:**  
No hub de cada categoria, as peças aparecem em lista ou grade. Ao interagir com uma peça, abre-se um card expandido com detalhes mínimos e ações úteis.

#### Regras de Negócio

- Dados mínimos por peça:
  - Nome;
  - Código.
- Dados opcionais por peça:
  - Descrição curta;
  - Tags/atributos;
  - Referência ao catálogo, quando aplicável.
- A peça pode ter lista configurável de similares/relacionadas.
- A inclusão e edição de peças devem ser feitas no admin.

#### Regras de UI/UX

- Clique ou toque abre o card expandido.
- Ações disponíveis no card expandido:
  - Ver no catálogo;
  - Baixar catálogo;
  - Falar com profissional.
- No mobile, a interação deve funcionar por toque, sem depender de hover.

---

### Catálogos públicos com detalhe + prévia

- [ ] Catálogos públicos com página de detalhe
- [ ] Prévia do catálogo em modal antes do download

**Descrição:**  
Visitantes conseguem entender o que há no catálogo, por meio de descrição e destaques, e visualizar uma amostra antes de baixar.

#### Regras de Negócio

- O download deve ser público, sem login.
- Metadados do catálogo:
  - Título;
  - Categoria associada;
  - Descrição;
  - Arquivo para download.
- O catálogo deve ter uma amostra limitada, com páginas ou imagens selecionadas para exibição em modal.
- O catálogo pode ter lista de destaques, como:
  - Linhas cobertas;
  - Famílias de peças;
  - Aplicações.

#### Regras de UI/UX

- O modal de prévia deve permitir navegação entre páginas da amostra.
- O modal deve ter CTA de download.
- Deve mostrar nome do catálogo e resumo junto da prévia.
- Deve indicar erro caso a prévia ou download falhe.

---

### Fale com nossos profissionais

- [ ] Seção/Página “Fale com nossos profissionais” com responsáveis e múltiplos canais

**Descrição:**  
Exibir de 2 a 5 profissionais, como vendedores, gerente ou outros responsáveis, com áreas atendidas e canais de contato.

#### Regras de Negócio

- Cadastro de profissionais com:
  - Nome;
  - Papel;
  - Categorias atendidas;
  - WhatsApp obrigatório;
  - E-mail opcional;
  - Telefone opcional.
- No hub da categoria, sugerir o(s) profissional(is) daquela categoria.
- A mensagem pré-preenchida no WhatsApp deve incluir:
  - Categoria;
  - Nome/código da peça, quando acionado a partir de uma peça.

#### Regras de UI/UX

- Os cards devem mostrar claramente o que cada profissional cuida.
- Ações por canal:
  - WhatsApp: abrir conversa;
  - E-mail: abrir cliente de e-mail com assunto sugerido;
  - Telefone: link clicável para discagem em mobile ou exibir número em desktop.

---

### Manutenção contínua para não “envelhecer” rápido

- [ ] Conteúdo modular e fácil de atualizar

**Descrição:**  
O site deve permitir atualização constante e expansão, com novos catálogos, peças e profissionais, sem retrabalho pesado.

#### Regras de Negócio

- Admin com CRUD para:
  - Categorias;
  - Peças;
  - Catálogos;
  - Profissionais.
- Deve ser possível criar, editar e arquivar conteúdos.
- O arquivamento deve remover o conteúdo do público sem apagar o histórico.
- Deve ser possível adicionar novas categorias no futuro, mesmo que nesta versão sejam usadas as 5 categorias fixas.

#### Regras de UI/UX

- Catálogo/peça deve poder aparecer onde fizer sentido:
  - Hub;
  - Página de catálogos.

---

## 3. Fluxo de Usuário

### Explorar categoria → buscar peça → consultar catálogo → entrar em contato

1. O usuário acessa o site e entra em uma categoria/hub.
2. O usuário usa a busca para localizar uma peça por nome ou código.
3. O sistema filtra a lista:
   - Sucesso: a lista atualiza com resultados;
   - Falha: exibe estado “nenhum resultado” e opção de limpar busca/filtros.
4. O usuário clica ou toca em uma peça.
5. O sistema abre o card expandido com:
   - Nome;
   - Código;
   - Descrição curta;
   - Similares, quando houver.
6. O usuário escolhe uma ação:
   - Ver no catálogo: abre modal de prévia;
   - Baixar catálogo: inicia download;
   - Falar com profissional: abre opções de contato.
7. Se o usuário escolher contato, o sistema oferece:
   - WhatsApp: abre conversa com mensagem pré-preenchida;
   - E-mail: abre cliente de e-mail com assunto sugerido;
   - Telefone: inicia ligação no mobile ou exibe número no desktop.
8. Em caso de falha em qualquer canal, o sistema deve exibir alternativa:
   - Copiar contato;
   - Tentar novamente.

---

## 4. Fora do Escopo

- E-commerce, compra online ou checkout.
- Área logada de clientes, como portal, histórico ou permissões para baixar.
- Integrações com ERP.
- Precificação de peças e condições comerciais online.
- Chatbot ou atendimento automatizado.
- Multi-idioma.
- Painel avançado de analytics/BI interno além de métricas básicas de marketing.