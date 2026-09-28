# Direção de design e escrita (Fase 1)

Ponto de partida: a GetEasier faz software para empresas que trabalham no terreno (obras, pedreiras, fábricas de paletes) e faz software à medida para quem precisa de um sistema seu. A identidade visual vem de dois sítios reais: **a planta técnica e a portaria da obra**, e **o diagrama de arquitetura de um engenheiro de software**. As duas coisas são desenhos de linhas com cotas, estados e fluxos, e é isso que o site vai parecer.

---

## 1. Paleta

Base: as três cores do logótipo (`public/logo.svg`). O gradiente ciano para azul fica **só no símbolo do logótipo**; no resto do site as duas cores usam-se separadas e cada uma tem uma função.

| Nome | Hex | Função | Contraste (verificado) |
|---|---|---|---|
| **Tinta** | `#06083C` | Texto principal, linhas de desenho, rodapé | 18,96:1 sobre branco, 17,51:1 sobre Papel |
| **Azul GetEasier** | `#1B54B8` | Cor da marca: botões, links, linha ativa de um fluxo | 6,98:1 sobre branco; texto branco sobre ele 6,98:1 |
| **Ciano sinal** | `#18DDBA` | Só como sinal: o ponto que percorre um fluxo, o "está ligado". **Nunca como texto sobre claro** | 1,74:1 sobre branco (não serve para texto); 10,91:1 sobre Tinta |
| **Papel** | `#F4F6F9` | Fundo geral, frio, como papel de planta | — |
| **Grafite** | `#4A5263` | Texto secundário, legendas, cotas | 7,84:1 sobre branco, 7,24:1 sobre Papel |
| **Linha** | `#C9D1DE` | Grelha, régua, contornos de desenho. Não é texto | — |

Cores de estado, só dentro das demonstrações e com o significado do produto:

| Estado | Texto / contorno | Preenchimento | Contraste do texto sobre branco |
|---|---|---|---|
| Válido, entrada registada | `#0F7A5C` | 10 % da mesma cor | 5,30:1 |
| A expirar | `#8F5400` | `#F5B400` (amarelo de sinalização de obra) | 6,11:1 |
| Em falta, recusado | `#B42318` | 10 % da mesma cor | 6,57:1 |

O estado nunca depende só da cor: tem sempre texto ("A expirar em 12 dias") e forma (ícone ou traço diferente).

As cores dos produtos no site atual (`#4285F4`, `#34A853`, `#EA4335`, `#D4A574`) são as do Google e não vêm dos logótipos dos produtos. Deixam de ser cores de interface. Cada produto identifica-se pelo seu logótipo, que já tem cor.

## 2. Tipografia

Duas famílias, ambas com licença SIL Open Font License, alojadas no site em woff2 (subconjuntos latin e latin-ext), carregadas com `next/font/local`, `font-display: swap` e fallback com `size-adjust`.

- **Archivo** (variável, eixos de peso e de largura 62–125). Foi desenhada como grotesca para texto técnico e de sinalética. O eixo de largura permite títulos **expandidos** (largura ~112), que lembram as letras de placas de obra e cartelas de desenho técnico, e texto corrido na largura normal. Uma só família dá as duas vozes.
- **IBM Plex Mono** (só pesos 400 e 500). Reservada para **dados**: horas de registo, códigos de lote, nomes de campos, cotas e estados nos diagramas. Nunca em títulos nem parágrafos.

Substitui a Inter, que é a escolha por defeito de quase todos os SaaS.

### Escala (base 17 px, razão ~1,25, com `clamp` entre 390 px e 1440 px)

