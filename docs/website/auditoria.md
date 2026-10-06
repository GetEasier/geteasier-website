# Auditoria do website GetEasier (Fase 0)

Data: 28/09/2026. Branch: `feat/website-redesign-joole2` (ver nota em "Decisões").
Esta fase não alterou código da aplicação. A única mudança no repositório é o Playwright como `devDependency`, pedida no briefing.

---

## 1. Stack, build e deploy

| Item | Valor |
|---|---|
| Framework | **Next.js 14.1.0** (App Router), React 18, TypeScript 5 |
| Estilos | Tailwind CSS 3.3 + `tailwindcss-animate`, componentes shadcn/ui (`components.json`) |
| Animação | `framer-motion` 11 (usado em `animation/fade-*.tsx`, `TeamSection.tsx`, `ui/*`) |
| Formulário | `react-hook-form` + EmailJS (`emailjs-com`), chaves em `NEXT_PUBLIC_EMAILJS_*` |
| Outros | `react-scroll`, `embla-carousel`, `react-youtube`, `lucide-react`, `simple-icons` |
| Fontes | Inter via `next/font/google` (`src/app/layout.tsx:10`) |
| Idiomas | PT e EN no cliente (`src/contexts/LanguageContext.tsx`), mesmo URL, escolha guardada em `localStorage` |
| API | `src/app/api/instagram/route.ts` (Instagram Graph API; sem token devolve lista vazia) |
| Build | `npm run build` (`next build`). Todas as rotas saem como estáticas (`○`) |
| Deploy | Vercel (`vercel.json` só com `"framework": "nextjs"`). Não há Caddyfile, nginx nem Dockerfile |
| Lint | `npm run lint` **não está configurado**: não existe `.eslintrc`, e o comando abre o assistente interativo do Next |
| Testes | Não existem |
| Lockfiles | Existem `package-lock.json` e `yarn.lock` em simultâneo |

**Pontos a registar**

- Next 14.1.0 tem avisos de segurança publicados (a versão é de janeiro de 2024). Não usamos middleware, o que reduz a exposição, mas a atualização deve entrar na Fase 2.
- O Next 14 não tem suporte nativo à View Transitions API no router. Ver decisão D4.
- `src/app/_page.tsx` é uma versão antiga da home, não é rota e não é importada. Código morto.
- `README.md` tem um conflito de merge por resolver (`<<<<<<< HEAD`).

## 2. Rotas: metadados atuais e HTML servido

Verificado com `curl` sobre o build de produção (`next start`).

| Rota | `<title>` servido | description | canonical | `h1` no HTML antes de JS |
|---|---|---|---|---|
| `/` | GetEasier — Softwares Simples para Problemas Complexos | genérica do layout | não | **`hero.titlehero.titleHighlight`** (chave de tradução) |
| `/time-easier` | igual à home | igual à home | não | **`productPages.timeEasier.hero.title`** |
| `/construction-easier` | igual à home | igual à home | não | **chave de tradução** |
| `/stock-easier` | igual à home | igual à home | não | **chave de tradução** |
| `/wood-easier` | igual à home | igual à home | não | **chave de tradução** |
| `/planos` | igual à home | igual à home | não | Planos e Módulos |
| `/privacy-policy` | Política de Privacidade \| GetEasier \| GetEasier | própria | não | Política de Privacidade e Proteção de Dados (RGPD) |
| `/terms-and-conditions` | Termos e Condições \| GetEasier \| GetEasier | própria | não | Termos e Condições de Utilização e Prestação de Serviços |
| 404 (`/qualquer-coisa`) | igual à home | igual à home | não | **`notFound.title`** |

Problemas encontrados:

1. **O texto das páginas não existe no HTML servido.** As traduções carregam-se de forma assíncrona no cliente (`LanguageContext.tsx:19`), por isso o HTML pré-renderizado tem as chaves (`hero.title`, `productPages...`) em vez do texto. Um robô que não execute JS, ou uma pré-visualização de link, vê as chaves. É o problema de SEO mais grave do site.
2. Seis rotas partilham o mesmo title e a mesma description.
3. As páginas legais repetem "| GetEasier" porque o title já o inclui e o template do layout acrescenta-o outra vez (`layout.tsx:15`).
4. Não há canonical, Open Graph, Twitter Card, JSON-LD, `robots.txt` nem `sitemap.xml` (os dois últimos devolvem 404).
5. `<html lang="pt">` em vez de `pt-PT`.
6. A 404 devolve HTTP 404 real (bom), mas não tem `noindex`.
7. Todas as páginas são `'use client'` na raiz, o que impede `export const metadata` por página.
8. Favicon só em `.ico`. Não há `apple-touch-icon` nem `site.webmanifest`.

