# Análise de segurança e bugs — 7 de outubro de 2026

Análise do estado local do projeto, incluindo as alterações que já estavam em curso. As correções foram integradas sem publicar o site nem enviar mensagens reais. Esta análise cobre código, dependências, compilação, testes de regressão e verificações locais; não é um teste de intrusão à infraestrutura de produção.

## Problemas corrigidos

| Prioridade | Problema observado | Correção |
| --- | --- | --- |
| Alta | Next.js fixado em 14.1.0, uma linha antiga abrangida por avisos de segurança. | Atualização para 15.5.27, com eslint-config-next alinhado. Atualizações compatíveis das dependências e overrides para PostCSS, postcss-selector-parser e brace-expansion. Compilação validada. |
| Alta — funcional | ContactForm exigia três variáveis EmailJS, mas o ambiente local continha apenas uma configuração Web3Forms. O formulário apresentava erro em todos os envios nesse ambiente. | Usa Web3Forms quando as três variáveis EmailJS não estão disponíveis. Mantém a integração EmailJS quando completa e substitui o SDK obsoleto emailjs-com. Testes usam fornecedores simulados. |
| Média | Pedido Instagram sem prazo podia deixar o carrossel em carregamento por tempo indeterminado. O efeito não cancelava pedidos após desmontagem. | Limites de 8 segundos no servidor e 10 segundos no cliente; cancelamento e limpeza no efeito; fallback para posts iniciais válidos. |
| Média | Falhas Instagram eram devolvidas como HTTP 200; os diagnósticos incluíam o corpo completo do fornecedor nos logs e, em desenvolvimento, na resposta. | HTTP 503 com erro genérico e no-store. Remoção de corpos de erro e dados de configuração dos logs/respostas. Token enviado no cabeçalho Authorization, em vez da URL. |
| Média | Eventos dos carrosséis não eram removidos integralmente; o carrossel capturava setas mesmo em campos e abas filhos. | Limpeza dos eventos select/reInit e exclusão de campos editáveis e tablists na captura de teclas. |
| Média | Escape em qualquer ponto da página forçava o foco para o botão móvel do menu, mesmo quando oculto. | Só atua quando um menu está aberto; devolve o foco ao controlo adequado. Navegação também fecha submenus. |
| Baixa | CardItem não reagia a alterações nas propriedades de transformação; o gradiente escrevia variáveis globais no body e usava posições antigas do cursor. | Dependências do efeito corrigidas; variáveis do gradiente limitadas ao componente; movimento com requestAnimationFrame e cancelamento. |
| Baixa | README continha marcadores de conflito e as instruções Instagram referiam um array inexistente. Não havia configuração de lint, pelo que o comando pedia configuração interativa. | Documentação corrigida, configuração ESLint e comandos de testes/typecheck adicionados. |

## Reforços de segurança

- URLs do feed validadas por protocolo HTTPS, domínio, porta e ausência de credenciais. Apenas media de cdninstagram.com/fbcdn.net e links de instagram.com são aceites, incluindo subdomínios. Aplicado no servidor e nos posts consumidos pelo cliente.
- Respostas públicas Instagram têm cache explícita para preservar o comportamento após a atualização do Next.js. Respostas de erro não são cacheadas.
- Cabeçalhos X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy e uma CSP limitada a base-uri/object-src/frame-ancestors. A CSP adicionada impede incorporação e objetos; não constitui uma política completa contra XSS. X-Powered-By desativado.
- A variável de acesso Instagram permanece exclusivamente no servidor. `.env.local` está ignorado pelo Git e não consta dos ficheiros versionados atuais. Não foi feita uma auditoria de todo o histórico Git.

## Dependências e riscos pendentes

**Auditoria de produção:** `npm audit --omit=dev` terminou com **0 vulnerabilidades reportadas**. Isto descreve o resultado da ferramenta, não uma garantia de ausência de vulnerabilidades no site.

**Auditoria completa:** permanecem **8 alertas de severidade alta** na cadeia de ferramentas de desenvolvimento, todos associados a `braces@3.0.3` e aos pacotes que o incluem: Tailwind CSS, chokidar, micromatch, fast-glob e ferramentas ESLint. A versão mais recente de braces disponível na consulta foi 3.0.3, abrangida pelo aviso [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). O risco envolve consumo de recursos ao processar padrões profundamente aninhados. Não foi identificado um caminho em que visitantes do site controlem esses padrões de compilação.

O relatório npm sugere mudanças de versão principal em alguns pacotes, mas não oferece uma correção isolada para braces. Não foi feita uma migração completa de Tailwind 3 para 4: requer rever configuração, plugins e estilos. Os alertas continuam registados e devem ser tratados numa atualização das ferramentas. `tailwindcss-animate` foi colocado em devDependencies porque é um plugin de compilação; esta classificação evita incluí-lo numa instalação de produção que omita dependências de desenvolvimento, sem corrigir o alerta em si.

O processo de instalação e auditoria validado é npm, com `package-lock.json` e os overrides definidos no package.json. Não foi validada uma instalação independente com Yarn.

**Proteção contra spam:** o honeypot, as validações e a prevenção de envios simultâneos no navegador podem ser contornados. As chaves públicas Web3Forms/EmailJS destinam-se ao cliente e não devem ser tratadas como segredos. É necessário confirmar as restrições de domínio e a proteção antiabuso/CAPTCHA na conta do fornecedor; essas definições não estão acessíveis no projeto. Ver [segurança EmailJS](https://www.emailjs.com/docs/faq/does-emailjs-expose-my-account-to-spam/) e [API Web3Forms](https://docs.web3forms.com/getting-started/api-reference).

**Integrações externas:** a entrega efetiva de email e a validade/permissões do token Instagram não foram testadas com pedidos reais. Os testes simulam sucesso, erros e timeouts sem contactar os fornecedores nem gerar mensagens. O caminho EmailJS continua a usar o prazo de execução do SDK; o limite de 15 segundos aplica-se ao Web3Forms.

## Validação concluída

- `npm test`: 10 testes passaram, cobrindo seleção de fornecedor, payload, sucesso/falha de envio, URLs inseguras, configuração Instagram, autenticação, limites de posts, vídeos e respostas de erro.
- `npm run lint`: passou sem avisos.
- `npm run typecheck`: passou.
- `npm run build`: passou; todas as páginas geradas. A fonte Inter requer acesso a Google Fonts durante a compilação.
- Servidor de produção local: página inicial, quatro produtos, desenvolvimento à medida, duas páginas legais e API responderam como esperado; rota inexistente devolveu 404. Cabeçalhos verificados em todas estas respostas.
- Navegador: página inicial carregou sem erros de consola; submissão vazia mostrou erros nos três campos obrigatórios; ArrowRight selecionou a aba seguinte.
- `git diff --check`: passou.

Referência para a atualização da linha Next.js: [comunicado de segurança Vercel de maio de 2026](https://vercel.com/changelog/next-js-may-2026-security-release). Foi instalada a versão mais recente da linha 15 disponível no registo npm durante a análise, 15.5.27.
