# Johan Mamedi — Video Editor Portfolio

Portfolio one-page em React, Vite e TypeScript. O conteúdo pode ser atualizado pelos arquivos JSON em `public/data`, sem alterar os componentes principais.

## Rodar localmente

Requisitos: Node.js 18 ou mais recente e npm.

```powershell
cd "C:\caminho\para\johan-mamedi-portfolio"
npm install
npm run dev
```

O Vite mostrará o endereço local no terminal, normalmente `http://localhost:5173`.

Para gerar e testar a versão de produção:

```powershell
npm run build
npm run preview
```

## Where to put logo and photo

Coloque o logo e a foto dentro destas pastas:

```text
public/assets/logo/
public/assets/photo/
```

O site tenta automaticamente estas extensões:

```text
public/assets/logo/mamedi-logo.png
public/assets/logo/mamedi-logo.jpg
public/assets/logo/mamedi-logo.jpeg
public/assets/logo/mamedi-logo.webp

public/assets/photo/johan-mamedi.png
public/assets/photo/johan-mamedi.jpg
public/assets/photo/johan-mamedi.jpeg
public/assets/photo/johan-mamedi.webp
```

O primeiro arquivo válido encontrado será usado. O logo também será usado como favicon.
Não coloque os arquivos dentro de `src` ou `dist`: use a pasta `public/assets`.

Durante `npm run dev`, se um desses arquivos estiver ausente ou não puder ser carregado,
o navegador mostrará um `console.warn` com o caminho esperado. O site continuará
funcionando com o fallback visual.

Para verificar:

1. Execute `npm run dev`.
2. Abra o endereço local mostrado pelo Vite.
3. Abra as ferramentas de desenvolvedor do navegador.
4. Confira a aba Console caso o logo ou a foto ainda não apareça.

## Ícones dos softwares

Os ícones locais opcionais devem ficar nestes caminhos:

- Premiere Pro: `public/assets/software/premiere.png`
- After Effects: `public/assets/software/after-effects.png`
- Photoshop: `public/assets/software/photoshop.png`

Se algum ícone estiver ausente, o site usa automaticamente os badges `Pr`, `Ae` e `Ps`.

## Editar conteúdo

### Textos e ferramentas

Edite `public/data/site.json`. Esse arquivo controla nome, textos das seções, menu, palavras animadas, ferramentas e traduções.

Para alterar o título principal do hero, edite `headline`. Para alterar as palavras
animadas, edite `heroWords` em cada idioma.

Cada texto traduzível usa:

```json
{
  "en": "English text",
  "pt": "Texto em português",
  "es": "Texto en español"
}
```

Se uma tradução estiver ausente, o site usa o inglês.

### Vídeos

Edite `public/data/videos.json`.

Para encontrar o ID de um vídeo do YouTube:

- Em `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, o ID é `dQw4w9WgXcQ`.
- Em `https://youtu.be/dQw4w9WgXcQ`, o ID também é `dQw4w9WgXcQ`.

Exemplo de video:

```json
{
  "id": "meu-video-01",
  "youtube": "dQw4w9WgXcQ",
  "title": {
    "en": "Video title",
    "pt": "Titulo do video",
    "es": "Titulo del video"
  },
  "category": {
    "en": "Documentary Edit",
    "pt": "Edicao Documental",
    "es": "Edicion Documental"
  },
  "kind": "long",
  "aspectRatio": "horizontal",
  "active": true,
  "order": 1
}
```

Como escolher a secao:

- Long Form: use `"kind": "long"`. Tambem e aceito `"category": "longform"`.
- Shorts: use `"kind": "short"`. Tambem e aceito `"category": "shorts"`.
- Motion Design: use `"category": "motion"` ou `"kind": "motion"`.
- Use `"active": false` para desativar um video sem apagar.
- Altere `order` para reordenar. O menor numero aparece primeiro dentro da secao.
- `thumbnail` e opcional. Quando ausente, o site usa a thumbnail do YouTube.
- O campo `youtube` aceita um ID ou URL valida do YouTube. URLs `/shorts/` podem ser inferidas como verticais.

Orientacao / formato:

- `"aspectRatio": "horizontal"` ou `"16:9"` para videos horizontais.
- `"aspectRatio": "vertical"` ou `"9:16"` para Shorts e videos verticais.
- `"aspectRatio": "square"` ou `"1:1"` para videos quadrados.
- Se `aspectRatio` estiver ausente, o padrao e horizontal, exceto URLs do YouTube Shorts.

Exemplo de Short:

```json
{
  "id": "short-09",
  "youtube": "dQw4w9WgXcQ",
  "title": { "en": "Short title", "pt": "Titulo curto", "es": "Titulo corto" },
  "category": { "en": "Short Edit", "pt": "Edicao curta", "es": "Edicion corta" },
  "kind": "short",
  "aspectRatio": "9:16",
  "active": true,
  "order": 9
}
```

Exemplo de Motion Design:

```json
{
  "id": "motion-01",
  "youtube": "M7lc1UVf-VE",
  "title": {
    "en": "Kinetic Title System",
    "pt": "Sistema de Titulos Cineticos",
    "es": "Sistema de Titulos Cineticos"
  },
  "category": "motion",
  "aspectRatio": "horizontal",
  "active": true,
  "order": 1
}
```

Para editar o titulo e descricao da secao Motion Design, altere `motionDesignTitle`
e `motionDesignDescription` em `public/data/site.json`.

### Links sociais

Edite `public/data/socials.json`. Use `"active": false` para esconder um link. URLs aceitas começam com `https://`, `http://` ou `mailto:`.

Os padrões ativos são Email, X/Twitter e Discord. Para alterar um contato, edite o
campo `url`. Para mostrar ou esconder qualquer ícone, altere o campo `active`:

```json
{ "id": "discord", "label": "Discord", "url": "https://discord.com/users/seu-id", "active": true }
```

### FAQ

Edite `public/data/faq.json`. Cada pergunta e resposta contém traduções `en`, `pt` e `es`. Use `active` e `order` da mesma forma que nos vídeos.

## Cores e estilo

As principais cores ficam no início de `src/styles/index.css`:

```css
:root {
  --green: #00ff88;
  --muted: #a3a3a3;
  --line: rgba(255, 255, 255, 0.1);
  --card: rgba(255, 255, 255, 0.035);
}
```

## GitHub Pages

1. Crie um repositório e envie este projeto.
2. Instale as dependências e teste `npm run build`.
3. Para um repositório chamado `johan-portfolio`, gere o build com o base path:

```powershell
$env:VITE_BASE_PATH="/johan-portfolio/"
npm run build
```

4. Publique a pasta `dist` pelo método de GitHub Pages de sua preferência.

Para um domínio próprio ou página de usuário (`usuario.github.io`), o base padrão `/` pode ser mantido.

## Segurança e desempenho

- Somente IDs válidos do YouTube são usados para construir embeds `youtube-nocookie.com`.
- O iframe só é criado quando o modal é aberto.
- Links externos usam `noopener noreferrer`.
- Conteúdo JSON é renderizado como texto, sem HTML injetado.
- JSON inválido, imagens ausentes e dados incompletos possuem fallbacks.
- Animações respeitam `prefers-reduced-motion`.
