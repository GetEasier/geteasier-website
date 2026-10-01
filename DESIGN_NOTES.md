# Design notes: motion design e demos

Plano aprovado: `motion-design/plano-fase1.md` (pasta do projeto, 29/09/2026). Este ficheiro regista as decisões das fases 2 a 7 e a razão de cada movimento.

## Princípios aplicados

- Um só momento orquestrado no site: o check-in do hero. Tudo o resto é calmo e cada secção do início tem um efeito diferente.
- Anima-se só `transform`, `opacity` e `clip-path`. Exceções: o `filter: grayscale` dos logótipos (uma vez, nunca em loop) e o `grid-template-rows` do acordeão (pedido no briefing).
- Tudo o que se mexe sozinho mais de 5 s tem pausa (hero, quiosque, feed, separadores, testemunhos) e pára fora do ecrã e com a aba escondida (`usePlayback`).
- Com "reduzir movimento": estados finais, sem pin, sem parallax, sem loops, e os botões de pausa desaparecem (`.motion-only`).
- Sem JavaScript: o HTML servido já está no estado final (hero com os quatro widgets, contadores com o valor, FAQ em `<details>`, testemunhos em lista, caos em três blocos).
- Estados iniciais escondidos só com JS: a classe `motion-ok` vai para o `<html>` por um script inline, e o GSAP esconde só o que ainda está abaixo do ecrã.

## Tokens

CSS em `src/app/globals.css` (`--dur-*`, `--ease-*`, `--stagger`, `--loop-pausa`) e TS em `src/motion/tokens.ts`.
`cubic-bezier(0.16, 1, 0.3, 1)` corresponde ao `expo.out` e `cubic-bezier(0.65, 0, 0.35, 1)` ao `power2.inOut`, por isso não foi preciso o CustomEase. `--ease-confirma` (back.out 1.6) só existe no check do reconhecimento facial.

Cores novas: Betão `#E9EAE6` e Caixa 7035 `#C9CCC6` (`bg-betao`, `border-caixa`). O fundo escuro `.hero-dark` perdeu os brilhos azul e ciano (gradientes decorativos) e ficou só com a grelha.

## Mapa de secções e razão do movimento

| Secção | Movimento | Porquê |
|---|---|---|
| Cabeçalho | Encolhe 12 px ao descer (só visual, sem mexer no layout) e linha de progresso em CSS `animation-timeline: scroll()` | Mostra onde se está sem ocupar espaço. Sem CLS. |
| Início: hero | Check-in: espera, scan, pontos ligam-se, moldura verde, check com o único salto; os widgets entram pela ordem da história; parallax ao ponteiro de 6 px só em desktop com rato | É a metáfora do site: quem entra, quando e se está tudo em ordem. |
| Clientes | Logótipos passam de cinzento a cor um a um, uma vez | Chama a atenção para os clientes reais sem marquee (só há 5). |
| Software à medida | A fotografia abre da esquerda para a direita ligada ao scroll (portão de obra); o texto acompanha com atraso | Liga a frente de serviços às pessoas reais. |
| Os 4 produtos | Painéis sobem como uma persiana; o ecrã pequeno de cada produto muda de estado uma vez e repete ao passar o rato | Cada produto mostra logo o que faz. |
| Do caos ao controlo | A única secção pinned (desktop com altura ≥ 700 px). Scrub em três atos; no terceiro as linhas da folha e os avisos deslocam-se (FLIP) para a vista organizada; SplitText só na frase final | Prova o "porquê" a quem hoje usa Excel e mensagens. |
| Testemunhos e números | Crossfade com ligeira deslocação, avanço de 9 s com pausa; contadores sobem uma vez | Prova real; os números ficam [CONFIRMAR]. |
| Equipa | As três fotografias deslizam a velocidades diferentes (só desktop) | Profundidade sem pedir interação. |
| FAQ | Altura de 0fr a 1fr em 280 ms | Tira objeções antes do CTA. |
| ConstructionEasier: modos | Troca de modo com crossfade e escala 0,98 → 1; cada micro-demo corre uma vez por escolha | Três coisas que acontecem à entrada sem texto longo. |
| Módulos | Barra de 6 s; pausa com rato, foco, fora do ecrã, aba escondida, botão e de vez após escolha; o crachá do Rui transita entre vistas (Flip) | Cinco módulos sem cinco secções. |
| Perfis | Crossfade de 150 ms | Cada leitor encontra a sua dor em duas frases. |
| Portaria e feed | Quiosque em loop; cada rosto reconhecido entra no topo do feed (Flip) e o contador sobe; o filtro reorganiza com Flip | As duas vistas reais do produto: a portaria e o gabinete. |
| TimeEasier | Quiosque em loop | Reutiliza a micro-demo do reconhecimento facial. |

## Primitivas

- `src/motion/tokens.ts`, `src/motion/gsap.ts` (import dinâmico partilhado de GSAP, ScrollTrigger e Flip).
- `src/components/motion/usePlayback.ts` (IntersectionObserver, visibilitychange, reduced motion, pausa), `useTabs.ts` (tablist/tab/tabpanel com setas, Home e End), `PauseButton.tsx`.
- `src/components/checkin/`: `FaceCheck` (4 estados), `Kiosk` (caixa vertical), `KioskLoop`, `Badge` (o crachá), `CheckInHero`.
- `src/components/home/`: `ChaosToControl`, `HomeMotion`, `ProductMini`, `Stats`/`Count`, `TestimonialCarousel`.
- `src/components/ce/`: `ModesDemo`, `DocRead`, `ModuleTabs`, `Profiles`, `GateFeed`.
- `src/components/ui/Faq.tsx`.
- `/motion-lab`: todas as primitivas isoladas. `noindex`, fora do sitemap e sem ligações.