## 3. Inventário de conteúdo (fonte de verdade)

### Empresa
- Nome legal: GetEasier – UNIVERSAL IDEAS - LDA, NIPC 517156261, sede na Alameda do Outeiro, n.º 163, 4575-037 Alpendorada e Matos, Marco de Canaveses (`src/content/legal/terms-of-use.pt.ts:16`).
- Serviços: desenvolvimento à medida (web, mobile, integrações), produtos próprios, consultoria e suporte (`pt.json:22-37`).
- Equipa: Alexandre Barreto e Nelson Luís (Desenvolvimento), Rui Peixoto (Gestor de Produto), com fotografias (`TeamSection.tsx:8-24`).
- Financiamento PRR/NextGenerationEU, com ficha de projeto em PDF (`Footer.tsx:10-11`).

### Contactos (manter)
- WhatsApp +351 914 223 323 (`ContactForm.tsx:98`).
- Formulário por EmailJS. **Não existe email nem telefone público no site** além do WhatsApp.
- Facebook, Instagram (`geteasier.pt`) e LinkedIn (`Footer.tsx:13-29`).

### Produtos e funcionalidades já publicados

| Produto | URL | Funcionalidades citadas no site |
|---|---|---|
| **TimeEasier** | `/time-easier` | Registo de ponto em tablet no local ou remoto; app iOS e Android (links reais para App Store e Google Play); controlo de horas; vários tipos de horário; ausências; mapa de férias; relatório mensal (Art. 202.º CT / ACT); documentos por colaborador; horas extra; geolocalização; aprovação de registos; alertas de documentos expirados; formações; exportação salarial; integração ERP |
| **ConstructionEasier** | `/construction-easier` | Inclui o TimeEasier; lista de obras; localização de colaboradores por obra; custos por obra; estado e progresso; documentação por obra; **subempreiteiros e gestão documental de subempreiteiros**; permissões Diretor de Obra, TSST, Encarregado Geral; **alertas de entrada de colaborador em obra**; auto de obra automático; despesas de alojamento; **integração com Check-In-At-Work (só Bélgica)** |
| **StockEasier** | `/stock-easier` | Entradas e saídas de EPIs e consumíveis; níveis em tempo real; alertas de reposição; histórico; categorias e locais; relatório de EPIs por colaborador; multiutilizador |
| **WoodEasier** | `/wood-easier` | Passaportes de madeira tratada; lotes e movimentos; relatórios e comprovativos DGAV; rastreabilidade da receção à expedição; tratamentos (temperaturas e durações); vídeo YouTube |
| Planos | `/planos` | Tabela Base / Avançado / Premium por módulo, alternância Portugal/Bélgica, sem preços. Mínimo de 25 colaboradores |

Fonte: `src/translations/pt.json` e `src/app/planos/page.tsx:24-110`.

Os Termos (`terms-of-use.pt.ts:45`) dizem que a plataforma "permite a recolha de dados biométricos (impressão digital e/ou imagem facial) para efeitos de identificação do Trabalhador no momento da picagem".

### Prova social já publicada
- Logótipos: Granitos do Norte, Granitos Irmãos Peixoto, Futuro Alternativo, OJP, Pardais (`page.tsx:59-80`).
- Três testemunhos com nome, empresa e fotografia (`page.tsx:24-56`).

Como já estão no site, contam como fonte de verdade e podem manter-se.

### Páginas legais
- `/privacy-policy` e `/terms-and-conditions`, com texto oficial de 12/01/2026 (`src/content/legal/`).
- O rodapé liga a `/privacy-policy#cookies`, mas **não existe banner de cookies** no site nem analytics (não encontrei nenhum script de medição). Nada a partir aqui.

### Divergência com o briefing
O briefing descreve uma "plataforma GetEasier" de controlo de acessos com reconhecimento facial. O site não usa esse nome: vende quatro produtos com nome próprio. A correspondência mais próxima é **TimeEasier + ConstructionEasier**. Esta divergência entra nas perguntas bloqueantes (P1).

## 4. Linha de base de erros

Build de produção servido em `localhost`, Chromium headless (Playwright 1.63), 390 px e 1440 px, com scroll até ao fim de cada página.

