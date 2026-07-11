<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
  queryCollection('writing').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Writing entry not found', fatal: true })
}

const langName = computed(() => (post.value?.lang === 'vi' ? 'Tiếng Việt' : 'English'))
const displayDate = computed(() => (post.value?.date ? String(post.value.date).slice(0, 10) : ''))
const tocLinks = computed<any[]>(() => (post.value as any)?.body?.toc?.links ?? [])

useHead(() => ({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.summary },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.summary },
    { property: 'og:type', content: 'article' },
  ],
  link: post.value?.canonical ? [{ rel: 'canonical', href: post.value.canonical }] : [],
}))
</script>

<template>
  <article v-if="post" class="pt-10 md:pt-16">
    <NuxtLink to="/writing" class="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
      <Icon name="lucide:arrow-left" class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      {{ t('actions.backToWriting') }}
    </NuxtLink>

    <!-- Article header -->
    <header class="mt-8 max-w-3xl border-b border-hairline pb-8">
      <KindTag v-if="post.kind" :kind="post.kind" />
      <h1 class="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-display md:text-[2.75rem]">
        {{ post.title }}
      </h1>
      <p v-if="post.summary" class="mt-4 text-lg leading-relaxed text-muted-foreground">{{ post.summary }}</p>
      <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
        <span v-if="displayDate" class="tnum">{{ displayDate }}</span>
        <span v-if="post.readingTime">{{ t('writing.readingTime', { n: post.readingTime }) }}</span>
        <span v-for="tag in post.tags" :key="tag" class="text-muted-foreground/80">#{{ tag }}</span>
      </div>
      <ClientOnly>
        <p v-if="post.lang !== locale" class="mt-5 flex items-center gap-2 border-l-2 border-signal pl-3 text-sm text-muted-foreground">
          <Icon name="lucide:languages" class="h-4 w-4 shrink-0" />
          {{ t('writing.translationNote', { lang: langName }) }}
        </p>
      </ClientOnly>
    </header>

    <!-- Body + TOC rail -->
    <div class="grid gap-x-10 pt-10 lg:grid-cols-[1fr_15rem]">
      <div class="prose min-w-0 max-w-[44rem]">
        <ContentRenderer :value="post" />
      </div>

      <aside v-if="tocLinks.length" class="hidden lg:block">
        <div class="sticky top-24">
          <p class="eyebrow">{{ t('writing.toc') }}</p>
          <nav class="mt-4 border-l border-hairline">
            <ul class="space-y-2 text-sm">
              <li v-for="link in tocLinks" :key="link.id">
                <a :href="`#${link.id}`" class="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-signal hover:text-foreground">
                  {{ link.text }}
                </a>
                <ul v-if="link.children?.length" class="mt-2 space-y-2">
                  <li v-for="child in link.children" :key="child.id">
                    <a :href="`#${child.id}`" class="-ml-px block border-l border-transparent pl-7 text-[0.8125rem] text-muted-foreground/80 transition-colors hover:border-signal hover:text-foreground">
                      {{ child.text }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>

    <!-- Article footer -->
    <footer class="mt-16 border-t border-hairline pt-8">
      <NuxtLink to="/writing" class="group inline-flex items-center gap-1.5 text-sm text-foreground">
        <Icon name="lucide:arrow-left" class="h-4 w-4 text-signal transition-transform group-hover:-translate-x-0.5" />
        <span class="link-underline">{{ t('actions.backToWriting') }}</span>
      </NuxtLink>
    </footer>
  </article>
</template>
