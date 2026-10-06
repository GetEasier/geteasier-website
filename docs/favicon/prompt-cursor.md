Quero que a webapp use o mesmo favicon do site da GetEasier. Os ficheiros já estão feitos, não os redesenhes: copia-os para a pasta pública da app (ex.: `public/`) com estes nomes:

- `favicon.ico` (contém 16, 32 e 48 px)
- `favicon.svg` (vetorial, para browsers modernos)
- `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `favicon-96.png`
- `apple-touch-icon.png` (180×180)
- `icon-192.png` e `icon-512.png` (para o manifest)

Como é o ícone, para referência:
- É só o símbolo "G" da GetEasier, sem o texto, num quadrado de fundo transparente, sem margem.
- O símbolo foi esticado na vertical 1,25× para encher melhor o quadrado (não está deformado por engano).
- Cores: gradiente de #18DDBA (ciano) para #1B54B8 (azul); o braço pequeno de cima é branco (#FFFFFF).
- O ícone da Apple e os de 192/512 têm fundo azul-escuro #06083C (quadrado, sem cantos arredondados: o sistema arredonda) com o símbolo a ocupar ~72% da largura, para o braço branco se ver.

No `<head>` de todas as páginas (ou no equivalente do framework, ex.: `metadata.icons` em Next.js), põe:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

E no `manifest.webmanifest` (cria-o se não existir):

```json
"icons": [
  { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
]
```

Remove os favicons antigos que já existam na app (outros `favicon.*`, `icon.*` ou `apple-icon.*`, incluindo os que o framework gera sozinho a partir de ficheiros em `app/`), para não haver dois ícones a competir. No fim, confirma abrindo a app numa tab nova e com refresh forçado (o browser guarda o favicon em cache).