| Página | Consola / rede |
|---|---|
| `/`, `/time-easier`, `/construction-easier`, `/stock-easier`, `/planos`, legais | 0 erros, 0 avisos |
| `/wood-easier` | 1 pedido falhado + 1 erro: `https://www.youtube.com/iframe_api` (bloqueado pela rede do ambiente de teste; em produção carrega, mas é um script de terceiros que corre sempre, sem clique) |
| 404 | 1 `console.error` do próprio browser pelo estado 404 (esperado; o verificador final vai tratá-lo como exceção) |

Build: compila sem erros nem avisos de tipos (`tsc --noEmit` limpo). Avisos só de `caniuse-lite` desatualizado.

Outros defeitos vistos nas capturas:

- **O logótipo perde o nome "GetEasier" quando se faz scroll.** O `logo.svg` tem o texto a branco (`.st1{fill:#FFFFFF}`), que desaparece contra a navbar branca. Só fica o símbolo.
- A secção de Instagram mostra publicações de reserva com **gostos e comentários inventados** (42, 38, 55…) quando a API não está configurada (`page.tsx:176-216`, `InstagramCarousel.tsx:64-68`).
- A rota `/api/instagram` é estática: corre no build e depois só se renova pelo `revalidate` do `fetch`.

## 5. Lighthouse de base (mobile, simulado)

| Página | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 79 | 76 | 100 | 91 | 3,9 s | 0 | 380 ms |
| `/time-easier` | 90 | 90 | 100 | 91 | 3,3 s | 0,084 | 20 ms |
| `/construction-easier` | 89 | 90 | 100 | 91 | 3,5 s | 0,095 | 10 ms |

Falhas comuns: imagens sem dimensões, botões sem nome acessível, contraste insuficiente, ordem de títulos com saltos (h1 para h4 no rodapé), `role="tab"` sem estrutura ARIA completa, alvos de toque pequenos, links sem `href` (`react-scroll`), cerca de 110 KB de imagens por otimizar e JS não usado.

## 6. Sinais de "site feito por IA"

### Texto (`src/translations/pt.json`)

| Linha | Frase | Problema |
|---|---|---|
| 10-11 | "Softwares Simples / para Problemas Complexos" | Genérico, serve a qualquer empresa. "Softwares" no plural soa a PT-BR |
| 12 | "A gestão completa da sua empresa em qualquer parte do mundo." | Promessa vaga |
| 13 | "…transformando tarefas complexas em soluções simples e acessíveis." | "Soluções" vazio, gerúndio |
| 28, 206, 277 | "— aplicações web, mobile e integrações —" | Travessões em excesso |
| 36 | "de ponta a ponta" | Frase feita |
| 46, 53, 60, 67 | "Saiba mais sobre…" | Proibido |
| 51, 205 | "Toda a informação do seu projeto num só lugar" | Expressão proibida |
| 52, 59 | "controlo eficiente", "otimize", "de forma prática e eficaz" | Palavras vazias |
| 58, 234 | "Controle total do seu inventário. Nunca mais fique sem…" | "Controle" é PT-BR; hipérbole |
| 61 | "Gestão de inventário inteligente" | Adjetivo vazio |
| 66 | "projetado", "Ele oferece recursos para rastrear" | PT-BR |
| 88 | "Pronto para simplificar o seu negócio?" | Pergunta retórica |
| 100 | "Enviar" | Botão que não diz o que acontece |
| 145-147 | "Tudo o que precisa para uma gestão completa e eficiente…" | Repetido 3 vezes |
| 160 | "Registo de ponto sem complicações" | Expressão proibida |

### Design

| Padrão | Onde |
|---|---|
| Palavra do título destacada com gradiente | `page.tsx:262`, `not-found.tsx:29`; títulos h2 com gradiente em `*-easier/page.tsx:64-85` |
| Seta "→" colada aos botões | `page.tsx:288`, `page.tsx:600`, `not-found.tsx:61`; SVG de seta em todos os CTA de produto |
| Kit de cartões SaaS: ícone em quadrado com gradiente, título, frase, cartões iguais | `ServicesSection.tsx`, `time-easier/page.tsx:74-190` e equivalentes |
| Hover lift e zoom do ícone em todos os cartões | `hover:-translate-y-*` e `group-hover:scale-110` nas 4 páginas de produto |
| Blobs desfocados como decoração | `page.tsx:363-364` |
| Fundo animado "beams" | `page.tsx:8`, `page.tsx:623` (`ui/background-beams.tsx`) |
| Etiqueta em maiúsculas espaçadas | `ClientsCarousel.tsx:45`, `Footer.tsx:74`, `Footer.tsx:96`, `page.tsx:574` |
| Dashboards falsos com barras sem significado | `AppMockup.tsx` (hero e mockups de produto: "128h", "98%", barras coloridas) |
| Fade-up em quase todos os blocos | `animation/fade-up.tsx`, usado em todas as páginas |
| Emojis de bandeiras como ícones | `planos/page.tsx:200` |
| Faixa enviesada | `TeamSection.tsx:52` |

