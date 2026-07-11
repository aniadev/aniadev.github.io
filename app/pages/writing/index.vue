<script setup lang="ts">
const { t, locale } = useI18n()

const { data: posts } = await useAsyncData('writing-index', () =>
  queryCollection('writing').order('date', 'DESC').all(),
)

const localized = computed(() =>
  (posts.value ?? []).filter((p: any) => !p.draft && p.lang === locale.value),
)

const tags = computed(() => {
  const set = new Set<string>()
  localized.value.forEach((p: any) => (p.tags ?? []).forEach((tag: string) => set.add(tag)))
  return [...set].sort()
})

const active = ref<string | null>(null)
watch(locale, () => (active.value = null))

const filtered = computed(() =>
  active.value ? localized.value.filter((p: any) => (p.tags ?? []).includes(active.value)) : localized.value,
)

useHead({ title: t('writing.title') })
</script>

<template>
  <div class="pt-16 md:pt-24">
    <header class="max-w-2xl">
      <p class="eyebrow">{{ t('writing.title') }}</p>
      <h1 class="mt-3 font-display text-4xl font-semibold tracking-display md:text-5xl">{{ t('writing.title') }}</h1>
      <p class="mt-4 text-base leading-relaxed text-muted-foreground">{{ t('writing.lead') }}</p>
    </header>

    <!-- Tag filter -->
    <div v-if="tags.length" class="mt-10 flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors"
        :class="active === null ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'"
        @click="active = null"
      >
        {{ t('writing.all') }}
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        class="rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors"
        :class="active === tag ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'"
        @click="active = tag"
      >
        {{ tag }}
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
        />
      </template>
      <p v-else class="border-t border-hairline py-16 text-center text-sm text-muted-foreground">
        {{ t('writing.empty') }}
      </p>
    </div>
  </div>
</template>
