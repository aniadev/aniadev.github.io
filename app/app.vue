<script setup lang="ts">
import { author, siteUrl } from '@/data/site'

const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  titleTemplate: (title) => (title ? `${title} · ${author.name}` : `${author.name} · ${t('meta.role')}`),
  meta: [
    { name: 'description', content: t('meta.tagline') },
    { property: 'og:site_name', content: author.name },
    { property: 'og:image', content: `${siteUrl}/og.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: `${siteUrl}/og.png` },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