Componentes decorativos não usados ou quase: `ui/3d-card.tsx`, `ui/background-gradient*.tsx`, `ui/moving-border.tsx`.

## 7. Proposta de arquitetura

Mantêm-se todos os URLs atuais. Não há páginas por funcionalidade: cada funcionalidade tem hoje uma ou duas frases, o que daria páginas finas. As funcionalidades passam a secções com âncora e demonstração dentro da página do produto.

```
/                         Início (entradas "Software à medida" e "Produtos")
├─ /software-a-medida     NOVA
├─ /produtos              NOVA  (índice dos 4 produtos; pai nos breadcrumbs)
│  ├─ /time-easier                (mantém URL)
│  ├─ /construction-easier        (mantém URL)
│  ├─ /stock-easier               (mantém URL)
│  └─ /wood-easier                (mantém URL)
├─ /planos                        (mantém URL)
├─ /sobre                 NOVA  (equipa, empresa, financiamento PRR)
├─ /contactos             NOVA  (formulário, WhatsApp, redes)
├─ /privacy-policy                (mantém URL)
├─ /terms-and-conditions          (mantém URL)
└─ 404
```

`/#contact`, `/#team` e `/#testimonials` continuam a funcionar (ficam âncoras na home ou redirecionam no cliente para as páginas novas). Nenhum URL existente muda, por isso não são precisos 301.

### Mapa de links internos

| Página | Liga a |
|---|---|
| Início | Software à medida, Produtos, cada produto, Planos, Sobre, Contactos |
| Software à medida | ConstructionEasier e TimeEasier (caso de estudo), Produtos, Contactos (assunto "Projeto à medida") |
| Produtos | 4 produtos, Planos, Software à medida |
| Cada produto | Produto relacionado (TimeEasier ↔ ConstructionEasier; StockEasier ↔ ConstructionEasier por EPIs; WoodEasier ↔ Software à medida), Planos com âncora do módulo, Contactos (assunto "Demonstração de …") |
| Planos | 4 produtos, Contactos |
| Sobre | Software à medida, Produtos, Contactos |
| Contactos | Sobre, Planos |
| Rodapé | navegação completa, legais, redes |

## 8. Perguntas bloqueantes

Todas têm uma recomendação. Se aprovares as recomendações sem mudanças, avanço com elas.

**P1. O que é a "plataforma GetEasier" do briefing?**
O site vende quatro produtos com nome (TimeEasier, ConstructionEasier, StockEasier, WoodEasier). O briefing fala de uma plataforma de controlo de acessos com reconhecimento facial.
*Recomendação:* manter os quatro produtos e os seus URLs. O "caso de estudo" da página de software à medida passa a ser "a plataforma que está por trás do TimeEasier e do ConstructionEasier". Não crio `/plataforma`.

**P2. `{{SITE_URL}}`.** Não consegui aceder ao domínio a partir deste ambiente. O site refere `geteasier.pt` (Instagram) e `app.geteasier.pt` (mockup).
*Recomendação:* `https://geteasier.pt` sem `www`, com o `www` a redirecionar por 301 na Vercel. Preciso que confirmes qual é o domínio principal hoje.

**P3. `{{OUTROS_PRODUTOS}}`.** *Recomendação:* StockEasier e WoodEasier, tal como estão no site.

**P4. ⚠️ Gestão de subcontratados.** Confirmado pelo site: `/planos` lista "Subempreiteiros" e "Gestão documental de subempreiteiros" (ConstructionEasier, Avançado).
*Recomendação:* demo "Visão de obra" com empresas subempreiteiras, trabalhadores e estado dos documentos. Uso o termo "subempreiteiros", que é o do produto.

