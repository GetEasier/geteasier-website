# Configuração do Instagram Feed

Para o carrossel buscar **automaticamente** os posts da conta `geteasier.pt`, podes usar uma de duas opções.

---

## Opção A: Apify (recomendado se não tiveres Facebook)

**Não precisas de conta Facebook nem de developers.facebook.com.** Só precisas de uma conta no [Apify](https://apify.com) (registo com email).

### 1. Criar conta no Apify
1. Vai a [apify.com](https://apify.com) e regista-te (email ou Google).
2. Em **Settings** → **Integrations** copia o teu **API Token** e guarda-o.

### 2. Criar uma Task do Instagram Profile Scraper
1. Abre o actor **Instagram Profile Scraper**:  
   [https://apify.com/vulnv/instagram-profile-scraper](https://apify.com/vulnv/instagram-profile-scraper)
2. Clica em **Try for free** / **Start**.
3. No campo **Input**, coloca por exemplo:
   ```json
   {
     "urls": ["https://www.instagram.com/geteasier.pt/"]
   }
   ```
4. Clica em **Save as Task** (ou **Save**). Dá um nome à task (ex: `geteasier-instagram`).
5. Na página da Task, copia o **Task ID**:  
   - Pode aparecer no URL (ex.: `apify.com/.../tasks/xyz~geteasier-instagram`) como `xyz~geteasier-instagram`,  
   - ou em **Settings** da task como identificador.  
   Usa esse valor como `APIFY_INSTAGRAM_TASK_ID`.

### 3. Variáveis de ambiente
Cria ou edita o ficheiro `.env.local` na raiz do projeto:

```env
APIFY_TOKEN=o_teu_api_token_do_apify
APIFY_INSTAGRAM_TASK_ID=o_task_id_que_copiaste
```

Exemplo:
```env
APIFY_TOKEN=apify_api_xxxxxxxxxxxx
APIFY_INSTAGRAM_TASK_ID=tuauser~geteasier-instagram
```

### 4. Reiniciar o servidor
```bash
npm run dev
```

### Notas (Apify)
- A conta Instagram `geteasier.pt` deve ser **pública**.
- O Apify cobra por execução (pay-per-use); há créditos gratuitos no início.
- A primeira carga pode demorar 20–50 segundos; as seguintes ficam em cache 1 hora.

---

## Opção B: Instagram Graph API (Meta / Facebook)

Requer conta em [developers.facebook.com](https://developers.facebook.com) e ligação a uma Página do Facebook.

### 1. Preparar a Conta Instagram
- A conta `geteasier.pt` deve ser **Business** ou **Creator**
- Deve estar ligada a uma **Página do Facebook**

### 2. Criar uma App no Facebook Developers

### 1. Preparar a Conta Instagram
- Certifique-se de que a conta `geteasier.pt` é uma **conta Business** ou **Creator**
- A conta deve estar conectada a uma **Página do Facebook**

### 2. Criar uma App no Facebook Developers
1. Acesse https://developers.facebook.com/apps/
2. Clique em "Criar App"
3. Escolha "Business" como tipo de app
4. Preencha os dados da app

### 3. Adicionar Instagram Graph API
1. No painel da app, vá em "Adicionar Produto"
2. Procure por "Instagram Graph API" e clique em "Configurar"
3. Siga as instruções para conectar sua conta Instagram

### 4. Obter Access Token e User ID
1. Vá em "Ferramentas" > "Explorador da API Graph"
2. Selecione sua app no dropdown
3. Para obter o **User ID**:
   - Use o endpoint: `me?fields=id`
   - Ou encontre no painel da app em "Instagram" > "Configurações Básicas"
4. Para obter o **Access Token**:
   - Clique em "Gerar Token de Acesso"
   - Selecione as permissões: `instagram_basic`, `pages_read_engagement`
   - Copie o token gerado

### 5. Configurar Variáveis de Ambiente
Crie ou edite o arquivo `.env.local` na raiz do projeto:

```env
INSTAGRAM_ACCESS_TOKEN=seu_access_token_aqui
INSTAGRAM_USER_ID=seu_user_id_aqui
```

### 6. Reiniciar o Servidor
Após adicionar as variáveis de ambiente, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Notas Importantes (Opção B – Graph API)

- O Access Token expira após 60 dias. Você precisará renová-lo periodicamente.
- Para produção, considere usar um **Long-Lived Token** que dura mais tempo.
- O endpoint busca até 12 posts mais recentes.
- Os posts são cacheados por 1 hora para melhor performance.

## Opção C: Posts manuais (sem API)

Se preferir não configurar a API, você pode adicionar os posts manualmente editando o array `INSTAGRAM_POSTS` no arquivo `src/app/page.tsx`.

Para obter as URLs das imagens:
1. Abra o post no Instagram no navegador
2. Clique com o botão direito na imagem
3. Selecione "Copiar endereço da imagem"
4. Cole a URL no array `INSTAGRAM_POSTS`


