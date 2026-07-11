<script setup lang="ts">
import { author, links } from '@/data/site'

const { t } = useI18n()
const year = 2026
</script>

<template>
  <footer class="mt-24 border-t border-hairline">
    <div class="mx-auto w-full max-w-[74rem] px-6 py-12 md:px-10">
      <div class="grid gap-8 md:grid-cols-[8rem_1fr] lg:gap-14">
        <div class="eyebrow md:pt-1">{{ t('home.elsewhere') }}</div>
        <div class="flex flex-col gap-8">
          <ul class="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <li v-for="l in links" :key="l.key">
              <a
                :href="l.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon :name="l.icon" class="h-4 w-4" />
                <span class="link-underline">{{ l.handle }}</span>
                <Icon name="lucide:arrow-up-right" class="h-3 w-3 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          </ul>
          <div class="flex flex-col gap-1 font-mono text-[0.6875rem] text-muted-foreground">
            <span>© {{ year }} {{ author.name }}. {{ t('footer.rights') }}</span>
            <span>{{ t('footer.built') }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
