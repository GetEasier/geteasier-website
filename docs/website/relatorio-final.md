# Redesign do site GetEasier: relatório final

Ramo: `feat/website-redesign-joole2` (não foi feito merge para `main`).
Data: 29/09/2026.

## 1. Como correr localmente

```bash
git fetch origin feat/website-redesign-joole2
git checkout feat/website-redesign-joole2
npm ci
# criar .env.local com as chaves do EmailJS (ver abaixo)
npm run build
npm start                           # http://localhost:3000
```

Para correr a verificação automática (noutro terminal não é preciso: o script arranca o seu próprio servidor):

```bash
npx playwright install chromium     # só da primeira vez
npm run verify
```

O formulário de contacto envia pelo Web3Forms quando existe `NEXT_PUBLIC_WEB3FORMS_KEY` (a chave pede-se em web3forms.com com o email que deve receber os pedidos; põe-se no `.env.local` e nas variáveis da Vercel). Sem essa chave, usa as chaves antigas do EmailJS:

```
NEXT_PUBLIC_WEB3FORMS_KEY=...
```


```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

As publicações do Instagram só aparecem com `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_USER_ID`. Sem elas, a página Sobre mostra só a ligação para o perfil.

Outros comandos: `npm run lint`, `npm run typecheck`, `npm run lastmod` (atualiza as datas do sitemap), `npm run og` (volta a gerar as imagens de partilha quando os títulos mudam).

## 2. O que mudou, por fase

| Fase | Commit | Resultado |
|---|---|---|
| 0 Auditoria | b5e47a6 | `docs/website/auditoria.md` |
| 1 Design | b5e47a6 | `docs/website/design.md` |
| 2 Estrutura e conteúdo | 74e6a69 | Next 16 e React 19, PT na raiz e EN completo em `/en`, conteúdo em `src/content`, 404 real |
| 3 Demos | 71e92f6 | Uma demo HTML/CSS/SVG por produto, ligada aos passos em texto |
| 4 Animação | f606e03 | GSAP + ScrollTrigger, régua em CSS scroll-driven, View Transitions |
| 5 SEO | bf36daf | JSON-LD, sitemap com hreflang e lastmod, robots, imagens OG |
| 6 Desempenho | bbfa5c4 | Fonte reduzida, ajustes em telemóvel |
| 7 Verificação | c4e6957 | `scripts/verify-site.mjs` e `npm run verify` |
| Revisão visual | 0a84d14 | Depois do comentário do Alexandre ("muito texto"): fotografias e cor de volta, menos texto, montra animada no início, demos automáticas nos produtos |
| Textos do tablet | 8faa773 | Demos do TimeEasier com os textos reais da app |
| Ecrãs, funcionalidades e planos | ver git log | Passagem animada entre ecrãs nas demos, funcionalidades em cartões com ilustrações, página de planos com separadores por produto, cartões por plano e tabela comparativa |

### Páginas

- **Português, na raiz:** `/`, `/software-a-medida`, `/produtos`, `/time-easier`, `/construction-easier`, `/stock-easier`, `/wood-easier`, `/planos`, `/sobre`, `/contactos`, `/privacy-policy`, `/terms-and-conditions`.
- **Inglês:** `/en`, `/en/custom-software`, `/en/products`, `/en/time-easier`, `/en/construction-easier`, `/en/stock-easier`, `/en/wood-easier`, `/en/pricing`, `/en/about`, `/en/contact`.

Nenhum URL antigo mudou, por isso não houve 301 de páginas. As âncoras antigas da página inicial (`#contact`, `#team`, `#products`, `#products-list`) são levadas para as páginas novas. `www.geteasier.pt` redireciona com 301 para `https://geteasier.pt` (`next.config.mjs`).

### Aspeto visual (revisão depois da primeira versão)

- Início com fundo escuro da marca e uma montra animada: janela web do ConstructionEasier, tablet de picagem com reconhecimento facial e telemóvel do TimeEasier.
- Logótipos dos clientes a cores, fotografias da equipa a cores, painéis de produto com a cor de cada produto.
- Cada página de produto abre com a cor do produto e uma demo que avança sozinha.
- Capturas reais do StockEasier e do WoodEasier, já publicadas no site anterior.
- Texto reduzido: uma frase de abertura por página e funcionalidades em grelha.

### Animação

Todas as animações correm só sem "reduzir movimento", e sem elas o conteúdo está completo:

- a montra do início repete-se em ciclo de 9 s e tem botão de pausa;
- as demos dos produtos avançam sozinhas enquanto estão visíveis, com botão de pausa e botões para cada passo;
- fotografias e painéis aparecem com uma revelação curta quando entram no ecrã;
- a planta da página de software à medida desenha-se uma vez, em menos de 3 s;
- o diagrama do caso de estudo acende cada parte quando o texto passa;
- a régua das secções desenha-se com `animation-timeline: view()`, sem JavaScript;
- a transição entre páginas é um cruzamento curto com `<ViewTransition>`.

As animações que duram mais de 5 s (montra e demos) têm botão de pausa (WCAG 2.2.2).

### Medições

Lighthouse mobile, local, sobre `next start`:

| Página | Antes (home) | Depois |
|---|---|---|
| Desempenho | 79 | 93–97 depois da revisão visual (início 97, software à medida 95, TimeEasier 93) |
| Acessibilidade | 76 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 91 | 100 |
| LCP (lab) | 3,9 s | até 3,1 s (TimeEasier) |
| CLS | – | 0 |

