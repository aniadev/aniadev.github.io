# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal site + bilingual (VI/EN) writing notebook for Phạm Hải (aniadev). Static-generated Nuxt 4 app deployed to GitHub Pages at the domain root. Swiss-minimal design; forensic-security and protocol-engineering essays.

## Commands

```bash
pnpm install               # postinstall runs `nuxt prepare`
pnpm dev                   # dev server → http://localhost:3000
pnpm generate              # static build → .output/public (this is what CI ships)
pnpm build                 # server build (not used for deploy)
npx serve .output/public   # preview the generated static site
```

No test suite, linter, or formatter is configured. `dist` symlinks to `.output/public`.

### Native module gotcha (important)

Nuxt Content needs the `better-sqlite3` native binding at build time. pnpm 11's `onlyBuiltDependencies` allowlist is **not honored** on this version, so a fresh install may leave it uncompiled and `pnpm generate` will fail. Fix locally:

```bash
pnpm rebuild better-sqlite3
```

CI (`.github/workflows/deploy.yml`) works around the same issue by (1) tolerating the install exit code (`pnpm install --frozen-lockfile || true` - node_modules is fully populated regardless), (2) compiling better-sqlite3 explicitly via its own `npm run build-release`, and (3) invoking `./node_modules/.bin/nuxt generate` directly. That last step matters: `.npmrc` sets `verify-deps-before-run=false` and CI bypasses the `pnpm generate` script wrapper because pnpm's pre-run dep verification otherwise fires an implicit reinstall that re-hits `ERR_PNPM_IGNORED_BUILDS`. If you touch the deploy workflow or `.npmrc`, keep this chain intact.

## Deploy

Push to `main` → GitHub Actions builds and publishes to Pages. Pages source is set to `build_type: workflow` (not the legacy `gh-pages` branch). Live at https://aniadev.github.io. `baseURL` is `/` because it is a user page served at the root.

## Architecture

### Rendering

`ssr: true` + Nitro `prerender` (`nuxt.config.ts`) → every route renders to static HTML at build for SEO and link cards, then ships as a static site. There is no runtime server. Prerender entry routes are listed in `nitro.prerender.routes`; `crawlLinks` discovers the rest (including dynamic `writing/[...slug]`).

### Bilingual model - two distinct mechanisms

This is the core concept to understand. "Bilingual" is handled two different ways depending on the content:

1. **UI strings** live in `i18n/locales/{vi,en}.json`, read with `t('key')`. i18n uses `strategy: 'no_prefix'` - a *single* set of routes; switching locale swaps strings in place (no `/en/...` paths). Locale persists in the `ph-lang` cookie.
2. **Structured data** (identity, links, focus areas, projects, experience) lives in `app/data/site.ts` as `{ vi, en }` (`LocaleText`) objects, resolved via the `useLocaleText()` composable's `lt()` helper against the active locale.
3. **Posts** are *not* translated in place. Each Markdown file declares its own `lang` in frontmatter, and list/index pages **filter** to `p.lang === locale.value` (see `app/pages/writing/index.vue`). A post whose `lang` differs from the active locale is still reachable directly and shows a translation note.

When adding user-facing text: a fixed label → i18n JSON; a piece of profile/portfolio data → `site.ts` `LocaleText`; long-form prose → a Markdown post with a `lang`.

### Content (Nuxt Content 3)

- Single `writing` collection defined in `content.config.ts` with a Zod frontmatter schema. Posts are `content/writing/*.md`.
- Query with `queryCollection('writing')` inside `useAsyncData` (see the writing index and `[...slug].vue`).
- Frontmatter fields: `lang` (vi|en), `date`, `summary`, `tags[]`, `kind`, `readingTime?`, `featured`, `canonical?`, `draft`. `draft: true` and locale mismatch are filtered in the page layer, not the query.
- `kind` (`security | protocol | engineering | ai | note`) drives the accent color via `useKind()` / `app/composables/useKind.ts`. Some posts are abstracts that point to an external `canonical` original.
- MDC components available in posts: `::callout{type="danger|insight|warning|note" title="…"}` and `::figure{src alt caption}`, implemented in `app/components/content/`.
- Code highlighting is Shiki dual-theme (`github-light`/`github-dark`); the language allowlist is in `nuxt.config.ts` under `content.build.markdown.highlight.langs` - add a language there if a post needs it.

### Components & styling

- Component auto-import uses **flat names** with `pathPrefix: false` (`SiteHeader`, not `SiteSiteHeader`). Site chrome lives in `app/components/site/`.
- shadcn-nuxt owns `app/components/ui/**` with the **`Ui` prefix** (`UiButton`, `UiBadge`). The config deliberately avoids reka-ui interactive primitives (dialog/select/popover) to sidestep an SSR `compileScript` fs issue - prefer plain elements or existing `ui` components over pulling those in.
- Tailwind **v4**, configured entirely in CSS (`app/assets/css/main.css` via `@tailwindcss/vite`) - there is no `tailwind.config`. Design tokens are `@theme` CSS variables; dark mode is class-based (`.dark` on `<html>`, toggled by `@nuxtjs/color-mode`, cookie `ph-color-mode`).
- Palette is intentionally restrained: one signal accent `--color-signal` (#2647ff) plus per-`kind` accent colors (`--color-security` red, `--color-protocol` teal, `--color-engineering` violet, `--color-ai` amber). Both light and dark values are defined in `main.css`. Fonts: Space Grotesk (display), Inter (sans), JetBrains Mono (mono), self-hosted via `@nuxt/icon`/`@nuxt/fonts`.
- Icons are Iconify (`lucide`, `simple-icons`) bundled locally (`icon.mode: 'svg'`) - the static site never calls the Iconify runtime API. Use `<Icon name="lucide:..." />`.
- `cn()` in `app/lib/utils.ts` (clsx + tailwind-merge) is the class-merge helper.

## Where to change common things

| Change | File |
|---|---|
| Identity, links, focus areas, projects, experience | `app/data/site.ts` |
| Fixed UI strings | `i18n/locales/{vi,en}.json` |
| Design tokens (palette, fonts, dark mode) | `app/assets/css/main.css` |
| A blog post | `content/writing/*.md` |
| Post frontmatter schema | `content.config.ts` |
| `kind` → accent color mapping | `app/composables/useKind.ts` |
