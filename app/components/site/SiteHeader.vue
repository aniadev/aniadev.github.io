<script setup lang="ts">
import { author } from '@/data/site'

const { t } = useI18n()
const route = useRoute()

const nav = computed(() => [
  { to: '/writing', label: t('nav.writing') },
  { to: '/projects', label: t('nav.projects') },
  { to: '/about', label: t('nav.about') },
])

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-14 w-full max-w-[74rem] items-center justify-between px-6 md:px-10">
      <NuxtLink to="/" class="group flex items-baseline gap-2.5" :aria-label="author.name">
        <span class="font-display text-[0.95rem] font-semibold tracking-tightish">{{ author.name }}</span>
        <span class="hidden font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground sm:inline">
          {{ author.handle }}
        </span>
      </NuxtLink>

      <nav class="flex items-center gap-1 sm:gap-2">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="relative px-2.5 py-1.5 text-sm transition-colors sm:px-3"
          :class="isActive(item.to) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
        >
          {{ item.label }}
          <span
            v-if="isActive(item.to)"
            class="absolute inset-x-2.5 -bottom-px h-px bg-signal sm:inset-x-3"
            aria-hidden="true"
          />
        </NuxtLink>

        <span class="mx-1 hidden h-4 w-px bg-border sm:inline-block" aria-hidden="true" />
        <LangSwitch class="hidden sm:flex" />
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