Código de animação: GSAP 27 KB + ScrollTrigger 17 KB gzip, cerca de 45 KB. Fica abaixo dos 70 KB do brief e só é carregado sem "reduzir movimento".

## 3. Decisões tomadas sem perguntar

1. **Next.js 14 para 16 e React 18 para 19.** Era preciso para `global-not-found`, que dá um 404 real com dois layouts raiz (um `lang` por língua). Com isso veio o ESLint 9 em flat config, porque o `next lint` deixou de existir.
2. **`experimental.globalNotFound`.** A funcionalidade ainda está marcada como experimental no Next 16. Funciona: dá HTTP 404, noindex e nenhum canonical, verificado pelo `npm run verify`.
3. **Páginas legais só em português.** Não existem em inglês; o site em inglês liga para as portuguesas e estas não têm hreflang.
4. **Testemunhos em português na versão inglesa**, com a nota "Quoted in the original Portuguese". Não se traduzem citações de pessoas reais.
5. **Formulário de contacto.** O assunto e a empresa vão no início da mensagem (`[assunto] (empresa)`), para não ser preciso mudar o template do EmailJS.
6. **Fontes self-hosted.**
   - Archivo (variável) e IBM Plex Mono, ambas com licença OFL (ficheiros em `src/fonts`).
   - A Archivo foi reduzida com fontTools ao que o site usa: peso 400–700, largura 100–112 %, Latin-1 e pontuação. Passou de 88 KB para 43 KB.
   - Um carácter fora desse conjunto (por exemplo, um alfabeto não latino) aparece na fonte de sistema.
7. **Ícones em `public/`.** Estão declarados nos metadados dos layouts. Os ficheiros de ícone na raiz de `app/` davam 404 com dois layouts raiz.
8. **`lastmod` do sitemap.**
   - Vem da data do último commit dos ficheiros de cada página (`npm run lastmod`, que se corre à mão antes de um commit de conteúdo; não corre no build, para não alterar ficheiros versionados).
   - Fica guardado em `src/lib/lastmod.json`, que é versionado porque a Vercel pode fazer um clone sem histórico.
   - Por isso a data só fica certa no build depois do commit que a atualiza.
9. **JSON-LD sem preços nem avaliações.** O `operatingSystem` só aparece no TimeEasier, o único com apps nas lojas.
10. **Demos.**
    - Nomes, horas, quantidades, empresas e o lote são fictícios, e cada demo diz "dados de exemplo".
    - O rosto é uma malha de pontos, não uma fotografia.
    - O Check-In-At-Work (só Bélgica) não entra nas demos, como combinado.
11. **Removidos:**
    - dependências: framer-motion, radix, lucide, embla, react-scroll, react-youtube, react-hook-form, emailjs-com, emailjs, tailwindcss-animate, simple-icons e outras sem uso;
    - ficheiros: yarn.lock (fica o package-lock.json), next.svg e vercel.svg.

### Dependências novas

| Pacote | Tipo | Peso | Porquê |
|---|---|---|---|
| gsap | produção | ~45 KB gzip com ScrollTrigger, só sem reduced motion | Demos presas ao scroll e desenho da planta |
| playwright | desenvolvimento | não vai para o site | `npm run verify`, imagens OG |
| eslint 9, eslint-config-next 16 | desenvolvimento | não vai para o site | Lint com Next 16 |

## 4. O que ficou por fazer ou não foi verificado

- **Textos do tablet do TimeEasier (P11).** Resolvido: a demo usa os textos da app ("A reconhecer rosto", "Olá, Rui!", "Presença registada"), tirados dos ficheiros de tradução.
- **Capturas da app com sessão iniciada.** O acesso a staging estava bloqueado neste ambiente, por isso não há capturas reais do TimeEasier nem do ConstructionEasier.
- **Demo de subempreiteiros (P4).** A demo do ConstructionEasier mostra subempreiteiros e o estado dos documentos (válido, a expirar, em falta), com base nas funcionalidades já publicadas. Falta a confirmação do Alexandre.
- **Envio real do formulário.** Não foi testado, porque este ambiente não tem as chaves do EmailJS.
- **Site em produção.** Não foi possível compará-lo, porque o acesso a geteasier.pt e ao YouTube estava bloqueado neste ambiente. O vídeo do WoodEasier só carrega depois do clique, e esse carregamento não foi testado aqui.
- **Números do Lighthouse.** São medidos localmente com o throttling simulado do Lighthouse. Na Vercel, e com dados reais de utilizadores (CrUX), podem ser diferentes.
- **Acessibilidade.** Foi verificada com o Lighthouse (100), teclado nas demos (Tab, setas, Home e End), foco visível, `aria-current` nos breadcrumbs e reduced motion. Não houve teste com leitor de ecrã real (NVDA/VoiceOver).
- **Diagrama de arquitetura no telemóvel.** O texto do diagrama fica pequeno. O diagrama é decorativo (`aria-hidden`) e o mesmo conteúdo está no texto ao lado.
- **Planta do início.** Em ecrã largo, fica escondida até a animação começar, no máximo 3 s. Isto não acontece com reduced motion nem sem JavaScript.
- **Imagens OG.** Estão em `public/og` e têm de ser geradas outra vez (`npm run og`) quando um título mudar.
