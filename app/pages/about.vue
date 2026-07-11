<script setup lang="ts">
import { author, links, experience, stack, credentials } from '@/data/site'

const { t } = useI18n()
const { lt } = useLocaleText()

useHead({ title: t('about.title') })
</script>

<template>
  <div class="pt-16 md:pt-24">
    <header class="max-w-2xl">
      <p class="eyebrow">{{ t('about.title') }}</p>
      <h1 class="mt-3 font-display text-4xl font-semibold tracking-display md:text-5xl">{{ author.name }}</h1>
      <p class="mt-4 text-base leading-relaxed text-muted-foreground">{{ t('about.lead') }}</p>
    </header>

    <!-- Experience -->
    <SectionRow index="01" :label="t('about.experience')">
      <ul class="space-y-8">
        <li v-for="job in experience" :key="job.org" class="grid gap-x-6 gap-y-1 md:grid-cols-[8rem_1fr]">
          <span class="eyebrow tnum md:pt-1">{{ job.period }}</span>
          <div>
            <h3 class="font-display text-base font-medium tracking-tightish">
              {{ lt(job.role) }} · <span class="text-muted-foreground">{{ job.org }}</span>
            </h3>
            <p class="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{{ lt(job.detail) }}</p>
          </div>
        </li>
      </ul>
    </SectionRow>

    <!-- Stack -->
    <SectionRow index="02" :label="t('about.stack')">
      <ul class="flex flex-wrap gap-2">
        <li v-for="item in stack" :key="item">
          <span class="inline-flex rounded-full border border-border px-3 py-1 font-mono text-[0.75rem] text-muted-foreground">{{ item }}</span>
        </li>
      </ul>
    </SectionRow>

    <!-- Credentials -->
    <SectionRow index="03" :label="t('about.credentials')">
      <ul class="space-y-4">
        <li v-for="c in credentials" :key="c.issuer">
          <component
            :is="c.href ? 'a' : 'div'"
            :href="c.href"
            :target="c.href ? '_blank' : undefined"
            rel="noopener noreferrer"
            class="group grid gap-x-6 gap-y-1 md:grid-cols-[8rem_1fr]"
          >
            <span class="eyebrow md:pt-1">{{ c.issuer }}</span>
            <div>
              <h3 class="inline-flex items-center gap-2 font-display text-base font-medium tracking-tightish">
                <Icon name="lucide:award" class="h-4 w-4 text-signal" />
                <span :class="c.href ? 'link-underline' : ''">{{ lt(c.name) }}</span>
                <Icon v-if="c.href" name="lucide:arrow-up-right" class="h-3 w-3 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p v-if="c.note" class="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{{ lt(c.note) }}</p>
            </div>
          </component>
        </li>
      </ul>
    </SectionRow>

    <!-- Contact -->
    <SectionRow index="04" :label="t('about.contact')">
      <ul class="flex flex-col gap-4">
        <li v-for="l in links" :key="l.key">
          <a
            :href="l.href"
            :target="l.key === 'email' ? undefined : '_blank'"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-3 text-base transition-colors hover:text-foreground"
          >
            <Icon :name="l.icon" class="h-5 w-5 text-muted-foreground group-hover:text-signal" />
            <span class="font-medium">{{ l.label }}</span>
            <span class="font-mono text-sm text-muted-foreground">{{ l.handle }}</span>
          </a>
        </li>
      </ul>
    </SectionRow>
  </div>
</template>
