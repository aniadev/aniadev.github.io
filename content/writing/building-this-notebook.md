---
title: 'Building a personal blog with an AI agent and Nuxt 4: I did the other 1%'
lang: en
date: '2026-07-12'
writer: 'Claude Fable 5.1'
kind: note
readingTime: 3
featured: true
summary: 'A free-weekend story: I let an AI agent build almost all of this site with Nuxt 4, Nuxt Content and Tailwind v4, while I reviewed and fussed over the wording. Behind the scenes, and where my 1% lives.'
tags: ['nuxt', 'ai-agent', 'meta']
---

Hi, I'm Ania.

I had a free weekend, so I decided to build this site as a personal profile. Honest confession: most of the code here, I didn't type. I directed, the AI agent typed. My share is roughly 1%. What that 1% actually is, I'll get to.

## The AI did almost all of it, for real

I fired up an AI agent and told it: "build me a static, minimal, bilingual Vietnamese - English profile site, and deploy it to GitHub Pages." Then I went to make coffee. By the time I came back, the skeleton was basically done:

| Layer | What it picked for me |
| --- | --- |
| Framework | Nuxt 4 (static, prerendered) |
| Content | Nuxt Content + MDC |
| Styling | Tailwind CSS v4 |
| Icons + type | Iconify, Space Grotesk, Inter, JetBrains Mono (all bundled locally) |

I barely opened a single library's docs. Something looked off, I pointed, it fixed. Round and round until it looked right.

::callout{type="insight" title="Where my 1% lives"}
Not in the line count. It lives in *knowing what I want*: picking the style, cutting the excess, saying "no" at the right moment. The AI types fast, but the taste still has to be mine.
::

## What about the actual writing?

This part matters. The posts here aren't fully AI-written. I read them carefully, rewrite the clunky lines, cut the murky bits, and add what I actually think. The AI hands me a fast draft. The final voice is me sitting there sanding it down.

Put another way: the AI is a ridiculously fast typist, and I'm the picky editor sitting right next to it.

## What I write, and who for

Most posts here are technical: Cardano, Hydra, AI agents, security. Usually I'm knee-deep in something at work, or I trip over a topic I like, and off I go.

But for almost every post I try to leave a friendlier version for non-technical readers too. Maybe you wandered in just curious who the author is, or a topic is trending and you'd rather not sit and "do the math" or "draw the graphs". Opening a blog for fun and being asked to understand vectors is tiring.

So no worries: wherever it gets heavy, I'll try to retell it in plain human. Want the deep end? The technical version is right there. Just want the gist? The light version has you covered.

## Why static, why simple

I want this thing to last. No backend, no database, nothing to maintain every month. Just static HTML on GitHub Pages. Open it ten years from now and it still runs, none of that "rotted because nobody touched it" business.

Bilingual is kept light too. Each post declares its own language, and the interface reads a cookie and shows the right post in the right tongue. No machine translation, no duplicated routes.

That's it. One weekend, one hardworking AI agent, plus my 1% of taste. Thanks for reading this far.
