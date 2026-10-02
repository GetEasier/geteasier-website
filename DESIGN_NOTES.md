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

Acabamento (01/10, a pedido de "mais profissional, mais efeitos"): barra de progresso no passo atual, luz que acompanha
o passo, entradas e saídas com desfoque (profundidade), contorno de luz a rodar no diagrama e no editor, fluxo contínuo e
pulsos na API com latências, cursor a piscar e pipeline Build, Testes, Deploy, brilho a atravessar a aplicação quando o
código a desenha, e na entrega um cursor que toca em "Registar entrada" (o botão confirma e o número sobe).
Tudo pausa com o botão, fora do ecrã e com a aba escondida; com "reduzir movimento" nada disto corre.

Clientes: passa a uma faixa contínua (`ClientMarquee`) com pontas a desvanecer, pausa com o rato, o foco e o botão; sem JS
ou com "reduzir movimento" fica a grelha parada. Substitui o cinzento a ganhar cor.
Software à medida: os três itens passam a cartões com ícone em gradiente, descrição e uma pequena ilustração (barras, app,
integração com um ponto a circular).

Testemunhos (01/10, opção escolhida "Três cartões"): os três testemunhos lado a lado em cartões de cor com foto e logótipo, e os
números numa faixa escura por baixo. O carrossel deixa de ser usado no início.
Equipa: fundo da marca com grelha, pílulas com factos (Marco de Canaveses, equipa portuguesa, do desenho ao suporte) e cartões
que se inclinam para o rato, com luz que segue o ponteiro, contorno de luz ao passar e nome num painel de vidro (`TeamLive`).

### Testemunhos em faixa horizontal (2026-10-01)
Os três cartões de cor passam devagar na horizontal (70 s por volta, mesma keyframe da faixa dos clientes), com as pontas a desvanecer. Param com o rato ou o foco em cima, fora do ecrã, com a aba escondida e com o botão "Pausar os testemunhos" (WCAG 2.2.2). Sem JS ou com "reduzir movimento" ficam os três cartões parados na grelha da página.

### Do caos ao controlo genérico + rodapé (2026-10-01)
No início, "Do caos ao controlo" passa a contar uma manhã numa empresa qualquer (pedidos numa folha, post-its, foto do quadro → pedidos com responsável, prazo e estado), para vender o software à medida sem parecer página de produto. A versão da obra passou para a página do ConstructionEasier, logo a seguir ao hero, com o mesmo componente.
Rodapé: o logótipo dos apoios (PRR) é branco com fundo transparente e estava dentro de uma caixa branca, por isso aparecia uma barra branca vazia. Agora fica direto no fundo escuro, com uma ligação visível para descarregar a ficha do projeto.

### Rodapé novo e sem botões de pausa (2026-10-01)
Rodapé com o fundo da marca e grelha, colunas com títulos em ciano, redes em ícones redondos, coluna de contacto (WhatsApp e morada) e o símbolo da marca em grande e quase invisível no canto. Fora do início e dos contactos (que já acabam num cartão de contacto) abre com um convite a falar. Clicar nos logótipos dos apoios descarrega a ficha do projeto; a ligação de texto saiu.
Por pedido do Alexandre, saíram todos os botões de pausar animações (PauseButton e o botão da CameraDemo). As animações continuam a parar fora do ecrã, com a aba escondida e com "reduzir movimento"; as faixas de clientes e testemunhos param com o rato ou o foco em cima.

### Newsletter (2026-10-01)
No início, a inscrição na newsletter do Substack é um cartão claro logo a seguir ao hero, antes dos clientes. Nas outras páginas fica no topo do rodapé (no início não se repete). Sem pop-up: irrita quem acabou de chegar e o Google penaliza pop-ups que tapam o conteúdo no telemóvel. O formulário abre a página de subscrição do Substack com o email preenchido. O endereço está em COMPANY.newsletter: https://geteasiersoftwares.substack.com (confirmado pelo Alexandre a 2026-10-02).

