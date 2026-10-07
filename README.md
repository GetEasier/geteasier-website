# GetEasier website

Website institucional em Next.js e React. Instalar e verificar com npm:

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

A compilação descarrega a fonte Inter de Google Fonts e requer acesso à rede.

## Contactos

Em `.env.local`, configurar **uma** das alternativas:

- `NEXT_PUBLIC_WEB3FORMS_KEY`: usa Web3Forms, compatível com a configuração local existente.
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` e `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: usa EmailJS se as três variáveis estiverem presentes.

Estas chaves públicas são identificadores destinados ao navegador. Nunca colocar credenciais privadas em variáveis `NEXT_PUBLIC_*`. As variáveis públicas são incorporadas na compilação; alterações em produção exigem uma nova compilação e publicação.

O formulário valida campos, evita envios simultâneos e contém um honeypot. Estas medidas no navegador podem ser contornadas. Configurar as restrições de domínio e a proteção contra spam/CAPTCHA no fornecedor escolhido; o código local não permite confirmar as definições da conta. O envio real deve ser validado com um pedido autorizado após configurar a conta.

## Instagram

Configurar `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_USER_ID` (ID numérico), exclusivamente no servidor. Ver [INSTAGRAM_SETUP.md](INSTAGRAM_SETUP.md).

A API usa autenticação por cabeçalho, cache de uma hora, limite de oito segundos e filtra URLs externas. Falhas devolvem uma resposta genérica sem credenciais e o carrossel usa `initialPosts` quando fornecidos; sem posts válidos, oculta-se.

## Segurança

Consultar [SECURITY_REVIEW.md](SECURITY_REVIEW.md) para as correções, validações e limitações da análise. As atualizações de dependências são fixadas em `package-lock.json`; npm é o processo de instalação verificado nesta análise.
