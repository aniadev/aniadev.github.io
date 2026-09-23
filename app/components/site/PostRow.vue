<script setup lang="ts">
import type { Kind } from '@/composables/useKind'

// One entry in the writing index - a typographic row, not a card. Numbered because the index
// is a real chronological sequence. Title shifts right on hover to reveal the accent marker.
const props = defineProps<{
  to: string
  index: number
  title: string
  summary?: string
  date?: string
  kind?: Kind
  readingTime?: number
  lang?: string
}>()

const { t, locale } = useI18n()
// Posts are not translated in place; flag the ones written in the other language.
const foreign = computed(() => !!props.lang && props.lang !== locale.value)
const num = computed(() => String(props.index).padStart(2, '0'))
const displayDate = computed(() => (props.date ? props.date.slice(0, 10) : ''))
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block border-t border-hairline py-6 transition-colors first:border-t-0 hover:bg-accent/40"
  >
    <div class="grid gap-x-6 gap-y-2 md:grid-cols-[3rem_1fr_auto] md:items-baseline">
      <span class="eyebrow tnum hidden pt-0.5 text-muted-foreground/70 md:block">{{ num }}</span>

      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span
            class="hidden h-px w-0 bg-signal transition-all duration-300 ease-out group-hover:w-5 md:inline-block"
            aria-hidden="true"
          />
          <h3 class="font-display text-lg font-medium tracking-tightish text-foreground transition-transform duration-300 ease-out md:text-xl md:group-hover:translate-x-0.5">
            {{ title }}
          </h3>
        </div>
        <p v-if="summary" class="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {{ summary }}
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <KindTag v-if="kind" :kind="kind" />
          <span
            v-if="foreign"
            class="rounded-sm border border-border px-1.5 py-px font-mono text-[0.625rem] uppercase tracking-[0.08em] text-muted-foreground"
            :title="lang === 'vi' ? 'Tiếng Việt' : 'English'"
          >
            {{ lang }}
          </span>
          <span v-if="readingTime" class="font-mono text-[0.6875rem] text-muted-foreground/80">
            {{ t('writing.readingTime', { n: readingTime }) }}
          </span>
        </div>
      </div>

      <time v-if="displayDate" class="eyebrow tnum shrink-0 md:pt-0.5">{{ displayDate }}</time>
    </div>
  </NuxtLink>
</template>
