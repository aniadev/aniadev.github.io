<script setup lang="ts">
import { projects } from '@/data/site'

const { t } = useI18n()
const { lt } = useLocaleText()

useHead({ title: t('projects.title') })
</script>

<template>
  <div class="pt-16 md:pt-24">
    <header class="max-w-2xl">
      <p class="eyebrow">{{ t('projects.title') }}</p>
      <h1 class="mt-3 font-display text-4xl font-semibold tracking-display md:text-5xl">{{ t('projects.title') }}</h1>
      <p class="mt-4 text-base leading-relaxed text-muted-foreground">{{ t('projects.lead') }}</p>
    </header>

    <ul class="mt-12">
      <li v-for="p in projects" :key="p.name">
        <a
          :href="p.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group grid gap-x-8 gap-y-3 border-t border-hairline py-7 transition-colors hover:bg-accent/40 md:grid-cols-[1fr_auto]"
        >
          <div class="min-w-0">
            <div class="flex items-center gap-2.5">
              <h2 class="font-display text-xl font-medium tracking-tightish text-foreground transition-transform duration-300 ease-out md:group-hover:translate-x-0.5">
                {{ p.name }}
              </h2>
              <Icon name="lucide:arrow-up-right" class="h-4 w-4 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
            </div>
            <p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{{ lt(p.summary) }}</p>
            <div class="mt-3 flex flex-wrap gap-x-2 gap-y-1">
              <UiBadge v-for="tag in p.tags" :key="tag" variant="outline">{{ tag }}</UiBadge>
            </div>
          </div>

          <div class="flex items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground md:flex-col md:items-end md:gap-1.5 md:pt-1">
            <span class="inline-flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              {{ p.lang }}
            </span>
            <span v-if="p.stars" class="tnum inline-flex items-center gap-1">
              <Icon name="lucide:star" class="h-3 w-3" />
              {{ p.stars }} {{ t('projects.stars') }}
            </span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
