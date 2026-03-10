# Configuração do Instagram Feed

O carrossel "Últimas Publicações" usa a **Instagram Graph API (Meta)** para buscar os posts da conta `geteasier.pt`.

---

## Requisitos

- Conta Instagram **Business** ou **Creator** para `geteasier.pt`
- Conta em [developers.facebook.com](https://developers.facebook.com)
- A conta Instagram deve estar ligada a uma **Página do Facebook**

---

## Passos para configurar

### 1. Criar uma App no Facebook Developers

1. Acede a https://developers.facebook.com/apps/
2. Clica em **Criar App**
3. Escolhe o tipo **Business** e preenche os dados da app

### 2. Adicionar Instagram Graph API

1. No painel da app, vai a **Adicionar Produto**
2. Procura **Instagram Graph API** e clica em **Configurar**
3. Segue as instruções para ligar a conta Instagram à app

### 3. Obter User ID e Access Token

**Importante:** `INSTAGRAM_USER_ID` tem de ser o **ID numérico** da conta (ex: `17841400008460056`), **não** o nome de utilizador (ex: `geteasier.pt`). Se usares o username, a API devolve erro *"Object with ID 'geteasier.pt' does not exist"*.

1. Vai a **Ferramentas** → **Explorador da API Graph**
2. Seleciona a tua app no dropdown
3. **User ID (numérico):**
   - Em **Instagram** → **Configurações Básicas** da app, vê o "Instagram Account ID" (número longo), **ou**
   - No explorador: escolhe a tua Página do Facebook ligada ao Instagram e usa algo como `{page-id}?fields=instagram_business_account` para obter o `instagram_business_account.id` (esse número é o User ID)
4. **Access Token:**
   - Clica em **Gerar Token de Acesso**
   - Seleciona as permissões: `instagram_basic`, `instagram_manage_insights` (e as que a configuração pedir)
   - Para produção, gera um **Long-Lived Token** (dura mais tempo)

### 4. Variáveis de ambiente

**Em local:** cria ou edita o ficheiro `.env.local` na raiz do projeto:

```env
INSTAGRAM_ACCESS_TOKEN=o_teu_access_token_aqui
INSTAGRAM_USER_ID=17841400008460056
```

**Não uses** o username (`geteasier.pt`) em `INSTAGRAM_USER_ID` — só o número (Instagram Account ID).

**Na Vercel (produção):** em **Settings** → **Environment Variables** do projeto, adiciona as mesmas variáveis com os teus valores.

### 5. Reiniciar / redeploy

- Local: reinicia o servidor (`npm run dev`)
- Vercel: faz redeploy para aplicar as novas variáveis

---

## Notas

- O token de curta duração expira ao fim de pouco tempo; usa **Long-Lived Token** para produção.
- A API devolve as últimas **5** publicações e a resposta é cacheada **1 hora**.
- Se não configurares a API, o site usa os posts estáticos definidos em `src/app/page.tsx` (array `INSTAGRAM_POSTS`).

## Posts manuais (sem API)

Se não quiseres usar a API, podes manter apenas os posts estáticos editando o array `INSTAGRAM_POSTS` em `src/app/page.tsx` e colocando aí as URLs das imagens e links dos posts.
