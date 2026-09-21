# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 여행기 묶음 관리

`src/content/roamer/china-2026/ko.mdx`처럼 여행 소개 글의 frontmatter에
`heroImage`와 `children`을 지정합니다. `children`에는 같은 카테고리에 있는
글의 폴더 이름을 읽을 순서대로 적습니다.

```yaml
heroImage: '../adelaide-to-guangzhou/adelaide-airport-china-southern-plane.avif'
children:
  - adelaide-to-guangzhou
  - guangzhou-to-yangjiang
  - yangjiang-food
```

- 여행 소개 본문 아래에 각 글의 대표 사진, 제목, 설명이 자동으로 표시됩니다.
- 공개된 여행 소개에 묶인 글은 카테고리 목록에서만 빠집니다. 개별 주소와 RSS는 유지됩니다.
- `inProgress: true`인 글과 해당 언어에 없는 글은 표시하지 않습니다.
- 소개 글도 `inProgress: true`이면 공개되지 않으며, 그 글의 하위 글은 목록에서 숨기지 않습니다.
- 새 글 추가·순서 변경은 각 언어의 소개 글에 있는 `children`을 수정하면 됩니다.
- 여행 소개 → 개별 글의 한 단계로 사용합니다. 하위 글을 다시 묶거나 여러 여행에 중복으로 넣지 않습니다.
- 소개 본문의 마지막에 목차 제목을 적으면 됩니다. 하위 글 링크를 본문에 따로 관리할 필요는 없습니다.

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
