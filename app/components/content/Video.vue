<script setup lang="ts">
// MDC video. Two sources, same look as ::figure:
//   ::video{src="/video/x.mp4" poster="/img/x.webp" caption="…"}  ::   (self-hosted, <video>)
//   ::video{youtube="VIDEO_ID" caption="…"}  ::                      (YouTube, privacy-enhanced embed)
// `ratio` is the aspect box: "16/9" (default) or "9/16" for vertical cuts; a vertical video is
// capped in width so it does not take the whole column height.
const props = defineProps<{
  src?: string
  youtube?: string
  poster?: string
  caption?: string
  label?: string
  ratio?: '16/9' | '9/16' | '4/3' | '1/1'
}>()

const aspect = computed(() => (props.ratio ?? '16/9').replace('/', ' / '))
const vertical = computed(() => props.ratio === '9/16')
const embed = computed(() =>
  props.youtube ? `https://www.youtube-nocookie.com/embed/${props.youtube}?rel=0&modestbranding=1` : '',
)
</script>

<template>
  <figure class="not-prose my-8" :class="vertical ? 'mx-auto max-w-[22rem]' : ''">
    <div class="overflow-hidden rounded-md border border-border bg-muted" :style="{ aspectRatio: aspect }">
      <iframe
        v-if="youtube"
        :src="embed"
        :title="caption ?? 'Video'"
        class="block h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      <video
        v-else-if="src"
        :src="src"
        :poster="poster"
        class="block h-full w-full"
        controls
        playsinline
        preload="metadata"
      />
    </div>
    <figcaption v-if="caption || label" class="mt-2.5 flex gap-2 font-mono text-[0.75rem] leading-relaxed text-muted-foreground">
      <span v-if="label" class="shrink-0 text-signal">{{ label }}</span>
      <span>{{ caption }}</span>
    </figcaption>
  </figure>
</template>