### Em números no topo (2026-10-01)
Números confirmados pelo Alexandre: 8+ empresas clientes, 10 000+ registos de ponto por mês, 4+ anos a fazer software. O cartão escuro "Em números" passou para logo a seguir à newsletter, antes dos clientes. A secção "Páginas relacionadas" saiu das páginas de produto (único sítio onde existia).


### Título do início em "Cinematic Text" (2026-10-02, teste)
A pedido do Alexandre, o hero do início usa o Cinematic Text da Planes (useplanes.com): cada palavra do título desce de um desfoque forte e assenta, depois o texto de apoio (mais rápido e menos desfocado) e por fim os dois botões (CinematicGroup). Desde 2026-10-02 está também no título principal (h1) de Software à medida, Produtos, cada produto, Planos (PageHeader), Sobre e Contactos, em PT e EN, sempre com o mesmo ritmo do início: título, depois o texto de apoio e por fim os botões (e as etiquetas em Sobre, os selos das lojas no TimeEasier). Os títulos das secções não o usam. A pedido do Alexandre ficou mais rápido do que o original: 1 s por palavra e 0,07 s entre palavras (o original usa 1,4 s e 0,11 s). Código do componente copiado do registo da Planes para src/components/interactions/CinematicText.tsx, com a biblioteca motion trocada por transições CSS com a mesma curva: evita uma dependência nova só por um título, e o registo npm não estava acessível deste ambiente. Com "reduzir movimento" é só um fade de 0,22 s. O título fica escondido até o JS correr, por isso conta para o LCP.

### Perguntas frequentes animadas (2026-10-02)
No componente Faq (início, Software à medida e ConstructionEasier): as perguntas sobem uma a uma quando a lista entra no ecrã; a pergunta aberta passa a cartão branco com sombra e uma barra ciano→azul que cresce à esquerda; o "+" está num círculo que roda e fica azul; a resposta entra com fade. Sem JS funciona como antes (details); com "reduzir movimento" não há transições.

## Integração antiga do Instagram retirada (2026-10-02)

O token da Graph API expirou e a página Sobre já não mostrava publicações. Saíram a rota `/api/instagram`, o `InstagramFeed`, o `INSTAGRAM_SETUP.md`, os textos `instagramTitle`/`instagramLink` e os `remotePatterns` do Instagram/Facebook em `next.config.mjs`. Ficam os ícones do Instagram no rodapé e nos contactos. As variáveis `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_USER_ID` deixaram de ser usadas.

## Clientes e testemunhos também se deslizam à mão (2026-10-02)

As duas faixas do início deixaram a animação CSS e passaram a `useMarquee` (`src/components/motion/useMarquee.ts`): um rAF move a faixa à mesma velocidade de antes (38 s e 70 s por volta) e a pessoa pode arrastar com o rato, fazer swipe no telemóvel ou usar o scroll horizontal do trackpad. O automático para com o rato ou o foco em cima e retoma 1,5 s depois de largar. O swipe vertical e a roda vertical continuam a descer a página (`touch-action: pan-y`). Sem `motion-ok` (reduzir movimento ou sem JS) fica a grelha parada. Scroll com CPU 4x no início igual ao anterior (~27-28 ms por frame nas duas versões).

## Menu do telemóvel em folha que sobe do fundo (2026-10-02)

Inspirado no `@uiarc/user-menu` (Arc, MIT), que no telemóvel abre como folha inferior. O registo não descarrega daqui e o site não usa shadcn nem a biblioteca `motion`, por isso foi refeito à mão em `MobileMenu.tsx` + CSS `.mm-*`, sem dependências. Do componente ficou: folha a subir com mola, pega e arrasto para baixo para fechar, fundo escurecido que fecha ao tocar, linhas com ícone que entram uma a uma, seletor segmentado (aqui PT | EN) e página parada por trás. A mais: os quatro produtos em atalhos dentro do menu e o botão "Falar sobre um projeto" a toda a largura. Continua a ser um `<details>` (abre e fecha sem JS); Escape fecha, o foco fica preso na folha e volta ao botão. Sem `motion-ok` abre e fecha sem movimento. Fechado não pesa nada (o conteúdo do `<details>` não é desenhado).
