<script setup lang="ts">
import { author, links, focusAreas, type Locale } from '@/data/site'

const { t, locale } = useI18n()
const { lt } = useLocaleText()

const { data: posts } = await useAsyncData('home-writing', () =>
  queryCollection('writing').order('date', 'DESC').all(),
)

const featured = computed(() => {
  const all = (posts.value ?? []).filter((p: any) => !p.draft && p.lang === locale.value)
  const picks = all.filter((p: any) => p.featured)
  return (picks.length ? picks : all).slice(0, 4)
})
</script>

<template>
  <div>
    <!-- Hero: identity as a ledger -->
    <section class="pt-16 pb-4 md:pt-24">
      <p class="eyebrow rise" style="animation-delay: 0ms">{{ t('home.ledger') }} · {{ author.handle }}</p>
      <h1 class="rise mt-4 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-display sm:text-6xl md:text-7xl" style="animation-delay: 60ms">
        {{ author.name }}
      </h1>
      <p class="rise mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" style="animation-delay: 120ms">
        {{ t('home.intro') }}
      </p>

      <dl class="rise mt-10 max-w-2xl" style="animation-delay: 180ms">
        <LedgerRow :label="t('home.position')">{{ lt(author.role) }}</LedgerRow>
        <LedgerRow :label="t('home.focus')">Cardano · Hydra L2 · EVM · AI Agent</LedgerRow>
        <LedgerRow :label="t('home.writes')">
          {{ t('kind.security') }} · {{ t('kind.protocol') }} · {{ t('kind.ai') }} · {{ t('kind.engineering') }}
        </LedgerRow>
        <LedgerRow :label="t('home.based')">{{ lt(author.location) }}</LedgerRow>
      </dl>

      <div class="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2" style="animation-delay: 240ms">
        <a
          v-for="l in links"
          :key="l.key"
          :href="l.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon :name="l.icon" class="h-4 w-4" />
          <span class="link-underline">{{ l.label }}</span>
        </a>
      </div>
    </section>

    <!-- Selected writing -->
    <SectionRow index="01" :label="t('home.featuredWriting')">
      <div class="-mt-6">
        <PostRow
          v-for="(p, i) in featured"
          :key="p.path"
          :to="p.path"
          :index="i + 1"
          :title="p.title"
          :summary="p.summary"
          :date="p.date"
          :kind="p.kind"
          :reading-time="p.readingTime"
        />
      </div>
      <NuxtLink to="/writing" class="mt-8 inline-flex items-center gap-1.5 text-sm text-foreground">
        <span class="link-underline">{{ t('actions.allWriting') }}</span>
        <Icon name="lucide:arrow-right" class="h-4 w-4 text-signal" />
      </NuxtLink>
    </SectionRow>

    <!-- Focus areas -->
    <SectionRow index="02" :label="t('home.focusAreas')">
      <div class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div v-for="area in focusAreas" :key="area.id" class="flex gap-4">
          <Icon :name="area.icon" class="mt-0.5 h-5 w-5 shrink-0 text-signal" />
          <div>
            <h3 class="font-display text-base font-medium tracking-tightish">{{ lt(area.title) }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">{{ lt(area.body) }}</p>
          </div>
        </div>
      </div>
    </SectionRow>
  </div>
</template>