| Token | Mobile | Desktop | Uso | Família |
|---|---|---|---|---|
| `display` | 40 px / 1,05 | 72 px / 1,0 | h1 da home | Archivo 700, largura 112 |
| `h1` | 34 px / 1,1 | 52 px / 1,05 | h1 das restantes páginas | Archivo 700, largura 108 |
| `h2` | 27 px / 1,15 | 36 px / 1,1 | secções | Archivo 650, largura 104 |
| `h3` | 21 px / 1,25 | 24 px / 1,25 | subtítulos | Archivo 600, largura 100 |
| `corpo-l` | 18 px / 1,55 | 20 px / 1,55 | introduções | Archivo 400 |
| `corpo` | 17 px / 1,6 | 17 px / 1,6 | texto corrido | Archivo 400 |
| `legenda` | 14 px / 1,45 | 14 px / 1,45 | legendas, notas | Archivo 400 |
| `dado` | 13 px / 1,4 | 14 px / 1,4 | valores, estados, cotas | Plex Mono 400/500 |

Parágrafos com `max-width: 64ch` (fica abaixo dos 80 caracteres em qualquer largura). Títulos com `text-wrap: balance`.

## 3. Layout

### Grelha
- 12 colunas, contentor máximo de 1240 px, calha de 24 px, margem de 20 px em mobile.
- **Régua de cota à esquerda** (desktop): uma linha vertical fina (`Linha`) a correr ao longo das secções, com marcas de cota onde começa cada bloco. É o fio que liga as secções e o sítio onde as animações de scroll "desenham" o progresso. Em mobile passa a uma linha no topo de cada secção.
- Alinhamento à esquerda por defeito. Centrado só na 404.
- Separação entre secções por **linhas de 1 px e espaço**, não por cartões nem fundos alternados. Só há dois fundos: Papel (geral) e Tinta (bloco da prova técnica e rodapé).
- Listas de funcionalidades como **ficha técnica**: linhas com nome à esquerda e descrição à direita, separadas por filetes. Deixa de haver grelha de cartões com ícones.
- Raios: 0 em linhas e diagramas, 6 px em botões e campos, 12 px só nas molduras de dispositivo das demos. Sombras: nenhuma, exceto a moldura do tablet.