**P5. ⚠️ Reconhecimento facial.** Os Termos falam de "impressão digital e/ou imagem facial" na picagem, mas nenhuma página de produto o menciona.
*Recomendação:* mostrar como "identificação biométrica no registo de ponto (rosto)" na demo de entrada em obra, sem prometer precisão nem velocidade. Preciso de saber se já está em produção.

**P6. ⚠️ Leitura automática de documentos.** Não aparece no site.
*Recomendação:* não mostrar até confirmares que está em produção.

**P7. ⚠️ Integração ONSS.** O site já tem "Integração com Check-In-At-Work", só na Bélgica e no plano Premium.
*Recomendação:* uma frase e um diagrama pequeno na página do ConstructionEasier: "Para obras na Bélgica, as presenças podem ser comunicadas ao Check-In-At-Work da ONSS". Preciso que confirmes que a integração envia as presenças automaticamente.

**P8. ⚠️ Terminal IP65.** O site só diz "tablet no local de trabalho".
*Recomendação:* não mostrar a caixa IP65. A demo usa um tablet genérico.

**P9. ⚠️ IA com Spring AI e modelos próprios.** Não aparece no site.
*Recomendação:* retirar da página de software à medida até confirmares. O resto da stack da secção 1 (Java 25, Spring Boot 4, GraalVM, Angular 21, multi-tenant, CI/CD, observabilidade) uso como está.

**P10. Versão em inglês.** Existe um seletor PT/EN que troca o texto no browser, no mesmo URL. O Google não o consegue indexar e não permite `hreflang`.
*Recomendação:* retirar o seletor e ficar só com PT-PT nesta entrega. Uma versão `/en` com URLs próprios fica como sugestão no relatório.

**P11. Nomes dos estados nas demos.** O site não diz o que o tablet mostra depois da picagem.
*Recomendação:* usar "Entrada registada", "Saída registada" e "Registo recusado: documento expirado", e corrijo se o produto usar outros termos.

## 9. Decisões tomadas (não bloqueantes)

- **D1. Branch.** Este ambiente só me deixa publicar em `feat/website-redesign-joole2`, não em `feat/website-redesign`. Trabalho nesse branch e a PR indica-o.
- **D2. Stack.** O briefing assume Angular em alguns pontos, mas o site é Next.js. Aplico o equivalente em Next: metadados com a Metadata API, `app/sitemap.ts`, `app/robots.ts`, `notFound()` com 404 real, e todo o texto no HTML do servidor.
- **D3. Atualizar o Next.js** para a versão estável atual (e React 19) num commit separado no início da Fase 2, validado com build e verificação. Justificação: avisos de segurança do 14.1 e suporte a View Transitions.
- **D4. Transições entre páginas.** Uso a View Transitions API através do suporte do router do Next, se a versão atualizada o tiver. Se ainda for experimental, faço uma transição curta só com CSS e registo-o.
- **D5.** Remover os gostos e comentários inventados do Instagram. Sem API, a secção mostra só a ligação para o perfil.
- **D6.** O vídeo do YouTube em `/wood-easier` passa a carregar só com clique (fachada com imagem), para não correr scripts de terceiros ao abrir a página.
- **D7.** Lint: acrescentar `.eslintrc.json` com `next/core-web-vitals` para que `npm run lint` corra sem assistente.

## 10. Respostas do Alexandre (29/09/2026)

| Pergunta | Resposta | Decisão |
|---|---|---|
| P1 | Sim | Quatro produtos, URLs mantidos. Caso de estudo: TimeEasier + ConstructionEasier |
| P2 | Sim, mas também dá com www | Canonical `https://geteasier.pt`; `www` redireciona com 301 (configuração de domínios na Vercel) |
| P3 | Sim | StockEasier e WoodEasier |
| P4 | Pediu esclarecimento | Proposta explicada no thread; aguarda resposta |
| P5 | Sim, em produção | Identificação facial no registo de ponto pode ser mostrada |
| P6 | Sim | Leitura de documentos fica fora |
| P7 | Sim, mas só Bélgica | Fica fora das demos; mantém-se a linha já existente em `/planos` (Bélgica) |
| P8 | Sim | Terminal IP65 fica fora; demo com tablet genérico |
| P9 | Não falar de IA | IA fica fora do site |
| P10 | Não: quer EN também | Versão EN com URLs próprios em `/en` e slugs em inglês, `hreflang` recíproco e `x-default` para PT |
| P11 | Não | Aguarda os textos reais do tablet; textos provisórios até lá |