## Decisões e desvios ao plano

- `@gsap/react` não entrou: o `useGSAP` obriga a importar o GSAP de forma estática, o que o punha no JS inicial do início. Usei import dinâmico com `gsap.matchMedia()` e `revert()` no cleanup, que é o que o `useGSAP` faz.
- DrawSVG não entrou: os traços do rosto e do check desenham-se com `pathLength=1` e `stroke-dashoffset` em CSS, sem JS.
- O FLIP do caos ao controlo usa posições `offsetLeft/Top` (imunes a transformações) em vez de `Flip.fit`, para o scrub continuar certo depois de um resize. O Flip do GSAP é usado no feed e no crachá dos separadores.
- Sem snap no pin, para não sequestrar o scroll.
- Lenis não entrou (scroll nativo chega para um pin).
- A percentagem "98,7 %" não aparece: o tablet real não a mostra. Fica "Rosto verificado".
- A demo de leitura de documento não tem vista JSON (acessório retirado).
- Botões das lojas saíram do hero do início (continuam na página do TimeEasier).
- "Início" é o primeiro item do menu e só fica marcado na página inicial.

## Medições (build de produção, 29/09)

- `npm run verify`: 22 páginas × 3 vistas, tudo certo.
- Lighthouse mobile, início: performance 96–97, acessibilidade 100, CLS 0, TBT 60–110 ms, LCP 2,4–2,7 s (o h1; atraso de render sob throttling, no limite dos 2,5 s).
- Lighthouse mobile, ConstructionEasier: performance 99, acessibilidade 97 (contraste dentro da cena da webapp, já existente), CLS 0, LCP 2,2 s.
- JS de animação novo (gzip): Flip ≈ 10,6 KB, SplitText ≈ 3,3 KB, mais o código dos componentes; GSAP e ScrollTrigger já estavam pagos.

## Por confirmar antes de produção [CONFIRMAR]

- Leitura de documentos: ecrã da app e campos lidos (textos da demo marcados).
- Siglas AS, RM, CP, AD por extenso.
- Os três números da secção "Em números".
- Caixa do tablet: cor real e especificações (IP65 não é afirmado).
- Empresas fictícias "Cofragens Tejo", "Eletro Douro" e "Construções Marvila" não coincidem com clientes reais.

## Revisão de 01/10/2026: Geist e hero escuro

O Alexandre achou que o site parecia "software antigo". As escolhas para fugir ao kit SaaS
(fundo Betão, caixa 7035, cantos retos, filetes em vez de sombras, Archivo larga) davam esse ar.
Comparou três versões do início e escolheu a B:

- Tipo de letra: **Geist** e **Geist Mono** (variáveis, OFL), em subconjunto Latin de cerca de 31 KB e 33 KB. Saem a Archivo e a IBM Plex Mono. Títulos com espaçamento negativo em vez de largura expandida.
- Hero do início em tinta com a luz azul e ciano da marca (`.hero-brand`), CTA ciano, como no redesign de que ele gostou.
- Cantos arredondados (`ctl` 10 px, `frame` 18 px, widgets e crachá 14–16 px, caixa do tablet 28 px), botões em pílula e sombras suaves nos widgets e painéis.
- Menos cinzento: o token `betao` passa a `#F4F6F9` e `caixa` a `#DCE2EA` (os nomes ficam para não mexer em todos os componentes).

Lighthouse mobile depois da mudança: início 89–97 (variação entre corridas), ConstructionEasier 98; CLS 0; `npm run verify` passa.

## Revisão de 01/10/2026: hero do início sobre software à medida

O Alexandre pediu uma animação genérica sobre desenvolvimento à medida em vez do check-in (registo de ponto).
`BuildHero` conta quatro passos, com os nomes visíveis por cima: **Ideia** (a aplicação é um esboço tracejado e há um post-it com o pedido),
**Desenho** (os blocos ganham cor e o gráfico sobe), **Código** (o editor escreve as linhas e os testes passam) e **Entrega**
(a mesma aplicação no telemóvel, ligada ao ERP, salários e faturação, e "Versão 1.0 publicada").
Tudo em HTML e CSS com tamanhos em `em` sobre `container-type: inline-size`, por isso escala igual no telemóvel.
Pausa, fora do ecrã e "reduzir movimento" como no check-in; sem JS fica no passo final. O `CheckInHero` continua no motion lab.

Segunda versão (01/10): a aplicação de exemplo passa a ser de assiduidade (registo de ponto) e o segundo passo é
**Arquitetura**: um diagrama SVG (Web, iOS e Android, Tablet → API com autenticação → Registos, Turnos, Relatórios →
base de dados e ERP · Salários) que se desenha com `stroke-dashoffset` e por onde circulam pedidos (`animateMotion`, só
montados durante esse passo). A aplicação fica em esboço até ao passo do código e ganha cor quando o código "corre".
