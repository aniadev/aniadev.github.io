---
title: 'Colophon: how this notebook is built'
lang: en
date: '2026-07-10'
kind: engineering
readingTime: 4
summary: 'A short note on the stack behind this site — Nuxt, Nuxt Content, and a Swiss-minimal type system — and the one idea it is organized around.'
tags: ['nuxt', 'design', 'meta']
---

This site is a notebook, not a feed. It is organized around a single motif: the **ledger entry** — a key mapped to a value, the same shape as an eUTXO output. The home page states an identity as ledger rows; every section carries a monospace label rail down its left margin.

## Stack

The build is deliberately small and static.

| Layer | Choice |
| --- | --- |
| Framework | Nuxt 4 (static, prerendered) |
| Content | Nuxt Content + MDC |
| Styling | Tailwind CSS v4 tokens |
| Icons | Iconify (bundled locally) |
| Type | Space Grotesk · Inter · JetBrains Mono |

## Writing is Markdown

Every entry is a Markdown file with typed frontmatter. Annotated blocks use MDC:

```md
::callout{type="danger" title="Root cause"}
The exploit did not need a protocol bug — an integration assumption was enough.
::
```

Which renders as:

::callout{type="danger" title="Root cause"}
The exploit did not need a protocol bug — an integration assumption was enough.
::

::callout{type="insight" title="Why static"}
A notebook should outlive its tooling. Prerendered HTML on GitHub Pages has no runtime to rot.
::

## Bilingual by design

Each entry declares its own `lang`. The interface reads a cookie-persisted locale and shows the matching entries — no duplicated routes, no machine translation.