### Wireframe: Início (`/`), desktop

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [logo GetEasier]      Software à medida  Produtos  Planos  Sobre  [Falar sobre um projeto] │
├──┬───────────────────────────────────────────────────────────────────────┤
│  │                                                                       │
│┤ │  Fazemos o software que a sua        ┌───────────────────────────┐   │
│  │  empresa usa no terreno.             │  PLANTA QUE SE DESENHA    │   │
│  │  (h1, Archivo expandido)             │  portaria ─┐              │   │
│  │                                      │  tablet ●──┼──▶ servidor  │   │
│  │  Somos uma equipa portuguesa de      │            └──▶ obra A    │   │
│  │  desenvolvimento. Fazemos software   │  07:58  Entrada registada │   │
│  │  à medida e temos quatro produtos    └───────────────────────────┘   │
│  │  próprios…                                                            │
│  │  [Falar sobre um projeto]  [Ver os produtos]                          │
│  │                                                                       │
├──┼──────────────────────────────┬────────────────────────────────────────┤
│┤ │ SOFTWARE À MEDIDA  (col 1-7) │ PRODUTOS (col 8-12)                    │
│  │ h2 + 3 tipos de projeto      │ TimeEasier ─────────── registo de ponto│
│  │ + mini diagrama de camadas   │ ConstructionEasier ─── obras           │
│  │ [Falar sobre um projeto]     │ StockEasier ────────── EPIs, stock     │
│  │                              │ WoodEasier ─────────── passaportes     │
├──┼──────────────────────────────┴────────────────────────────────────────┤
│┤ │ Empresas que trabalham connosco: [logos em cinza, estáticos]         │
├──┼───────────────────────────────────────────────────────────────────────┤
│┤ │ UM DIA NA OBRA (bloco fixado, scroll avança a demo)                   │
│  │ 07:58 entrada ▸ 08:10 subempreiteiro com seguro a expirar ▸ 17:30 saída│
│  │ texto à esquerda, tablet/ecrã à direita                               │
├──┼───────────────────────────────────────────────────────────────────────┤
│┤ │ Testemunhos (3 citações em coluna, texto grande, sem carrossel)       │
├──┼───────────────────────────────────────────────────────────────────────┤
│┤ │ Contacto curto: WhatsApp + [Falar sobre um projeto] → /contactos      │
├──┴───────────────────────────────────────────────────────────────────────┤
│ RODAPÉ (Tinta): navegação completa · legais · PRR · redes                │
└──────────────────────────────────────────────────────────────────────────┘
```

Em mobile a planta do hero fica por baixo do texto, reduzida a três nós, e a régua passa a filete horizontal.

### Wireframe: Software à medida (`/software-a-medida`), desktop

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Início › Software à medida                                               │
│ h1: Software à medida para processos que não cabem num produto feito.    │
│ intro (2 frases) + [Falar sobre um projeto]                              │
├──┬───────────────────────────────────────────────────────────────────────┤
│┤ │ O QUE CONSTRUÍMOS  (ficha técnica, filetes)                           │
│  │ Aplicações web ………………………… (frase concreta)                          │
│  │ Aplicações móveis iOS e Android ……… (frase)                           │
│  │ Integrações com ERP e sistemas públicos ……… (frase)                   │
├──┼───────────────────────────────────────────────────────────────────────┤
│┤ │ COMO TRABALHAMOS (sequência real: aqui há numeração)                  │
│  │ 1 Descoberta ─ 2 Proposta e arquitetura ─ 3 Sprints com demonstrações │
│  │ ─ 4 Entrega ─ 5 Manutenção e evolução   (linha que se desenha)        │
├──┴───────────────────────────────────────────────────────────────────────┤
│ PROVA (fundo Tinta, bloco fixado)                                        │
│ ┌────────────────────┐  ┌────────────────────────────────────────────┐   │
│ │ texto que avança:  │  │  DIAGRAMA DE ARQUITETURA                   │   │
│ │ • multi-empresa    │  │  [app móvel] [tablet] [web]                │   │
│ │ • biometria*       │  │        │        │       │                  │   │
│ │ • integrações      │  │  ┌─────▼────────▼───────▼─────┐            │   │
│ │ • infraestrutura   │  │  │ API · empresa A │ empresa B│◀─ acende   │   │
│ │   e observabilidade│  │  └─────┬──────────────┬───────┘            │   │
│ │                    │  │   [BD por empresa]  [Check-In-At-Work*]    │   │
│ └────────────────────┘  └────────────────────────────────────────────┘   │
│ Ligações: ConstructionEasier · TimeEasier                                │
├──────────────────────────────────────────────────────────────────────────┤
│ TECNOLOGIA (ficha: tecnologia ─ porquê, uma frase cada, sem logótipos)   │
│ Java 25 e Spring Boot 4 ─ … │ GraalVM nativo ─ arranque rápido, menos RAM│
├──────────────────────────────────────────────────────────────────────────┤
│ CONTACTO: formulário com assunto "Projeto à medida" pré-preenchido       │
└──────────────────────────────────────────────────────────────────────────┘
* só entra se for confirmado (perguntas P5, P7 e P9 da auditoria)
```

## 4. Momento assinatura

**A planta que se desenha no hero.** Ao abrir a home, um desenho de linhas finas (Tinta sobre Papel) traça-se em cerca de 1,6 s: a portaria de uma obra, um tablet, a ligação ao servidor e duas obras. Quando a última linha fecha, um ponto Ciano percorre o fluxo do tablet até à obra e aparece, em Plex Mono, `07:58  Entrada registada · Obra Rua das Flores` (dados fictícios). Depois pára. Não há ciclo.

Porquê este: mostra numa imagem as duas frentes da empresa. É um diagrama de sistema (software à medida) e é um registo real de um produto (TimeEasier/ConstructionEasier). Tudo o resto do site é calmo: sem fundos animados, sem blobs, sem movimento em repouso.

