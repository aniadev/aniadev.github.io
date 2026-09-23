<script setup lang="ts">
import type { Kind } from '@/composables/useKind'

const { t, locale } = useI18n()
const { color, label } = useKind()

const { data: posts } = await useAsyncData('writing-index', () =>
  queryCollection('writing').order('date', 'DESC').all(),
)

const { order } = usePostOrder()
const localized = computed(() => order(posts.value as any[]))

// Category axis = post `kind` (fixed order), not the free-form tag cloud. Only the kinds
// actually present get a pill.
const KIND_ORDER: Kind[] = ['security', 'protocol', 'engineering', 'ai', 'note']
const categories = computed(() => {
  const present = new Set(localized.value.map((p: any) => p.kind))
  return KIND_ORDER.filter((k) => present.has(k))
})

const active = ref<Kind | null>(null)
const query = ref('')
watch(locale, () => {
  active.value = null
  query.value = ''
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return localized.value.filter((p: any) => {
    if (active.value && p.kind !== active.value) return false
    if (!q) return true
    const hay = [p.title, p.summary, ...(p.tags ?? [])].join(' ').toLowerCase()
    return hay.includes(q)
  })
})

useHead({ title: t('writing.title') })
</script>

<template>
  <div class="pt-16 md:pt-24">
    <header class="max-w-2xl">
      <p class="eyebrow">{{ t('writing.title') }}</p>
      <h1 class="mt-3 font-display text-4xl font-semibold tracking-display md:text-5xl">{{ t('writing.title') }}</h1>
      <p class="mt-4 text-base leading-relaxed text-muted-foreground">{{ t('writing.lead') }}</p>
    </header>

    <!-- Search -->
    <div class="mt-10 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-foreground">
      <Icon name="lucide:search" class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <input
        v-model="query"
        type="search"
        :placeholder="t('writing.search')"
        :aria-label="t('writing.search')"
        class="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
      />
    </div>

    <!-- Category filter -->
    <div v-if="categories.length" class="mt-5 flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors"
        :class="active === null ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'"
        @click="active = null"
      >
        {{ t('writing.all') }}
      </button>
      <button
        v-for="k in categories"
        :key="k"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors"
        :class="active === k ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'"
        @click="active = k"
      >
        <span class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: color(k) }" aria-hidden="true" />
        {{ label(k) }}
      </button>
    </div>

    <!-- Index -->
    <div class="mt-8">
      <template v-if="filtered.length">
        <PostRow
          v-for="(p, i) in filtered"
          :key="p.path"
          :to="p.path"
          :index="i + 1"
          :title="p.title"
          :summary="p.summary"
          :date="p.date"
          :kind="p.kind"
          :reading-time="p.readingTime"
          :lang="p.lang"
        />
      </template>
      <p v-else class="border-t border-hairline py-16 text-center text-sm text-muted-foreground">
        {{ t('writing.empty') }}
      </p>
    </div>
  </div>
</template>
