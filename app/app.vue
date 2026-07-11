<script setup lang="ts">
import { author } from '@/data/site'

const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  titleTemplate: (title) => (title ? `${title} · ${author.name}` : `${author.name} · ${t('meta.role')}`),
  meta: [{ name: 'description', content: t('meta.tagline') }],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