Com `prefers-reduced-motion` ou sem JS, a planta aparece já desenhada com o registo visível.

## 5. Movimento (resumo para as Fases 3 e 4)

- Cada animação mostra um fluxo, um estado ou uma relação. As linhas desenham-se (`stroke-dashoffset`), os estados mudam, os nós acendem.
- Blocos fixados com scrub: "Um dia na obra" na home, o diagrama de arquitetura em Software à medida, e uma demo por produto.
- Revelações simples com CSS `animation-timeline: view()` dentro de `@supports`, e só quando trazem informação.
- Não há fade-up genérico por secção nem hover lift.

## 6. Escrita

- Frases curtas, voz ativa, "nós" para a equipa, "a sua empresa" para o leitor.
- Cada título diz o que o produto faz e para quem. Exemplos de reescrita:
  - "Softwares Simples para Problemas Complexos" → "Fazemos o software que a sua empresa usa no terreno."
  - "Registo de ponto sem complicações" → "Registo de ponto no tablet da obra ou no telemóvel, com o relatório mensal que a ACT pede."
  - "Controle total do seu inventário" → "Saiba que EPIs entregou, a quem, e quando tem de voltar a comprar."
  - "Saiba mais sobre WoodEasier" → "Ver o WoodEasier"; "Enviar" → "Enviar mensagem".
- Botões: "Falar sobre um projeto", "Pedir demonstração do ConstructionEasier", "Ver planos", "Enviar mensagem". Sem seta colada.
- Sem pontos de exclamação, emojis, perguntas retóricas nem as expressões proibidas do briefing. Travessões só onde forem mesmo precisos.

## 7. Princípios

1. **Desenhamos como engenheiros.** Linhas, cotas, estados e fluxos em vez de ilustrações e decoração.
2. **Mostramos o registo, não a promessa.** Cada funcionalidade aparece como aquilo que o utilizador vê no ecrã, com dados fictícios e plausíveis.
3. **Duas frentes, um critério.** O software à medida e os produtos saem da mesma equipa, e o site diz isso com a mesma linguagem visual.
4. **O terreno manda.** Letra legível ao sol, alvos de toque grandes e estados que se percebem sem cor, como no tablet de uma obra.
5. **Calma à volta de um momento.** Só a planta do hero chama a atenção. Tudo o resto está ao serviço do texto e das demos.

## 8. Revisão: "faria isto para qualquer outro SaaS?"

| Escolha inicial | Resposta | O que mudou e porquê |
|---|---|---|
| Hero com o gradiente ciano→azul do logótipo em fundo | Sim, é o gradiente azul típico | O gradiente fica só no logótipo. O hero é uma planta de linhas sobre Papel |
| Fundo quase preto com o ciano como acento | Sim, é o padrão "escuro + um acento néon" proibido | Fundo claro (Papel). A Tinta só aparece no bloco de prova técnica e no rodapé, e o ciano só como sinal pontual, nunca como cor de destaque de texto |
| Inter ou Geist | Sim | Archivo com eixo de largura (títulos expandidos de sinalética) + Plex Mono só para dados |
| Grelha de funcionalidades em cartões com ícone | Sim | Ficha técnica com filetes, e demos em vez de ícones |
| Carrossel de logótipos de clientes | Sim | Linha estática em cinza, sem animação |
| Carrossel de testemunhos | Sim | Três citações em coluna, legíveis sem clicar |
| Mockup de dashboard com barras | Sim, e é proibido | Removido. As demos mostram ecrãs com significado (registo, obra, lote) |
| Etiquetas em maiúsculas por cima dos títulos | Sim | Removidas. Nos wireframes aparecem só como nomes de secção para leitura, não no site |
| Numeração em tudo | Sim | Só no "Como trabalhamos", que é uma sequência real |
| Cor por produto (azul, verde, vermelho, bege) | Sim, e as cores eram as do Google | Removida. Cada produto identifica-se pelo seu logótipo |
