<script setup lang="ts">
// MDC figure:  ::figure{src="/img/x.png" alt="…" caption="Fig 1. …"}  ::
defineProps<{ src: string; alt?: string; caption?: string; label?: string }>()
</script>

<template>
  <figure class="not-prose my-8">
    <div class="overflow-hidden rounded-md border border-border bg-muted">
      <img :src="src" :alt="alt ?? caption ?? ''" class="block w-full" loading="lazy" />
    </div>
    <figcaption v-if="caption || label" class="mt-2.5 flex gap-2 font-mono text-[0.75rem] leading-relaxed text-muted-foreground">
      <span v-if="label" class="shrink-0 text-signal">{{ label }}</span>
      <span>{{ caption }}</span>
    </figcaption>
  </figure>
</template>
