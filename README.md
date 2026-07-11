# aniadev.github.io

Personal site + writing notebook of **Phạm Hải** — frontend & blockchain engineer.
Swiss-minimal design, bilingual (VI/EN), forensic security + protocol-engineering essays.

## Stack

- **Nuxt 4** — static (`ssr: true` + prerender → GitHub Pages)
- **Nuxt Content 3** + MDC — Markdown writing with typed frontmatter, Shiki highlighting
- **Tailwind CSS v4** — design tokens in `app/assets/css/main.css`
- **shadcn-nuxt** (reka-ui) — UI primitives, `Ui` prefix
- **@nuxt/icon** — Iconify (`lucide`, `simple-icons`), bundled locally
- **@nuxtjs/i18n** — VI/EN, `no_prefix` strategy, cookie-persisted
- **@nuxt/fonts** — Space Grotesk · Inter · JetBrains Mono, self-hosted

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm generate       # static build → .output/public
npx serve .output/public   # preview the static build
```

> Native module: Nuxt Content needs `better-sqlite3`. If a fresh clone fails to build it,
> run `pnpm rebuild better-sqlite3` (the allowlist lives in `pnpm-workspace.yaml`).

## Writing

Posts are Markdown in `content/writing/*.md`. Frontmatter (see `content.config.ts`):

```yaml
---
title: 'Post title'
lang: vi            # vi | en  — controls which locale sees it
date: '2026-01-01'
kind: security      # security | protocol | engineering | note (drives the accent dot)
featured: true      # surface on the home page
readingTime: 12
summary: 'One-line dek shown in the index.'
tags: ['cardano', 'security']
canonical: 'https://…'   # optional: original source
---
```

MDC blocks available in posts: `::callout{type="danger|insight|warning|note" title="…"}` and
`::figure{src="…" alt="…" caption="…"}`.

## Personalize

- Identity, links, projects, experience, skills → `app/data/site.ts`
- UI strings → `i18n/locales/{vi,en}.json`
- Design tokens (palette, fonts) → `app/assets/css/main.css`

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
Enable it once in **Settings → Pages → Build and deployment → Source: GitHub Actions**.
